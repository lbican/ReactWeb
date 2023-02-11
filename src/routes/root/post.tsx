import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  SkeletonCircle,
  SkeletonText,
  WrapItem
} from '@chakra-ui/react';
import React from 'react';
import { User } from '../../context/UserContext';
import { ArrowDownIcon, ArrowUpIcon, ChatIcon, StarIcon } from '@chakra-ui/icons';

export interface PostProps {
  user: User | undefined
  content: string
  score: number
  created: Date
  updated: Date
}

export const Post: React.FC<PostProps> = ({ user, content, created, updated, score }) => {
  // TODO - CHANGE BG FROM WHITE
  return (
        <Box shadow={'lg'} bg={'white'} p={5} borderRadius={'8px'}>
          <Flex alignItems={'center'} mb={2}>
            <WrapItem mr={3}>
              <Avatar name={user?.name} src={user?.avatar} />
            </WrapItem>
            <Flex flexDir={'column'} alignItems={'flex-start'}>
              <strong>
              {user?.name}
              </strong>
              <small>
              {created.toLocaleString('DE-de')}
              </small>
            </Flex>
          </Flex>
          <Divider mb={2}/>
          <Box textAlign={'left'} dangerouslySetInnerHTML={{ __html: content }}/>
            <Flex justifyContent={'flex-end'}>
                <strong>{score}</strong>
            <ButtonGroup ml={2} size='sm' isAttached variant='outline'>
              <Button leftIcon={<ArrowUpIcon />}>Upvote</Button>
              <Button leftIcon={<ArrowDownIcon />}>Downvote</Button>
              <Button leftIcon={<ChatIcon />}>Comment</Button>
              <Button leftIcon={<StarIcon/>}>Favorite</Button>

            </ButtonGroup>
          </Flex>
        </Box>
  );
};

export const PostSkeleton = () => {
  return (
        <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
  );
};
