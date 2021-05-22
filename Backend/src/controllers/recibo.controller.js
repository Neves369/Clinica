const db = require("../config/database");

// ==> Gerar um novo 'Recibo':
exports.createRecibo = async (req, res) => {
  const { idatendimento } = req.body;
  const { rows } = await db.query(
    `INSERT INTO recibo (idatendimento) 
    VALUES ('${idatendimento}')`
    
  );

  res.status(201).send({
    message: "recibo adicionado!",
    body: {
      recibo: { idatendimento}
    },
  });
};

// ==> Listar todos os 'recibos':
exports.listAllRecibos = async(req, res) => {
  const response =  await db.query(
    `select r.id
      , p.nome paciente
      , m.nome medico
      , m.crm crm
      , s.descricao serviço
      , s.valor
      , a.dataatendimento data_atendimento
  
    from recibo r join atendimento a on a.id = r.idAtendimento
                join medico m on a.idmedico = m.id
                join paciente p on a.idpaciente = p.id
                join servico s on s.id = a.idservico`);
  res.status(200).send(response.rows);
};

// ==> Selecionar 'recibo' pelo 'idatendimento':
exports.findReciboByIdAtendimento = async (req, res) => {
  const idatendimento = parseInt(req.params.idatendimento);
  const response = await db.query(
    `select r.id
      , p.nome paciente
      , m.nome medico
      , m.crm crm
      , s.descricao servico
      , s.valor
      , a.dataatendimento data_atendimento
    
    from recibo r join atendimento a on a.id = r.idAtendimento
                join medico m on a.idmedico = m.id
                join paciente p on a.idpaciente = p.id
                join servico s on s.id = a.idservico
    WHERE idatendimento =  '${idatendimento}'`);
    let recibo = response.rows[0]
  res.status(200).send(recibo);
}

// // ==> Atualizar 'recibo' pelo 'idatendimento':
// exports.updateReciboByIdAtendimento = async (req, res) => {
//   const idAtendimentoAtual = parseInt(req.params.idatendimento);
//   const { idatendimento } = req.body;
 
//   const response = await db.query(
//     `UPDATE recibo SET idatendimento = '${idatendimento}'
//     WHERE cpf = '${idAtendimentoAtual}'`
//   );

//   res.status(200).send({ message: "recibo atualizado com sucesso!" });
// };

// // ==> Excluir um 'recibo' pelo 'idatendimento':
// exports.deleteReciboByIdAtendimento = async (req, res) => {
//   const cpf = parseInt(req.params.idatendimento);
//   await db.query(`DELETE FROM recibo WHERE idatendimento = ${idatendimento}`);

//   res.status(200).send({ message: 'recibo deletado com sucesso!', idatendimento });
// };
