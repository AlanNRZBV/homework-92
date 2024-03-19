import {Model} from "mongoose";
import {WebSocket} from 'ws'

export interface ActiveConnections {
  [id:string]: WebSocket
}

export interface IncomingLoginMessage{
  type:string,
  payload: string
}
export interface IncomingMessageDataMessage{
  type:string,
  payload: MessageData
}

export interface MessageData{
  userId: string,
  content: string,
  recipient: string
}
export interface UserOnline {
  displayName:string
}


export interface UserData {
  email:string,
  password: string,
  displayName: string
}

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string
  displayName?: string,
  isOnline: boolean

}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
  setOnline():void
  setOffline():void
}


type UserModel = Model<UserFields, unknown, UserMethods>;