import { BaseService } from "./BaseService";

class MessageService extends BaseService {
  getMessageByConversationId = (
    conversationId: string,
    queryString: string
  ) => {
    return this.get(
      `/message/byConversationId/${conversationId}?${queryString}`
    );
  };
  createMessage = (data: {
    message: string;
    conversationId: string;
    files: Array<{ type: string; url: string }>;
  }) => {
    return this.post(`/message`, data);
  };
  // getConversationWithFriend = (type: string) => {
  //   return this.get(`/conversation`, { type });
  // };
}

export const messageService = new MessageService();
