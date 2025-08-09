var paragraphText = "";     // Stores the sequence of keys that the user has pressed in the past

const canvas = document.getElementById("symbolText");
const ctx = canvas.getContext("2d");

// Create the pairings between letters and images
const letterImageMap = new Map();
letterImageMap.set("q", "notebook");
letterImageMap.set("w", "stop");
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

letterImageMap.set("z", "red");
letterImageMap.set("x", "orange");
letterImageMap.set("c", "yellow");
letterImageMap.set("v", "green");
letterImageMap.set("b", "blueLight");
letterImageMap.set("n", "blueDark");
letterImageMap.set("m", "purple");
letterImageMap.set(",", "pink");


// Register when a key is pressed and add it to the paragraphText
document.body.onkeydown = function(key){
    paragraphText += key.key;
    console.log(paragraphText);
    drawText();
}

function drawText(){
    let drawX = 0;
    let drawY = 0;

    const XIncrement = 64;
    const YIncrement = 64;

    for (let i = 0; i < paragraphText.length; i++){
        ctx.drawImage(document.getElementById(letterImageMap.get(paragraphText[i])), drawX, drawY);
        drawX += XIncrement;
        if (drawX + XIncrement > canvas.width){
            drawX = 0;
            drawY += YIncrement;
        }
    }
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
