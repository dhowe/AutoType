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

// function wordsMatchingCharAt(literal, idx, wordData, charData) {
// }

// function wordsMatchingDecompAt(decomp, idx, words) {
//
// }

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
//   var cobj0 = word.characters[0];
//   var cobj1 = word.characters[1];
//   var char0 = cobj0.character;
//   var char1 = cobj1.character;
//   var dcmp0 = cobj0.decomposition[0];
//   var dcmp1 = cobj1.decomposition[0];
//
//   console.log(dcmp0, dcmp1);
//
//   var matches = [];
//
//   // check wordlist for entries exactly one matching letter/char
//   var list = Object.keys(wordData);
//   for (var i = 0; i < list.length; i++) {
//
//     var check = list[i];
//
//     // ignore exact matches
//     if (list[i] === word.literal) continue;
//
//     for (var i = 0; i < array.length; i++) {
//       array[i]
//     }
//
//     // save if first is same and 2nd matches decomp
//     if (list[i][0] === char0)
//
//       // NEXT: look at both dcmp[1]/dcmp[2]
//       // first-pass only add if either match
//       matches.push(list[i]);
//     }
//
//     // or if second is same and 1st matches decomp
//     if (list[i][1] === char1 && charData[list[i][0]].decomposition[0] === dcmp0) {
//       // same here
//       keep1.push(list[i]);
//     }
//   }
//
//   return matches;
// }

if (typeof module != 'undefined') module.exports = {
    getWord: getWord,
    randVal: randVal,
    randKey: randKey,
    randWord: randWord,
    addTwoNumbers: addTwoNumbers,
    wordsMatchingCharAt: wordsMatchingCharAt
};
