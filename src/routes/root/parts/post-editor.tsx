import React, { ReactElement, useContext, useState } from 'react';
import { DataContext } from '../../../context/DataContext';
import { getUserAvatar, pb } from '../../../utils/database.utils';
import { Alert, AlertIcon, Avatar, Box, Button, Flex, HStack, useColorModeValue, WrapItem } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { PostProps } from './post';

export const PostEditor = (props: { onCancel: any, post?: PostProps }): ReactElement => {
  const context = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let body = '';

  const addPost = async (): Promise<void> => {
    if (error) {
      setError(false);
    }
    if (context.user) {
      const data = {
        content: body,
        score: 0,
        author: context.user.id
      };
      setLoading(true);
      return await pb.collection('posts').create(data).then(() => {
        if (error) {
          setError(false);
        }
        props.post?.refresh();
        exitEditor();
      }).catch((e) => {
        setError(true);
      }).finally(() => { setLoading(false); });
    }
  };

  const exitEditor = (): void => {
    props.onCancel();
  };

  const updatePost = async (): Promise<void> => {
    if (error) {
      setError(false);
    }
    if (props.post) {
      setLoading(true);
      return await pb.collection('posts').update(props.post?.id, { content: body }).then(() => {
        if (error) {
          setError(false);
        }
        props.post?.refresh();
      }).catch((e) => {
        setError(true);
      }).finally(() => { setLoading(false); });
    }
  };

  return (
        <Box p={5} bg={useColorModeValue('white', 'gray.900')}>
            <Flex alignItems={'center'} mb={2}>
                <WrapItem mr={3}>
                    <Avatar size={'lg'} name={context.user?.name} src={getUserAvatar(context.user?.id, context.user?.avatar)} />
                </WrapItem>
                <Flex flexDir={'column'} alignItems={'flex-start'}>
                    <strong>
                        {context.user?.name}
                    </strong>
                    <small>
                        {'@' + context.user?.username}
                    </small>
                </Flex>
            </Flex>
            <Editor
                initialValue={props.post?.content}
                onEditorChange={(value) => { body = value; }}
                apiKey={'s05xhkq89e6tcrqb4g43tqkzyvry3ar78uq3ct4q36e7o9c5'}/>
            <HStack justifyContent={'flex-end'} my={2}>
                <Button colorScheme='red' size="md" onClick={exitEditor}>
                    Cancel
                </Button>
                {
                    props.post
                      ? (
                            <Button colorScheme='yellow' size="md" isLoading={loading} loadingText={'Adding...'} onClick={updatePost}>
                                Confirm changes
                            </Button>
                        )
                      : (
                            <Button colorScheme='teal' size="md" isLoading={loading} loadingText={'Adding...'} onClick={addPost}>
                                Post
                            </Button>
                        )
                }
            </HStack>
            {error && <Alert status='error'>
                <AlertIcon />
                There was an error while adding post.
            </Alert>}
        </Box>
  );
};
