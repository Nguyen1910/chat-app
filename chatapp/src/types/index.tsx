export interface UserInterface {
  _id: string;
  full_name: string;
  avatar: string;
  status?: boolean;
  email?: string;
  gender?: string;
  isDeleted?: boolean;
}

export interface Friend {
  _id: string;
  full_name: string;
  avatar: string;
}

export interface ConversationInterface {
  _id: string;
  members: Array<{ _id: string; full_name: string }>;
  type: string;
  name: string;
  avatar: string;
  latest_message: MessageInterface;
  // messages: Array<Object>;
}

export interface MessageInterface {
  _id: string;
  message: string;
  images: string[];
  creator: UserInterface;
  conversationId: string;
  createdAt: string;
  status: boolean;
  // messages: Array<Object>;
}
