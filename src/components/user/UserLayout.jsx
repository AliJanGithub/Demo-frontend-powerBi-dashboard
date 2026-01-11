// import React, { useState } from 'react';
// import { useAuth } from '../AuthContext';
// import { useData } from '../DataContext';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Logo } from '../Logo';
// import { NotificationButton } from '../NotificationButton';
// import { UserDropdown } from '../UserDropdown';
// import { 
//   Monitor, 
//   Heart, 
//   User, 
//   Home,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   FileText
// } from '../icons/Icons';
// import { useDashboards } from '../DashboardContext';


// export function UserLayout({ children, currentTab, setCurrentTab, initialCollapsed = false }) {
//   // const { user } = useAuth();
//   const { favorites } = useData();
//   const {dashboards}=useDashboards()
//   // Initialize from localStorage or use initialCollapsed
//   const [isCollapsed, setIsCollapsed] = useState(() => {
//     if (typeof window !== 'undefined') {
//       const stored = localStorage.getItem('portal365-nav-collapsed');
//       return stored !== null ? JSON.parse(stored) : initialCollapsed;
//     }
//     return initialCollapsed;
//   });

//   const accessibleDashboards = [
//   {
//     id: '1',
//     userId: '2',
//     userName: 'John Doe',
//     dashboardId: '1',
//     dashboardTitle: 'Sales Performance Dashboard',
//     action: 'view',
//     timestamp: '2024-01-25T10:30:00Z'
//   },
//   {
//     id: '2',
//     userId: '3',
//     userName: 'Jane Smith',
//     dashboardId: '2',
//     dashboardTitle: 'Marketing Analytics',
//     action: 'view',
//     timestamp: '2024-01-25T11:45:00Z'
//   },
//   {
//     id: '3',
//     userId: '2',
//     userName: 'John Doe',
//     dashboardId: '3',
//     dashboardTitle: 'Finance Dashboard',
//     action: 'view',
//     timestamp: '2024-01-25T14:20:00Z'
//   },
//   {
//     id: '4',
//     userId: '3',
//     userName: 'Jane Smith',
//     dashboardId: '3',
//     dashboardTitle: 'Finance Dashboard',
//     action: 'favorite',
//     timestamp: '2024-01-25T15:30:00Z'
//   }
// ];

//   // Handle collapse state change and persist to localStorage
//   const handleCollapseToggle = () => {
//     const newCollapsedState = !isCollapsed;
//     setIsCollapsed(newCollapsedState);
//     localStorage.setItem('portal365-nav-collapsed', JSON.stringify(newCollapsedState));
//   };

//   const menuItems = [
//     { 
//       id: 'favorites', 
//       icon: Home, 
//       label: 'Home'
//     },
//     { 
//       id: 'browse', 
//       icon: Monitor, 
//       label: 'Dashboards'
//     },
//     // { 
//     //   id: 'reports', 
//     //   icon: FileText, 
//     //   label: 'Reports'
//     // },
//     { 
//       id: 'settings', 
//       icon: Settings, 
//       label: 'Settings'
//     }
//   ];



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
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

