let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let things = 2;

let mapWidth = 30;

let mapUrl = "img/maps/test_map2.json"
let map;
let xmlhttp;
loadFile(mapUrl);

let a = new Image();
a.onload = thingLoaded;
a.src = "img/spritesheets/exampleTilesheet.png";
