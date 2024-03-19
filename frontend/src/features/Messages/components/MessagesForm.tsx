import React, { useState } from 'react';
import { ChatMessageMutation } from '../../../types';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser, usersWithStatusState } from '../../Users/usersSlice.ts';
import { LoadingButton } from '@mui/lab';
import { webSocket } from '../../WebSocket/webSocketSlice.ts';

const MessagesForm = () => {
  const users = useAppSelector(usersWithStatusState);
  const socket = useAppSelector(webSocket);
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<ChatMessageMutation>({
    userId: '',
    content: '',
    recipient: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    setState((prevState) => {
      return { ...prevState, recipient: e.target.value };
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('submit check ', socket);
      setState((prevState) => ({
        ...prevState,
        userId: user?._id || prevState.userId,
      }));

      socket?.send(
        JSON.stringify({
          type: 'NEW_MESSAGE',
          payload: state,
        }),
      );
      setState({
        userId: '',
        content: '',
        recipient: '',
      });
    } catch (e) {
      console.log('Caught on try - SUBMIT FORM - ', e);
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      alignItems="flex-start"
      onSubmit={submitHandler}
      mt={5}
    >
      <TextField
        type="text"
        id="content"
        label="Message"
        value={state.content}
        onChange={inputChangeHandler}
        name="content"
        required
        sx={{ flexGrow: 1 }}
      />
      <FormControl sx={{ flexGrow: 1, marginLeft: '8px' }}>
        <InputLabel id="demo-simple-select-label">Users</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.recipient}
          label="Artists"
          onChange={selectChangeHandler}
          sx={{ marginBottom: '16px' }}
        >
          {users.map((item) =>
            item.isOnline ? (
              <MenuItem key={item._id} value={item._id}>
                {item.displayName}
              </MenuItem>
            ) : null,
          )}
        </Select>
      </FormControl>
      <LoadingButton
        type="submit"
        variant="contained"
        sx={{ alignSelf: 'center', marginLeft: '8px' }}
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default MessagesForm;
