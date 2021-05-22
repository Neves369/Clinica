const router = require('express-promise-router')();
const usuarioController = require('../controllers/usuario.controller');

// ==> CRUD - 'Usuario':

// ==> Criar um novo 'Usuario': (POST): localhost:3000/usuarios
router.post('/usuarios', usuarioController.createUsuario);

// ==> Listar todos os 'Usuarios': (GET): localhost:3000/usuarios
router.get('/usuarios', usuarioController.listAllUsuarios);

// ==> Selecionar 'Usuario' pelo 'nome': (GET): localhost:3000/usuarios/cpf
router.get('/usuarios/:nome', usuarioController.findUsuarioByNome);

// ==> Atualizar 'Usuario' pelo 'id': (PUT): localhost: 3000/usuarios/cpf
router.put('/usuarios/:id', usuarioController.updateUsuarioById);

// // ==> Excluir 'Usuario' pelo 'cpf': (DELETE): localhost:3000/usuarios/cpf
// router.delete('/usuarios/:cpf', usuarioController.deleteUsuarioByCpf);
// ==> Verificar se o usuário está no banco: (GET): localhost:3000/login

router.post('/login', usuarioController.getLogin);

module.exports = router;
