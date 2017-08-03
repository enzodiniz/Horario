var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Professor = new Schema({
  nome: { type: String },
  email: { type: String },
  senha: { type: String },
  alertas: { type: [ Schema.ObjectId ] }
})

module.exports = mongoose.model('Professor', Professor);
