import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { FriendSlice } from "./features/friendSlice";
import { ConversationSlice } from "./features/conversationSlice";
import { AuthSlice } from "./features/authSlice";
import { UserSlice } from "./features/userSlice";
// import counterReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: {
    friend: FriendSlice.reducer,
    conversation: ConversationSlice.reducer,
    auth: AuthSlice.reducer,
    user: UserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
