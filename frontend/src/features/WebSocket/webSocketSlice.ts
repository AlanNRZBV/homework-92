import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface WebSocketState {
  socket: WebSocket | null;
}

const initialState: WebSocketState = {
  socket: null,
};

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    connect: (state, action) => {
      state.socket = new WebSocket(action.payload);
    },
  },
});

export const { connect } = webSocketSlice.actions;

export const webSocketReducer = webSocketSlice.reducer;
export const webSocket = (state: RootState) => state.webSocket.socket;
