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
import Male from '../../../assets/male.svg';

const UserMenu = (): ReactElement => {
  if (isAuthenticated()) {
    return (
          <Menu>
              <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: 'none' }}>
                  <HStack>
                      <UserInfo/>
                  </HStack>
              </MenuButton>
              <MenuList
                  bg={useColorModeValue('white', 'gray.900')}
                  borderColor={useColorModeValue('gray.200', 'gray.700')}>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={signOut}>Sign out</MenuItem>
              </MenuList>
          </Menu>
    );
  }

  return <AuthButtons/>;
};

const signOut = (): void => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};

const UserInfo = (): ReactElement => {
  return (
        <>
            <Avatar
                size={'sm'}
                src={Male}
            />
            <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2">
                <Text fontSize="sm">Justina Clark</Text>
                <Text fontSize="xs" color="gray.600">
                    Admin
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

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('user') || !!sessionStorage.getItem('user');
};

export default UserMenu;
