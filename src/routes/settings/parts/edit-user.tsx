import React, { ReactElement, useState } from 'react';
import {
  Alert,
  AlertIcon, Avatar,
  Box,
  Button,
  FormControl, FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack, useColorModeValue, WrapItem
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { getErrorReport, ResponseError } from '../../register/error-builder';
import { getUserAvatar, pb } from '../../../utils/database.utils';
import { User, DataContextType } from '../../../context/DataContext';

const EditPage = (props: { context: DataContextType }): ReactElement => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ResponseError[]>([]);

  const onSubmit = async (formData: any): Promise<any> => {
    setIsLoading(true);

    const updateData = new FormData();
    for (const file of formData.avatar) {
      updateData.append('avatar', file);
    }

    updateData.append('name', formData.firstName.concat(' ').concat(formData.lastName));

    if (props.context.user) {
      return await pb.collection('users').update(props.context.user.id, updateData).then((res) => {
        const user = res as unknown as User;
        props.context.update(user);
        setSuccess(true);
      }).catch((error) => {
        setError(getErrorReport(error.data.data));
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };
  if(success){
      location.reload();
  }

  return (
        <Stack direction={{ base: 'row' }} bg={useColorModeValue('white', 'gray.900')} p={5} borderRadius={'8px'}>
            <WrapItem m={5} >
                <FormLabel _hover={{ filter: 'drop-shadow(8px 8px 8px teal)' }}>
                <Input type={'file'} {...register('avatar')} display={'none'}/>
                <Avatar size='2xl' name={props.context.user?.name} src={getUserAvatar(props.context.user?.id, props.context.user?.avatar)}/>
                </FormLabel>
            </WrapItem>
            <Stack spacing={4} as={'form'} onSubmit={handleSubmit(onSubmit)}>
                <Heading fontSize={'2xl'}>Update your account</Heading>

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

                <Button
                    isLoading={isLoading}
                    loadingText='Updating...'
                    type='submit'
                    colorScheme={'teal'}
                    variant={'solid'}>
                            Update
                        </Button>

                {error.length > 0 && <Alert status='error'>
                            <AlertIcon />
                            <ErrorDisplay errors={error}/>
                        </Alert>}
            </Stack>
        </Stack>
  );
};

const ErrorDisplay = (props: { errors: ResponseError[] }): ReactElement => {
  return (
        <div>
            {
                props.errors.map((error, index) => {
                  return <p key={index}>{error.message}</p>;
                })
            }
        </div>
  );
};

export default EditPage;
