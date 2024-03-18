import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  ValidationError,
} from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';
import { unsetUser } from './usersSlice.ts';
import { connect } from '../WebSocket/webSocketSlice.ts';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];
    keys.forEach((key) => {
      const value = registerMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    const response = await axiosApi.post('/users', registerMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalError; state: RootState }
>(
  'users/login',
  async (loginMutation, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>(
        '/users/sessions',
        loginMutation,
      );
      if (response) {
        dispatch(connect('ws://localhost:8000/chat'));
        const ws = getState().webSocket.socket;
        if (ws) {
          ws.onopen = () => {
            ws.send(
              JSON.stringify({
                type: 'LOGIN',
                payload: response.data.user.token,
              }),
            );
          };
        }
      }

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { getState, dispatch }) => {
    const token = getState().users.user?.token;

    const ws = getState().webSocket.socket;

    if (ws) {
      ws.onclose = () => {
        ws.send(
          JSON.stringify({
            type: 'LOGOUT',
            payload: token,
          }),
        );
      };
    }

    await axiosApi.delete('/users/sessions', {
      headers: { Authorization: 'Bearer' + token },
    });
    dispatch(unsetUser());
  },
);
