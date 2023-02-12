import React, { ReactElement } from 'react';
import {
  Avatar,
  Box, Button,
  HStack,
  Menu,
  MenuButton, MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { DataContextType } from '../../../context/DataContext';
import { Link } from 'react-router-dom';
import { getUserAvatar, isAuthenticated } from '../../../utils/database.utils';

const UserMenu = (props: { context: DataContextType }): ReactElement => {
  const logout = () => {
    props.context.logout();
    location.reload();
  };

  if (isAuthenticated()) {
    return (
          <Menu>
              <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: 'none' }}>
                  <HStack>
                      <UserInfo context={props.context}/>
                  </HStack>
              </MenuButton>
              <MenuList
                  bg={useColorModeValue('white', 'gray.900')}
                  borderColor={useColorModeValue('gray.200', 'gray.700')}>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem as={'div'}>
                      <Link to={'/settings'}>
                          Settings
                      </Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Sign out</MenuItem>
              </MenuList>
          </Menu>
    );
  }

  return <AuthButtons/>;
};

const UserInfo = (props: { context: DataContextType }): ReactElement => {
  const user = props.context.user;

  return (
        <>
            <Avatar
                name={user?.name}
                size={'sm'}
                src={getUserAvatar(user?.id, user?.avatar)}
            />
            <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2">
                <Text fontSize="sm">{user?.name}</Text>
                <Text fontSize="xs" color="gray.600">
                    {user?.admin ? 'Admin' : 'User'}
                </Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
            </Box>
        </>
  );
};

const AuthButtons = (): ReactElement => {
  return (
        <HStack>
            <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={400}
                mx={5}
                variant={'link'}
                href={'/login'}>
                Sign In
            </Button>
            <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'teal.500'}
                _hover={{
                  bg: 'teal.400'
                }}
                href={'/register'}>
                Sign Up
            </Button>
        </HStack>
  );
};

export default UserMenu;
