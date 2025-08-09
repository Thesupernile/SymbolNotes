var paragraphText = "";     // Stores the sequence of keys that the user has pressed in the past

// Create the pairings between letters and images
const letterImageMap = new Map();
letterImageMap.set('q', "symbols/notebook.png");
letterImageMap.set('w', "symbols/stop.png");
letterImageMap.set('e', "");
letterImageMap.set('r', "");
letterImageMap.set('t', "");
letterImageMap.set('y', "");
letterImageMap.set('u', "");
letterImageMap.set('i', "");
letterImageMap.set('o', "");
letterImageMap.set('p', "");

letterImageMap.set('a', "");
letterImageMap.set('s', "");
letterImageMap.set('d', "");
letterImageMap.set('f', "");
letterImageMap.set('g', "");
letterImageMap.set('h', "");
letterImageMap.set('j', "");
letterImageMap.set('k', "");
letterImageMap.set('l', "");

letterImageMap.set('z', "symbols/red.png");
letterImageMap.set('x', "symbols/orange.png");
letterImageMap.set('c', "symbols/yellow.png");
letterImageMap.set('v', "symbols/green.png");
letterImageMap.set('b', "symbols/blueLight.png");
letterImageMap.set('n', "symbols/blueDark.png");
letterImageMap.set('m', "symbols/purple.png");
letterImageMap.set(',', "symbols/pink.png");


// Register when a key is pressed and add it to the paragraphText
document.body.onkeydown = function(key){
    
    paragraphText += key.value;
    console.log(paragraphText);
}
