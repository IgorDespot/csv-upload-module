const getAll = require('lib/orion-module-new').listEntities;
const path = require('lib/orion-module-new').orionPath;

exports = module.exports = function(req, res, next) {

  getAll().then(function(entities) {
    entities.forEach(element => {
      console.log("{\n Connecting to: "+ path + "\n\t" + JSON.stringify(element, null, "\t") + "Successfuly retrieved entity \n}" + "\n");
    });
    res.render('entities', {data: entities});
  }).catch((error) => {
    res.render('entities', {msg: error});
  });

}
