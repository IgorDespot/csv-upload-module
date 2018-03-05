const getAll = require('lib/orion-module-new').listEntities;

exports = module.exports = function(req, res, next) {

  getAll().then(function(entities) {
    res.render('entities', {data: entities});
  }).catch((error) => {
    res.render('entities', {msg: error});
  });

}
