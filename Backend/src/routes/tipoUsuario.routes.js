const router = require('express-promise-router')();
const tipoUsuarioController = require('../controllers/tipousuario.controller');

// ==> CRUD - 'tipousuario':

// ==> Criar um novo 'tipo de usuario': (POST): localhost:3000/tipousuario
router.post('/tipousuario', tipoUsuarioController.createTipoUsuario);

// ==> Listar todos os 'Usuarios': (GET): localhost:3000/usuario
router.get('/tipousuario', tipoUsuarioController.listAllTipoUsuarios);

// ==> Selecionar 'tipo de usuario' pela 'descricao': (GET): localhost:3000/tipousuario/descricao
router.get('/tipousuario/:descricao', tipoUsuarioController.findTipoUsuarioByDescricao);

// ==> Rota responsável por atualizar 'Recibo' pelo 'id': (PUT): localhost: 3000/recibos/id
router.put('/tipousuario/:id', tipoUsuarioController.updateTipoUsuarioById);

// // ==> Excluir 'Recibo' pelo 'cpf': (DELETE): localhost:3000/recibos/descricao
// router.delete('/tiposusuario/:descricao', tipoUsuarioController.deleteTipoUsuarioByDescricao);

module.exports = router;