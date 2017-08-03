var express = require('express'),
    routes  = express.Router(),
    Aula = require('../model/aula');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//criar uma aula
routes.post('/aulas', function (req, res) {
  var aula = new Aula({
    disciplina: req.body.disciplina,
    turma: req.body.turma,
    data_hora_inicio: req.body.data,
    professor: req.body.prof,
    professor_subs: req.body.prof_subs,
    disponibilidade: req.body.disponibilidade
  })

  aula.save()
    .then(function (aula) {
      res.json({
        sucess: true,
        mensagem: "Aula criada com êxito.",
        result: aula
      })
    }, function (err) {
      retornaErro(res, err);
    })
})

//ocupar uma aula disponível
//TODO: Alertar prof da aula
routes.post('/ocupar_horario', function (req, res) {
  var id = req.body.aula;
  Aula.findById(id)
    .then(function (aula) {
      if (aula.disponibilidade){

        Aula.update({_id: id}, {$set: {
          disciplina: aula.disciplina,
          turma: aula.turma,
          data_hora_inicio: aula.data_hora_inicio,
          professor: aula.professor,
          disponibilidade: false,
          professor_subs: req.body.prof_subs
        }})
          .then((obj) => {
            res.json({
              sucess: true,
              mensagem: "Aula ocupada com sucesso.",
            })
          }, (err) => {
            res.json({
              sucess: false,
              mensagem: "Falha ao ocupar aula!"
            })
          })

      } else {
        res.json({
          sucess: false,
          mensagem: "Aula não disponível!"
        })
      }
    }, function (err) {
      retornaErro(res, err);
    })
})

//disponibilizar horário
//TODO: alertar professores
routes.post('/disponibilizar_horario', function (req, res) {
  var id = req.body.aula;
  Aula.findById(id)
    .then(function (aula) {
      if (aula.professor == req.body.prof){
        Aula.update({_id: id}, {$set: {
          disponibilidade: true
        }})
          .then((obj) => {
            res.json({
              sucess: true,
              mensagem: "Aula disponibilizada com sucesso!"
            })    
          }, (err) => {
            res.json({
              sucess: false,
              mensagem: "Falha ao disponibilizar aula!"
            })
          })
        
      } else {
        res.json({
          sucess: false,
          mensagem: "Esta aula não é sua!"
        })
      }
    }, function (err) {
      retornaErro(res, err);
    })
})

//mostrar horários
//mostrar horários ocupados
routes.get('/professores/:prof_subs/mostrar_aulas_ocupadas', function (req, res) {
  Aula.find({professor_subs: req.params.prof_subs})
    .then(function (aulas) {
      res.json({
        sucess: true,
        result: aulas
      })
    }, function (err) {
      retornaErro(res, err);
    });
})

//mostrar horários disponibilizados
routes.get('/professores/:prof/mostrar_aulas_disponibilizadas', function (req, res) {
  Aula.find({professor: req.params.prof})
    .then((aulas) => {
      var lista = []
      for (var a of aulas) {
        if (a.professor_subs || a.disponibilidade == true) {
          lista.push(a);
        }
      }
      res.json({
        sucess: true,
        result: lista
      })
    }, (err) => {
      retornaErro(res, err);
    });
})

//mostrar horários não disponibilizados
routes.get('/professores/:prof/mostrar_aulas', function (req, res) {
  Aula.find({ professor: req.params.prof })
    .then((aulas) => {
      var lista = []
      for (var a of aulas) {
        if (!a.professor_subs && a.disponibilidade == false) {
          lista.push(a);
        }
      }
      res.json({
        sucess: true,
        result: lista
      })
    }, (err) => {
      retornaErro(res, err);
    });
})

//recuperar uma aula
routes.get('/aulas/:id', (req, res) => {
  Aula.findById(req.params.id)
    .then((aula) => {
      res.json({
        sucess: true,
        result: aula
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//recuperar todas as aulas
routes.get('/aulas', (req, res) => {
  Aula.find({})
    .then((aulas) => {
      res.json({
        sucess: true,
        result: aulas
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//atualizar uma aula
routes.put('/aulas/:id', (req, res) => {
  var id = req.params.id;
  Aula.findById(id)
    .then((aula) => {
        Aula.update({_id: id}, {$set: {
          disciplina: req.body.disciplina || aula.disciplina,
          turma: req.body.turma || aula.turma,
          data_hora_inicio: req.body.data || aula.data_hora_inicio,
          professor: req.body.prof || aula.professor,
          professor_subs: req.body.prof_subs || aula.professor_subs,
          disponibilidade: req.body.disponibilidade || aula.disponibilidade
        }})
          //obj = {  "ok": 1, "nModified": 1, "n": 1}
          .then((obj) => { 
            res.json({
              sucess: true,
              mensagem: "Aula modificada com êxito."
            })
          }, (err) => {
            res.json({
              sucess: false,
              mensagem: "Falha ao modificar aula!"
            })
          })

    }, (err) => {
      retornaErro(res, err);
    })
})


//remover uma aula por ID
routes.delete('/aulas/:id', (req, res) => {
  Aula.remove({_id: req.params.id})
    .then((obj) => {
      res.json({
        sucess: true,
        mensagem: "Aula removida com sucesso."
      })
    }, (err) => {
      retornaErro(res, err);
    })
})
module.exports = routes;
