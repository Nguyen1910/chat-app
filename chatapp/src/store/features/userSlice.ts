import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../types";
import { userService } from "../../services/UserService";

interface UserState {
  list: UserInterface[];
  loading: boolean;
}

const initialState: UserState = {
  loading: false,
  list: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserBySearch.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const getUserBySearch = createAsyncThunk(
  "user/getUserBySearch",
  async (full_name: string) => {
    const res = await userService.getUserList({ full_name });
    return res.data.data;
  }
);
