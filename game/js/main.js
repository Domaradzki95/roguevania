import {loadMap, loadImage} from "./loaders.js";
const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

ctx.fillRect(100,100,100,100);


class TileSet {
    constructor(gid, columns,tilecount, tileSize) {
        this.gid = gid;
        this.columns = columns;
        this.tilecount = tilecount;
        this.tileSize = tileSize;
        this.tiles = [];
    }
    setTiles() {
        for(let i = 0; i< this.tilecount; i++) {
            this.tiles.push({id: i+1, x:null, y:null});
        }
    }
    setTilesPositions() {
        this.setTiles();
        this.tiles.forEach((el,index)=> { 
            if(index>=this.columns) {
                el.y = Math.floor(index/this.columns);
                el.x =  index - this.columns * el.y;
            } else {
                el.y = 0;
                el.x = index;
            }
        el.x *= this.tileSize;
        el.y *= this.tileSize;
        
        })
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
/*        matrix.forEach((row, index)=>{
           let x;
           let y = index;
           row.forEach((el,rowIndex) =>{
                if(el) {
                    x= rowIndex;
                }
           });
           console.log(x,y);
       });  */
       return matrix;     
    }
    setWorldLayerMatrixes() {
        let lastMatrix; 
        this.layers.forEach(layer=>{
            lastMatrix = this.createMatrix(layer.data);
            this.worldMatrix.set(layer.name, lastMatrix);
        });
    };
}


let level1 = loadMap();
//What I have, layers matrixes 
level1
.then(map => {

    const firstTileset=  map.tilesets[0];
    let {columns,tilecount, tilewidth} = firstTileset;
    const miniTileset = new TileSet(firstTileset.firstgid, columns,tilecount, tilewidth);
    miniTileset.setTilesPositions();
    //console.log(miniTileset);
    console.log(map); 
    const mapMatrix = new setMap(map.width, map.height, map.layers);
    console.log(mapMatrix);
    mapMatrix.setWorldLayerMatrixes();
    loadImage('../assets/miniTileset/miniTileset.png')
    .then(image=>{
        ctx.drawImage(image,0,0);
    })
    
})
