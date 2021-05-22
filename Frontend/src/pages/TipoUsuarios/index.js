import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Footer from '../../components/Footer';
import Navbar from '../../components/Menu/Navbar';
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

//import { position } from 'polished';

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
    width: '100%'
  }
}));

function TipoUsuarios
 () {
    const styles= useStyles();
    const [tipoUsuario, setUsuario] = useState ([]);
    const [lista, setLista] = useState ([]);
    const [modalInsert, setModalInsert] = useState (false);
    const [modalEditar, setModalEditar]=useState(false);

    const [tipoUsuarioSelecionado, setUsuarioSelecionado]=useState({
      nome: '',
      ativo: ''
    })


    const handleChange = e => {
      const {name, value}=e.target;
      setUsuarioSelecionado(prevState=>({
        ...prevState,
        [name]: value
      }))
      console.log(tipoUsuarioSelecionado);
    }
  

 const listaTipoUsuarios
  = (async() => {
    const response = await Api.get('/tipousuario');
    console.log(response.data);
    setUsuario(response.data);
    setLista(response.data);
    console.log(tipoUsuario)
 })
     
         
const inserirTipoUsuarios
 = (async() => {
  await Api.post('/tipousuario/', tipoUsuarioSelecionado);
  //abrirFecharModalInserir();
  listaTipoUsuarios
  ();
 })  
 
const editarTipoUsuario = (async() => {
await Api.put(`http:localhost:3000/tipousuario/${tipoUsuarioSelecionado.id}`, tipoUsuarioSelecionado);
abrirFecharModalEditar();
listaTipoUsuarios();
})

let handlePesquisar = e => {
  const value = e.target.value;
  const resposta = [];
  tipoUsuario.map((tipoUsuarioFiltrado) => {
    if (tipoUsuarioFiltrado.descricao.indexOf(value, 0) >=0) {
      resposta.push(tipoUsuarioFiltrado)
    }
  }) 
     
  
  setLista(resposta)
}
      

const selecionarTipoUsuario = (tipoUsuario, opcao) => {
  setUsuarioSelecionado(tipoUsuario);
  setModalEditar(true)
}

 const abrirFecharModalInserir = () => {
   setModalInsert(!modalInsert);
 } 
 
const abrirFecharModalEditar = () => {
  setModalEditar(!modalEditar);
}

  useEffect(async() => {
    await listaTipoUsuarios();
  }, [])

 const bodyInserir =(
  <div className={styles.modal}>
    <h3>Incluir novo tipo usuário</h3>
    <TextField name="descricao" className={styles.inputMaterial} label="Descrição" onChange={handleChange}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>inserirTipoUsuarios()}>Inserir</Button>
      <Button onClick={()=>abrirFecharModalInserir()}>Cancelar</Button>
    </div>
  </div>
)

const bodyEditar =(
  <div className={styles.modal}>
    <h3>Alterar dados do tipo usuário</h3>
    <TextField name="descricao" className={styles.inputMaterial} label="Descrição" onChange={handleChange} value={tipoUsuarioSelecionado && tipoUsuarioSelecionado.descricao}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>editarTipoUsuario()}>Editar</Button>
      <Button onClick={()=>abrirFecharModalEditar()}>Cancelar</Button>
    </div>
  </div>
)

 return (
   <div>
     <Navbar />
    <Container>
     <h1>Tipos de usuários</h1>
     <form>
          <Pesquisar
            name="nome"
            label="pesquisar"
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
             <TableCell>Descrição</TableCell>
             <TableCell>Editar</TableCell>
           </TableRow>
         </TableHead>

        <TableBody>
          {lista.map(tipoUsuarios=>(
            <TableRow key={tipoUsuarios.id}>
             <TableCell>{tipoUsuarios.id}</TableCell>
             <TableCell>{tipoUsuarios.descricao}</TableCell>
             <TableCell>
                <Edit className={styles.iconos} 
                onClick={() => selecionarTipoUsuario(tipoUsuarios, "Editar")}/>
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

export default TipoUsuarios;



