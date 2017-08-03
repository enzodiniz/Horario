var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Aula = new Schema({
  disciplina: { type: Schema.ObjectId },
  turma: { type: Schema.ObjectId },
  data_hora_inicio: { type: Date },
  professor: { type: Schema.ObjectId },
  professor_subs: { type: Schema.ObjectId },
  disponibilidade: { type: Boolean }
});

module.exports = mongoose.model('Aula', Aula)
