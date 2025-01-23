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
  IconButton,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomTextField = ({ id, label, type = 'text', validation, errors, register }) => (
  <TextField
    id={id}
    label={label}
    type={type}
    variant="outlined"
    fullWidth
    margin="normal"
    {...register(id, validation)}
    error={!!errors[id]}
    helperText={errors[id]?.message}
  />
);

const Registration = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [backendError, setBackendError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setBackendError('');
      setLoading(true);
      const response = await axios.post('http://localhost:3000/auth/register', { ...data, role: 'foodie' }, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setBackendError(error.response.data.error || 'An error occurred');
      } else {
        console.error('Error:', error);
        toast.error('Error: Unable to connect to the server.');
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

        <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold">
          REGISTER
        </Typography>

        {backendError && <Alert severity="error" sx={{ mb: 2 }}>{backendError}</Alert>}

        <CustomTextField
          id="name"  // Changed from "username" to "name"
          label="Name"
          validation={{ required: 'Name is required' }}
          errors={errors}
          register={register}
        />

        <CustomTextField
          id="email"
          label="Email"
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          errors={errors}
          register={register}
        />

        <CustomTextField
          id="phonenumber"
          label="Phone Number"
          type="tel"
          validation={{
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Enter a valid 10-digit phone number',
            },
          }}
          errors={errors}
          register={register}
        />

        <CustomTextField
          id="age"
          label="Age"
          type="number"
          validation={{
            required: 'Age is required',
            min: { value: 18, message: 'You must be at least 18 years old' },
          }}
          errors={errors}
          register={register}
        />

        <CustomTextField
          id="password"
          label="Password"
          type="password"
          validation={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: 'Password must include at least one letter and one number',
            },
          }}
          errors={errors}
          register={register}
        />

        <CustomTextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          validation={{
            required: 'Confirm your password',
            validate: (value) => value === watch('password') || 'Passwords do not match',
          }}
          errors={errors}
          register={register}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? 'REGISTERING...' : 'REGISTER'}
        </Button>

        <Typography textAlign="center" variant="body2" color="textSecondary">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Login here
          </Link>
        </Typography>
      </Box>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
    </Container>
  );
};

export default Registration;
