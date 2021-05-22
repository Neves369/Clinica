const router = require('express-promise-router')();
const medicoController = require('../controllers/medico.controller');

// ==> CRUD - 'Medico':

// ==> Rota responsável por criar um novo 'Medico': (POST): localhost:3000/medicos
router.post('/medicos', medicoController.createMedico);

// ==> Rota p/ listar todos os 'Medicos': (GET): localhost:3000/medicos
router.get('/medicos', medicoController.listAllMedicos);

// ==> Rota p/ selecionar 'Medico' pelo 'crm': (GET): localhost:3000/medicos/crm
router.get('/medicos/:nome', medicoController.findMedicoByNome);

// ==> Rota responsável por atualizar 'Medico' pelo 'crm': (PUT): localhost: 3000/medicos/crm
router.put('/medicos/:id', medicoController.updateMedicoById);

// // ==> Excluir 'Medico' pelo 'crm': (DELETE): localhost:3000/medicos/crm
// router.delete('/medicos/:crm', medicoController.deleteMedicoByCrm);

module.exports = router;
