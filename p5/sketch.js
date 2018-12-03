// http://localhost/git/AutoSave/p5/index.html

var word, charData, wordData, memory = [], memorySize = 10;

function preload() {

  charData = loadJSON('../chardata.json');
  wordData = loadJSON('../wordlist.json');
}

function setup() {

  createCanvas(1024, 512);
  textAlign(CENTER);
  textSize(18);

  word = randWord();
  remember(word.literal);

  console.log("start: ",word);

  next = findNext();
  console.log("next", next);
}

function remember(o) {
  memory.push(o);
  if (memory.length > memorySize)
    memory.shift();
}

function findNext() {

  // for a 2-char line AB CD, we want the letter that can be swapped to create a new word
  var cobj0 = word.characters[0];
  var cobj1 = word.characters[1];
  var char0 = cobj0.character;
  var char1 = cobj1.character;
  var dcmp0 = cobj0.decomposition[0];
  var dcmp1 = cobj1.decomposition[0];

  console.log(dcmp0,dcmp1);

  // check wordlist for entries with same first letter
  var list = Object.keys(wordData);
  var keep0 = [], keep1 = [], test;
  for (var i = 0; i < list.length; i++) {

    // ignore exact matches
    if (list[i] === word.literal) {
      console.log("SKIP: "+word.literal);
      continue;
    }

    // replace second char if decomp matches current 2nd
    if (list[i][0] === char0) {
      test = charData[list[i][1]];
      if (test.decomposition[0] === dcmp1) {

        // NEXT: look at both dcmp[1]/dcmp[2]
        // first-pass only add if either match
        keep0.push(list[i]);
      }
    }

    // replace first char if decomp matches current 1st
    if (list[i][1] === char1) {
      test = charData[list[i][0]];
      if (test.decomposition[0] === dcmp0) {
        // same here
        keep1.push(list[i]);
      }
    }
  }

  var idx = Math.random() * (keep0.length+keep1.length) << 0;

  console.log("keep0",keep0);
  console.log("keep1",keep1);
  //console.log("idx",idx);

  if (idx < keep0.length) {
    next = getWord(keep0[idx]);
    next.replaceChar = 1;
    next.replacePart = 1; // TODO
  }
  else {
    next = getWord(keep1[idx-keep0.length]);
    next.replaceChar = 0;
    next.replacePart = 0; // TODO
  }

  return next;
}

function drawX() {

  noLoop();
  background(245);
  renderWord(word);
}

function renderWord(word) {
  for (var i = 0; i < word.characters.length; i++) {
    renderPath(word.characters[i], i);
  }
}

function getWord(literal) {
  var chrs = [];
  for (var i = 0; i < literal.length; i++) {
    if (!charData.hasOwnProperty(literal[i])) {
      throw Error('randWord() failed: '+literal+" "+i+": "+literal[i]);
    }
    chrs.push(charData[literal[i]]);
  }
  return { literal: literal, characters: chrs };
}

function randWord() {
  return getWord(randKey(wordData));
}

function randVal(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

function randKey(obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
}

// var partIdx = 0;
//
// function drawX() {
//
//   background(245);
//   if (millis() - ts > 1000 && !mouseIsPressed) {
//     char = randomChar(charData);
//     ts = millis();
//   }
//
//   if (mouseX < width/2) partIdx = 0;
//   if (mouseX >= width/2) partIdx = 1;
//   if (mouseX >= width) partIdx = -1;
//
//   renderCharacters([randomProp(charData), randomProp(charData)]);
//   //renderPath(char, { part: partIdx });
//   //text(char.definition, width / 2, height - 10);
//   noloop();
// }

function renderPath(char, charPos, options) {

  //console.log('renderPath', char);
  var pg = options && options.renderer || this._renderer;
  if (typeof pg === 'undefined') throw Error('No renderer');
  if (typeof char.matches === 'undefined') throw Error('No matches: '+char.character);

  var pidx = -1, pos = 0;

  if (options && typeof options.part != 'undefined') pidx = options.part;
  if (typeof charPos != 'undefined' && charPos > 0) pos = charPos;

  //console.log(char.character, pidx);

  var paths = [];
  if (pidx > -1) {
    for (var i = 0; i < char.matches.length; i++) {
      if (char.matches[i] == pidx) {
        paths.push(new Path2D(char.strokes[i]));
      }
    }
  } else {
    for (var i = 0; i < char.strokes.length; i++) {
      paths.push(new Path2D(char.strokes[i]));
    }
  }

  var ctx = pg.drawingContext, adjust = true;

  for (var i = 0; i < paths.length; i++) {
    if (adjust) {
      ctx.translate(0, 512-70); // shift for mirror
      if (pos > 0) ctx.translate(512, 0); // shift for mirror
      ctx.scale(.5, -.5); // mirror-vertically
    }

    ctx.fillStyle = "#000";
    if (ctx.isPointInPath(paths[i], mouseX, mouseY)) {
      ctx.fillStyle = "#d00";
    }

    ctx.fill(paths[i]);

    /*
    ctx.strokeStyle = "#777";
    ctx.lineWidth = 6;
    ctx.stroke(paths[i]);
    */

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
  }
}
