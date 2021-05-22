import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Footer from '../../components/Footer';
import Navbar from '../../components/Menu/Navbar';
import Moment from 'moment';
import '../../global.css'
import Api from '../../services/Api';
import { Container, Pesquisar } from './styles';
import { 
  Table,
  TableContainer, 
  TableHead, 
  TableCell, 
  TableBody, 
  TableRow, 
  Modal, 
  Button, 
  TextField

} from '@material-ui/core';

import { Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer',
    color: '#008BD6'
  }, 
  inputMaterial:{
    // marginLeft: '1100px',
    width: '70%'
  }
}));

function CadastrarMedicos () {
    const styles= useStyles();
    const [medico, setMedico] = useState ([]);
    const [lista, setLista] = useState ([]);
    const [modalInsert, setModalInsert] = useState (false);
    const [modalEditar, setModalEditar]=useState(false);

    const [medicoSelecionado, setMedicoSelecionado]=useState({
      nome: '',
      especialidade:'',
      crm: '',
      cpf: '',
      datanascimento: '',
      ativo: ''
    })


    const handleChange = e => {
      const {name, value}=e.target;
      setMedicoSelecionado(prevState=>({
        ...prevState,
        [name]: value
      }))
      console.log(medicoSelecionado);
    }
  

 const listaMedicos = (async() => {
    const response = await Api.get('/medicos');
    console.log(response.data);
    setMedico(response.data);
    setLista(response.data);
    console.log(medico)
 })
     
         
const inserirMedicos = (async() => {
  await Api.post('/medicos/', medicoSelecionado);
  abrirFecharModalInserir();
  listaMedicos();
 })  
 
const editarMedico = (async() => {
await Api.put(`/medicos/${medicoSelecionado.id}`, medicoSelecionado);
listaMedicos();
abrirFecharModalEditar(true)
})

let handlePesquisar = e => {
  const value = e.target.value;
  const resposta = [];
  medico.map((medicoFiltrado) => {
    if (medicoFiltrado.nome.indexOf(value, 0) >=0) {
      resposta.push(medicoFiltrado)
    }
  }) 
     
  setLista(resposta)
}
      

const selecionarMedico = (medico, opcao) => {
  setMedicoSelecionado(medico);
  setModalEditar(true)
}

 const abrirFecharModalInserir = () => {
   setModalInsert(!modalInsert);
 } 
 
const abrirFecharModalEditar = () => {
  setModalEditar(!modalEditar);
}

  useEffect(async() => {
    await listaMedicos();
  }, [])

 const bodyInserir =(
  <div className={styles.modal}>
    <h3>Incluir novo médico</h3>
    <TextField name="nome" className={styles.inputMaterial} label="Nome" onChange={handleChange}/>
    <br />
    <TextField name="especialidade" className={styles.inputMaterial} label="Especialidade" onChange={handleChange}/>
    <br />
    <TextField name="crm" className={styles.inputMaterial} label="CRM" onChange={handleChange}/>
    <br />
    <TextField name="cpf" className={styles.inputMaterial} label="CPF" onChange={handleChange}/>
    <br />
    <TextField name="datanascimento" className={styles.inputMaterial} label="Data de Nascimento" onChange={handleChange}/>
    <br /><br />
    <div align="rightc">
      <Button color="primary" onClick={()=>inserirMedicos()}>Inserir</Button>
      <Button onClick={()=>abrirFecharModalInserir()}>Cancelar</Button>
    </div>
  </div>
)

const bodyEditar =(
  <div className={styles.modal}>
    <h3>Alterar dados do médico</h3>
    <TextField name="nome"
     className={styles.inputMaterial} 
     label="Nome" onChange={handleChange} 
     value={medicoSelecionado && medicoSelecionado.nome}/>

    <br />

    <TextField 
     name="especialidade" 
     className={styles.inputMaterial} 
     label="Especialidade" onChange={handleChange} 
     value={medicoSelecionado && medicoSelecionado.especialidade}/>

    <br />

    <TextField name="crm"
     className={styles.inputMaterial}
     label="CRM" onChange={handleChange}
     value={medicoSelecionado && medicoSelecionado.crm}/>

    <br />

    <TextField name="cpf"
     className={styles.inputMaterial} 
     label="CPF" onChange={handleChange} 
     value={medicoSelecionado && medicoSelecionado.cpf}/>
    <br />
    <TextField name="dataNascimento"
     className={styles.inputMaterial}
     label="Data de Nascimento" onChange={handleChange}
     value={medicoSelecionado && Moment(medicoSelecionado.dataNascimento).format('DD/MM/yyyy')}/>
    
    <br />

    <TextField name="ativo"
     className={styles.inputMaterial} 
     label="Ativo" onChange={handleChange} 
     value={medicoSelecionado && medicoSelecionado.ativo}/>

    <br /><br />

    <div align="right">
      <Button color="primary" onClick={()=>editarMedico()}>Editar</Button>
      <Button onClick={()=>abrirFecharModalEditar()}>Cancelar</Button>
    </div>
  </div>
)

 return (
   <div>
    <Navbar />
    <Container>

      <h1>Médicos</h1>

      <form>
          <Pesquisar     
            name="nome"
            label="Pesquisar"
            placeholder="Pesquisar"
            onChange={handlePesquisar}
            className={styles.inputMaterial}
          />
        </form>
     
     <br />
     <div className="ButInserir">
        <Button onClick = {() => abrirFecharModalInserir()}>Inserir</Button>
     </div>
     <br /><br />

     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Código</TableCell>
             <TableCell>Nome</TableCell>
             <TableCell>Especialidade</TableCell>
             <TableCell>CRM</TableCell>
             <TableCell>CPF</TableCell>
             <TableCell>Data Nasc.</TableCell>
             <TableCell>Editar</TableCell>
           </TableRow>
         </TableHead>

        <TableBody>
          {lista.map(medicos=>(
            <TableRow key={medicos.id}>
             <TableCell>{medicos.id}</TableCell>
             <TableCell>{medicos.nome}</TableCell>
             <TableCell>{medicos.especialidade}</TableCell>
             <TableCell>{medicos.crm}</TableCell>
             <TableCell>{medicos.cpf}</TableCell>
             <TableCell>{Moment(medicos.dataNascimento).format('DD/MM/yyyy')}</TableCell>

             <TableCell>
                <Edit className={styles.iconos} 
                onClick={() => selecionarMedico(medicos, "Editar")}/>
             </TableCell>

          </TableRow>
          ))}
        </TableBody>

       </Table>
     </TableContainer>

     <Modal
     open={modalInsert}
     onClose={abrirFecharModalInserir}>
        {bodyInserir}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirFecharModalEditar}>
       {bodyEditar}
     </Modal>

     <div style={{width: "100%",
      height: "13.3vh"}}></div>
    </Container>  
    <Footer />      
   </div>
 );
}


export default CadastrarMedicos;


// Tudo funcionando  => Listar, editar, incluir.


