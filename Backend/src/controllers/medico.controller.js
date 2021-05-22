const db = require("../config/database");

// ==> Criar um novo 'Medico':
exports.createMedico = async (req, res) => {
  const { cpf, crm, nome, datanascimento, especialidade } = req.body;
  const { rows } = await db.query(
    `INSERT INTO medico (cpf,
                         crm,
                         nome,
                         datanascimento,
                         especialidade)
     VALUES ('${cpf}', '${crm}', '${nome}', '${datanascimento}', '${especialidade}')`)

  res.status(201).send({
    message: "Medico adicionado!",
    body: {
      Medico: { nome, crm, cpf, datanascimento, especialidade }
    },
  });
};


// ==> Listar todos os 'Medicos':
exports.listAllMedicos = async (req, res) => {
  const response =  await db.query(`SELECT * FROM medico ORDER BY nome ASC`);
  console.log(response);
  res.status(200).send(response.rows);
};

// ==> Selecionar 'Medico' pelo 'crm':
exports.findMedicoByNome = async (req, res) => {
  const nome = (req.params.nome);
  const response = await db.query(`SELECT * FROM medico WHERE nome LIKE '%${nome}%'`);
  res.status(200).send(response.rows);
}

// ==> Atualizar 'Medico' pelo 'crm':
exports.updateMedicoById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, crm, cpf, datanascimento, especialidade, ativo } = req.body;
 
  const response = await db.query(
    `UPDATE medico SET nome = '${nome}',
                       crm = '${crm}',
                       cpf = '${cpf}',
                       datanascimento = '${datanascimento}',
                       especialidade = '${especialidade}',
                       ativo = '${ativo}'
    WHERE id = '${id}'`);

  res.status(200).send({ message: "Medico atualizado com sucesso!" });
};

// // ==> Excluir um 'Medico' pelo 'crm':
// exports.deleteMedicoByCrm = async (req, res) => {
//   const crm = parseInt(req.params.crm);
//   await db.query(`DELETE FROM medico WHERE crm = '${crm}'`);

//   res.status(200).send({ message: 'Medico deletado com sucesso!', crm });
// };




