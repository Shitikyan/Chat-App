import React, { useState, useEffect } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';
import Robot from '../../assets/robot.gif';
import env from 'src/utils/constants/env';

import { Container } from './styles';

export default function Welcome() {
  const [value] = useLocalStorage(env.localhostKey);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (value) {
      setUserName(value.username);
    }
  }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}
