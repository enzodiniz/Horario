var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Professor = new Schema({
  nome: { type: String },
  // Antonio: use nome e sobrenome
  email: { type: String },
  // Antonio: use o módulo mongoose-type-email para validar email
  senha: { type: String },
  // Antonio: para alertas, importe o schema Alerta e abaixo use type: [ Alerta ]
  alertas: { type: [ Schema.ObjectId ] }
})

module.exports = mongoose.model('Professor', Professor);
