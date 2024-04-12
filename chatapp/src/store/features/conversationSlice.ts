import { conversationService } from "../../services/ConversationService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ConversationInterface, MessageInterface } from "../../types";

interface ConversationState {
  currConversation: ConversationInterface | null;
  list: ConversationInterface[];
  messageList: MessageInterface[];
}

const initialState: ConversationState = {
  list: [],
  currConversation: null,
  messageList: [],
};

export const ConversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setCurrConversation: (state, action) => {
      state.currConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(getCurrConversation.fulfilled, (state, action) => {
      state.currConversation = action.payload;
    });
    builder.addCase(updateConversation.fulfilled, (state, action) => {
      const newCon = action.payload;
      if (!newCon?.click) {
        const newList = state.list.filter((con) => con._id !== newCon._id);
        if (newList) {
          newList.unshift(newCon);
        }
        state.list = newList;
      } else {
        const newList = state.list.map((con) => {
          if (con._id === newCon._id) {
            return {
              ...con,
              latest_message: { ...con.latest_message, status: true },
            };
          }
          return con;
        });
        state.list = newList;
      }
    });
  },
});

export const getConversations = createAsyncThunk(
  "conversation/getList",
  async (query: { inputSearch: string; type: string }) => {
    const res = await conversationService.getConversation(query);
    return res.data.data;
  }
);

export const getCurrConversation = createAsyncThunk(
  "conversation/getCurr",
  async (currConversationId: string) => {
    const res = await conversationService.getConversationById(
      currConversationId
    );
    return res.data.data;
  }
);

export const updateConversation = createAsyncThunk(
  "conversation/update",
  async (data: {
    currentConversation: ConversationInterface;
    latest_message: MessageInterface | null;
    userId: string;
  }) => {
    const { latest_message, currentConversation, userId } = data;
    if (latest_message) {
      if (
        currentConversation?._id === latest_message.conversationId &&
        userId !== latest_message.creator._id
      ) {
        const status = true;
        const updateCon = await conversationService.updateConversation(
          currentConversation?._id,
          {
            status_message: status,
            message_id: latest_message._id,
          }
        );
        return updateCon.data.data;
      }

      const res = await conversationService.getConversationById(
        latest_message.conversationId
      );

      return res.data.data;
    }

    const updateCon = await conversationService.updateConversation(
      currentConversation?._id,
      {
        status_message: true,
        message_id: currentConversation.latest_message._id,
      }
    );
    return { ...updateCon.data.data, click: true };
  }
);

export const { setCurrConversation } = ConversationSlice.actions;
