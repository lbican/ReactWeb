import { User } from '../../../context/DataContext';
import React, { ReactElement } from 'react';
import { Avatar, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { getUserAvatar } from '../../../utils/database.utils';

export const Comment = (props: { user: User | undefined, comment: string }): ReactElement => {
  if (!props.user) {
    return <Text>No comments to show</Text>;
  }
  return (
        <HStack padding='6' boxShadow='lg' bg={useColorModeValue('white', 'gray.700')}>
            <Avatar
                size={'sm'}
                name={props.user?.name}
                src={getUserAvatar(props.user?.id, props.user?.avatar)}
                css={{
                  border: '2px solid white'
                }}
            />
            <Text>{props.comment}</Text>
        </HStack>
  );
};
