var swotTypes = ['S','W','O','T'];
var swotKeys = ['project', 'data', 'rrhh', 'scope','environment'];
var template = {
  swotType:'',
  swotDesc:'',
  swotMeta: [],
  swotDate: 0
}
var docsToSave = [];
for (var i = 0 ; i<50 ; i++) {
  let newDoc = {...template};
  newDoc.swotType = swotTypes[Math.floor(Math.random() * 4)];
  newDoc.swotDesc = `${newDoc.swotType} - Item # ${(i+1)}`;
  newDoc.swotMeta = [];
  newDoc.swotMeta.push(swotKeys[Math.floor(Math.random()*5)]);
  newDoc.swotMeta.push(swotKeys[Math.floor(Math.random() * 5)]);
  newDoc.swotDate = new Date().getTime();
  docsToSave.push(newDoc);
}

db.SWOT.insertMany(docsToSave);

var filter = {}
var updateAction = { "$set": { "swotRelevance": 0 } }
db.SWOT.updateMany(filter, updateAction)
