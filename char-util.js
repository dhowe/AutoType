const DICT = "http://localhost/git/makemeahanzi/dictionary.txt";
const STROKES = "http://localhost/git/makemeahanzi/graphics.txt";

function parseDict(lines) {
  var count = 0;

  lines.forEach(line => {
    if (line) {
      var data = JSON.parse(line);
      var dcom = data.decomposition;
      //if (dcom[0] == '？') return;

      // single left/right pair
      if (dcom.length==3) {
        if (dcom[0] == '⿰' && dcom[1] == '亻') {
          //console.log(data.character);//+": '"+data)
          chars[data.character] = data;
          count++;
        }
        // single top/bottom pair
        if (dcom[0] == '⿱' && dcom[1] == '') {
          //console.log(data.character);//+": '"+data)
          chars[data.character] = data;
          count++;
        }
      }
    }
  });
  console.log("Processed "+count+" characters");
}

function randomChar(obj) {
    var keys = Object.keys(obj)
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
}
