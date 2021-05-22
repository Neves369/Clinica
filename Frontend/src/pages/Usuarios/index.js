import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Navbar from '../../components/Menu/Navbar';
import Footer from '../../components/Footer';
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
    width: 400, 
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

function Usuario () {

  const styles= useStyles();
  const { register, handleSubmit } = useForm();
  const [usuario, setUsuario] = useState ([]);
  const [lista, setLista] = useState ([]);
  const [modalInsert, setModalInsert] = useState (false);
  const [modalEditar, setModalEditar]=useState(false);

  const [usuarioSelecionado, setUsuarioSelecionado]=useState({
    nome: '',
    cpf:'',
    funcao: '',
    login: '',
    senha: '',
    tipo: ''
    })

  const handleChange = e => {
    const {name, value}=e.target;
    setUsuarioSelecionado(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(usuarioSelecionado);
  }

  const listaUsuarios = (async() => {
      const response = await Api.get("/usuarios");
      console.log(response.data);
      setUsuario(response.data);
      setLista(response.data);
      console.log(usuario)
  })
          
  function onSubmit(data) {
  const { nome, 
          cpf, 
          funcao,
          login,
          senha,
          tipo
        } = data
        console.log(data)
    
  
  Api.post ("/usuarios", {
    "nome": nome,
    "cpf": cpf,
    "funcao": funcao,
    "login": login,
    "senha": senha,
    "tipo": tipo
      
  })
    .then(response =>{
      listaUsuarios()
      abrirFecharModalInserir()
      console.log(response)
    })
    .catch(error => {
      console.log(error)
      
    })
  }

   
    const editarUsuario = (async() => {
      await Api.put(`/usuarios/${usuarioSelecionado.id}`, usuarioSelecionado);
      listaUsuarios()
      abrirFecharModalEditar(true)
      })

  const selecionarUsuario = (usuario, opcao) => {
    setUsuarioSelecionado(usuario)
    setModalEditar(true)
  }

  const abrirFecharModalInserir = () => {
    setModalInsert(!modalInsert);
  } 
 
  const abrirFecharModalEditar = () => {
  setModalEditar(!modalEditar);
  }

  useEffect(async() => {
    await listaUsuarios();
  }, [])

  const bodyInserir =(
    <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
      <h3>Cadastrar Usuário</h3>
      <Input>
      <label htmlFor="inputName">Nome: </label>
      <input      
        name="nome" 
         ref={register(
          {
            required: 'Nome requerido',
            //pattern: /[^A-Za-z]/g,
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
            required: 'Cpf requerido',
            // pattern: /[^0-9]/g,
            maxLength: 14
          }
        )}
      />
      <br />
      <label>Função: </label>
      <input 
        name="funcao" 
        ref={register(
          {
            required: 'Função requerida'
          }
        )}        
      />
      <br />
      <label>Login: </label>
      <input 
        name="login"
        label = "login" 
        ref={register(
          {
            required: 'Login requerido'
          }
        )}
      />
      <br />
      <label>Senha: </label>
      <input 
        name="senha"
        type="password"
        ref={register(
          {
            required: 'Senha requerida'
          }
        )}      
      />
      <br />
      <label>Tipo: </label>
      <input 
        name="tipo"
        ref={register(
          {
            required: 'Tipo requerido'
          }
        )}
      />
      <br />
     
      <div align="right">
        <Button color="primary" type="submit">Inserir</Button>
        <Button onClick={()=>abrirFecharModalInserir()}>Cancelar</Button>
      </div>
      </Input>
    </form>
  )

  const bodyEditar = (
    <form className={styles.modal}>
      <Input>
      <h3>Alterar Usuários</h3>
      <label>Nome</label>
      <input 
        name="nome"
        onChange={handleChange}
        value={usuarioSelecionado && usuarioSelecionado.nome} 
        ref={register(
          {
            required: 'Nome requerido',
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
        value={usuarioSelecionado && usuarioSelecionado.cpf}
        ref={
          register (
            {
             required:'Cpf requerido',
             maxLength: 14,
              
            }
          )
        }
      />
      <br />
      <label>Funcção</label>
      <input 
        name="funcao"
        onChange={handleChange} value={usuarioSelecionado && usuarioSelecionado.funcao}
        ref={register(
          {
            required: 'Função requerida',
            pattern: /[^A-Za-z]/g,
            minLength: 1,
            maxLength: 50
          }
        )}
      />
      <br />
      <label>Login</label>
      <input 
        name="login"
        onChange={handleChange} value={usuarioSelecionado && usuarioSelecionado.login}
        ref={register(
          {
            required: 'Login requerido',
            pattern: /[^A-Za-z]/g,
            minLength: 5,
            maxLength: 50
          }
        )}
      />
      <br />
      <label>Senha</label>
      <input 
        name="senha"
        onChange={handleChange} value={usuarioSelecionado && usuarioSelecionado.senha}
        ref={register(
          {
            required: 'Senha requerida',
            pattern: /[^A-Za-z]/g,
            minLength: 5,
            maxLength: 50
          }
        )} 
      />
      <br />
      <label>Tipo</label>
      <input 
        name="tipo" 
        onChange={handleChange} value={usuarioSelecionado && usuarioSelecionado.tipo}
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
        onChange={handleChange} value={usuarioSelecionado && usuarioSelecionado.ativo}
        ref={register(
          {
            required: "Status requerido",
          }
        )}
      />
      <br />
      <div align="right">
        <Button type="submit" color="primary" onClick={()=>editarUsuario()}>Editar</Button>
        <Button onClick={()=>abrirFecharModalEditar()}>Cancelar</Button>
      </div>
      </Input>
    </form>
  )
  
  let handlePesquisar = e => {
    const value = e.target.value;
    const resposta = [];
    usuario.map((usuarioFiltrado) => {
      if (usuarioFiltrado.nome.indexOf(value, 0) >=0) {
        resposta.push(usuarioFiltrado)
      }
    }) 
       
    
    setLista(resposta)
  }  
  
  

  return (
  <div>
    <Navbar />
    <Container>
      
        <h1>Usuários</h1>

        <form> 
          <TextField onChange={handlePesquisar}  
            name="pesquisar"
            label="pesquisar"
            className={styles.inputMaterial}
          />
        
        </form>
      <br />
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
              <TableCell>Função</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
           {lista.map(usuarios => (
             <TableRow key={usuarios.id}>
              <TableCell>{usuarios.id}</TableCell>
              <TableCell>{usuarios.nome}</TableCell>
              <TableCell>{usuarios.cpf}</TableCell>
              <TableCell>{usuarios.funcao}</TableCell>
              <TableCell>{usuarios.tipo}</TableCell>

              <TableCell>
                 <Edit className={styles.icons}
                       color="primary" 
                       onClick={() => selecionarUsuario(usuarios, "Editar")}
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

export default Usuario


