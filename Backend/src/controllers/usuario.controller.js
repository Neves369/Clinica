const jwt = require('jsonwebtoken');
const db = require("../config/database");

// ==> Criar um novo 'Usuario':
exports.createUsuario = async (req, res) => {
  const { nome, cpf, funcao, login, senha, tipo } = req.body;
  console.log(nome, cpf, funcao, login, senha, tipo)
  const { rows } = await db.query(
    `INSERT INTO usuario (nome,
                           cpf,
                           funcao, 
                           login, 
                           senha, 
                           tipo) 
    VALUES ('${nome}', '${cpf}', '${funcao}', '${login}', '${senha}', '${tipo}')`
    
  );

  res.status(201).send({
    message: "Usuario adicionado!",
    body: {
      usuario: { nome, cpf, funcao, login, tipo }
    },
  });
};

// ==> Listar todos os 'Usuarios':
exports.listAllUsuarios = async(req, res) => {
  const response =  await db.query(
`SELECT TU.id IDTipoUsuario
       ,TU.descricao TipoUsuario
       ,U.id
       ,U.nome
       ,U.cpf
       ,U.funcao
       ,U.login
       ,U.senha
       ,U.ativo
       ,U.tipo
FROM usuario U INNER JOIN tipousuario TU on (TU.id = U.tipo)
ORDER BY nome ASC`);
  res.status(200).send(response.rows);
};

// ==> Selecionar 'Usuario' pelo 'cpf':
exports.findUsuarioByNome = async (req, res) => {
  const nome = (req.params.nome);
  const response = await db.query(`SELECT * FROM usuario INNER JOIN
                                  tipousuario on tipousuario.id = usuario.tipo
                                  WHERE nome LIKE '%${nome}%'`);
  res.status(200).send(response.rows);
}

// ==> Atualizar 'Usuario' pelo 'cpf':
exports.updateUsuarioById = async (req, res) => {
  const id = (req.params.id);
  const { nome, login, senha, cpf, funcao, tipo } = req.body;
 
  const response = await db.query(
    `UPDATE usuario SET nome = '${nome}',
                         login = '${login}',
                         senha = '${senha}',
                         cpf = '${cpf}',
                         funcao = '${funcao}',
                         tipo = '${tipo}'
    WHERE id = '${id}'`
  );

  res.status(200).send({ message: "Usuario atualizado com sucesso!" });
};

// // ==> Excluir um 'Usuario' pelo 'cpf':
// exports.deleteUsuarioByCpf = async (req, res) => {
//   const cpf = parseInt(req.params.cpf);
//   await db.query(`DELETE FROM usuario WHERE cpf = ${cpf}`);

//   res.status(200).send({ message: 'Usuario deletado com sucesso!', cpf });
// };

exports.getLogin = async (req, res) => {
  const {login, senha} = req.body;
  console.log(login, senha)
  const response = await db.query(`SELECT * FROM usuario WHERE login = '${login}' and senha = '${senha}'`)
  console.log("response", response)
  if(!response){
    return res.status(401).json({
      error: 'User not found',
    });
  }
  console.log(response.rows)
  return res.json({
    user: response.rows,
    token: jwt.sign(
        {
            login,
        },
        "698dc19d489c4e4db73e28a713eab07b",
        {
            expiresIn: '7d',
        }
    ),
});
};


