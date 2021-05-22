const router = require('express-promise-router')();
const reciboController = require('../controllers/recibo.controller');

// ==> CRUD - 'Recibo':

// ==> Rota responsável por criar um novo 'Recibo': (POST): localhost:3000/recibos
router.post('/recibos', reciboController.createRecibo);

// ==> Rota p/ listar todos os 'recibos': (GET): localhost:3000/recibos
router.get('/recibos', reciboController.listAllRecibos);

// ==> Rota p/ selecionar 'Recibo' pelo 'cpf': (GET): localhost:3000/recibos/idatendimento
router.get('/recibos/:idatendimento', reciboController.findReciboByIdAtendimento);

// // ==> Rota responsável por atualizar 'Recibo' pelo 'cpf': (PUT): localhost: 3000/recibos/cpf
// router.put('/recibos/:idatendimento', reciboController.updateReciboByIdAtendimento);

// // ==> Excluir 'Recibo' pelo 'cpf': (DELETE): localhost:3000/recibos/cpf
// router.delete('/recibos/:idatendimento', reciboController.deleteReciboByIdAtendimento);

module.exports = router;
