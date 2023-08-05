/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
 
      axios.post(`${process.env.REACT_APP_API_BOOKS!}/signin`, {
        login: username,
        password,
      }).then((res) => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", res.data.user)
        toast.success("Login realizado com sucesso")
        navigate("/home");
      }).catch((err) =>  {
        toast.error("Login ou senha incorretos")
      })
      
  };

  return (
    <div>
      <h2>Login</h2>
      <Box component="form" onSubmit={handleLogin}>
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
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
