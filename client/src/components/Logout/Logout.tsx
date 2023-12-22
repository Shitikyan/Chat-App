import React, { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { useLogout } from 'src/services/logout/logoutContext';
import env from 'src/utils/constants/env';
import { logoutRoute } from '../../utils/APIRoutes';

import { Button } from './styles';

export default function Logout() {
  const navigate = useNavigate();
  const logoutService = useLogout();
  const [value] = useLocalStorage(env.localhostKey);

  const handleClick = async () => {
    const id = value._id;

    const data = await logoutService.logout(`${logoutRoute}/${id}`);

    if (data.status === 200) {
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}
