import React, { ReactElement, useState } from 'react';
import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { Posts } from './parts/posts';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { Editor } from '@tinymce/tinymce-react';

export const RootPage = (): ReactElement => {
  const [adding, setAdding] = useState(false);
  const toggleEditor = (): void => {
    setAdding(!adding);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Sidebar>
          <Box p={5} textAlign={'left'}>
            <Button leftIcon={<PlusSquareIcon/>} colorScheme='teal' size="lg" onClick={toggleEditor}>
                Add new post
            </Button>
              {adding &&
                  <Box p={5} bg={useColorModeValue('white', 'gray.900')}>

                      <Editor apiKey={'s05xhkq89e6tcrqb4g43tqkzyvry3ar78uq3ct4q36e7o9c5'} />

                  </Box>
              }
            <Posts/>
          </Box>
      </Sidebar>
    </Box>
  );
};
