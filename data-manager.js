/**
 * 数据存储管理器
 * 统一管理所有用户数据、聊天记录、通知等数据的存储和操作
 */

class DataManager {
  constructor() {
    this.storageKeys = {
      // 用户相关
      users: 'ln_users_v1',
      auth: 'ln_auth_v1',
      currentUser: 'currentUser',
      
      // 聊天相关
      chatData: 'knowhow_chat_data',
      chatSessions: 'chat_sessions',
      chatMessages: 'chat_messages',
      userFriends: 'user_friends',
      userNotifications: 'user_notifications',
      
      // 内容相关
      forum: 'ln_forum_posts_v1',
      community: 'ln_community_feed_v1',
      qa: 'ln_qa_items_v1',
      lawUpdates: 'ln_law_updates_v1',
      lawyers: 'ln_lawyers_v1',
      films: 'ln_films_v1',
      news: 'ln_news_v1',
      
      // 律师相关
      lawyerApplications: 'lawyer_applications',
      legalCases: 'legal_cases',
      legalConsultations: 'legal_consultations',
      legalMessages: 'legal_messages',
      lawyerClients: 'lawyer_clients'
    };
  }

  /**
   * 读取存储数据
   * @param {string} key - 存储键名
   * @param {*} fallback - 默认值
   * @returns {*} 存储的数据
   */
  read(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.warn(`读取存储数据失败 (${key}):`, error);
      return fallback;
    }
  }

  /**
   * 写入存储数据
   * @param {string} key - 存储键名
   * @param {*} value - 要存储的数据
   * @returns {boolean} 是否成功
   */
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`写入存储数据失败 (${key}):`, error);
      return false;
    }
  }

  /**
   * 删除存储数据
   * @param {string} key - 存储键名
   * @returns {boolean} 是否成功
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`删除存储数据失败 (${key}):`, error);
      return false;
    }
  }

  /**
   * 清空所有数据
   * @returns {boolean} 是否成功
   */
  clearAll() {
    try {
      Object.values(this.storageKeys).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.warn('清空所有数据失败:', error);
      return false;
    }
  }

  /**
   * 导出所有数据
   * @returns {Object} 所有存储的数据
   */
  exportAll() {
    const data = {};
    Object.entries(this.storageKeys).forEach(([name, key]) => {
      data[name] = this.read(key);
    });
    return {
      ...data,
      exportTime: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  /**
   * 导入数据
   * @param {Object} data - 要导入的数据
   * @returns {boolean} 是否成功
   */
  importData(data) {
    try {
      if (!data || typeof data !== 'object') {
        throw new Error('无效的数据格式');
      }

      Object.entries(this.storageKeys).forEach(([name, key]) => {
        if (data[name] !== undefined) {
          this.write(key, data[name]);
        }
      });

      return true;
    } catch (error) {
      console.warn('导入数据失败:', error);
      return false;
    }
  }

  /**
   * 获取存储使用情况
   * @returns {Object} 存储使用统计
   */
  getStorageInfo() {
    const info = {
      totalSize: 0,
      items: [],
      availableSpace: 0
    };

    try {
      // 计算总大小
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const size = value ? value.length : 0;
        
        info.totalSize += size;
        info.items.push({
          key,
          size,
          type: this.getKeyType(key)
        });
      }

      // 估算可用空间（通常为5-10MB）
      info.availableSpace = 10 * 1024 * 1024 - info.totalSize;
      
    } catch (error) {
      console.warn('获取存储信息失败:', error);
    }

    return info;
  }

  /**
   * 获取键名类型
   * @param {string} key - 存储键名
   * @returns {string} 类型
   */
  getKeyType(key) {
    if (key.includes('user') || key.includes('auth')) return '用户数据';
    if (key.includes('chat') || key.includes('message')) return '聊天数据';
    if (key.includes('lawyer')) return '律师数据';
    if (key.includes('forum') || key.includes('news')) return '内容数据';
    return '其他数据';
  }

  /**
   * 清理过期数据
   * @param {number} days - 保留天数
   * @returns {number} 清理的数据条数
   */
  cleanExpiredData(days = 30) {
    let cleanedCount = 0;
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);

    try {
      // 清理过期的聊天消息
      const chatData = this.read(this.storageKeys.chatData);
      if (chatData && chatData.messages) {
        const originalCount = chatData.messages.length;
        chatData.messages = chatData.messages.filter(msg => 
          msg.createdAt && msg.createdAt > cutoffTime
        );
        cleanedCount += originalCount - chatData.messages.length;
        this.write(this.storageKeys.chatData, chatData);
      }

      // 清理过期的通知
      const notifications = this.read(this.storageKeys.userNotifications, []);
      const originalNotifCount = notifications.length;
      const filteredNotifications = notifications.filter(notif => 
        notif.createdAt && notif.createdAt > cutoffTime
      );
      cleanedCount += originalNotifCount - filteredNotifications.length;
      this.write(this.storageKeys.userNotifications, filteredNotifications);

    } catch (error) {
      console.warn('清理过期数据失败:', error);
    }

    return cleanedCount;
  }

  /**
   * 备份重要数据
   * @returns {Object} 备份数据
   */
  backup() {
    return {
      users: this.read(this.storageKeys.users, []),
      chatData: this.read(this.storageKeys.chatData),
      lawyers: this.read(this.storageKeys.lawyers, []),
      backupTime: new Date().toISOString()
    };
  }

  /**
   * 恢复备份数据
   * @param {Object} backup - 备份数据
   * @returns {boolean} 是否成功
   */
  restore(backup) {
    try {
      if (backup.users) this.write(this.storageKeys.users, backup.users);
      if (backup.chatData) this.write(this.storageKeys.chatData, backup.chatData);
      if (backup.lawyers) this.write(this.storageKeys.lawyers, backup.lawyers);
      return true;
    } catch (error) {
      console.warn('恢复备份数据失败:', error);
      return false;
    }
  }
}

// 创建全局数据管理器实例
window.dataManager = new DataManager();

// 兼容性函数
window.readStorage = (key, fallback) => window.dataManager.read(key, fallback);
window.writeStorage = (key, value) => window.dataManager.write(key, value);

console.log('数据管理器已初始化');
