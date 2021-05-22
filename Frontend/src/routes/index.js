import React from 'react';
import Route from './Route';
import { Switch, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Medicos from '../pages/Medicos';
import Pacientes from '../pages/Pacientes';
import Usuarios from '../pages/Usuarios';
import tipoUsuarios from '../pages/TipoUsuarios';
import Atendimentos from '../pages/Atendimentos';
import Recibos from '../pages/Recibos';
import Convenios from '../pages/Convenios';
import Servicos from '../pages/Servicos';




function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/medicos" exact component={Medicos} isPrivate />
                <Route path="/pacientes" exact component={Pacientes} isPrivate />
                <Route path="/usuarios" exact component={Usuarios} isPrivate onlyAdmin={true}/>
                <Route path="/tipoUsuarios" exact component={tipoUsuarios} isPrivate onlyAdmin={true}/>
                <Route path="/atendimentos" exact component={Atendimentos} isPrivate/>
                <Route path="/convenios" exact component={Convenios} isPrivate/>
                <Route path="/servicos" exact component={Servicos} isPrivate/>
                <Route path="/recibos" exact component={Recibos}isPrivate/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;