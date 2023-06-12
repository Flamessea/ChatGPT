export interface UserState {
  token: string;
  name: string;
  avatar: string;
  auth: string;
}

export interface UserApi extends UserState {
  setUser: (user: UserState) => void;
}
