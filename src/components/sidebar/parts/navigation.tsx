import {
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React, { ReactElement, useContext } from 'react';
import { FiMenu } from 'react-icons/fi';
import UserMenu from './user-menu';
import { ColorModeSwitcher } from '../../colors/color-mode-switcher';
import { UserContext } from '../../../context/UserContext';

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const Navigation = ({ onOpen, ...rest }: MobileProps): ReactElement => {
  const userContext = useContext(UserContext);

  return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>

            {/* Mobile navigation menu */}
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                ReactNetwork
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <UserMenu context={userContext}/>
                </Flex>
                <ColorModeSwitcher/>
            </HStack>
        </Flex>
  );
};

export default Navigation;
