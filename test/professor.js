//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Professor = require('../app/model/professor');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Professores', () => {
  beforeEach((done) => { //Before each test we empty the database
    Professor.remove({}, (err) => {
     done();
    });
  });

  describe('/POST professor', () => {
    it('deve criar um professor sem erros', (done) => {
      let professor = {
        nome: "Professor",
        sobrenome: "Matemático",
        senha: "123456",
        email: "userone@gmail.com"
      }
      chai.request(server)
        .post('/api/professores')
        .send(professor)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.nested.property('result.nome');
          res.body.should.have.nested.property('result.sobrenome');
          res.body.should.have.nested.property('result.email');
          res.body.should.have.nested.property('result.senha');
          res.body.should.have.nested.property('result.alertas');
          res.body.should.not.have.nested.property('result.__v');
          done();
        });
    });
  });
});
