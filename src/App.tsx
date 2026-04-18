import { useState, useEffect, useRef } from 'react';
import { 
  Globe, Cpu, Sun, Moon, Database, Server, Zap, Shield, 
  Layers, MessageSquare, Image as ImageIcon, Link2, 
  Search, Settings, Activity, FileText, CheckCircle, 
  Clock, Cloud, ChevronRight, Github, Twitter, Wrench, 
  TerminalSquare, LogIn, LogOut, Menu, X, Music, Play, 
  SkipForward, SkipBack, Sparkles, Coffee, Heart, Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type RouteState = 'home' | 'blog' | 'projects' | 'links' | 'profile' | 'admin';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [route, setRoute] = useState<RouteState>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogin = () => {
    // 模拟 GitHub OAuth 登录
    setIsLoggedIn(true);
    setIsAdmin(true); // 自动设为管理员以供演示
    setRoute('profile');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setRoute('home');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-body)] font-sans transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      
      {/* ================= 悬浮全局导航栏 / Global Nav Bar ================= */}
      <header className="sticky top-0 z-50 w-full pt-4 sm:pt-6 pb-2 pointer-events-none">
         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pointer-events-auto">
            <nav className="w-full relative flex flex-wrap md:flex-nowrap gap-3 sm:gap-4 justify-between items-center bg-[var(--bg-card)]/80 backdrop-blur-xl rounded-[2rem] p-2.5 sm:p-3 shadow-sm border border-[var(--border)] transition-all">
            
            {/* Logo 区 */}
            <div 
               className="flex items-center gap-3 pl-2 pr-2 sm:pr-6 cursor-pointer group shrink-0"
               onClick={() => setRoute('home')}
            >
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                  <Cloud size={16} fill="currentColor" />
               </div>
               <span className="font-black text-[var(--text-main)] tracking-tight uppercase text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors hidden sm:block">
                  CF HUB.
               </span>
            </div>

            {/* 右侧动作控制区 (此时在移动端放回 Logo 旁边) */}
            <div className="flex items-center gap-1.5 sm:gap-3 pr-1 ml-auto md:ml-0 md:order-last shrink-0">
               <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[var(--bg-body)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors border border-transparent hover:border-[var(--border)] cursor-text">
                  <Search size={18} />
               </button>
               <button 
                  onClick={() => setIsDark(!isDark)} 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[var(--bg-body)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors border border-transparent hover:border-[var(--border)]"
               >
                 {isDark ? <Sun size={18} /> : <Moon size={18} />}
               </button>
               
               <div className="w-[1px] h-5 bg-[var(--border)] mx-1 hidden md:block"></div>

               {!isLoggedIn ? (
                  <button 
                     onClick={handleLogin} 
                     className="flex items-center gap-2 bg-gray-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-sm shadow-md hover:scale-105 transition-transform shrink-0 whitespace-nowrap"
                  >
                     <Github size={16} /> <span className="hidden sm:inline">GitHub 登录</span>
                     <span className="sm:hidden">登录</span>
                  </button>
               ) : (
                  <button 
                     onClick={() => { setRoute('profile'); setIsMobileMenuOpen(false); }}
                     className={`flex items-center gap-2 px-1.5 py-1.5 rounded-full border-2 transition-all hover:scale-105 ${route === 'profile' || route === 'admin' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : 'border-transparent hover:border-emerald-300'}`}
                  >
                     <div className="w-7 h-7 sm:w-7 sm:h-7 rounded-full overflow-hidden shadow-sm bg-white">
                        <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="User" className="w-full h-full object-cover" />
                     </div>
                  </button>
               )}

               <button 
                  className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-main)] bg-[var(--bg-body)] border border-[var(--border)] transition-colors ml-1"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
               </button>
            </div>

            {/* 中心导航区 (主页、博客、项目、友链) - 仅大屏显示 */}
            <div className="hidden md:flex items-center gap-1 bg-[var(--bg-body)] p-1.5 rounded-[1.5rem] border border-[var(--border)] shadow-inner w-full md:w-auto order-last md:order-none">
               {[
                 { id: 'home', label: '主页', icon: <Globe size={16} /> },
                 { id: 'blog', label: '博客', icon: <FileText size={16} /> },
                 { id: 'projects', label: '项目', icon: <Layers size={16} /> },
                 { id: 'links', label: '友链', icon: <Link2 size={16} /> },
               ].map((item) => {
                  const isActive = route === item.id;
                  return (
                     <button 
                        key={item.id}
                        onClick={() => setRoute(item.id as RouteState)}
                        className={`relative flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-colors duration-300 whitespace-nowrap outline-none ${
                           isActive 
                             ? 'text-indigo-600 dark:text-indigo-400' 
                             : 'text-[var(--text-muted)] hover:text-[var(--text-main)] opacity-80'
                        }`}
                     >
                        {isActive && (
                           <motion.div
                              layoutId="desktop-nav-pill"
                              className="absolute inset-0 bg-[var(--bg-card)] shadow-sm border border-[var(--border)] rounded-full"
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                           />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                           {item.icon} <span>{item.label}</span>
                        </span>
                     </button>
                  );
               })}
            </div>

            {/* 移动端菜单折叠面板：改为独立的悬浮浮层，避免改变 header 高度从而导致屏幕跳动 */}
            <AnimatePresence>
               {isMobileMenuOpen && (
                  <motion.div 
                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -10, scale: 0.95 }}
                     transition={{ duration: 0.2 }}
                     className="absolute top-full left-0 right-0 mt-3 md:hidden overflow-hidden flex flex-col items-center bg-[var(--bg-card)]/95 backdrop-blur-xl rounded-[1.5rem] shadow-xl border border-[var(--border)] p-2 z-50 origin-top"
                  >
                     <div className="w-full flex flex-col gap-1.5">
                        {[
                          { id: 'home', label: '主页', icon: <Globe size={16} /> },
                          { id: 'blog', label: '博客', icon: <FileText size={16} /> },
                          { id: 'projects', label: '项目', icon: <Layers size={16} /> },
                          { id: 'links', label: '友链', icon: <Link2 size={16} /> },
                        ].map((item) => (
                           <button 
                              key={item.id}
                              onClick={() => { setRoute(item.id as RouteState); setIsMobileMenuOpen(false); }}
                              className={`flex items-center justify-center gap-3 w-full py-3 rounded-[1rem] text-sm font-bold transition-all duration-300 ${
                                 route === item.id 
                                   ? 'bg-[var(--bg-body)] shadow-sm text-indigo-600 dark:text-indigo-400 border border-[var(--border)] scale-100' 
                                   : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-body)] border border-transparent scale-95 opacity-80'
                              }`}
                           >
                              {item.icon} <span>{item.label}</span>
                           </button>
                        ))}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

         </nav>
         </div>
      </header>

      {/* ================= 核心视口路由切换 ================= */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20">
         <AnimatePresence mode="wait">
            <motion.div
               key={route}
               initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
               transition={{ duration: 0.3, ease: 'easeOut' }}
               className="w-full h-full"
            >
               {route === 'home' && <HomeView />}
               {(route === 'blog' || route === 'projects' || route === 'links') && <MockContent route={route} />}
               {route === 'profile' && <ProfileView isAdmin={isAdmin} onLogout={handleLogout} onEnterAdmin={() => setRoute('admin')} />}
               {route === 'admin' && <AdminView />}
            </motion.div>
         </AnimatePresence>
      </main>

    </div>
  );
}

// -----------------------------------------------------------------------------
// Home View - 包含二次元背景墙与 Fuwari 排版
// -----------------------------------------------------------------------------
function HomeView() {
   return (
      <div className="flex flex-col gap-6 w-full mt-2">
         
         {/* ================= 顶部：二次元背景墙 (Anime Hero Banner) ================= */}
         <div className="w-full h-[180px] sm:h-[240px] rounded-[2.5rem] overflow-hidden relative shadow-sm border border-[var(--border)] group">
            {/* 纯粹的插画背景装饰 */}
            <img 
               src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=2000" 
               alt="Anime Hero Banner" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 origin-center" 
               referrerPolicy="no-referrer"
            />
         </div>

         {/* ================= 下方主体两栏排版 (Fuwari Sidebar + Main Grid) ================= */}
         <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
            
            {/* 1. 左侧：Fuwari 风格个人侧边栏 */}
            <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-[120px] z-10">
               
               {/* 个人名片 Card */}
               <div className="bg-[var(--bg-card)] rounded-[2.5rem] p-6 sm:p-8 shadow-sm border border-[var(--border)] flex flex-col items-center text-center relative overflow-hidden group">
                  {/* Soft Gradient Background matches fuwari */}
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 opacity-80"></div>
                  
                  {/* 头像 Avatar */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[6px] border-[var(--bg-card)] shadow-lg overflow-hidden relative z-10 mb-4 bg-white dark:bg-zinc-800">
                     <img src="https://picsum.photos/seed/creatoravatar/200/200" alt="Creator Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  
                  <h2 className="text-2xl font-black text-[var(--text-main)] mb-1 relative z-10">Creator X.</h2>
                  <p className="text-sm font-bold text-emerald-500 mb-4 relative z-10 flex items-center justify-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                     <Cpu size={14}/> Full-Stack Dev
                  </p>
                  
                  <p className="text-sm text-[var(--text-muted)] font-medium mb-6 leading-relaxed relative z-10">
                     Building scalable interfaces & highly available systems on the edge. 
                  </p>
                  
                  {/* 社交/互联按钮 */}
                  <div className="flex justify-center gap-3 w-full relative z-10">
                     <button className="flex-1 bg-[var(--text-main)] text-[var(--bg-card)] py-2.5 rounded-2xl text-sm font-bold shadow-md hover:scale-[1.02] transition-transform">Follow</button>
                     <button className="w-10 h-10 bg-[var(--bg-body)] text-[var(--text-main)] rounded-2xl flex items-center justify-center border border-[var(--border)] hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors flex-shrink-0">
                        <Github size={18} />
                     </button>
                     <button className="w-10 h-10 bg-[var(--bg-body)] text-[var(--text-main)] rounded-2xl flex items-center justify-center border border-[var(--border)] hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors flex-shrink-0">
                        <Twitter size={18} />
                     </button>
                  </div>
               </div>

               {/* 架构数据胶囊 */}
               <div className="bg-[var(--bg-card)] rounded-[2rem] p-6 shadow-sm border border-[var(--border)] flex flex-col gap-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="font-bold text-[var(--text-main)] flex items-center gap-2"><FileText size={16} className="text-indigo-500"/> 文章</span>
                     <span className="font-mono text-[var(--text-muted)] bg-[var(--bg-body)] px-2 py-0.5 rounded-md">142</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="font-bold text-[var(--text-main)] flex items-center gap-2"><Layers size={16} className="text-emerald-500"/> 项目</span>
                     <span className="font-mono text-[var(--text-muted)] bg-[var(--bg-body)] px-2 py-0.5 rounded-md">8</span>
                  </div>
               </div>
            </aside>

            {/* 2. 右侧：瀑布流与聚合内容面板 */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
               
               {/* 趣味挂件 Bento Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {/* Music Player Widget */}
                  <div className="bg-[var(--bg-card)] rounded-[2.5rem] p-6 shadow-sm border border-[var(--border)] relative overflow-hidden group flex flex-col justify-end min-h-[160px]">
                     {/* Blurred Album Art Background */}
                     <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=500')" }}></div>
                     
                     <div className="relative z-10 flex items-center gap-4 mb-4">
                        <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=150" alt="Album Art" className="w-16 h-16 rounded-2xl shadow-md rotate-3 group-hover:rotate-0 transition-all duration-300 object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Music size={12} className="animate-pulse"/> Now Playing</p>
                           <h4 className="text-base font-bold text-[var(--text-main)] truncate leading-tight">Midnight City</h4>
                           <p className="text-xs font-medium text-[var(--text-muted)] truncate">M83 - Hurry Up, We're Dreaming</p>
                        </div>
                     </div>
                     
                     {/* Controls & Progress */}
                     <div className="relative z-10 bg-[var(--bg-body)]/80 backdrop-blur-md rounded-2xl p-3 border border-[var(--border)]">
                        <div className="flex items-center justify-between mb-2">
                           <button className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"><SkipBack size={16}/></button>
                           <button className="w-8 h-8 rounded-full bg-[var(--text-main)] text-[var(--bg-card)] flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><Play size={14} fill="currentColor" className="ml-0.5"/></button>
                           <button className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"><SkipForward size={16}/></button>
                           <div className="w-[1px] h-4 bg-[var(--border)] mx-1"></div>
                           <button className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"><Volume2 size={16}/></button>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] font-mono font-bold text-[var(--text-muted)] w-6 text-right shrink-0">1:24</span>
                           <div className="flex-1 h-1.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-full overflow-hidden shrink min-w-0">
                              <div className="h-full w-1/3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative">
                                 <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 animate-pulse"></div>
                              </div>
                           </div>
                           <span className="text-[9px] font-mono font-bold text-[var(--text-muted)] w-6 shrink-0">4:03</span>
                        </div>
                     </div>
                  </div>

                  {/* Advanced Cyber Pet Habitat */}
                  <AdvancedCyberPet />
               </div>

               {/* Blog Post Feed */}
               <div className="bg-[var(--bg-card)] rounded-[2.5rem] p-3 shadow-sm border border-[var(--border)] flex flex-col gap-1">
                  <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                     <h2 className="text-lg font-black text-[var(--text-main)] flex items-center gap-2">
                        近期发布
                     </h2>
                     <button className="text-[var(--text-muted)] text-sm font-bold flex items-center hover:text-[var(--text-main)] transition-colors">
                        Archive <ChevronRight size={16}/>
                     </button>
                  </div>

                  {[
                     { date: '2026-04-18', title: '全栈重构：将博客从 Next.js 完全迁移至 TanStack Start + Hono', desc: '深入探讨缘何放弃传统 Node 服务器，全量拥抱边缘计算节点的实践经验与坑点分析。', tags: ['Architecture', 'React 19'] },
                     { date: '2026-04-10', title: '使用 D1 打造强一致性的 Serverless 评论系统与 Turnstile 防护', desc: '实现毫秒级互动的边缘评论区原理揭秘，以及通过 D1 Binding 防篡改的安全拦截。', tags: ['D1', 'Security'] },
                     { date: '2026-03-22', title: '探索 Workers AI：为个人枢纽接入原生 MCP (Model Context Protocol)', desc: '不限于大语言模型对话，教你如何利用 AI 来聚合、总结甚至审计全站日志。', tags: ['AI', 'MCP'] },
                     { date: '2026-03-05', title: '现代流体排版：Bento Grid 与 Fuwari UI 美学的碰撞', desc: '如何在 Tailwind CSS 4 时代，使用极其精简的类名构筑如丝般顺滑的便当盒式 UI。', tags: ['Design', 'Tailwind'] },
                  ].map((post, i) => (
                     <div key={i} className="group p-5 rounded-[2rem] hover:bg-[var(--bg-body)] transition-colors cursor-pointer flex flex-col gap-3 border border-transparent hover:border-[var(--border)] relative">
                        <div className="flex flex-col gap-1.5 pr-8">
                           <h3 className="text-lg md:text-xl font-bold text-[var(--text-main)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                              {post.title}
                           </h3>
                           <p className="text-sm font-medium text-[var(--text-muted)] line-clamp-2 md:line-clamp-1">{post.desc}</p>
                        </div>
                        
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)] shadow-sm border border-[var(--border)] flex items-center justify-center text-[var(--text-main)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all hidden sm:flex">
                           <ChevronRight size={16}/>
                        </div>

                        <div className="flex items-center gap-3 mt-1.5 min-w-0">
                           <span className="text-xs font-mono text-[var(--text-muted)] bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md shrink-0">{post.date}</span>
                           <div className="flex gap-1.5 sm:gap-2 overflow-hidden flex-1 min-w-0">
                              {post.tags.map(t => <span key={t} title={t} className="text-[10px] font-bold text-[var(--text-muted)] border border-[var(--border)] px-2 py-1 rounded-md uppercase tracking-wider truncate shrink min-w-0">{t}</span>)}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

            </div>
         </div>
      </div>
   );
}


// -----------------------------------------------------------------------------
// Profile View - 个人配置页 (OAuth 后进入)
// -----------------------------------------------------------------------------
function ProfileView({ isAdmin, onLogout, onEnterAdmin }: { isAdmin: boolean, onLogout: () => void, onEnterAdmin: () => void }) {
   return (
      <div className="w-full flex justify-center mt-6">
         <div className="bg-[var(--bg-card)] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[var(--border)] flex flex-col items-center text-center w-full max-w-2xl relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-24 h-24 rounded-full border-[6px] border-emerald-50 max-w-full dark:border-emerald-900/30 shadow-md overflow-hidden mb-6 relative z-10">
               <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="User Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            
            <h2 className="text-3xl font-black text-[var(--text-main)] mb-1 relative z-10">GitHub User</h2>
            <p className="text-[var(--text-muted)] font-medium mb-8 relative z-10">github_user@example.com <span className="mx-2 text-[var(--border)]">|</span> UID: 99190001</p>

            {isAdmin && (
               <div className="w-full bg-gradient-to-b from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-[2rem] p-8 border border-emerald-200/60 dark:border-emerald-800/50 mb-8 flex flex-col items-center relative z-10 shadow-sm transition-all hover:shadow-md">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-inner">
                     <Shield size={28} />
                  </div>
                  <h3 className="text-xl font-black text-emerald-900 dark:text-emerald-300 mb-2 tracking-tight">Superadmin Identity Verified</h3>
                  <p className="text-sm font-medium text-emerald-700/80 dark:text-emerald-400/80 max-w-md mx-auto mb-6">
                     You have full system privileges. You can access the unified background console to manage CMS posts, D1 databases, and R2 media assets.
                  </p>
                  <button 
                     onClick={onEnterAdmin}
                     className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-8 py-3.5 rounded-full font-bold shadow-md hover:scale-105 transition-all w-full md:w-auto flex items-center justify-center gap-2"
                  >
                     <Server size={18}/> 进入系统后台 (Admin Console)
                  </button>
               </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
               <button className="flex-1 md:flex-none border border-[var(--border)] bg-[var(--bg-body)] hover:bg-gray-200 dark:hover:bg-zinc-800 text-[var(--text-main)] px-8 py-3 rounded-full font-bold transition-colors">
                  账户设置
               </button>
               <button 
                  onClick={onLogout}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 px-8 py-3 rounded-full font-bold transition-colors"
               >
                  <LogOut size={16}/> 退出登录
               </button>
            </div>
         </div>
      </div>
   );
}


// -----------------------------------------------------------------------------
// Admin View - 后台管理页面
// -----------------------------------------------------------------------------
function AdminView() {
   const [activeTab, setActiveTab] = useState('dashboard');

   const MENU_ITEMS = [
      { id: 'dashboard', label: '仪表盘', sys: 'Metrics', icon: <Activity className="w-5 h-5" /> },
      { id: 'posts', label: '内容库', sys: 'CMS', icon: <FileText className="w-5 h-5" /> },
      { id: 'media', label: 'R2 媒体', sys: 'Storage', icon: <ImageIcon className="w-5 h-5" /> },
      { id: 'settings', label: '设置', sys: 'Config', icon: <Settings className="w-5 h-5" /> },
   ];

   return (
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start mt-4">
         <aside className="w-full lg:w-[240px] flex-shrink-0 flex flex-col gap-2 lg:sticky lg:top-[120px] z-10 bg-[var(--bg-card)] rounded-[2.5rem] p-4 shadow-sm border border-[var(--border)] overflow-hidden">
            <div className="flex items-center gap-3 mb-4 px-2 pt-2">
               <div className="w-10 h-10 rounded-[1.2rem] bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center flex-shrink-0">
                  <Wrench size={18} />
               </div>
               <div className="flex flex-col">
                  <h3 className="font-black text-base leading-tight text-[var(--text-main)]">Console</h3>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Superadmin</span>
               </div>
            </div>
            <nav className="flex lg:flex-col gap-1 w-full overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
               {MENU_ITEMS.map(item => (
                  <button 
                     key={item.id}
                     onClick={() => setActiveTab(item.id)}
                     className={`flex items-center justify-center lg:justify-start gap-4 px-4 py-3 rounded-[1.25rem] text-sm font-bold transition-all text-left flex-shrink-0 ${
                        activeTab === item.id 
                           ? 'bg-gray-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md' 
                           : 'text-[var(--text-muted)] hover:bg-[var(--bg-body)] hover:text-[var(--text-main)]'
                     }`}
                  >
                     {item.icon} <span className="hidden lg:block">{item.label}</span>
                  </button>
               ))}
            </nav>
         </aside>

         <div className="flex-1 w-full min-w-0 bg-[var(--bg-card)] rounded-[2.5rem] p-8 shadow-sm border border-[var(--border)] min-h-[600px]">
             <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border)]">
                 <h2 className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tight flex items-center gap-3">
                     <Database size={24} className="text-emerald-500" />
                     {MENU_ITEMS.find(i => i.id === activeTab)?.sys || 'Module'} Mode
                 </h2>
                 <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs px-3 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1.5 hidden sm:flex">
                    <CheckCircle size={14}/> D1 Connected
                 </span>
             </div>
             
             <div className="text-center py-20 flex flex-col items-center">
                <TerminalSquare size={48} className="text-[var(--text-muted)] opacity-30 mb-6" />
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">REST API & Worker Functions Active</h3>
                <p className="text-[var(--text-muted)] font-medium max-w-sm">
                   The backend interface handles full data hydration for the <b>{activeTab}</b> endpoints seamlessly.
                </p>
             </div>
         </div>
      </div>
   );
}


// -----------------------------------------------------------------------------
// Generic Mock View for other Portal routes
// -----------------------------------------------------------------------------
function MockContent({ route }: { route: string }) {
   return (
      <div className="w-full flex justify-center mt-6">
         <div className="bg-[var(--bg-card)] rounded-[2.5rem] p-16 shadow-sm border border-[var(--border)] border-dashed text-center w-full min-h-[500px] flex flex-col items-center justify-center">
             <Globe size={48} className="text-[var(--text-muted)] opacity-30 mb-6" />
             <h2 className="text-2xl font-black text-[var(--text-main)] uppercase mb-4 tracking-wider">[{route}] ROUTE</h2>
             <p className="text-[var(--text-muted)] font-medium">This route is currently a placeholder prototype.</p>
         </div>
      </div>
   )
}


// -----------------------------------------------------------------------------
// Interactive Cyber Pet Component
// -----------------------------------------------------------------------------
function AdvancedCyberPet() {
   const [petX, setPetX] = useState(50);
   const [petAction, setPetAction] = useState<'idle' | 'walking' | 'eating' | 'happy'>('idle');
   const [facingRight, setFacingRight] = useState(true);
   const [particles, setParticles] = useState<{ id: number, icon: string }[]>([]);
   const [foodProp, setFoodProp] = useState<string | null>(null);
   const [stamina, setStamina] = useState(60);
   const [happiness, setHappiness] = useState(80);
   const petRef = useRef<HTMLDivElement>(null);

   // Status reduction over time
   useEffect(() => {
      const interval = setInterval(() => {
         setStamina(prev => Math.max(0, prev - 2));
         setHappiness(prev => Math.max(0, prev - 1));
      }, 4000);
      return () => clearInterval(interval);
   }, []);

   // Function to spawn floating particles
   const popParticle = (emoji: string) => {
      const id = Date.now() + Math.random();
      setParticles(prev => [...prev, { id, icon: emoji }]);
      setTimeout(() => {
         setParticles(prev => prev.filter(p => p.id !== id));
      }, 1500);
   };

   // Roaming Logic
   useEffect(() => {
      const loop = setInterval(() => {
         if (petAction !== 'idle') return;
         if (Math.random() > 0.4) {
            const nextX = 10 + Math.random() * 80;
            setFacingRight(nextX > petX);
            setPetX(nextX);
            setPetAction('walking');
            setTimeout(() => {
               setPetAction('idle');
            }, 2000); // Wait for the walk transition to complete
         }
      }, 3000);
      return () => clearInterval(loop);
   }, [petAction, petX]);

   // Intersection check
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const isOverPet = (info: any) => {
      if (!petRef.current) return false;
      const rect = petRef.current.getBoundingClientRect();
      const x = info.point.x;
      const y = info.point.y;
      // Provide a slightly larger hitbox
      const padding = 20;
      return x >= (rect.left - padding) && x <= (rect.right + padding) && 
             y >= (rect.top - padding) && y <= (rect.bottom + padding);
   };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleFoodDrop = (food: string, e: any, info: any) => {
      if (isOverPet(info)) {
         setPetAction('eating');
         setFoodProp(food);
         setStamina(prev => Math.min(100, prev + 35));
         setTimeout(() => {
            setPetAction('idle');
            setFoodProp(null);
            popParticle('✨'); // happy after eating
         }, 3000);
      }
   };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleHandDrag = (e: any, info: any) => {
      if (petAction === 'eating') return; // Cannot pet while eating
      if (isOverPet(info)) {
         // Because it triggers many times, just check if it's a large delta to trigger happy
         if (Math.abs(info.delta.x) > 5) {
            if (petAction !== 'happy') {
               setPetAction('happy');
               setHappiness(prev => Math.min(100, prev + 25));
               popParticle('❤️');
               setTimeout(() => setPetAction('idle'), 2000);
            }
         }
      }
   };

   return (
      <div className="bg-[var(--bg-card)] rounded-[2.5rem] shadow-sm border border-[var(--border)] relative overflow-hidden flex flex-col w-full h-[260px] select-none">
         {/* Background / Environment */}
         <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-main) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
         
         {/* Floor Track */}
         <div className="absolute bottom-0 w-full h-12 bg-emerald-500/10 dark:bg-emerald-500/5 border-t border-emerald-500/20" />
         
         {/* Status Meters (Top Right) */}
         <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
            <LiquidMeter value={stamina} colorClass="bg-rose-400 dark:bg-rose-500" icon="⚡" />
            <LiquidMeter value={happiness} colorClass="bg-amber-400 dark:bg-amber-500" icon="🎵" />
         </div>

         {/* Toolbox Wrapper (Left) */}
         <div className="absolute top-4 left-4 flex items-center gap-2 z-50">
            {['🍖', '🐟', '🍎'].map(f => (
               <motion.div 
                  key={f} 
                  drag 
                  dragSnapToOrigin 
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onDragEnd={(e: any, info: any) => handleFoodDrop(f, e, info)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9, cursor: 'grabbing' }}
                  className="w-9 h-9 bg-[var(--bg-body)] rounded-full flex items-center justify-center shadow-md border hover:border-indigo-400 border-[var(--border)] cursor-grab text-lg"
               >
                  {f}
               </motion.div>
            ))}
            <div className="w-[1px] h-6 bg-[var(--border)] mx-1"></div>
            <motion.div 
               drag 
               dragSnapToOrigin 
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               onDrag={(e: any, info: any) => handleHandDrag(e, info)}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9, cursor: 'grabbing' }}
               className="w-10 h-10 bg-pink-50 dark:bg-pink-900/40 rounded-full flex items-center justify-center shadow-lg border hover:border-pink-400 border-pink-200 dark:border-pink-800 cursor-grab text-xl"
            >
               🖐️
            </motion.div>
         </div>

         {/* Pet Container */}
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <motion.div
               ref={petRef}
               className="absolute bottom-10 pointer-events-auto"
               animate={{ left: `${petX}%` }}
               transition={{ duration: 2, ease: "linear" }}
               // Adjust translation to center the pet correctly
               style={{ x: "-50%" }}
            >
               {/* Particles */}
               <AnimatePresence>
                  {particles.map(p => (
                     <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: -10, scale: 0 }}
                        animate={{ opacity: 1, y: -60, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl z-30 pointer-events-none drop-shadow-md"
                     >
                        {p.icon}
                     </motion.div>
                  ))}
               </AnimatePresence>

               {/* Custom SVG Pet */}
               <PetBody state={petAction} facingRight={facingRight} food={foodProp} />
            </motion.div>
         </div>
      </div>
   );
}

function PetBody({ state, facingRight, food }: { state: string, facingRight: boolean, food: string | null }) {
   return (
      <motion.div
         animate={{ scaleX: facingRight ? 1 : -1 }}
         className="relative w-20 h-16 origin-bottom drop-shadow-lg"
      >
         {/* Tail */}
         <motion.div
            className="absolute -left-3 top-6 w-6 h-[6px] bg-[var(--text-main)] rounded-full origin-right"
            animate={{ rotate: state === 'happy' ? [0, -40, 40, 0] : state === 'walking' ? [0, 15, -15, 0] : [0, 10, -10, 0] }}
            transition={{ duration: state === 'happy' ? 0.3 : 1, repeat: Infinity }}
         />
         
         {/* Legs */}
         <div className="absolute bottom-0 left-2 flex gap-3">
            <motion.div className="w-[6px] h-3 bg-[var(--text-main)] rounded-full" animate={state === 'walking' ? { y: [0, -3, 0] } : {}} transition={{ duration: 0.3, repeat: Infinity }} />
            <motion.div className="w-[6px] h-3 bg-[var(--text-main)] rounded-full" animate={state === 'walking' ? { y: [0, -3, 0] } : {}} transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }} />
         </div>
         <div className="absolute bottom-0 right-3 flex gap-3">
            <motion.div className="w-[6px] h-3 bg-[var(--text-main)] rounded-full" animate={state === 'walking' ? { y: [0, -3, 0] } : {}} transition={{ duration: 0.3, repeat: Infinity, delay: 0.07 }} />
            <motion.div className="w-[6px] h-3 bg-[var(--text-main)] rounded-full" animate={state === 'walking' ? { y: [0, -3, 0] } : {}} transition={{ duration: 0.3, repeat: Infinity, delay: 0.22 }} />
         </div>

         {/* Main Body */}
         <motion.div
            className="absolute top-2 left-0 w-16 h-12 bg-white dark:bg-zinc-800 border-[3px] border-[var(--text-main)] rounded-2xl overflow-hidden"
            animate={state === 'walking' ? { y: [0, -2, 0] } : state === 'eating' ? { scaleY: [1, 0.95, 1], y: [0, 2, 0] } : {}}
            transition={{ duration: 0.3, repeat: Infinity }}
         />

         {/* Head */}
         <motion.div
            className="absolute -right-2 -top-2 w-12 h-11 bg-white dark:bg-zinc-800 border-[3px] border-[var(--text-main)] rounded-xl z-10"
            animate={
               state === 'eating' ? { rotate: [0, 15, 0], y: [0, 4, 0] } :
               state === 'happy' ? { rotate: [0, -10, 10, 0], y: [0, -5, 0] } :
               { rotate: [0, 3, -3, 0] }
            }
            transition={{ duration: state === 'eating' ? 0.4 : state === 'happy' ? 0.3 : 2, repeat: Infinity }}
         >
            {/* Ears */}
            <div className="absolute -top-[10px] left-1 w-3 h-4 bg-white dark:bg-zinc-800 border-[3px] border-[var(--text-main)] border-b-0 rounded-t-full -rotate-12" />
            <div className="absolute -top-[10px] right-2 w-3 h-4 bg-white dark:bg-zinc-800 border-[3px] border-[var(--text-main)] border-b-0 rounded-t-full rotate-12" />
            
            {/* Eyes */}
            <div className="absolute top-3 right-2 flex gap-1.5 z-20">
               {state === 'happy' ? (
                  <>
                     <span className="text-[10px] font-black leading-none text-[var(--text-main)]">^</span>
                     <span className="text-[10px] font-black leading-none text-[var(--text-main)]">^</span>
                  </>
               ) : (
                  <>
                     <div className="w-2 h-2.5 bg-[var(--text-main)] rounded-full" />
                     <div className="w-2 h-2.5 bg-[var(--text-main)] rounded-full" />
                  </>
               )}
            </div>

            {/* Blush */}
            <div className={`absolute top-5 right-1 w-2 h-1 bg-pink-400 rounded-full transition-opacity duration-300 ${state === 'happy' ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute top-5 right-7 w-2 h-1 bg-pink-400 rounded-full transition-opacity duration-300 ${state === 'happy' ? 'opacity-100' : 'opacity-0'}`} />

            {/* Mouth / Nose */}
            {state === 'eating' ? (
               <div className="absolute top-6 right-3 w-3 h-2 bg-rose-400 rounded-b-full shadow-inner" />
            ) : state === 'happy' ? (
               <div className="absolute top-5 right-4 text-[8px] font-black leading-none text-[var(--text-main)]">v</div>
            ) : (
               <div className="absolute top-6 right-4 w-1.5 h-1.5 bg-pink-400 rounded-full" /> // small nose
            )}
         </motion.div>

         {/* Currently Eating Food Drop */}
         <AnimatePresence>
            {state === 'eating' && food && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -right-6 bottom-0 text-xl z-20 drop-shadow-sm"
               >
                  {food}
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}

function LiquidMeter({ value, colorClass, icon }: { value: number, colorClass: string, icon: string }) {
   const clampedValue = Math.max(0, Math.min(100, value));
   return (
      <div 
         className="relative w-8 h-8 rounded-full border-[1.5px] border-[var(--border)] bg-[var(--bg-body)] overflow-hidden shadow-inner flex items-center justify-center pointer-events-none"
         title={`${icon} ${clampedValue}%`}
      >
         {/* Liquid Fill */}
         <div 
            className={`absolute bottom-0 w-full transition-all duration-700 ease-out z-0 ${colorClass}`} 
            style={{ height: `${clampedValue}%` }}
         >
            {/* Spinning Negative Space Waves */}
            <div className="absolute left-1/2 -top-[35px] w-[40px] h-[40px] -translate-x-1/2 bg-[var(--bg-body)] rounded-[40%] animate-[spin_4s_linear_infinite] opacity-60" />
            <div className="absolute left-1/2 -top-[38px] w-[40px] h-[40px] -translate-x-1/2 bg-[var(--bg-body)] rounded-[45%] animate-[spin_5s_linear_infinite]" />
         </div>
         {/* Icon */}
         <span className="relative z-10 text-[10px] drop-shadow-sm mix-blend-luminosity brightness-200">
            {icon}
         </span>
      </div>
   );
}
