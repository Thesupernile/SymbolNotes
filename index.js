import {Peer} from "https://esm.sh/peerjs@1.5.5?bundle-deps";

const peer = new Peer();
let conn = null;
let code = "";
const submitConnection = document.getElementById("submit-connection");
const connectionInput = document.getElementById("connection-input");

submitConnection.addEventListener("click", () => {
  peer.connect("symbolnotes" + code);
  peer.on("open", () => {
    submitConnection.classList.add("hidden");
  });
});

var paragraphText = "";     // Stores the sequence of keys that the user has pressed in the past

const canvas = document.getElementById("symbolText");
const ctx = canvas.getContext("2d");

// Create the pairings between letters and images
const letterImageMap = new Map();
letterImageMap.set("q", "symbols/notebook.png");
letterImageMap.set("w", "symbols/stop.png");
letterImageMap.set("e", "");
letterImageMap.set("r", "");
letterImageMap.set("t", "");
letterImageMap.set("y", "");
letterImageMap.set("u", "");
letterImageMap.set("i", "");
letterImageMap.set("o", "");
letterImageMap.set("p", "");

letterImageMap.set("a", "");
letterImageMap.set("s", "");
letterImageMap.set("d", "");
letterImageMap.set("f", "");
letterImageMap.set("g", "");
letterImageMap.set("h", "");
letterImageMap.set("j", "");
letterImageMap.set("k", "");
letterImageMap.set("l", "");

letterImageMap.set("z", "symbols/red.png");
letterImageMap.set("x", "symbols/orange.png");
letterImageMap.set("c", "symbols/yellow.png");
letterImageMap.set("v", "symbols/green.png");
letterImageMap.set("b", "symbols/blueLight.png");
letterImageMap.set("n", "symbols/blueDark.png");
letterImageMap.set("m", "symbols/purple.png");
letterImageMap.set(",", "symbols/pink.png");


// Register when a key is pressed and add it to the paragraphText
<<<<<<< HEAD
document.body.onkeydown = function(key){
    paragraphText += key.key;
    console.log(paragraphText);
    drawText();
}

function drawText(){
    
}


function resizePage(){
    var canvas = document.getElementById("symbolText");
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.8;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(222, 230, 246, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = window.onresize = function() {
    resizePage();
}
=======
document.body.onkeydown = function (key) {

  paragraphText += key.value;
  console.log(paragraphText);
};
>>>>>>> 98ea1774fb280084f33b3527be8651112548e832
