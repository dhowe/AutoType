var expect = require('chai').expect;
var utils = require('../utils');
var fs = require("fs");

describe('util-tests', function () {

  var charData, wordData;

  before(function () {
    charData = JSON.parse(fs.readFileSync('chardata.json', 'utf8'));
    wordData = JSON.parse(fs.readFileSync('wordlist.json', 'utf8'));
    console.log("    before() [" + Object.keys(charData).length +
      " chars, " + Object.keys(wordData).length + " words]");
  });

  // test cases
  describe('wordsMatchingCharAt()', function () {
    var dbg = 0;
    it('should return non-identical words matching at index', function () {
      var word = utils.randWord(charData, wordData);
      dbg && console.log("      word: "+word.literal);
      for (var i = 0; i < word.literal.length; i++) {
        dbg && console.log("        word["+i+"] = "+word.literal[i]);
        var matches = utils.wordsMatchingCharAt(word.literal, i, wordData, charData);
        dbg && console.log("        found "+matches.length+ " matches: "+matches);
        expect(matches).to.not.be.empty
        expect(matches).to.satisfy(function (words) {
          return words.every(function (raw) {
            return raw[i] === word.literal[i];
          });
        });
      }
    });
  });

  describe('wordsWithDecomp()', function () {
    var dbg = 0;
    it('should return non-identical words with matching decomp for non-matching char', function () {
      var word = utils.randWord(charData, wordData);
      dbg && console.log("      dcom: "+word.characters[0].decomposition);
      dbg && console.log("      word.literal: "+word.literal);
      var tmp = utils.wordsMatchingCharAt(word.literal, 1, wordData, charData);
      var matches = [];
      for (var i = 0; i < tmp.length; i++) {
        //console.log(word.characters[0].decomposition[0] +" =? "+charData[tmp[i][0]].decomposition[0]);
        expect(tmp[i][1]).to.equal(word.literal[1]);
        expect(tmp[i][0]).to.not.be.equal(word.literal[0]);
        if (word.characters[0].decomposition[0] === charData[tmp[i][0]].decomposition[0]) {
          matches.push(tmp[i]);
        }

      }
      dbg && console.log(matches);
      for (var i = 0; i < matches.length; i++) {
        dbg && console.log(word.characters[0].decomposition[0] +" =? "+charData[matches[i][0]].decomposition[0]);
      }
    });
  });
});
