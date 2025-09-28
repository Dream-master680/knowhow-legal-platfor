(function () {
  const $app = document.getElementById('app');

  const STORAGE_KEYS = {
    forum: 'ln_forum_posts_v1',
    community: 'ln_community_feed_v1',
    qa: 'ln_qa_items_v1',
    lawUpdates: 'ln_law_updates_v1',
    lawyers: 'ln_lawyers_v1',
    films: 'ln_films_v1',
    news: 'ln_news_v1',
    auth: 'ln_auth_v1'
  };

  const readStorage = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn('readStorage error', e);
      return fallback;
    }
  };
  const writeStorage = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn('writeStorage error', e); }
  };

  function seedIfEmpty() {
    if (!readStorage(STORAGE_KEYS.films)) {
      writeStorage(STORAGE_KEYS.films, [
        { id: nid(), title: '丰收在望——利农纪录片第一集', category: '利农', desc: '乡村振兴·农业新技术应用纪实', duration: '24:10' },
        { id: nid(), title: '普法文园·民法典走进生活', category: '普法文园', desc: '以案说法，知行合一', duration: '18:22' },
        { id: nid(), title: '守望田野——利农系列之二', category: '利农', desc: '合作社带动产业升级', duration: '21:05' },
        { id: nid(), title: '校园普法·未成年人保护', category: '普法文园', desc: '你我都是法治的守护者', duration: '16:48' }
      ]);
    }
    
    // 添加示例律师用户
    let existingUsers = readStorage('users', []);
    
    // 确保admin用户是超级管理员
    const adminUser = existingUsers.find(u => u.username === 'admin');
    if (adminUser) {
      adminUser.role = 'superadmin';
    } else {
      existingUsers.push({
        id: 'admin_superadmin',
        username: 'admin',
        password: 'admin123',
        email: 'admin@example.com',
        role: 'superadmin',
        createdAt: Date.now() - 100000
      });
    }
    
    // 确保lawyer用户存在
    const lawyerUser = existingUsers.find(u => u.username === 'lawyer');
    if (!lawyerUser) {
      existingUsers.push({
        id: 'lawyer_demo',
        username: 'lawyer',
        password: '123456',
        email: 'lawyer@example.com',
        role: 'lawyer',
        createdAt: Date.now() - 80000
      });
    }
    
    // 确保user用户存在
    const normalUser = existingUsers.find(u => u.username === 'user');
    if (!normalUser) {
      existingUsers.push({
        id: 'user_demo',
        username: 'user',
        password: '123456',
        email: 'user@example.com',
        role: 'user',
        createdAt: Date.now() - 70000
      });
    }
    
    writeStorage('users', existingUsers);
    
    // 添加示例律师数据
    if (!readStorage(STORAGE_KEYS.lawyers)) {
      writeStorage(STORAGE_KEYS.lawyers, [
        {
          id: nid(),
          name: '张律师',
          firm: '北京大成律师事务所',
          areas: ['民商事', '公司法', '合同法'],
          bio: '专业从事民商事法律事务，具有丰富的诉讼和非诉讼经验',
          phone: '138-0000-0001',
          email: 'zhang@law.com',
          verified: true,
          username: 'lawyer',
          createdAt: Date.now() - 50000
        }
      ]);
    }
    
    // 添加示例律师案件数据
    if (!readStorage('lawyer_cases')) {
      writeStorage('lawyer_cases', [
        {
          id: nid(),
          title: '合同纠纷案',
          client: '李某某',
          type: '民商事',
          status: '进行中',
          createdAt: Date.now() - 30000,
          expectedEnd: Date.now() + 30 * 24 * 60 * 60 * 1000
        },
        {
          id: nid(),
          title: '劳动争议案',
          client: '王某某',
          type: '劳动法',
          status: '已完成',
          createdAt: Date.now() - 60000,
          expectedEnd: Date.now() - 10000
        }
      ]);
    }
    
    // 添加示例客户数据
    if (!readStorage('lawyer_clients')) {
      writeStorage('lawyer_clients', [
        {
          id: nid(),
          name: '李某某',
          phone: '139-0000-0001',
          email: 'li@example.com',
          tags: ['VIP客户', '合同纠纷'],
          createdAt: Date.now() - 40000
        },
        {
          id: nid(),
          name: '王某某',
          phone: '139-0000-0002',
          email: 'wang@example.com',
          tags: ['普通客户', '劳动争议'],
          createdAt: Date.now() - 35000
        }
      ]);
    }
    
    // 添加示例预约数据
    if (!readStorage('lawyer_appointments')) {
      writeStorage('lawyer_appointments', [
        {
          id: nid(),
          title: '合同审查咨询',
          client: '李某某',
          type: '咨询',
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '14:00',
          location: '律师事务所',
          status: '已确认',
          createdAt: Date.now() - 20000
        },
        {
          id: nid(),
          title: '案件进展汇报',
          client: '王某某',
          type: '汇报',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '10:00',
          location: '线上会议',
          status: '待确认',
          createdAt: Date.now() - 15000
        }
      ]);
    }
    if (!readStorage(STORAGE_KEYS.news)) {
      writeStorage(STORAGE_KEYS.news, [
        { id: nid(), title: '全国人大审议部分法律修订草案', date: '2025-03-12', tags: ['立法', '时政'], summary: '聚焦完善相关条款，提升制度效能。' },
        { id: nid(), title: '多地推出涉企合规指引', date: '2025-02-26', tags: ['合规', '营商环境'], summary: '以公开透明促高质量发展。' },
        { id: nid(), title: '最高法发布司法解释', date: '2025-01-08', tags: ['司法解释', '法院'], summary: '统一裁判尺度，回应社会关切。' }
      ]);
    }
    if (!readStorage(STORAGE_KEYS.forum)) {
      writeStorage(STORAGE_KEYS.forum, [
        { id: nid(), title: '如何理解居住权？', content: '居住权与所有权的关系如何把握？', createdAt: Date.now() - 86400000, replies: [ { id: nid(), content: '可参考民法典权利体系章节。', createdAt: Date.now() - 86000000 } ] },
      ]);
    }
    if (!readStorage(STORAGE_KEYS.community)) {
      writeStorage(STORAGE_KEYS.community, [
        { id: nid(), text: '法治宣传周活动顺利开展！', tags: ['活动'], likes: 3, createdAt: Date.now() - 3600_000 },
      ]);
    }
    if (!readStorage(STORAGE_KEYS.qa)) {
      writeStorage(STORAGE_KEYS.qa, [
        { id: nid(), question: '劳动合同到期公司不续签怎么办？', answers: [ { id: nid(), text: '依法支付经济补偿，注意证据留存。' } ], createdAt: Date.now() - 7200_000 }
      ]);
    }
    if (!readStorage(STORAGE_KEYS.lawUpdates)) {
      writeStorage(STORAGE_KEYS.lawUpdates, [
        { id: nid(), name: '公司法（修订）', effectiveDate: '2025-07-01', summary: '注册资本与公司治理规则优化。' },
        { id: nid(), name: '行政处罚法（修订）', effectiveDate: '2025-04-01', summary: '程序规则完善，强调比例原则。' }
      ]);
    }
    if (!readStorage(STORAGE_KEYS.lawyers)) {
      writeStorage(STORAGE_KEYS.lawyers, [
        { id: nid(), name: '张三', firm: '某某律师事务所', email: 'zhangsan@example.com', phone: '13800000000', areas: ['民商事', '合规'], bio: '专注企业合规与商事争议解决。' }
      ]);
    }
    
    // 确保admin用户是唯一的超级管理员
    ensureSuperAdmin();
  }

  // 确保admin用户是唯一的超级管理员
  function ensureSuperAdmin() {
    const users = readStorage('users', []);
    
    // 查找admin用户
    let adminUser = users.find(u => u.username === 'admin');
    
    if (adminUser) {
      // 将admin用户设置为超级管理员
      adminUser.role = 'superadmin';
    } else {
      // 如果admin用户不存在，创建超级管理员
      adminUser = {
        id: 'admin_superadmin',
        username: 'admin',
        password: 'admin123',
        email: 'admin@example.com',
        role: 'superadmin',
        createdAt: Date.now()
      };
      users.push(adminUser);
    }
    
    // 确保其他用户都不是超级管理员（除了admin）
    users.forEach(user => {
      if (user.username !== 'admin' && user.role === 'superadmin') {
        user.role = 'admin'; // 降级为普通管理员
      }
    });
    
    writeStorage('users', users);
  }

  function nid() {
    return 'id_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  // --- 简单登录状态管理 ---
  function getAuth() {
    return readStorage(STORAGE_KEYS.auth, null);
  }
  function setAuth(user) {
    if (user) writeStorage(STORAGE_KEYS.auth, user); else localStorage.removeItem(STORAGE_KEYS.auth);
    updateAuthUI();
  }
  // 获取律师标签
  function getUserLawyerTag(username) {
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    const lawyer = lawyers.find(l => l.username === username);
    return lawyer ? lawyer.name : null;
  }

  function updateAuthUI() {
    const link = document.getElementById('authLink');
    const adminLink = document.getElementById('adminLink');
    if (!link) return;
    const user = getAuth();
    if (user && user.username) {
      // 获取律师标签
      const lawyerTag = getUserLawyerTag(user.username);
      
      // 显示用户信息下拉菜单
      link.innerHTML = html`
        <div class="user-dropdown">
          <div class="user-info">
            <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
            <div>
              <div class="user-name">${user.username}</div>
              <div class="user-role">${user.role === 'superadmin' ? '超级管理员' : user.role === 'admin' ? '普通管理员' : user.role === 'lawyer' ? '律师' : '用户'}</div>
              ${lawyerTag ? `<div class="lawyer-tag">${lawyerTag}</div>` : ''}
            </div>
          </div>
          <div class="user-menu">
            <a href="#/profile" class="user-menu-item">
              <span>👤</span> 个人资料
            </a>
            <a href="#/messages" class="user-menu-item">
              <span>💬</span> 私信
            </a>
            <a href="#/admin" class="user-menu-item" style="display: ${user.role === 'admin' || user.role === 'superadmin' ? 'flex' : 'none'};">
              <span>⚙️</span> 后台管理
            </a>
            <a href="#/lawyer-portal" class="user-menu-item" style="display: ${user.role === 'lawyer' ? 'flex' : 'none'};">
              <span>⚖️</span> 律师端
            </a>
            <a href="#/logout" class="user-menu-item danger">
              <span>🚪</span> 退出登录
            </a>
          </div>
        </div>
      `;
      
      // 显示/隐藏后台管理链接和律师端链接
      const lawyerPortalLink = document.getElementById('lawyerPortalLink');
      
      if (adminLink) {
        if (user.role === 'admin' || user.role === 'superadmin') {
          adminLink.style.display = 'inline-block';
        } else {
          adminLink.style.display = 'none';
        }
      }
      
      if (lawyerPortalLink) {
        if (user.role === 'lawyer') {
          lawyerPortalLink.style.display = 'inline-block';
    } else {
          lawyerPortalLink.style.display = 'none';
        }
      }
      
      // 显示私信链接
      const messagesLink = document.getElementById('messagesLink');
      if (messagesLink) {
        messagesLink.style.display = 'inline-block';
      }
    } else {
      // 显示登录按钮
      link.innerHTML = '<button class="btn primary" onclick="showAuthModal(\'login\')">登录</button>';
      if (adminLink) adminLink.style.display = 'none';
      const lawyerPortalLink = document.getElementById('lawyerPortalLink');
      if (lawyerPortalLink) lawyerPortalLink.style.display = 'none';
      const messagesLink = document.getElementById('messagesLink');
      if (messagesLink) messagesLink.style.display = 'none';
    }
  }

  // --- 登录检查 ---
  function requireAuth() {
    const user = getAuth();
    if (!user || !user.username) {
      // 显示登录模态框而不是跳转
      showAuthModal('login');
      return false;
    }
    return true;
  }

  // 检查是否需要强制登录
  function checkAuthAndRedirect() {
    const user = getAuth();
    if (!user || !user.username) {
      // 如果未登录，显示登录提示页面
      renderLoginPrompt();
      return false;
    }
    return true;
  }

  // 登录提示页面
  function renderLoginPrompt() {
    setApp(html`
      <div class="login-page-container">
        <div class="login-page-content">
          <div class="login-page-header">
            <h1>欢迎来到KnowHow</h1>
            <p>请登录以访问完整功能</p>
          </div>
          <div class="login-page-actions">
            <button class="btn primary" onclick="showAuthModal('login')">立即登录</button>
            <p>还没有账号？<a href="#" onclick="showAuthModal('register')">立即注册</a></p>
          </div>
        </div>
      </div>
    `);
  }

  const routes = {
    '/': renderHome,
    '/about': renderAbout,
    '/films': renderFilms,
    '/news': renderNews,
    '/forum': renderForum,
    '/law-updates': renderLawUpdates,
    '/lawyers': renderLawyers,
    '/interaction': renderInteraction,
    '/messages': renderMessages,
    '/lawyer-portal': renderLawyerPortal,
    '/admin': renderAdmin,
    '/profile': renderProfile,
    '/login': renderLogin,
    '/logout': renderLogout
  };

  function navigate() {
    const hash = location.hash.slice(1) || '/';
    const path = hash.split('?')[0];
    const view = routes[path] || renderNotFound;
    
    // 如果是首页且用户已登录，确保显示正确内容
    if (path === '/' && getAuth()) {
      renderHome();
    } else {
    view();
    }
    
    updateAuthUI();
  }

  window.addEventListener('hashchange', navigate);
  window.addEventListener('DOMContentLoaded', () => { seedIfEmpty(); navigate(); updateAuthUI(); });

  function html(strings, ...values) {
    return strings.reduce((acc, s, i) => acc + s + (values[i] ?? ''), '');
  }

  function setApp(content) {
    $app.innerHTML = content;
  }

  // --- 登录与退出 ---
  function renderLogin() {
    // 如果已登录，直接跳转到首页
    const user = getAuth();
    if (user && user.username) {
      location.hash = '#/';
      return;
    }
    
    // 直接跳转到首页，首页会显示登录提示
    location.hash = '#/';
  }

  function renderLogout() {
    setAuth(null);
    location.hash = '#/';
  }

  // --- 登录注册模态框功能 ---
  function showAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('authSubmit');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const emailGroup = document.getElementById('emailGroup');
    
    // 切换标签页
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[onclick="switchAuthTab('${mode}')"]`).classList.add('active');
    
    const roleGroup = document.getElementById('roleGroup');
    
    if (mode === 'login') {
      title.textContent = '登录';
      subtitle.textContent = '欢迎回到KnowHow';
      submitBtn.textContent = '登录';
      confirmPasswordGroup.style.display = 'none';
      emailGroup.style.display = 'none';
      roleGroup.style.display = 'none';
    } else {
      title.textContent = '注册';
      subtitle.textContent = '创建新账号';
      submitBtn.textContent = '注册';
      confirmPasswordGroup.style.display = 'block';
      emailGroup.style.display = 'block';
      roleGroup.style.display = 'block';
    }
    
    // 清空表单和错误信息
    document.getElementById('authForm').reset();
    clearAuthErrors();
    
    // 显示模态框
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // 聚焦到用户名输入框
    setTimeout(() => {
      document.getElementById('authUsername').focus();
    }, 100);
  }

  function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // 清空表单和错误信息
    document.getElementById('authForm').reset();
    clearAuthErrors();
  }

  function switchAuthTab(mode) {
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    const submitBtn = document.getElementById('authSubmit');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const emailGroup = document.getElementById('emailGroup');
    const roleGroup = document.getElementById('roleGroup');
    
    // 切换标签页
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[onclick="switchAuthTab('${mode}')"]`).classList.add('active');
    
    if (mode === 'login') {
      title.textContent = '登录';
      subtitle.textContent = '欢迎回到KnowHow';
      submitBtn.textContent = '登录';
      confirmPasswordGroup.style.display = 'none';
      emailGroup.style.display = 'none';
      roleGroup.style.display = 'none';
    } else {
      title.textContent = '注册';
      subtitle.textContent = '创建新账号';
      submitBtn.textContent = '注册';
      confirmPasswordGroup.style.display = 'block';
      emailGroup.style.display = 'block';
      roleGroup.style.display = 'block';
    }
    
    // 清空表单和错误信息
    document.getElementById('authForm').reset();
    clearAuthErrors();
  }

  function clearAuthErrors() {
    document.querySelectorAll('.auth-error').forEach(error => {
      error.classList.remove('show');
      error.textContent = '';
    });
    document.querySelectorAll('.auth-form input').forEach(input => {
      input.classList.remove('error');
    });
  }

  function showAuthError(field, message) {
    const errorElement = document.getElementById(field + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
    
    const inputElement = document.getElementById('auth' + field.charAt(0).toUpperCase() + field.slice(1));
    if (inputElement) {
      inputElement.classList.add('error');
    }
  }

  // 显示分享模态框
  function showShareModal(title, text, url) {
    // 创建分享模态框
    const shareModal = document.createElement('div');
    shareModal.className = 'share-modal';
    shareModal.innerHTML = `
      <div class="share-modal-content">
        <div class="share-modal-header">
          <h3>分享到</h3>
          <button class="share-close" onclick="closeShareModal()">×</button>
        </div>
        <div class="share-options">
          <div class="share-option" onclick="shareToWeChat('${title}', '${text}', '${url}')">
            <div class="share-icon wechat">💬</div>
            <div class="share-label">微信</div>
          </div>
          <div class="share-option" onclick="shareToQQ('${title}', '${text}', '${url}')">
            <div class="share-icon qq">🐧</div>
            <div class="share-label">QQ</div>
          </div>
          <div class="share-option" onclick="shareToWeibo('${title}', '${text}', '${url}')">
            <div class="share-icon weibo">📱</div>
            <div class="share-label">微博</div>
          </div>
          <div class="share-option" onclick="copyShareLink('${title}', '${text}', '${url}')">
            <div class="share-icon copy">📋</div>
            <div class="share-label">复制链接</div>
          </div>
        </div>
        <div class="share-info">
          <div class="share-title">${title}</div>
          <div class="share-text">${text}</div>
        </div>
      </div>
    `;
    
    // 添加点击背景关闭功能
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) {
        closeShareModal();
      }
    });
    
    // 添加ESC键关闭功能
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeShareModal();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
    
    // 添加到页面
    document.body.appendChild(shareModal);
    
    // 显示动画
    setTimeout(() => {
      shareModal.classList.add('show');
    }, 100);
  }

  // 关闭分享模态框
  window.closeShareModal = () => {
    const shareModal = document.querySelector('.share-modal');
    if (shareModal) {
      shareModal.classList.remove('show');
      setTimeout(() => {
        if (shareModal.parentNode) {
          shareModal.parentNode.removeChild(shareModal);
        }
      }, 300);
    }
  };

  // 分享到微信
  window.shareToWeChat = (title, text, url) => {
    const shareUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    const shareText = `${title}\n\n${text}\n\n扫码查看：${url}`;
    
    // 创建二维码分享页面
    const qrWindow = window.open('', '_blank', 'width=400,height=500');
    qrWindow.document.write(`
      <html>
        <head>
          <title>微信分享</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .qr-container { margin: 20px 0; }
            .qr-code { border: 1px solid #ddd; border-radius: 8px; }
            .share-text { margin: 20px 0; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h2>微信分享</h2>
          <div class="qr-container">
            <img src="${shareUrl}" alt="分享二维码" class="qr-code">
          </div>
          <div class="share-text">${shareText}</div>
          <p>请使用微信扫描二维码分享</p>
        </body>
      </html>
    `);
    closeShareModal();
  };

  // 分享到QQ
  window.shareToQQ = (title, text, url) => {
    const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`;
    window.open(qqUrl, '_blank', 'width=600,height=400');
    closeShareModal();
  };

  // 分享到微博
  window.shareToWeibo = (title, text, url) => {
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title + ' - ' + text)}`;
    window.open(weiboUrl, '_blank', 'width=600,height=400');
    closeShareModal();
  };

  // 复制分享链接
  window.copyShareLink = (title, text, url) => {
    const shareText = `${title}\n\n${text}\n\n查看详情：${url}`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('分享内容已复制到剪贴板');
    }).catch(() => {
      // 降级处理
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('分享内容已复制到剪贴板');
    });
    closeShareModal();
  };

  // 律师端子功能函数
  window.renderLawyerCases = () => {
    const user = getAuth();
    
    // 获取律师自建案件和接单案件
    const lawyerCases = readStorage('lawyer_cases', []);
    const takenCases = readStorage('legal_cases', []).filter(c => c.lawyerId === user.id);
    
    // 合并案件数据，添加来源标识
    const allCases = [
      ...lawyerCases.map(c => ({ ...c, source: 'self', sourceText: '自建案件' })),
      ...takenCases.map(c => ({ ...c, source: 'taken', sourceText: '接单案件' }))
    ].sort((a, b) => b.createdAt - a.createdAt);
    
    setApp(html`
      <div class="lawyer-page-container">
        <div class="lawyer-page-header">
          <button class="btn secondary" onclick="renderLawyerPortal()">← 返回工作台</button>
          <h1>案件管理</h1>
          <div style="display: flex; gap: 10px;">
            <button class="btn secondary" onclick="renderInteraction()">浏览案件</button>
            <button class="btn primary" onclick="addLawyerCase()">+ 新增案件</button>
          </div>
            </div>
        
        <!-- 统计概览 -->
        <div class="lawyer-stats" style="margin-bottom: 30px;">
          <div class="stat-card">
            <div class="stat-icon">📋</div>
            <div class="stat-info">
              <div class="stat-number">${allCases.length}</div>
              <div class="stat-label">总案件数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚖️</div>
            <div class="stat-info">
              <div class="stat-number">${takenCases.length}</div>
              <div class="stat-label">接单案件</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-info">
              <div class="stat-number">${lawyerCases.length}</div>
              <div class="stat-label">自建案件</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏳</div>
            <div class="stat-info">
              <div class="stat-number">${allCases.filter(c => c.status === '进行中' || c.status === 'taken').length}</div>
              <div class="stat-label">进行中</div>
            </div>
          </div>
        </div>
        
        <div class="lawyer-content">
          ${allCases.length === 0 ? html`
            <div class="empty-state">
              <div class="empty-icon">📋</div>
              <h3>暂无案件</h3>
              <p>开始添加您的第一个案件或浏览可接案件</p>
              <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn primary" onclick="addLawyerCase()">添加案件</button>
                <button class="btn secondary" onclick="renderInteraction()">浏览案件</button>
              </div>
            </div>
          ` : html`
            <div class="cases-grid">
              ${allCases.map(caseItem => html`
                <div class="case-card" data-source="${caseItem.source}">
                  <div class="case-header">
                    <h3>${caseItem.title}</h3>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="source-badge ${caseItem.source}">${caseItem.sourceText}</span>
                      <span class="case-status status-${caseItem.status}">${caseItem.status === 'taken' ? '已接单' : caseItem.status === 'open' ? '待接单' : caseItem.status}</span>
                    </div>
                  </div>
                  <div class="case-info">
                    <p><strong>客户：</strong>${caseItem.client || caseItem.userName}</p>
                    <p><strong>案件类型：</strong>${caseItem.type}</p>
                    <p><strong>创建时间：</strong>${new Date(caseItem.createdAt).toLocaleDateString()}</p>
                    ${caseItem.expectedEnd ? `<p><strong>预计结案：</strong>${new Date(caseItem.expectedEnd).toLocaleDateString()}</p>` : ''}
                    ${caseItem.budget ? `<p><strong>预算：</strong>¥${caseItem.budget}</p>` : ''}
                    ${caseItem.takenAt ? `<p><strong>接单时间：</strong>${new Date(caseItem.takenAt).toLocaleDateString()}</p>` : ''}
                  </div>
                  <div class="case-actions">
                    <button class="btn small" onclick="viewLawyerCaseDetail('${caseItem.id}', '${caseItem.source}')">查看详情</button>
                    ${caseItem.source === 'self' ? `
                      <button class="btn small" onclick="editLawyerCase('${caseItem.id}')">编辑</button>
                      <button class="btn small primary" onclick="updateCaseStatus('${caseItem.id}')">更新状态</button>
                      <button class="btn small danger" onclick="deleteLawyerCase('${caseItem.id}')">删除</button>
                    ` : `
                      <button class="btn small primary" onclick="updateCaseStatus('${caseItem.id}')">更新状态</button>
                    `}
                  </div>
                </div>
              `)}
            </div>
          `}
        </div>
      </div>
    `);
  };

  window.renderLawyerClients = () => {
    const user = getAuth();
    const clients = readStorage('lawyer_clients', []);
    
    setApp(html`
      <div class="lawyer-page-container">
        <div class="lawyer-page-header">
          <button class="btn secondary" onclick="renderLawyerPortal()">← 返回工作台</button>
          <h1>客户管理</h1>
          <button class="btn primary" onclick="addLawyerClient()">+ 新增客户</button>
        </div>
        
        <div class="lawyer-content">
          ${clients.length === 0 ? html`
            <div class="empty-state">
              <div class="empty-icon">👥</div>
              <h3>暂无客户</h3>
              <p>开始添加您的第一个客户</p>
              <button class="btn primary" onclick="addLawyerClient()">添加客户</button>
            </div>
          ` : html`
            <div class="clients-grid">
              ${clients.map(client => html`
                <div class="client-card">
                  <div class="client-avatar">${client.name.charAt(0)}</div>
                  <div class="client-info">
                    <h3>${client.name}</h3>
                    <p>${client.phone}</p>
                    <p>${client.email}</p>
                    <div class="client-tags">
                      ${client.tags.map(tag => html`<span class="tag">${tag}</span>`).join('')}
                    </div>
                  </div>
                  <div class="client-actions">
                    <button class="btn small" onclick="editLawyerClient('${client.id}')">编辑</button>
                    <button class="btn small danger" onclick="deleteLawyerClient('${client.id}')">删除</button>
                  </div>
                </div>
              `)}
            </div>
          `}
        </div>
      </div>
    `);
  };

  window.renderLawyerAppointments = () => {
    const user = getAuth();
    const appointments = readStorage('lawyer_appointments', []);
    
    setApp(html`
      <div class="lawyer-page-container">
        <div class="lawyer-page-header">
          <button class="btn secondary" onclick="renderLawyerPortal()">← 返回工作台</button>
          <h1>预约管理</h1>
          <button class="btn primary" onclick="addLawyerAppointment()">+ 新增预约</button>
        </div>
        
        <div class="lawyer-content">
          ${appointments.length === 0 ? html`
            <div class="empty-state">
              <div class="empty-icon">📅</div>
              <h3>暂无预约</h3>
              <p>开始添加您的第一个预约</p>
              <button class="btn primary" onclick="addLawyerAppointment()">添加预约</button>
            </div>
          ` : html`
            <div class="appointments-list">
              ${appointments.map(appointment => html`
                <div class="appointment-card">
                  <div class="appointment-time">
                    <div class="time-date">${new Date(appointment.date).toLocaleDateString()}</div>
                    <div class="time-hour">${appointment.time}</div>
                  </div>
                  <div class="appointment-info">
                    <h3>${appointment.title}</h3>
                    <p><strong>客户：</strong>${appointment.client}</p>
                    <p><strong>类型：</strong>${appointment.type}</p>
                    <p><strong>地点：</strong>${appointment.location}</p>
                  </div>
                  <div class="appointment-status">
                    <span class="status-badge status-${appointment.status}">${appointment.status}</span>
                  </div>
                  <div class="appointment-actions">
                    <button class="btn small" onclick="editLawyerAppointment('${appointment.id}')">编辑</button>
                    <button class="btn small danger" onclick="deleteLawyerAppointment('${appointment.id}')">删除</button>
                  </div>
                </div>
              `)}
            </div>
          `}
        </div>
      </div>
    `);
  };

  window.renderLawyerProfile = () => {
    const user = getAuth();
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    const lawyerProfile = lawyers.find(l => l.username === user.username) || {
      name: user.username,
      firm: '未设置',
      areas: ['民商事'],
      bio: '专业律师',
      phone: '',
      email: '',
      verified: false
    };
    
    setApp(html`
      <div class="lawyer-page-container">
        <div class="lawyer-page-header">
          <button class="btn secondary" onclick="renderLawyerPortal()">← 返回工作台</button>
          <h1>个人资料</h1>
          <button class="btn primary" onclick="editLawyerProfile()">编辑资料</button>
        </div>
        
        <div class="lawyer-content">
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">${lawyerProfile.name.charAt(0)}</div>
              <div class="profile-info">
                <h2>${lawyerProfile.name}</h2>
                <p class="profile-firm">${lawyerProfile.firm}</p>
                <span class="verification-badge ${lawyerProfile.verified ? 'verified' : 'unverified'}">
                  ${lawyerProfile.verified ? '✓ 已认证' : '○ 未认证'}
                </span>
              </div>
            </div>
            
            <div class="profile-details">
              <div class="detail-section">
                <h3>专业领域</h3>
                <div class="areas-list">
                  ${lawyerProfile.areas.map(area => html`<span class="area-tag">${area}</span>`).join('')}
                </div>
              </div>
              
              <div class="detail-section">
                <h3>个人简介</h3>
                <p class="profile-bio">${lawyerProfile.bio}</p>
              </div>
              
              <div class="detail-section">
                <h3>联系方式</h3>
                <div class="contact-info">
                  <p><strong>电话：</strong>${lawyerProfile.phone || '未设置'}</p>
                  <p><strong>邮箱：</strong>${lawyerProfile.email || '未设置'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  };

  window.renderLawyerServices = () => {
    const user = getAuth();
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    const lawyerProfile = lawyers.find(l => l.username === user.username) || {
      name: user.username,
      firm: '未设置',
      areas: ['民商事'],
      bio: '专业律师',
      phone: '',
      email: '',
      verified: false
    };
    
    setApp(html`
      <div class="lawyer-page-container">
        <div class="lawyer-page-header">
          <button class="btn secondary" onclick="renderLawyerPortal()">← 返回工作台</button>
          <h1>服务展示</h1>
          <button class="btn primary" onclick="editLawyerServices()">编辑服务</button>
        </div>
        
        <div class="lawyer-content">
          <div class="services-card">
            <h2>我的专业服务</h2>
            <div class="services-grid">
              ${lawyerProfile.areas.map(area => html`
                <div class="service-item">
                  <div class="service-icon">⚖️</div>
                  <h3>${area}</h3>
                  <p>专业${area}法律服务</p>
                </div>
              `)}
            </div>
          </div>
        </div>
      </div>
    `);
  };

  window.renderLawyerAnalytics = () => {
    if (!requireAuth()) return;
    
    const user = getAuth();
    if (user.role !== 'lawyer') {
      setApp(html`
        <div class="admin-container">
          <div class="admin-header">
            <h1>权限不足</h1>
            <p class="admin-subtitle">只有律师可以访问此页面</p>
            <div style="margin-top: 24px;">
              <a href="#/" class="btn primary">返回首页</a>
            </div>
          </div>
        </div>
      `);
      return;
    }
    
    // 获取律师相关数据
    const lawyerCases = readStorage('lawyer_cases', []);
    const legalCases = readStorage('legal_cases', []).filter(c => c.lawyerId === user.id);
    const clients = readStorage('lawyer_clients', []);
    const consultations = readStorage('legal_consultations', []).filter(c => c.lawyerId === user.id);
    const messages = readStorage('legal_messages', []).filter(m => m.fromUserId === user.id || m.toUserId === user.id);
    
    // 计算统计数据
    const totalCases = lawyerCases.length + legalCases.length;
    const completedCases = [...lawyerCases, ...legalCases].filter(c => c.status === '已完成' || c.status === 'completed').length;
    const completionRate = totalCases > 0 ? Math.round((completedCases / totalCases) * 100) : 0;
    
    // 收入统计（模拟数据，实际项目中应该从真实数据计算）
    const totalRevenue = [...lawyerCases, ...legalCases]
      .filter(c => c.status === '已完成' || c.status === 'completed')
      .reduce((sum, c) => sum + (parseInt(c.budget) || 0), 0);
    
    // 本月收入
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = [...lawyerCases, ...legalCases]
      .filter(c => {
        const caseDate = new Date(c.completedAt || c.createdAt);
        return caseDate.getMonth() === currentMonth && caseDate.getFullYear() === currentYear;
      })
      .reduce((sum, c) => sum + (parseInt(c.budget) || 0), 0);
    
    // 专业领域分析
    const lawyerProfile = readStorage(STORAGE_KEYS.lawyers, []).find(l => l.username === user.username);
    const areas = lawyerProfile?.areas || ['民商事'];
    
    // 案件类型分布
    const caseTypeStats = [...lawyerCases, ...legalCases].reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1;
      return acc;
    }, {});
    
    // 最近6个月收入趋势
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.getMonth();
      const year = date.getFullYear();
      
      const monthRevenue = [...lawyerCases, ...legalCases]
        .filter(c => {
          const caseDate = new Date(c.completedAt || c.createdAt);
          return caseDate.getMonth() === month && caseDate.getFullYear() === year;
        })
        .reduce((sum, c) => sum + (parseInt(c.budget) || 0), 0);
      
      monthlyTrend.push({
        month: date.toLocaleDateString('zh-CN', { month: 'short' }),
        revenue: monthRevenue
      });
    }
    
    // 客户满意度（模拟数据）
    const satisfactionRate = Math.floor(Math.random() * 20) + 80; // 80-100%
    
    // 平均案件处理时间（天）
    const avgProcessingTime = completedCases > 0 ? 
      Math.round([...lawyerCases, ...legalCases]
        .filter(c => c.status === '已完成' || c.status === 'completed')
        .reduce((sum, c) => {
          const start = new Date(c.createdAt);
          const end = new Date(c.completedAt || Date.now());
          return sum + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        }, 0) / completedCases) : 0;
    
    setApp(html`
      <div class="lawyer-portal-container">
        <div class="lawyer-portal-header">
          <button class="btn secondary" onclick="renderLawyerPortal()">← 返回工作台</button>
          <h1>数据分析中心</h1>
          <p class="lawyer-subtitle">专业数据洞察，助力业务发展</p>
        </div>
        
        <div class="lawyer-content">
          <!-- 核心指标概览 -->
          <div class="analytics-section">
            <h2>📊 核心指标概览</h2>
            <div class="analytics-grid">
              <div class="analytics-card primary">
                <div class="analytics-icon">💰</div>
                <div class="analytics-content">
                  <div class="analytics-value">¥${monthlyRevenue.toLocaleString()}</div>
                  <div class="analytics-label">本月收入</div>
                  <div class="analytics-trend">总收入: ¥${totalRevenue.toLocaleString()}</div>
                </div>
              </div>
              <div class="analytics-card success">
                <div class="analytics-icon">📋</div>
                <div class="analytics-content">
                  <div class="analytics-value">${totalCases}</div>
                  <div class="analytics-label">总案件数</div>
                  <div class="analytics-trend">已完成: ${completedCases}</div>
                </div>
              </div>
              <div class="analytics-card info">
                <div class="analytics-icon">👥</div>
                <div class="analytics-content">
                  <div class="analytics-value">${clients.length}</div>
                  <div class="analytics-label">客户数量</div>
                  <div class="analytics-trend">咨询: ${consultations.length}</div>
                </div>
              </div>
              <div class="analytics-card warning">
                <div class="analytics-icon">📈</div>
                <div class="analytics-content">
                  <div class="analytics-value">${completionRate}%</div>
                  <div class="analytics-label">完成率</div>
                  <div class="analytics-trend">满意度: ${satisfactionRate}%</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 收入趋势分析 -->
          <div class="analytics-section">
            <h2>📈 收入趋势分析</h2>
            <div class="chart-container">
              <div class="chart-header">
                <h3>最近6个月收入趋势</h3>
                <div class="chart-legend">
                  <span class="legend-item">
                    <span class="legend-color" style="background: #667eea;"></span>
                    月收入
                  </span>
                </div>
              </div>
              <div class="chart-content">
                <div class="chart-bars">
                  ${monthlyTrend.map(item => html`
                    <div class="chart-bar">
                      <div class="bar-container">
                        <div class="bar" style="height: ${Math.max(10, (item.revenue / Math.max(...monthlyTrend.map(t => t.revenue)) * 100))}%"></div>
                        <div class="bar-value">¥${item.revenue.toLocaleString()}</div>
                      </div>
                      <div class="bar-label">${item.month}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
          
          <!-- 案件类型分布 -->
          <div class="analytics-section">
            <h2>⚖️ 案件类型分布</h2>
            <div class="case-type-grid">
              ${Object.entries(caseTypeStats).map(([type, count]) => {
                const percentage = Math.round((count / totalCases) * 100);
                return html`
                  <div class="case-type-card">
                    <div class="case-type-header">
                      <h4>${type}</h4>
                      <span class="case-count">${count} 件</span>
                    </div>
                    <div class="case-type-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                      </div>
                      <span class="progress-text">${percentage}%</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          
          <!-- 工作效率分析 -->
          <div class="analytics-section">
            <h2>⏱️ 工作效率分析</h2>
            <div class="efficiency-grid">
              <div class="efficiency-card">
                <div class="efficiency-icon">⏰</div>
                <div class="efficiency-content">
                  <h4>平均处理时间</h4>
                  <div class="efficiency-value">${avgProcessingTime} 天</div>
                  <p>案件从接单到完成</p>
                </div>
              </div>
              <div class="efficiency-card">
                <div class="efficiency-icon">💬</div>
                <div class="efficiency-content">
                  <h4>咨询回复率</h4>
                  <div class="efficiency-value">${consultations.length > 0 ? Math.round((consultations.filter(c => c.status === 'replied').length / consultations.length) * 100) : 0}%</div>
                  <p>及时回复客户咨询</p>
                </div>
              </div>
              <div class="efficiency-card">
                <div class="efficiency-icon">📱</div>
                <div class="efficiency-content">
                  <h4>消息活跃度</h4>
                  <div class="efficiency-value">${messages.length}</div>
                  <p>与客户沟通次数</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 专业领域分析 -->
          <div class="analytics-section">
            <h2>🎯 专业领域分析</h2>
            <div class="expertise-container">
              <div class="expertise-areas">
                <h3>您的专业领域</h3>
                <div class="areas-list">
                  ${areas.map(area => html`
                    <span class="area-tag">${area}</span>
                  `).join('')}
                </div>
              </div>
              <div class="expertise-stats">
                <h3>领域匹配度</h3>
                <div class="match-stats">
                  ${areas.map(area => {
                    const areaCases = [...lawyerCases, ...legalCases].filter(c => c.type === area).length;
                    const matchRate = totalCases > 0 ? Math.round((areaCases / totalCases) * 100) : 0;
                    return html`
                      <div class="match-item">
                        <span class="match-area">${area}</span>
                        <div class="match-bar">
                          <div class="match-fill" style="width: ${matchRate}%"></div>
                        </div>
                        <span class="match-rate">${matchRate}%</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>
          
          <!-- 客户分析 -->
          <div class="analytics-section">
            <h2>👥 客户分析</h2>
            <div class="client-analysis">
              <div class="client-stats">
                <div class="client-stat">
                  <h4>客户满意度</h4>
                  <div class="satisfaction-meter">
                    <div class="meter-fill" style="width: ${satisfactionRate}%"></div>
                    <span class="meter-text">${satisfactionRate}%</span>
                  </div>
                </div>
                <div class="client-stat">
                  <h4>客户复购率</h4>
                  <div class="repeat-rate">${Math.floor(Math.random() * 30) + 20}%</div>
                  <p>客户再次选择您的服务</p>
                </div>
                <div class="client-stat">
                  <h4>推荐率</h4>
                  <div class="referral-rate">${Math.floor(Math.random() * 25) + 15}%</div>
                  <p>客户推荐给他人</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 未来规划建议 -->
          <div class="analytics-section">
            <h2>🚀 发展建议</h2>
            <div class="recommendations">
              ${(() => {
                const recommendations = [];
                if (completionRate < 80) {
                  recommendations.push({
                    type: 'warning',
                    title: '提高案件完成率',
                    content: '当前完成率为' + completionRate + '%，建议优化工作流程，提高案件处理效率。'
                  });
                }
                if (monthlyRevenue < 10000) {
                  recommendations.push({
                    type: 'info',
                    title: '增加收入来源',
                    content: '考虑拓展更多专业领域，或提高案件单价来增加收入。'
                  });
                }
                if (satisfactionRate < 90) {
                  recommendations.push({
                    type: 'success',
                    title: '提升客户满意度',
                    content: '当前满意度为' + satisfactionRate + '%，建议加强与客户的沟通，提供更优质的服务。'
                  });
                }
                if (recommendations.length === 0) {
                  recommendations.push({
                    type: 'success',
                    title: '表现优秀',
                    content: '您的各项指标都表现良好，继续保持！'
                  });
                }
                return recommendations.map(rec => html`
                  <div class="recommendation-card ${rec.type}">
                    <div class="recommendation-icon">
                      ${rec.type === 'warning' ? '⚠️' : rec.type === 'info' ? '💡' : '✅'}
                    </div>
                    <div class="recommendation-content">
                      <h4>${rec.title}</h4>
                      <p>${rec.content}</p>
                    </div>
                  </div>
                `).join('');
              })()}
            </div>
          </div>
        </div>
      </div>
    `);
  };

  // 律师端CRUD操作函数
  window.addLawyerCase = () => {
    const title = prompt('案件标题:');
    if (title) {
      const client = prompt('客户姓名:');
      const type = prompt('案件类型 (民商事/刑事/行政/劳动法/公司法):', '民商事');
      const status = prompt('案件状态 (进行中/已完成/暂停):', '进行中');
      const expectedEnd = prompt('预计结案日期 (YYYY-MM-DD):', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      
      const cases = readStorage('lawyer_cases', []);
      const newCase = {
        id: nid(),
        title,
        client: client || '',
        type: type || '民商事',
        status: status || '进行中',
        createdAt: Date.now(),
        expectedEnd: new Date(expectedEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).getTime()
      };
      cases.push(newCase);
      writeStorage('lawyer_cases', cases);
      alert('案件添加成功！');
      renderLawyerCases();
    }
  };

  window.editLawyerCase = (caseId) => {
    const cases = readStorage('lawyer_cases', []);
    const caseItem = cases.find(c => c.id === caseId);
    if (!caseItem) return;
    
    const newTitle = prompt('案件标题:', caseItem.title);
    if (newTitle) {
      caseItem.title = newTitle;
      writeStorage('lawyer_cases', cases);
      renderLawyerCases();
    }
  };

  window.deleteLawyerCase = (caseId) => {
    if (confirm('确定删除此案件？')) {
      const cases = readStorage('lawyer_cases', []);
      const filteredCases = cases.filter(c => c.id !== caseId);
      writeStorage('lawyer_cases', filteredCases);
      renderLawyerCases();
    }
  };

  // 查看案件详情
  window.viewLawyerCaseDetail = (caseId, source) => {
    let caseItem;
    
    if (source === 'self') {
      const cases = readStorage('lawyer_cases', []);
      caseItem = cases.find(c => c.id === caseId);
    } else {
      const cases = readStorage('legal_cases', []);
      caseItem = cases.find(c => c.id === caseId);
    }
    
    if (!caseItem) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = html`
      <div class="modal-content">
        <div class="modal-header">
          <h3>案件详情</h3>
          <button class="modal-close" onclick="closeModal(this)">×</button>
        </div>
        <div class="case-detail">
          <h4>${caseItem.title}</h4>
          <div class="detail-section">
            <h5>基本信息</h5>
            <p><strong>案件类型：</strong>${caseItem.type}</p>
            <p><strong>客户：</strong>${caseItem.client || caseItem.userName}</p>
            <p><strong>状态：</strong>${caseItem.status === 'taken' ? '已接单' : caseItem.status === 'open' ? '待接单' : caseItem.status}</p>
            <p><strong>创建时间：</strong>${new Date(caseItem.createdAt).toLocaleString()}</p>
            ${caseItem.takenAt ? `<p><strong>接单时间：</strong>${new Date(caseItem.takenAt).toLocaleString()}</p>` : ''}
            ${caseItem.expectedEnd ? `<p><strong>预计结案：</strong>${new Date(caseItem.expectedEnd).toLocaleDateString()}</p>` : ''}
            ${caseItem.budget ? `<p><strong>预算：</strong>¥${caseItem.budget}</p>` : ''}
            ${caseItem.deadline ? `<p><strong>期望完成时间：</strong>${new Date(caseItem.deadline).toLocaleDateString()}</p>` : ''}
          </div>
          <div class="detail-section">
            <h5>案件描述</h5>
            <p>${caseItem.description}</p>
          </div>
          ${source === 'taken' ? `
            <div class="detail-section">
              <h5>接单信息</h5>
              <p><strong>接单律师：</strong>${caseItem.lawyerName}</p>
              <p><strong>接单时间：</strong>${new Date(caseItem.takenAt).toLocaleString()}</p>
            </div>
          ` : ''}
          
          ${caseItem.statusHistory && caseItem.statusHistory.length > 0 ? `
            <div class="detail-section status-history">
              <h5>状态历史</h5>
              ${caseItem.statusHistory.map(history => html`
                <div class="status-history-item">
                  <span class="status-badge ${history.toStatus}">${history.toStatus}</span>
                  <div class="status-history-content">
                    <div class="history-note">${history.note || '无说明'}</div>
                    <div class="history-meta">
                      ${history.fromStatus} → ${history.toStatus} | 
                      更新人：${history.updatedBy} | 
                      ${new Date(history.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
        <div class="modal-actions">
          <button class="btn secondary" onclick="closeModal(this)">关闭</button>
          <button class="btn primary" onclick="updateCaseStatus('${caseId}')">更新状态</button>
          <button class="btn secondary" onclick="closeModal(this); renderLawyerPortal()">返回列表</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  };

  // 更新案件状态
  window.updateCaseStatus = (caseId) => {
    // 先查找接单案件
    let cases = readStorage('legal_cases', []);
    let caseItem = cases.find(c => c.id === caseId);
    let isLegalCase = true;
    
    // 如果没找到，查找自建案件
    if (!caseItem) {
      cases = readStorage('lawyer_cases', []);
      caseItem = cases.find(c => c.id === caseId);
      isLegalCase = false;
    }
    
    if (!caseItem) return;
    
    // 创建状态更新模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = html`
      <div class="modal-content">
        <div class="modal-header">
          <h3>更新案件状态</h3>
          <button class="modal-close" onclick="closeModal(this)">×</button>
        </div>
        <form id="updateStatusForm" class="modal-form">
          <div class="form-group">
            <label for="caseTitle">案件标题</label>
            <input type="text" id="caseTitle" value="${caseItem.title}" readonly>
          </div>
          
          <div class="form-group">
            <label for="currentStatus">当前状态</label>
            <input type="text" id="currentStatus" value="${caseItem.status}" readonly>
          </div>
          
          <div class="form-group">
            <label for="newStatus">新状态 *</label>
            <select id="newStatus" name="status" required>
              <option value="">请选择新状态</option>
              ${isLegalCase ? html`
                <option value="进行中" ${caseItem.status === '进行中' ? 'selected' : ''}>进行中</option>
                <option value="已完成" ${caseItem.status === '已完成' ? 'selected' : ''}>已完成</option>
                <option value="暂停" ${caseItem.status === '暂停' ? 'selected' : ''}>暂停</option>
              ` : html`
                <option value="进行中" ${caseItem.status === '进行中' ? 'selected' : ''}>进行中</option>
                <option value="已完成" ${caseItem.status === '已完成' ? 'selected' : ''}>已完成</option>
                <option value="暂停" ${caseItem.status === '暂停' ? 'selected' : ''}>暂停</option>
                <option value="已归档" ${caseItem.status === '已归档' ? 'selected' : ''}>已归档</option>
              `}
            </select>
          </div>
          
          <div class="form-group">
            <label for="statusNote">状态说明</label>
            <textarea id="statusNote" name="note" rows="3" placeholder="请输入状态更新说明（可选）"></textarea>
          </div>
          
          ${isLegalCase ? html`
            <div class="form-group">
              <label>
                <input type="checkbox" id="notifyClient" name="notifyClient" checked>
                通知客户状态变更
              </label>
            </div>
          ` : ''}
          
          <div class="form-actions">
            <button type="submit" class="btn primary">更新状态</button>
            <button type="button" class="btn secondary" onclick="closeModal(this)">取消</button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加表单提交事件
    document.getElementById('updateStatusForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newStatus = formData.get('status');
      const note = formData.get('note');
      const notifyClient = formData.get('notifyClient') === 'on';
      
      if (!newStatus) {
        alert('请选择新状态');
        return;
      }
      
      if (newStatus === caseItem.status) {
        alert('新状态与当前状态相同');
        return;
      }
      
      // 记录旧状态
      const oldStatus = caseItem.status;
      
      // 更新案件状态
      caseItem.status = newStatus;
      if (newStatus === '已完成') {
        caseItem.completedAt = Date.now();
      }
      
      // 添加状态更新记录
      if (!caseItem.statusHistory) {
        caseItem.statusHistory = [];
      }
      caseItem.statusHistory.push({
        fromStatus: oldStatus,
        toStatus: newStatus,
        note: note || '',
        updatedAt: Date.now(),
        updatedBy: getAuth().username
      });
      
      // 更新对应的存储
      if (isLegalCase) {
        writeStorage('legal_cases', cases);
      } else {
        writeStorage('lawyer_cases', cases);
      }
      
      // 发送消息通知客户（仅对接单案件且选择通知）
      if (isLegalCase && caseItem.userId && notifyClient) {
        const message = {
          id: nid(),
          fromUserId: getAuth().id,
          fromUserName: getAuth().username,
          toUserId: caseItem.userId,
          toUserName: caseItem.userName,
          title: '案件状态更新通知',
          content: `您的案件"${caseItem.title}"状态已更新为"${newStatus}"${note ? '，说明：' + note : ''}，请及时查看。`,
          createdAt: Date.now(),
          read: false
        };
        
        const messages = readStorage('legal_messages', []);
        messages.push(message);
        writeStorage('legal_messages', messages);
      }
      
      // 发送通知
      const notification = {
        id: nid(),
        userId: isLegalCase ? caseItem.userId : getAuth().id,
        type: 'case_update',
        title: '案件状态更新',
        content: `案件"${caseItem.title}"状态已更新为"${newStatus}"`,
        createdAt: Date.now(),
        read: false
      };
      
      const notifications = readStorage('user_notifications', []);
      notifications.push(notification);
      writeStorage('user_notifications', notifications);
      
      alert(`案件状态更新成功！${isLegalCase && notifyClient ? '已通知客户。' : ''}`);
      closeModal(modal.querySelector('.modal-close'));
      renderLawyerCases();
    });
  };

  window.addLawyerClient = () => {
    const name = prompt('客户姓名:');
    if (name) {
      const phone = prompt('联系电话:');
      const email = prompt('邮箱地址:');
      const tags = prompt('标签（用逗号分隔）:').split(',').map(t => t.trim()).filter(t => t);
      
      const clients = readStorage('lawyer_clients', []);
      const newClient = {
        id: nid(),
        name,
        phone: phone || '',
        email: email || '',
        tags: tags || [],
        createdAt: Date.now()
      };
      clients.push(newClient);
      writeStorage('lawyer_clients', clients);
      alert('客户添加成功！');
      renderLawyerClients();
    }
  };

  window.editLawyerClient = (clientId) => {
    const clients = readStorage('lawyer_clients', []);
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const newName = prompt('客户姓名:', client.name);
    if (newName) {
      client.name = newName;
      writeStorage('lawyer_clients', clients);
      renderLawyerClients();
    }
  };

  window.deleteLawyerClient = (clientId) => {
    if (confirm('确定删除此客户？')) {
      const clients = readStorage('lawyer_clients', []);
      const filteredClients = clients.filter(c => c.id !== clientId);
      writeStorage('lawyer_clients', filteredClients);
      renderLawyerClients();
    }
  };

  window.addLawyerAppointment = () => {
    const title = prompt('预约标题:');
    if (title) {
      const client = prompt('客户姓名:');
      const type = prompt('预约类型:');
      const date = prompt('预约日期 (YYYY-MM-DD):');
      const time = prompt('预约时间 (HH:MM):');
      const location = prompt('预约地点:');
      
      const appointments = readStorage('lawyer_appointments', []);
      const newAppointment = {
        id: nid(),
        title,
        client: client || '',
        type: type || '咨询',
        date: date || new Date().toISOString().split('T')[0],
        time: time || '09:00',
        location: location || '律师事务所',
        status: '待确认',
        createdAt: Date.now()
      };
      appointments.push(newAppointment);
      writeStorage('lawyer_appointments', appointments);
      alert('预约添加成功！');
      renderLawyerAppointments();
    }
  };

  window.editLawyerAppointment = (appointmentId) => {
    const appointments = readStorage('lawyer_appointments', []);
    const appointment = appointments.find(a => a.id === appointmentId);
    if (!appointment) return;
    
    const newTitle = prompt('预约标题:', appointment.title);
    if (newTitle) {
      appointment.title = newTitle;
      writeStorage('lawyer_appointments', appointments);
      renderLawyerAppointments();
    }
  };

  window.deleteLawyerAppointment = (appointmentId) => {
    if (confirm('确定删除此预约？')) {
      const appointments = readStorage('lawyer_appointments', []);
      const filteredAppointments = appointments.filter(a => a.id !== appointmentId);
      writeStorage('lawyer_appointments', filteredAppointments);
      renderLawyerAppointments();
    }
  };

  window.editLawyerProfile = () => {
    const user = getAuth();
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    let lawyerProfile = lawyers.find(l => l.username === user.username);
    
    if (!lawyerProfile) {
      lawyerProfile = {
        name: user.username,
        firm: '未设置',
        areas: ['民商事'],
        bio: '专业律师',
        phone: '',
        email: '',
        verified: false,
        username: user.username
      };
    }
    
    const newName = prompt('律师姓名:', lawyerProfile.name);
    if (newName) {
      const newFirm = prompt('律师事务所:', lawyerProfile.firm);
      const newBio = prompt('个人简介:', lawyerProfile.bio);
      const newPhone = prompt('联系电话:', lawyerProfile.phone);
      const newEmail = prompt('邮箱地址:', lawyerProfile.email);
      
      lawyerProfile.name = newName;
      lawyerProfile.firm = newFirm || lawyerProfile.firm;
      lawyerProfile.bio = newBio || lawyerProfile.bio;
      lawyerProfile.phone = newPhone || lawyerProfile.phone;
      lawyerProfile.email = newEmail || lawyerProfile.email;
      
      const existingIndex = lawyers.findIndex(l => l.username === user.username);
      if (existingIndex >= 0) {
        lawyers[existingIndex] = lawyerProfile;
      } else {
        lawyers.push(lawyerProfile);
      }
      
      writeStorage(STORAGE_KEYS.lawyers, lawyers);
      alert('资料更新成功！');
      renderLawyerProfile();
    }
  };

  window.editLawyerServices = () => {
    const user = getAuth();
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    let lawyerProfile = lawyers.find(l => l.username === user.username);
    
    if (!lawyerProfile) {
      lawyerProfile = {
        name: user.username,
        firm: '未设置',
        areas: ['民商事'],
        bio: '专业律师',
        phone: '',
        email: '',
        verified: false,
        username: user.username
      };
    }
    
    const areasInput = prompt('专业领域（用逗号分隔）:', lawyerProfile.areas.join(', '));
    if (areasInput) {
      const newAreas = areasInput.split(',').map(area => area.trim()).filter(area => area);
      lawyerProfile.areas = newAreas;
      
      const existingIndex = lawyers.findIndex(l => l.username === user.username);
      if (existingIndex >= 0) {
        lawyers[existingIndex] = lawyerProfile;
      } else {
        lawyers.push(lawyerProfile);
      }
      
      writeStorage(STORAGE_KEYS.lawyers, lawyers);
      alert('服务信息更新成功！');
      renderLawyerServices();
    }
  };

  // 显示登录成功提示
  function showLoginSuccess(user, isRegister = false) {
    const roleText = user.role === 'superadmin' ? '超级管理员' : user.role === 'admin' ? '普通管理员' : '用户';
    const title = isRegister ? '注册成功！' : '登录成功！';
    const subtitle = isRegister ? `欢迎加入，${user.username}（${roleText}）` : `欢迎回来，${user.username}（${roleText}）`;
    
    // 创建成功提示元素
    const successToast = document.createElement('div');
    successToast.className = 'login-success-toast';
    successToast.innerHTML = `
      <div class="success-content">
        <div class="success-icon">${isRegister ? '🎉' : '✅'}</div>
        <div class="success-text">
          <div class="success-title">${title}</div>
          <div class="success-subtitle">${subtitle}</div>
        </div>
      </div>
    `;
    
    // 添加到页面
    document.body.appendChild(successToast);
    
    // 显示动画
    setTimeout(() => {
      successToast.classList.add('show');
    }, 100);
    
    // 3秒后自动隐藏
    setTimeout(() => {
      successToast.classList.remove('show');
      setTimeout(() => {
        if (successToast.parentNode) {
          successToast.parentNode.removeChild(successToast);
        }
      }, 300);
    }, 3000);
  }

  function validateAuthForm(mode) {
    const username = document.getElementById('authUsername').value.trim();
    const password = document.getElementById('authPassword').value;
    const confirmPassword = document.getElementById('authConfirmPassword').value;
    const email = document.getElementById('authEmail').value.trim();
    
    clearAuthErrors();
    let isValid = true;
    
    // 用户名验证
    if (!username) {
      showAuthError('username', '请输入用户名');
      isValid = false;
    } else if (username.length < 3) {
      showAuthError('username', '用户名至少3个字符');
      isValid = false;
    }
    
    // 密码验证
    if (!password) {
      showAuthError('password', '请输入密码');
      isValid = false;
    } else if (password.length < 6) {
      showAuthError('password', '密码至少6个字符');
      isValid = false;
    }
    
    // 注册时的额外验证
    if (mode === 'register') {
      // 确认密码验证
      if (!confirmPassword) {
        showAuthError('confirmPassword', '请确认密码');
        isValid = false;
      } else if (password !== confirmPassword) {
        showAuthError('confirmPassword', '两次输入的密码不一致');
        isValid = false;
      }
      
      // 邮箱验证（可选）
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAuthError('email', '请输入有效的邮箱地址');
        isValid = false;
      }
    }
    
    return isValid;
  }

  function handleAuthSubmit(mode) {
    if (!validateAuthForm(mode)) return;
    
    const username = document.getElementById('authUsername').value.trim();
    const password = document.getElementById('authPassword').value;
    const email = document.getElementById('authEmail').value.trim();
    
    if (mode === 'login') {
      // 登录逻辑
      let user = null;
      
      // 管理员账号
      if (username === 'admin' && password === 'admin123') {
        user = { id: 'admin_demo', username: 'admin', role: 'superadmin', loginAt: Date.now() };
      }
      // 律师账号
      else if (username === 'lawyer' && password === '123456') {
        user = { id: 'lawyer_demo', username: 'lawyer', role: 'lawyer', loginAt: Date.now() };
      }
      // 普通用户账号
      else if (username === 'user' && password === '123456') {
        user = { id: 'user_demo', username: 'user', role: 'user', loginAt: Date.now() };
      }
      // 兼容旧的管理员账号
      else if (username === 'admin' && password === '123456') {
        user = { id: 'admin_demo', username: 'admin', role: 'superadmin', loginAt: Date.now() };
      }
      // 检查注册用户
      else {
        const users = readStorage('users', []);
        const foundUser = users.find(u => u.username === username && u.password === password);
        if (foundUser) {
          user = { ...foundUser, loginAt: Date.now() };
        }
      }
      
      if (user) {
        setAuth(user);
        closeAuthModal();
        
        // 显示登录成功提示
        showLoginSuccess(user);
        
        // 延迟跳转到首页，确保提示显示
        setTimeout(() => {
          location.hash = '#/';
          // 强制刷新页面内容
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        }, 100);
      } else {
        showAuthError('auth', '用户名或密码错误');
      }
    } else {
      // 注册逻辑
      const users = readStorage('users', []);
      
      // 检查用户名是否已存在
      if (users.find(u => u.username === username)) {
        showAuthError('username', '用户名已存在');
        return;
      }
      
      const role = document.getElementById('authRole').value;
      
      // 创建新用户
      const newUser = {
        id: nid(),
        username,
        password,
        email: email || '',
        role: role === 'lawyer' ? 'lawyer_pending' : 'user',
        createdAt: Date.now(),
        status: role === 'lawyer' ? 'pending' : 'active'
      };
      
      users.push(newUser);
      writeStorage('users', users);
      
      // 如果是律师注册，需要管理员审核
      if (role === 'lawyer') {
        // 添加律师审核申请
        const lawyerApplications = readStorage('lawyer_applications', []);
        lawyerApplications.push({
          id: nid(),
          userId: newUser.id,
          username: newUser.username,
          email: newUser.email,
          status: 'pending',
          appliedAt: Date.now(),
          reviewedAt: null,
          reviewedBy: null
        });
        writeStorage('lawyer_applications', lawyerApplications);
        
        closeAuthModal();
        alert('律师注册申请已提交，等待管理员审核。审核通过后您将收到通知。');
        return;
      }
      
      // 普通用户自动登录
      const loginUser = { username, role: 'user', loginAt: Date.now() };
      setAuth(loginUser);
      closeAuthModal();
      
      // 显示注册成功提示
      showLoginSuccess(loginUser, true);
      
      // 延迟跳转到首页，确保提示显示
      setTimeout(() => {
    location.hash = '#/';
        // 强制刷新页面内容
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }, 100);
    }
  }

  // 搜索和筛选功能
  window.searchAdminUsers = () => {
    const searchTerm = document.getElementById('userSearchInput').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;
    const userItems = document.querySelectorAll('.user-item');
    
    userItems.forEach(item => {
      const username = item.querySelector('.item-title').textContent.toLowerCase();
      const email = item.querySelector('.item-desc').textContent.toLowerCase();
      const role = item.getAttribute('data-role');
      
      const matchesSearch = !searchTerm || username.includes(searchTerm) || email.includes(searchTerm);
      const matchesRole = !roleFilter || role === roleFilter;
      
      if (matchesSearch && matchesRole) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  };

  window.filterAdminUsers = () => {
    searchAdminUsers();
  };

  // 用户管理函数
  window.addAdminUser = () => {
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdminUsers()">← 返回用户管理</button>
          <h2>新增用户</h2>
        </div>
        <div class="admin-content">
          <form id="addUserForm" class="admin-form">
            <div class="form-group">
              <label for="username">用户名 *</label>
              <input type="text" id="username" name="username" required placeholder="请输入用户名">
            </div>
            <div class="form-group">
              <label for="password">密码 *</label>
              <input type="password" id="password" name="password" required placeholder="请输入密码">
            </div>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" id="email" name="email" placeholder="请输入邮箱（可选）">
            </div>
            <div class="form-group">
              <label for="role">角色</label>
              <select id="role" name="role" style="width: 100%; padding: 12px 16px; border: 2px solid var(--border); border-radius: 8px; background: rgba(10, 18, 33, 0.8); color: var(--text);">
                <option value="user">普通用户</option>
                <option value="admin">普通管理员</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn secondary" onclick="renderAdminUsers()">取消</button>
              <button type="submit" class="btn primary">创建用户</button>
            </div>
          </form>
        </div>
      </div>
    `);
    
    // 添加表单提交事件
    document.getElementById('addUserForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const username = formData.get('username').trim();
      const password = formData.get('password');
      const email = formData.get('email').trim();
      const role = formData.get('role');
      
      if (!username || !password) {
        alert('用户名和密码不能为空');
        return;
      }
      
      const users = readStorage('users', []);
      
      // 检查用户名是否已存在
      if (users.find(u => u.username === username)) {
        alert('用户名已存在');
        return;
      }
      
      // 创建新用户
      const newUser = {
        id: nid(),
        username,
        password,
        email,
        role: role || 'user',
        createdAt: Date.now()
      };
      
      users.push(newUser);
      writeStorage('users', users);
      
      alert('用户创建成功');
      renderAdminUsers();
    });
  };

  window.editAdminUser = (id) => {
    const users = readStorage('users', []);
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdminUsers()">← 返回用户管理</button>
          <h2>编辑用户</h2>
        </div>
        <div class="admin-content">
          <form id="editUserForm" class="admin-form">
            <div class="form-group">
              <label for="editUsername">用户名 *</label>
              <input type="text" id="editUsername" name="username" required value="${user.username}">
            </div>
            <div class="form-group">
              <label for="editPassword">密码 *</label>
              <input type="password" id="editPassword" name="password" required value="${user.password}">
            </div>
            <div class="form-group">
              <label for="editEmail">邮箱</label>
              <input type="email" id="editEmail" name="email" value="${user.email || ''}">
            </div>
            <div class="form-group">
              <label for="editRole">角色</label>
              <select id="editRole" name="role" style="width: 100%; padding: 12px 16px; border: 2px solid var(--border); border-radius: 8px; background: rgba(10, 18, 33, 0.8); color: var(--text);">
                <option value="user" ${user.role === 'user' ? 'selected' : ''}>普通用户</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>普通管理员</option>
                ${user.role === 'superadmin' ? '<option value="superadmin" selected>超级管理员（仅admin用户）</option>' : ''}
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn secondary" onclick="renderAdminUsers()">取消</button>
              <button type="submit" class="btn primary">更新用户</button>
            </div>
          </form>
        </div>
      </div>
    `);
    
    // 添加表单提交事件
    document.getElementById('editUserForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const username = formData.get('username').trim();
      const password = formData.get('password');
      const email = formData.get('email').trim();
      const role = formData.get('role');
      
      if (!username || !password) {
        alert('用户名和密码不能为空');
        return;
      }
      
      // 检查用户名是否已被其他用户使用
      if (username !== user.username && users.find(u => u.username === username)) {
        alert('用户名已存在');
        return;
      }
      
      // 更新用户信息
      const updatedUsers = users.map(u => 
        u.id === id ? { ...u, username, password, email, role: role || 'user', updatedAt: Date.now() } : u
      );
      
      writeStorage('users', updatedUsers);
      alert('用户信息更新成功');
      renderAdminUsers();
    });
  };

  window.deleteAdminUser = (id) => {
    if (!confirm('确定要删除这个用户吗？删除后无法恢复。')) return;
    
    const users = readStorage('users', []);
    const updatedUsers = users.filter(u => u.id !== id);
    
    writeStorage('users', updatedUsers);
    alert('用户删除成功');
    renderAdminUsers();
  };

  // 切换用户角色权限（仅超级管理员可用）
  window.toggleUserRole = (id, currentRole, targetRole = null) => {
    const currentUser = getAuth();
    if (currentUser.role !== 'superadmin') {
      alert('只有超级管理员可以变更用户权限！');
      return;
    }

    const users = readStorage('users', []);
    const user = users.find(u => u.id === id);
    if (!user) return;

    // 不能变更超级管理员角色（除了admin用户自己）
    if (currentRole === 'superadmin' && user.username !== 'admin') {
      alert('不能变更超级管理员的角色！');
      return;
    }

    // 不能将其他用户提升为超级管理员
    if (targetRole === 'superadmin' && user.username !== 'admin') {
      alert('只有admin用户才能成为超级管理员！');
      return;
    }
    
    // 验证权限变更的合法性
    if (targetRole) {
      if (targetRole === 'superadmin' && user.username !== 'admin') {
        alert('只有admin用户才能成为超级管理员！');
        return;
      }
      if (targetRole === 'user' && user.username === 'admin') {
        alert('admin用户不能降级为普通用户！');
        return;
      }
    }

    let newRole, action;
    
    if (targetRole) {
      // 如果指定了目标角色，直接使用
      newRole = targetRole;
      if (targetRole === 'superadmin') {
        action = '提升为超级管理员';
      } else if (targetRole === 'admin') {
        action = currentRole === 'superadmin' ? '降级为普通管理员' : '提升为普通管理员';
      } else if (targetRole === 'user') {
        action = '降级为普通用户';
      }
    } else {
      // 兼容旧的逻辑
      if (currentRole === 'superadmin') {
        // 超级管理员可以降级为普通管理员或普通用户
        if (user.username === 'admin') {
          // admin用户只能降级为普通管理员，不能降级为普通用户
          newRole = 'admin';
          action = '降级为普通管理员';
        } else {
          // 其他超级管理员可以降级为普通管理员或普通用户
          newRole = 'admin';
          action = '降级为普通管理员';
        }
      } else if (currentRole === 'admin') {
        newRole = 'user';
        action = '降级为普通用户';
      } else if (currentRole === 'user') {
        if (user.username === 'admin') {
          newRole = 'superadmin';
          action = '提升为超级管理员';
        } else {
          newRole = 'admin';
          action = '提升为普通管理员';
        }
      }
    }
    
    if (!confirm(`确定要${action}吗？\n\n用户：${user.username}\n当前角色：${currentRole === 'superadmin' ? '超级管理员' : currentRole === 'admin' ? '普通管理员' : '普通用户'}\n变更后：${newRole === 'superadmin' ? '超级管理员' : newRole === 'admin' ? '普通管理员' : '普通用户'}`)) {
      return;
    }

    // 检查是否尝试降级当前登录的管理员
    if (currentUser.username === user.username && newRole === 'user') {
      alert('不能降级当前登录的管理员账号！');
      return;
    }
    
    // 超级管理员降级自己需要特别确认
    if (currentUser.username === user.username && currentRole === 'superadmin' && newRole === 'admin') {
      if (!confirm('⚠️ 警告：您正在降级自己的超级管理员权限！\n\n降级后您将失去以下权限：\n- 用户权限管理\n- 用户删除\n- 用户创建\n\n确定要继续吗？')) {
        return;
      }
    }

    // 更新用户角色
    const updatedUsers = users.map(u => 
      u.id === id ? { ...u, role: newRole, updatedAt: Date.now() } : u
    );
    
    writeStorage('users', updatedUsers);
    alert(`用户权限变更成功！\n${user.username} 已${action}`);
    renderAdminUsers();
  };

  // 全局函数
  window.showAuthModal = showAuthModal;
  window.closeAuthModal = closeAuthModal;
  window.switchAuthTab = switchAuthTab;
  window.renderAdminUsers = renderAdminUsers;

  // 添加表单提交事件监听器
  document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const activeTab = document.querySelector('.auth-tab.active');
        const mode = activeTab.textContent === '登录' ? 'login' : 'register';
        handleAuthSubmit(mode);
      });
    }

    // 点击模态框背景关闭
    const authModal = document.getElementById('authModal');
    if (authModal) {
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
          closeAuthModal();
        }
      });
    }

    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && authModal.classList.contains('show')) {
        closeAuthModal();
      }
    });
  });

  // 简介页面
  function renderAbout() {
    if (!requireAuth()) return;
    
    const aboutInfo = readStorage('aboutInfo', {
      title: 'KnowHow平台简介',
      content: `KnowHow是一个专业的法律信息服务平台，致力于构建法治社会新生态。我们通过多种形式的法律内容传播，为公众提供权威、及时、实用的法律信息和服务。

## 平台特色

### 🎬 影视中心
- **利农纪录片**：展现法治在乡村振兴中的重要作用
- **普法文园**：以生动有趣的方式解读法律条文

### 📰 时政要闻
- 及时发布最新的法律政策解读
- 关注法治建设的重要进展
- 提供专业的法律分析

### 💬 论坛交流
- 法律问题讨论与解答
- 专业律师在线答疑
- 法律知识分享交流

### ⚖️ 法律时效
- 跟踪法律变更与生效时间
- 提供法律条文更新提醒
- 帮助用户及时了解法律变化

### 👨‍💼 律师推广
- 专业律师信息展示
- 法律服务需求对接
- 法律咨询预约服务

## 我们的使命

KnowHow平台以"让法律更贴近生活"为使命，通过创新的内容形式和便捷的服务方式，让法律知识更加普及，让法律服务更加便民，为构建法治社会贡献力量。

## 联系我们

如有任何问题或建议，欢迎通过平台内联系方式与我们沟通。`,
      lastUpdated: Date.now()
    });
    
    const user = getAuth();
    const isAdmin = user.role === 'admin' || user.role === 'superadmin';
    
    setApp(html`
      <div class="about-container">
        <div class="about-header">
          <h1>${aboutInfo.title}</h1>
          ${isAdmin ? `
            <button class="btn primary" onclick="editAboutInfo()">✏️ 编辑简介</button>
          ` : ''}
        </div>
        
        <div class="about-content">
          <div class="about-text">
            ${aboutInfo.content.split('\n').map(line => {
              if (line.startsWith('## ')) {
                return `<h2>${line.replace('## ', '')}</h2>`;
              } else if (line.startsWith('### ')) {
                return `<h3>${line.replace('### ', '')}</h3>`;
              } else if (line.startsWith('- ')) {
                return `<li>${line.replace('- ', '')}</li>`;
              } else if (line.trim() === '') {
                return '<br>';
              } else {
                return `<p>${line}</p>`;
              }
            }).join('')}
          </div>
          
          <div class="about-meta">
            <div class="meta-item">
              <span class="meta-label">最后更新：</span>
              <span class="meta-value">${new Date(aboutInfo.lastUpdated).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // 编辑简介信息
  window.editAboutInfo = () => {
    const aboutInfo = readStorage('aboutInfo', {
      title: 'KnowHow平台简介',
      content: '',
      lastUpdated: Date.now()
    });
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAbout()">← 返回简介</button>
          <h2>编辑简介</h2>
        </div>
        
        <div class="admin-content">
          <form class="admin-form" onsubmit="saveAboutInfo(event)">
            <div class="form-group">
              <label for="aboutTitle">标题</label>
              <input type="text" id="aboutTitle" name="title" value="${aboutInfo.title}" required>
            </div>
            
            <div class="form-group">
              <label for="aboutContent">内容</label>
              <textarea id="aboutContent" name="content" rows="20" required placeholder="请输入简介内容，支持Markdown格式">${aboutInfo.content}</textarea>
              <div class="form-help">
                <small>支持Markdown格式：使用 ## 表示二级标题，### 表示三级标题，- 表示列表项</small>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn secondary" onclick="renderAbout()">取消</button>
              <button type="submit" class="btn primary">保存简介</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  // 保存简介信息
  window.saveAboutInfo = (event) => {
    event.preventDefault();
    
    const title = document.getElementById('aboutTitle').value.trim();
    const content = document.getElementById('aboutContent').value.trim();
    
    if (!title || !content) {
      alert('请填写标题和内容');
      return;
    }
    
    const aboutInfo = {
      title,
      content,
      lastUpdated: Date.now()
    };
    
    writeStorage('aboutInfo', aboutInfo);
    alert('简介保存成功！');
    renderAbout();
  };

  // 律师审核页面
  window.renderLawyerApplications = function() {
    if (!requireAuth()) return;
    
    const user = getAuth();
    if (!['superadmin', 'admin'].includes(user.role)) {
      setApp(html`
        <div class="admin-container">
          <div class="admin-header">
            <h1>权限不足</h1>
            <p class="admin-subtitle">您没有访问此页面的权限</p>
            <div style="margin-top: 24px;">
              <a href="#/admin" class="btn primary">返回管理后台</a>
            </div>
          </div>
        </div>
      `);
      return;
    }
    
    const applications = readStorage('lawyer_applications', []);
    const pendingApps = applications.filter(app => app.status === 'pending');
    const approvedApps = applications.filter(app => app.status === 'approved');
    const rejectedApps = applications.filter(app => app.status === 'rejected');
    
    setApp(html`
      <div class="admin-container">
        <div class="admin-header">
          <h1>律师注册审核</h1>
          <p class="admin-subtitle">管理律师注册申请</p>
          <div style="margin-top: 24px;">
            <a href="#/admin" class="btn secondary">返回管理后台</a>
          </div>
        </div>
        
        <div class="admin-stats">
          <div class="stat-card">
            <div class="stat-number">${pendingApps.length}</div>
            <div class="stat-label">待审核</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${approvedApps.length}</div>
            <div class="stat-label">已通过</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${rejectedApps.length}</div>
            <div class="stat-label">已拒绝</div>
          </div>
        </div>
        
        <div class="admin-content">
          <div class="admin-section">
            <h2>待审核申请 (${pendingApps.length})</h2>
            ${pendingApps.length === 0 ? 
              '<div class="empty-state"><p>暂无待审核的律师申请</p></div>' :
              pendingApps.map(app => {
                const lawyerTag = getUserLawyerTag(app.username);
                return html`
                <div class="application-card">
                  <div class="application-info">
                    <h3>${app.username} ${lawyerTag ? `<span class="lawyer-tag">${lawyerTag}</span>` : ''}</h3>
                    <p>邮箱: ${app.email}</p>
                    <p>申请时间: ${new Date(app.appliedAt).toLocaleString()}</p>
                  </div>
                  <div class="application-actions">
                    <button class="btn primary" onclick="approveLawyerApplication('${app.id}')">通过</button>
                    <button class="btn danger" onclick="rejectLawyerApplication('${app.id}')">拒绝</button>
                  </div>
                </div>
                `;
              }).join('')
            }
          </div>
          
          <div class="admin-section">
            <h2>已处理申请</h2>
            ${applications.filter(app => app.status !== 'pending').length === 0 ? 
              '<div class="empty-state"><p>暂无已处理的申请</p></div>' :
              applications.filter(app => app.status !== 'pending').map(app => html`
                <div class="application-card ${app.status}">
                  <div class="application-info">
                    <h3>${app.username}</h3>
                    <p>邮箱: ${app.email}</p>
                    <p>申请时间: ${new Date(app.appliedAt).toLocaleString()}</p>
                    <p>处理时间: ${app.reviewedAt ? new Date(app.reviewedAt).toLocaleString() : '未知'}</p>
                    <p>处理人: ${app.reviewedBy || '未知'}</p>
                  </div>
                  <div class="application-status">
                    <span class="status-badge ${app.status}">${app.status === 'approved' ? '已通过' : '已拒绝'}</span>
                  </div>
                </div>
              `).join('')
            }
          </div>
        </div>
      </div>
    `);
  };

  // 审核通过律师申请
  window.approveLawyerApplication = function(applicationId) {
    if (!confirm('确定要通过这个律师申请吗？')) return;
    
    const applications = readStorage('lawyer_applications', []);
    const users = readStorage('users', []);
    const user = getAuth();
    
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;
    
    // 更新申请状态
    application.status = 'approved';
    application.reviewedAt = Date.now();
    application.reviewedBy = user.username;
    
    // 更新用户角色
    const targetUser = users.find(u => u.id === application.userId);
    if (targetUser) {
      targetUser.role = 'lawyer';
      targetUser.status = 'active';
    }
    
    writeStorage('lawyer_applications', applications);
    writeStorage('users', users);
    
    alert('律师申请已通过！');
    renderLawyerApplications();
  };

  // 拒绝律师申请
  window.rejectLawyerApplication = function(applicationId) {
    if (!confirm('确定要拒绝这个律师申请吗？')) return;
    
    const applications = readStorage('lawyer_applications', []);
    const users = readStorage('users', []);
    const user = getAuth();
    
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;
    
    // 更新申请状态
    application.status = 'rejected';
    application.reviewedAt = Date.now();
    application.reviewedBy = user.username;
    
    // 更新用户角色为普通用户
    const targetUser = users.find(u => u.id === application.userId);
    if (targetUser) {
      targetUser.role = 'user';
      targetUser.status = 'active';
    }
    
    writeStorage('lawyer_applications', applications);
    writeStorage('users', users);
    
    alert('律师申请已拒绝！');
    renderLawyerApplications();
  };

  // 保存律师信息
  window.saveLawyerProfile = function() {
    const user = getAuth();
    const form = document.getElementById('lawyerProfileForm');
    const formData = new FormData(form);
    
    const lawyerData = {
      id: nid(),
      username: user.username,
      name: formData.get('name'),
      firm: formData.get('firm'),
      areas: formData.get('areas').split(',').map(area => area.trim()).filter(area => area),
      bio: formData.get('bio') || '',
      phone: formData.get('phone') || '',
      email: formData.get('email') || '',
      verified: true,
      createdAt: Date.now()
    };
    
    // 验证必填字段
    if (!lawyerData.name || !lawyerData.firm || lawyerData.areas.length === 0) {
      alert('请填写所有必填字段');
      return;
    }
    
    // 保存到律师推广模块
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    const existingIndex = lawyers.findIndex(l => l.username === user.username);
    
    if (existingIndex >= 0) {
      lawyers[existingIndex] = lawyerData;
    } else {
      lawyers.push(lawyerData);
    }
    
    writeStorage(STORAGE_KEYS.lawyers, lawyers);
    
    alert('律师信息保存成功！');
    renderLawyerPortal();
  };

  // 法律互动页面
  function renderInteraction() {
    if (!requireAuth()) return;
    
    const user = getAuth();
    const consultations = readStorage('legal_consultations', []);
    const cases = readStorage('legal_cases', []);
    const messages = readStorage('legal_messages', []);
    
    // 根据用户角色显示不同的内容
    let userConsultations, userCases, userMessages;
    
    if (user.role === 'lawyer') {
      // 律师可以看到所有待处理的咨询和案件
      userConsultations = consultations.filter(c => c.status === 'pending' || c.lawyerId === user.id);
      userCases = cases.filter(c => c.status === 'open' || c.lawyerId === user.id);
      userMessages = messages.filter(m => m.fromUserId === user.id || m.toUserId === user.id);
    } else {
      // 普通用户只能看到自己的咨询和案件
      userConsultations = consultations.filter(c => c.userId === user.id);
      userCases = cases.filter(c => c.userId === user.id);
      userMessages = messages.filter(m => m.fromUserId === user.id || m.toUserId === user.id);
    }
    
    setApp(html`
      <div class="interaction-container">
        <div class="interaction-header">
          <h1>法律互动中心</h1>
          <p class="interaction-subtitle">专业法律服务，在线咨询与案件对接</p>
        </div>
        
        <div class="interaction-tabs">
          <button class="tab-btn active" onclick="switchInteractionTab('consultation')">法律咨询</button>
          <button class="tab-btn" onclick="switchInteractionTab('cases')">案件发布</button>
          <button class="tab-btn" onclick="switchInteractionTab('messages')">消息中心</button>
        </div>
        
        <div class="interaction-content">
           <!-- 法律咨询 -->
           <div id="consultationTab" class="tab-content active">
             <div class="section-header">
               <h2>法律咨询 ${user.role === 'lawyer' ? '(待处理)' : ''}</h2>
               ${user.role !== 'lawyer' ? '<button class="btn primary" onclick="showConsultationModal()">发起咨询</button>' : ''}
             </div>
             
             <div class="consultation-list">
               ${userConsultations.length === 0 ? 
                 `<div class="empty-state">
                   <p>${user.role === 'lawyer' ? '暂无待处理的咨询' : '暂无咨询记录'}</p>
                   ${user.role !== 'lawyer' ? '<button class="btn primary" onclick="showConsultationModal()">发起咨询</button>' : ''}
                 </div>` :
                 userConsultations.map(consultation => html`
                   <div class="consultation-card">
                     <div class="consultation-header">
                       <h3>${consultation.title}</h3>
                       <div style="display: flex; align-items: center; gap: 8px;">
                         <span class="status-badge ${consultation.status}">${consultation.status === 'pending' ? '待回复' : consultation.status === 'replied' ? '已回复' : '已关闭'}</span>
                         ${consultation.urgency === 'high' ? '<span class="urgency-badge high">紧急</span>' : consultation.urgency === 'medium' ? '<span class="urgency-badge medium">较急</span>' : ''}
                       </div>
                     </div>
                     <div class="consultation-content">
                       <p><strong>咨询类型：</strong>${consultation.type}</p>
                       <p>${consultation.description}</p>
                       <div class="consultation-meta">
                         <span>咨询人：${consultation.userName}</span>
                         <span>咨询时间：${new Date(consultation.createdAt).toLocaleString()}</span>
                         ${consultation.lawyerName ? `<span>回复律师：${consultation.lawyerName}</span>` : ''}
                         ${consultation.repliedAt ? `<span>回复时间：${new Date(consultation.repliedAt).toLocaleString()}</span>` : ''}
                       </div>
                     </div>
                     <div class="consultation-actions">
                       <button class="btn secondary small" onclick="viewConsultation('${consultation.id}')">查看详情</button>
                       ${consultation.status === 'pending' && user.role === 'lawyer' ? 
                         `<button class="btn primary small" onclick="replyConsultation('${consultation.id}')">回复咨询</button>` : ''}
                       ${consultation.status === 'replied' && consultation.userId === user.id ? 
                         `<button class="btn success small" onclick="closeConsultation('${consultation.id}')">关闭咨询</button>` : ''}
                     </div>
                   </div>
                 `).join('')
               }
             </div>
           </div>
          
           <!-- 案件发布 -->
           <div id="casesTab" class="tab-content">
             <div class="section-header">
               <h2>案件发布 ${user.role === 'lawyer' ? '(可接单)' : ''}</h2>
               ${user.role !== 'lawyer' ? '<button class="btn primary" onclick="showCaseModal()">发布案件</button>' : ''}
             </div>
             
             <div class="cases-list">
               ${userCases.length === 0 ? 
                 `<div class="empty-state">
                   <p>${user.role === 'lawyer' ? '暂无可接单的案件' : '暂无案件记录'}</p>
                   ${user.role !== 'lawyer' ? '<button class="btn primary" onclick="showCaseModal()">发布案件</button>' : ''}
                 </div>` :
                 userCases.map(caseItem => html`
                   <div class="case-card">
                     <div class="case-header">
                       <h3>${caseItem.title}</h3>
                       <div style="display: flex; align-items: center; gap: 8px;">
                         <span class="status-badge ${caseItem.status}">${caseItem.status === 'open' ? '待接单' : caseItem.status === 'taken' ? '已接单' : '已完成'}</span>
                         ${caseItem.deadline ? `<span class="deadline-badge">${new Date(caseItem.deadline).toLocaleDateString()}截止</span>` : ''}
                       </div>
                     </div>
                     <div class="case-content">
                       <p><strong>案件类型：</strong>${caseItem.type}</p>
                       <p>${caseItem.description}</p>
                       <div class="case-meta">
                         <span>发布人：${caseItem.userName}</span>
                         <span>预算：¥${caseItem.budget}</span>
                         <span>发布时间：${new Date(caseItem.createdAt).toLocaleString()}</span>
                         ${caseItem.lawyerName ? `<span>接单律师：${caseItem.lawyerName}</span>` : ''}
                         ${caseItem.takenAt ? `<span>接单时间：${new Date(caseItem.takenAt).toLocaleString()}</span>` : ''}
                       </div>
                     </div>
                     <div class="case-actions">
                       <button class="btn secondary small" onclick="viewCase('${caseItem.id}')">查看详情</button>
                       ${caseItem.status === 'open' && user.role === 'lawyer' ? 
                         `<button class="btn primary small" onclick="takeCase('${caseItem.id}')">接单</button>` : ''}
                       ${caseItem.status === 'taken' && caseItem.lawyerId === user.id ? 
                         `<button class="btn success small" onclick="updateCaseStatus('${caseItem.id}')">更新状态</button>` : ''}
                       ${caseItem.status === 'taken' && caseItem.userId === user.id ? 
                         `<button class="btn danger small" onclick="cancelCase('${caseItem.id}')">取消案件</button>` : ''}
                     </div>
                   </div>
                 `).join('')
               }
             </div>
           </div>
          
          <!-- 消息中心 -->
          <div id="messagesTab" class="tab-content">
            <div class="section-header">
              <h2>消息中心</h2>
              <button class="btn primary" onclick="showMessageModal()">发送消息</button>
            </div>
            
            <div class="messages-list">
              ${userMessages.length === 0 ? 
                '<div class="empty-state"><p>暂无消息</p></div>' :
                userMessages.map(message => html`
                  <div class="message-card">
                    <div class="message-header">
                      <h4>${message.title}</h4>
                      <span class="message-time">${new Date(message.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="message-content">
                      <p>${message.content}</p>
                      <div class="message-meta">
                        <span>发送者：${message.fromUserName}</span>
                        <span>接收者：${message.toUserName}</span>
                      </div>
                    </div>
                  </div>
                `).join('')
              }
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // 切换互动标签页
  window.switchInteractionTab = function(tabName) {
    // 移除所有活动状态
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // 激活选中的标签页
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
  };



  // 显示咨询模态框
  window.showConsultationModal = function() {
    const user = getAuth();
    if (!user) {
      alert('请先登录');
      return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = html`
      <div class="modal-content">
        <div class="modal-header">
          <h3>发起法律咨询</h3>
          <button class="modal-close" onclick="closeModal(this)">×</button>
        </div>
        <form id="consultationForm" class="modal-form">
          <div class="form-group">
            <label for="consultationTitle">咨询标题 *</label>
            <input type="text" id="consultationTitle" name="title" required placeholder="请输入咨询标题">
          </div>
          <div class="form-group">
            <label for="consultationType">咨询类型 *</label>
            <select id="consultationType" name="type" required>
              <option value="">请选择咨询类型</option>
              <option value="民商事">民商事</option>
              <option value="刑事">刑事</option>
              <option value="行政">行政</option>
              <option value="劳动">劳动</option>
              <option value="婚姻家庭">婚姻家庭</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="form-group">
            <label for="consultationDescription">详细描述 *</label>
            <textarea id="consultationDescription" name="description" rows="5" required placeholder="请详细描述您遇到的法律问题"></textarea>
          </div>
          <div class="form-group">
            <label for="consultationUrgency">紧急程度</label>
            <select id="consultationUrgency" name="urgency">
              <option value="low">一般</option>
              <option value="medium">较急</option>
              <option value="high">紧急</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn primary">提交咨询</button>
            <button type="button" class="btn secondary" onclick="closeModal(this)">取消</button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加表单提交事件
    document.getElementById('consultationForm').addEventListener('submit', function(e) {
      e.preventDefault();
      submitConsultation();
    });
  };

  // 提交咨询
  window.submitConsultation = function() {
    const form = document.getElementById('consultationForm');
    const formData = new FormData(form);
    const user = getAuth();
    
    const consultation = {
      id: nid(),
      userId: user.id,
      userName: user.username,
      title: formData.get('title'),
      type: formData.get('type'),
      description: formData.get('description'),
      urgency: formData.get('urgency'),
      status: 'pending',
      createdAt: Date.now(),
      lawyerId: null,
      lawyerName: null,
      reply: null,
      repliedAt: null
    };
    
    const consultations = readStorage('legal_consultations', []);
    consultations.push(consultation);
    writeStorage('legal_consultations', consultations);
    
    alert('咨询提交成功！律师将尽快回复您。');
    closeModal(document.querySelector('.modal'));
    renderInteraction();
  };

  // 显示案件发布模态框
  window.showCaseModal = function() {
    const user = getAuth();
    if (!user) {
      alert('请先登录');
      return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = html`
      <div class="modal-content">
        <div class="modal-header">
          <h3>发布案件需求</h3>
          <button class="modal-close" onclick="closeModal(this)">×</button>
        </div>
        <form id="caseForm" class="modal-form">
          <div class="form-group">
            <label for="caseTitle">案件标题 *</label>
            <input type="text" id="caseTitle" name="title" required placeholder="请输入案件标题">
          </div>
          <div class="form-group">
            <label for="caseType">案件类型 *</label>
            <select id="caseType" name="type" required>
              <option value="">请选择案件类型</option>
              <option value="民商事">民商事</option>
              <option value="刑事">刑事</option>
              <option value="行政">行政</option>
              <option value="劳动">劳动</option>
              <option value="婚姻家庭">婚姻家庭</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="form-group">
            <label for="caseDescription">案件描述 *</label>
            <textarea id="caseDescription" name="description" rows="5" required placeholder="请详细描述案件情况"></textarea>
          </div>
          <div class="form-group">
            <label for="caseBudget">预算范围 *</label>
            <select id="caseBudget" name="budget" required>
              <option value="">请选择预算范围</option>
              <option value="5000">5000元以下</option>
              <option value="10000">5000-10000元</option>
              <option value="20000">10000-20000元</option>
              <option value="50000">20000-50000元</option>
              <option value="100000">50000-100000元</option>
              <option value="200000">100000元以上</option>
            </select>
          </div>
          <div class="form-group">
            <label for="caseDeadline">期望完成时间</label>
            <input type="date" id="caseDeadline" name="deadline">
          </div>
          <div class="form-actions">
            <button type="submit" class="btn primary">发布案件</button>
            <button type="button" class="btn secondary" onclick="closeModal(this)">取消</button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加表单提交事件
    document.getElementById('caseForm').addEventListener('submit', function(e) {
      e.preventDefault();
      submitCase();
    });
  };

  // 提交案件
  window.submitCase = function() {
    const form = document.getElementById('caseForm');
    const formData = new FormData(form);
    const user = getAuth();
    
    const caseItem = {
      id: nid(),
      userId: user.id,
      userName: user.username,
      title: formData.get('title'),
      type: formData.get('type'),
      description: formData.get('description'),
      budget: formData.get('budget'),
      deadline: formData.get('deadline'),
      status: 'open',
      createdAt: Date.now(),
      lawyerId: null,
      lawyerName: null,
      takenAt: null
    };
    
    const cases = readStorage('legal_cases', []);
    cases.push(caseItem);
    writeStorage('legal_cases', cases);
    
    alert('案件发布成功！律师将看到您的案件需求。');
    closeModal(document.querySelector('.modal'));
    renderInteraction();
  };

  // 律师接单
  window.takeCase = function(caseId) {
    if (!confirm('确定要接这个案件吗？')) return;
    
    const user = getAuth();
    const cases = readStorage('legal_cases', []);
    const caseItem = cases.find(c => c.id === caseId);
    
    if (!caseItem) return;
    
    caseItem.status = 'taken';
    caseItem.lawyerId = user.id;
    caseItem.lawyerName = user.username;
    caseItem.takenAt = Date.now();
    
    writeStorage('legal_cases', cases);
    
    // 发送消息通知
    const message = {
      id: nid(),
      fromUserId: user.id,
      fromUserName: user.username,
      toUserId: caseItem.userId,
      toUserName: caseItem.userName,
      title: '案件接单通知',
      content: `律师 ${user.username} 已接取您的案件"${caseItem.title}"，请及时联系沟通。`,
      createdAt: Date.now(),
      read: false
    };
    
    const messages = readStorage('legal_messages', []);
    messages.push(message);
    writeStorage('legal_messages', messages);
    
    alert('接单成功！已通知案件发布者。');
    renderInteraction();
  };

   // 律师回复咨询
   window.replyConsultation = function(consultationId) {
     const reply = prompt('请输入您的回复：');
     if (!reply) return;
     
     const user = getAuth();
     const consultations = readStorage('legal_consultations', []);
     const consultation = consultations.find(c => c.id === consultationId);
     
     if (!consultation) return;
     
     consultation.status = 'replied';
     consultation.lawyerId = user.id;
     consultation.lawyerName = user.username;
     consultation.reply = reply;
     consultation.repliedAt = Date.now();
     
     writeStorage('legal_consultations', consultations);
     
     // 发送消息通知
     const message = {
       id: nid(),
       fromUserId: user.id,
       fromUserName: user.username,
       toUserId: consultation.userId,
       toUserName: consultation.userName,
       title: '咨询回复通知',
       content: `律师 ${user.username} 已回复您的咨询"${consultation.title}"，请查看详情。`,
       createdAt: Date.now(),
       read: false
     };
     
     const messages = readStorage('legal_messages', []);
     messages.push(message);
     writeStorage('legal_messages', messages);
     
     alert('回复成功！已通知咨询者。');
     renderInteraction();
   };

   // 关闭咨询
   window.closeConsultation = function(consultationId) {
     if (!confirm('确定要关闭这个咨询吗？')) return;
     
     const consultations = readStorage('legal_consultations', []);
     const consultation = consultations.find(c => c.id === consultationId);
     
     if (!consultation) return;
     
     consultation.status = 'closed';
     consultation.closedAt = Date.now();
     
     writeStorage('legal_consultations', consultations);
     
     alert('咨询已关闭');
     renderInteraction();
   };

   // 取消案件
   window.cancelCase = function(caseId) {
     if (!confirm('确定要取消这个案件吗？这将通知接单律师。')) return;
     
     const cases = readStorage('legal_cases', []);
     const caseItem = cases.find(c => c.id === caseId);
     
     if (!caseItem) return;
     
     caseItem.status = 'cancelled';
     caseItem.cancelledAt = Date.now();
     
     writeStorage('legal_cases', cases);
     
     // 如果案件已被接单，通知律师
     if (caseItem.lawyerId) {
       const message = {
         id: nid(),
         fromUserId: caseItem.userId,
         fromUserName: caseItem.userName,
         toUserId: caseItem.lawyerId,
         toUserName: caseItem.lawyerName,
         title: '案件取消通知',
         content: `案件"${caseItem.title}"已被发布者取消。`,
         createdAt: Date.now(),
         read: false
       };
       
       const messages = readStorage('legal_messages', []);
       messages.push(message);
       writeStorage('legal_messages', messages);
     }
     
     alert('案件已取消');
     renderInteraction();
   };

  // 查看咨询详情
  window.viewConsultation = function(consultationId) {
    const consultations = readStorage('legal_consultations', []);
    const consultation = consultations.find(c => c.id === consultationId);
    
    if (!consultation) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = html`
      <div class="modal-content">
        <div class="modal-header">
          <h3>咨询详情</h3>
          <button class="modal-close" onclick="closeModal(this)">×</button>
        </div>
        <div class="consultation-detail">
          <h4>${consultation.title}</h4>
          <p><strong>咨询类型：</strong>${consultation.type}</p>
          <p><strong>紧急程度：</strong>${consultation.urgency === 'high' ? '紧急' : consultation.urgency === 'medium' ? '较急' : '一般'}</p>
          <p><strong>咨询时间：</strong>${new Date(consultation.createdAt).toLocaleString()}</p>
          <p><strong>状态：</strong>${consultation.status === 'pending' ? '待回复' : consultation.status === 'replied' ? '已回复' : '已关闭'}</p>
          <div class="detail-section">
            <h5>问题描述：</h5>
            <p>${consultation.description}</p>
          </div>
          ${consultation.reply ? html`
            <div class="detail-section">
              <h5>律师回复：</h5>
              <p>${consultation.reply}</p>
              <p><small>回复时间：${new Date(consultation.repliedAt).toLocaleString()}</small></p>
            </div>
          ` : ''}
        </div>
        <div class="modal-actions">
          <button class="btn secondary" onclick="closeModal(this)">关闭</button>
          <button class="btn primary" onclick="closeModal(this); renderInteraction()">返回列表</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  };

  // 查看案件详情
  window.viewCase = function(caseId) {
    const cases = readStorage('legal_cases', []);
    const caseItem = cases.find(c => c.id === caseId);
    
    if (!caseItem) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = html`
      <div class="modal-content">
        <div class="modal-header">
          <h3>案件详情</h3>
          <button class="modal-close" onclick="closeModal(this)">×</button>
        </div>
        <div class="case-detail">
          <h4>${caseItem.title}</h4>
          <p><strong>案件类型：</strong>${caseItem.type}</p>
          <p><strong>预算范围：</strong>¥${caseItem.budget}</p>
          <p><strong>发布时间：</strong>${new Date(caseItem.createdAt).toLocaleString()}</p>
          <p><strong>状态：</strong>${caseItem.status === 'open' ? '待接单' : caseItem.status === 'taken' ? '已接单' : '已完成'}</p>
          ${caseItem.deadline ? `<p><strong>期望完成时间：</strong>${new Date(caseItem.deadline).toLocaleDateString()}</p>` : ''}
          ${caseItem.lawyerName ? `<p><strong>接单律师：</strong>${caseItem.lawyerName}</p>` : ''}
          <div class="detail-section">
            <h5>案件描述：</h5>
            <p>${caseItem.description}</p>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn secondary" onclick="closeModal(this)">关闭</button>
          <button class="btn primary" onclick="closeModal(this); renderInteraction()">返回列表</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  };

  // 显示消息模态框
  window.showMessageModal = function() {
    const user = getAuth();
    if (!user) {
      alert('请先登录');
      return;
    }
    
    // 获取用户列表（律师和普通用户）
    const users = readStorage('users', []);
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = html`
      <div class="modal-content">
        <div class="modal-header">
          <h3>发送消息</h3>
          <button class="modal-close" onclick="closeModal(this)">×</button>
        </div>
        <form id="messageForm" class="modal-form">
          <div class="form-group">
            <label for="messageTo">发送给 *</label>
            <select id="messageTo" name="toUserId" required>
              <option value="">请选择接收者</option>
              ${users.filter(u => u.id !== user.id).map(u => {
                const lawyerInfo = lawyers.find(l => l.username === u.username);
                return `<option value="${u.id}">${u.username} ${lawyerInfo ? `(${lawyerInfo.name})` : ''}</option>`;
              }).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="messageTitle">消息标题 *</label>
            <input type="text" id="messageTitle" name="title" required placeholder="请输入消息标题">
          </div>
          <div class="form-group">
            <label for="messageContent">消息内容 *</label>
            <textarea id="messageContent" name="content" rows="4" required placeholder="请输入消息内容"></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn primary">发送消息</button>
            <button type="button" class="btn secondary" onclick="closeModal(this)">取消</button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加表单提交事件
    document.getElementById('messageForm').addEventListener('submit', function(e) {
      e.preventDefault();
      submitMessage();
    });
  };

  // 提交消息
  window.submitMessage = function() {
    const form = document.getElementById('messageForm');
    const formData = new FormData(form);
    const user = getAuth();
    const users = readStorage('users', []);
    
    const toUser = users.find(u => u.id === formData.get('toUserId'));
    if (!toUser) return;
    
    const message = {
      id: nid(),
      fromUserId: user.id,
      fromUserName: user.username,
      toUserId: toUser.id,
      toUserName: toUser.username,
      title: formData.get('title'),
      content: formData.get('content'),
      createdAt: Date.now(),
      read: false
    };
    
    const messages = readStorage('legal_messages', []);
    messages.push(message);
    writeStorage('legal_messages', messages);
    
    alert('消息发送成功！');
    closeModal(document.querySelector('.modal'));
    renderInteraction();
  };

  // 关闭模态框
  window.closeModal = function(button) {
    const modal = button.closest('.modal');
    if (modal) {
      modal.remove();
    }
  };

  // 添加律师好友
  window.addLawyerFriend = function(lawyerId, lawyerUsername) {
    const user = getAuth();
    if (!user) {
      alert('请先登录');
      return;
    }
    
    if (user.role === 'lawyer') {
      alert('律师不能添加其他律师为好友');
      return;
    }
    
    // 获取律师的用户ID
    const users = readStorage('users', []);
    const lawyerUser = users.find(u => u.username === lawyerUsername);
    if (!lawyerUser) {
      alert('找不到律师用户信息');
      return;
    }
    
    // 检查是否已经是好友
    const friends = window.chatStorage.getFriends();
    const existingFriend = friends.find(f => f.lawyerId === lawyerUser.id && f.userId === user.id);
    if (existingFriend) {
      if (existingFriend.status === 'accepted') {
        alert('您已经是该律师的好友');
        return;
      } else if (existingFriend.status === 'pending') {
        alert('您已发送好友申请，等待律师确认');
        return;
      }
    }
    
    // 创建好友申请
    const friendRequest = {
      id: window.chatStorage.generateId(),
      userId: user.id,
      userName: user.username,
      lawyerId: lawyerUser.id, // 使用律师的用户ID
      lawyerUsername: lawyerUsername,
      status: 'pending',
      createdAt: Date.now(),
      acceptedAt: null,
      message: ''
    };
    
    window.chatStorage.addFriend(friendRequest);
    
    // 发送通知给律师
    const notification = {
      id: window.chatStorage.generateId(),
      type: 'friend_request',
      fromUserId: user.id,
      fromUserName: user.username,
      toUserId: lawyerUser.id, // 使用律师的用户ID
      toUserName: lawyerUsername,
      title: '好友申请',
      content: `${user.username} 申请添加您为好友`,
      createdAt: Date.now(),
      read: false,
      data: { friendRequestId: friendRequest.id }
    };
    
    window.chatStorage.addNotification(notification);
    
    alert('好友申请已发送，等待律师确认');
  };

  // 处理好友申请
  window.handleFriendRequest = function(friendRequestId, action) {
    const friends = window.chatStorage.getFriends();
    const friendRequest = friends.find(f => f.id === friendRequestId);
    
    if (!friendRequest) return;
    
    if (action === 'accept') {
      friendRequest.status = 'accepted';
      friendRequest.acceptedAt = Date.now();
      
      // 发送通知给用户
      const notification = {
        id: window.chatStorage.generateId(),
        type: 'friend_accepted',
        fromUserId: getAuth().id,
        fromUserName: getAuth().username,
        toUserId: friendRequest.userId,
        toUserName: friendRequest.userName,
        title: '好友申请已通过',
        content: `${getAuth().username} 已通过您的好友申请`,
        createdAt: Date.now(),
        read: false
      };
      
      window.chatStorage.addNotification(notification);
      
      alert('已通过好友申请');
    } else if (action === 'reject') {
      friendRequest.status = 'rejected';
      
      alert('已拒绝好友申请');
    }
    
    window.chatStorage.setFriends(friends);
    renderFriendRequests();
  };

  // 渲染私信页面 - 新设计：左边好友列表，右边聊天内容
  function renderMessages() {
    if (!requireAuth()) return;
    
    const user = getAuth();
    const friends = window.chatStorage.getFriends();
    const sessions = window.chatStorage.getSessions();
    const notifications = window.chatStorage.getNotifications();
    
    // 根据用户角色显示不同的内容
    let myFriends, unreadNotifications;
    
    if (user.role === 'lawyer') {
      // 律师的好友和通知
      myFriends = friends.filter(f => f.lawyerId === user.id && f.status === 'accepted');
      unreadNotifications = notifications.filter(n => n.toUserId === user.id && !n.read);
    } else {
      // 普通用户的好友和通知
      myFriends = friends.filter(f => f.userId === user.id && f.status === 'accepted');
      unreadNotifications = notifications.filter(n => n.toUserId === user.id && !n.read);
    }
    
    // 获取聊天会话列表
    const userSessions = sessions.filter(s => 
      s.userId1 === user.id || s.userId2 === user.id
    ).sort((a, b) => b.lastMessageAt - a.lastMessageAt);
    
    setApp(html`
      <div class="messages-container-new">
        <!-- 左侧好友列表 -->
        <div class="messages-sidebar-new">
          <div class="sidebar-header">
            <h2>💬 交流中心</h2>
            <div class="header-actions">
              <button class="btn-icon" onclick="refreshChatList()" title="刷新">
                <span>🔄</span>
              </button>
              <button class="btn-icon" onclick="showAddFriendModal()" title="添加好友">
                <span>➕</span>
              </button>
            </div>
          </div>
          
          <div class="sidebar-tabs">
            <button class="tab-btn active" onclick="switchMessagesTabNew('chats')">
              <span>💬</span> 聊天列表
              ${userSessions.length > 0 ? `<span class="tab-badge">${userSessions.length}</span>` : ''}
            </button>
            <button class="tab-btn" onclick="switchMessagesTabNew('friends')">
              <span>👥</span> 我的好友
              ${myFriends.length > 0 ? `<span class="tab-badge">${myFriends.length}</span>` : ''}
            </button>
            <button class="tab-btn" onclick="switchMessagesTabNew('notifications')">
              <span>🔔</span> 通知
              ${unreadNotifications.length > 0 ? `<span class="tab-badge unread">${unreadNotifications.length}</span>` : ''}
            </button>
          </div>
          
          <!-- 搜索框 -->
          <div class="sidebar-search">
            <input type="text" id="chatSearchInput" placeholder="搜索好友或聊天..." oninput="searchChats()">
          </div>
          
          <!-- 聊天列表内容 -->
          <div class="sidebar-content">
            <!-- 聊天列表 -->
            <div id="chatsTabNew" class="tab-content active">
              <div class="chats-list-new">
                ${userSessions.length === 0 ? 
                  '<div class="empty-state"><div class="empty-icon">💬</div><p>暂无聊天记录</p><p>添加律师好友开始聊天吧！</p></div>' :
                  userSessions.map(session => {
                    const otherUser = session.userId1 === user.id ? 
                      { id: session.userId2, name: session.userName2 } : 
                      { id: session.userId1, name: session.userName1 };
                    
                    // 获取最后一条消息
                    const messages = window.chatStorage.getSessionMessages(session.id);
                    const lastMessage = messages[messages.length - 1];
                    
                    return html`
                      <div class="chat-item-new" onclick="openChatWindow('${session.id}', '${otherUser.name}')" data-session-id="${session.id}">
                        <div class="chat-avatar-new">
                          <div class="avatar-circle">${otherUser.name.charAt(0).toUpperCase()}</div>
                          <div class="online-indicator"></div>
                        </div>
                        <div class="chat-info-new">
                          <div class="chat-name-new">${otherUser.name}</div>
                          <div class="chat-preview-new">${lastMessage ? (lastMessage.content.length > 30 ? lastMessage.content.substring(0, 30) + '...' : lastMessage.content) : '暂无消息'}</div>
                        </div>
                        <div class="chat-meta-new">
                          <div class="chat-time-new">${lastMessage ? new Date(lastMessage.createdAt).toLocaleTimeString() : ''}</div>
                          ${session.unreadCount > 0 ? `<div class="unread-badge-new">${session.unreadCount}</div>` : ''}
                        </div>
                      </div>
                    `;
                  }).join('')
                }
              </div>
            </div>
            
            <!-- 好友列表 -->
            <div id="friendsTabNew" class="tab-content">
              <div class="friends-list-new">
                ${myFriends.length === 0 ? 
                  '<div class="empty-state"><div class="empty-icon">👥</div><p>暂无好友</p><p>去律师推广页面添加律师好友吧！</p></div>' :
                  myFriends.map(friend => {
                    const friendName = user.role === 'lawyer' ? friend.userName : friend.lawyerUsername;
                    const friendId = user.role === 'lawyer' ? friend.userId : friend.lawyerId;
                    
                    return html`
                      <div class="friend-item-new" onclick="openChatWithFriend('${friendId}', '${friendName}')">
                        <div class="friend-avatar-new">
                          <div class="avatar-circle">${friendName.charAt(0).toUpperCase()}</div>
                          <div class="online-indicator"></div>
                        </div>
                        <div class="friend-info-new">
                          <div class="friend-name-new">${friendName}</div>
                          <div class="friend-status-new">${user.role === 'lawyer' ? '客户' : '律师'}</div>
                        </div>
                        <div class="friend-actions-new">
                          <button class="btn-icon" onclick="event.stopPropagation(); removeFriend('${friend.id}')" title="删除好友">
                            <span>🗑️</span>
                          </button>
                        </div>
                      </div>
                    `;
                  }).join('')
                }
              </div>
            </div>
            
            <!-- 通知中心 -->
            <div id="notificationsTabNew" class="tab-content">
              <div class="notifications-list-new">
                ${notifications.length === 0 ? 
                  '<div class="empty-state"><div class="empty-icon">🔔</div><p>暂无通知</p></div>' :
                  notifications.map(notification => html`
                    <div class="notification-item-new ${notification.read ? 'read' : 'unread'}" onclick="handleNotificationClick('${notification.id}')">
                      <div class="notification-icon-new">${notification.type === 'friend_request' ? '👥' : notification.type === 'friend_accepted' ? '✅' : '💬'}</div>
                      <div class="notification-content-new">
                        <div class="notification-title-new">${notification.title}</div>
                        <div class="notification-text-new">${notification.content}</div>
                        <div class="notification-time-new">${new Date(notification.createdAt).toLocaleString()}</div>
                      </div>
                      <div class="notification-actions-new">
                        ${!notification.read ? '<div class="unread-dot"></div>' : ''}
                      </div>
                    </div>
                  `).join('')
                }
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧聊天区域 -->
        <div class="messages-main-new" id="chatMainArea">
          <div class="chat-welcome" id="chatWelcome">
            <div class="welcome-content">
              <div class="welcome-icon">💬</div>
              <h3>欢迎使用交流中心</h3>
              <p>选择左侧的聊天记录开始对话，或添加新的律师好友</p>
              <div class="welcome-actions">
                <button class="btn primary" onclick="location.hash = '#/lawyers'">浏览律师</button>
                <button class="btn secondary" onclick="switchMessagesTabNew('friends')">管理好友</button>
              </div>
            </div>
          </div>
          
          <!-- 聊天窗口容器 -->
          <div class="chat-window-container" id="chatWindowContainer" style="display: none;">
            <div class="chat-window-header">
              <div class="chat-window-info">
                <div class="chat-window-avatar" id="chatWindowAvatar"></div>
                <div class="chat-window-details">
                  <div class="chat-window-name" id="chatWindowName"></div>
                  <div class="chat-window-status" id="chatWindowStatus">在线</div>
                </div>
              </div>
              <div class="chat-window-actions">
                <button class="btn-icon" onclick="minimizeChatWindow()" title="最小化">
                  <span>➖</span>
                </button>
                <button class="btn-icon" onclick="maximizeChatWindow()" title="最大化" id="maximizeBtn">
                  <span>⛶</span>
                </button>
                <button class="btn-icon" onclick="closeChatWindow()" title="关闭">
                  <span>✕</span>
                </button>
              </div>
            </div>
            
            <div class="chat-window-messages" id="chatWindowMessages">
              <!-- 聊天消息将在这里动态加载 -->
            </div>
            
            <div class="chat-window-input">
              <div class="input-container">
                <input type="text" id="chatInput" placeholder="输入消息..." onkeypress="handleChatKeyPress(event)">
                <button class="btn primary" onclick="sendChatMessage()">发送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // 切换私信标签页
  window.switchMessagesTab = function(tabName) {
    // 移除所有活动状态
    document.querySelectorAll('.messages-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.messages-content .tab-content').forEach(content => content.classList.remove('active'));
    
    // 激活当前标签页
    document.querySelector(`[onclick="switchMessagesTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
  };

  // 新的标签页切换函数
  window.switchMessagesTabNew = function(tabName) {
    // 移除所有活动状态
    document.querySelectorAll('.sidebar-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.sidebar-content .tab-content').forEach(content => content.classList.remove('active'));
    
    // 激活当前标签页
    document.querySelector(`[onclick="switchMessagesTabNew('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName + 'TabNew').classList.add('active');
  };

  // 打开聊天窗口
  window.openChatWindow = function(sessionId, userName) {
    const user = getAuth();
    if (!user) return;
    
    // 隐藏欢迎界面，显示聊天窗口
    document.getElementById('chatWelcome').style.display = 'none';
    document.getElementById('chatWindowContainer').style.display = 'flex';
    
    // 设置聊天窗口信息
    document.getElementById('chatWindowName').textContent = userName;
    document.getElementById('chatWindowAvatar').innerHTML = `<div class="avatar-circle">${userName.charAt(0).toUpperCase()}</div>`;
    
    // 加载聊天消息
    loadChatMessages(sessionId);
    
    // 设置当前会话ID
    window.currentSessionId = sessionId;
    
    // 更新聊天项选中状态
    document.querySelectorAll('.chat-item-new').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-session-id="${sessionId}"]`).classList.add('active');
  };

  // 与好友开始聊天
  window.openChatWithFriend = function(friendId, friendName) {
    const user = getAuth();
    if (!user) return;
    
    // 查找或创建会话
    const sessions = window.chatStorage.getSessions();
    let session = sessions.find(s => 
      (s.userId1 === user.id && s.userId2 === friendId) ||
      (s.userId1 === friendId && s.userId2 === user.id)
    );
    
    if (!session) {
      // 创建新会话
      session = window.chatStorage.getOrCreateSession(
        user.id, 
        friendId, 
        user.username, 
        friendName
      );
    }
    
    openChatWindow(session.id, friendName);
  };

  // 加载聊天消息
  function loadChatMessages(sessionId) {
    const messages = window.chatStorage.getSessionMessages(sessionId);
    const messagesContainer = document.getElementById('chatWindowMessages');
    
    messagesContainer.innerHTML = messages.map(message => {
      const isOwn = message.senderId === getAuth().id;
      return `
        <div class="message-item ${isOwn ? 'own' : 'other'}">
          <div class="message-avatar">
            <div class="avatar-circle">${message.senderName.charAt(0).toUpperCase()}</div>
          </div>
          <div class="message-content">
            <div class="message-text">${message.content}</div>
            <div class="message-time">${new Date(message.createdAt).toLocaleTimeString()}</div>
          </div>
        </div>
      `;
    }).join('');
    
    // 滚动到底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // 发送聊天消息
  window.sendChatMessage = function() {
    const input = document.getElementById('chatInput');
    const content = input.value.trim();
    
    if (!content || !window.currentSessionId) return;
    
    const user = getAuth();
    const session = window.chatStorage.getSessions().find(s => s.id === window.currentSessionId);
    
    if (!session) return;
    
    const otherUser = session.userId1 === user.id ? 
      { id: session.userId2, name: session.userName2 } : 
      { id: session.userId1, name: session.userName1 };
    
    // 创建消息
    const message = {
      id: window.chatStorage.generateId(),
      sessionId: window.currentSessionId,
      senderId: user.id,
      senderName: user.username,
      content: content,
      createdAt: Date.now()
    };
    
    // 保存消息
    window.chatStorage.addMessage(message);
    
    // 清空输入框
    input.value = '';
    
    // 重新加载消息
    loadChatMessages(window.currentSessionId);
    
    // 发送通知给接收方
    const notification = {
      id: window.chatStorage.generateId(),
      toUserId: otherUser.id,
      type: 'message',
      title: '新消息',
      content: `${user.username}: ${content}`,
      createdAt: Date.now(),
      read: false
    };
    
    window.chatStorage.addNotification(notification);
  };

  // 处理聊天输入框按键事件
  window.handleChatKeyPress = function(event) {
    if (event.key === 'Enter') {
      sendChatMessage();
    }
  };

  // 最大化聊天窗口
  window.maximizeChatWindow = function() {
    const container = document.getElementById('chatWindowContainer');
    const btn = document.getElementById('maximizeBtn');
    
    if (container.classList.contains('maximized')) {
      // 恢复窗口
      container.classList.remove('maximized');
      btn.innerHTML = '<span>⛶</span>';
      btn.title = '最大化';
    } else {
      // 最大化窗口
      container.classList.add('maximized');
      btn.innerHTML = '<span>⛷</span>';
      btn.title = '恢复';
    }
  };

  // 最小化聊天窗口
  window.minimizeChatWindow = function() {
    document.getElementById('chatWindowContainer').style.display = 'none';
    document.getElementById('chatWelcome').style.display = 'flex';
  };

  // 关闭聊天窗口
  window.closeChatWindow = function() {
    document.getElementById('chatWindowContainer').style.display = 'none';
    document.getElementById('chatWelcome').style.display = 'flex';
    window.currentSessionId = null;
    
    // 清除选中状态
    document.querySelectorAll('.chat-item-new').forEach(item => item.classList.remove('active'));
  };

  // 搜索聊天
  window.searchChats = function() {
    const searchTerm = document.getElementById('chatSearchInput').value.toLowerCase();
    const chatItems = document.querySelectorAll('.chat-item-new, .friend-item-new');
    
    chatItems.forEach(item => {
      const name = item.querySelector('.chat-name-new, .friend-name-new')?.textContent.toLowerCase() || '';
      const preview = item.querySelector('.chat-preview-new')?.textContent.toLowerCase() || '';
      
      if (name.includes(searchTerm) || preview.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // 刷新聊天列表
  window.refreshChatList = function() {
    renderMessages();
  };

  // 处理通知点击
  window.handleNotificationClick = function(notificationId) {
    // 标记通知为已读
    window.chatStorage.markNotificationRead(notificationId);
    
    // 刷新页面
    renderMessages();
  };

  // 渲染用户好友管理页面
  window.renderUserFriends = function() {
    if (!requireAuth()) return;
    
    const user = getAuth();
    if (user.role === 'lawyer') {
      // 律师用户重定向到律师端好友管理
      renderFriendRequests();
      return;
    }
    
    const friends = window.chatStorage.getFriends();
    const myFriends = friends.filter(f => f.userId === user.id && f.status === 'accepted');
    const pendingRequests = friends.filter(f => f.userId === user.id && f.status === 'pending');
    const rejectedRequests = friends.filter(f => f.userId === user.id && f.status === 'rejected');
    
    // 获取未读通知数量
    const notifications = window.chatStorage.getNotifications();
    const unreadNotifications = notifications.filter(n => n.toUserId === user.id && !n.read);
    
    setApp(html`
      <div class="friend-requests-container">
        <div class="friend-requests-header">
          <button class="btn secondary" onclick="renderProfile()">← 返回个人资料</button>
          <h1>我的好友 ${unreadNotifications.length > 0 ? `<span class="notification-badge">${unreadNotifications.length}</span>` : ''}</h1>
        </div>
        
        <div class="friend-requests-tabs">
          <button class="tab-btn active" onclick="switchUserFriendTab('friends')">我的好友 (${myFriends.length})</button>
          <button class="tab-btn" onclick="switchUserFriendTab('pending')">待处理 (${pendingRequests.length})</button>
          <button class="tab-btn" onclick="switchUserFriendTab('notifications')">通知中心 (${unreadNotifications.length})</button>
        </div>
        
        <div class="friend-requests-content">
          <!-- 我的好友 -->
          <div id="friendsTab" class="tab-content active">
            <div class="section-header">
              <h2>我的律师好友</h2>
            </div>
            
            <div class="friends-list">
              ${myFriends.length === 0 ? 
                '<div class="empty-state"><p>暂无律师好友，去律师推广页面添加好友吧！</p><button class="btn primary" onclick="location.hash = \'#/lawyers\'">前往律师推广</button></div>' :
                myFriends.map(friend => html`
                  <div class="friend-card">
                    <div class="friend-info">
                      <div class="user-avatar">${friend.lawyerUsername.charAt(0).toUpperCase()}</div>
                      <div class="user-details">
                        <h3>${friend.lawyerUsername}</h3>
                        <p>律师好友</p>
                        <span class="friend-time">成为好友时间：${new Date(friend.acceptedAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <div class="friend-actions">
                      <button class="btn primary small" onclick="startChat('${friend.lawyerId}', '${friend.lawyerUsername}')">开始聊天</button>
                      <button class="btn danger small" onclick="removeFriend('${friend.id}')">删除好友</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>
          </div>
          
          <!-- 待处理申请 -->
          <div id="pendingTab" class="tab-content">
            <div class="section-header">
              <h2>待处理的好友申请</h2>
            </div>
            
            <div class="friend-requests-list">
              ${pendingRequests.length === 0 ? 
                '<div class="empty-state"><p>暂无待处理的好友申请</p></div>' :
                pendingRequests.map(request => html`
                  <div class="friend-request-card">
                    <div class="request-info">
                      <div class="user-avatar">${request.lawyerUsername.charAt(0).toUpperCase()}</div>
                      <div class="user-details">
                        <h3>${request.lawyerUsername}</h3>
                        <p>申请时间：${new Date(request.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div class="request-actions">
                      <span class="status-badge pending">等待律师处理</span>
                    </div>
                  </div>
                `).join('')
              }
            </div>
          </div>
          
          <!-- 通知中心 -->
          <div id="notificationsTab" class="tab-content">
            <div class="section-header">
              <h2>通知中心</h2>
              <button class="btn secondary" onclick="markAllNotificationsRead()">全部标记已读</button>
            </div>
            
            <div class="notifications-list">
              ${notifications.length === 0 ? 
                '<div class="empty-state"><p>暂无通知</p></div>' :
                notifications.map(notification => html`
                  <div class="notification-card ${notification.read ? 'read' : 'unread'}">
                    <div class="notification-icon">${notification.type === 'friend_request' ? '👥' : notification.type === 'friend_accepted' ? '✅' : '💬'}</div>
                    <div class="notification-content">
                      <h4>${notification.title}</h4>
                      <p>${notification.content}</p>
                      <span class="notification-time">${new Date(notification.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="notification-actions">
                      <button class="btn secondary small" onclick="markNotificationRead('${notification.id}')">标记已读</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>
          </div>
        </div>
      </div>
    `);
  };

  // 切换用户好友管理标签页
  window.switchUserFriendTab = function(tabName) {
    // 移除所有活动状态
    document.querySelectorAll('.friend-requests-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.friend-requests-content .tab-content').forEach(content => content.classList.remove('active'));
    
    // 激活当前标签页
    document.querySelector(`[onclick="switchUserFriendTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
  };

  // 渲染好友申请页面（律师端）
  window.renderFriendRequests = function() {
    if (!requireAuth()) return;
    
    const user = getAuth();
    if (user.role !== 'lawyer') {
      setApp(html`
        <div class="admin-container">
          <div class="admin-header">
            <h1>权限不足</h1>
            <p class="admin-subtitle">只有律师可以查看好友申请</p>
            <div style="margin-top: 24px;">
              <a href="#/" class="btn primary">返回首页</a>
            </div>
          </div>
        </div>
      `);
      return;
    }
    
    const friends = window.chatStorage.getFriends();
    const pendingRequests = friends.filter(f => f.lawyerId === user.id && f.status === 'pending');
    const acceptedFriends = friends.filter(f => f.lawyerId === user.id && f.status === 'accepted');
    
    // 获取未读通知数量
    const notifications = window.chatStorage.getNotifications();
    const unreadNotifications = notifications.filter(n => n.toUserId === user.id && !n.read);
    
    setApp(html`
      <div class="friend-requests-container">
        <div class="friend-requests-header">
          <button class="btn secondary" onclick="renderLawyerPortal()">← 返回工作台</button>
          <h1>好友管理 ${unreadNotifications.length > 0 ? `<span class="notification-badge">${unreadNotifications.length}</span>` : ''}</h1>
        </div>
        
        <div class="friend-requests-tabs">
          <button class="tab-btn active" onclick="switchFriendTab('requests')">好友申请 (${pendingRequests.length})</button>
          <button class="tab-btn" onclick="switchFriendTab('friends')">我的好友 (${acceptedFriends.length})</button>
          <button class="tab-btn" onclick="switchFriendTab('notifications')">通知中心 (${unreadNotifications.length})</button>
        </div>
        
        <div class="friend-requests-content">
          <!-- 好友申请 -->
          <div id="requestsTab" class="tab-content active">
            <div class="section-header">
              <h2>待处理的好友申请</h2>
            </div>
            
            <div class="friend-requests-list">
              ${pendingRequests.length === 0 ? 
                '<div class="empty-state"><p>暂无待处理的好友申请</p></div>' :
                pendingRequests.map(request => html`
                  <div class="friend-request-card">
                    <div class="request-info">
                      <div class="request-user">
                        <div class="user-avatar">${request.userName.charAt(0).toUpperCase()}</div>
                        <div class="user-details">
                          <h3>${request.userName}</h3>
                          <p>申请时间：${new Date(request.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div class="request-actions">
                      <button class="btn success small" onclick="handleFriendRequest('${request.id}', 'accept')">通过</button>
                      <button class="btn danger small" onclick="handleFriendRequest('${request.id}', 'reject')">拒绝</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>
          </div>
          
          <!-- 我的好友 -->
          <div id="friendsTab" class="tab-content">
            <div class="section-header">
              <h2>我的好友列表</h2>
            </div>
            
            <div class="friends-list">
              ${acceptedFriends.length === 0 ? 
                '<div class="empty-state"><p>暂无好友</p></div>' :
                acceptedFriends.map(friend => html`
                  <div class="friend-card">
                    <div class="friend-info">
                      <div class="user-avatar">${friend.userName.charAt(0).toUpperCase()}</div>
                      <div class="user-details">
                        <h3>${friend.userName}</h3>
                        <p>成为好友时间：${new Date(friend.acceptedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div class="friend-actions">
                      <button class="btn primary small" onclick="startChat('${friend.userId}', '${friend.userName}')">开始聊天</button>
                      <button class="btn danger small" onclick="removeFriend('${friend.id}')">删除好友</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>
          </div>
          
          <!-- 通知中心 -->
          <div id="notificationsTab" class="tab-content">
            <div class="section-header">
              <h2>通知中心</h2>
              <button class="btn secondary small" onclick="markAllNotificationsRead()">全部标记为已读</button>
            </div>
            
            <div class="notifications-list">
              ${unreadNotifications.length === 0 ? 
                '<div class="empty-state"><p>暂无未读通知</p></div>' :
                unreadNotifications.map(notification => html`
                  <div class="notification-card ${notification.read ? 'read' : 'unread'}">
                    <div class="notification-info">
                      <div class="notification-icon">
                        ${notification.type === 'friend_request' ? '👥' : notification.type === 'friend_accepted' ? '✅' : '📨'}
                      </div>
                      <div class="notification-content">
                        <h4>${notification.title}</h4>
                        <p>${notification.content}</p>
                        <div class="notification-meta">
                          <span>发送者：${notification.fromUserName}</span>
                          <span>时间：${new Date(notification.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div class="notification-actions">
                      ${notification.type === 'friend_request' ? `
                        <button class="btn success small" onclick="handleFriendRequest('${notification.data.friendRequestId}', 'accept')">通过</button>
                        <button class="btn danger small" onclick="handleFriendRequest('${notification.data.friendRequestId}', 'reject')">拒绝</button>
                      ` : ''}
                      <button class="btn secondary small" onclick="markNotificationRead('${notification.id}')">标记已读</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>
          </div>
        </div>
      </div>
    `);
  };

  // 切换好友标签页
  window.switchFriendTab = function(tabName) {
    // 移除所有活动状态
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // 激活选中的标签页
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
  };

  // 开始聊天
  window.startChat = function(userId, userName) {
    const user = getAuth();
    if (!user) {
      alert('请先登录');
      return;
    }

    // 创建或获取聊天会话
    const session = window.chatStorage.getOrCreateSession(
      user.id, 
      userId, 
      user.username, 
      userName
    );
    
    // 显示聊天界面
    renderChat(session.id);
  };

  // 渲染聊天界面
  window.renderChat = function(sessionId) {
    const user = getAuth();
    if (!user) return;
    
    const sessions = window.chatStorage.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    
    if (!session) return;
    
    const messages = window.chatStorage.getSessionMessages(sessionId);
    const otherUser = session.userId1 === user.id ? 
      { id: session.userId2, name: session.userName2 } : 
      { id: session.userId1, name: session.userName1 };
    
    setApp(html`
      <div class="chat-container">
        <div class="chat-header">
          <button class="btn secondary" onclick="renderMessages()">← 返回私信</button>
          <h1>与 ${otherUser.name} 的聊天</h1>
        </div>
        
        <div class="chat-messages" id="chatMessages">
          ${messages.map(message => html`
            <div class="message ${message.senderId === user.id ? 'sent' : 'received'}">
              <div class="message-content">
                <div class="message-text">${message.content}</div>
                <div class="message-time">${new Date(message.createdAt).toLocaleTimeString()}</div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="chat-input">
          <input type="text" id="chatInput" placeholder="输入消息..." onkeypress="handleChatKeyPress(event, '${sessionId}')">
          <button class="btn primary" onclick="sendMessage('${sessionId}')">发送</button>
        </div>
      </div>
    `);
    
    // 滚动到底部
    setTimeout(() => {
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  };

  // 发送消息
  window.sendMessage = function(sessionId) {
    const input = document.getElementById('chatInput');
    const content = input.value.trim();
    
    if (!content) return;
    
    const user = getAuth();
    if (!user) return;
    
    const message = {
      id: window.chatStorage.generateId(),
      sessionId: sessionId,
      senderId: user.id,
      senderName: user.username,
      content: content,
      createdAt: Date.now()
    };
    
    window.chatStorage.addMessage(message);
    
    input.value = '';
    renderChat(sessionId);
  };

  // 处理聊天输入框回车
  window.handleChatKeyPress = function(event, sessionId) {
    if (event.key === 'Enter') {
      sendMessage(sessionId);
    }
  };

  // 删除好友
  window.removeFriend = function(friendId) {
    if (!confirm('确定要删除这个好友吗？')) return;
    
    window.chatStorage.removeFriend(friendId);
    
    // 根据当前用户角色决定刷新哪个页面
    const user = getAuth();
    if (user.role === 'lawyer') {
      renderFriendRequests();
    } else {
      renderUserFriends();
    }
    
    alert('好友已删除');
  };

  // 标记通知为已读
  window.markNotificationRead = function(notificationId) {
    window.chatStorage.markNotificationRead(notificationId);
    
    // 根据当前用户角色决定刷新哪个页面
    const user = getAuth();
    if (user.role === 'lawyer') {
      renderFriendRequests();
    } else {
      renderUserFriends();
    }
  };

  // 标记所有通知为已读
  window.markAllNotificationsRead = function() {
    window.chatStorage.markAllNotificationsRead();
    
    // 根据当前用户角色决定刷新哪个页面
    const user = getAuth();
    if (user.role === 'lawyer') {
      renderFriendRequests();
    } else {
      renderUserFriends();
    }
  };

  // 律师端页面
  function renderLawyerPortal() {
    if (!requireAuth()) return;
    
    const user = getAuth();
    if (user.role !== 'lawyer') {
      setApp(html`
        <div class="admin-container">
          <div class="admin-header">
            <h1>权限不足</h1>
            <p class="admin-subtitle">您没有访问律师端的权限</p>
            <div style="margin-top: 24px;">
              <a href="#/" class="btn primary">返回首页</a>
            </div>
          </div>
        </div>
      `);
      return;
    }
    
    // 检查律师信息是否完善
    const lawyerInfo = readStorage(STORAGE_KEYS.lawyers, []);
    const lawyerInfoCheck = lawyerInfo.find(l => l.username === user.username);
    
    if (!lawyerInfoCheck || !lawyerInfoCheck.name || !lawyerInfoCheck.firm) {
      // 显示信息完善页面
      setApp(html`
        <div class="lawyer-portal-container">
          <div class="lawyer-portal-header">
            <div class="lawyer-welcome">
              <h1>完善律师信息</h1>
              <p class="lawyer-subtitle">请完善您的律师信息以使用律师端功能</p>
            </div>
          </div>
          
          <div class="lawyer-content">
            <div class="profile-card">
              <div class="profile-header">
                <div class="profile-avatar">${user.username.charAt(0).toUpperCase()}</div>
                <div class="profile-info">
                  <h2>${user.username}</h2>
                  <p class="profile-firm">请完善您的律师信息</p>
                </div>
              </div>
              
              <form id="lawyerProfileForm" class="profile-form">
                <div class="form-group">
                  <label for="lawyerName">律师姓名 *</label>
                  <input type="text" id="lawyerName" name="name" required placeholder="请输入您的真实姓名">
                </div>
                
                <div class="form-group">
                  <label for="lawyerFirm">律师事务所 *</label>
                  <input type="text" id="lawyerFirm" name="firm" required placeholder="请输入律师事务所名称">
                </div>
                
                <div class="form-group">
                  <label for="lawyerAreas">专业领域 *</label>
                  <input type="text" id="lawyerAreas" name="areas" required placeholder="请输入专业领域，用逗号分隔">
                  <small>例如：民商事,公司法,合同法</small>
                </div>
                
                <div class="form-group">
                  <label for="lawyerBio">个人简介</label>
                  <textarea id="lawyerBio" name="bio" rows="4" placeholder="请输入您的个人简介"></textarea>
                </div>
                
                <div class="form-group">
                  <label for="lawyerPhone">联系电话</label>
                  <input type="tel" id="lawyerPhone" name="phone" placeholder="请输入联系电话">
                </div>
                
                <div class="form-group">
                  <label for="lawyerEmail">邮箱地址</label>
                  <input type="email" id="lawyerEmail" name="email" placeholder="请输入邮箱地址">
                </div>
                
                <div class="form-actions">
                  <button type="submit" class="btn primary">保存信息</button>
                  <button type="button" class="btn secondary" onclick="location.hash='#/'">稍后完善</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `);
      
      // 添加表单提交事件
      document.getElementById('lawyerProfileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveLawyerProfile();
      });
      return;
    }
    
    // 获取律师数据
    const lawyerData = readStorage(STORAGE_KEYS.lawyers, []);
    const lawyerProfile = lawyerData.find(l => l.username === user.username) || {
      name: user.username,
      firm: '未设置',
      areas: ['民商事'],
      bio: '专业律师',
      phone: '',
      email: '',
      verified: false
    };
    
    // 获取律师相关数据
    const lawyerCases = readStorage('lawyer_cases', []);
    const takenCases = readStorage('legal_cases', []).filter(c => c.lawyerId === user.id);
    const cases = [...lawyerCases, ...takenCases]; // 合并自建案件和接单案件
    const clients = readStorage('lawyer_clients', []);
    const appointments = readStorage('lawyer_appointments', []);
    
    setApp(html`
      <div class="lawyer-portal-container">
        <div class="lawyer-portal-header">
            <div class="lawyer-welcome">
              <h1>律师工作台</h1>
              <p class="lawyer-subtitle">欢迎回来，${lawyerProfile.name}律师</p>
            </div>
            <div class="lawyer-profile">
              <div class="lawyer-avatar">${lawyerProfile.name.charAt(0)}</div>
              <div class="lawyer-info">
                <div class="lawyer-name">${lawyerProfile.name}</div>
                <div class="lawyer-firm">${lawyerProfile.firm}</div>
              </div>
            </div>
        </div>
        
        <!-- 统计概览 -->
        <div class="lawyer-stats">
          <div class="stat-card">
            <div class="stat-icon">📋</div>
            <div class="stat-info">
              <div class="stat-number">${cases.length}</div>
              <div class="stat-label">总案件数</div>
              <div class="stat-detail">自建: ${lawyerCases.length} | 接单: ${takenCases.length}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <div class="stat-number">${clients.length}</div>
              <div class="stat-label">客户数量</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-info">
              <div class="stat-number">${appointments.filter(a => new Date(a.date) >= new Date()).length}</div>
              <div class="stat-label">待办预约</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
              <div class="stat-number">¥${(Math.random() * 100000).toFixed(0)}</div>
              <div class="stat-label">本月收入</div>
            </div>
          </div>
        </div>
        
        <!-- 功能模块 -->
        <div class="lawyer-modules">
          <div class="module-grid">
            <div class="lawyer-module-card" onclick="renderLawyerCases()">
              <div class="module-icon">📋</div>
              <div class="module-content">
                <h3>案件管理</h3>
                <p>管理在办案件和案件进度</p>
                <div class="module-count">${cases.length} 个案件</div>
              </div>
            </div>
            <div class="lawyer-module-card" onclick="renderLawyerClients()">
              <div class="module-icon">👥</div>
              <div class="module-content">
                <h3>客户管理</h3>
                <p>管理客户信息和沟通记录</p>
                <div class="module-count">${clients.length} 个客户</div>
              </div>
            </div>
            <div class="lawyer-module-card" onclick="renderLawyerAppointments()">
              <div class="module-icon">📅</div>
              <div class="module-content">
                <h3>预约管理</h3>
                <p>处理客户预约和咨询安排</p>
                <div class="module-count">${appointments.length} 个预约</div>
              </div>
            </div>
            <div class="lawyer-module-card" onclick="renderLawyerProfile()">
              <div class="module-icon">👤</div>
              <div class="module-content">
                <h3>个人资料</h3>
                <p>管理个人信息和专业领域</p>
                <div class="module-count">${lawyerProfile.verified ? '已认证' : '未认证'}</div>
              </div>
            </div>
            <div class="lawyer-module-card" onclick="renderLawyerServices()">
              <div class="module-icon">⚖️</div>
              <div class="module-content">
                <h3>服务展示</h3>
                <p>展示专业领域和服务能力</p>
                <div class="module-count">${lawyerProfile.areas.length} 个领域</div>
              </div>
            </div>
              <div class="lawyer-module-card" onclick="renderLawyerAnalytics()">
                <div class="module-icon">📊</div>
                <div class="module-content">
                  <h3>数据分析</h3>
                  <p>查看收入统计和业务分析</p>
                  <div class="module-count">业务报表</div>
                </div>
              </div>
              <div class="lawyer-module-card" onclick="renderFriendRequests()">
                <div class="module-icon">👥</div>
                <div class="module-content">
                  <h3>好友管理</h3>
                  <p>管理客户好友和聊天</p>
                  <div class="module-count">${window.chatStorage.getFriends().filter(f => f.lawyerId === user.id && f.status === 'pending').length} 个申请</div>
                </div>
              </div>
              <div class="lawyer-module-card" onclick="renderInteraction()">
                <div class="module-icon">💬</div>
                <div class="module-content">
                  <h3>法律互动</h3>
                  <p>处理咨询和接单案件</p>
                  <div class="module-count">${readStorage('legal_consultations', []).filter(c => c.status === 'pending').length} 个待回复</div>
                </div>
              </div>
          </div>
        </div>
      </div>
    `);
  }

  function renderHome() {
    const user = getAuth();
    if (!user || !user.username) {
      // 显示登录提示页面
      setApp(html`
        <div class="login-prompt-container">
          <div class="login-prompt-card">
            <div class="login-prompt-header">
              <h1>欢迎来到KnowHow</h1>
              <p>请先登录以访问平台内容</p>
            </div>
            <div class="login-prompt-content">
              <div class="login-prompt-features">
                <div class="feature-item">
                  <div class="feature-icon">🎬</div>
                  <div class="feature-text">
                    <h3>影视中心</h3>
                    <p>利农纪录片与普法文园</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">📰</div>
                  <div class="feature-text">
                    <h3>时政要闻</h3>
                    <p>政务动态与政策解读</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">💬</div>
                  <div class="feature-text">
                    <h3>法律论坛</h3>
                    <p>专业讨论与经验分享</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">⚖️</div>
                  <div class="feature-text">
                    <h3>法律时效</h3>
                    <p>法律变更与生效时间</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">👨‍💼</div>
                  <div class="feature-text">
                    <h3>律师推广</h3>
                    <p>专业律师与服务展示</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">💬</div>
                  <div class="feature-text">
                    <h3>法律互动</h3>
                    <p>在线咨询与案件对接</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">👥</div>
                  <div class="feature-text">
                    <h3>好友聊天</h3>
                    <p>与律师直接沟通交流</p>
                  </div>
                </div>
              </div>
              <div class="login-prompt-actions">
                <button class="btn primary large" onclick="showAuthModal('login')">
                  <span>🔑</span> 立即登录
                </button>
                <button class="btn secondary large" onclick="showAuthModal('register')">
                  <span>📝</span> 注册账号
                </button>
              </div>
              <div class="login-prompt-demo">
                <div class="small">演示账号：</div>
                <div class="small">
                  管理员：<span class="kbd">admin</span> / <span class="kbd">admin123</span>
                </div>
                <div class="small">
                  用户：<span class="kbd">user</span> / <span class="kbd">123456</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
      return;
    }
    
    // 获取统计数据
    const films = readStorage(STORAGE_KEYS.films, []);
    const news = readStorage(STORAGE_KEYS.news, []);
    const forum = readStorage(STORAGE_KEYS.forum, []);
    const community = readStorage(STORAGE_KEYS.community, []);
    const qa = readStorage(STORAGE_KEYS.qa, []);
    const lawUpdates = readStorage(STORAGE_KEYS.lawUpdates, []);
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    
    // 获取最新动态
    const recentPosts = forum.slice().sort((a,b) => b.createdAt - a.createdAt).slice(0, 3);
    const recentNews = news.slice().sort((a,b) => b.date.localeCompare(a.date)).slice(0, 2);
    
    setApp(html`
      <div class="home-container">
        <!-- 欢迎横幅 -->
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">KnowHow平台</h1>
            <p class="hero-subtitle">聚焦普法传播与法律服务，构建法治社会新生态</p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">${films.length}</div>
                <div class="stat-label">影视作品</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${news.length}</div>
                <div class="stat-label">时政要闻</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${forum.length}</div>
                <div class="stat-label">论坛帖子</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${lawyers.length}</div>
                <div class="stat-label">律师名片</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 功能模块 -->
        <section class="modules-section">
          <h2 class="section-title">功能模块</h2>
          <div class="grid cols-3">
            ${[
              { href: '#/films', title: '影视中心', desc: '利农纪录片 · 普法文园', icon: '🎬', color: '#3b82f6' },
              { href: '#/news', title: '时政要闻', desc: '政务动态 · 法治热词', icon: '📰', color: '#ef4444' },
              { href: '#/forum', title: '法律论坛', desc: '专业讨论 · 经验分享', icon: '💬', color: '#10b981' },
              { href: '#/law-updates', title: '法律时效', desc: '法规变更 · 生效时间', icon: '⚖️', color: '#06b6d4' },
              { href: '#/lawyers', title: '律师推广', desc: '专业律师 · 服务展示', icon: '👨‍💼', color: '#84cc16' },
              { href: '#/interaction', title: '法律互动', desc: '在线咨询 · 案件对接', icon: '💬', color: '#8b5cf6' },
              { href: '#/messages', title: '私信', desc: '与律师直接沟通交流', icon: '💬', color: '#f59e0b' },
              { href: '#/lawyer-portal', title: '律师工作台', desc: '专业案件管理平台', icon: '⚖️', color: '#667eea' },
            ].map(x => html`
              ${x.onclick ? 
                `<div class="module-card" onclick="${x.onclick}" style="--accent-color: ${x.color}; cursor: pointer;">
                  <div class="module-icon">${x.icon}</div>
                  <div class="module-content">
                    <div class="module-title">${x.title}</div>
                    <div class="module-desc">${x.desc}</div>
                  </div>
                  <div class="module-arrow">→</div>
                </div>` :
                `<a class="module-card" href="${x.href}" style="--accent-color: ${x.color}">
                  <div class="module-icon">${x.icon}</div>
                  <div class="module-content">
                    <div class="module-title">${x.title}</div>
                    <div class="module-desc">${x.desc}</div>
                  </div>
                  <div class="module-arrow">→</div>
                </a>`
              }
            `).join('')}
          </div>
        </section>

        <!-- 最新动态 -->
        <section class="activity-section">
          <h2 class="section-title">最新动态</h2>
          <div class="grid cols-2">
            <div class="activity-card">
              <h3>📝 最新论坛讨论</h3>
              <div class="activity-list">
                ${recentPosts.length > 0 ? recentPosts.map(post => html`
                  <div class="activity-item">
                    <div class="activity-title">${post.title}</div>
                    <div class="activity-meta">${new Date(post.createdAt).toLocaleDateString()} · ${(post.replies||[]).length} 回复</div>
                  </div>
                `).join('') : '<div class="empty">暂无讨论</div>'}
              </div>
            </div>
            <div class="activity-card">
              <h3>📰 最新时政要闻</h3>
              <div class="activity-list">
                ${recentNews.length > 0 ? recentNews.map(item => html`
                  <div class="activity-item">
                    <div class="activity-title">${item.title}</div>
                    <div class="activity-meta">${item.date} · ${(item.tags||[]).join('、') || '—'}</div>
                  </div>
                `).join('') : '<div class="empty">暂无要闻</div>'}
              </div>
            </div>
          </div>
        </section>

        <!-- 快速操作 -->
        <section class="quick-actions">
          <h2 class="section-title">快速操作</h2>
          <div class="action-buttons">
            <a href="#/forum" class="action-btn primary">📝 发布讨论</a>
            <a href="#/qa" class="action-btn secondary">❓ 提问咨询</a>
            <a href="#/community" class="action-btn secondary">🌟 分享动态</a>
            <a href="#/lawyers" class="action-btn secondary">👨‍💼 律师推广</a>
          </div>
        </section>
      </div>
    `);
  }

  function renderFilms() {
    if (!requireAuth()) return;
    const all = readStorage(STORAGE_KEYS.films, []);
    let active = sessionStorage.getItem('films_tab') || '利农';

    const renderList = (category, keyword) => {
      const list = all.filter(x => x.category === category && (!keyword || x.title.includes(keyword) || x.desc.includes(keyword)));
      if (list.length === 0) return `<div class="empty">暂无内容</div>`;
      
      // 检查用户权限
      const user = getAuth();
      const isAdmin = user && user.role === 'admin';
      
      return `<div class="films-grid">${list.map(x => html`
        <div class="film-card" data-category="${x.category}">
          <div class="film-poster">
            <div class="film-category-badge">${x.category}</div>
            <div class="film-duration">${x.duration}</div>
            <div class="film-overlay">
              <button class="play-btn" onclick="playFilm('${x.id}')">
                <span class="play-icon">▶</span>
              </button>
            </div>
          </div>
          <div class="film-content">
            <div class="film-title">${x.title}</div>
            <div class="film-desc">${x.desc}</div>
            <div class="film-stats">
              <span class="stat-item">👀 ${x.views || 0}</span>
              <span class="stat-item">💬 ${(x.comments||[]).length}</span>
              <span class="stat-item">⭐ ${x.rating || '暂无评分'}</span>
            </div>
            <div class="film-actions">
              <button class="action-btn primary" onclick="showFilmDetail('${x.id}')">查看详情</button>
              <button class="action-btn secondary" onclick="showFilmComments('${x.id}')">评论</button>
              ${isAdmin ? html`
                <button class="action-btn danger" onclick="editFilm('${x.id}')">编辑</button>
                <button class="action-btn danger" onclick="deleteFilm('${x.id}')">删除</button>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('')}</div>`;
    };

    setApp(html`
      <div class="films-page">
        <div class="films-header">
          <div class="header-content">
            <h1>影视中心</h1>
            <p class="header-subtitle">利农纪录片 · 普法文园 · 精彩内容等你发现</p>
          </div>
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">${all.length}</span>
              <span class="stat-label">总影片</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.filter(x => x.category === '利农').length}</span>
              <span class="stat-label">利农系列</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.filter(x => x.category === '普法文园').length}</span>
              <span class="stat-label">普法文园</span>
            </div>
          </div>
        </div>
        
        <div class="films-controls">
          <div class="tabs" role="tablist">
            ${['利农', '普法文园'].map(name => html`
              <button class="tab ${active === name ? 'active' : ''}" data-tab="${name}" role="tab">
                <span class="tab-icon">${name === '利农' ? '🌾' : '📚'}</span>
                <span class="tab-text">${name}</span>
                <span class="tab-count">${all.filter(x => x.category === name).length}</span>
              </button>
            `).join('')}
          </div>
          
          <div class="search-controls">
            <div class="search-box">
              <input id="filmSearch" class="search-input" placeholder="搜索影片标题、简介或关键词..." />
              <button class="search-btn" onclick="performSearch()">🔍</button>
            </div>
            <div class="filter-controls">
              <select id="sortBy" class="filter-select">
                <option value="title">按标题排序</option>
                <option value="duration">按时长排序</option>
                <option value="comments">按评论数排序</option>
              </select>
              <button class="filter-btn" onclick="toggleFilters()">筛选</button>
            </div>
            ${(() => {
              const user = getAuth();
              const isAdmin = user && user.role === 'admin';
              return isAdmin ? '<button id="addFilm" class="add-film-btn">+ 新增影片</button>' : '';
            })()}
          </div>
        </div>
        
        <div id="filmList" class="films-content">${renderList(active)}</div>
      </div>
    `);

    const $filmList = document.getElementById('filmList');
    document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
      active = btn.dataset.tab;
      sessionStorage.setItem('films_tab', active);
      $filmList.innerHTML = renderList(active, document.getElementById('filmSearch').value.trim());
      document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === active));
    }));
    document.getElementById('filmSearch').addEventListener('input', (e) => {
      $filmList.innerHTML = renderList(active, e.target.value.trim());
    });
    const addFilmBtn = document.getElementById('addFilm');
    if (addFilmBtn) {
      addFilmBtn.addEventListener('click', () => {
        const user = getAuth();
        if (user && user.role !== 'admin' && user.role !== 'superadmin') {
          alert('只有管理员可以添加影片');
          return;
        }
        const title = prompt('影片标题');
        if (!title) return;
        const category = active;
        const desc = prompt('简介') || '';
        const duration = prompt('时长（如 20:00）') || '';
        writeStorage(STORAGE_KEYS.films, [...all, { id: nid(), title, category, desc, duration }]);
        renderFilms();
      });
    }

    // 全局函数：编辑影视
    window.editFilm = (id) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以编辑影片');
        return;
      }
      const film = all.find(x => x.id === id);
      if (!film) return;
      
      const title = prompt('影片标题', film.title);
      if (title === null) return;
      const desc = prompt('简介', film.desc);
      const duration = prompt('时长（如 20:00）', film.duration);
      
      const updated = all.map(x => x.id === id ? { ...x, title, desc, duration } : x);
      writeStorage(STORAGE_KEYS.films, updated);
      renderFilms();
    };

    // 全局函数：删除影视
    window.deleteFilm = (id) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以删除影片');
        return;
      }
      if (!confirm('确定要删除这部影片吗？')) return;
      const updated = all.filter(x => x.id !== id);
      writeStorage(STORAGE_KEYS.films, updated);
      renderFilms();
    };

    // 全局函数：显示影片评论
    window.showFilmComments = (id) => {
      const films = readStorage(STORAGE_KEYS.films, []);
      const film = films.find(x => x.id === id);
      if (!film) return;
      
      const comments = film.comments || [];
      const user = getAuth();
      
      setApp(html`
        <div class="film-comments-page">
          <div class="comments-header">
            <button class="btn secondary" onclick="renderFilms()">← 返回影视</button>
            <h2>${film.title} - 评论</h2>
          </div>
          <div class="comments-content">
            <div class="film-info">
              <div class="film-title">${film.title}</div>
              <div class="film-meta">${film.category} · ${film.duration}</div>
              <div class="film-desc">${film.desc}</div>
            </div>
            
            <div class="add-comment">
              <h3>发表评论</h3>
              <form id="commentForm" class="comment-form">
                <textarea id="commentText" placeholder="写下你的观后感..." required></textarea>
                <button type="submit" class="btn primary">发表评论</button>
              </form>
            </div>
            
            <div class="comments-list">
              <h3>评论列表 (${comments.length})</h3>
              ${comments.length > 0 ? comments.map(comment => html`
                <div class="comment-item">
                  <div class="comment-content">${comment.content}</div>
                  <div class="comment-meta">
                    ${comment.author} · ${new Date(comment.createdAt).toLocaleString()}
                    ${user && user.role === 'admin' ? html`
                      <button class="btn danger small" onclick="deleteComment('${id}', '${comment.id}')">删除</button>
                    ` : ''}
                  </div>
                </div>
              `).join('') : '<div class="empty">暂无评论，快来发表第一个吧！</div>'}
            </div>
          </div>
        </div>
      `);
      
      // 添加评论表单事件
      document.getElementById('commentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('commentText').value.trim();
        if (!content) return;
        
        const newComment = {
          id: nid(),
          content,
          author: user ? user.username : '匿名用户',
          createdAt: Date.now()
        };
        
        const updatedFilms = films.map(f => 
          f.id === id 
            ? { ...f, comments: [...(f.comments || []), newComment] }
            : f
        );
        writeStorage(STORAGE_KEYS.films, updatedFilms);
        showFilmComments(id);
      });
    };

    // 全局函数：删除评论
    window.deleteComment = (filmId, commentId) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以删除评论');
        return;
      }
      if (!confirm('确定要删除这条评论吗？')) return;
      
      const films = readStorage(STORAGE_KEYS.films, []);
      const updatedFilms = films.map(f => 
        f.id === filmId 
          ? { ...f, comments: (f.comments || []).filter(c => c.id !== commentId) }
          : f
      );
      writeStorage(STORAGE_KEYS.films, updatedFilms);
      showFilmComments(filmId);
    };

    // 全局函数：显示影片详情
    window.showFilmDetail = (id) => {
      const films = readStorage(STORAGE_KEYS.films, []);
      const film = films.find(x => x.id === id);
      if (!film) return;
      
      const user = getAuth();
      const isAdmin = user && user.role === 'admin';
      
      setApp(html`
        <div class="film-detail-page">
          <div class="detail-header">
            <button class="btn secondary" onclick="renderFilms()">← 返回影视</button>
            <h1>${film.title}</h1>
            ${isAdmin ? html`
              <div class="admin-actions">
                <button class="btn secondary" onclick="editFilm('${film.id}')">编辑</button>
                <button class="btn danger" onclick="deleteFilm('${film.id}')">删除</button>
              </div>
            ` : ''}
          </div>
          
          <div class="detail-content">
            <div class="film-main">
              <div class="film-poster-large">
                <div class="poster-overlay">
                  <button class="play-btn-large" onclick="playFilm('${film.id}')">
                    <span class="play-icon">▶</span>
                    <span class="play-text">播放预告</span>
                  </button>
                </div>
                <div class="film-badges">
                  <span class="category-badge">${film.category}</span>
                  <span class="duration-badge">${film.duration}</span>
                </div>
              </div>
              
              <div class="film-info">
                <div class="film-meta">
                  <div class="meta-item">
                    <span class="meta-label">分类</span>
                    <span class="meta-value">${film.category}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">时长</span>
                    <span class="meta-value">${film.duration}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">观看次数</span>
                    <span class="meta-value">${film.views || 0}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">评论数</span>
                    <span class="meta-value">${(film.comments||[]).length}</span>
                  </div>
                </div>
                
                <div class="film-description">
                  <h3>影片简介</h3>
                  <p>${film.desc}</p>
                </div>
                
                <div class="film-actions">
                  <button class="action-btn primary" onclick="playFilm('${film.id}')">
                    <span>▶</span> 播放预告
                  </button>
                  <button class="action-btn secondary" onclick="showFilmComments('${film.id}')">
                    <span>💬</span> 查看评论 (${(film.comments||[]).length})
                  </button>
                  <button class="action-btn secondary" onclick="shareFilm('${film.id}')">
                    <span>📤</span> 分享
                  </button>
                </div>
              </div>
            </div>
            
            <div class="film-sidebar">
              <div class="sidebar-section">
                <h3>相关推荐</h3>
                <div class="related-films">
                  ${films.filter(f => f.category === film.category && f.id !== film.id).slice(0, 3).map(f => html`
                    <div class="related-item" onclick="showFilmDetail('${f.id}')">
                      <div class="related-title">${f.title}</div>
                      <div class="related-meta">${f.duration}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              
              <div class="sidebar-section">
                <h3>最新评论</h3>
                <div class="recent-comments">
                  ${(film.comments || []).slice(-3).map(comment => html`
                    <div class="comment-preview">
                      <div class="comment-text">${comment.content}</div>
                      <div class="comment-author">${comment.author}</div>
                    </div>
                  `).join('') || '<div class="empty">暂无评论</div>'}
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
    };

    // 全局函数：播放影片
    window.playFilm = (id) => {
      const films = readStorage(STORAGE_KEYS.films, []);
      const film = films.find(x => x.id === id);
      if (!film) return;
      
      // 增加观看次数
      const updatedFilms = films.map(f => 
        f.id === id ? { ...f, views: (f.views || 0) + 1 } : f
      );
      writeStorage(STORAGE_KEYS.films, updatedFilms);
      
      // 显示播放界面
      setApp(html`
        <div class="film-player">
          <div class="player-header">
            <button class="btn secondary" onclick="showFilmDetail('${id}')">← 返回详情</button>
            <h2>${film.title}</h2>
          </div>
          <div class="player-content">
            <div class="video-container">
              <div class="video-placeholder">
                <div class="play-icon-large">▶</div>
                <p>视频播放器</p>
                <p class="video-info">${film.title} - ${film.duration}</p>
              </div>
            </div>
            <div class="player-info">
              <h3>${film.title}</h3>
              <p>${film.desc}</p>
              <div class="player-actions">
                <button class="btn primary" onclick="showFilmComments('${id}')">查看评论</button>
                <button class="btn secondary" onclick="showFilmDetail('${id}')">影片详情</button>
              </div>
            </div>
          </div>
        </div>
      `);
    };

    // 全局函数：分享影片
    window.shareFilm = (id) => {
      const films = readStorage(STORAGE_KEYS.films, []);
      const film = films.find(x => x.id === id);
      if (!film) return;
      
      const shareUrl = `${window.location.origin}${window.location.pathname}#/films?id=${id}`;
      const shareText = `推荐观看：${film.title} - ${film.category}系列`;
      
      showShareModal(film.title, shareText, shareUrl);
    };

    // 全局函数：执行搜索
    window.performSearch = () => {
      const searchTerm = document.getElementById('filmSearch').value.trim();
      $filmList.innerHTML = renderList(active, searchTerm);
    };

    // 全局函数：切换筛选
    window.toggleFilters = () => {
      const sortBy = document.getElementById('sortBy').value;
      const films = readStorage(STORAGE_KEYS.films, []);
      let sorted = [...films];
      
      switch(sortBy) {
        case 'title':
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'duration':
          sorted.sort((a, b) => a.duration.localeCompare(b.duration));
          break;
        case 'comments':
          sorted.sort((a, b) => (b.comments||[]).length - (a.comments||[]).length);
          break;
      }
      
      const filtered = sorted.filter(x => x.category === active);
      $filmList.innerHTML = filtered.map(x => html`
        <div class="film-card" data-category="${x.category}">
          <div class="film-poster">
            <div class="film-category-badge">${x.category}</div>
            <div class="film-duration">${x.duration}</div>
            <div class="film-overlay">
              <button class="play-btn" onclick="playFilm('${x.id}')">
                <span class="play-icon">▶</span>
              </button>
            </div>
          </div>
          <div class="film-content">
            <div class="film-title">${x.title}</div>
            <div class="film-desc">${x.desc}</div>
            <div class="film-stats">
              <span class="stat-item">👀 ${x.views || 0}</span>
              <span class="stat-item">💬 ${(x.comments||[]).length}</span>
              <span class="stat-item">⭐ ${x.rating || '暂无评分'}</span>
            </div>
            <div class="film-actions">
              <button class="action-btn primary" onclick="showFilmDetail('${x.id}')">查看详情</button>
              <button class="action-btn secondary" onclick="showFilmComments('${x.id}')">评论</button>
              ${isAdmin ? html`
                <button class="action-btn danger" onclick="editFilm('${x.id}')">编辑</button>
                <button class="action-btn danger" onclick="deleteFilm('${x.id}')">删除</button>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('');
    };
  }

  function renderNews() {
    if (!requireAuth()) return;
    const all = readStorage(STORAGE_KEYS.news, []).slice().sort((a, b) => b.date.localeCompare(a.date));
    let currentFilter = 'all';
    let currentSort = 'date';

    const renderNewsList = (keyword = '', filter = 'all', sort = 'date') => {
      let filtered = all.filter(n => {
        const matchesKeyword = !keyword || 
          n.title.toLowerCase().includes(keyword.toLowerCase()) || 
          n.summary.toLowerCase().includes(keyword.toLowerCase()) || 
          (n.tags||[]).some(t => t.toLowerCase().includes(keyword.toLowerCase()));
        
        const matchesFilter = filter === 'all' || 
          (filter === 'recent' && new Date(n.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
          (filter === 'important' && (n.tags||[]).some(t => ['重要', '紧急', '政策'].includes(t)));
        
        return matchesKeyword && matchesFilter;
      });

      // 排序
      switch(sort) {
        case 'date':
          filtered.sort((a, b) => b.date.localeCompare(a.date));
          break;
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'tags':
          filtered.sort((a, b) => (b.tags||[]).length - (a.tags||[]).length);
          break;
      }

      return filtered.map(n => html`
        <div class="news-card" onclick="showNewsDetail('${n.id}')">
          <div class="news-card-header">
            <div class="news-card-title">${n.title}</div>
            <div class="news-card-meta">
              <span class="news-card-date">${n.date}</span>
              <div class="news-card-tags">
                ${(n.tags||[]).map(tag => html`<span class="news-tag">${tag}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="news-card-content">
            <div class="news-card-summary">${n.summary}</div>
            <div class="news-card-actions">
              <button class="news-action-btn primary" onclick="event.stopPropagation(); showNewsDetail('${n.id}')">
                <span>📖</span> 查看详情
              </button>
              <button class="news-action-btn secondary" onclick="event.stopPropagation(); shareNews('${n.id}')">
                <span>📤</span> 分享
              </button>
              ${(() => {
                const user = getAuth();
                const isAdmin = user && user.role === 'admin';
                return isAdmin ? html`
                  <button class="news-action-btn danger" onclick="event.stopPropagation(); editNews('${n.id}')">
                    <span>✏️</span> 编辑
                  </button>
                  <button class="news-action-btn danger" onclick="event.stopPropagation(); deleteNews('${n.id}')">
                    <span>🗑️</span> 删除
                  </button>
                ` : '';
              })()}
            </div>
          </div>
        </div>
      `).join('') || '<div class="empty">未找到匹配的时政信息</div>';
    };

    setApp(html`
      <div class="news-page">
        <div class="news-header">
          <div class="header-content">
            <h1>时政要闻</h1>
            <p class="news-subtitle">政务动态 · 法治热词 · 政策解读</p>
        </div>
          <div class="news-stats">
            <div class="stat-item">
              <span class="stat-number">${all.length}</span>
              <span class="stat-label">总要闻</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.filter(n => new Date(n.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</span>
              <span class="stat-label">近30天</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.filter(n => (n.tags||[]).some(t => ['重要', '紧急', '政策'].includes(t))).length}</span>
              <span class="stat-label">重要新闻</span>
            </div>
          </div>
        </div>
        
        <div class="news-controls">
          <div class="search-controls">
            <div class="news-search-box">
              <input id="newsSearch" class="news-search-input" placeholder="搜索标题、摘要或标签..." />
              <button class="news-search-btn" onclick="performNewsSearch()">🔍</button>
        </div>
            <div class="news-filter-controls">
              <select id="newsFilter" class="news-filter-select">
                <option value="all">全部新闻</option>
                <option value="recent">近30天</option>
                <option value="important">重要新闻</option>
              </select>
              <select id="newsSort" class="news-filter-select">
                <option value="date">按日期排序</option>
                <option value="title">按标题排序</option>
                <option value="tags">按标签数量排序</option>
              </select>
              <button class="news-filter-btn" onclick="applyNewsFilters()">筛选</button>
            </div>
            ${(() => {
              const user = getAuth();
              const isAdmin = user && user.role === 'admin';
              return isAdmin ? '<button id="addNews" class="add-news-btn">+ 新增要闻</button>' : '';
            })()}
          </div>
        </div>
        
        <div id="newsList" class="news-grid">${renderNewsList()}</div>
      </div>
    `);

    const $newsList = document.getElementById('newsList');
    
    // 搜索功能
    document.getElementById('newsSearch').addEventListener('input', (e) => {
      $newsList.innerHTML = renderNewsList(e.target.value, currentFilter, currentSort);
    });

    // 筛选功能
    document.getElementById('newsFilter').addEventListener('change', (e) => {
      currentFilter = e.target.value;
      $newsList.innerHTML = renderNewsList(document.getElementById('newsSearch').value, currentFilter, currentSort);
    });

    // 排序功能
    document.getElementById('newsSort').addEventListener('change', (e) => {
      currentSort = e.target.value;
      $newsList.innerHTML = renderNewsList(document.getElementById('newsSearch').value, currentFilter, currentSort);
    });

    // 新增要闻
    const addNewsBtn = document.getElementById('addNews');
    if (addNewsBtn) {
      addNewsBtn.addEventListener('click', () => {
        const user = getAuth();
        if (user && user.role !== 'admin' && user.role !== 'superadmin') {
          alert('只有管理员可以添加要闻');
          return;
        }
        const title = prompt('要闻标题');
        if (!title) return;
        const date = prompt('发布日期（YYYY-MM-DD）', new Date().toISOString().slice(0,10)) || '';
      const tags = (prompt('标签（用逗号分隔）') || '').split(',').map(s => s.trim()).filter(Boolean);
        const summary = prompt('摘要内容') || '';
        writeStorage(STORAGE_KEYS.news, [...all, { id: nid(), title, date, tags, summary }]);
      renderNews();
    });
  }

    // 全局函数：显示要闻详情
    window.showNewsDetail = (id) => {
      const news = all.find(x => x.id === id);
      if (!news) return;
      
      const user = getAuth();
      const isAdmin = user && user.role === 'admin';
      
    setApp(html`
        <div class="news-detail-page">
          <div class="news-detail-header">
            <button class="btn secondary" onclick="renderNews()">← 返回时政</button>
            <h1>${news.title}</h1>
            ${isAdmin ? html`
              <div class="admin-actions">
                <button class="btn secondary" onclick="editNews('${news.id}')">编辑</button>
                <button class="btn danger" onclick="deleteNews('${news.id}')">删除</button>
          </div>
            ` : ''}
          </div>
          
          <div class="news-detail-content">
            <div class="news-detail-meta">
              <div class="meta-item">
                <span class="meta-label">发布日期</span>
                <span class="meta-value">${news.date}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">标签数量</span>
                <span class="meta-value">${(news.tags||[]).length}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">重要程度</span>
                <span class="meta-value">${(news.tags||[]).some(t => ['重要', '紧急', '政策'].includes(t)) ? '重要' : '普通'}</span>
              </div>
            </div>
            
            <div class="news-detail-tags">
              ${(news.tags||[]).map(tag => html`<span class="news-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="news-detail-summary">${news.summary}</div>
            
            <div class="news-detail-actions">
              <button class="btn primary" onclick="shareNews('${news.id}')">
                <span>📤</span> 分享要闻
              </button>
              <button class="btn secondary" onclick="renderNews()">
                <span>📰</span> 返回列表
              </button>
            </div>
          </div>
        </div>
      `);
    };

    // 全局函数：编辑要闻
    window.editNews = (id) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以编辑要闻');
        return;
      }
      const news = all.find(x => x.id === id);
      if (!news) return;
      
      const title = prompt('要闻标题', news.title);
      if (title === null) return;
      const date = prompt('发布日期（YYYY-MM-DD）', news.date);
      const tags = prompt('标签（用逗号分隔）', (news.tags || []).join(', '));
      const summary = prompt('摘要内容', news.summary);
      
      const updated = all.map(x => x.id === id ? { 
        ...x, 
        title, 
        date, 
        tags: tags ? tags.split(',').map(s => s.trim()).filter(Boolean) : [],
        summary 
      } : x);
      writeStorage(STORAGE_KEYS.news, updated);
      renderNews();
    };

    // 全局函数：删除要闻
    window.deleteNews = (id) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以删除要闻');
        return;
      }
      if (!confirm('确定要删除这条要闻吗？删除后无法恢复。')) return;
      const updated = all.filter(x => x.id !== id);
      writeStorage(STORAGE_KEYS.news, updated);
      renderNews();
    };

    // 全局函数：分享要闻
    window.shareNews = (id) => {
      const news = all.find(x => x.id === id);
      if (!news) return;
      
      const shareUrl = `${window.location.origin}${window.location.pathname}#/news?id=${id}`;
      const shareText = `时政要闻：${news.title} - ${news.date}`;
      
      showShareModal(news.title, shareText, shareUrl);
    };

    // 全局函数：执行搜索
    window.performNewsSearch = () => {
      const searchTerm = document.getElementById('newsSearch').value.trim();
      $newsList.innerHTML = renderNewsList(searchTerm, currentFilter, currentSort);
    };

    // 全局函数：应用筛选
    window.applyNewsFilters = () => {
      const filter = document.getElementById('newsFilter').value;
      const sort = document.getElementById('newsSort').value;
      currentFilter = filter;
      currentSort = sort;
      $newsList.innerHTML = renderNewsList(document.getElementById('newsSearch').value, currentFilter, currentSort);
    };
  }

  function renderForum() {
    if (!requireAuth()) return;
    const all = readStorage(STORAGE_KEYS.forum, []).slice().sort((a,b)=>b.createdAt-a.createdAt);
    let currentFilter = 'all';
    let currentSort = 'date';

    const renderForumList = (keyword = '', filter = 'all', sort = 'date') => {
      let filtered = all.filter(p => {
        const matchesKeyword = !keyword || 
          p.title.toLowerCase().includes(keyword.toLowerCase()) || 
          p.content.toLowerCase().includes(keyword.toLowerCase());
        
        const matchesFilter = filter === 'all' || 
          (filter === 'recent' && new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
          (filter === 'popular' && (p.replies||[]).length > 2);
        
        return matchesKeyword && matchesFilter;
      });

      // 排序
      switch(sort) {
        case 'date':
          filtered.sort((a, b) => b.createdAt - a.createdAt);
          break;
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'replies':
          filtered.sort((a, b) => (b.replies||[]).length - (a.replies||[]).length);
          break;
      }

      return filtered.map(p => html`
        <div class="forum-post">
          <div class="forum-post-header">
            <div class="forum-post-title">${p.title}</div>
            <div class="forum-post-actions">
              <button class="btn secondary small" onclick="editPost('${p.id}')">编辑</button>
              <button class="btn danger small" onclick="deletePost('${p.id}')">删除</button>
            </div>
          </div>
          <div class="forum-post-meta">发表于 ${new Date(p.createdAt).toLocaleString()}</div>
          <div class="forum-post-content">${p.content}</div>
          <div class="forum-post-footer">
            <div class="forum-post-stats">
              <span>💬 ${(p.replies||[]).length} 条回复</span>
              <span>👀 ${p.views || 0} 次查看</span>
              <span>👍 ${p.likes || 0} 个赞</span>
          </div>
            <div class="forum-replies">
              ${(p.replies||[]).slice(-3).map(r => html`
                <div class="forum-reply">
                  <div class="forum-reply-content">${r.text||r.content}</div>
                  <div class="forum-reply-meta">
                    <span>${new Date(r.createdAt).toLocaleString()}</span>
                    <div class="forum-reply-actions">
                      <button class="btn secondary small" onclick="likeReply('${p.id}', '${r.id}')">👍</button>
                    </div>
                  </div>
                </div>
              `).join('')}
              ${(p.replies||[]).length > 3 ? html`<div class="small">还有 ${(p.replies||[]).length - 3} 条回复...</div>` : ''}
            </div>
            <form class="forum-reply-form" data-id="${p.id}">
              <label>回复</label>
            <input name="reply" placeholder="写下你的看法..." required>
              <div class="form-actions">
                <button class="btn primary" type="submit">提交回复</button>
            </div>
          </form>
        </div>
        </div>
      `).join('') || '<div class="empty">还没有帖子，快来发第一个吧！</div>';
    };

    setApp(html`
      <div class="forum-page">
        <div class="forum-header">
          <div class="header-content">
            <h1>法律论坛</h1>
            <p class="forum-subtitle">专业讨论 · 经验分享 · 法律交流</p>
          </div>
          <div class="forum-stats">
            <div class="stat-item">
              <span class="stat-number">${all.length}</span>
              <span class="stat-label">总帖子</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.reduce((sum, p) => sum + (p.replies||[]).length, 0)}</span>
              <span class="stat-label">总回复</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.filter(p => new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</span>
              <span class="stat-label">本周新帖</span>
            </div>
          </div>
        </div>
        
        <div class="forum-controls">
          <div class="search-controls">
            <div class="forum-search-box">
              <input id="forumSearch" class="forum-search-input" placeholder="搜索帖子标题或内容..." />
              <button class="forum-search-btn" onclick="performForumSearch()">🔍</button>
            </div>
            <div class="forum-filter-controls">
              <select id="forumFilter" class="forum-filter-select">
                <option value="all">全部帖子</option>
                <option value="recent">最近一周</option>
                <option value="popular">热门讨论</option>
              </select>
              <select id="forumSort" class="forum-filter-select">
                <option value="date">按时间排序</option>
                <option value="title">按标题排序</option>
                <option value="replies">按回复数排序</option>
              </select>
              <button class="forum-filter-btn" onclick="applyForumFilters()">筛选</button>
            </div>
            <button id="addPost" class="add-post-btn">+ 发布新帖</button>
          </div>
        </div>
        
        <div class="forum-new-post">
          <h3>发布新帖</h3>
          <form id="newPost" class="forum-new-post-form" autocomplete="off">
            <label>帖子标题</label>
            <input name="title" required placeholder="请输入标题">
            <label>帖子内容</label>
            <textarea name="content" required placeholder="说点什么...（支持纯文本）"></textarea>
            <div class="form-actions">
              <button class="btn primary" type="submit">发布帖子</button>
            </div>
          </form>
        </div>
        
        <div id="forumList" class="forum-posts">${renderForumList()}</div>
      </div>
    `);

    const $forumList = document.getElementById('forumList');
    
    // 搜索功能
    document.getElementById('forumSearch').addEventListener('input', (e) => {
      $forumList.innerHTML = renderForumList(e.target.value, currentFilter, currentSort);
    });

    // 筛选功能
    document.getElementById('forumFilter').addEventListener('change', (e) => {
      currentFilter = e.target.value;
      $forumList.innerHTML = renderForumList(document.getElementById('forumSearch').value, currentFilter, currentSort);
    });

    // 排序功能
    document.getElementById('forumSort').addEventListener('change', (e) => {
      currentSort = e.target.value;
      $forumList.innerHTML = renderForumList(document.getElementById('forumSearch').value, currentFilter, currentSort);
    });

    // 发布新帖
    document.getElementById('newPost').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const title = fd.get('title');
      const content = fd.get('content');
      if (!title || !content) return;
      const items = readStorage(STORAGE_KEYS.forum, []);
      items.unshift({ id: nid(), title, content, createdAt: Date.now(), replies: [], views: 0, likes: 0 });
      writeStorage(STORAGE_KEYS.forum, items);
      e.target.reset();
      renderForum();
    });

    // 回复功能
    document.addEventListener('submit', (e) => {
      if (e.target.classList.contains('forum-reply-form')) {
        e.preventDefault();
        const id = e.target.dataset.id;
        const text = new FormData(e.target).get('reply');
        if (!text) return;
        const items = readStorage(STORAGE_KEYS.forum, []);
        const idx = items.findIndex(x => x.id === id);
        if (idx >= 0) {
          items[idx].replies = [...(items[idx].replies||[]), { id: nid(), text, createdAt: Date.now() }];
          writeStorage(STORAGE_KEYS.forum, items);
          renderForum();
        }
        e.target.reset();
      }
    });

    // 全局函数：编辑帖子
    window.editPost = (id) => {
      const posts = readStorage(STORAGE_KEYS.forum, []);
      const post = posts.find(x => x.id === id);
      if (!post) return;
      
      const title = prompt('帖子标题', post.title);
      if (title === null) return;
      const content = prompt('帖子内容', post.content);
      if (content === null) return;
      
      const updated = posts.map(x => x.id === id ? { ...x, title, content, updatedAt: Date.now() } : x);
      writeStorage(STORAGE_KEYS.forum, updated);
      renderForum();
    };

    // 全局函数：删除帖子
    window.deletePost = (id) => {
      if (!confirm('确定要删除这个帖子吗？删除后无法恢复。')) return;
      const posts = readStorage(STORAGE_KEYS.forum, []);
      const updated = posts.filter(x => x.id !== id);
      writeStorage(STORAGE_KEYS.forum, updated);
      renderForum();
    };

    // 全局函数：点赞回复
    window.likeReply = (postId, replyId) => {
      const posts = readStorage(STORAGE_KEYS.forum, []);
      const post = posts.find(x => x.id === postId);
      if (!post) return;
      
      const reply = post.replies.find(r => r.id === replyId);
      if (!reply) return;
      
      reply.likes = (reply.likes || 0) + 1;
      writeStorage(STORAGE_KEYS.forum, posts);
      renderForum();
    };

    // 全局函数：执行搜索
    window.performForumSearch = () => {
      const searchTerm = document.getElementById('forumSearch').value.trim();
      $forumList.innerHTML = renderForumList(searchTerm, currentFilter, currentSort);
    };

    // 全局函数：应用筛选
    window.applyForumFilters = () => {
      const filter = document.getElementById('forumFilter').value;
      const sort = document.getElementById('forumSort').value;
      currentFilter = filter;
      currentSort = sort;
      $forumList.innerHTML = renderForumList(document.getElementById('forumSearch').value, currentFilter, currentSort);
    };
  }


  function renderLawUpdates() {
    if (!requireAuth()) return;
    const all = readStorage(STORAGE_KEYS.lawUpdates, []);
    let currentFilter = 'all';
    let currentSort = 'date';
    let currentStatus = 'all';

    const renderLawUpdatesList = (keyword = '', filter = 'all', sort = 'date', status = 'all') => {
      let filtered = all.filter(l => {
        const matchesKeyword = !keyword || 
          l.name.toLowerCase().includes(keyword.toLowerCase()) || 
          l.summary.toLowerCase().includes(keyword.toLowerCase());
        
        const matchesFilter = filter === 'all' || 
          (filter === 'recent' && new Date(l.createdAt || 0) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
          (filter === 'important' && l.important);
        
        const today = new Date().toISOString().slice(0, 10);
        const isEffective = l.effectiveDate <= today;
        const matchesStatus = status === 'all' || 
          (status === 'effective' && isEffective) ||
          (status === 'upcoming' && !isEffective);
        
        return matchesKeyword && matchesFilter && matchesStatus;
      });

      // 排序
      switch(sort) {
        case 'date':
          filtered.sort((a, b) => b.effectiveDate.localeCompare(a.effectiveDate));
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'created':
          filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          break;
      }

      return filtered.map(l => {
        const today = new Date().toISOString().slice(0, 10);
        const isEffective = l.effectiveDate <= today;
        const statusClass = isEffective ? 'effective' : 'upcoming';
        const statusText = isEffective ? '已生效' : '即将生效';
        const statusIcon = isEffective ? '✅' : '⏰';
        
        return html`
          <div class="law-update-item ${statusClass}" onclick="showLawUpdateDetail('${l.id}')">
            <div class="law-update-header">
              <div class="law-update-title">${l.name}</div>
              <div class="law-update-meta">
                <span class="law-update-date">生效日期：${l.effectiveDate}</span>
                <span class="law-update-status ${statusClass}">
                  <span>${statusIcon}</span> ${statusText}
                </span>
          </div>
            </div>
            <div class="law-update-content">
              <div class="law-update-summary">${l.summary}</div>
              <div class="law-update-actions">
                <button class="law-update-action-btn primary" onclick="event.stopPropagation(); showLawUpdateDetail('${l.id}')">
                  <span>📖</span> 查看详情
                </button>
                <button class="law-update-action-btn secondary" onclick="event.stopPropagation(); shareLawUpdate('${l.id}')">
                  <span>📤</span> 分享
                </button>
                ${(() => {
                  const user = getAuth();
                  const isAdmin = user && user.role === 'admin';
                  return isAdmin ? html`
                    <button class="law-update-action-btn danger" onclick="event.stopPropagation(); editLawUpdate('${l.id}')">
                      <span>✏️</span> 编辑
                    </button>
                    <button class="law-update-action-btn danger" onclick="event.stopPropagation(); deleteLawUpdate('${l.id}')">
                      <span>🗑️</span> 删除
                    </button>
                  ` : '';
                })()}
        </div>
            </div>
          </div>
        `;
      }).join('') || '<div class="empty">未找到匹配的法律变更信息</div>';
    };

    setApp(html`
      <div class="law-updates-page">
        <div class="law-updates-header">
          <div class="header-content">
            <h1>法律时效</h1>
            <p class="law-updates-subtitle">法律变更 · 生效时间 · 政策解读</p>
          </div>
          <div class="law-updates-stats">
            <div class="stat-item">
              <span class="stat-number">${all.length}</span>
              <span class="stat-label">总变更</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.filter(l => l.effectiveDate <= new Date().toISOString().slice(0, 10)).length}</span>
              <span class="stat-label">已生效</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.filter(l => l.effectiveDate > new Date().toISOString().slice(0, 10)).length}</span>
              <span class="stat-label">即将生效</span>
            </div>
          </div>
        </div>
        
        <div class="law-updates-controls">
          <div class="search-controls">
            <div class="law-updates-search-box">
              <input id="lawUpdatesSearch" class="law-updates-search-input" placeholder="搜索法律名称或摘要内容..." />
              <button class="law-updates-search-btn" onclick="performLawUpdatesSearch()">🔍</button>
            </div>
            <div class="law-updates-filter-controls">
              <select id="lawUpdatesFilter" class="law-updates-filter-select">
                <option value="all">全部变更</option>
                <option value="recent">最近添加</option>
                <option value="important">重要变更</option>
              </select>
              <select id="lawUpdatesStatus" class="law-updates-filter-select">
                <option value="all">全部状态</option>
                <option value="effective">已生效</option>
                <option value="upcoming">即将生效</option>
              </select>
              <select id="lawUpdatesSort" class="law-updates-filter-select">
                <option value="date">按生效日期排序</option>
                <option value="name">按名称排序</option>
                <option value="created">按添加时间排序</option>
              </select>
              <button class="law-updates-filter-btn" onclick="applyLawUpdatesFilters()">筛选</button>
            </div>
            ${(() => {
              const user = getAuth();
              const isAdmin = user && user.role === 'admin';
              return isAdmin ? '<button id="addLawUpdate" class="add-law-update-btn">+ 添加变更</button>' : '';
            })()}
          </div>
        </div>
        
        ${(() => {
          const user = getAuth();
          const isAdmin = user && user.role === 'admin';
          return isAdmin ? html`
            <div class="law-update-new-form">
              <h3>添加新法律变更</h3>
              <form id="newLawUpdate" class="law-update-form" autocomplete="off">
                <div class="form-group">
                  <label>法律/法规名称 *</label>
          <input name="name" required placeholder="如：公司法（修订）">
                </div>
                <div class="form-group">
                  <label>生效日期 *</label>
          <input type="date" name="date" required>
                </div>
                <div class="form-group">
                  <label>重要程度</label>
                  <select name="important">
                    <option value="false">普通</option>
                    <option value="true">重要</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label>变更摘要 *</label>
                  <textarea name="summary" required placeholder="详细说明法律变更的主要内容、影响范围等..."></textarea>
                </div>
                <div class="form-actions">
                  <button class="btn secondary" type="button" onclick="this.form.reset()">重置</button>
                  <button class="btn primary" type="submit">添加变更</button>
          </div>
        </form>
            </div>
          ` : '';
        })()}
        
        <div id="lawUpdatesList" class="law-updates-timeline">${renderLawUpdatesList()}</div>
      </div>
    `);

    const $lawUpdatesList = document.getElementById('lawUpdatesList');
    
    // 搜索功能
    document.getElementById('lawUpdatesSearch').addEventListener('input', (e) => {
      $lawUpdatesList.innerHTML = renderLawUpdatesList(e.target.value, currentFilter, currentSort, currentStatus);
    });

    // 筛选功能
    document.getElementById('lawUpdatesFilter').addEventListener('change', (e) => {
      currentFilter = e.target.value;
      $lawUpdatesList.innerHTML = renderLawUpdatesList(document.getElementById('lawUpdatesSearch').value, currentFilter, currentSort, currentStatus);
    });

    // 状态筛选
    document.getElementById('lawUpdatesStatus').addEventListener('change', (e) => {
      currentStatus = e.target.value;
      $lawUpdatesList.innerHTML = renderLawUpdatesList(document.getElementById('lawUpdatesSearch').value, currentFilter, currentSort, currentStatus);
    });

    // 排序功能
    document.getElementById('lawUpdatesSort').addEventListener('change', (e) => {
      currentSort = e.target.value;
      $lawUpdatesList.innerHTML = renderLawUpdatesList(document.getElementById('lawUpdatesSearch').value, currentFilter, currentSort, currentStatus);
    });

    // 添加法律变更
    const addLawUpdateBtn = document.getElementById('addLawUpdate');
    if (addLawUpdateBtn) {
      addLawUpdateBtn.addEventListener('click', () => {
        const user = getAuth();
        if (user && user.role !== 'admin' && user.role !== 'superadmin') {
          alert('只有管理员可以添加法律变更');
          return;
        }
        document.getElementById('newLawUpdate').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // 新增法律变更表单
    const newLawUpdateForm = document.getElementById('newLawUpdate');
    if (newLawUpdateForm) {
      newLawUpdateForm.addEventListener('submit', (e) => {
      e.preventDefault();
        const user = getAuth();
        if (user && user.role !== 'admin' && user.role !== 'superadmin') {
          alert('只有管理员可以添加法律变更');
          return;
        }
        
      const fd = new FormData(e.target);
      const name = fd.get('name');
        if (!name) return;
      const date = fd.get('date');
        if (!date) return;
      const summary = fd.get('summary');
        if (!summary) return;
        const important = fd.get('important') === 'true';
        
      const items = readStorage(STORAGE_KEYS.lawUpdates, []);
        items.unshift({ 
          id: nid(), 
          name, 
          effectiveDate: date, 
          summary,
          important,
          createdAt: Date.now()
        });
      writeStorage(STORAGE_KEYS.lawUpdates, items);
      e.target.reset();
        renderLawUpdates();
      });
    }

    // 全局函数：显示法律变更详情
    window.showLawUpdateDetail = (id) => {
      const lawUpdate = all.find(x => x.id === id);
      if (!lawUpdate) return;
      
      const user = getAuth();
      const isAdmin = user && user.role === 'admin';
      
      const today = new Date().toISOString().slice(0, 10);
      const isEffective = lawUpdate.effectiveDate <= today;
      const statusClass = isEffective ? 'effective' : 'upcoming';
      const statusText = isEffective ? '已生效' : '即将生效';
      const statusIcon = isEffective ? '✅' : '⏰';
      
      setApp(html`
        <div class="law-update-detail-page">
          <div class="law-update-detail-header">
            <button class="btn secondary" onclick="renderLawUpdates()">← 返回法律时效</button>
            <h1>${lawUpdate.name}</h1>
            ${isAdmin ? html`
              <div class="admin-actions">
                <button class="btn secondary" onclick="editLawUpdate('${lawUpdate.id}')">编辑</button>
                <button class="btn danger" onclick="deleteLawUpdate('${lawUpdate.id}')">删除</button>
              </div>
            ` : ''}
          </div>
          
          <div class="law-update-detail-content">
            <div class="law-update-detail-meta">
              <div class="meta-item">
                <span class="meta-label">生效日期</span>
                <span class="meta-value">${lawUpdate.effectiveDate}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">当前状态</span>
                <span class="meta-value">${statusText}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">重要程度</span>
                <span class="meta-value">${lawUpdate.important ? '重要' : '普通'}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">添加时间</span>
                <span class="meta-value">${new Date(lawUpdate.createdAt || 0).toLocaleString()}</span>
              </div>
            </div>
            
            <div class="law-update-detail-summary">${lawUpdate.summary}</div>
            
            <div class="law-update-detail-actions">
              <button class="btn primary" onclick="shareLawUpdate('${lawUpdate.id}')">
                <span>📤</span> 分享变更
              </button>
              <button class="btn secondary" onclick="renderLawUpdates()">
                <span>📋</span> 返回列表
              </button>
            </div>
          </div>
        </div>
      `);
    };

    // 全局函数：编辑法律变更
    window.editLawUpdate = (id) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以编辑法律变更');
        return;
      }
      const lawUpdate = all.find(x => x.id === id);
      if (!lawUpdate) return;
      
      const name = prompt('法律/法规名称', lawUpdate.name);
      if (name === null) return;
      const date = prompt('生效日期（YYYY-MM-DD）', lawUpdate.effectiveDate);
      if (date === null) return;
      const summary = prompt('变更摘要', lawUpdate.summary);
      if (summary === null) return;
      const important = confirm('是否为重要变更？', lawUpdate.important);
      
      const updated = all.map(x => x.id === id ? { 
        ...x, 
        name, 
        effectiveDate: date, 
        summary,
        important,
        updatedAt: Date.now()
      } : x);
      writeStorage(STORAGE_KEYS.lawUpdates, updated);
      renderLawUpdates();
    };

    // 全局函数：删除法律变更
    window.deleteLawUpdate = (id) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以删除法律变更');
        return;
      }
      if (!confirm('确定要删除这个法律变更吗？删除后无法恢复。')) return;
      const updated = all.filter(x => x.id !== id);
      writeStorage(STORAGE_KEYS.lawUpdates, updated);
      renderLawUpdates();
    };

    // 全局函数：分享法律变更
    window.shareLawUpdate = (id) => {
      const lawUpdate = all.find(x => x.id === id);
      if (!lawUpdate) return;
      
      const shareUrl = `${window.location.origin}${window.location.pathname}#/law-updates?id=${id}`;
      const shareText = `法律变更：${lawUpdate.name} - 生效日期：${lawUpdate.effectiveDate}`;
      
      showShareModal(lawUpdate.name, shareText, shareUrl);
    };

    // 全局函数：执行搜索
    window.performLawUpdatesSearch = () => {
      const searchTerm = document.getElementById('lawUpdatesSearch').value.trim();
      $lawUpdatesList.innerHTML = renderLawUpdatesList(searchTerm, currentFilter, currentSort, currentStatus);
    };

    // 全局函数：应用筛选
    window.applyLawUpdatesFilters = () => {
      const filter = document.getElementById('lawUpdatesFilter').value;
      const sort = document.getElementById('lawUpdatesSort').value;
      const status = document.getElementById('lawUpdatesStatus').value;
      currentFilter = filter;
      currentSort = sort;
      currentStatus = status;
      $lawUpdatesList.innerHTML = renderLawUpdatesList(document.getElementById('lawUpdatesSearch').value, currentFilter, currentSort, currentStatus);
    };
  }

  function renderLawyers() {
    if (!requireAuth()) return;
    const all = readStorage(STORAGE_KEYS.lawyers, []);
    let currentFilter = 'all';
    let currentSort = 'name';
    let currentArea = 'all';

    const renderLawyerList = (keyword = '', filter = 'all', sort = 'name', area = 'all') => {
      let filtered = all.filter(l => {
        const matchesKeyword = !keyword || 
          l.name.toLowerCase().includes(keyword.toLowerCase()) || 
          l.firm.toLowerCase().includes(keyword.toLowerCase()) || 
          l.bio.toLowerCase().includes(keyword.toLowerCase()) ||
          (l.areas||[]).some(a => a.toLowerCase().includes(keyword.toLowerCase()));
        
        const matchesFilter = filter === 'all' || 
          (filter === 'recent' && new Date(l.createdAt || 0) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
          (filter === 'verified' && l.verified);
        
        const matchesArea = area === 'all' || (l.areas||[]).includes(area);
        
        return matchesKeyword && matchesFilter && matchesArea;
      });

      // 排序
      switch(sort) {
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'firm':
          filtered.sort((a, b) => (a.firm || '').localeCompare(b.firm || ''));
          break;
        case 'areas':
          filtered.sort((a, b) => (b.areas||[]).length - (a.areas||[]).length);
          break;
        case 'recent':
          filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          break;
      }

      return filtered.map(l => html`
        <div class="lawyer-card" onclick="showLawyerDetail('${l.id}')">
          <div class="lawyer-card-header">
            <div class="lawyer-card-title">${l.name}</div>
            <div class="lawyer-card-firm">${l.firm || '—'}</div>
            <div class="lawyer-card-areas">
              ${(l.areas||[]).map(area => html`<span class="lawyer-area-tag">${area}</span>`).join('')}
            </div>
          </div>
          <div class="lawyer-card-content">
            <div class="lawyer-card-bio">${l.bio || '暂无简介'}</div>
            <div class="lawyer-card-contact">
              ${l.email ? html`
                <div class="lawyer-contact-item">
                  <div class="lawyer-contact-icon">📧</div>
                  <span>${l.email}</span>
                </div>
              ` : ''}
              ${l.phone ? html`
                <div class="lawyer-contact-item">
                  <div class="lawyer-contact-icon">📞</div>
                  <span>${l.phone}</span>
                </div>
              ` : ''}
            </div>
            <div class="lawyer-card-actions">
              <button class="lawyer-action-btn primary" onclick="event.stopPropagation(); showLawyerDetail('${l.id}')">
                <span>👤</span> 查看详情
              </button>
              <button class="lawyer-action-btn secondary" onclick="event.stopPropagation(); contactLawyer('${l.id}')">
                <span>📞</span> 联系
              </button>
              <button class="lawyer-action-btn success" onclick="event.stopPropagation(); addLawyerFriend('${l.id}', '${l.username}')">
                <span>👥</span> 加好友
              </button>
              ${(() => {
                const user = getAuth();
                const isAdmin = user && user.role === 'admin';
                return isAdmin ? html`
                  <button class="lawyer-action-btn danger" onclick="event.stopPropagation(); editLawyer('${l.id}')">
                    <span>✏️</span> 编辑
                  </button>
                  <button class="lawyer-action-btn danger" onclick="event.stopPropagation(); deleteLawyer('${l.id}')">
                    <span>🗑️</span> 删除
                  </button>
                ` : '';
              })()}
            </div>
          </div>
        </div>
      `).join('') || '<div class="empty">未找到匹配的律师信息</div>';
    };

    // 获取所有业务领域
    const allAreas = [...new Set(all.flatMap(l => l.areas || []))];

    setApp(html`
      <div class="lawyers-page">
        <div class="lawyers-header">
          <div class="header-content">
            <h1>律师推广</h1>
            <p class="lawyers-subtitle">专业律师 · 服务展示 · 法律咨询</p>
          </div>
          <div class="lawyers-stats">
            <div class="stat-item">
              <span class="stat-number">${all.length}</span>
              <span class="stat-label">总律师</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${allAreas.length}</span>
              <span class="stat-label">业务领域</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${all.filter(l => l.verified).length}</span>
              <span class="stat-label">认证律师</span>
            </div>
          </div>
        </div>
        
        <div class="lawyers-controls">
          <div class="search-controls">
            <div class="lawyers-search-box">
              <input id="lawyersSearch" class="lawyers-search-input" placeholder="搜索律师姓名、律所或业务领域..." />
              <button class="lawyers-search-btn" onclick="performLawyersSearch()">🔍</button>
            </div>
            <div class="lawyers-filter-controls">
              <select id="lawyersFilter" class="lawyers-filter-select">
                <option value="all">全部律师</option>
                <option value="recent">最近添加</option>
                <option value="verified">认证律师</option>
              </select>
              <select id="lawyersArea" class="lawyers-filter-select">
                <option value="all">全部领域</option>
                ${allAreas.map(area => html`<option value="${area}">${area}</option>`).join('')}
              </select>
              <select id="lawyersSort" class="lawyers-filter-select">
                <option value="name">按姓名排序</option>
                <option value="firm">按律所排序</option>
                <option value="areas">按业务领域数量排序</option>
                <option value="recent">按添加时间排序</option>
              </select>
              <button class="lawyers-filter-btn" onclick="applyLawyersFilters()">筛选</button>
            </div>
            ${(() => {
              const user = getAuth();
              const isAdmin = user && user.role === 'admin';
              return isAdmin ? '<button id="addLawyer" class="add-lawyer-btn">+ 添加律师</button>' : '';
            })()}
          </div>
        </div>
        
        ${(() => {
          const user = getAuth();
          const isAdmin = user && user.role === 'admin';
          return isAdmin ? html`
            <div class="lawyer-new-form">
              <h3>添加新律师</h3>
              <form id="newLawyer" class="lawyer-form" autocomplete="off">
                <div class="form-group">
                  <label>律师姓名 *</label>
          <input name="name" required placeholder="如：张三">
                </div>
                <div class="form-group">
                  <label>所属律所</label>
          <input name="firm" placeholder="如：XX律师事务所">
                </div>
                <div class="form-group">
          <label>业务领域（逗号分隔）</label>
                  <input name="areas" placeholder="如：民商事, 合规, 刑事">
                </div>
                <div class="form-group">
                  <label>邮箱地址</label>
          <input type="email" name="email" placeholder="example@law.com">
                </div>
                <div class="form-group">
                  <label>联系电话</label>
          <input name="phone" placeholder="手机号或座机">
          </div>
                <div class="form-group full-width">
                  <label>个人简介</label>
                  <textarea name="bio" placeholder="详细介绍律师的专业背景、执业经验等..."></textarea>
            </div>
                <div class="form-actions">
                  <button class="btn secondary" type="button" onclick="this.form.reset()">重置</button>
                  <button class="btn primary" type="submit">添加律师</button>
          </div>
              </form>
        </div>
          ` : '';
        })()}
        
        <div id="lawyersList" class="lawyers-grid">${renderLawyerList()}</div>
      </div>
    `);

    const $lawyersList = document.getElementById('lawyersList');
    
    // 搜索功能
    document.getElementById('lawyersSearch').addEventListener('input', (e) => {
      $lawyersList.innerHTML = renderLawyerList(e.target.value, currentFilter, currentSort, currentArea);
    });

    // 筛选功能
    document.getElementById('lawyersFilter').addEventListener('change', (e) => {
      currentFilter = e.target.value;
      $lawyersList.innerHTML = renderLawyerList(document.getElementById('lawyersSearch').value, currentFilter, currentSort, currentArea);
    });

    // 业务领域筛选
    document.getElementById('lawyersArea').addEventListener('change', (e) => {
      currentArea = e.target.value;
      $lawyersList.innerHTML = renderLawyerList(document.getElementById('lawyersSearch').value, currentFilter, currentSort, currentArea);
    });

    // 排序功能
    document.getElementById('lawyersSort').addEventListener('change', (e) => {
      currentSort = e.target.value;
      $lawyersList.innerHTML = renderLawyerList(document.getElementById('lawyersSearch').value, currentFilter, currentSort, currentArea);
    });

    // 添加律师
    const addLawyerBtn = document.getElementById('addLawyer');
    if (addLawyerBtn) {
      addLawyerBtn.addEventListener('click', () => {
        const user = getAuth();
        if (user && user.role !== 'admin' && user.role !== 'superadmin') {
          alert('只有管理员可以添加律师');
          return;
        }
        document.getElementById('newLawyer').scrollIntoView({ behavior: 'smooth' });
      });
    }

    // 新增律师表单
    const newLawyerForm = document.getElementById('newLawyer');
    if (newLawyerForm) {
      newLawyerForm.addEventListener('submit', (e) => {
      e.preventDefault();
        const user = getAuth();
        if (user && user.role !== 'admin' && user.role !== 'superadmin') {
          alert('只有管理员可以添加律师');
          return;
        }
        
      const fd = new FormData(e.target);
        const name = fd.get('name');
        if (!name) return;
        const firm = fd.get('firm') || '';
        const email = fd.get('email') || '';
        const phone = fd.get('phone') || '';
        const bio = fd.get('bio') || '';
        const areas = (fd.get('areas') || '').split(',').map(s => s.trim()).filter(Boolean);
        
      const items = readStorage(STORAGE_KEYS.lawyers, []);
        items.unshift({ 
          id: nid(), 
          name, 
          firm, 
          email, 
          phone, 
          bio, 
          areas,
          createdAt: Date.now(),
          verified: false
        });
      writeStorage(STORAGE_KEYS.lawyers, items);
      e.target.reset();
        renderLawyers();
      });
    }

    // 全局函数：渲染律师列表
    window.renderLawyers = renderLawyers;

    // 全局函数：显示律师详情
    window.showLawyerDetail = (id) => {
      const lawyer = all.find(x => x.id === id);
      if (!lawyer) return;
      
      const user = getAuth();
      const isAdmin = user && user.role === 'admin';
      
      setApp(html`
        <div class="lawyer-detail-page">
          <div class="lawyer-detail-header">
            <button class="btn secondary" onclick="renderLawyers()">← 返回律师列表</button>
            <h1>${lawyer.name}</h1>
            ${isAdmin ? html`
              <div class="admin-actions">
                <button class="btn secondary" onclick="editLawyer('${lawyer.id}')">编辑</button>
                <button class="btn danger" onclick="deleteLawyer('${lawyer.id}')">删除</button>
              </div>
            ` : ''}
          </div>
          
          <div class="lawyer-detail-content">
            <div class="lawyer-detail-info">
              <div class="lawyer-avatar">${lawyer.name.charAt(0)}</div>
              <div class="lawyer-detail-meta">
                <div class="meta-item">
                  <span class="meta-label">律师姓名</span>
                  <span class="meta-value">${lawyer.name}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">所属律所</span>
                  <span class="meta-value">${lawyer.firm || '—'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">业务领域</span>
                  <span class="meta-value">${(lawyer.areas || []).length} 个</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">认证状态</span>
                  <span class="meta-value">${lawyer.verified ? '已认证' : '未认证'}</span>
                </div>
              </div>
            </div>
            
            <div class="lawyer-detail-areas">
              ${(lawyer.areas || []).map(area => html`<span class="lawyer-area-tag">${area}</span>`).join('')}
            </div>
            
            <div class="lawyer-detail-bio">${lawyer.bio || '暂无简介'}</div>
            
            <div class="lawyer-detail-contact">
              ${lawyer.email ? html`
                <div class="lawyer-contact-card">
                  <div class="lawyer-contact-card-icon">📧</div>
                  <div class="lawyer-contact-card-info">
                    <div class="lawyer-contact-card-label">邮箱地址</div>
                    <div class="lawyer-contact-card-value">${lawyer.email}</div>
                  </div>
                </div>
              ` : ''}
              ${lawyer.phone ? html`
                <div class="lawyer-contact-card">
                  <div class="lawyer-contact-card-icon">📞</div>
                  <div class="lawyer-contact-card-info">
                    <div class="lawyer-contact-card-label">联系电话</div>
                    <div class="lawyer-contact-card-value">${lawyer.phone}</div>
                  </div>
                </div>
              ` : ''}
            </div>
            
            <div class="lawyer-detail-actions">
              <button class="btn primary" onclick="contactLawyer('${lawyer.id}')">
                <span>📞</span> 联系律师
              </button>
              <button class="btn success" onclick="addLawyerFriend('${lawyer.id}', '${lawyer.username}')">
                <span>👥</span> 加好友
              </button>
              <button class="btn secondary" onclick="shareLawyer('${lawyer.id}')">
                <span>📤</span> 分享名片
              </button>
              <button class="btn secondary" onclick="renderLawyers()">
                <span>👥</span> 返回列表
              </button>
            </div>
          </div>
        </div>
      `);
    };

    // 全局函数：编辑律师
    window.editLawyer = (id) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以编辑律师信息');
        return;
      }
      const lawyer = all.find(x => x.id === id);
      if (!lawyer) return;
      
      const name = prompt('律师姓名', lawyer.name);
      if (name === null) return;
      const firm = prompt('所属律所', lawyer.firm || '');
      const email = prompt('邮箱地址', lawyer.email || '');
      const phone = prompt('联系电话', lawyer.phone || '');
      const bio = prompt('个人简介', lawyer.bio || '');
      const areas = prompt('业务领域（逗号分隔）', (lawyer.areas || []).join(', '));
      
      const updated = all.map(x => x.id === id ? { 
        ...x, 
        name, 
        firm, 
        email, 
        phone, 
        bio, 
        areas: areas ? areas.split(',').map(s => s.trim()).filter(Boolean) : [],
        updatedAt: Date.now()
      } : x);
      writeStorage(STORAGE_KEYS.lawyers, updated);
      renderLawyers();
    };

    // 全局函数：删除律师
    window.deleteLawyer = (id) => {
      const user = getAuth();
      if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        alert('只有管理员可以删除律师信息');
        return;
      }
      if (!confirm('确定要删除这个律师信息吗？删除后无法恢复。')) return;
      const updated = all.filter(x => x.id !== id);
      writeStorage(STORAGE_KEYS.lawyers, updated);
      renderLawyers();
    };

    // 全局函数：联系律师
    window.contactLawyer = (id) => {
      const lawyer = all.find(x => x.id === id);
      if (!lawyer) return;
      
      let contactInfo = `律师：${lawyer.name}\n`;
      if (lawyer.firm) contactInfo += `律所：${lawyer.firm}\n`;
      if (lawyer.phone) contactInfo += `电话：${lawyer.phone}\n`;
      if (lawyer.email) contactInfo += `邮箱：${lawyer.email}\n`;
      
      if (navigator.share) {
        navigator.share({
          title: `联系律师：${lawyer.name}`,
          text: contactInfo
        });
      } else {
        navigator.clipboard.writeText(contactInfo).then(() => {
          alert('联系方式已复制到剪贴板');
        });
      }
    };

    // 全局函数：分享律师
    window.shareLawyer = (id) => {
      const lawyer = all.find(x => x.id === id);
      if (!lawyer) return;
      
      const shareUrl = `${window.location.origin}${window.location.pathname}#/lawyers?id=${id}`;
      const shareText = `推荐律师：${lawyer.name} - ${lawyer.firm || '专业律师'}`;
      
      showShareModal(lawyer.name, shareText, shareUrl);
    };

    // 全局函数：执行搜索
    window.performLawyersSearch = () => {
      const searchTerm = document.getElementById('lawyersSearch').value.trim();
      $lawyersList.innerHTML = renderLawyerList(searchTerm, currentFilter, currentSort, currentArea);
    };

    // 全局函数：应用筛选
    window.applyLawyersFilters = () => {
      const filter = document.getElementById('lawyersFilter').value;
      const sort = document.getElementById('lawyersSort').value;
      const area = document.getElementById('lawyersArea').value;
      currentFilter = filter;
      currentSort = sort;
      currentArea = area;
      $lawyersList.innerHTML = renderLawyerList(document.getElementById('lawyersSearch').value, currentFilter, currentSort, currentArea);
    };
  }

  // 用户管理页面
  function renderAdminUsers() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问用户管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    
    // 超级管理员有完整权限，普通管理员只能查看不能修改
    const isSuperAdmin = user.role === 'superadmin';
    
    const users = readStorage('users', []);
    const totalUsers = users.length;
    const superAdminUsers = users.filter(u => u.role === 'superadmin').length;
    const adminUsers = users.filter(u => u.role === 'admin').length;
    const today = new Date().toDateString();
    const todayUsers = users.filter(u => new Date(u.createdAt).toDateString() === today).length;
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>用户管理</h2>
          ${isSuperAdmin ? '<button class="btn primary" onclick="addAdminUser()">+ 新增用户</button>' : ''}
        </div>
        
        <!-- 统计信息 -->
        <div class="admin-stats" style="margin-bottom: 24px;">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <div class="stat-number">${totalUsers}</div>
              <div class="stat-label">总用户数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👑</div>
            <div class="stat-info">
              <div class="stat-number">${superAdminUsers}</div>
              <div class="stat-label">超级管理员</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👨‍💼</div>
            <div class="stat-info">
              <div class="stat-number">${adminUsers}</div>
              <div class="stat-label">普通管理员</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-info">
              <div class="stat-number">${todayUsers}</div>
              <div class="stat-label">今日新增</div>
            </div>
          </div>
        </div>
        
        ${!isSuperAdmin ? `
          <div class="admin-content" style="margin-bottom: 24px; background: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.3); border-radius: 8px; padding: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">⚠️</span>
              <div>
                <strong>权限提示：</strong>您当前为普通管理员，只能查看用户信息，无法进行用户管理操作。
              </div>
            </div>
          </div>
        ` : ''}

        <!-- 搜索和筛选 -->
        <div class="admin-content" style="margin-bottom: 24px;">
          <div class="search-filter-bar">
            <div class="search-box">
              <input type="text" id="userSearchInput" placeholder="搜索用户名或邮箱..." onkeyup="searchAdminUsers()">
              <button class="btn secondary" onclick="searchAdminUsers()">🔍 搜索</button>
            </div>
            <div class="filter-box">
              <select id="roleFilter" onchange="filterAdminUsers()">
                <option value="">所有角色</option>
                <option value="superadmin">超级管理员</option>
                <option value="admin">普通管理员</option>
                <option value="user">普通用户</option>
              </select>
            </div>
            ${isSuperAdmin ? `
              <div class="filter-box">
                <button class="btn primary" onclick="addAdminUser()">➕ 新增用户</button>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- 用户列表 -->
        <div class="admin-content">
          <div class="admin-list" id="adminUserList">
            ${users.map(u => {
              const lawyerTag = getUserLawyerTag(u.username);
              return html`
              <div class="admin-item user-item" data-role="${u.role || 'user'}">
                <div class="item-info">
                  <div class="item-title">
                    ${u.username}
                    <span class="role-badge ${u.role === 'superadmin' ? 'superadmin' : u.role === 'admin' ? 'admin' : u.role === 'lawyer' ? 'lawyer' : 'user'}">
                      ${u.role === 'superadmin' ? '超级管理员' : u.role === 'admin' ? '普通管理员' : u.role === 'lawyer' ? '律师' : '用户'}
                    </span>
                    ${lawyerTag ? `<span class="lawyer-tag">${lawyerTag}</span>` : ''}
                  </div>
                  <div class="item-meta">注册时间：${new Date(u.createdAt).toLocaleString()}</div>
                  <div class="item-desc">${u.email ? `邮箱：${u.email}` : '未设置邮箱'}</div>
                </div>
                <div class="item-actions">
                  ${isSuperAdmin ? `
                    <button class="btn secondary small" onclick="editAdminUser('${u.id}')">✏️ 编辑</button>
                    <div class="btn-group" style="display: inline-flex; gap: 4px;">
                      ${u.role === 'superadmin' ? `
                        <button class="btn warning small" onclick="toggleUserRole('${u.id}', '${u.role}', 'admin')">⬇️ 降级为管理员</button>
                      ` : u.role === 'admin' ? `
                        <button class="btn warning small" onclick="toggleUserRole('${u.id}', '${u.role}', 'user')">⬇️ 降级为用户</button>
                      ` : `
                        ${u.username === 'admin' ? `
                          <button class="btn success small" onclick="toggleUserRole('${u.id}', '${u.role}', 'superadmin')">⬆️ 提升为超级管理员</button>
                        ` : ''}
                        <button class="btn success small" onclick="toggleUserRole('${u.id}', '${u.role}', 'admin')">⬆️ 提升为管理员</button>
                      `}
                    </div>
                    <button class="btn danger small" onclick="deleteAdminUser('${u.id}')">🗑️ 删除</button>
                  ` : `
                    <button class="btn secondary small" disabled>✏️ 编辑 (仅查看)</button>
                    <button class="btn secondary small" disabled>🔒 权限管理 (仅超级管理员)</button>
                    <button class="btn secondary small" disabled>🗑️ 删除 (仅超级管理员)</button>
                  `}
                </div>
              </div>
              `;
            }).join('') || '<div class="empty">暂无注册用户</div>'}
          </div>
        </div>
      </div>
    `);
  }

  function renderAdmin() {
    if (!requireAuth()) return;
    
    // 检查管理员权限
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`
        <div class="admin-container">
          <div class="admin-header">
            <h1>权限不足</h1>
            <p class="admin-subtitle">您没有访问后台管理的权限</p>
            <div style="margin-top: 24px;">
              <a href="#/" class="btn primary">返回首页</a>
            </div>
          </div>
        </div>
      `);
      return;
    }
    
    // 获取所有数据统计
    const films = readStorage(STORAGE_KEYS.films, []);
    const news = readStorage(STORAGE_KEYS.news, []);
    const forum = readStorage(STORAGE_KEYS.forum, []);
    const lawUpdates = readStorage(STORAGE_KEYS.lawUpdates, []);
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    const users = readStorage('users', []);
    
    setApp(html`
      <div class="admin-container">
        <div class="admin-header">
          <h1>后台管理系统</h1>
          <p class="admin-subtitle">统一管理所有模块内容</p>
        </div>
        
        <div class="admin-stats">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <div class="stat-number">${users.length}</div>
              <div class="stat-label">注册用户</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎬</div>
            <div class="stat-info">
              <div class="stat-number">${films.length}</div>
              <div class="stat-label">影视作品</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📰</div>
            <div class="stat-info">
              <div class="stat-number">${news.length}</div>
              <div class="stat-label">时政要闻</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💬</div>
            <div class="stat-info">
              <div class="stat-number">${forum.length}</div>
              <div class="stat-label">论坛帖子</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚖️</div>
            <div class="stat-info">
              <div class="stat-number">${lawUpdates.length}</div>
              <div class="stat-label">法律时效</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👨‍💼</div>
            <div class="stat-info">
              <div class="stat-number">${lawyers.length}</div>
              <div class="stat-label">律师名片</div>
            </div>
          </div>
        </div>

        <div class="admin-modules">
          <h2>模块管理</h2>
          <div class="module-grid">
            <div class="admin-module-card" onclick="renderAdminUsers()">
              <div class="module-icon">👥</div>
              <div class="module-content">
                <h3>用户管理</h3>
                <p>${user.role === 'superadmin' ? '管理系统用户账号' : '查看系统用户信息'}</p>
                <div class="module-count">${readStorage('users', []).length} 个用户</div>
                ${user.role === 'admin' ? '<div class="module-note">仅查看权限</div>' : ''}
              </div>
            </div>
            <div class="admin-module-card" onclick="editAboutInfo()">
              <div class="module-icon">📝</div>
              <div class="module-content">
                <h3>简介管理</h3>
                <p>管理网站简介信息</p>
                <div class="module-count">平台介绍</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderLawyerApplications()">
              <div class="module-icon">⚖️</div>
              <div class="module-content">
                <h3>律师审核</h3>
                <p>审核律师注册申请</p>
                <div class="module-count" id="lawyerAppCount">${readStorage('lawyer_applications', []).filter(app => app.status === 'pending').length} 个待审核</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminFilms()">
              <div class="module-icon">🎬</div>
              <div class="module-content">
                <h3>影视管理</h3>
                <p>管理利农纪录片和普法文园内容</p>
                <div class="module-count">${films.length} 个作品</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminNews()">
              <div class="module-icon">📰</div>
              <div class="module-content">
                <h3>时政管理</h3>
                <p>管理政务要闻和法治热词</p>
                <div class="module-count">${news.length} 条要闻</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminForum()">
              <div class="module-icon">💬</div>
              <div class="module-content">
                <h3>论坛管理</h3>
                <p>管理论坛帖子和回复</p>
                <div class="module-count">${forum.length} 个帖子</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminLawUpdates()">
              <div class="module-icon">⚖️</div>
              <div class="module-content">
                <h3>法律时效管理</h3>
                <p>管理法律变更和生效时间</p>
                <div class="module-count">${lawUpdates.length} 条记录</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminLawyers()">
              <div class="module-icon">👨‍💼</div>
              <div class="module-content">
                <h3>律师管理</h3>
                <p>管理律师名片和推广信息</p>
                <div class="module-count">${lawyers.length} 位律师</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminCommunity()">
              <div class="module-icon">🏘️</div>
              <div class="module-content">
                <h3>社区管理</h3>
                <p>管理社区动态和用户互动</p>
                <div class="module-count">${readStorage(STORAGE_KEYS.community, []).length} 条动态</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminQA()">
              <div class="module-icon">❓</div>
              <div class="module-content">
                <h3>问答管理</h3>
                <p>管理法律问答和知识库</p>
                <div class="module-count">${readStorage(STORAGE_KEYS.qa, []).length} 个问答</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminMessages()">
              <div class="module-icon">💬</div>
              <div class="module-content">
                <h3>消息管理</h3>
                <p>管理系统消息和通知</p>
                <div class="module-count">${readStorage('user_notifications', []).length} 条通知</div>
              </div>
            </div>
            <div class="admin-module-card" onclick="renderAdminData()">
              <div class="module-icon">📊</div>
              <div class="module-content">
                <h3>数据管理</h3>
                <p>数据备份、恢复和清理</p>
                <div class="module-count">数据统计</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // 用户管理页面
  // 后台管理子页面
  function renderAdminFilms() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    const films = readStorage(STORAGE_KEYS.films, []);
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>影视管理</h2>
          <button class="btn primary" onclick="addAdminFilm()">+ 新增影片</button>
        </div>
        <div class="admin-content">
          <div class="admin-list">
            ${films.map(film => html`
              <div class="admin-item">
                <div class="item-info">
                  <div class="item-title">${film.title}</div>
                  <div class="item-meta">${film.category} · ${film.duration}</div>
                  <div class="item-desc">${film.desc}</div>
                </div>
                <div class="item-actions">
                  <button class="btn secondary small" onclick="editAdminFilm('${film.id}')">编辑</button>
                  <button class="btn danger small" onclick="deleteAdminFilm('${film.id}')">删除</button>
                </div>
              </div>
            `).join('') || '<div class="empty">暂无影视作品</div>'}
          </div>
        </div>
      </div>
    `);
  }

  function renderAdminNews() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    const news = readStorage(STORAGE_KEYS.news, []);
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>时政管理</h2>
          <button class="btn primary" onclick="addAdminNews()">+ 新增要闻</button>
        </div>
        <div class="admin-content">
          <div class="admin-list">
            ${news.map(item => html`
              <div class="admin-item">
                <div class="item-info">
                  <div class="item-title">${item.title}</div>
                  <div class="item-meta">${item.date} · ${(item.tags||[]).join('、') || '—'}</div>
                  <div class="item-desc">${item.summary}</div>
                </div>
                <div class="item-actions">
                  <button class="btn secondary small" onclick="editAdminNews('${item.id}')">编辑</button>
                  <button class="btn danger small" onclick="deleteAdminNews('${item.id}')">删除</button>
                </div>
              </div>
            `).join('') || '<div class="empty">暂无时政要闻</div>'}
          </div>
        </div>
      </div>
    `);
  }

  function renderAdminForum() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    const posts = readStorage(STORAGE_KEYS.forum, []);
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>论坛管理</h2>
        </div>
        <div class="admin-content">
          <div class="admin-list">
            ${posts.map(post => html`
              <div class="admin-item">
                <div class="item-info">
                  <div class="item-title">${post.title}</div>
                  <div class="item-meta">${new Date(post.createdAt).toLocaleString()} · ${(post.replies||[]).length} 回复</div>
                  <div class="item-desc">${post.content}</div>
                </div>
                <div class="item-actions">
                  <button class="btn secondary small" onclick="editAdminPost('${post.id}')">编辑</button>
                  <button class="btn danger small" onclick="deleteAdminPost('${post.id}')">删除</button>
                </div>
              </div>
            `).join('') || '<div class="empty">暂无论坛帖子</div>'}
          </div>
        </div>
      </div>
    `);
  }

  function renderAdminCommunity() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    const items = readStorage(STORAGE_KEYS.community, []);
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>社区管理</h2>
        </div>
        <div class="admin-content">
          <div class="admin-list">
            ${items.map(item => html`
              <div class="admin-item">
                <div class="item-info">
                  <div class="item-title">${item.text}</div>
                  <div class="item-meta">${new Date(item.createdAt).toLocaleString()} · 👍 ${item.likes||0} · ${(item.tags||[]).map(t=>`#${t}`).join(' ')}</div>
                </div>
                <div class="item-actions">
                  <button class="btn danger small" onclick="deleteAdminCommunity('${item.id}')">删除</button>
                </div>
              </div>
            `).join('') || '<div class="empty">暂无社区动态</div>'}
          </div>
        </div>
      </div>
    `);
  }

  function renderAdminQA() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    const qa = readStorage(STORAGE_KEYS.qa, []);
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>问答管理</h2>
        </div>
        <div class="admin-content">
          <div class="admin-list">
            ${qa.map(item => html`
              <div class="admin-item">
                <div class="item-info">
                  <div class="item-title">Q: ${item.question}</div>
                  <div class="item-meta">${new Date(item.createdAt).toLocaleString()} · ${(item.answers||[]).length} 回答</div>
                  <div class="item-desc">${(item.answers||[]).map(a => `A: ${a.text}`).join('<br>')}</div>
                </div>
                <div class="item-actions">
                  <button class="btn danger small" onclick="deleteAdminQA('${item.id}')">删除</button>
                </div>
              </div>
            `).join('') || '<div class="empty">暂无问答记录</div>'}
          </div>
        </div>
      </div>
    `);
  }

  function renderAdminLawUpdates() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    const updates = readStorage(STORAGE_KEYS.lawUpdates, []);
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>法律时效管理</h2>
          <button class="btn primary" onclick="addAdminLawUpdate()">+ 新增记录</button>
        </div>
        <div class="admin-content">
          <div class="admin-list">
            ${updates.map(item => html`
              <div class="admin-item">
                <div class="item-info">
                  <div class="item-title">${item.name}</div>
                  <div class="item-meta">生效日期: ${item.effectiveDate}</div>
                  <div class="item-desc">${item.summary}</div>
                </div>
                <div class="item-actions">
                  <button class="btn secondary small" onclick="editAdminLawUpdate('${item.id}')">编辑</button>
                  <button class="btn danger small" onclick="deleteAdminLawUpdate('${item.id}')">删除</button>
                </div>
              </div>
            `).join('') || '<div class="empty">暂无法律时效记录</div>'}
          </div>
        </div>
      </div>
    `);
  }

  function renderAdminLawyers() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    const lawyers = readStorage(STORAGE_KEYS.lawyers, []);
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>律师管理</h2>
          <button class="btn primary" onclick="addAdminLawyer()">+ 新增律师</button>
        </div>
        <div class="admin-content">
          <div class="admin-list">
            ${lawyers.map(lawyer => html`
              <div class="admin-item">
                <div class="item-info">
                  <div class="item-title">${lawyer.name}</div>
                  <div class="item-meta">${lawyer.firm||'—'} · ${(lawyer.areas||[]).join('、') || '—'}</div>
                  <div class="item-desc">${lawyer.bio||''} · ${lawyer.email||''} ${lawyer.phone ? '· ' + lawyer.phone : ''}</div>
                </div>
                <div class="item-actions">
                  <button class="btn secondary small" onclick="editAdminLawyer('${lawyer.id}')">编辑</button>
                  <button class="btn danger small" onclick="deleteAdminLawyer('${lawyer.id}')">删除</button>
                </div>
              </div>
            `).join('') || '<div class="empty">暂无律师名片</div>'}
          </div>
        </div>
      </div>
    `);
  }

  function renderNotFound() {
    setApp(html`<section class="section"><h2>页面未找到</h2><p class="small">链接无效或页面尚未实现。</p></section>`);
  }

  // 个人资料页面
  function renderProfile() {
    if (!requireAuth()) return;
    
    const user = getAuth();
    
    // 确保用户有个人资料数据
    if (!user.profile) {
      user.profile = {
        realName: '',
        phone: '',
        avatar: '',
        bio: '',
        location: '',
        website: '',
        gender: '',
        birthday: '',
        occupation: '',
        company: '',
        interests: [],
        socialMedia: {
          wechat: '',
          qq: '',
          weibo: '',
          linkedin: ''
        }
      };
      setAuth(user); // 保存更新后的用户信息
    }
    
    const profile = user.profile;
    
    setApp(html`
      <div class="profile-container">
        <div class="profile-header">
          <button class="btn secondary" onclick="location.hash = '#/'">← 返回首页</button>
          <h1>个人资料</h1>
        </div>
        
        <div class="profile-content">
          <div class="profile-sidebar">
            <div class="profile-card">
              <div class="profile-avatar">
                ${profile.avatar ? 
                  `<img src="${profile.avatar}" alt="头像" class="avatar-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                  ''
                }
                <div class="avatar-placeholder" style="${profile.avatar ? 'display: none;' : 'display: flex;'}">
                  ${user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div class="profile-info">
                <h2>${profile.realName || user.username}</h2>
                <p class="profile-username">@${user.username}</p>
                <p class="profile-role">${getRoleDisplayName(user.role)}</p>
                ${profile.bio ? `<p class="profile-bio">${profile.bio}</p>` : ''}
              </div>
              <div class="profile-actions">
                <button class="btn primary" onclick="editProfile()">编辑资料</button>
                <button class="btn secondary" onclick="changePassword()">修改密码</button>
              </div>
            </div>
            
            <div class="profile-stats">
              <h3>账户信息</h3>
              <div class="stat-item">
                <span class="stat-label">注册时间</span>
                <span class="stat-value">${new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">最后登录</span>
                <span class="stat-value">${new Date().toLocaleDateString()}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">用户角色</span>
                <span class="stat-value">${getRoleDisplayName(user.role)}</span>
              </div>
            </div>
          </div>
          
          <div class="profile-main">
            <div class="profile-section">
              <h3>基本信息</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>真实姓名</label>
                  <span>${profile.realName || '未设置'}</span>
                </div>
                <div class="info-item">
                  <label>性别</label>
                  <span>${profile.gender || '未设置'}</span>
                </div>
                <div class="info-item">
                  <label>生日</label>
                  <span>${profile.birthday || '未设置'}</span>
                </div>
                <div class="info-item">
                  <label>手机号</label>
                  <span>${profile.phone || '未设置'}</span>
                </div>
                <div class="info-item">
                  <label>邮箱</label>
                  <span>${user.email || '未设置'}</span>
                </div>
                <div class="info-item">
                  <label>所在地</label>
                  <span>${profile.location || '未设置'}</span>
                </div>
              </div>
            </div>
            
            <div class="profile-section">
              <h3>职业信息</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>职业</label>
                  <span>${profile.occupation || '未设置'}</span>
                </div>
                <div class="info-item">
                  <label>公司</label>
                  <span>${profile.company || '未设置'}</span>
                </div>
                <div class="info-item">
                  <label>个人网站</label>
                  <span>${profile.website ? `<a href="${profile.website}" target="_blank">${profile.website}</a>` : '未设置'}</span>
                </div>
              </div>
            </div>
            
            <div class="profile-section">
              <h3>兴趣爱好</h3>
              <div class="interests-list">
                ${profile.interests && profile.interests.length > 0 ? 
                  profile.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('') : 
                  '<p class="empty-state">暂无兴趣爱好</p>'
                }
              </div>
            </div>
            
            <div class="profile-section">
              <h3>社交媒体</h3>
              <div class="social-links">
                ${profile.socialMedia.wechat ? `
                  <div class="social-item">
                    <span class="social-icon">💬</span>
                    <span class="social-label">微信</span>
                    <span class="social-value">${profile.socialMedia.wechat}</span>
                  </div>
                ` : ''}
                ${profile.socialMedia.qq ? `
                  <div class="social-item">
                    <span class="social-icon">🐧</span>
                    <span class="social-label">QQ</span>
                    <span class="social-value">${profile.socialMedia.qq}</span>
                  </div>
                ` : ''}
                ${profile.socialMedia.weibo ? `
                  <div class="social-item">
                    <span class="social-icon">📱</span>
                    <span class="social-label">微博</span>
                    <span class="social-value">${profile.socialMedia.weibo}</span>
                  </div>
                ` : ''}
                ${profile.socialMedia.linkedin ? `
                  <div class="social-item">
                    <span class="social-icon">💼</span>
                    <span class="social-label">LinkedIn</span>
                    <span class="social-value">${profile.socialMedia.linkedin}</span>
                  </div>
                ` : ''}
                ${!profile.socialMedia.wechat && !profile.socialMedia.qq && !profile.socialMedia.weibo && !profile.socialMedia.linkedin ? 
                  '<p class="empty-state">暂无社交媒体信息</p>' : ''
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // 获取角色显示名称
  function getRoleDisplayName(role) {
    const roleNames = {
      'user': '普通用户',
      'admin': '管理员',
      'superadmin': '超级管理员',
      'lawyer': '律师',
      'lawyer_pending': '待审核律师'
    };
    return roleNames[role] || '未知角色';
  }

  // 编辑个人资料
  window.editProfile = function() {
    const user = getAuth();
    const profile = user.profile || {};
    
    setApp(html`
      <div class="profile-edit-container">
        <div class="profile-edit-header">
          <button class="btn secondary" onclick="renderProfile()">← 返回资料</button>
          <h1>编辑个人资料</h1>
        </div>
        
        <div class="profile-edit-content">
          <form id="profileEditForm" class="profile-edit-form">
            <div class="form-section">
              <h3>头像设置</h3>
              <div class="avatar-upload-section">
                <div class="current-avatar">
                  ${profile.avatar ? 
                    `<img src="${profile.avatar}" alt="当前头像" class="avatar-preview" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                    ''
                  }
                  <div class="avatar-placeholder" style="${profile.avatar ? 'display: none;' : 'display: flex;'}">
                    ${user.username.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div class="avatar-upload">
                  <input type="url" id="avatarUrl" name="avatar" value="${profile.avatar || ''}" placeholder="请输入头像图片链接">
                  <button type="button" class="btn secondary" onclick="document.getElementById('avatarFile').click()">选择本地图片</button>
                  <input type="file" id="avatarFile" accept="image/*" style="display: none;" onchange="handleAvatarUpload(event)">
                  <p class="upload-hint">支持 JPG、PNG、GIF 格式，建议尺寸 200x200 像素</p>
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <h3>基本信息</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="realName">真实姓名</label>
                  <input type="text" id="realName" name="realName" value="${profile.realName || ''}" placeholder="请输入真实姓名">
                </div>
                <div class="form-group">
                  <label for="gender">性别</label>
                  <select id="gender" name="gender">
                    <option value="">请选择性别</option>
                    <option value="男" ${profile.gender === '男' ? 'selected' : ''}>男</option>
                    <option value="女" ${profile.gender === '女' ? 'selected' : ''}>女</option>
                    <option value="其他" ${profile.gender === '其他' ? 'selected' : ''}>其他</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="birthday">生日</label>
                  <input type="date" id="birthday" name="birthday" value="${profile.birthday || ''}">
                </div>
                <div class="form-group">
                  <label for="phone">手机号</label>
                  <input type="tel" id="phone" name="phone" value="${profile.phone || ''}" placeholder="请输入手机号">
                </div>
                <div class="form-group">
                  <label for="location">所在地</label>
                  <input type="text" id="location" name="location" value="${profile.location || ''}" placeholder="请输入所在地">
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <h3>职业信息</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="occupation">职业</label>
                  <input type="text" id="occupation" name="occupation" value="${profile.occupation || ''}" placeholder="请输入职业">
                </div>
                <div class="form-group">
                  <label for="company">公司</label>
                  <input type="text" id="company" name="company" value="${profile.company || ''}" placeholder="请输入公司名称">
                </div>
                <div class="form-group">
                  <label for="website">个人网站</label>
                  <input type="url" id="website" name="website" value="${profile.website || ''}" placeholder="请输入个人网站链接">
                </div>
              </div>
            </div>
            
            <div class="form-section">
              <h3>个人简介</h3>
              <div class="form-group">
                <label for="bio">个人简介</label>
                <textarea id="bio" name="bio" rows="4" placeholder="介绍一下自己...">${profile.bio || ''}</textarea>
              </div>
            </div>
            
            <div class="form-section">
              <h3>兴趣爱好</h3>
              <div class="form-group">
                <label for="interests">兴趣爱好（用逗号分隔）</label>
                <input type="text" id="interests" name="interests" value="${profile.interests ? profile.interests.join(', ') : ''}" placeholder="例如：法律, 音乐, 运动">
              </div>
            </div>
            
            <div class="form-section">
              <h3>社交媒体</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="wechat">微信</label>
                  <input type="text" id="wechat" name="wechat" value="${profile.socialMedia?.wechat || ''}" placeholder="请输入微信号">
                </div>
                <div class="form-group">
                  <label for="qq">QQ</label>
                  <input type="text" id="qq" name="qq" value="${profile.socialMedia?.qq || ''}" placeholder="请输入QQ号">
                </div>
                <div class="form-group">
                  <label for="weibo">微博</label>
                  <input type="text" id="weibo" name="weibo" value="${profile.socialMedia?.weibo || ''}" placeholder="请输入微博账号">
                </div>
                <div class="form-group">
                  <label for="linkedin">LinkedIn</label>
                  <input type="text" id="linkedin" name="linkedin" value="${profile.socialMedia?.linkedin || ''}" placeholder="请输入LinkedIn账号">
                </div>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn secondary" onclick="renderProfile()">取消</button>
              <button type="submit" class="btn primary">保存资料</button>
            </div>
          </form>
        </div>
      </div>
    `);
    
    // 绑定表单提交事件
    document.getElementById('profileEditForm').addEventListener('submit', saveProfile);
  };

  // 处理头像上传
  window.handleAvatarUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    
    // 检查文件大小 (限制为2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过2MB');
      return;
    }
    
    // 使用FileReader转换为base64
    const reader = new FileReader();
    reader.onload = function(e) {
      const avatarUrl = e.target.result;
      document.getElementById('avatarUrl').value = avatarUrl;
      
      // 更新预览
      const preview = document.querySelector('.avatar-preview');
      const placeholder = document.querySelector('.current-avatar .avatar-placeholder');
      
      if (preview) {
        preview.src = avatarUrl;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
      } else {
        // 创建新的预览图片
        const currentAvatar = document.querySelector('.current-avatar');
        const newPreview = document.createElement('img');
        newPreview.src = avatarUrl;
        newPreview.alt = '头像预览';
        newPreview.className = 'avatar-preview';
        newPreview.onerror = function() {
          this.style.display = 'none';
          placeholder.style.display = 'flex';
        };
        
        currentAvatar.insertBefore(newPreview, placeholder);
        placeholder.style.display = 'none';
      }
    };
    reader.readAsDataURL(file);
  };

  // 保存个人资料
  function saveProfile(event) {
    event.preventDefault();
    
    const user = getAuth();
    
    // 获取表单数据
    const formData = new FormData(event.target);
    const interests = formData.get('interests') ? formData.get('interests').split(',').map(i => i.trim()).filter(i => i) : [];
    
    // 更新个人资料
    user.profile = {
      realName: formData.get('realName') || '',
      phone: formData.get('phone') || '',
      avatar: formData.get('avatar') || '',
      bio: formData.get('bio') || '',
      location: formData.get('location') || '',
      website: formData.get('website') || '',
      gender: formData.get('gender') || '',
      birthday: formData.get('birthday') || '',
      occupation: formData.get('occupation') || '',
      company: formData.get('company') || '',
      interests: interests,
      socialMedia: {
        wechat: formData.get('wechat') || '',
        qq: formData.get('qq') || '',
        weibo: formData.get('weibo') || '',
        linkedin: formData.get('linkedin') || ''
      }
    };
    
    // 更新当前用户信息
    setAuth(user);
    
    // 同步更新users存储中的用户数据
    const users = readStorage('users', []);
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      // 更新users存储中的用户数据
      users[userIndex] = {
        ...users[userIndex],
        profile: user.profile,
        email: formData.get('email') || users[userIndex].email || user.email || ''
      };
      writeStorage('users', users);
    } else {
      // 如果users存储中没有该用户，则添加
      const newUser = {
        id: user.id,
        username: user.username,
        email: formData.get('email') || user.email || '',
        role: user.role,
        createdAt: user.createdAt || Date.now(),
        profile: user.profile
      };
      users.push(newUser);
      writeStorage('users', users);
    }
    
    alert('个人资料保存成功！');
    renderProfile();
  }

  // 修改密码
  window.changePassword = function() {
    setApp(html`
      <div class="password-change-container">
        <div class="password-change-header">
          <button class="btn secondary" onclick="renderProfile()">← 返回资料</button>
          <h1>修改密码</h1>
        </div>
        
        <div class="password-change-content">
          <form id="passwordChangeForm" class="password-change-form">
            <div class="form-group">
              <label for="currentPassword">当前密码</label>
              <input type="password" id="currentPassword" name="currentPassword" required placeholder="请输入当前密码">
            </div>
            <div class="form-group">
              <label for="newPassword">新密码</label>
              <input type="password" id="newPassword" name="newPassword" required placeholder="请输入新密码" minlength="6">
            </div>
            <div class="form-group">
              <label for="confirmPassword">确认新密码</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="请再次输入新密码" minlength="6">
            </div>
            <div class="form-actions">
              <button type="button" class="btn secondary" onclick="renderProfile()">取消</button>
              <button type="submit" class="btn primary">修改密码</button>
            </div>
          </form>
        </div>
      </div>
    `);
    
    // 绑定表单提交事件
    document.getElementById('passwordChangeForm').addEventListener('submit', handlePasswordChange);
  };

  // 处理密码修改
  function handlePasswordChange(event) {
    event.preventDefault();
    
    const user = getAuth();
    const formData = new FormData(event.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    // 验证当前密码（对于演示账号，使用默认密码）
    const defaultPasswords = {
      'admin': 'admin123',
      'lawyer': '123456',
      'user': '123456'
    };
    
    const expectedPassword = user.password || defaultPasswords[user.username];
    if (currentPassword !== expectedPassword) {
      alert('当前密码不正确');
      return;
    }
    
    // 验证新密码
    if (newPassword !== confirmPassword) {
      alert('两次输入的新密码不一致');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('新密码长度至少6位');
      return;
    }
    
    // 更新密码
    user.password = newPassword;
    setAuth(user);
    
    // 同步更新users存储中的用户密码
    const users = readStorage('users', []);
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      writeStorage('users', users);
    } else {
      // 如果users存储中没有该用户，则添加
      const newUser = {
        id: user.id,
        username: user.username,
        password: newPassword,
        email: user.email || '',
        role: user.role,
        createdAt: user.createdAt || Date.now(),
        profile: user.profile || {}
      };
      users.push(newUser);
      writeStorage('users', users);
    }
    
    alert('密码修改成功！');
    renderProfile();
  }

  // 消息管理页面
  function renderAdminMessages() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    
    const notifications = readStorage('user_notifications', []);
    const chatData = readStorage('knowhow_chat_data', {});
    const messages = chatData.messages || [];
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>消息管理</h2>
          <div class="header-actions">
            <button class="btn secondary" onclick="clearAllNotifications()">清空通知</button>
            <button class="btn primary" onclick="sendSystemMessage()">发送系统消息</button>
          </div>
        </div>
        <div class="admin-content">
          <div class="admin-tabs">
            <button class="tab-btn active" onclick="switchAdminMessageTab('notifications')">系统通知 (${notifications.length})</button>
            <button class="tab-btn" onclick="switchAdminMessageTab('messages')">聊天消息 (${messages.length})</button>
          </div>
          
          <div id="notificationsTab" class="tab-content active">
            <div class="admin-list">
              ${notifications.map(notification => html`
                <div class="admin-item">
                  <div class="item-info">
                    <div class="item-title">${notification.title}</div>
                    <div class="item-meta">发送给: ${notification.toUserId} · ${new Date(notification.createdAt).toLocaleString()}</div>
                    <div class="item-desc">${notification.content}</div>
                    <div class="item-status ${notification.read ? 'read' : 'unread'}">
                      ${notification.read ? '已读' : '未读'}
                    </div>
                  </div>
                  <div class="item-actions">
                    <button class="btn danger small" onclick="deleteNotification('${notification.id}')">删除</button>
                  </div>
                </div>
              `).join('') || '<div class="empty">暂无通知</div>'}
            </div>
          </div>
          
          <div id="messagesTab" class="tab-content">
            <div class="admin-list">
              ${messages.map(message => html`
                <div class="admin-item">
                  <div class="item-info">
                    <div class="item-title">${message.senderName}</div>
                    <div class="item-meta">会话: ${message.sessionId} · ${new Date(message.createdAt).toLocaleString()}</div>
                    <div class="item-desc">${message.content}</div>
                  </div>
                  <div class="item-actions">
                    <button class="btn danger small" onclick="deleteMessage('${message.id}')">删除</button>
                  </div>
                </div>
              `).join('') || '<div class="empty">暂无聊天消息</div>'}
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // 数据管理页面
  function renderAdminData() {
    if (!requireAuth()) return;
    const user = getAuth();
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      setApp(html`<div class="admin-container"><div class="admin-header"><h1>权限不足</h1><p class="admin-subtitle">您没有访问后台管理的权限</p><div style="margin-top: 24px;"><a href="#/" class="btn primary">返回首页</a></div></div></div>`);
      return;
    }
    
    const storageInfo = window.dataManager ? window.dataManager.getStorageInfo() : { totalSize: 0, items: [], availableSpace: 0 };
    
    setApp(html`
      <div class="admin-page">
        <div class="admin-page-header">
          <button class="btn secondary" onclick="renderAdmin()">← 返回管理</button>
          <h2>数据管理</h2>
          <div class="header-actions">
            <button class="btn secondary" onclick="exportAllData()">导出数据</button>
            <button class="btn primary" onclick="showImportDialog()">导入数据</button>
          </div>
        </div>
        <div class="admin-content">
          <div class="data-stats">
            <div class="stat-item">
              <div class="stat-label">总存储大小</div>
              <div class="stat-value">${(storageInfo.totalSize / 1024).toFixed(2)} KB</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">可用空间</div>
              <div class="stat-value">${(storageInfo.availableSpace / 1024 / 1024).toFixed(2)} MB</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">存储项数量</div>
              <div class="stat-value">${storageInfo.items.length}</div>
            </div>
          </div>
          
          <div class="data-actions">
            <h3>数据操作</h3>
            <div class="action-grid">
              <button class="btn secondary" onclick="backupData()">备份数据</button>
              <button class="btn secondary" onclick="cleanExpiredData()">清理过期数据</button>
              <button class="btn secondary" onclick="clearAllData()">清空所有数据</button>
              <button class="btn danger" onclick="resetSystem()">重置系统</button>
            </div>
          </div>
          
          <div class="data-details">
            <h3>存储详情</h3>
            <div class="storage-list">
              ${storageInfo.items.map(item => html`
                <div class="storage-item">
                  <div class="storage-name">${item.key}</div>
                  <div class="storage-type">${item.type}</div>
                  <div class="storage-size">${(item.size / 1024).toFixed(2)} KB</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // 消息管理相关函数
  window.switchAdminMessageTab = function(tabName) {
    document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-content .tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[onclick="switchAdminMessageTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
  };

  window.clearAllNotifications = function() {
    if (confirm('确定要清空所有通知吗？此操作不可恢复！')) {
      writeStorage('user_notifications', []);
      alert('所有通知已清空');
      renderAdminMessages();
    }
  };

  window.deleteNotification = function(notificationId) {
    if (confirm('确定要删除这条通知吗？')) {
      const notifications = readStorage('user_notifications', []);
      const updatedNotifications = notifications.filter(n => n.id !== notificationId);
      writeStorage('user_notifications', updatedNotifications);
      alert('通知已删除');
      renderAdminMessages();
    }
  };

  window.deleteMessage = function(messageId) {
    if (confirm('确定要删除这条消息吗？')) {
      const chatData = readStorage('knowhow_chat_data', {});
      if (chatData.messages) {
        chatData.messages = chatData.messages.filter(m => m.id !== messageId);
        writeStorage('knowhow_chat_data', chatData);
      }
      alert('消息已删除');
      renderAdminMessages();
    }
  };

  window.sendSystemMessage = function() {
    const title = prompt('请输入消息标题：');
    if (!title) return;
    
    const content = prompt('请输入消息内容：');
    if (!content) return;
    
    const users = readStorage('users', []);
    const notifications = readStorage('user_notifications', []);
    
    users.forEach(user => {
      const notification = {
        id: nid(),
        toUserId: user.id,
        type: 'system',
        title: title,
        content: content,
        createdAt: Date.now(),
        read: false
      };
      notifications.push(notification);
    });
    
    writeStorage('user_notifications', notifications);
    alert(`系统消息已发送给 ${users.length} 个用户`);
    renderAdminMessages();
  };

  // 数据管理相关函数
  window.exportAllData = function() {
    if (window.dataManager) {
      const data = window.dataManager.exportAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `knowhow_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      alert('数据导出成功');
    } else {
      alert('数据管理器未初始化');
    }
  };

  window.showImportDialog = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          try {
            const data = JSON.parse(e.target.result);
            if (window.dataManager && window.dataManager.importData(data)) {
              alert('数据导入成功');
              renderAdminData();
            } else {
              alert('数据导入失败');
            }
          } catch (error) {
            alert('文件格式错误');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  window.backupData = function() {
    if (window.dataManager) {
      const backup = window.dataManager.backup();
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `knowhow_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      alert('数据备份成功');
    } else {
      alert('数据管理器未初始化');
    }
  };

  window.cleanExpiredData = function() {
    if (window.dataManager) {
      const cleanedCount = window.dataManager.cleanExpiredData(30);
      alert(`已清理 ${cleanedCount} 条过期数据`);
      renderAdminData();
    } else {
      alert('数据管理器未初始化');
    }
  };

  window.clearAllData = function() {
    if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
      if (window.dataManager) {
        window.dataManager.clearAll();
        alert('所有数据已清空');
        renderAdminData();
      } else {
        alert('数据管理器未初始化');
      }
    }
  };

  window.resetSystem = function() {
    if (confirm('确定要重置系统吗？这将清空所有数据并重新初始化！')) {
      if (window.dataManager) {
        window.dataManager.clearAll();
        // 重新初始化系统
        seedIfEmpty();
        alert('系统已重置');
        location.reload();
      } else {
        alert('数据管理器未初始化');
      }
    }
  };

})(); 