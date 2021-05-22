const db = require("../config/database");

// ==> Gerar um novo 'Servico':
exports.createServico = async (req, res) => {
  const { descricao, valor } = req.body;
  const { rows } = await db.query(
    `INSERT INTO servico (descricao, valor) 
    VALUES ('${descricao}', '${valor}')`
    
  );

  res.status(201).send({
    message: "Servico adicionado!",
    body: {
      servico: { descricao, valor}
    },
  });
};

// ==> Listar todos os 'Tipos de usuarios':
exports.listAllServicos = async(req, res) => {
  const response =  await db.query(`SELECT * FROM servico ORDER BY descricao ASC`);
  res.status(200).send(response.rows);
};

// ==> Selecionar 'servico' pelo 'descricao':
exports.findServicoByDescricao = async (req, res) => {
  const descricao = (req.params.descricao);
  const response = await db.query(`SELECT * FROM servico 
                                  WHERE descricao = '${descricao}'`);
  res.status(200).send(response.rows);
}

// ==> Atualizar 'servico' pela 'descricao':
exports.updateServicoById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { descricao, valor, ativo } = req.body;
 
  const response = await db.query(
    `UPDATE servico SET descricao = '${descricao}',
                        valor = '${valor}',
                        ativo = '${ativo}'
    WHERE id = '${id}'`
  );

  res.status(200).send({ message: "Servico atualizado com sucesso!" });
};

// // ==> Excluir um 'servico' pelo 'descricao':
// exports.deleteServicoByDescricao = async (req, res) => {
//   const descricao = (req.params.descricao);
//   await db.query(`DELETE FROM servico WHERE descricao = ${descricao}`);

//   res.status(200).send({ message: 'Servico deletado com sucesso!', descricao });
// };
