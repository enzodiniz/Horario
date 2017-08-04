//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Disciplina = require('../app/model/disciplina');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Disciplinas', () => {
  beforeEach((done) => { //Before each test we empty the database
    Disciplina.remove({}, (err) => {
     done();
    });
  });

  describe('/POST disciplina', () => {
    it('deve criar uma disciplina sem erros', (done) => {
      let professor = {
        nome: "Professor",
        sobrenome: "Matemático",
        senha: "123456",
        email: "userone@gmail.com"
      }
      let turma = {
        curso: "Informática",
        serie: "1o ano"
      }
      // Criando professor...
      chai.request(server)
        .post('/api/professores')
        .send(professor)
        .end((err, resProfessor) => {
          resProfessor.body.should.have.property('success').eql(true);
          // Criando turma...
          chai.request(server)
            .post('/api/turmas')
            .send(turma)
            .end((err, resTurma) => {
              resTurma.body.should.have.property('success').eql(true);
              // Criando disciplina...
              let disciplina = {
                professor: resProfessor.body._id,
                turma: resTurma.body._id,
                serie: "Matemática"
              }
              chai.request(server)
                .post('/api/disciplinas')
                .send(disciplina)
                .end((err, res) => {
                  res.body.should.have.property('success').eql(true);
                  done();
                }); // Criando disciplina...
            }); // Criando turma...
        }); // Criando professor...
    }); // deve criar uma disciplina sem erros

  });
});
