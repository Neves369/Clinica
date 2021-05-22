import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/Logo.png';

import { ContainerLogin, ContentLogin, FormLogin } from './styles';

const Login = () => {
  const history = useHistory();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if(!login) return;
    if(!password) return;
    
    setLoading(true);

    console.log("submit", login, password);

    try {
      await signIn({
        login: login,
        password: password,
      });

      history.push("/atendimentos");  

    } catch (error) {
      console.log(error);
      console.log("Usuário ou senha não confere.");
      alert("Usuário ou senha não confere.");

    } finally {
      setLoading(false);
    }
  }

  return (
    <ContainerLogin>
      <ContentLogin>
      <img width="285px" src={logoImg} alt="Logo" />
        <FormLogin onSubmit={handleSubmit} style={{ width: "315px" }}>
          <input 
            value={login} 
            onChange={(event) => setLogin(event.target.value)} 
            type="login" 
            placeholder="login" 
          />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Senha"
          />
          <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        </FormLogin>
      </ContentLogin>
    </ContainerLogin>
  )
}

export default Login;