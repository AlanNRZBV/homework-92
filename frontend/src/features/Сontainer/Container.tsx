import Messages from '../Messages/Messages.tsx';
import Users from '../Users/Users.tsx';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  loadUsersWithStatus,
  selectUser,
  usersWithStatusState,
} from '../Users/usersSlice.ts';
import { useEffect, useRef } from 'react';
import { connect, webSocket } from '../WebSocket/webSocketSlice.ts';
import { IncomingUsersMessage } from '../../types';

const Container = () => {
  const dispatch = useAppDispatch();
  const socket = useAppSelector(webSocket);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (e) => {
        const decodedMessage = JSON.parse(e.data) as IncomingUsersMessage;
        if (decodedMessage.type === 'USERS_TOTAL') {
          dispatch(loadUsersWithStatus(decodedMessage.payload));
        }
      };
    }
  }, [dispatch, socket]);

  return (
    <Grid container mt={2}>
      <Users />
      <Messages />
    </Grid>
  );
};

export default Container;
