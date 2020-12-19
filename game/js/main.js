import {loadMap, loadImage} from "./loaders.js";
import {TileSet, CreateTiles, TilesStorage} from "./TileSet.js";
import { SetMap, RenderMap } from "./worldMap.js";
const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');




 class renderMap {
    constructor(mapData) {
        this.mapData = mapData;
       // this.tiles = tiles;        
    }


    drawMap(tilesCreator) {
        this.mapData.worldMatrix.forEach((matrix,key)=>{
           
            matrix.forEach((row, index)=>{
                let x;
                let y = index;
                row.forEach((el,rowIndex) =>{
                     if(el) {
                         x= rowIndex;
                         
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
    const mapMatrix = new SetMap(map.width, map.height, map.layers);
    
    mapMatrix.setWorldLayerMatrixes();
   const world = new RenderMap(mapMatrix);
 //  const world = new renderMap(mapMatrix);
    console.log(world);

     Promise.all([
        loadImage('../assets/miniTileset/miniTileset.png'),
        loadImage('../assets/miniTileset/Taiga.png')
     ])
      
  //loadImage('../assets/ORGIN/elo.png')
    .then((values)=>{
        let tileRenderers = [];
        values.forEach(img=> {
            tileRenderers.push(new CreateTiles(img,16,16))
        })
        
       
        
        tileSetsStorage.forEach((el,index)=>{
            el.tiles.forEach((tile) => {
                tileRenderers[index].defineTile(tile.id,tile.x,tile.y);

             })
        })

        

         let merged = new Map([...tileRenderers[0].tiles, ...tileRenderers[1].tiles]);
         let allTiles = new TilesStorage(merged);
         
        // console.log(merged);
         world.drawMap(allTiles,ctx);

                     
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