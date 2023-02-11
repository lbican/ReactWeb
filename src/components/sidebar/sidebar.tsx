import React, { ReactElement, ReactNode } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link as UiLink,
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
  FiStar,
  FiSettings
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import Navigation from './parts/navigation';
import { Link as RouterLink } from 'react-router-dom';

interface LinkItemProps {
  name: string
  icon: IconType
}
const LinkItems: LinkItemProps[] = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings }
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

            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps): ReactElement => {
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

            {LinkItems.map((link, index) => (
                <NavItem key={index} icon={link.icon} as={'a'}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType
  children: string
}
const NavItem = ({ icon, children }: NavItemProps): ReactElement => {
  return (
        <UiLink href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
        </UiLink>
  );
};
