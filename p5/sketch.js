// http://localhost/git/AutoSave/p5/index.html

var word, charData, wordData, memory = [],
  memorySize = 10;

function preload() {

  charData = loadJSON('../chardata.json');
  wordData = loadJSON('../wordlist.json');
}

function setup() {

  createCanvas(1024, 512);
  textAlign(CENTER);
  textSize(18);

  console.log(Object.keys(charData).length + " chars");
  console.log(Object.keys(wordData).length + " words");

  word = randWord(charData, wordData);
  remember(word.literal);
  console.log("start:", word, word.characters[0].decomposition[0]);
  renderWord(word);
  next = findNext();
  console.log("next:", next);
}

function wordsMatchingDecompAtNonMatchingChar(word, partialMatches) {
  var matches = [];
  for (var i = 0; i < partialMatches.length; i++) {
    //console.log(word.characters[0].decomposition[0] +" =? "+charData[tmp[i][0]].decomposition[0]);

    // 1st character matches, check decomp of 2nd
    if (word.literal[0] === partialMatches[i][0]) {
      if (word.characters[1].decomposition[0] === charData[partialMatches[i][1]].decomposition[0]) {
        matches.push(partialMatches[i]);
      }
    }

    // 2nd character matches, check decomp of 1st
    else { //if (word.literal[1] === partialMatches[i][1]) {
      if (word.characters[0].decomposition[0] === charData[partialMatches[i][0]].decomposition[0]) {
        matches.push(partialMatches[i]);
      }
    }
  }
  return matches;
}

function wordsMatchingDecompAt(word, idx, partialMatches) {
  var matches = [];
  for (var i = 0; i < partialMatches.length; i++) {
    if (word.characters[idx].decomposition[0] === charData[partialMatches[i][idx]].decomposition[0]) {
      matches.push(partialMatches[i]);
    }
  }
  return matches;
}


function findNextX() {

  var keep0 = wordsMatchingCharAt(word.literal, 1, wordData, charData);
  var keep1 = wordsMatchingCharAt(word.literal, 0, wordData, charData);
  var matches0 = wordsMatchingDecompAt(word, 1, keep0);
  var matches1 = wordsMatchingDecompAt(word, 0, keep1);

  var matches = matches0.concat(matches1);

  console.log("word: " + word.literal + " " + word.characters[0].decomposition[0] + word.characters[1].decomposition[0]);
  console.log(matches);
  for (var i = 0; i < matches.length; i++) {
    var s = i + ") " + matches[i] + " ";
    s += (matches[i][0] === word.literal[0]) ? charData[matches[i][1]].decomposition[0] : charData[matches[i][0]].decomposition[0];
    console.log(s);
  }

  if (matches.length) return matches[random(matches.length) << 0];
}

function findNextNEW() {

  var keep0 = wordsMatchingCharAt(word.literal, 1, wordData, charData);
  var matches0 = wordsMatchingDecompAt(word, 0, keep0);

  var matches = matches0;
  console.log(matches);
  for (var i = 0; i < matches.length; i++) {
    var s = i + ") " + matches[i] + " ";
    s += (matches[i][0] === word.literal[0]) ? charData[matches[i][1]].decomposition[0] : charData[matches[i][0]].decomposition[0];
    console.log(s);
  }

  var keep1 = wordsMatchingCharAt(word.literal, 0, wordData, charData);
  var matches1 = wordsMatchingDecompAt(word, 1, keep0);

  matches = matches1;
  console.log(matches);
  for (var i = 0; i < matches.length; i++) {
    var s = i + ") " + matches[i] + " ";
    s += (matches[i][0] === word.literal[0]) ? charData[matches[i][1]].decomposition[0] : charData[matches[i][0]].decomposition[0];
    console.log(s);
  }
}

function findNext() {

  var keep0 = wordsMatchingCharAt(word.literal, 1, wordData, charData);
  var keep1 = wordsMatchingCharAt(word.literal, 0, wordData, charData);
  var matches = wordsMatchingDecompAtNonMatchingChar(word, keep0.concat(keep1));
  console.log("word: " + word.literal + " " + word.characters[0].decomposition[0] + word.characters[1].decomposition[0]);
  console.log(matches);
  for (var i = 0; i < matches.length; i++) {
    var s = i + ") " + matches[i] + " ";
    s += (matches[i][0] === word.literal[0]) ? matches[i][0]+charData[matches[i][1]].decomposition[0] : charData[matches[i][0]].decomposition[0]+matches[i][1];
    console.log(s);
  }

  if (matches.length) return matches[random(matches.length) << 0];
}

function findNextOK2() {

  var matches = [];
  var tmp = wordsMatchingCharAt(word.literal, 1, wordData, charData);
  for (var i = 0; i < tmp.length; i++) {
    //console.log(word.characters[0].decomposition[0] +" =? "+charData[tmp[i][0]].decomposition[0]);
    if (word.characters[0].decomposition[0] === charData[tmp[i][0]].decomposition[0]) {
      matches.push(tmp[i]);
    }
  }

  tmp = wordsMatchingCharAt(word.literal, 0, wordData, charData);
  for (var i = 0; i < tmp.length; i++) {
    //console.log(word.characters[0].decomposition[0] +" =? "+charData[tmp[i][0]].decomposition[0]);
    if (word.characters[1].decomposition[0] === charData[tmp[i][1]].decomposition[0]) {
      matches.push(tmp[i]);
    }
  }

  // console.log(matches);
  // for (var i = 0; i < matches.length; i++) {
  //   console.log(i+") "+charData[matches[i][0]].decomposition[0]);
  // }

  if (matches.length) return matches[random(matches.length) << 0];
}

