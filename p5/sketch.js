// http://localhost/git/AutoSave/p5/index.html

var word, charData, wordData, memory = [];
var memorySize = 10;

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

// function wordsMatchingDecompAt(word, idx, partialMatches) {
//   var matches = [];
//   for (var i = 0; i < partialMatches.length; i++) {
//     if (word.characters[idx].decomposition[0] === charData[partialMatches[i][idx]].decomposition[0]) {
//       matches.push(partialMatches[i]);
//     }
//   }
//   return matches;
// }

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

function remember(o) {
  memory.push(o);
  if (memory.length > memorySize)
    memory.shift();
}

function renderWord(word) {
  for (var i = 0; i < word.characters.length; i++) {
    renderPath(word.characters[i], i);
  }
}

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
