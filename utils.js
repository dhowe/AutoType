function addTwoNumbers(x, y) {
  return x + y;
}

function randWord(charData, wordData) {
  return getWord(charData, randKey(wordData));
}

function randVal(obj) {
  var keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
}

function randKey(obj) {
  var keys = Object.keys(obj);
  return keys[keys.length * Math.random() << 0];
}

function getWord(charData, literal) {
  var chrs = [];
  for (var i = 0; i < literal.length; i++) {
    if (!charData.hasOwnProperty(literal[i])) {
      throw Error('randWord() failed: ' + literal + " " + i + ": " + literal[i]);
    }
    chrs.push(charData[literal[i]]);
  }
  return { literal: literal, characters: chrs };
}

function wordsMatchingCharAt(literal, idx, wordData, charData) {

  if (idx < 0 || idx > literal.length) throw Error("Bad idx: "+idx);

  var matches = [];
  var list = Object.keys(wordData);
  for (var i = 0; i < list.length; i++) {
    // ignore exact matches
    if (list[i] !== literal && list[i][idx] === literal[idx]) {
       matches.push(list[i]);
    }
  }
  return matches;
}

if (typeof module != 'undefined') module.exports = {
    getWord: getWord,
    randVal: randVal,
    randKey: randKey,
    randWord: randWord,
    addTwoNumbers: addTwoNumbers,
    wordsMatchingCharAt: wordsMatchingCharAt
};
