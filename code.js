let player = {
    pos:new Vector(1,400),
    v: new Vector (0,0),
    a: new Vector (0,0.2),
    width:32,
    height:32,
    movingLeft: false,
    movingRight: false,
    inAir: true
};

player.collide = function(){
    let minY = this.pos.y;
    let maxY = this.pos.y + 32;
    let minX = this.pos.x;
    let maxX = this.pos.x + 32;

    //Bottom Left
    let infoBL = tileCheck(map,minX,maxY);
    //Bottom Right
    let infoBR = tileCheck(map,minY,maxY);
    //Top Left
    if(infoBR[0] && infoBL[0]){
        console.log("Collision at feet");
        this.v.y=0;
        this.pos.y = infoBR[2] - 32;
        
        this.inAir = false;
    }

    
}
player.jump   = function(){
    
    
    if(this.inAir==false){
    this.v.y+=-10;
    this.inAir = true;}
    
    }

player.update = function(){
    
    if(this.movingLeft){
        player.moveLeft();
    }
    if(this.movingRight){
        player.moveRight();
    }
    if(this.inAir==true){
    this.v.add(this.a)};
    this.pos.x += this.v.x;
    this.pos.y += this.v.y;
    if(this.inAir==false){
    this.v.x=0;};
    
};
player.moveRight = function(){
    console.log("hey");
    if(this.v.x<5){
        this.v.x = 10;
    }
}

player.moveLeft = function(){
        this.v.x = -10;
}
player.draw = function(){
    ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height);
};


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let things = 2;
let chunk = 0;

let mapWidth = 30;

let mapUrl = "img/maps/new_map.json"
let map,newMap;
let xmlhttp;
loadFile(mapUrl);

let a = new Image();
a.onload = thingLoaded;
a.src = "img/spritesheets/exampleTilesheet.png";

document.onkeydown = function checkKeyDown(event) {

    event = event || window.event;

    if (event.keyCode == '38') {
        // up 
        player.jump(); 
    }
    else if (event.keyCode == '40') {
        // down arrow
    }
    else if (event.keyCode == '37') {
       // left arrow
       player.movingLeft = true;
    }   
    else if (event.keyCode == '39') {
       // right arrow
       player.movingRight = true;
    }};
document.onkeyup = function checkKeyUp(e){
   
    
    if (e.keyCode == 37 ){
        player.movingLeft = false;
        
       
    }
    if (e.keyCode == 39 ){
        player.movingRight = false;
    }};  




