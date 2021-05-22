const router = require('express-promise-router')();
const atendimentoController = require('../controllers/antendimento.controller');

// // ==> CRUD - 'Atendimento'

// ==> Rota responsável por criar um novo 'Atendimento': (POST): localhost:3000/atendimentos
router.post('/atendimentos', atendimentoController.createAtendimento);

// ==> Rota p/ listar todos os 'atendimentos': (GET): localhost:3000/atendimentos
router.get('/atendimentos', atendimentoController.listAllAtendimentos);

// ==> Rota p/ selecionar 'atendimento' pelo 'cpf': (GET): localhost:3000/atendimentos/nome
router.get('/atendimentos/:nome', atendimentoController.findAtendimentoByNome);

// ==> Rota responsável por atualizar 'atendimento' pelo 'id': (PUT): localhost: 3000/atendimentos/cpf
router.put('/atendimentos/:id', atendimentoController.updateAtendimentoById);

// // ==> Excluir 'atendimento' pelo 'id': (DELETE): localhost:3000/atendimentos/id
// router.delete('/atendimentos/:id', atendimentoController.deleteAtendimentoById);

module.exports = router;
