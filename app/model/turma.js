var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Turma = new Schema({
  curso: { type: String },
  serie: { type: String }
})

module.exports = mongoose.model('Turma', Turma);
