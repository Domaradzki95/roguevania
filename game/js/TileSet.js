export default class TileSet {
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