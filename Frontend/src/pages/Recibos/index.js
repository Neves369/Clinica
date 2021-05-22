import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Menu/Navbar';
import Footer from '../../components/Footer';
import Api from '../../services/Api';
import Moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "./styles";
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

const useStyles = makeStyles((theme) => ({
  inputMaterial:{
    marginLeft: '1100px',
    width: '15%'
  }
}));


export default function Recibos() {
  
  const styles= useStyles();
  const [recibo, setRecibo] = useState ([]);
  const [lista, setLista] = useState ([]);

  const listaRecibos = (async() => {
    const response = await Api.get("http://localhost:3000/recibos/");
    console.log(response.data);
    setRecibo(response.data);
    setLista(response.data);
  })

  let handlePesquisar = e => {
    const value = e.target.value;
    const resposta = [];
    recibo.map((reciboFiltrado) => {
      if (reciboFiltrado.paciente.indexOf(value, 0) >=0) {
        resposta.push(reciboFiltrado)
      }
    }) 
       
    
    setLista(resposta)
  }

  useEffect(async() => {
    await listaRecibos();
  }, [])
  
  return (
    <div>
    <Navbar />
    <Container>
      
        <h1>Recibos</h1>

        <form>
          <TextField  
            name="nome"
            label="pesquisar"
            onChange={handlePesquisar}
            className={styles.inputMaterial}
          />
        </form>

        <br />
        <br />
     

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código:</TableCell>
              <TableCell>Data:</TableCell>
              <TableCell>Paciente:</TableCell>
              <TableCell>Medico:</TableCell>
              <TableCell>CRM:</TableCell>
              <TableCell>Serviço:</TableCell>
              <TableCell>Valor:</TableCell>
            </TableRow>
          </TableHead>

         <TableBody>
           {lista.map(recibos=>(
             <TableRow key={recibos.id}>
               <TableCell>{recibos.id}</TableCell>
              <TableCell>{Moment(recibos.data_atendimento).format('DD/MM/yyyy')}</TableCell>
              <TableCell>{recibos.paciente}</TableCell>
              <TableCell>{recibos.medico}</TableCell>
              <TableCell>{recibos.crm}</TableCell>
              <TableCell>{recibos.serviço}</TableCell>
              <TableCell>{recibos.valor}</TableCell>
           </TableRow>
           ))}
         </TableBody>

        </Table>
      </TableContainer>
      <div style={{width: "100%",
      height: "13.3vh"}}></div>
    </Container>
    <Footer />
  </div>
  )
}
