import React, { useState } from 'react';
import { Slide, Paper } from '@mui/material';
import Login from '../Login';
import Register from '../Register';

enum AuthMode {
  Login,
  Register,
}

const TransitionWrapper: React.FC = () => {
  const [authMode, setAuthMode] = useState(AuthMode.Login);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: 500 }}>
        <Slide direction="right" in={authMode === AuthMode.Login}>
          <div>
            {authMode === AuthMode.Login && <Login />}
          </div>
        </Slide>
        <Slide direction="left" in={authMode === AuthMode.Register}>
          <div>
            {authMode === AuthMode.Register && <Register />}
          </div>
        </Slide>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          {authMode === AuthMode.Login ? (
            <p>
              Novo por aqui?{' '}
              <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setAuthMode(AuthMode.Register)}>
                Cadastre-se
              </span>
            </p>
          ) : (
            <p>
              Já possui uma conta?{' '}
              <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setAuthMode(AuthMode.Login)}>
                Faça login
              </span>
            </p>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default TransitionWrapper;
