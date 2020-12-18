export function loadMap() {
    return fetch('../assets/miniTileset/teest.json')
    .then(r=> r.json())    
};

export function loadImage(url) {
    return new Promise(resolve=>{
            const image = new Image();
            image.addEventListener('load',() =>{
                resolve(image);
            });
            image.src = url;
        });
       
};
