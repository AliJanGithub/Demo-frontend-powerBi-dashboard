// import React, { useState } from 'react';
// import { useAuth } from '../AuthContext';
// import { Button } from '../ui/button';
// import { Card } from '../ui/card';
// import { Separator } from '../ui/separator';
// import { Logo } from '../Logo';
// import { NotificationButton } from '../NotificationButton';
// import { UserDropdown } from '../UserDropdown';
// import { 
//   Users, 
//   Monitor, 
//   Settings,
//   Home,
//   User,
//   ChevronLeft,
//   ChevronRight,
//   FileText
// } from '../icons/Icons';



// export function AdminLayout({ children, currentTab, setCurrentTab, initialCollapsed = false }) {
//   const { user } = useAuth();
  
//   // Initialize from localStorage or use initialCollapsed
//   const [isCollapsed, setIsCollapsed] = useState(() => {
//     if (typeof window !== 'undefined') {
//       const stored = localStorage.getItem('portal365-nav-collapsed');
//       return stored !== null ? JSON.parse(stored) : initialCollapsed;
//     }
//     return initialCollapsed;
//   });

//   const menuItems = [
//     { id: 'overview', icon: Home, label: 'Overview' },
//     { id: 'dashboards', icon: Monitor, label: 'Dashboards' },
//     // { id: 'reports', icon: FileText, label: 'Reports' },
//     { id: 'users', icon: Users, label: 'Users' },
//     { id: 'settings', icon: Settings, label: 'Settings' }
//   ];

//   // Handle collapse state change and persist to localStorage
//   const handleCollapseToggle = () => {
//     const newCollapsedState = !isCollapsed;
//     setIsCollapsed(newCollapsedState);
//     localStorage.setItem('portal365-nav-collapsed', JSON.stringify(newCollapsedState));
//   };



//   return (
//     <div id='legacy-design-wrapper' className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
//       {/* Header */}
//       <header className="bg-white/95 backdrop-blur-sm border-b border-primary/10 shadow-sm">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Logo size="md" />
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <NotificationButton />
//               <UserDropdown />
//             </div>
//           </div>
//         </div>
//       </header>

//       <div id='legacy-design-wrapper' className="flex">
//         {/* Sidebar */}
//         <nav className={`${isCollapsed ? 'w-12' : 'w-44'} bg-white/80 backdrop-blur-sm border-r border-primary/10 min-h-[calc(100vh-73px)] shadow-sm transition-all duration-300`}>
//           {/* Collapse Button */}
//           <div className="p-3 border-b border-gray-200">
//             {isCollapsed ? (
//               <button
//                 onClick={handleCollapseToggle}
//                 className="w-full flex items-center justify-center px-1 py-2 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-primary/5 hover:text-primary hover:shadow-sm"
//                 title="Expand Menu"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             ) : (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleCollapseToggle}
//                 className="w-full flex items-center px-3 py-3 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
//               >
//                 <div className="flex items-center">
//                   <ChevronLeft className="h-4 w-4 mr-2" />
//                   <span className="text-sm font-medium">Collapse Menu</span>
//                 </div>
//               </Button>
//             )}
//           </div>

//           <div className="p-3 space-y-1">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => setCurrentTab(item.id)}
//                   className={`w-full flex items-center ${isCollapsed ? 'justify-center px-1' : 'px-3'} py-2 text-sm rounded-lg transition-all duration-200 ${
//                     currentTab === item.id
//                       ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25'
//                       : 'text-gray-700 hover:bg-primary/5 hover:text-primary hover:shadow-sm'
//                   }`}
//                   title={isCollapsed ? item.label : undefined}
//                 >
//                   <Icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
//                   {!isCollapsed && item.label}
//                 </button>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { useSettings } from '../SettingsContext';

export function AdminLayout({ children, currentTab, setCurrentTab, initialCollapsed = false }) {
  const navigate = useNavigate();
  const { user, logout, userLogo, fetchUserLogo } = useAuth();
  const { theme } = useTheme();
  const { settings } = useSettings();

  // Fetch user logo on mount
  useEffect(() => {
    if (user?._id && !userLogo) {
      fetchUserLogo(user._id);
    }
  }, [user?._id]);
  
  // Initialize from localStorage or use initialCollapsed
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portal365-nav-collapsed');
      return stored !== null ? JSON.parse(stored) : initialCollapsed;
    }
    return initialCollapsed;
  });

  const menuItems = [
    { id: 'overview', icon: '🏠', label: 'Overview' },
    { id: 'dashboards', icon: '📊', label: 'Dashboards' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  // Handle collapse state change and persist to localStorage
  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem('portal365-nav-collapsed', JSON.stringify(newCollapsedState));
  };

  return (
    <div 
      className="min-h-screen"
      style={{ background: `linear-gradient(135deg, #f8fafc, ${theme.primaryColor}05)` }}
    >
      {/* Header - Themed */}
      <header 
        className="shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
        }}
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Display company logo from database */}
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm overflow-hidden">
                {userLogo ? (
                  <img 
                    src={userLogo} 
                    alt="Company Logo" 
                    className="h-full w-full object-contain"
                  />
                ) : user?.logo?.data ? (
                  <img 
                    src={`data:${user.logo.contentType};base64,${user.logo.data}`} 
                    alt="Company Logo" 
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-white font-bold text-sm">BP</span>
                )}
              </div>
              <div className="text-left">
                <h1 className="text-lg font-bold text-white">{settings?.companyName || 'BI Portal'}</h1>
                <p className="text-xs text-white/70">Admin Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notification Button - Styled for dark header */}
              <button className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              {/* User Dropdown - Styled for dark header */}
              <div className="relative">
                <button 
                  onClick={() => {
                    const dropdown = document.getElementById('admin-user-dropdown');
                    dropdown?.classList.toggle('hidden');
                  }}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white/20">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-white">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-white/70">Administrator</p>
                  </div>
                  <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div id="admin-user-dropdown" className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button 
                    onClick={() => {
                      document.getElementById('admin-user-dropdown')?.classList.add('hidden');
                      navigate('/admin/profile');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => {
                      document.getElementById('admin-user-dropdown')?.classList.add('hidden');
                      navigate('/admin/account');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account Settings
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button 
                    onClick={async () => {
                      try {
                        await logout();
                        navigate('/login');
                      } catch (error) {
                        console.error('Logout failed:', error);
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Themed */}
        <nav 
          className={`${isCollapsed ? 'w-16' : 'w-52'} min-h-[calc(100vh-60px)] shadow-lg transition-all duration-300`}
          style={{ 
            background: `linear-gradient(180deg, ${theme.primaryColor}f2 0%, ${theme.primaryColor}e6 100%)`,
          }}
        >
          {/* Collapse Button */}
          <div className="p-3 border-b border-white/10">
            {isCollapsed ? (
              <button
                onClick={handleCollapseToggle}
                className="w-full flex items-center justify-center p-2 text-sm rounded-lg transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white"
                title="Expand Menu"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleCollapseToggle}
                className="w-full flex items-center px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-medium"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Collapse</span>
              </button>
            )}
          </div>

          {/* Menu Items */}
          <div className="p-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'} text-sm rounded-lg transition-all duration-200 ${
                  currentTab === item.id
                    ? 'bg-white text-gray-900 shadow-md font-medium'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className={`text-base ${isCollapsed ? '' : 'mr-3'}`}>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>

          {/* Bottom section - Admin info */}
          {!isCollapsed && (
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
              <div className="flex items-center space-x-2 px-2">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white/20">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-white/60 truncate">Admin</p>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}