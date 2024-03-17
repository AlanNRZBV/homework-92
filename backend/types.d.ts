import {Model} from "mongoose";
import {WebSocket} from 'ws'

export interface ActiveConnections {
  [id:string]: WebSocket
}

export interface IncomingMessage{
  type:string,
  payload: string
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
  googleID?: string
}

interface UserMethods {

  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}


type UserModel = Model<UserFields, unknown, UserMethods>;