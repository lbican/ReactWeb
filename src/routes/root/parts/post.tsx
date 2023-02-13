import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex, HStack, IconButton, Input,
  SkeletonCircle,
  SkeletonText, Stack, Text,
  useColorModeValue, WrapItem
} from '@chakra-ui/react';
import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { User, DataContext, PostComment } from '../../../context/DataContext';
import { ArrowUpIcon, ChatIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { getUserAvatar, isAuthenticated, pb } from '../../../utils/database.utils';
import { Link } from 'react-router-dom';
import { PostEditor } from './post-editor';
import {on} from "cluster";

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
    if (comments.length === 0) {
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
    }).catch((e) => { console.log(e); });
  };

  const deletePost = async (id: string): Promise<void> => {
    await pb.collection('posts').delete(id).then(() => {
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
          {showComment && <PostComments comments={comments} postId={id} refresh={refresh} />
          }
        </Box>
  );
};

const getTime = (dateStr: string): string => {
  return new Date(dateStr).toLocaleTimeString();
};

interface CommentProps {
  refresh: () => void
  comments: PostComment[]
  postId: string
}

const PostComments = ({ comments, postId, refresh }: CommentProps): ReactElement => {
  const context = useContext(DataContext);
  const ref = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState<string>('');

  const onDelete = (id: string): void => {
    deleteComment(id).then(() => {
      refresh();
    }).catch((e) => { console.log(e); });
  };

  const deleteComment = async (id: string): Promise<void> => {
    await pb.collection('comments').delete(id);
  };

  const addComment = (): void => {
    createComment().then(() => {
      refresh();
    }).catch((e) => console.log(e));
  };

  const createComment = async (): Promise<PostComment> => {
    const data = {
      comment,
      author: context.user?.id,
      post: postId
    };

    return await pb.collection('comments').create(data);
  };

  return (
      <React.Fragment>
        <Divider my={2}/>
        <Box maxH={'20rem'} overflow={'auto'} position={'relative'}>
          <Text>Comments</Text>
          { comments.length > 0
            ? comments.map((comment, index) => {
              return (
                  <Stack key={index} my={2} p={2}>
                    <HStack>
                      <WrapItem>
                        <Avatar size={'xs'} name={comment.expand.author.name}
                                src={getUserAvatar(comment.expand.author.id, comment.expand.author.avatar)} />
                      </WrapItem>
                      <Text fontSize={'md'}>{comment.expand.author.username}</Text>
                      <Text fontSize={'md'}>{getTime(comment.created)}</Text>
                      {
                        (context.user?.id === comment.expand.author.id || context.user?.admin) && (
                              <IconButton
                                  size={'sm'}
                                  onClick={() => onDelete(comment.id)}
                                  colorScheme='red'
                                  aria-label='Delete comment'
                                  icon={<DeleteIcon />}
                              />
                        )
                      }
                    </HStack>
                    <Text ml={3} fontSize={'md'}>{comment.comment}</Text>

                  </Stack>
              );
            })
            : (
                  <Text fontSize={'md'}>No comments to display</Text>
              )}

          {
              context.user && (
                  <HStack w={'md'} mx={2} position={'sticky'} bottom={'0px'} bg={useColorModeValue('white', 'gray.800')}>
                    <WrapItem>
                      <Avatar size={'xs'} name={context.user.name}
                              src={getUserAvatar(context.user.id, context.user.avatar)} />
                    </WrapItem>
                    <Input ref={ref} variant='flushed' onChange={() => setComment(ref.current?.value ?? '')} placeholder='Your comment...' />
                    <Button colorScheme='teal' size='md' disabled={comment.length === 0} onClick={addComment}>
                      Post
                    </Button>
                  </HStack>
              )
          }
        </Box>
      </React.Fragment>
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
