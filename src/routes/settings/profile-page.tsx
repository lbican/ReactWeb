import React, { ReactElement, useContext, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { User, DataContext } from '../../context/DataContext';
import SocialProfile from './parts/social-profile';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/database.utils';

export const ProfilePage = (): ReactElement => {
  const currentUser = useContext(DataContext);
  const data = useLoaderData() as User;
  const navigate = useNavigate();

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
