const conversationListSelector = (state) => state.conversation.list;
const currConversationSelector = (state) => state.conversation.currConversation;

export { conversationListSelector, currConversationSelector };
