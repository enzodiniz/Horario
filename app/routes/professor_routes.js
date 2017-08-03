var express = require('express'),
    routes  = express.Router(),
    Professor = require('../model/professor');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//adicionar um professor
routes.post('/professores', (req, res) => {
  var prof = new Professor({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    alertas: req.body.alertas
  })
  prof.save()
    .then((prof) => {
      res.json({
        sucess: true,
        mensagem: "Professor adicionado com sucesso.",
        result: prof
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//recuperar um professor
routes.get('/professores/:id', (req, res) => {
  Professor.findById(req.params.id)
    .then((prof) => {
      res.json({
        sucess: true,
        result: prof
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//recuperar todos os professores
routes.get('/professores', (req, res) => {
  Professor.find({})
    .then((profs) => {
      res.json({
        sucess: true,
        result: profs
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//atualizar um professor
routes.put('/professores/:id', (req, res) => {

  //se o id não existir ele virá null
  var id = req.params.id;
  Professor.findById(id)
    .then((prof) => {
        Professor.update({_id: id}, {$set: {
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
          alertas: req.body.alertas
        }})
          //obj = {  "ok": 1, "nModified": 1, "n": 1}
          .then((obj) => { 
            res.json({
              sucess: true,
              mensagem: "Professor modificado com sucesso."
            })
          })

    }, (err) => {
      retornaErro(res, err);
    })

  // Professor.update({_id: req.params.id}, {$set: {
  //   nome: req.body.nome,
  //   email: req.body.email,
  //   senha: req.body.senha,
  //   alertas: req.body.alertas
  // }})
  //   .then((obj) => {
  //     res.json({
  //       sucess: true,
  //       result: obj
  //     })
  //   }, (err) => {
  //     retornaErro(res, err);
  //   })
})


//remover um professor por ID
routes.delete('/professores/:id', (req, res) => {
  Professor.remove({_id: req.params.id})
    .then((obj) => {
      res.json({
        sucess: true,
        mensagem: "Professor removido com sucesso."
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

module.exports = routes;
