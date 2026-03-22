import $api from "../http";

import type { AxiosResponse } from "axios";
import type { IUser } from "../models/response/IUser";

export default class UserService {
  static fetchUser(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/profile`);
  }
}
