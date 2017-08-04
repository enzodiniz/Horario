var express    = require('express'),
    app        = express(),
    router     = express.Router(),
    mongoose   = require('mongoose'),
    bodyParser = require ('body-parser'),
    config     = require ('config')

mongoose.Promise = global.Promise

//string de conexão com o banco de dados.
mongoose.connect(config.get('db_connection_url'), {
	useMongoClient: true
});

app.use(bodyParser.json())

//rotas
router.use(require("./app/routes/aula_routes"))
router.use(require("./app/routes/disciplina_routes"))
router.use(require("./app/routes/professor_routes"))
router.use(require("./app/routes/turma_routes"))

app.use('/api', router)
var server = app.listen(3000, function () {
	console.log("Escutando na porta 3000.")
})

module.exports = server
