export  class TileSet {
    constructor(gid, columns,tilecount, tileSize) {
        this.gid = gid;
        this.columns = columns;
        this.tilecount = tilecount;
        this.tileSize = tileSize;
        this.tiles = [];
    }
    setTiles() {
        for(let i = 0; i< this.tilecount; i++) {
            this.tiles.push({id: i+this.gid, x:null, y:null});
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



export class CreateTiles{
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


export class TilesStorage extends CreateTiles{
    constructor(merged){
        super();
        this.merged = merged;
    }
}