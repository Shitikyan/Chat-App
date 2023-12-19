import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { registerRoute } from '../utils/APIRoutes';

import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import 'react-toastify/dist/ReactToastify.css';

type ToastOptions = {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  autoClose: number;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: 'light' | 'dark';
};

export default function Register() {
  const navigate = useNavigate();

  const toastOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value.trim() });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error(
        'Error: Password and confirm password should be same.',
        toastOptions,
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        'Error: Username should be greater than 3 characters.',
        toastOptions,
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        'Error: Password should be equal or greater than 8 characters.',
        toastOptions,
      );
      return false;
    } else if (password.search(/[A-Z]/) < 0) {
      toast.error(
        'Error: Password must contain at least one uppercase letter',
        toastOptions,
      );
    } else if (password.search(/[a-z]/) < 0) {
      toast.error(
        'Error: Password must contain at least one lowercase letter',
        toastOptions,
      );
    } else if (password.search(/[0-9]/) < 0) {
      toast.error(
        'Error: Password must contain at least one number',
        toastOptions,
      );
    } else if (email === '') {
      toast.error('Email is required.', toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user),
        );

        navigate('/');
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={event => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>SereneChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={e => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={e => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #90c4ae;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #326b52;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #f8f8ff;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #8fbc8f;
    border-radius: 0.4rem;
    color: blacke;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #8fbc8f;
      outline: none;
    }
  }
  button {
    background-color: #8fbc8f;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #749f84;
    }
  }
  span {
    color: #375642;
    text-transform: uppercase;
    a {
      color: #113920;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
