import React, { ReactElement } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import LostImage from '../../assets/lost.svg';
interface RouteError {
  statusText: string
  status: number
}

export default function ErrorPage (): ReactElement {
  const error = useRouteError() as RouteError;
  const errorMessage = error.status === 404
    ? 'The page you are looking for does not seem to exist'
    : 'An unknown error has occurred';
  console.error(error);

  return (
        <Box textAlign="center" py={8} px={6} height='100vh'>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                backgroundClip="text">
                {error.status || '???'}
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                {error.statusText || 'Unknown error'}
            </Text>
            <Text color={'gray.500'} mb={6}>
                {errorMessage}
            </Text>
            <Link to={'/'}>
            <Button
                colorScheme="teal"
                color="white"
                variant="solid">
                Go to Home
            </Button>
            </Link>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'contain'}
                    src={LostImage}
                />
            </Flex>
        </Box>
  );
}
