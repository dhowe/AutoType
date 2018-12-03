var fs = require("fs");
var content = fs.readFileSync("../makemeahanzi/dictionary.txt", 'utf8');
var lines = content.split('\n');
var count = 0;

lines.forEach(line => {
  if (!line) return;
  var data = JSON.parse(line);
  var dcom = data.decomposition;
  if (dcom[0] == '？') return;
  if (dcom.length==3 && dcom[0] == '⿰') {
    console.log(data.character+": '"+dcom[0]+"' "+ dcom[1] + dcom[2])
  }
  count++;
});

console.log("Processed "+count+" lines");
