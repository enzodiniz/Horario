var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Disc = new Schema({
  professor: { type: Schema.ObjectId },
  titulo: { type: String },
  turma: { type: Schema.ObjectId },
  //carga_horaria
});

module.exports = mongoose.model('Disciplina', Disc)
