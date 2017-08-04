var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Turma = new Schema({
  // Antonio: vamos restringir curso por enquanto com um
  // enum: ['Informática', 'Geologia', ...]
  curso: { type: String },
  // Antonio: mesma coisa para série.
  // enum: ['1o ano', ...]
  serie: { type: String }
})

// Antonio: criei esse índice para fazer um teste. Observe no test/turma.js
// como deve ser o retorno
Turma.index({ curso: 1, serie: 1}, { unique: true });

module.exports = mongoose.model('Turma', Turma);
