var fs = require("fs");
var entries = JSON.parse(fs.readFileSync("data/cc-cedit.json", 'utf8'));
var lookup = parseHanzi();

var words = {};
for (var i = 0; i < entries.length;i++) {
  var e = entries[i].traditional;

  // is it a 2-length word with both parts in the hanzi data?
  if (e.length == 2 && doLookup(lookup, e)) {
    words[e] = 1;
    console.log(e);
  }
}

console.log("Found "+Object.keys(words).length+" words, writing...");

var json = JSON.stringify(words, null, 2);
fs.writeFileSync('data/wordlist.json', json);

console.log("Done");

function doLookup(data, e) {
  for (var i = 0; i < e.length; i++) {
    if (!data.hasOwnProperty(e[i])) return false;
  }
  return true;
}

function parseHanzi() {
  var hanzi = fs.readFileSync("data/dictionary.txt", 'utf8');
  var lines = hanzi.split('\n'), chars = {};
  console.log(lines.length+" lines");
  lines.forEach(line => {
    if (!line) return;
    var data = JSON.parse(line);
    var dcom = data.decomposition;
    if (data.decomposition.length==3) {
      chars[data.character] = 1;
    }
  });

  return chars;
}
