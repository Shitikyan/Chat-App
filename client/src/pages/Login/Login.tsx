import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useLogin } from 'src/services/login/loginContext';
import useLocalStorage from 'src/hooks/useLocalStorage';
import Logo from '../../assets/logo.svg';
import env from 'src/utils/constants/env';
import { loginRoute } from '../../utils/APIRoutes';
import { FailedLoginMessages } from 'src/utils/constants/failedMessages';

import { FormContainer, toastOptions } from './styles';

export default function Login() {
  const navigate = useNavigate();
  const loginService = useLogin();
  const [value, setValue] = useLocalStorage(env.localhostKey);
  const [values, setValues] = useState({ username: '', password: '' });

  useEffect(() => {
    if (value) {
      navigate('/');
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === '') {
      toast.error(FailedLoginMessages.failedLogin, toastOptions);
      return false;
    } else if (password === '') {
      toast.error(FailedLoginMessages.failedLogin, toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      const { username, password } = values;
      const response = await loginService.signup(loginRoute, {
        username,
        password,
      });

      if (response.success === false) {
        toast.error(response.errorMessage, toastOptions);
      }

      if (response.success === true) {
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
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            `{"Don't have an account"}` ? <Link to="/register">Sign Up.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
