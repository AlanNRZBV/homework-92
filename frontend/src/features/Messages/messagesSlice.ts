import { ChatMessage } from '../../types';

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface MessagesState {
  messages:ChatMessage[],
  isLoading: boolean,
}

const initialState: MessagesState = {
  messages:[],
  isLoading: false
}

export const messagesSlice = createSlice({
  name:'messages',
  initialState,
  reducers:{}
})

export const messagesReducer = messagesSlice.reducer
export const messagesState = (state:RootState)=>state.messages