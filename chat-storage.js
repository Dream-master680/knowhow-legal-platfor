// 聊天数据持久化存储系统
class ChatStorage {
  constructor() {
    this.storageKey = 'knowhow_chat_data';
    this.friendsKey = 'knowhow_friends';
    this.sessionsKey = 'knowhow_chat_sessions';
    this.messagesKey = 'knowhow_chat_messages';
    this.notificationsKey = 'knowhow_chat_notifications';
  }

  // 初始化聊天数据
  init() {
    if (!this.getData()) {
      this.setData({
        friends: [],
        sessions: [],
        messages: [],
        notifications: [],
        lastUpdate: Date.now()
      });
    }
  }

  // 获取所有聊天数据
  getData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('获取聊天数据失败:', error);
      return null;
    }
  }

  // 保存所有聊天数据
  setData(data) {
    try {
      data.lastUpdate = Date.now();
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('保存聊天数据失败:', error);
      return false;
    }
  }

  // 获取好友列表
  getFriends() {
    const data = this.getData();
    return data ? data.friends : [];
  }

  // 保存好友列表
  setFriends(friends) {
    const data = this.getData() || {};
    data.friends = friends;
    return this.setData(data);
  }

  // 添加好友
  addFriend(friend) {
    const friends = this.getFriends();
    const existingFriend = friends.find(f => 
      f.userId === friend.userId && f.lawyerId === friend.lawyerId
    );
    
    if (!existingFriend) {
      friends.push(friend);
      this.setFriends(friends);
    }
    return friend;
  }

  // 更新好友状态
  updateFriendStatus(friendId, status) {
    const friends = this.getFriends();
    const friend = friends.find(f => f.id === friendId);
    if (friend) {
      friend.status = status;
      if (status === 'accepted') {
        friend.acceptedAt = Date.now();
      }
      this.setFriends(friends);
    }
    return friend;
  }

  // 删除好友
  removeFriend(friendId) {
    const friends = this.getFriends();
    const index = friends.findIndex(f => f.id === friendId);
    if (index > -1) {
      friends.splice(index, 1);
      this.setFriends(friends);
    }
  }

  // 获取聊天会话
  getSessions() {
    const data = this.getData();
    return data ? data.sessions : [];
  }

  // 保存聊天会话
  setSessions(sessions) {
    const data = this.getData() || {};
    data.sessions = sessions;
    return this.setData(data);
  }

  // 创建或获取聊天会话
  getOrCreateSession(userId1, userId2, userName1, userName2) {
    const sessions = this.getSessions();
    let session = sessions.find(s => 
      (s.userId1 === userId1 && s.userId2 === userId2) ||
      (s.userId1 === userId2 && s.userId2 === userId1)
    );

    if (!session) {
      session = {
        id: this.generateId(),
        userId1,
        userId2,
        userName1,
        userName2,
        createdAt: Date.now(),
        lastMessageAt: Date.now(),
        unreadCount: 0
      };
      sessions.push(session);
      this.setSessions(sessions);
    }

    return session;
  }

  // 更新会话最后消息时间
  updateSessionLastMessage(sessionId, messageTime) {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.lastMessageAt = messageTime;
      this.setSessions(sessions);
    }
  }

  // 获取消息列表
  getMessages() {
    const data = this.getData();
    return data ? data.messages : [];
  }

  // 保存消息列表
  setMessages(messages) {
    const data = this.getData() || {};
    data.messages = messages;
    return this.setData(data);
  }

  // 添加消息
  addMessage(message) {
    const messages = this.getMessages();
    messages.push(message);
    this.setMessages(messages);
    
    // 更新会话最后消息时间
    this.updateSessionLastMessage(message.sessionId, message.createdAt);
    
    return message;
  }

  // 获取会话消息
  getSessionMessages(sessionId) {
    const messages = this.getMessages();
    return messages.filter(m => m.sessionId === sessionId)
      .sort((a, b) => a.createdAt - b.createdAt);
  }

  // 获取通知列表
  getNotifications() {
    const data = this.getData();
    return data ? data.notifications : [];
  }

  // 保存通知列表
  setNotifications(notifications) {
    const data = this.getData() || {};
    data.notifications = notifications;
    return this.setData(data);
  }

  // 添加通知
  addNotification(notification) {
    const notifications = this.getNotifications();
    notifications.push(notification);
    this.setNotifications(notifications);
    return notification;
  }

  // 标记通知为已读
  markNotificationRead(notificationId) {
    const notifications = this.getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.setNotifications(notifications);
    }
  }

  // 标记所有通知为已读
  markAllNotificationsRead() {
    const notifications = this.getNotifications();
    notifications.forEach(n => n.read = true);
    this.setNotifications(notifications);
  }

  // 生成唯一ID
  generateId() {
    return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // 清空所有聊天数据
  clearAll() {
    localStorage.removeItem(this.storageKey);
  }

  // 导出聊天数据
  exportData() {
    return this.getData();
  }

  // 导入聊天数据
  importData(data) {
    if (data && typeof data === 'object') {
      return this.setData(data);
    }
    return false;
  }
}

// 创建全局聊天存储实例
window.chatStorage = new ChatStorage();

// 初始化聊天数据
window.chatStorage.init();
