import React, { ReactElement, useContext } from 'react';
import { Avatar, Box, WrapItem } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/sidebar';
import { UserContext } from '../../context/UserContext';
import EditableField from "./editable-field";

export const SettingsPage = (): ReactElement => {
  const user = useContext(UserContext);
  return (
        <Box textAlign="center" fontSize="xl">
            <Sidebar>
                {/* SETTINGS CONTENT */}
                <Box borderRadius={'8px'} height={'full'} bg={'white'} p={5} boxShadow={'lg'}>
                    <WrapItem>
                        <Avatar size='2xl' name={user.user?.name} src={user.user?.avatar} />{' '}
                    </WrapItem>
                    <EditableField fieldName={user.user?.name} id={user.user?.id}/>
                    <EditableField fieldName={user.user?.username} id={user.user?.id}/>
                    <EditableField fieldName={user.user?.email} id={user.user?.id}/>

                </Box>

            </Sidebar>
        </Box>
  );
};
