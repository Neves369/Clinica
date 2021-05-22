import React from 'react';
import Routes from './routes';
import AppProvider from './hooks';

function App() {
  return (
    <div>
      <AppProvider>
        <Routes />
      </AppProvider>
        
    </div> 
  );
};

export default App;
