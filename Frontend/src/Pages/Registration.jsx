import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Avatar,
  Alert,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [backendError, setBackendError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setBackendError('');

      const response = await axios.post('http://localhost:3000/auth/register', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
      
        setBackendError(error.response.data.error || 'Email already registered');
      } else {
        console.error('Error:', error);
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
      
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <PersonAddIcon fontSize="large" />
          </Avatar>
        </Box>

        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          fontWeight="bold"
        >
          REGISTER
        </Typography>

      
        {backendError && <Alert severity="error" sx={{ mb: 2 }}>{backendError}</Alert>}

      
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

      
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email || !!backendError}
          helperText={errors.email?.message || backendError}
        />

      
        <TextField
          id="phonenumber"
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('phonenumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Enter a valid 10-digit phone number',
            },
          })}
          error={!!errors.phonenumber}
          helperText={errors.phonenumber?.message}
        />

      
        <TextField
          id="age"
          label="Age"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('age', {
            required: 'Age is required',
            min: { value: 18, message: 'You must be at least 18 years old' },
          })}
          error={!!errors.age}
          helperText={errors.age?.message}
        />

      
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
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
          REGISTER
        </Button>

      
        <Typography textAlign="center" variant="body2" color="textSecondary">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Registration;
