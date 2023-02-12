import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
  WrapItem
} from '@chakra-ui/react';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { User, UserContext } from '../../../context/UserContext';
import { ArrowUpIcon, ChatIcon } from '@chakra-ui/icons';
import { getUserAvatar, isAuthenticated, pb } from '../../../utils/database.utils';
import { Link } from 'react-router-dom';

export interface PostProps {
  id: string
  user: User | undefined
  content: string
  score: number
  created: Date
  updated: Date
}

export const Post: React.FC<PostProps> = ({ user, content, created, updated, score, id }) => {
  const currentUser = useContext(UserContext);
  let likeId = '';
  const [upvoted, setUpvoted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [getScore, setScore] = useState(score);

  useEffect(() => {
    void isUpvoted().then(() => {
      setUpvoted(true);
      if (!isAuthenticated()) {
        setDisabled(true);
        setUpvoted(false);
      }
    }
    );
  }, []);

  const upvotePost = async (): Promise<void> => {
    await pb.collection('likes').create({
      user: currentUser.user?.id,
      post: id
    }).then(async (res) => {
      likeId = res.id;
      console.log(likeId);
      setScore(getScore + 1);
      setUpvoted(true);
    });

    await pb.collection('posts').update(id, {
      score: getScore + 1
    }).then((res) => console.log(res));
  };

  const removeUpvote = async (): Promise<void> => {
    await isUpvoted().then(async (res) => {
      await pb.collection('likes').delete(res.id).then(async (res) => {
        likeId = '';
        setScore(getScore - 1);
        setUpvoted(false);
      });
      await pb.collection('posts').update(id, {
        score: getScore - 1
      }).then((res) => console.log(res));
    });
  };

  const isUpvoted = async (): Promise<any> => {
    if (currentUser.user) {
      return await pb.collection('likes').getFirstListItem(`user="${currentUser.user?.id}" && post="${id}"`);
    }
  };

  return (
        <Box shadow={'lg'} bg={useColorModeValue('white', 'gray.800')} p={5} my={2} borderRadius={'8px'}>
          <Flex alignItems={'center'} mb={2} as={Link} to={`/profile/${user?.username}`}>
            <WrapItem mr={3}>
              <Avatar size={'lg'} name={user?.name} src={getUserAvatar(user?.id, user?.avatar)} />
            </WrapItem>
            <Flex flexDir={'column'} alignItems={'flex-start'}>
              <strong>
              {user?.name}
              </strong>
              <small>
                {'@' + user?.username}
              </small>
              <small>
              {created.toLocaleString('DE-de')}
              </small>
            </Flex>
          </Flex>
          <Divider mb={2}/>
          <Box textAlign={'left'} dangerouslySetInnerHTML={{ __html: content }}/>
            <Flex justifyContent={'flex-end'} mt={2}>
                <strong>{getScore}</strong>
            <ButtonGroup ml={2} size='sm' isAttached variant='outline'>
              <Button leftIcon={<ArrowUpIcon />}
                      onClick={upvoted ? removeUpvote : upvotePost}
                      bgColor={upvoted ? 'teal.500' : 'white'}
                      disabled={disabled}>Upvote</Button>
              <Button leftIcon={<ChatIcon />}>Comment</Button>

            </ButtonGroup>
          </Flex>
        </Box>
  );
};

export const PostSkeleton = (): ReactElement => {
  return (
        <Box padding='6' boxShadow='lg' bg={useColorModeValue('white', 'gray.700')}>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
  );
};
