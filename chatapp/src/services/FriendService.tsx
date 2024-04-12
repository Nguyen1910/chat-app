import { BaseService } from "./BaseService";

class FriendService extends BaseService {
  getByUser = () => {
    return this.get(`/friend/byUser`);
  };

  addFriend = (friendId: string) => {
    return this.post(`/friend`, { friendId });
  };

  removeFriend = (friendId: string) => {
    return this.delete(`/friend`, { friendId });
  };

  getFriendRequestList = () => {
    return this.get(`/friend/friendRequest`);
  };

  confirmFriend = (friendId: string, confirm: boolean) => {
    return this.patch(`/friend/confirmFriend`, { friendId, confirm });
  };
}

export const friendService = new FriendService();
