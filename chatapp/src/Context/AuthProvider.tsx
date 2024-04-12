import React, { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { auth, providerEmail, signInWithPopup } from "../firebase/config";
import { useAppDispatch } from "../store/store";
import { getProfile, setProfile } from "../store/features/authSlice";

interface AuthContextInterface {
  loginAction: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  handleSignInWithEmail: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      (async () => {
        try {
          dispatch(getProfile());
          return;
        } catch (error) {
          navigate("/login");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return;
        }
      })();
    } else {
      // navigate("/login");
      return;
    }
  }, []);

  const loginAction = async (data: { email: string; password: string }) => {
    try {
      const response = await authService.login(data.email, data.password);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        dispatch(setProfile(response.data.user));
        navigate("/");
        return;
      }
    } catch (error) {}
  };

  const logout = () => {
    dispatch(setProfile(null));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const handleSignInWithEmail = async () => {
    try {
      const { user, providerId } = await signInWithPopup(auth, providerEmail);
      const res = await authService.loginWithGmail(user, providerId + "");
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        dispatch(setProfile(res.data.user));
        navigate("/");
        return;
      }
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{ loginAction, logout, handleSignInWithEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
