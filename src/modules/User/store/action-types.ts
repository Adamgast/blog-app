export interface UserState {
  currentUser: IUser | null;
  serverErrors: TypeServerErrors | null | undefined;
  isAuth: boolean;
  isLoading: boolean;
}

export type TypeServerErrors = {
  username?: string;
  email?: string;
  'email or password'?: string;
};

export interface IUser {
  username: string;
  email: string;
  image?: string;
}