import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Typography, Box, Container, Avatar, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted:", data);
      const response = await axios.post('http://localhost:3000/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      const token = response.data.token;
      console.log(token)
      alert('Login successful!');
      setToken(token);
      navigate('/');

    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Login failed'}`);
      } else {
        alert('Error: Unable to connect to the server.');
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Box>

        
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}
          >
            <LoginIcon fontSize="large" />
          </Avatar>
        </Box>

        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          fontWeight="bold"
        >
          LOGIN
        </Typography>

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('email', { required: "Please enter your email" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('password', { required: "Please enter your password" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          LOGIN
        </Button>

        <Typography textAlign="center" variant="body2" color="textSecondary">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
