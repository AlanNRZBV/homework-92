import {Model} from "mongoose";

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