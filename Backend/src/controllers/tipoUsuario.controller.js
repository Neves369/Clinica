const db = require("../config/database");

// ==> Gerar um novo 'TipoUsuario':
exports.createTipoUsuario = async (req, res) => {
  const { descricao } = req.body;
  const { rows } = await db.query(
    `INSERT INTO tipousuario (descricao) 
    VALUES ('${descricao}')`
    
  );

  res.status(201).send({
    message: "tipo de usuario adicionado!",
    body: {
      tipousuario: { descricao}
    },
  });
};

// ==> Listar todos os 'Tipos de usuarios':
exports.listAllTipoUsuarios = async (req, res) => {
  const response =  await db.query(`SELECT * FROM tipousuario ORDER BY descricao ASC`);
  res.status(200).send(response.rows);
};

// ==> Selecionar 'tipousuario' pelo 'descricao':
exports.findTipoUsuarioByDescricao = async (req, res) => {
  const descricao = (req.params.descricao);
  const response = await db.query(`SELECT * FROM tipousuario 
                                  WHERE descricao = '${descricao}'`);
  res.status(200).send(response.rows);
}

// ==> Atualizar 'tipousuario' pelo 'descricao':
exports.updateTipoUsuarioById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { descricao } = req.body;
 
  const response = await db.query(
    `UPDATE tipousuario SET descricao = '${descricao}'
    WHERE id = '${id}'`
  );

  res.status(200).send({ message: "tipo de usuario atualizado com sucesso!" });
};

// // ==> Excluir um 'tipousuario' pelo 'descricao':
// exports.deleteTipoUsuarioByDescricao = async (req, res) => {
//   const descricao = (req.params.descricao);
//   await db.query(`DELETE FROM tipousuario WHERE descricao = ${descricao}`);

//   res.status(200).send({ message: 'tipo de usuario deletado com sucesso!', descricao });
// };
