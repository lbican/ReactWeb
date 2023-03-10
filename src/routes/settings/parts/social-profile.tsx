import React, { ReactElement, useState } from 'react';
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue, Divider
} from '@chakra-ui/react';
import { getUserAvatar } from '../../../utils/database.utils';
import { Posts } from '../../root/parts/posts';
import { User, DataContextType } from '../../../context/DataContext';
import { FiSettings } from 'react-icons/fi';
import EditPage from './edit-user';
// eslint-disable-next-line react/display-name
export default (props: { currentUser: DataContextType, user: User }): ReactElement => {
  const [isEditing, setIsEditing] = useState(false);

  return (
        <Flex flexDir={'column'} justifyContent={'flex-start'}>
            <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'150px'}
                    w={'full'}
                    src={'https://source.unsplash.com/1600x900/?nature'}
                    objectFit={'cover'}
                />

            </Box>
            <Flex>
                <Box w={'max-content'} h={'full'} bg={useColorModeValue('white', 'gray.800')} borderRadius={'0 0 8px 0'}>
                    <Flex justify={'center'} mt={-12}>
                        <Avatar
                            size={'2xl'}
                            name={props.user.name}
                            src={getUserAvatar(props.user.id, props.user.avatar)}
                            css={{
                              border: '2px solid white'
                            }}
                        />
                    </Flex>
                    <Box p={6}>
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                {props.user.name}
                            </Heading>
                            <Text color={'gray.500'}>{'@' + props.user.username}</Text>
                        </Stack>

                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>5</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Followers
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>6</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Followers
                                </Text>
                            </Stack>
                        </Stack>
                        {
                            props.currentUser.user?.username === props.user.username
                              ? <EditButton onClick={() => {
                                setIsEditing(!isEditing);
                              }}/>
                              : <FollowButton/>
                        }
                        <Divider m={2}/>
                        <Box textAlign={'left'}>
                            <Text>Role:</Text>
                            <Text color={'gray.500'} fontSize={'md'}>{props.user.admin ? 'Admin' : 'User'}</Text>
                            <Text>Email:</Text>
                            <Text color={'gray.500'} fontSize={'md'}>{props.user.email}</Text>
                        </Box>

                    </Box>
                </Box>
                <Box p={5} w={'full'} textAlign={'left'}>
                    {
                        !isEditing
                          ? (
                            <React.Fragment>
                                <Text fontWeight={'bold'} fontSize={'3xl'} mb={2}>Posts</Text>
                                <Posts userId={props.user.id}/>
                            </React.Fragment>
                            )
                          : <EditPage context={props.currentUser}/>
                    }
                </Box>
            </Flex>
        </Flex>
  );
};

const FollowButton = (): ReactElement => {
  return (
            <Button
                w={'full'}
                mt={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg'
                }}>
                Follow
            </Button>
  );
};

const EditButton = (props: { onClick: any }): ReactElement => {
  return (
        <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            leftIcon={<FiSettings/>}
            onClick={props.onClick}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}>
            Edit
        </Button>
  );
};
