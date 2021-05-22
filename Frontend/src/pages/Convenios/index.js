import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Footer from '../../components/Footer';
import Navbar from '../../components/Menu/Navbar';
import { Container } from './styles';
import Api from '../../services/Api';
import { Pesquisar } from './styles';

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
    width: '70%'
  }
}));

function CadastrarConvenios
 () {
    const styles= useStyles();
    const [convenio, setConvenio] = useState ([]);
    const [lista, setLista] = useState([]);
    const [modalInsert, setModalInsert] = useState (false);
    const [modalEditar, setModalEditar]=useState(false);

    const [convenioSelecionado, setConvenioSelecionado]=useState({
      nome: '',
      ativo: ''
    })


    const handleChange = e => {
      const {name, value}=e.target;
      setConvenioSelecionado(prevState=>({
        ...prevState,
        [name]: value
      }))
      console.log(convenioSelecionado);
    }
  

 const listaConvenios
  = (async() => {
    const response = await Api.get('/convenios');
    console.log(response.data);
    setConvenio(response.data);
    setLista(response.data);
    console.log(convenio);
 })
     
         
const inserirConvenios
 = (async() => {
  await Api.post('/convenios/', convenioSelecionado);
  abrirFecharModalInserir();
  listaConvenios();

 }) 
 
 let handlePesquisar = e => {
  const value = e.target.value;
  const resposta = [];
  convenio.map((convenioFiltrado) => {
    if (convenioFiltrado.nome.indexOf(value, 0) >=0) {
      resposta.push(convenioFiltrado)
    }
  }) 

  setLista(resposta)
}

const editarConvenio = (async() => {
await Api.put(`/convenios/${convenioSelecionado.id}`, convenioSelecionado);
listaConvenios() 
abrirFecharModalEditar(true);
})
      
const selecionarConvenio = (convenio, opcao) => {
  setConvenioSelecionado(convenio);
  setModalEditar(true)
}

 const abrirFecharModalInserir = () => {
   setModalInsert(!modalInsert);
 } 
 
const abrirFecharModalEditar = () => {
  setModalEditar(!modalEditar);
}

  useEffect(async() => {
    await listaConvenios
    ();
  }, [])

 const bodyInserir =(
  <div className={styles.modal}>
    <h3>Incluir novo convênio</h3>
    <TextField name="nome" className={styles.inputMaterial} label="Nome" onChange={handleChange}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>inserirConvenios()}>Inserir</Button>
      <Button onClick={()=>abrirFecharModalInserir()}>Cancelar</Button>
    </div>
  </div>
)

const bodyEditar =(
  <div className={styles.modal}>
    <h3>Alterar dados do convênio</h3>
    <TextField name="nome" className={styles.inputMaterial} label="Nome" onChange={handleChange} value={convenioSelecionado && convenioSelecionado.nome}/>
    <TextField name="ativo" className={styles.inputMaterial} label="Ativo" onChange={handleChange} value={convenioSelecionado && convenioSelecionado.ativo}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>editarConvenio()}>Editar</Button>
      <Button onClick={()=>abrirFecharModalEditar()}>Cancelar</Button>
    </div>
  </div>
)

 return (
   <div>
     <Navbar />
     <Container>
     <h1>Convênios</h1>
     <form>
        <Pesquisar
          name="nome"
          label="pesquisar"
          placeholder="Pesquisar"
          onChange={handlePesquisar}
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
             <TableCell>Editar</TableCell>
           </TableRow>
         </TableHead>

        <TableBody>
          {lista.map(convenios=>(
            <TableRow key={convenios.id}>
             <TableCell>{convenios.id}</TableCell>
             <TableCell>{convenios.nome}</TableCell>

             <TableCell>
                <Edit className={styles.iconos} 
                onClick={() => selecionarConvenio(convenios, "Editar")}/>
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


export default CadastrarConvenios
;



