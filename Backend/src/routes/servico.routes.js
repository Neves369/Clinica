const router = require('express-promise-router')();
const servicoController = require('../controllers/servico.controller');

// ==> CRUD - 'Servico':

// ==> Criar um novo 'Servico': (POST): localhost:3000/servicos
router.post('/servicos', servicoController.createServico);

// ==> Listar todos os 'servicos': (GET): localhost:3000/servicos
router.get('/servicos', servicoController.listAllServicos);

// ==> Selecionar 'Servico' pelo 'descricao': (GET): localhost:3000/servicos/descricao
router.get('/servicos/:descricao', servicoController.findServicoByDescricao);

// ==> Atualizar 'Servico' pela 'descricao': (PUT): localhost: 3000/servicos/descricao
router.put('/servicos/:id', servicoController.updateServicoById);

// // ==> Excluir 'Servico' pelo 'descricao': (DELETE): localhost:3000/servicos/descricao
// router.delete('/servicos/:descricao', servicoController.deleteServicoByDescricao);

module.exports = router;
