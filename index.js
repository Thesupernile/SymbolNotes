import {Peer} from "https://esm.sh/peerjs@1.5.5?bundle-deps";

let myCode = "";
let peerCode = "";

const myCodeContainer = document.getElementById("my-code-container");
const myCodeEntry = document.getElementById("my-code-entry");
const peerCodeContainer = document.getElementById("peer-code-container");
const peerCodeEntry = document.getElementById("peer-code-entry");
const submitConnection = document.getElementById("submit-connection");

for (const entry of myCodeContainer.children) {
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

let peer;

function setupConnection(conn) {
  conn.on("open", () => {
    console.log("connected to", conn.peer);
    submitConnection.classList.add("hidden");
  });
  conn.on("data", (data) => {
    console.log("received", data);
  });
}

submitConnection.addEventListener("click", () => {
  if (!peer || !myCode || !peerCode) return;
  const conn = peer.connect("symbolnotes" + peerCode);
  setupConnection(conn);
});

var paragraphText = "";     // Stores the sequence of keys that the user has pressed in the past

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
document.body.onkeydown = function (key) {

  paragraphText += key.value;
  console.log(paragraphText);
};
