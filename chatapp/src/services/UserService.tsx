import { BaseService } from "./BaseService";

class UserService extends BaseService {
  getProfile = () => {
    return this.get("/user/profile");
  };
  getUserList = (params: { full_name: string }) => {
    return this.get("/user", params);
  };
}

export const userService = new UserService();
