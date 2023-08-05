import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      axios.post(`${process.env.REACT_APP_API_BOOKS!}/users`, {
        name,
        login: username,
        password,
      }).then((res) => console.log(res)).catch((err) => console.log(err))
     
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <Box component="form" onSubmit={handleRegister}>
        <TextField
          label="Name"
          required
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Username"
          required
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          required
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </Box>
    </div>
  );
};

export default Register;
