const express = require('express');
const cors = require('cors');

const app = express();

// ==> Rotas da API:
const medicoRoute = require('./routes/medico.routes');
const usuarioRoute = require('./routes/usuario.routes');
const pacienteRoute = require('./routes/paciente.routes');
const convenioRoute = require('./routes/convenio.routes');
const atendimentoRoute = require('./routes/atendimento.routes');
const reciboRoute = require('./routes/recibo.routes');
const tipoUsuarioRoute = require('./routes/tipoUsuario.routes');
const servicoRoute = require('./routes/servico.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use('/', medicoRoute);
app.use('/', usuarioRoute);
app.use('/', pacienteRoute);
app.use('/', convenioRoute);
app.use('/', atendimentoRoute);
app.use('/', reciboRoute);
app.use('/', tipoUsuarioRoute);
app.use('/', servicoRoute);


module.exports = app;