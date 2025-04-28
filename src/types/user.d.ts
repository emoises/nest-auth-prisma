import { Request } from 'express';

export interface UserRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
  token?: string;
}

export interface UserRequestME extends Request {
  userId: number;
  username: string;
}
