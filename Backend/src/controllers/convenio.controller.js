const db = require("../config/database");

// ==> Criar um novo 'Covenio':
exports.createConvenio = async (req, res) => {
  const { nome } = req.body;
  const { rows } = await db.query(
      `INSERT INTO convenio (nome) VALUES ('${nome}')`
    );

  res.status(201).send({
    message: "Convenio adicionado!",
    body: {
      Convenio: { nome }
    },
  });
};


// ==> Listar todos os 'Convenios':
exports.listAllConvenios = async(req, res) => {
  const response =  await db.query(`SELECT * FROM convenio ORDER BY id ASC`);
  res.status(200).send(response.rows);
};

// ==> Selecionar 'Convenio' pela 'nome':
exports.findConvenioByNome = async (req, res) => {
  const nome = (req.params.nome);
  const response = await db.query(`SELECT * FROM convenio WHERE nome = '${nome}'`);
  res.status(200).send(response.rows);
}

// ==> Atualizar 'Convenio' pelo 'id':
exports.updateConvenioById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, ativo } = req.body;
 
  const response = await db.query(
    `UPDATE convenio SET nome = '${nome}',
                         ativo = '${ativo}'
    WHERE id = '${id}'`
  );


  res.status(200).send({ message: "Convenio atualizado com sucesso!" });
};

// // ==> Excluir um 'Convenio' pelo 'nome':
// exports.deleteConvenioByNome = async (req, res) => {
//   const nome = (req.params.nome);
//   await db.query(`DELETE FROM convenio WHERE nome = '${nome}'`);

//   res.status(200).send({ message: 'Convenio deletado com sucesso!', nome });
// };