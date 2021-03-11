function thingLoaded(){
    things--;
    if(things == 0){
        start();
    }
}

function start(){
    console.log("started");
    let chunk = 1;
    let newMap = mapArray(map.layers[0].data);
    drawTiles(newMap,ctx,a,map.tileheight,mapWidth,chunk);
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



function drawTiles(map,ctx,tilesheet,tileSideLength,width,chunk){
    // Function for drawing tiles that the player sees. Map array is a 1 dimensional arrays that have tile values.
    let tileSheetWidth = tilesheet.width / tileSideLength;
    let x = 0;
    let y = 0;

    let scale = (canvas.width / width) / tileSideLength;

    for(let row = 0; row<map[chunk].length; row++){
        console.log(map[chunk][row]);
        for(let col = 0; col<map[chunk][row].length; col++){
            console.log(row,col);
            if(map[chunk][row][col] != 0){
                ctx.drawImage(tilesheet,
                    ((map[chunk][row][col]-1) % tileSheetWidth) * tileSideLength, Math.floor((map[chunk][row][col] -1) / tileSheetWidth) * tileSideLength,
                    tileSideLength, tileSideLength,
                    x,y,
                    tileSideLength * scale, tileSideLength * scale);
            }
            x += tileSideLength;
        }
        x = 0;
        y += tileSideLength;
    }
}

function mapArray(map){
    let newArray = new Array(100);
    for(let i = 0; i<newArray.length; i++){
        newArray[i] = new Array();
    }
    console.log(newArray);
    let tempArray = [];
    let row = 0;
    let col = 0;
    for(let t = 0; t<map.length; t++){
        tempArray.push(map[t]);
        if((t+1) % 30 == 0){
            newArray[col + (row * 10)].push(tempArray);
            tempArray = [];
            col++;
        }
        if(col >= 10){
            col = 0;
        }
        if((t+1) % 4800 == 0){
            row++;
        }
    }
    return newArray;
}