function drawX() {

}

function remember(o) {
  memory.push(o);
  if (memory.length > memorySize)
    memory.shift();
}

function wordsMatchingCharAtXX(idx) {

  // globals: word, wordData, charData

  var cobj0 = word.characters[0];
  var cobj1 = word.characters[1];
  var char0 = cobj0.character;
  var char1 = cobj1.character;
  var dcmp0 = cobj0.decomposition[0];
  var dcmp1 = cobj1.decomposition[0];

  console.log(dcmp0, dcmp1);

  //var keep0 = [], keep1 = [];

  var tmp0 = wordsMatchingCharAt(word.literal, 1, wordData, charData);
  for (var i = 0; i < tmp0.length; i++) {
    charData[tmp0[i][1]].decomposition[0] === dcmp1
  }

  var keep1 = wordsMatchingCharAt(word.literal, 0, wordData, charData);

  // check wordlist for entries exactly one matching letter
  var list = Object.keys(wordData);
  for (var i = 0; i < list.length; i++) {

    // ignore exact matches
    if (list[i] === word.literal) continue;

    // save if first is same and 2nd matches decomp
    if (list[i][0] === char0 && charData[list[i][1]].decomposition[0] === dcmp1) {

      // NEXT: look at both dcmp[1]/dcmp[2]
      // first-pass only add if either match
      keep0.push(list[i]);
    }

    // or if second is same and 1st matches decomp
    if (list[i][1] === char1 && charData[list[i][0]].decomposition[0] === dcmp0) {
      // same here
      keep1.push(list[i]);
    }
  }

  return { keep0: keep0, keep1: keep1 };
}

function findNextX() {

  // for a 2-char line AB CD, we want the char
  // that can be swapped to create a new word
  var cobj0 = word.characters[0];
  var cobj1 = word.characters[1];
  var char0 = cobj0.character;
  var char1 = cobj1.character;
  var dcmp0 = cobj0.decomposition[0];
  var dcmp1 = cobj1.decomposition[0];

  console.log(dcmp0, dcmp1);
  var keep0 = [],
    keep1 = [];

  // check wordlist for entries exactly one matching letter
  var list = Object.keys(wordData);
  for (var i = 0; i < list.length; i++) {

    // ignore exact matches
    if (list[i] === word.literal) continue;

    // save if first is same and 2nd matches decomp
    if (list[i][0] === char0 && charData[list[i][1]].decomposition[0] === dcmp1) {

      // NEXT: look at both dcmp[1]/dcmp[2]
      // first-pass only add if either match
      keep0.push(list[i]);
    }

    // or if second is same and 1st matches decomp
    if (list[i][1] === char1 && charData[list[i][0]].decomposition[0] === dcmp0) {
      // same here
      keep1.push(list[i]);
    }
  }

  var orient = (dcmp1 == '⿰' ? ["left", "right"] : ["top", "bottom"]);
  console.log("Replace 2nd (" + char1 + ") by finding " + orient[0] + "=" + cobj1.decomposition[1] + " or " + orient[1] + "=" + cobj1.decomposition[2]);

  var matches = [];

  console.log("keep0", keep0);
  // look through all options for 2nd character to see if we can match a part
  for (var i = 0; i < keep0.length; i++) {
    var test = charData[keep0[i][1]];
    console.log("                    " + nf(i, 2) + ": " + keep0[i][1] + ") " +
      orient[0] + "=" + test.decomposition[1] + "    " +
      orient[1] + "=" + test.decomposition[2]);

    if (test.decomposition[1] == cobj1.decomposition[1]) {
      console.log("                    HIT(" + orient[0] + ") " + keep0[i] + " ***************");
      matches.push(keep0[i]);
    } else if (test.decomposition[2] == cobj1.decomposition[2]) {
      console.log("                    HIT(" + orient[1] + ") " + keep0[i] + " ***************");
      matches.push(keep0[i]);
    }
    //console.log("               with "+orient[1]+": "+test.decomposition[2]+" "+(test.decomposition[2]==cobj1.decomposition[2]));
  }

  var idx = Math.random() * (keep0.length + keep1.length) << 0;

  //console.log("idx",idx);

  // if (idx < keep0.length) {
  //   next = getWord(keep0[idx]);
  //   next.replaceChar = 1;
  //   next.replacePart = 1; // TODO
  // } else {
  //   next = getWord(keep1[idx - keep0.length]);
  //   next.replaceChar = 0;
  //   next.replacePart = 0; // TODO
  // }

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
  if (typeof char.matches === 'undefined') throw Error('No matches: ' + char.character);

  var pidx = -1,
    pos = 0;

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

  var ctx = pg.drawingContext,
    adjust = true;

  for (var i = 0; i < paths.length; i++) {
    if (adjust) {
      ctx.translate(0, 512 - 70); // shift for mirror
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
