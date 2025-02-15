import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/registration.css';

const Registration = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/auth/register', { ...data, role: 'foodie' }, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success('Registration successful', { autoClose: 2000 });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <div className="registration-container p-4 shadow border">
        <div className="d-flex justify-content-start mb-2">
          <button className="btn btn-link" onClick={() => navigate(-1)}>
            <FaArrowLeft color='red' />
          </button>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <div className="registration-icon">
            <FaUserPlus className="icon" />
          </div>
        </div>

        <h4 className="text-center mb-4">REGISTER</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className={`input-field form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Name"
              {...register('name', { required: "Please enter your name" })}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

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
              type="tel"
              className={`input-field form-control ${errors.phonenumber ? 'is-invalid' : ''}`}
              placeholder="Phone Number"
              {...register('phonenumber', {
                required: "Please enter your phone number",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
            <div className="invalid-feedback">{errors.phonenumber?.message}</div>
          </div>

          <div className="mb-3">
            <input
              type="number"
              className={`input-field form-control ${errors.age ? 'is-invalid' : ''}`}
              placeholder="Age"
              {...register('age', {
                required: "Please enter your age",
                min: { value: 18, message: "You must be at least 18 years old" },
              })}
            />
            <div className="invalid-feedback">{errors.age?.message}</div>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`input-field form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              {...register('password', {
                required: "Please enter a password",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: "Password must include at least one letter and one number",
                },
              })}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`input-field form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: "Confirm your password",
                validate: (value) => value === watch('password') || "Passwords do not match",
              })}
            />
            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
          </div>

          <button type="submit" className="register-btn btn w-100 mt-3 mb-2" disabled={loading}>
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>

          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login" className="register-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Registration;
