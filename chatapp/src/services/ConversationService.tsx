import { BaseService } from "./BaseService";

class ConversationService extends BaseService {
  getConversation = (query: { type: string; inputSearch: string }) => {
    return this.get(`/conversation`, query);
  };
  getConversationById = (id: string) => {
    return this.get(`/conversation/${id}`);
  };
  updateConversation = (id: string, data: Object) => {
    return this.patch(`/conversation/${id}`, data);
  };
  // getConversationWithFriend = (type: string) => {
  //   return this.get(`/conversation`, { type });
  // };
}

export const conversationService = new ConversationService();
