import React, { ReactElement } from 'react';
import {Box, Text} from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { Posts } from '../root/parts/posts';

export const TrendingPage = (): ReactElement => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Sidebar>
          <Box p={5} textAlign={'left'}>
              <Text fontWeight={'bold'} fontSize={'3xl'} mb={2}>Trending posts 📈</Text>
            <Posts sort={'-score'}/>
          </Box>
      </Sidebar>
    </Box>
  );
};
