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

function CadastrarServicos () {
    const styles= useStyles();
    const [servico, setServico] = useState ([]);
    const [lista, setLista] = useState ([]);
    const [modalInsert, setModalInsert] = useState (false);
    const [modalEditar, setModalEditar]=useState(false);

    const [servicoSelecionado, setServicoSelecionado]=useState({
      descricao: '',
      valor: '',
      ativo: ''
    })


    const handleChange = e => {
      const {name, value}=e.target;
      setServicoSelecionado(prevState=>({
        ...prevState,
        [name]: value
      }))
      console.log(servicoSelecionado);
    }
  

 const listaServicos = (async () => {
    const response = await Api.get('/servicos');
    setServico(response.data);
    setLista(response.data);
 })
     
         
const inserirServicos = (async() => {
  await Api.post('/servicos/', servicoSelecionado);
  abrirFecharModalInserir();
  listaServicos();
 })  
 
const editarServico = (async() => {
await Api.put(`/servicos/${servicoSelecionado.id}`, servicoSelecionado);
listaServicos();
abrirFecharModalEditar(true);
})

let handlePesquisar = e => {
  const value = e.target.value;
  const resposta = [];
  servico.map((servicoFiltrado) => {
    if (servicoFiltrado.descricao.indexOf(value, 0) >=0) {
      resposta.push(servicoFiltrado)
    }
  }) 
     
  
  setLista(resposta)
}

const selecionarServico = (servicos) => {
  setServicoSelecionado(servicos);
  setModalEditar(true)
  //abrirFecharModalEditar()
}

const abrirFecharModalEditar = () => {
  setModalEditar(!modalEditar);
}

 const abrirFecharModalInserir = () => {
   setModalInsert(!modalInsert)
 }


  useEffect(async() => {
    await listaServicos();
  }, [])

 const bodyInserir =(
  <div className={styles.modal}>
    <h3>Incluir novo serviço</h3>
    <TextField name="descricao" className={styles.inputMaterial} label="Descricao" onChange={handleChange}/>
    <br/>
    <TextField name="valor" className={styles.inputMaterial} label="Valor" onChange={handleChange}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>inserirServicos()}>Inserir</Button>
      <Button onClick={()=>abrirFecharModalInserir()}>Cancelar</Button>
    </div>
  </div>
)

const bodyEditar =(
  <div className={styles.modal}>
    <h3>Alterar dados do serviço</h3>
    <TextField name="descricao" className={styles.inputMaterial} label="Descricao" onChange={handleChange} value={servicoSelecionado && servicoSelecionado.descricao}/>
    <TextField name="valor" className={styles.inputMaterial} label="Valor" onChange={handleChange} value={servicoSelecionado && servicoSelecionado.valor}/>
    <TextField name="ativo" className={styles.inputMaterial} label="Ativo" onChange={handleChange} value={servicoSelecionado && servicoSelecionado.ativo}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>editarServico()}>Editar</Button>
      <Button onClick={()=>abrirFecharModalEditar()}>Cancelar</Button>
    </div>
  </div>
)


 return (
   <div>
     <Navbar />

    <Container>
     <h1>Serviços</h1>
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
             <TableCell>Descricao</TableCell>
             <TableCell>Valor</TableCell>
             <TableCell>Editar</TableCell>
           </TableRow>
         </TableHead>

        <TableBody>
          {lista.map(servicos=>(
            <TableRow key={servicos.id}>
             <TableCell>{servicos.id}</TableCell>
             <TableCell>{servicos.descricao}</TableCell>
             <TableCell>{servicos.valor}</TableCell>

             <TableCell>
                <Edit className={styles.iconos} 
                onClick={() => selecionarServico(servicos)}/>
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
    </Container>
    <div style={{width: "100%",
      height: "13.3vh"}}></div>
      <Footer />      
   </div>
 );
}


export default CadastrarServicos
;



