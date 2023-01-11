import React, { ReactElement } from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';

export const RootPage = (): ReactElement => (
    <Box textAlign="center" fontSize="xl">
      <Sidebar>
          <div>Content</div>
      </Sidebar>
    </Box>
);