//       <div className="flex">
//         {/* Sidebar */}
//         <nav className={`${isCollapsed ? 'w-12' : 'w-44'} bg-white/80 backdrop-blur-sm border-r border-primary/10 min-h-[calc(100vh-73px)] shadow-sm transition-all duration-300`}>
//           {/* Collapse Button */}
//           <div className="p-3 border-b border-gray-200">
//             {isCollapsed ? (
//               <button
//                 onClick={handleCollapseToggle}
//                 className="w-full flex items-center justify-center px-1 py-2 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-success/5 hover:text-success hover:shadow-sm"
//                 title="Expand Menu"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             ) : (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleCollapseToggle}
//                 className="w-full flex items-center px-3 py-3 hover:bg-success/10 hover:border-success/30 transition-all duration-200"
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
//                       ? 'bg-gradient-to-r from-success to-success/90 text-white shadow-lg shadow-success/25'
//                       : 'text-gray-700 hover:bg-success/5 hover:text-success hover:shadow-sm'
//                   }`}
//                   title={isCollapsed ? item.label : undefined}
//                 >
//                   <div className="flex items-center">
//                     <Icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
//                     {!isCollapsed && item.label}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Quick Stats */}
//           {!isCollapsed && (
//             <div className="p-3 border-t border-gray-200 mt-2">
//               <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Quick Stats</h3>
//               <div className="space-y-2 text-xs">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Available Dashboards</span>
//                   <span className="font-medium">{dashboards.length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   {/* <span className="text-gray-600">Your Favorites</span> */}
//                   {/* <span className="font-medium">{favorites.length}</span> */}
//                 </div>
//               </div>
//             </div>
//           )}
//         </nav>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// // import React, { useState } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { useData } from '../DataContext';
// // import { Button } from '../ui/button';
// // import { Logo } from '../Logo';
// // import { NotificationButton } from '../NotificationButton';
// // import { UserDropdown } from '../UserDropdown';
// // import {
// //   Monitor,
// //   Home,
// //   Settings,
// //   ChevronLeft,
// //   ChevronRight
// // } from '../icons/Icons';
// // import { useDashboards } from '../DashboardContext';

// // export function UserLayout({ children, initialCollapsed = false }) {
// //   const { dashboards } = useDashboards();
// //   const { favorites } = useData();
// //   const [isCollapsed, setIsCollapsed] = useState(() => {
// //     if (typeof window !== 'undefined') {
// //       const stored = localStorage.getItem('portal365-nav-collapsed');
// //       return stored !== null ? JSON.parse(stored) : initialCollapsed;
// //     }
// //     return initialCollapsed;
// //   });

// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleCollapseToggle = () => {
// //     const newCollapsedState = !isCollapsed;
// //     setIsCollapsed(newCollapsedState);
// //     localStorage.setItem('portal365-nav-collapsed', JSON.stringify(newCollapsedState));
// //   };

// //   // Sidebar menu items with paths
// //   const menuItems = [
// //     { id: 'favorites', icon: Home, label: 'Home', path: '/user/favorites' },
// //     { id: 'browse', icon: Monitor, label: 'Dashboards', path: '/user/browse' },
// //     { id: 'settings', icon: Settings, label: 'Settings', path: '/user/settings' }
// //   ];

// //   // Determine active tab based on current URL
// //   const activeTab = menuItems.find(item =>
// //     location.pathname.startsWith(item.path)
// //   )?.id;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
// //       {/* Header */}
// //       <header className="bg-white/95 backdrop-blur-sm border-b border-primary/10 shadow-sm">
// //         <div className="px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center">
// //               <Logo size="md" />
// //             </div>

// //             <div className="flex items-center space-x-2">
// //               <NotificationButton />
// //               <UserDropdown />
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="flex">
// //         {/* Sidebar */}
// //         <nav
// //           className={`${
// //             isCollapsed ? 'w-12' : 'w-44'
// //           } bg-white/80 backdrop-blur-sm border-r border-primary/10 min-h-[calc(100vh-73px)] shadow-sm transition-all duration-300`}
// //         >
// //           {/* Collapse Button */}
// //           <div className="p-3 border-b border-gray-200">
// //             {isCollapsed ? (
// //               <button
// //                 onClick={handleCollapseToggle}
// //                 className="w-full flex items-center justify-center px-1 py-2 text-sm rounded-lg transition-all duration-200 text-gray-700 hover:bg-success/5 hover:text-success hover:shadow-sm"
// //                 title="Expand Menu"
// //               >
// //                 <ChevronRight className="h-4 w-4" />
// //               </button>
// //             ) : (
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={handleCollapseToggle}
// //                 className="w-full flex items-center px-3 py-3 hover:bg-success/10 hover:border-success/30 transition-all duration-200"
// //               >
// //                 <div className="flex items-center">
// //                   <ChevronLeft className="h-4 w-4 mr-2" />
// //                   <span className="text-sm font-medium">Collapse Menu</span>
// //                 </div>
// //               </Button>
// //             )}
// //           </div>

