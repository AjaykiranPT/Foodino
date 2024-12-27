import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; 

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form className="p-4 shadow rounded" style={{ width: '300px' }}>
        <div className="form-group text-center mb-4">
          <h1>LOGIN</h1>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
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
        <div className="form-group text-center mb-3">
          <button type="submit" className="btn btn-success w-100">
            LOGIN
          </button>
        </div>
        <div className="form-group text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
