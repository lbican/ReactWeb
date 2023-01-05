import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Image, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import RegisterImage from '../../../assets/account.svg';
import React, { ReactElement } from 'react';

export default function SuccessAlert (): ReactElement {
  return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Alert
                    rounded={'8px'}
                    colorScheme='teal'
                    status='success'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='50%'
                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        Registration successful!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Thank you for registering! You can now login.

                        <Link to={'/login'}>
                            <Button marginTop={'1rem'} leftIcon={<ArrowBackIcon/>} colorScheme='teal' variant='solid'>
                                Login
                            </Button>
                        </Link>
                    </AlertDescription>
                </Alert>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'contain'}
                    src={RegisterImage}
                />
            </Flex>
        </Stack>
  );
}
