import React, { ReactElement, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { Posts } from './parts/posts';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { PostEditor } from './parts/post-editor';
import { isAuthenticated } from '../../utils/database.utils';

export const RootPage = (): ReactElement => {
  const [adding, setAdding] = useState(false);
  const toggleEditor = (): void => {
    setAdding(true);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Sidebar>
          <Box p={5} textAlign={'left'}>
              {(!adding && isAuthenticated()) && <Button leftIcon={<PlusSquareIcon/>} colorScheme='teal' size="lg" onClick={toggleEditor}>
                  Add new post
              </Button>}
              {adding && <React.Fragment>
                  <PostEditor onCancel={() => { setAdding(false); }}/>
                  <Posts />
              </React.Fragment>}

              {!adding && <Posts/>}
          </Box>
      </Sidebar>
    </Box>
  );
};
