import { Grid } from '@mui/material';
import { useAppSelector } from '../../app/hooks.ts';
import { messagesState } from './messagesSlice.ts';
import MessagesItem from './components/MessagesItem.tsx';
import { selectUser } from '../Users/usersSlice.ts';

const Messages = () => {
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(messagesState);

  const notEmpty = messages.map((item) => (
    <MessagesItem
      key={item._id}
      _id={item._id}
      content={item.content}
      datetime={item.datetime}
      userId={item.userId}
      recipient={item.recipient}
    />
  ));

  return (
    <Grid item border="1px solid green" flexGrow="1">
      {user
        ? messages.length !== 0
          ? notEmpty
          : 'No message to load'
        : 'Login to see messages'}
    </Grid>
  );
};

export default Messages;
