export class SetMap {
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


export class RenderMap {
    constructor(mapData) {
        this.mapData = mapData;
    }


    drawMap(tilesCreator, ctx) {
        this.mapData.worldMatrix.forEach((matrix,key)=>{
            matrix.forEach((row, index)=>{
                let x;
                let y = index;
                row.forEach((el,rowIndex) =>{
                     if(el) {
                         x= rowIndex;
                         //console.log(el, x,y, key);
                       tilesCreator.drawTile(el,ctx,x*16,y*16);
                        
                     }
                 
                });
                
            }); 
        })

    }
}