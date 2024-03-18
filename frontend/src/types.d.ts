export interface IncomingChatMessage {
  type: string;
  payload: ChatMessage[];
}
export interface ChatMessage {
  content: string;
}
export interface IncomingUsersMessage {
  type: string;
  payload: UsersWithStatusp[];
}

export interface UsersWithStatus {
  displayName: string;
  isOnline: boolean;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  isOnline: boolean;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
