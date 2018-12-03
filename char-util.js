const DICT = "http://localhost/git/makemeahanzi/dictionary.txt";
const STROKES = "http://localhost/git/makemeahanzi/graphics.txt";

function parseDict(lines) {

  function addData(chars, data) {
    chars[data.character] = {
      matches: data.matches,
      character: data.character,
      decomposition: data.decomposition
    };
  }
  var count = 0;

  lines.forEach(line => {
    if (line) {
      var data = JSON.parse(line);
      var dcom = data.decomposition;
      //if (dcom[0] == '？') return;

      // single left/right or top/bottom pair
      if (dcom.length == 3) {
        if (dcom[0] === '⿰' || dcom[0] === '⿱') {
          //console.log(data.character);//+": '"+data)
          addData(chars, data);
          count++;
        }
      }
    }
  });
  console.log("Processed "+count+" characters");
}

function randomProp(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

function parseStrokes(lines) {

  var count = 0;
  //var missing = 0;
  lines.forEach(line => {
    if (line) {
      var data = JSON.parse(line);
      if (chars.hasOwnProperty(data.character)) {
          if (chars[data.character].hasOwnProperty('strokes'))
            console.error("Dup. stroke data for: "+data.character);
          chars[data.character].strokes = data.strokes;
          count++;
      }
      // else {
      //   missing++;
      //   console.error(missing+") Strokes, but no char: "+data.character);
      // }
    }
  });
  console.log("Processed "+count+" paths");


  var json = JSON.stringify(chars, null, 2);
  console.log("Processed json: "+json.substring(0,300));
  //fs.writeFileSync('../data/chardata.json', json);
  saveJSON(json, 'chardata.json');

  console.log("Wrote ../data/chardata.json");
}
