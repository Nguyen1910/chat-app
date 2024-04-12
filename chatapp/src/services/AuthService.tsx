import { BaseService } from "./BaseService";

class AuthService extends BaseService {
  login = (email: string, password: string) => {
    return this.post("/auth/login", { email, password });
  };
  loginWithGmail = (user: any, providerId: string) => {
    return this.post("/auth/loginWithGmail", { user, providerId });
  };
}

export const authService = new AuthService();
