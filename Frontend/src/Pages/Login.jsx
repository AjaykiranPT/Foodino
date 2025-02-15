import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaSignInAlt } from 'react-icons/fa';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { userid, userrole } = response.data;
      console.log(userrole)
      if (userid && userrole) {
        localStorage.setItem('userId', userid);
        localStorage.setItem('userRole', userrole);

        toast.success('Login successful!', {
          autoClose: 2000,
        });

        (userrole == 'admin')?(setTimeout(() => navigate('/admin/dashboard'), 2000)):(setTimeout(() => navigate('/explore'), 2000));
      } else {
        throw new Error('Invalid response from the server');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || 'Login failed'}`, {
          autoClose: 2000,
        });
      } else {
        toast.error('Error: Unable to connect to the server.', {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <>
      <div className="login-container p-4 shadow border">
        <div className="d-flex justify-content-start mb-2">
          <button className="btn btn-link" onClick={() => navigate(-1)}>
            <FaArrowLeft color='red' />
          </button>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <div className="login-icon">
            <FaSignInAlt className="icon" />
          </div>
        </div>

        <h4 className="text-center mb-4">LOGIN</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="email"
              className={`input-field form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              {...register('email', { required: "Please enter your email" })}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`input-field form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              {...register('password', { required: "Please enter your password" })}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <button type="submit" className="loginbtn btn w-100 mt-3 mb-2">
            LOGIN
          </button>

          <p className="text-center">
            Don't have an account?{' '}
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
