import {Peer} from "https://esm.sh/peerjs@1.5.5?bundle-deps";

let code = "";
const submitConnection = document.getElementById("submit-connection");
const codeContainer = document.getElementById("code-container");
const codeEntryContainer = document.getElementById("code-entry");
for (const entry of codeEntryContainer.children) {
  entry.addEventListener("click", () => {
    code += entry.alt;
    const img = document.createElement("img");
    img.src = entry.src;
    codeContainer.append(img);
    console.log(code);
  });
}

let peer;

function createPeer() {
  if (peer) peer.destroy();
  peer = new Peer("symbolnotes" + code);
  console.log(peer);
  peer.on("open", (id) => {
    console.log("opened");
  });
  peer.on("connection", (incomingConn) => {
    console.log("connected");
    setupConnection(incomingConn);
  });
}

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
  console.log("creating");
  createPeer();
});

submitConnection.addEventListener("click", () => {
  peer.connect("symbolnotes" + code);
  peer.on("open", () => {
    console.log("open");
    submitConnection.classList.add("hidden");
  });
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
