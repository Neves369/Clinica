const router = require('express-promise-router')();
const pacienteController = require('../controllers/paciente.controller');

// ==> CRUD - 'Paciente':

// ==> Rota responsável por criar um novo 'Paciente': (POST): localhost:3000/pacientes
router.post('/pacientes', pacienteController.createPaciente);

// ==> Rota p/ listar todos os 'Paciente': (GET): localhost:3000/pacientes
router.get('/pacientes', pacienteController.listAllPacientes);

// ==> Rota p/ selecionar 'Paciente' pelo 'cpf': (GET): localhost:3000/paciente/cpf
router.get('/pacientes/:nome', pacienteController.findPacienteByNome);

// ==> Rota responsável por atualizar 'Paciente' pelo 'cpf': (PUT): localhost: 3000/paciente/cpf
router.put('/pacientes/:id', pacienteController.updatePacienteById);

// // ==> Excluir 'Paciente' pelo 'cpf': (DELETE): localhost:3000/pacientes/cpf
// router.delete('/pacientes/:cpf', pacienteController.deletePacienteByCpf);

module.exports = router;
