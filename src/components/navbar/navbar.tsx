import React, { ReactElement } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure, Img
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon
} from '@chakra-ui/icons';
import { DesktopNav } from './parts/desktop-nav';
import { MobileNav } from './parts/mobile-nav';
import { ColorModeSwitcher } from '../colors/color-mode-switcher';
import Logo from '../../assets/logo.svg';

export default function Navbar (): ReactElement {
  const { isOpen, onToggle } = useDisclosure();

  return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                p={2}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems={'center'}>
                    <Img src={Logo}></Img>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button
                        as={'a'}
                        href={'/login'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                    >
                        Sign In
                    </Button>

                    <Button
                        as={'a'}
                        href={'/register'}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'teal.500'}
                        _hover={{
                          bg: 'teal.400'
                        }}>
                        Sign Up
                    </Button>
                    <ColorModeSwitcher/>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
  );
}
