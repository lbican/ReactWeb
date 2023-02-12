import React, { ReactElement, useContext, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { User, UserContext } from '../../context/UserContext';
import SocialProfile from './parts/social-profile';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/database.utils';

export const ProfilePage = (): ReactElement => {
  const currentUser = useContext(UserContext);
  const data = useLoaderData() as User;
  const navigate = useNavigate();
  console.log(data.id);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, []);

  return (
        <Box textAlign="center" fontSize="xl">
            <Sidebar>
                <SocialProfile currentUser={currentUser} user={data}/>
            </Sidebar>
        </Box>
  );
};
