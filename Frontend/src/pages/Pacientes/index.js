import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Navbar from '../../components/Menu/Navbar';
import Footer from '../../components/Footer';
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

import { Edit, Search } from '@material-ui/icons';

import Api from '../../services/Api';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 500,
    height: 550, 
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

function Pacientes () {

  const styles= useStyles();
  const { register, handleSubmit, setValue } = useForm();
  const [paciente, setPaciente] = useState ([]);
  const [lista, setLista] = useState ([]);
  const [modalInsert, setModalInsert] = useState (false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalPesquisar, setModalPesquisar]=useState(false);

  const [pacienteSelecionado, setPacienteSelecionado]=useState({
    nome: '',
    cpf:'',
    datanascimento: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    ativo: ''
  })

 

  const handleChange = e => {
    const {name, value}=e.target;
    setPacienteSelecionado(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(pacienteSelecionado);
  }

  const listaPacientes = (async() => {
      const response = await Api.get("http://localhost:3000/pacientes/");
      console.log(response.data);
      setPaciente(response.data);
      setLista(response.data);
      console.log(paciente)
  })

  function onBlurCep(ev){
    
      const { value } = ev.target;

      const cep = value?.replace(/[^0-9]/g, '');

      if(cep?.length !== 8){
        return;
      }

      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setValue("logradouro", data.logradouro);
          setValue("bairro", data.bairro);
          setValue("cidade", data.localidade);
          setValue("estado", data.uf);
      });
  }
         
  function onSubmit(data) {
  const { nome, 
          cpf, 
          datanascimento,
          cep,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          estado
        } = data
  
    const ncep = cep.replace(/[^0-9]/g, '');
    const ncpf = cpf.replace(/[^0-9]/g, '');
  
  Api.post ("http://localhost:3000/pacientes", {
    "nome": nome,
    "cpf": ncpf,
    "datanascimento": datanascimento,
    "cep": ncep,
    "logradouro": logradouro,
    "numero": numero,
    "complemento": complemento,
    "bairro": bairro,
    "cidade": cidade,
    "estado": estado
   
  })
    .then(response =>{
      listaPacientes()
      abrirFecharModalInserir()
    })
    .catch(error => {
      console.log(error)
      console.log(estado)
    })
 
  }

  let handlePesquisar = e => {
    const value = e.target.value;
    const resposta = [];
    paciente.map((pacienteFiltrado) => {
      if (pacienteFiltrado.nome.indexOf(value, 0) >=0) {
        resposta.push(pacienteFiltrado)
      }
    }) 
       
    
    setLista(resposta)
  }
  
 
  const editarPaciente = (async() => {
    await Api.put(`http://localhost:3000/pacientes/${pacienteSelecionado.id}`, pacienteSelecionado);
    abrirFecharModalEditar();
    listaPacientes()
    })

  

  const selecionarPaciente = (paciente, opcao) => {
    setPacienteSelecionado(paciente)
    setModalEditar(true)
  }

  const abrirFecharModalInserir = () => {
    setModalInsert(!modalInsert);
  } 
 
  const abrirFecharModalEditar = () => {
  setModalEditar(!modalEditar);
  }

  const abrirFecharModalPesquisar = () => {
    setModalEditar(!modalPesquisar);
    }

  useEffect(async() => {
    await listaPacientes();
  }, [])

  const bodyInserir =(
    <form className={styles.modal}  onSubmit={handleSubmit(onSubmit)}>
      <h3>Cadastrar Paciente</h3>
      <Input>
      <label htmlFor="inputName">Nome: </label>
      <input      
        name="nome" 
         ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />

      <br />

      <label>CPF: </label>
      <input 
        name="cpf"  
        ref={register(
          {
            required: 'Enter your Cpf',
            // pattern: /^[0-9]/g,
            maxLength: 14
          }
        )}
      />

      <br />

      <label>Data Nasc.: </label>
      <input 
        name="datanascimento" 
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}        
      />

      <br />

      <label>CEP: </label>
      <input 
        name="cep"
        label = "cep" 
        onBlur = {(ev) => onBlurCep(ev)}
        ref={register(
          {
            required: 'Enter your CEP'
          }
        )}
      />

      <br />

      <label>Logradouro: </label>
      <input 
        name="logradouro"
        onChange = {(ev) => setValue("logradouro", ev.target.value)}
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}      
      />
      <br />

      <label>Numero: </label>
      <input 
        name="numero"
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}
      />

      <br />

      <label>Complemento: </label>
      <input 
        name="complemento" 
        ref={register()}
      />

      <br />

      <label>Bairro: </label>
      <input 
        name="bairro"
        onChange = {(ev) => setValue("bairro", ev.target.value)}
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}
      /> 

      <br />

      <label>Cidade: </label>
      <input 
        name="cidade"
        onChange = {(ev) => setValue("cidade", ev.target.value)}
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}
      />

      <br />

      <label>Estado: </label>
      <input 
        name="estado"
        onChange = {(ev) => {setValue("estado", ev.target.value) }}
        ref={register(
          {
            required: 'Enter your Data nascimento'
          }
        )}
      />

      <div align="right">
        <Button color="primary" type="submit">Inserir</Button>
        <Button onClick={()=>abrirFecharModalInserir()}>Cancelar</Button>
      </div>
      </Input>
    </form>
  )

  const bodyEditar =(
    <form className={styles.modal}>
      <h3>Alterar dados do Paciente</h3>
      <Input>
      <label>Nome</label>
      <input 
        name="nome"
        onChange={handleChange}
        value={pacienteSelecionado && pacienteSelecionado.nome} 
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />

      <br />

      <label>CPF</label>
      <input 
        name="cpf"
        onChange={handleChange} 
        value={pacienteSelecionado && pacienteSelecionado.cpf}
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />

      <br />

      <label>Data Nasc.</label>
      <input 
        name="datanascimento"
        onChange={handleChange} 
        value={pacienteSelecionado && 
        Moment(pacienteSelecionado.datanascimento).format('DD/MM/yyyy')}
        
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />

      <br />

      <label>CEP</label>
      <input 
        name="cep"
        onChange={handleChange} value={pacienteSelecionado && pacienteSelecionado.cep}
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />
      <br />
      <label>Logradouro</label>
      <input 
        name="logradouro"
        onChange={handleChange} value={pacienteSelecionado && pacienteSelecionado.logradouro}
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )} 
      />

      <br />

      <label>Numero</label>
      <input 
        name="numero" 
        onChange={handleChange} value={pacienteSelecionado && pacienteSelecionado.numero}
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />

      <br />

      <label>Complemento</label>
      <input 
        name="complemento"
        onChange={handleChange} value={pacienteSelecionado && pacienteSelecionado.complemento}
      />

      <br />

      <label>Bairro</label>
      <input 
        name="bairro"
        onChange={handleChange} value={pacienteSelecionado && pacienteSelecionado.bairro} 
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />

      <br />
      
      <label>Cidade</label>
      <input 
        name="cidade"
        onChange={handleChange} value={pacienteSelecionado && pacienteSelecionado.cidade} 
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />

      <br />

      <label>Estado</label>
      <input 
        name="estado" 
        onChange={handleChange} value={pacienteSelecionado && pacienteSelecionado.estado}
        ref={register(
          {
            required: 'Enter your Name',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />

      
      <br />

      <label>Ativo</label>
      <input 
        name="ativo" 
        onChange={handleChange} value={pacienteSelecionado && pacienteSelecionado.ativo}
        ref={register(
          {
            required: "Enter your status",
          }
        )}
      />

      <br />

      <div align="right">
        <Button type="submit" color="primary" onClick={()=>editarPaciente()}>Editar</Button>
        <Button onClick={()=>abrirFecharModalEditar()}>Cancelar</Button>
      </div>
      </Input>
    </form>
  )

 return (
  <div>
    <Navbar />
    <Container>
      
        <h1>Pacientes</h1>

        <form>
          <TextField      
            name="nome"
            label="Pesquisar"
            onChange={handlePesquisar}
            className={styles.inputMaterial}
             ref={register(
              {
                required: 'Enter your Name',
                pattern: /[^A-Za-z]/g,
                minLength: 1,
                maxLength: 50
              }
            )}
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
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Data Nasc.</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>

         <TableBody>
           {lista.map(pacientes=>(
             <TableRow key={pacientes.id}>
              <TableCell>{pacientes.id}</TableCell>
              <TableCell>{pacientes.nome}</TableCell>
              <TableCell>{pacientes.cpf}</TableCell>
              <TableCell>{Moment(pacientes.datanascimento).format('DD/MM/yyyy')}</TableCell>
              <TableCell>{pacientes.cep}</TableCell>
              <TableCell>
                 <Edit className={styles.icons}
                       color="primary" 
                       onClick={() => selecionarPaciente(pacientes, "Editar")}
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
      <div style={{width: "100%",
      height: "13.3vh"}}></div>
    </Container>
    <Footer />
  </div>
 ); 
}


export default Pacientes;


