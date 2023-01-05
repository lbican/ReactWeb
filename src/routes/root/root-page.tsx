import React, { ReactElement } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '../../components/navbar/navbar';

export const RootPage = (): ReactElement => (
    <Box textAlign="center" fontSize="xl">
      <Navbar/>
    </Box>
);
