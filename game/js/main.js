import {loadMap, loadImage} from "./loaders.js";
import TileSet from "./TileSet.js";
const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

ctx.fillRect(100,100,100,100);




class createTiles{
    constructor(img,width,height) {
        this.img = img;
        this.tiles = new Map();
        this.width = width;
        this.height = height;
    }
    defineTile(id,x,y){
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        buffer.getContext('2d')
              .drawImage(this.img,
                         x,
                         y, 
                         this.width,
                         this.height,
                         0,
                         0,
                         buffer.width,
                         buffer.height);
        this.tiles.set(id,buffer);
        
    }
    drawTile(id,ctx,x,y) {
        
        const tile = this.merged.get(id);
        ctx.drawImage(tile,x,y);
    };


};

class combineAllTiles extends createTiles{
    constructor(merged){
        super();
        this.merged = merged;
    }
}


class setMap {
    constructor(mapW, mapH, layers) {
        this.mapW = mapW;
        this.mapH = mapH;
        this.layers = layers;
        this.worldMatrix = new Map();
    }
    createMatrix(layer) {
       let matrix = [];
       let row = [];
       let num=0;
       for (let i =0; i < this.mapH; i++){
            row = layer.slice( num, num + this.mapW);
            num+= this.mapW;
            matrix.push(row);
       };

       return matrix;     
    }
    setWorldLayerMatrixes() {
        let lastMatrix; 
        this.layers.forEach(layer=>{
            lastMatrix = this.createMatrix(layer.data);
            this.worldMatrix.set(layer.name, lastMatrix);
        });
    };
};

 class renderMap {
    constructor(mapData, tiles) {
        this.mapData = mapData;
        this.tiles = tiles;        
    }


    drawMap(tilesCreator) {
        this.mapData.worldMatrix.forEach((matrix,key)=>{
           console.log(tilesCreator);
            matrix.forEach((row, index)=>{
                let x;
                let y = index;
                row.forEach((el,rowIndex) =>{
                     if(el) {
                         x= rowIndex;
                         console.log(el, x,y, key);
                       tilesCreator.drawTile(el,ctx,x*16,y*16);
                        
                     }
                 
                });
                
            }); 
        })

    }
}


let level1 = loadMap();

level1
.then(map => {
    
   let tileSetsStorage = [];
   map.tilesets.forEach(el=> {
    tileSetsStorage.push(new TileSet(el.firstgid, el.columns, 
                                     el.tilecount, el.tilewidth));
   })
  

 tileSetsStorage[0].setTilesPositions();
 tileSetsStorage[1].setTilesPositions();
 console.log(tileSetsStorage);
    const mapMatrix = new setMap(map.width, map.height, map.layers);
    
    mapMatrix.setWorldLayerMatrixes();
    const world = new renderMap(mapMatrix);

     Promise.all([
        loadImage('../assets/miniTileset/miniTileset.png'),
        loadImage('../assets/miniTileset/Taiga.png')
     ])
      
  //loadImage('../assets/ORGIN/elo.png')
    .then((values)=>{
        let tileRenderers = [];
        values.forEach(img=> {
            tileRenderers.push(new createTiles(img,16,16))
        })
        
       
        
        tileSetsStorage.forEach((el,index)=>{
            el.tiles.forEach((tile) => {
                tileRenderers[index].defineTile(tile.id,tile.x,tile.y);

             })
        })

        
      //  console.log(tileRenderers[1]);
         
         //world.drawMap(tileRenderers[0]);
         let merged = new Map([...tileRenderers[0].tiles, ...tileRenderers[1].tiles]);
         let allTiles = new combineAllTiles(merged);
         
        // console.log(merged);
         world.drawMap(allTiles);

                       // ctx.drawImage(image,0,0);
    })
    
});

/*      loadImage('../assets/miniTileset/miniTileset.png')
  //loadImage('../assets/ORGIN/elo.png')
    .then(image=>{


         const tiles = new createTiles(image,16,16);

         miniTileset.tiles.forEach((tile) => {
            tiles.defineTile(tile.id,tile.x,tile.y);
         })
        
         const world = new renderMap(mapMatrix);
         
         world.drawMap(tiles);

                       // ctx.drawImage(image,0,0);
    }) */