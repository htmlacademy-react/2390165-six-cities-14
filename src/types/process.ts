import { AuthStatus } from '../const';
import { UserData } from './user-data';

type UserProcess = {
  authStatus: AuthStatus;
  userData: UserData;
}

export type {
  UserProcess,
};
