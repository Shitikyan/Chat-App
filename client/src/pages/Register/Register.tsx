import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { useRegister } from 'src/services/register/registerContext';
import Logo from '../../assets/logo.svg';
import env from 'src/utils/constants/env';
import { registerRoute } from '../../utils/APIRoutes';
import { FailedMessages } from 'src/utils/constants/failedMessages';

import { FormContainer, toastOptions } from './styles';

export default function Register() {
  const navigate = useNavigate();
  const registerService = useRegister();
  const [value, setValue] = useLocalStorage(env.localhostKey);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (value) {
      navigate('/');
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value.trim() });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error(FailedMessages.failedConfirmPassword, toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error(FailedMessages.failedUsername, toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(FailedMessages.failedPasswordLength, toastOptions);
      return false;
    } else if (password.search(/[A-Z]/) < 0) {
      toast.error(FailedMessages.failedPasswordUpLetetr, toastOptions);
      return false;
    } else if (password.search(/[a-z]/) < 0) {
      toast.error(FailedMessages.failedPasswordLowLetetr, toastOptions);
      return false;
    } else if (password.search(/[0-9]/) < 0) {
      toast.error(FailedMessages.failedPasswordNumber, toastOptions);
      return false;
    } else if (email === '') {
      toast.error(FailedMessages.failedEmail, toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleValidation()) {
      const { email, username, password } = values;
      const response = await registerService.signin(registerRoute, {
        username,
        email,
        password,
      });

      if (response.success === false) {
        toast.error(response.errorMessage, toastOptions);
      }

      if (response.data.success === true) {
        setValue(response.data.user);

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
