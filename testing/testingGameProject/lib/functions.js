function thingLoaded(){
    things--;
    if(things == 0){
        start();
    }
}

function start(){
    console.log("started");
    //let scale =  (Math.pow(chunkWidth,2)) / ((ctx.canvas.width / chunkWidth) * (ctx.canvas.height / chunkWidth))    ;
    let scale = 1;
    //console.log(scale);
    drawTiles(map.layers[0].data,ctx,a,map.tileheight,map.layers[0].width,scale);
}

function loadFile(url){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = handleFile;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function handleFile(){
    if(xmlhttp.readyState == 4 && this.status == 200){
        map = JSON.parse(xmlhttp.responseText);
        thingLoaded();
    }
}



function drawTiles(map,ctx,tilesheet,tileSideLength,width,scale){
    // Function for drawing tiles that the player sees. Map array is a 1 dimensional arrays that have tile values. 

    let mapWidth = width;
    let tileSheetWidth = tilesheet.width / tileSideLength;
    let x = 0;
    let y = 0;

    for(let a = 0; a<map.length; a++){
        x = (a % mapWidth) * (tileSideLength * scale);
        y = Math.floor(a / mapWidth) * (tileSideLength * scale);

        if(map[a]!=0 && a < (16*16)){
            ctx.drawImage(tilesheet,
                ((map[a]-1) % tileSheetWidth) * tileSideLength,Math.floor((map[a] -1) / tileSheetWidth) * tileSideLength,
                tileSideLength,tileSideLength,
                x,y,
                tileSideLength * scale,tileSideLength * scale);
            console.log(a);
        }
        
    }
}