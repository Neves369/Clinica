const router = require('express-promise-router')();
const convenioController = require('../controllers/convenio.controller');

// ==> CRUD - 'Convenio':

// ==> Criar um novo 'Convenio': (POST): localhost:3000/convenios
router.post('/convenios', convenioController.createConvenio);

// ==> Listar todos os 'convenios': (GET): localhost:3000/convenios
router.get('/convenios/', convenioController.listAllConvenios);

// ==> Selecionar 'convenio' pela 'descricao': (GET): localhost:3000/convenios/descricao
router.get('/convenios/:nome', convenioController.findConvenioByNome);

// ==> Atualizar 'convenio' pelo 'id': (PUT): localhost: 3000/convenios/id
router.put('/convenios/:id', convenioController.updateConvenioById);

// // ==> Excluir 'convenio' pelo 'descricao': (DELETE): localhost:3000/convenios/descricao
// router.delete('/convenios/:nome', convenioController.deleteConvenioByNome);

module.exports = router;
