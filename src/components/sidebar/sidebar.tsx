import React, { ReactElement, ReactNode, useContext } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiSettings, FiUser
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import Navigation from './parts/navigation';
import { Link as RouterLink } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';

interface LinkItemProps {
  name: string
  icon: IconType
  route: string
  hidden: boolean
}
const LinkItems: LinkItemProps[] = [
  { name: 'Home', icon: FiHome, route: '/', hidden: false },
  { name: 'Trending', icon: FiTrendingUp, route: '/trending', hidden: false },
  { name: 'Profile', icon: FiSettings, route: '/login', hidden: false },
  { name: 'Users', route: '/users', icon: FiUser, hidden: true }
];

export default function Sidebar ({ children }: { children: ReactNode }): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            <Navigation onOpen={onOpen} />

            <Box ml={{ base: 0, md: 60 }}>
                {children}
            </Box>
        </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps): ReactElement => {
  const context = useContext(DataContext);
  const filteredItems = context.user?.admin ? LinkItems : LinkItems.filter(item => !item.hidden);

  return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    ReactNetwork
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>

            {filteredItems.map((link, index) => (
                <NavItem key={index}
                         icon={link.icon} as={'a'}
                         route={link.name === 'Profile' && context.user ? `/profile/${context.user.username}` : link.route }
                >
                    {link.name}
                </NavItem>
            ))}
        </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType
  children: string
  route: string
}
const NavItem = ({ icon, children, route }: NavItemProps): ReactElement => {
  return (
        <RouterLink to={route} style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                  bg: 'teal.400',
                  color: 'white'
                }}>
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                      color: 'white'
                    }}
                    as={icon}
                />
                {children}
            </Flex>
        </RouterLink>
  );
};
