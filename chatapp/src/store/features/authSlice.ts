import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../types";
import { userService } from "../../services/UserService";

interface AuthState {
  user: UserInterface | null;
}

const initialState: AuthState = {
  user: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const getProfile = createAsyncThunk("auth/getProfile", async () => {
  const res = await userService.getProfile();
  return res.data;
});

export const { setProfile } = AuthSlice.actions;
