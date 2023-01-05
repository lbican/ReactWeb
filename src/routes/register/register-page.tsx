import React, { ReactElement, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl, FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack
} from '@chakra-ui/react';
import RegisterImage from '../../assets/account.svg';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { pb, User } from '../../utils/database.utils';
import SuccessAlert from './parts/success-alert';
const RegisterPage = (): ReactElement => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (formData: any): Promise<any> => {
    setIsLoading(true);
    const data = {
      username: formData.username,
      email: formData.email,
      emailVisibility: true,
      password: formData.password,
      passwordConfirm: formData.confirmPassword,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      name: formData.firstName + ' ' + formData.lastName
    } satisfies User;

    return await pb.collection('users').create(data).then(() => {
      setSuccess(true);
    }).catch((error) => {
      setError(true);
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const [show, setShow] = React.useState(false);
  const handleClick = (): void => setShow(!show);

  if (success) {
    return <SuccessAlert/>;
  }

  return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'} as={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Heading fontSize={'2xl'}>Create your account</Heading>

            <HStack spacing={4}>
              <Box>
                <FormControl id="firstName" isInvalid={!!errors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" {...register('firstName', { required: 'First name is required' })}/>
                  {errors.firstName && <FormErrorMessage>{errors.firstName.message?.toString()}</FormErrorMessage>}
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isInvalid={!!errors.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" {...register('lastName', { required: 'Last name is required' })} />
                  {errors.lastName && <FormErrorMessage>{errors.lastName.message?.toString()}</FormErrorMessage>}
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="username" isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input type="text" {...register('username', { required: 'Username is required' })}/>
              {errors.username && <FormErrorMessage>{errors.username.message?.toString()}</FormErrorMessage>}
            </FormControl>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register('email', { required: 'Email is required' })} placeholder='Enter email address'/>
              {errors.email && <FormErrorMessage>{errors.email.message?.toString()}</FormErrorMessage>}
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      },
                      maxLength: {
                        value: 72,
                        message: 'Password cannot exceed 72 characters'
                      }
                    })}
                    placeholder='Enter password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>

                  {
                    show ? <ViewIcon/> : <ViewOffIcon/>
                  }
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && <FormErrorMessage>{errors.password.message?.toString()}</FormErrorMessage>}
            </FormControl>
            <FormControl id="confirm" isInvalid={!!errors.confirmPassword}>
              <FormLabel>Confirm password</FormLabel>
              <Input
                  type="password"
                  placeholder='Confirm password'
                  {...register('confirmPassword', {
                    required: 'You have to confirm password',
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return 'Your passwords do no match';
                      }
                    }
                  })} />
              {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message?.toString()}</FormErrorMessage>}
            </FormControl>

            <Button
                isLoading={isLoading}
                loadingText='Signing up'
                type='submit'
                colorScheme={'teal'}
                variant={'solid'}>
              Sign up
            </Button>

            {error && <Alert status='error'>
              <AlertIcon />There was an error while registering your account.</Alert>
            }
          </Stack>
        </Flex>
        <Flex flex={1} padding={1}>
          <Image
              alt={'Login Image'}
              objectFit={'contain'}
              src={RegisterImage}
          />
        </Flex>
      </Stack>
  );
};

export default RegisterPage;
