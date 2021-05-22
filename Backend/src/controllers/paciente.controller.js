const db = require("../config/database");

// ==> Criar um novo 'Paciente':
exports.createPaciente = async (req, res) => {
  const { nome, cpf, datanascimento, logradouro, numero, 
          complemento, bairro, cidade, estado, cep} = req.body;
  const { rows } = await db.query(
    `INSERT INTO paciente (nome, 
                           cpf,
                           datanascimento, 
                           logradouro,
                           numero, 
                           complemento,
                           bairro,
                           cidade,
                           estado,
                           cep) 
    VALUES ( '${nome}', '${cpf}', '${datanascimento}', '${logradouro}', '${numero}',
     '${complemento}', '${bairro}', '${cidade}', '${estado}', '${cep}')`
  );

  res.status(201).send({
    message: "Paciente adicionado!",
    body: {
      Paciente: { nome, cpf, datanascimento }
    },
  });
};

// ==> Listar todos os 'Pacientes':
exports.listAllPacientes = async(req, res) => {
  const response =  await db.query(`SELECT * FROM paciente ORDER BY nome ASC`);
  res.status(200).send(response.rows);
};

// ==> Selecionar 'Paciente' pelo 'cpf':
exports.findPacienteByNome = async (req, res) => {
  const nome = (req.params.nome);
  const response = await db.query(`SELECT * FROM paciente WHERE nome LIKE '%${nome}%'`);
  res.status(200).send(response.rows);
}

// ==> Atualizar 'Paciente' pelo 'cpf':
exports.updatePacienteById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, cpf, datanascimento, logradouro, numero,
    complemento, bairro, cidade, estado, cep, ativo} = req.body;
    
  console.log(id, nome, cpf)
  const response = await db.query(
    `UPDATE paciente SET nome = '${nome}',
                                  cpf = '${cpf}', 
                                  datanascimento = '${datanascimento}', 
                                  logradouro = '${logradouro}',  
                                  numero = '${numero}', 
                                  complemento = '${complemento}' , 
                                  bairro = '${bairro}' , 
                                  cidade = '${cidade}' , 
                                  estado = '${estado}', 
                                  cep = '${cep}', 
                                  ativo = '${ativo}' 
    WHERE id = '${id}'`
  );


  res.status(200).send({ message: "Paciente atualizado com sucesso!" });
};

// // ==> Excluir um 'Paciente' pelo 'cpf':
// exports.deletePacienteByCpf = async (req, res) => {
//   const cpf = parseInt(req.params.cpf);
//   await db.query(`DELETE FROM paciente WHERE cpf = '${cpf}'`);

//   res.status(200).send({ message: 'Paciente deletado com sucesso!', cpf });
// };