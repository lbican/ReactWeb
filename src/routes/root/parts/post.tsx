import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex, HStack,
  SkeletonCircle,
  SkeletonText, Text,
  useColorModeValue, WrapItem
} from '@chakra-ui/react';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { User, DataContext, PostComment } from '../../../context/DataContext';
import { ArrowUpIcon, ChatIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { getUserAvatar, isAuthenticated, pb } from '../../../utils/database.utils';
import { Link } from 'react-router-dom';
import { PostEditor } from './post-editor';

export interface PostProps {
  refresh: () => void
  id: string
  user?: User
  content: string
  score: number
  created: Date
  updated: Date
}

export const Post: React.FC<PostProps> = ({ user, content, created, updated, score, id, refresh }) => {
  const currentUser = useContext(DataContext);
  const [upvoted, setUpvoted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [getScore, setScore] = useState(score);
  const [edit, setEdit] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);

  useEffect(() => {
    isUpvoted().then(() => {
      if (!isAuthenticated()) {
        setDisabled(true);
        return Promise.resolve(true);
      }
      setUpvoted(true);
    }
    ).catch((e) => {});
  }, []);

  useEffect(() => {
    if (showComment) {
      getComments().then((res) => {
        setComments(res);
      }).catch((e) => console.error(e));
    }
  }, [showComment]);

  const getComments = async (): Promise<PostComment[]> => {
    return await pb.collection('comments').getFullList(200, {
      expand: 'post, author',
      filter: `post="${id}"`
    });
  };

  const upvotePost = async (): Promise<void> => {
    await pb.collection('likes').create({
      user: currentUser.user?.id,
      post: id
    }).then(() => {
      setUpvoted(true);
    });

    await pb.collection('posts').update(id, {
      score: getScore + 1
    }).then((res) => setScore(res.score));
  };

  const removeUpvote = async (): Promise<void> => {
    await isUpvoted().then(async (res) => {
      await pb.collection('likes').delete(res.id).then(() => {
        setScore(getScore - 1);
        setUpvoted(false);
      });
      await pb.collection('posts').update(id, {
        score: getScore - 1
      }).then((res) => console.log(res));
    });
  };

  const onDelete = (id: string): void => {
    deletePost(id).then(() => {
      refresh();
    });
  };

  const deletePost = async (id: string): Promise<void> => {
    await pb.collection('posts').delete(id).then(() => {
      setScore(getScore - 1);
      setUpvoted(false);
    });
  };

  const isVisible = (): boolean => {
    if (!currentUser.user) return false;
    return currentUser.user.admin || currentUser.user.id === user?.id;
  };

  const isUpvoted = async (): Promise<any> => {
    if (currentUser.user) {
      return await pb.collection('likes').getFirstListItem(`user="${currentUser.user?.id}" && post="${id}"`);
    }
  };

  if (edit) {
    return <PostEditor onCancel={() => setEdit(false)} post={{ user, id, score, content, created, updated, refresh }}/>;
  }

  const isUpdated = (created: Date, updated: Date): boolean => {
    return created.toLocaleString() !== updated.toLocaleString();
  };

  return (
        <Box shadow={'lg'} bg={useColorModeValue('white', 'gray.800')} p={5} my={2} borderRadius={'8px'}>
          <Flex alignItems={'center'} mb={2} as={Link} to={`/profile/${user?.username}`}>
            <WrapItem mr={3}>
              <Avatar size={'lg'} name={user?.name} src={getUserAvatar(user?.id, user?.avatar)} />
            </WrapItem>
            <Flex flexDir={'column'} alignItems={'flex-start'}>
              <Text fontSize={'lg'} fontWeight={'bold'}>
              {user?.name}
              </Text>
              <Text fontSize={'sm'}>
                {'@' + user?.username}
              </Text>
              <HStack>
                <Text fontSize={'sm'}>{created.toLocaleString('DE-de')}</Text>
                {isUpdated(created, updated) && <Text fontSize={'sm'}>
                  {'| ' + updated.toLocaleString('DE-de') + ' (updated)' }
                </Text>}
              </HStack>
            </Flex>
          </Flex>
          <Divider mb={2}/>
          <Box textAlign={'left'} dangerouslySetInnerHTML={{ __html: content }}/>
            <Flex justifyContent={'flex-end'} mt={2}>
                <strong>{getScore}</strong>
            <ButtonGroup ml={2} size='sm' isAttached variant='outline'>
              <Button leftIcon={<ArrowUpIcon />}
                      onClick={upvoted ? removeUpvote : upvotePost}
                      bg={upvoted ? 'teal.500' : useColorModeValue('white', 'gray.800')}
                      disabled={disabled}>Upvote</Button>
              <Button leftIcon={<ChatIcon />} onClick={() => setShowComment(!showComment)}>Comment</Button>
              {
                isVisible() &&
                  <React.Fragment>
                    <Button leftIcon={<EditIcon />} colorScheme={'yellow'} onClick={() => { setEdit(!edit); }}>Edit</Button>
                    <Button leftIcon={<DeleteIcon />} colorScheme={'red'} onClick={() => { onDelete(id); }}>Delete</Button>
                  </React.Fragment>
              }
            </ButtonGroup>

          </Flex>
          {showComment && (
            comments.length === 0
              ? (
                    <React.Fragment>
                      <Divider my={2}/>
                      <Text>Comments</Text>
                      <Text fontSize={'md'}>No comments to display</Text>
                    </React.Fragment>
                )
              : (
                  <React.Fragment>
                    <Divider my={2}/>
                    <Text>Comments</Text>
                    {comments.map((comment, index) => {
                      return <CommentElement key={index} comment={comment}/>;
                    })}
                  </React.Fragment>
                )
          )}
        </Box>
  );
};

const CommentElement = (props: { comment: PostComment }): ReactElement => {
  return (
      <HStack m={2} p={2}>
        <WrapItem mr={3}>
          <Avatar size={'xs'} name={props.comment.expand.author.name}
                  src={getUserAvatar(props.comment.expand.author.id, props.comment.expand.author.avatar)} />
        </WrapItem>
        <Text fontSize={'md'}>{props.comment.comment}</Text>
      </HStack>
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
