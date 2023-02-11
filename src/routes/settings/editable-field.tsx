import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls
} from '@chakra-ui/react';
import React, {ReactElement, useContext} from 'react';
import { pb } from '../../utils/database.utils';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {UserContext} from "../../context/UserContext";

export default function EditableField (props: { fieldName: string | undefined, id: string | undefined }): ReactElement {
  const user = useContext(UserContext);
  /* Here's a custom control */
  const handleSubmit = async (val: any) => {
    const res = await pb.collection('users').update(props.id!, {
      username: val
    }).then();

    console.log(res);
  };

  return (
        <Editable
            onSubmit={handleSubmit}
            textAlign='center'
            defaultValue={props.fieldName}
            fontSize='2xl'
            isPreviewFocusable={false}
        >
            <Flex>
            <EditablePreview />
            {/* Here is the custom input */}
            <Input as={EditableInput} />
            <EditableControls />
            </Flex>
        </Editable>
  );
}

function EditableControls (): ReactElement {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps
  } = useEditableControls();

  return isEditing
    ? (
            <ButtonGroup justifyContent='center' size='sm' m={2}>
                <IconButton aria-label='Confirm' icon={<CheckIcon />} {...getSubmitButtonProps()}/>
                <IconButton aria-label='Cancel' icon={<CloseIcon />} {...getCancelButtonProps()}/>
            </ButtonGroup>
      )
    : (
            <Flex justifyContent='center' m={2}>
                <IconButton aria-label='Edit' icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
      );
}
