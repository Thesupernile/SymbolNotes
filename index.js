import {Peer} from "https://esm.sh/peerjs@1.5.5?bundle-deps";

let myCode = "";
let peerCode = "";
let peer = null;
let conn = null;

const codeEntryContainer = document.getElementById("code-entry-container");
const myCodeContainer = document.getElementById("my-code-container");
const myCodeEntry = document.getElementById("my-code-entry");
const peerCodeContainer = document.getElementById("peer-code-container");
const peerCodeEntry = document.getElementById("peer-code-entry");
const submitConnection = document.getElementById("submit-connection");
const connectedIndicator = document.getElementById("connected-indicator");

for (const entry of myCodeEntry.children) {
  entry.addEventListener("click", () => {
    myCode += entry.alt;
    const img = document.createElement("img");
    img.src = entry.src;
    myCodeContainer.append(img);
    if (peer) peer.destroy();
    peer = new Peer("symbolnotes" + myCode);
    peer.on("open", () => {
      console.log("peer opened with id", "symbolnotes" + myCode);
    });
    peer.on("connection", (incomingConn) => {
      setupConnection(incomingConn);
    });
  });
}

for (const entry of peerCodeEntry.children) {
  entry.addEventListener("click", () => {
    peerCode += entry.alt;
    const img = document.createElement("img");
    img.src = entry.src;
    peerCodeContainer.append(img);
  });
}

function setupConnection(connection) {
  conn = connection;
  conn.on("open", () => {
    console.log("connected to", conn.peer);
    codeEntryContainer.classList.add("hidden");
    connectedIndicator.classList.remove("hidden");
    setTimeout(() => connectedIndicator.classList.add("hidden"), 1500);
  });
  conn.on("data", (data) => {
    console.log("received", data);
    receiveKey(data);
  });
}

submitConnection.addEventListener("click", () => {
  if (!peer || !myCode || !peerCode) return;
  if (myCode === peerCode) {
    alert("Cannot connect to yourself.");
    return;
  }
  if (conn && conn.open) {
    console.log("Already connected");
    return;
  }
  const connection = peer.connect("symbolnotes" + peerCode);
  setupConnection(connection);
});

function sendKey(key) {
  conn.send(key);
}


var selfParagraphText = "";     // Stores the sequence of keys that the user has pressed in the past
var friendParagraphText = "";   // Stores the sequence of keys that the other user has pressed in the past

const selfCanvas = document.getElementById("symbolText");
const selfCtx = selfCanvas.getContext("2d");

const otherCanvas = document.getElementById("remoteUserText");
const otherCtx = otherCanvas.getContext("2d");

// Create the pairings between letters and images
const letterImageMap = new Map();
letterImageMap.set("q", "notebook");
letterImageMap.set("w", "stop");
letterImageMap.set("e", "dolphin");
letterImageMap.set("r", "calender");
letterImageMap.set("t", "car");
letterImageMap.set("y", "checkmark");
letterImageMap.set("u", "cross");
letterImageMap.set("i", "danger");
letterImageMap.set("o", "happy");
letterImageMap.set("p", "sad");

letterImageMap.set("a", "heart");
letterImageMap.set("s", "leftarrow");
letterImageMap.set("d", "downarrow");
letterImageMap.set("f", "uparrow");
letterImageMap.set("g", "rightarrow");
letterImageMap.set("h", "lightbulb");
letterImageMap.set("j", "moon");
letterImageMap.set("k", "star");
letterImageMap.set("l", "sun");

letterImageMap.set("z", "red");
letterImageMap.set("x", "orange");
letterImageMap.set("c", "yellow");
letterImageMap.set("v", "green");
letterImageMap.set("b", "blueLight");
letterImageMap.set("n", "blueDark");
letterImageMap.set("m", "purple");
letterImageMap.set(",", "pink");
letterImageMap.set(".", "speechbubble");

letterImageMap.set(" ", "space");


// Register when a key is pressed and add it to the paragraphText
document.body.onkeydown = function (key) {
  if (letterImageMap.has(key.key)) {
    selfParagraphText += key.key;
    sendKey(key.key);
  }
  else if (key.key === "Backspace"){
    selfParagraphText = selfParagraphText.slice(0, -1);
    sendKey(key.key);
  }
  drawText();
};

function receiveKey(key) {
  // do something
  if (letterImageMap.has(key)){
    friendParagraphText += key;
  }
  else if (key === "Backspace"){
    friendParagraphText = friendParagraphText.slice(0, -1);
  }
  drawText();
}

function drawText(){
    let userCanvas = document.getElementById("symbolText");
    let otherCanvas = document.getElementById("remoteUserText");

    let selfCanvasDrawX = 0;
    let selfCanvasDrawY = 0;

    let otherCanvasDrawX = 0;
    let otherCanvasDrawY = 0;

    const XIncrement = 64;
    const YIncrement = 64;

    canvasClear();

    for (let i = 0; i < selfParagraphText.length; i++){
        selfCtx.drawImage(document.getElementById(letterImageMap.get(selfParagraphText[i])), selfCanvasDrawX, selfCanvasDrawY);
        selfCanvasDrawX += XIncrement;
        if (selfCanvasDrawX + XIncrement > userCanvas.width){
            selfCanvasDrawX = 0;
            selfCanvasDrawY += YIncrement;
        }
    }

    for (let i = 0; i < friendParagraphText.length; i++){
        otherCtx.drawImage(document.getElementById(letterImageMap.get(friendParagraphText[i])), otherCanvasDrawX, otherCanvasDrawY);
        otherCanvasDrawX += XIncrement;
        if (otherCanvasDrawX + XIncrement > otherCanvas.width){
            otherCanvasDrawX = 0;
            otherCanvasDrawY += YIncrement;
        }
    }
}

function canvasClear(){
  let userCanvas = document.getElementById("symbolText");
  let otherCanvas = document.getElementById("remoteUserText");

  // Clear Canvases
  selfCtx.fillStyle = "rgba(222, 230, 246, 1)";
  otherCtx.fillStyle = "rgba(222, 230, 246, 1)";

  selfCtx.clearRect(0, 0, userCanvas.width, userCanvas.height);
  selfCtx.fillRect(0, 0, userCanvas.width, userCanvas.height);

  otherCtx.clearRect(0, 0, otherCanvas.width, otherCanvas.height);
  otherCtx.fillRect(0, 0, otherCanvas.width, otherCanvas.height);
}

function resizePage() {
  let userCanvas = document.getElementById("symbolText");
  let otherCanvas = document.getElementById("remoteUserText");

  userCanvas.width = window.innerWidth * 0.4;
  userCanvas.height = window.innerHeight * 0.8;

  otherCanvas.width = window.innerWidth * 0.4;
  otherCanvas.height = window.innerHeight * 0.8;

  canvasClear();

  drawText();
}

window.onload = window.onresize = function () {
  resizePage();
};
