var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Alerta = new Schema({
  mensagem: { type: String },
  data: { type: Date },
  dt_leitura: { type: Date },
  dt_envio: { type: Date },
  dt_recebimento: { type: Date }
  lido: { type: Boolean },
  enviado: { type: Boolean },
  recebido: { type: Boolean },
})

module.exports = mongoose.model('Alerta', alerta);
