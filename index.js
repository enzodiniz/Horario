var express    = require('express'),
    app        = express(),
    router     = express.Router(),
    mongoose   = require('mongoose'),
    bodyParser = require ('body-parser')

mongoose.Promisse = global.Promisse
//string de conexão com o banco de dados.
mongoose.connect("mongodb://horario-app:s3d4hj@localhost/horario", {
	useMongoClient: true
});

app.use(bodyParser.json())

//rotas
router.use(require("./app/routes/aula_routes"))
router.use(require("./app/routes/disciplina_routes"))
router.use(require("./app/routes/professor_routes"))
router.use(require("./app/routes/turma_routes"))

app.use('/api', router)
app.listen(3000, function () {
	console.log("Escutando na porta 3000!");
})