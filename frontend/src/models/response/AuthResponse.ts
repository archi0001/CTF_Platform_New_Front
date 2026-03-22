import { type IUser } from "./IUser";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};
