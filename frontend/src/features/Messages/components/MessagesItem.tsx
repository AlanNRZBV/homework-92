import { FC } from 'react';
import { ChatMessage } from '../../../types';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../Users/usersSlice.ts';

const MessagesItem: FC<ChatMessage> = ({
  _id,
  content,
  userId,
  datetime,
  recipient,
}) => {
  let isWhisper = false;

  const user = useAppSelector(selectUser);

  if (user) {
    isWhisper = recipient === user._id;
  }

  const defaultMessage = (
    <Box>
      <Box>
        <Typography>{userId.displayName}</Typography>
        <Typography>{datetime}</Typography>
      </Box>
      <Box>
        <Typography>{content}</Typography>
      </Box>
    </Box>
  );

  const whisperMessage = (
    <Box sx={{ backgroundColor: 'lightpink' }}>
      <Box>
        <Typography>{userId.displayName}</Typography>
        <Typography>{datetime}</Typography>
      </Box>
      <Box>
        <Typography>{content}</Typography>
      </Box>
    </Box>
  );

  return isWhisper ? whisperMessage : defaultMessage;
};

export default MessagesItem;
