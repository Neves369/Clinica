import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Navbar from '../../components/Menu/Navbar';
import Footer from '../../components/Footer';
import Modal_ from '../../components/Pdf';
import Moment from 'moment';
import { Container, Input } from './styles';

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
import DescriptionIcon from '@material-ui/icons/Description';

import Api from '../../services/Api';


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: '50%',
    height: '70%', 
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  },

  icons:{
    cursor: 'pointer',
    color: '#008BD6'
  },

  inputMaterial:{
    marginLeft: '1100px',
    width: '15%'
  }

}));

function Atendimento () {

  const styles= useStyles();
  const { register, handleSubmit } = useForm();
  const [atendimento, setAtendimento] = useState ([]);
  const [lista, setLista] = useState ([]);
  const [modalInsert, setModalInsert] = useState (false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalRecibo, setModalRecibo]=useState(false);

  const [atendimentoSelecionado, setAtendimentoSelecionado]=useState({
    
    dataatendimento: "",
    carteirinha: "",
    observacoes: "",
    idpaciente: "",
    idmedico: "",
    idusuario: "",
    idconvenio: "",
    idservico: ""
    
  })
 

  const handleChange = e => {
    const {name, value}=e.target;
    setAtendimentoSelecionado(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(atendimentoSelecionado);
  }

  const listaAtendimentos = (async() => {
      const response = await Api.get(`/atendimentos`);
      setAtendimento(response.data);
      setLista(response.data);
      console.log(atendimento);

  })
         
  function onSubmit(data) {
  const { dataatendimento, 
          carteirinha,
          observacoes,
          idpaciente,
          idmedico,
          idusuario,
          idconvenio,
          idservico
        } = data
  
 
  
  Api.post (`/atendimentos`, {
    "dataatendimento": dataatendimento,
    "carteirinha": carteirinha,
    "observacoes": observacoes,
    "idpaciente": idpaciente,
    "idmedico": idmedico,
    "idusuario": idusuario,
    "idconvenio": idconvenio,
    "idservico": idservico
   
  })
    .then(response =>{
      listaAtendimentos()
      abrirFecharModalInserir()
      console.log(response)
      
    })
    .catch(error => {
      console.log(error)
    })

  }

  let handlePesquisar = e => {
    const value = e.target.value;
    const resposta = [];
    atendimento.map((atendimentoFiltrado) => {
      if (atendimentoFiltrado.paciente.indexOf(value, 0) >=0) {
        resposta.push(atendimentoFiltrado)
      }
    }) 
       
    
    setLista(resposta)
  }
 
  const editarAtendimento = (async () => {
    await Api.put(`/atendimentos/${atendimentoSelecionado.id}`, atendimentoSelecionado);
    console.log(atendimentoSelecionado);
    listaAtendimentos();
    abrirFecharModalEditar();
    })

  const GerarRecibo =(async() => {
    await Api.post(`/recibos/`,{
      "idatendimento": atendimentoSelecionado.id,
    });
  })
  
  const selecionarAtendimento = (atendimento, opcao) => {
    setAtendimentoSelecionado(atendimento);
    // abrirFecharModalEditar()
    (opcao==='Editar')?abrirFecharModalEditar():abrirFecharModalRecibo()
  }

  const abrirFecharModalInserir = () => {
    setModalInsert(!modalInsert);
  } 
 
  const abrirFecharModalEditar = () => {
  setModalEditar(!modalEditar);
  }

  const abrirFecharModalRecibo = () =>{
    setModalRecibo(!modalRecibo);
  }

  useEffect(async() => {
    await listaAtendimentos();
  }, [])

  const bodyInserir =(
    <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
      <h3>Novo Atendimento</h3>
      <Input>
      <label htmlFor="inputName">Data: </label>
      <input      
        name="dataatendimento" 
         ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^0-9]/g,
          }
        )}
      />

      <br />

      <label>Carteirinha: </label>
      <input 
        name="carteirinha" 
        ref={register(
          {
            required: 'Enter your Cpf'
          }
        )}
      />

      <br />

      <label>Obs.: </label>
      <input 
        name="observacoes" 
        ref={register()}        
      />

      <br />

      <label>Id Paciente: </label>
      <input 
        name="idpaciente"
        ref={register(
          {
            required: 'Enter your CEP'
          }
        )}
      />

      <br />

      <label>Id Medico: </label>
      <input 
        name="idmedico"
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}      
      />
      <br />

      <label>Id Usuario: </label>
      <input 
        name="idusuario"
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}
      />

      <br />

      <label>Id Convenio: </label>
      <input 
        name="idconvenio" 
        ref={register()}
      />

      <br />

      <label>Id Servico: </label>
      <input 
        name="idservico"
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}
      /> 
     <br />
      <br /> 

      <div align="right">
        <Button color="primary" type="submit">Inserir</Button>
        <Button onClick={()=>abrirFecharModalInserir()}>Cancelar</Button>
      </div>
    </Input>
    </form>
  )

  const bodyEditar =(
    <form className={styles.modal}>
      <h3>Alterar dados do Atendimento</h3>
  
      
      <Input>
      <label>Data:</label>
      <input 
        name="dataatendimento"
        onChange={handleChange}
        placeholder="Data"
        value={atendimentoSelecionado && atendimentoSelecionado.dataatendimento} 
        
        ref={register(
          {
            required: 'Enter your Name'
            
          }
        )}
      />

      <br />

      <label>Carteirinha:</label>
      <input
        name="carteirinha"
        onChange={handleChange}
        placeholder="Carteirinha"
        value={atendimentoSelecionado && atendimentoSelecionado.carteirinha}
        ref={register(
          {
            required: 'Enter your Name'
        
          }
        )}
      />

      <br />

      <label>Obs.:</label>
      <input
        name="observacoes"
        placeholder="Observações"
        onChange={handleChange} value={atendimentoSelecionado && atendimentoSelecionado.observacoes}
        ref={register(
          {
            required: 'Enter your Name'
           
          }
        )}
      />

      <br />

      <label>Id Medico</label>
      <input 
        name="idmedico"
        onChange={handleChange} value={atendimentoSelecionado && atendimentoSelecionado.idmedico}
        ref={register(
          {
            required: 'Enter your Name'
            
          }
        )}
      />
      <br />
      <label>Id usuario</label>
      <input 
        name="idusuario"
        onChange={handleChange} value={atendimentoSelecionado && atendimentoSelecionado.idusuario}
        ref={register(
          {
            required: 'Enter your Name'
          
          
          }
        )} 
      />

      <br />

      <label>Id Convenio:</label>
      <input 
        name="idconvenio" 
        onChange={handleChange} value={atendimentoSelecionado && atendimentoSelecionado.idconvenio}
        ref={register(
          {
            required: 'Enter your Name'
       
          }
        )}
      />

      <br />

      <label>Id Serviço</label>
      <input 
        name="idservico"
        onChange={handleChange} value={atendimentoSelecionado && atendimentoSelecionado.idservico}
      />

      <br />
      <br />

      <div align="right">
        <Button type="submit" color="primary" onClick={()=>editarAtendimento()}>Editar</Button>
        <Button onClick={()=>abrirFecharModalEditar()}>Cancelar</Button>
      </div>
      </Input>
    </form>
  )

  const bodyRecibo =(
    <form className={styles.modal}>
    <h3>Recibo</h3>
    <Input>
    <label>Id Atendimento</label>
    <input 
      name="idatendimento"
      onChange={handleChange}
      value={atendimentoSelecionado && atendimentoSelecionado.id} 
      ref={register(
        {
          required: 'Enter your Name'
          
        }
      )}
    />

    <br/>

    <label>Informações</label>
    <input 
      name="informacoes"
      ref={register(
        {
          required: 'Enter your Name'
          
        }
      )}
    />

    <br />
    <br />

    <div align="right">
      < Modal_ atendimento={atendimentoSelecionado} />
      <Button type="submit" color="primary" onClick={()=>GerarRecibo()}>Gerar</Button>
      <Button onClick={()=>abrirFecharModalRecibo()}>Cancelar</Button>
    </div>
    </Input>
  </form>
  )


 return (
  <div>
    <Navbar />
    <Container>
      
        <h1>Atendimentos</h1>

        <form>
          <TextField  
            name="nome"
            label="Pesquisar"
            onChange={handlePesquisar}
            className={styles.inputMaterial}
          />
        </form>
        <div className="ButInserir">
          <Button  variant="outlined" 
                   color="primary" 
                   onClick = {() => abrirFecharModalInserir()}>
                   Inserir
           </Button>
        </div>

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
              <TableCell>Convenio:</TableCell>
              <TableCell>Serviço:</TableCell>
              <TableCell>Editar:</TableCell>
              <TableCell>Recibo:</TableCell>
            </TableRow>
          </TableHead>

         <TableBody>
           {lista.map(atendimentos=>(
             <TableRow key={atendimentos.id}>
              <TableCell>{atendimentos.id}</TableCell>
              <TableCell>{ Moment(atendimento.dataatendimento).format('DD/MM/yyyy')}</TableCell>
              <TableCell>{atendimentos.paciente}</TableCell>
              <TableCell>{atendimentos.medico}</TableCell>
              <TableCell>{atendimentos.convenio}</TableCell>
              <TableCell>{atendimentos.servico}</TableCell>
              <TableCell>
                 <Edit className={styles.icons}
                       color="primary" 
                       onClick={() => selecionarAtendimento(atendimentos, "Editar")}
                 />
              </TableCell>
              <TableCell>
                 <DescriptionIcon className={styles.icons}
                       color="primary" 
                       onClick={() => selecionarAtendimento(atendimentos, "Recibo")}
                 />
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

      <Modal
      open={modalRecibo}
      onClose={abrirFecharModalRecibo}>
        {bodyRecibo}
      </Modal>
      <div style={{width: "100%",
      height: "13.3vh"}}></div>
    </Container>
    
    <Footer/>
  </div>
 ); 
}


export default Atendimento;



