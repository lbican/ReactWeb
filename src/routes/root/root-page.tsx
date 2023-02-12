import React, { ReactElement, useState } from 'react';
import {  Box, Button} from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { Posts } from './parts/posts';
import { PlusSquareIcon } from '@chakra-ui/icons';
import {PostEditor} from "./parts/post-editor";

export const RootPage = (): ReactElement => {
  const [adding, setAdding] = useState(false);
  const toggleEditor = (): void => {
    setAdding(true);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Sidebar>
          <Box p={5} textAlign={'left'}>
              {!adding && <Button leftIcon={<PlusSquareIcon/>} colorScheme='teal' size="lg" onClick={toggleEditor}>
                  Add new post
              </Button>}
              {adding && <PostEditor onCancel={() => { setAdding(false); }}/>}
            <Posts/>
          </Box>
      </Sidebar>
    </Box>
  );
};
