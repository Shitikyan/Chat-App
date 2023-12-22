import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { FailedLocalStorageMessages } from 'src/utils/constants/failedMessages';
import { usesetAvatar } from 'src/services/setAvatar/setAvatarContext';
import loader from '../../assets/loader.gif';
import env from 'src/utils/constants/env';
import { setAvatarRoute } from '../../utils/APIRoutes';

import { Container, toastOptions } from './styles';

export default function SetAvatar() {
  const navigate = useNavigate();
  const setAvatarService = usesetAvatar();
  const [value] = useLocalStorage(env.localhostKey);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    const checkLocalStorage = async () => {
      try {
        if (!localStorage.getItem(env.localhostKey)) {
          navigate('/login');
        }
      } catch (error) {
        console.error(FailedLocalStorageMessages.access, error);
      }
    };

    checkLocalStorage();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const data = await setAvatarService.addAvatar(
        `${setAvatarRoute}/${value._id}`,
        {
          image: avatars[selectedAvatar],
        },
      );

      if (data.isSet) {
        value.isAvatarImageSet = true;
        value.avatarImage = data.image;
        localStorage.setItem(env.localhostKey, JSON.stringify(value));
        navigate('/');
      } else {
        toast.error(FailedLocalStorageMessages.settingAvatar, toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await setAvatarService.getAvatar(
          `${env.multiAvatarApi}/${Math.round(Math.random() * 1000)}`,
        );

        const buffer = Buffer.from(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                  key={index}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
