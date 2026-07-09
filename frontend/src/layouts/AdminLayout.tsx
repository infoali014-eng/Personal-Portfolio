import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LogOut, 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  Rss, 
  Compass, 
  Image, 
  Inbox, 
  Settings, 
  Cpu, 
  Menu, 
  X, 
  Server
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: '/admin/projects', label: 'Projects', icon: <Layers className="h-4 w-4" /> },
    { to: '/admin/solutions', label: 'Solutions', icon: <Server className="h-4 w-4" /> },
    { to: '/admin/notes', label: 'Notes', icon: <BookOpen className="h-4 w-4" /> },
    { to: '/admin/blog', label: 'Blog', icon: <Rss className="h-4 w-4" /> },
    { to: '/admin/deep-code', label: 'Deep Code', icon: <Compass className="h-4 w-4" /> },
    { to: '/admin/media', label: 'Media Library', icon: <Image className="h-4 w-4" /> },
    { to: '/admin/messages', label: 'Messages', icon: <Inbox className="h-4 w-4" /> },
    { to: '/admin/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  // Resolve page breadcrumb
  const currentPath = location.pathname.split('/').filter(Boolean);
  const breadcrumbText = currentPath.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ');

  return (
    <div className="flex min-h-screen bg-background text-text transition-colors duration-300">
      
      {/* Sidebar Navigation: Desktop */}
      <aside className="hidden lg:flex w-64 border-r border-primary/10 bg-surface p-6 flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-lg font-bold tracking-wider text-accent">
            <Cpu className="h-5 w-5 animate-pulse" />
            <span>CREATOR.CMS</span>
          </div>

          <nav className="space-y-1.5 flex flex-col">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? 'bg-accent text-white font-bold' : 'text-muted hover:bg-primary/5 hover:text-text'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="space-y-2 border-t border-primary/5 pt-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-muted hover:bg-primary/5 hover:text-text transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Public Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-rose-500 hover:bg-rose-500/10 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Wrapper */}
      <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
        
        {/* Top bar header */}
        <header className="h-16 border-b border-primary/10 bg-surface/50 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hamburger toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 text-muted hover:text-text border border-primary/10 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Breadcrumbs path */}
            <span className="text-xs font-mono text-muted uppercase tracking-wider hidden sm:inline-block">
              {breadcrumbText || 'Creator Space'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Active Drafts Workspace</span>
          </div>
        </header>

        {/* Mobile Dropdown Nav links */}
        {mobileOpen && (
          <div className="lg:hidden border-b border-primary/10 bg-surface px-6 py-4 space-y-2 flex flex-col z-40">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${
                    isActive ? 'bg-accent text-white font-bold' : 'text-muted hover:bg-primary/5'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="border-t border-primary/5 pt-2 mt-2 flex flex-col gap-2">
              <button
                onClick={() => { setMobileOpen(false); navigate('/'); }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-muted hover:bg-primary/5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Public Site</span>
              </button>
              <button
                onClick={() => { setMobileOpen(false); handleLogout(); }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-rose-500 hover:bg-rose-500/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main nested route page */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
