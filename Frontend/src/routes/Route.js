import React from 'react';
import {
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

const Route = ({
  onlyAdmin = false,
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
 
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return (isPrivate === !!user) ? (
          <>
            { (!!user && user.tipo === 1) ? (
              <Component />
            ) : ( 
              <>
              { (onlyAdmin === true) ? (
                <Redirect
                  to={{
                    pathname: isPrivate ? '/' : '/atendimentos',
                    state: { from: location },
                  }}
                />
                ) : (
                  <Component /> 
                )}
              </>
            )}
          </>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/atendimentos',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;