// //           {/* Navigation Items */}
// //           <div className="p-3 space-y-1">
// //             {menuItems.map((item) => {
// //               const Icon = item.icon;
// //               const isActive = activeTab === item.id;

// //               return (
// //                 <button
// //                   key={item.id}
// //                   onClick={() => navigate(item.path)}
// //                   className={`w-full flex items-center ${
// //                     isCollapsed ? 'justify-center px-1' : 'px-3'
// //                   } py-2 text-sm rounded-lg transition-all duration-200 ${
// //                     isActive
// //                       ? 'bg-gradient-to-r from-success to-success/90 text-white shadow-lg shadow-success/25'
// //                       : 'text-gray-700 hover:bg-success/5 hover:text-success hover:shadow-sm'
// //                   }`}
// //                   title={isCollapsed ? item.label : undefined}
// //                 >
// //                   <div className="flex items-center">
// //                     <Icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
// //                     {!isCollapsed && item.label}
// //                   </div>
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           {/* Quick Stats */}
// //           {!isCollapsed && (
// //             <div className="p-3 border-t border-gray-200 mt-2">
// //               <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2">
// //                 Quick Stats
// //               </h3>
// //               <div className="space-y-2 text-xs">
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Available Dashboards</span>
// //                   <span className="font-medium">{dashboards.length}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Favorites</span>
// //                   <span className="font-medium">{favorites.length}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </nav>

// //         {/* Main Content */}
// //         <main className="flex-1 p-6">{children}</main>
// //       </div>
// //     </div>
// //   );
// // }
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useData } from '../DataContext';
import { useDashboards } from '../DashboardContext';
import { useTheme } from '../ThemeContext';
import { useSettings } from '../SettingsContext';

export function UserLayout({ children, currentTab, setCurrentTab, initialCollapsed = false }) {
  const navigate = useNavigate();
  const { user, logout, userLogo, fetchUserLogo } = useAuth();
  // const { favorites } = useData();
  const { dashboards } = useDashboards();
  const { theme } = useTheme();
  const { settings } = useSettings();
  const {favorites}=useDashboards()
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

  // Handle collapse state change and persist to localStorage
  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem('portal365-nav-collapsed', JSON.stringify(newCollapsedState));
  };

  const menuItems = [
    { 
      id: 'favorites', 
      icon: '🏠', 
      label: 'Home'
    },
    { 
      id: 'browse', 
      icon: '📊', 
      label: 'Dashboards'
    },
    { 
      id: 'settings', 
      icon: '⚙️', 
      label: 'Settings'
    }
  ];

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
                <p className="text-xs text-white/70">User Portal</p>
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
                    const dropdown = document.getElementById('user-dropdown');
                    dropdown?.classList.toggle('hidden');
                  }}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white/20">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user?.name || 'User'} 
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-medium text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                    <p className="text-xs text-white/70">User Account</p>
                  </div>
                  <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div id="user-dropdown" className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button 
                    onClick={() => {
                      document.getElementById('user-dropdown')?.classList.add('hidden');
                      navigate('/user/profile');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => {
                      document.getElementById('user-dropdown')?.classList.add('hidden');
                      navigate('/user/account');
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

          {/* Quick Stats */}
          {!isCollapsed && (
            <div className="p-3 border-t border-white/10 mt-2">
              <h3 className="text-xs text-white/60 uppercase tracking-wide mb-2">Quick Stats</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Dashboards</span>
                  <span className="font-medium text-white bg-white/20 px-2 py-0.5 rounded-full">
                    {dashboards.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Favorites</span>
                  <span className="font-medium text-white bg-white/20 px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* User Info at bottom */}
          {!isCollapsed && user && (
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
              <div className="flex items-center space-x-2 px-2">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white/20">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {user.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-white/60 truncate">User</p>
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