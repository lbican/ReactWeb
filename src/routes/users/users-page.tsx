import React, { ReactElement, useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box, Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  WrapItem
} from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { DataContext, DataContextType, User } from '../../context/DataContext';
import { getUserAvatar, isAuthenticated, pb } from '../../utils/database.utils';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

export const UsersPage = (): ReactElement => {
  const context = useContext(DataContext);

  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() && !context.user?.admin) {
      navigate('/');
    }
    getUsers().then((res) => {
      setUsers(res);
    }).catch((e) => {
      console.error(e);
    });
  }, []);

  const getUsers = async (): Promise<User[]> => {
    return await pb.collection('users').getFullList(200 /* batch size */, {
      sort: '-created'
    });
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Sidebar>
          <Box p={5} textAlign={'left'}>
              <Text fontWeight={'bold'} fontSize={'3xl'} mb={2}>Manage users</Text>
          </Box>
          <UserTable users={users} context={context}/>
      </Sidebar>
    </Box>
  );
};

const UserTable = (props: { users: User[], context: DataContextType }): ReactElement => {
  return (
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>

                <Thead>
                    <Tr>
                        <Th>Profile picture</Th>
                        <Th>User</Th>
                        <Th>Username</Th>
                        <Th>Admin</Th>
                        <Th>Email</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        props.users.map((user, index) => {
                          return <UserRow key={index} user={user} context={props.context}/>;
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
  );
};

const UserRow = (props: { user: User, context: DataContextType }): ReactElement => {
  const [user, setUser] = useState<User>(props.user);

  const changeRole = async (id: string, admin: boolean): Promise<User> => {
    return await pb.collection('users').update(id, {
      admin
    });
  };

  const handleClick = (id: string, admin: boolean): void => {
    changeRole(id, admin).then((res) => {
      setUser(res);
    }).catch((e) => {
      console.error(e);
    });
  };
  return (
        <Tr>
            <Td>
                <WrapItem mr={3}>
                    <Avatar size={'md'}
                            name={user.name}
                            src={getUserAvatar(user.id, user.avatar)} />
                </WrapItem>
            </Td>
            <Td>{user.name}</Td>
            <Td>
                <Link to={'/profile/'.concat(user.username)}>
                {'@'.concat(user.username)}
                </Link>
            </Td>
            <Td>{user.admin ? 'Yes' : 'No'}</Td>
            <Td>{user.email}</Td>
            {user.id !== props.context.user?.id
              ? <Td>{!user.admin
                ? (
                    <Button leftIcon={<ArrowUpIcon/>} colorScheme='teal' variant='solid' onClick={() => {
                      handleClick(user.id, true);
                    }}>
                        Promote
                    </Button>
                  )
                : (
                    <Button leftIcon={<ArrowDownIcon/>} colorScheme='yellow' variant='solid' onClick={() => {
                      handleClick(user.id, false);
                    }}>
                        Demote
                    </Button>
                  )}</Td>
              : <Td>Cannot change</Td>}

        </Tr>
  );
};
