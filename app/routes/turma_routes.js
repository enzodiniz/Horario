var express = require('express'),
    routes  = express.Router(),
    Turma   = require('../model/turma');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//criar uma turma
routes.post('/turmas',  function (req, res) {
  var turma = new Turma({
    curso: req.body.curso,
    serie: req.body.serie
  })

  turma.save()
    .then(function (turma) {
      res.json({
        sucess: true,
        result: turma
      })
    }, function (err) {
      retornaErro(res, err);
    })
})

//recuperar uma turma por ID
routes.get('/turmas/:id', function (req, res) {
  Turma.findById(req.params.id)
    .then((trm) => {
      console.log(trm);
      res.json({
        sucess: true,
        result: trm
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//recuperar todas as turmas
routes.get('/turmas', (req, res) => {
  Turma.find({}).then((turmas) => {
    res.json({
      sucess: true,
      result: turmas
    })
  }, (err) => {
    retornaErro(res, err)
  })
})

//modificar uma turma
routes.put('/turmas/:id', function (req, res) {
  var id = req.params.id;
  Turma.findById(id)
    .then((trm) => {
        Turma.update({_id: id}, {$set: {
          curso: req.body.curso || trm.curso,
          serie: req.body.serie || trm.serie
        }})
          //obj = {  "ok": 1, "nModified": 1, "n": 1}
          .then((obj) => { 
            res.json({
              sucess: true,
              mensagem: "Turma modificada com sucesso."
            })
          })

    }, (err) => {
      retornaErro(res, err);
    })
})

//remover uma turma por ID
routes.delete('/turmas/:id', function (req, res) {
  Turma.remove({_id: req.params.id})
    .then((obj) => {
      res.json({
        sucess: true,
        mensagem: "Turma removida com sucesso."
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

module.exports = routes;
