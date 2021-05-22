const db = require("../config/database");

// ==> Criar um novo 'Atendimento':
exports.createAtendimento = async (req, res) => {
  const { dataatendimento, carteirinha, observacoes,
          idpaciente, idmedico, idusuario, idconvenio, idservico} = req.body;

  const { rows } = await db.query(
    `INSERT INTO atendimento (dataatendimento,
                              carteirinha,
                              observacoes,
                              idpaciente,
                              idmedico,
                              idusuario,
                              idconvenio,
                              idservico)
     VALUES ('${dataatendimento}', '${carteirinha}', '${observacoes}',
             '${idpaciente}', '${idmedico}', '${idusuario}', '${idconvenio}', '${idservico}')`);

  res.status(201).send({
    message: "Atendimento adicionado!"
  });
};

// ==> Listar todos os 'atendimentos':
exports.listAllAtendimentos = async(req, res) => {
  const response =  await db.query(
    `select a.id,
            a.carteirinha,
            a.observacoes,
            a.idpaciente,
            a.idmedico,
            a.idusuario,
            a.idconvenio,
            a.idservico,
            a.dataatendimento,
            p.nome paciente,
            m.nome medico,
            m.crm crm,
            u.nome usuario,
            c.nome convenio,
            s.descricao servico

    from atendimento a join paciente p on a.idpaciente = p.id
                   join medico m on a.idmedico = m.id
                   join usuario u on a.idusuario = u.id
                   join servico s on a.idservico = s.id
                   join convenio c on a.idconvenio = c.id`);
  res.status(200).send(response.rows);
};

// ==> Selecionar 'Atendimento' pelo 'nome':
exports.findAtendimentoByNome = async (req, res) => {
  const nome = (req.params.nome);
  const response = await db.query(
    `select a.id,
      a.dataatendimento data_atendimento,
      p.nome paciente,
      m.nome medico,
      m.crm crm,
      u.nome usuario,
      c.nome convenio,
      s.descricao servico

    from atendimento a join paciente p on a.idpaciente = p.id
               join medico m on a.idmedico = m.id
               join usuario u on a.idusuario = u.id
               join servico s on a.idservico = s.id
               join convenio c on a.idconvenio = c.id
    WHERE p.nome LIKE '%${nome}%' `
  );
  res.status(200).send(response.rows);
}

// ==> Atualizar 'Atendimento' pelo 'id':
exports.updateAtendimentoById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { dataatendimento, carteirinha, observacoes, idpaciente,
          idmedico, idusuario, idconvenio, idservico } = req.body;
 
  const response = await db.query(
    `UPDATE atendimento SET dataatendimento = '${dataatendimento}',
                            carteirinha = '${carteirinha}',
                            observacoes = '${observacoes}',
                            idpaciente = '${idpaciente}',
                            idmedico = '${idmedico}',
                            idusuario = '${idusuario}',
                            idconvenio = '${idconvenio}',
                            idservico = '${idservico}'
    WHERE id = '${id}'`);

  res.status(200).send({ message: "Atendimento atualizado com sucesso!" });
 };

// // ==> Excluir um 'Atendimento' pelo 'Id':
// exports.deleteAtendimentoById = async (req, res) => {
//   const id = parseInt(req.params.id);
//   await db.query(`DELETE FROM atendimento WHERE id = '${id}'` );

//   res.status(200).send({ message: 'Atendimento deletado com sucesso!', id });
// };