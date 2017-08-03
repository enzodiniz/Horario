var express 	= require('express'),
	routes 		= express.Router(),
	Disciplina 	= require('../model/disciplina');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//criar uma disciplina
routes.post('/disciplinas',  function (req, res) {
  var disc = new Disciplina({
    professor: req.body.prof,
    titulo: req.body.titulo,
    turma: req.body.turma
  })

  disc.save()
    .then(function (disc) {
      res.json({
        sucess: true,
        result: disc
      })
    }, function (err) {
      retornaErro(res, err);
    })
})

//recuperar uma disc. por ID
routes.get('/disciplinas/:id', function (req, res) {
  Disciplina.findById(req.params.id)
    .then((disc) => {
      res.json({
        sucess: true,
        result: disc
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//recuperar todas as disciplinas
routes.get('/disciplinas', (req, res) => {
  Disciplina.find({}).then((discs) => {
    res.json({
      sucess: true,
      result: discs
    })
  }, (err) => {
    retornaErro(res, err)
  })
})

//modificar uma disciplina
routes.put('/disciplinas/:id', function (req, res) {
  var id = req.params.id;
  Disciplina.findById(id)
    .then((disc) => {
        Disciplina.update({_id: id}, {$set: {
          professor: req.body.prof || disc.professor,
    		  titulo: req.body.titulo || disc.titulo,
    		  turma: req.body.turma || disc.turma
        }})
          //obj = {  "ok": 1, "nModified": 1, "n": 1}
          .then((obj) => { 
            res.json({
              sucess: true,
              mensagem: "Disciplina modificada com êxito."
            })
          })

    }, (err) => {
      retornaErro(res, err);
    })
})

//remover uma disciplina por ID
routes.delete('/disciplinas/:id', function (req, res) {
  Disciplina.remove({_id: req.params.id})
    .then((obj) => {
      res.json({
        sucess: true,
        mensagem: "Disciplina removida com sucesso."
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

module.exports = routes;