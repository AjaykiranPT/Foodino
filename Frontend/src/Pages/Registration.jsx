import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link if using React Router

const Register = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form className="p-4 shadow rounded" style={{ width: '400px' }}>
        <div className="form-group text-center mb-4">
          <h1>REGISTER</h1>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm your password"
            required
          />
        </div>
        <div className="form-group text-center mb-3">
          <button type="submit" className="btn btn-primary w-100">
            REGISTER
          </button>
        </div>
        <div className="form-group text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
