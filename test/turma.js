//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Turma = require('../app/model/turma');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Turmas', () => {
  beforeEach((done) => { //Before each test we empty the database
    Turma.remove({}, (err) => {
     done();
    });
  });

  describe('/POST turma', () => {
    it('deve criar uma turma sem erros', (done) => {
      let turma = {
        curso: "Informática",
        serie: "1o ano"
      }
      chai.request(server)
        .post('/api/turmas')
        .send(turma)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.nested.property('result.curso');
          res.body.should.have.nested.property('result.serie');
          res.body.should.not.have.nested.property('result.__v');
          done();
        });
    });

    it('não deve criar uma turma já existente', (done) => {
      let turma = {
        curso: "Informática",
        serie: "1o ano"
      }
      chai.request(server)
        .post('/api/turmas')
        .send(turma)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          chai.request(server)
            .post('/api/turmas')
            .send(turma)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.deep.property('message').equal('A turma especificada já existe.');
              done();
            });
        });
    }); // não deve criar uma turma já existente
  });
});
