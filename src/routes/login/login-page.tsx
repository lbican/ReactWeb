import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  Flex,
  FormControl, FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link as UiLink,
  Stack
} from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react';
import SpaceImage from '../../assets/space.svg';
import { pb } from '../../utils/database.utils';
import { useForm } from 'react-hook-form';
import { redirect, useNavigate } from 'react-router-dom';

interface LoginData {
  identifier: string
  password: string
  remember: boolean
}

const LoginPage = (): ReactElement => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any): Promise<any> => {
    const formData: LoginData = { ...data };
    setError(false);
    setSuccess(false);
    setIsLoading(true);

    console.log(formData);
    return await pb.collection('users').authWithPassword(
      formData.identifier,
      formData.password
    ).then((response) => {
      console.log(response);
      loginUser(response.record, formData.remember);
      setSuccess(true);
    }).catch((error) => {
      console.error(error);
      setError(true);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const loginUser = (authorizedUser: any, rememberUser: boolean): void => {
    if (rememberUser) {
      localStorage.setItem('user', JSON.stringify(authorizedUser));
    } else {
      sessionStorage.setItem('user', JSON.stringify(authorizedUser));
    }

    setTimeout(() => {
      navigate('/');
    }, 50);
  };

  return (
        <Stack direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'} as={'form'} onSubmit={handleSubmit(onSubmit)}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <FormControl id="identifier" isInvalid={!!errors.identifier}>
                        <FormLabel>Email or username</FormLabel>
                        <Input type="text" {...register('identifier', { required: 'Email or username are required' })}/>
                        {errors.identifier && <FormErrorMessage>{errors.identifier.message?.toString()}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="password" isInvalid={!!errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" {...register('password', { required: 'Password is required' })}/>
                        {errors.password && <FormErrorMessage>{errors.password.message?.toString()}</FormErrorMessage>}
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox {...register('remember')}>Remember me</Checkbox>
                            <UiLink color={'teal.500'}>Forgot password?</UiLink>
                        </Stack>
                        <Button
                            isLoading={isLoading}
                            loadingText={'Working'}
                            type={'submit'}
                            colorScheme={'teal'}
                            variant={'solid'}>
                            Sign in
                        </Button>
                        {error && <Alert status='error'>
                            <AlertIcon />
                            Incorrect credentials!
                        </Alert>}
                        {success && <Alert status='success' colorScheme={'teal'}>
                            <AlertIcon />
                            Successfully logged in!
                        </Alert>}
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1} padding={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'contain'}
                    src={SpaceImage}
                />
            </Flex>
        </Stack>
  );
};

export default LoginPage;
