import Messages from '../Messages/Messages.tsx';
import Users from '../Users/Users.tsx';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { loadUsersWithStatus, selectUser } from '../Users/usersSlice.ts';
import { useEffect } from 'react';
import { connect, webSocket } from '../WebSocket/webSocketSlice.ts';
import { IncomingUsersMessage } from '../../types';
import { loadMessages } from '../Messages/messagesSlice.ts';

const CustomContainer = () => {
  const dispatch = useAppDispatch();
  const socket = useAppSelector(webSocket);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user && !socket) {
      dispatch(connect('ws://localhost:8000/chat'));
    }

    if (socket) {
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            type: 'LOGIN',
            payload: user?.token,
          }),
        );
      };

      socket.onmessage = (e) => {
        const decodedMessage = JSON.parse(e.data) as IncomingUsersMessage;
        if (decodedMessage.type === 'USERS_TOTAL') {
          dispatch(loadUsersWithStatus(decodedMessage.payload));
        }
        if (decodedMessage.type === 'LAST_MESSAGES') {
          dispatch(loadMessages(decodedMessage.payload));
        }
      };
    }
  }, [dispatch, socket, user]);

  return (
    <Grid
      container
      mt={2}
      flex={1}
      alignItems="stretch"
      border="1px solid red"
      px={2}
    >
      <Users />
      <Messages />
    </Grid>
  );
};

export default CustomContainer;
