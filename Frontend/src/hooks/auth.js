import React, {
    createContext,
    useCallback,
    useState,
    useContext,
  } from 'react';
  
  import api from '../services/Api';
  
  
  const AuthContext = createContext({});
  
  const AuthProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const user = localStorage.getItem('@TODO:user');
        const token = localStorage.getItem('@TODO:token');
  
      if (user) {
        return { user: JSON.parse(user),
                 token: token };
      }
  
      return {};
    });
  
    const signIn = useCallback(async ({ login, password }) => {
      const response = await api.post('login', {login, senha: password});
      console.log("login", response);
      
      console.log(response.data.user)
      if(response.data.user[0]){
        localStorage.setItem('@TODO:user', JSON.stringify(response.data.user[0]));
        localStorage.setItem('@TODO:token', response.data.token);
        setData({ user: response.data.user[0], token: response.data.token });

      }else{
        throw new Error('Usuário ou senha inválido');
      }
    }, []);
  
    const signOut = useCallback(() => {
      localStorage.removeItem('@TODO:user');
      localStorage.removeItem('@TODO:token');
  
      setData({});
    }, []);
  
    return (
      <AuthContext.Provider
        value={{ user: data.user, signIn, signOut }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }
  
  export { AuthProvider, useAuth };