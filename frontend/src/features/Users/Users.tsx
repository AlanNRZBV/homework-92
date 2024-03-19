import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser, usersWithStatusState } from './usersSlice.ts';

const Users = () => {
  const usersWithStatus = useAppSelector(usersWithStatusState);
  const user = useAppSelector(selectUser);

  const users = usersWithStatus.map((item, index) => (
    <li key={index} style={{ color: item.isOnline ? 'green' : 'red' }}>
      {item.displayName}
    </li>
  ));

  return (
    <Grid
      item
      container
      border="1px solid blue"
      flexBasis="25%"
      justifyContent="center"
    >
      {!user ? <Typography>Login to see users</Typography> : users}
    </Grid>
  );
};

export default Users;
