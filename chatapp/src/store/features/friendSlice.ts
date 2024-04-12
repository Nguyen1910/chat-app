import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../types";
import { friendService } from "../../services/FriendService";

interface FriendState {
  list: UserInterface[];
  requestFriends: UserInterface[];
  userList: UserInterface[];
}

const initialState: FriendState = {
  list: [],
  requestFriends: [],
  userList: [],
};

export const FriendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    addFriendRequest: (state, action) => {
      state.requestFriends.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriendList.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(addFriend.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(getRequestAddFriend.fulfilled, (state, action) => {
      state.requestFriends.unshift(...action.payload);
    });
    builder.addCase(removeRequestFriend.fulfilled, (state, action) => {
      console.log(action.payload);
      const newFriends = state.list.filter(
        (req) => req._id !== action.payload._id
      );
      state.list = newFriends;
    });
    builder.addCase(confirmRequestAddFriend.fulfilled, (state, action) => {
      const { confirm, friend } = action.payload;
      if (confirm) {
        const newFriends = state.requestFriends.map((f: any) => {
          if (f.friendId === friend._id) {
            return { ...f, confirm };
          }
          return f;
        });

        state.requestFriends = newFriends;
        return;
      }
      const newFriends = state.requestFriends.filter(
        (f: any) => f._id !== friend._id
      );
      state.requestFriends = newFriends;
    });
  },
});

export const getFriendList = createAsyncThunk("friend/getList", async () => {
  const res = await friendService.getByUser();
  return res.data.data;
});

export const addFriend = createAsyncThunk(
  "friend/add",
  async (friendId: string) => {
    const res = await friendService.addFriend(friendId);

    return res.data.data;
  }
);

export const removeRequestFriend = createAsyncThunk(
  "friend/removeRequestFriend",
  async (friendId: string) => {
    const res = await friendService.removeFriend(friendId);

    return res.data.data;
  }
);

export const getRequestAddFriend = createAsyncThunk(
  "friend/getRequestAddFriend",
  async () => {
    const res = await friendService.getFriendRequestList();
    return res.data.data;
  }
);

export const confirmRequestAddFriend = createAsyncThunk(
  "friend/confirmRequestAddFriend",
  async (data: { confirm: boolean; friendId: string }) => {
    const { confirm, friendId } = data;
    const res = await friendService.confirmFriend(friendId, confirm);
    return res.data.data;
  }
);

export const { addFriendRequest } = FriendSlice.actions;
