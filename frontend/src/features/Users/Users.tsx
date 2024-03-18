import { Grid } from '@mui/material';
import { useAppSelector } from '../../app/hooks.ts';
import { usersWithStatusState } from './usersSlice.ts';

const Users = () => {
  const usersWithStatus = useAppSelector(usersWithStatusState);

  return (
    <Grid item>
      {usersWithStatus.map((item, index) => (
        <li key={index} style={{ color: item.isOnline ? 'green' : 'red' }}>
          {item.displayName}
        </li>
      ))}
    </Grid>
  );
};

export default Users;

/*
состояние пользователя хранится в стейте
логин --- изменяется стейт
в стейте хранится токен
если юзер !== null отправляю сообщение на ws {type:LOGIN, payload: token:string}


на сервере
принимаю сообщение и payload записываю в переменную
после отправляю её всем коннектам

 */
