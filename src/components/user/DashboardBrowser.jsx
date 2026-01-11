// import React, { useState, useMemo } from 'react';
// import { useData } from '../DataContext';
// import { useAuth } from '../AuthContext';
// import { useToast } from '../ToastProvider';
// import { useSettings } from '../SettingsContext';
// import { useDashboards } from '../DashboardContext';
// import { useNavigate } from 'react-router-dom';

// // Custom Card Components - MOVED OUTSIDE to prevent re-renders
// const CustomCard = ({ children, className = "" }) => (
//   <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
//     {children}
//   </div>
// );

// const CustomCardHeader = ({ children, className = "" }) => (
//   <div className={`px-6 py-4 ${className}`}>
//     {children}
//   </div>
// );

// const CustomCardTitle = ({ children, className = "" }) => (
//   <h3 className={`font-semibold text-gray-900 ${className}`}>
//     {children}
//   </h3>
// );

// const CustomCardContent = ({ children, className = "" }) => (
//   <div className={`px-6 py-4 ${className}`}>
//     {children}
//   </div>
// );

// // Custom Badge Component - MOVED OUTSIDE
// const CustomBadge = ({ children, variant = "default", className = "" }) => {
//   const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

//   const variants = {
//     default: "bg-blue-100 text-blue-700",
//     secondary: "bg-gray-100 text-gray-700",
//     success: "bg-green-100 text-green-700",
//     warning: "bg-yellow-100 text-yellow-700",
//     danger: "bg-red-100 text-red-700",
//     primary: "bg-blue-100 text-blue-700"
//   };

//   return (
//     <span className={`${baseClasses} ${variants[variant]} ${className}`}>
//       {children}
//     </span>
//   );
// };

// export function DashboardBrowser() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('');

//   const { user } = useAuth();
//   const { showToast } = useToast();
//   const { preferences, updatePreferences } = useSettings();
//   const {
//     departments,
//     favorites,
//     toggleFavorite,
//   } = useData();

//   const { dashboards } = useDashboards();

//   // Filter dashboards based on search and filters (case-insensitive, real-time)
//   const filteredDashboards = useMemo(() => {
//     return (dashboards || []).filter(dashboard => {
//       const searchLower = searchTerm.toLowerCase().trim();
//       const matchesSearch = !searchLower ||
//         dashboard.title?.toLowerCase().includes(searchLower) ||
//         dashboard.description?.toLowerCase().includes(searchLower);

//       const matchesDepartment = !selectedDepartment ||
//         dashboard.department?.toUpperCase() === selectedDepartment.toUpperCase();

//       return matchesSearch && matchesDepartment;
//     });
//   }, [dashboards, searchTerm, selectedDepartment]);

//   const handleViewDashboard = (dashboardId) => {
//     navigate(`/view-dashboard/${dashboardId}`);
//   };

//   const handleToggleFavorite = (dashboardId, title) => {
//     const isFavorite = favorites.includes(dashboardId);
//     toggleFavorite(dashboardId);
//     showToast(
//       isFavorite ? `Removed "${title}" from favorites` : `Added "${title}" to favorites`
//     );
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedDepartment('');
//   };

//   const hasActiveFilters = searchTerm || selectedDepartment;
//   const viewMode = preferences.viewMode || 'grid';

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboards</h1>
//         <p className="text-gray-600 mt-1">Discover and explore available Power BI dashboards</p>
//       </div>

//       {/* Search and Filters */}
//       <CustomCard>
//         <CustomCardContent className="p-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
//             {/* Search Input - Real-time filtering */}
//             <div className="relative">
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                 <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search dashboards..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             {/* Department Filter */}
//             <select
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">All Departments</option>
//               {departments.map((department) => (
//                 <option key={department} value={department}>
//                   {department}
//                 </option>
//               ))}
//             </select>

//             {/* Clear Filters Button */}
//             <div className="flex space-x-2">
//               {hasActiveFilters && (
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           </div>
//         </CustomCardContent>
//       </CustomCard>

//       {/* View Toggle and Results */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-600">View:</span>
//           <div className="border border-gray-200 rounded-lg p-1 bg-white flex">
//             <button
//               onClick={() => updatePreferences({ viewMode: 'grid' })}
//               className={`px-3 py-1 rounded text-sm flex items-center ${viewMode === 'grid'
//                 ? 'bg-blue-600 text-white'
//                 : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//             >
//               <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//               </svg>
//               Grid
//             </button>
//             <button
//               onClick={() => updatePreferences({ viewMode: 'list' })}
//               className={`px-3 py-1 rounded text-sm flex items-center ${viewMode === 'list'
//                 ? 'bg-blue-600 text-white'
//                 : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//             >
//               <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//               List
//             </button>
//           </div>
//         </div>

//         <div className="text-sm text-gray-600">
//           Showing {filteredDashboards.length} dashboard{filteredDashboards.length !== 1 ? 's' : ''}
//         </div>
//       </div>

//       {/* Dashboard Display */}
//       {filteredDashboards.length === 0 ? (
//         <CustomCard className="text-center">
//           <CustomCardContent className="p-8">
//             <div className="space-y-4">
//               <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
//                 <svg className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {hasActiveFilters ? 'No dashboards match your filters' : 'No dashboards available'}
//                 </h3>
//                 <p className="text-gray-600 mb-4 max-w-md mx-auto">
//                   {hasActiveFilters
//                     ? 'Try adjusting your search criteria or clearing the filters'
//                     : 'You don\'t have access to any dashboards yet. Contact your administrator for access.'
//                   }
//                 </p>
//                 {hasActiveFilters && (
//                   <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             </div>
//           </CustomCardContent>
//         </CustomCard>
//       ) : viewMode === 'grid' ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredDashboards.map((dashboard) => (
//             <CustomCard key={dashboard._id} className="hover:shadow-lg transition-all">
//               <CustomCardHeader>
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-2 flex-1">
//                     <CustomCardTitle className="text-base truncate">{dashboard.title}</CustomCardTitle>
//                     <CustomBadge variant="primary" className="text-xs">
//                       Dashboard
//                     </CustomBadge>
//                   </div>
//                   <button
//                     onClick={() => handleToggleFavorite(dashboard._id, dashboard.title)}
//                     className={`p-1 rounded-full ${favorites.includes(dashboard._id)
//                       ? 'text-red-600 hover:bg-red-50'
//                       : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
//                       }`}
//                     title={favorites.includes(dashboard._id) ? "Remove from favorites" : "Add to favorites"}
//                   >
//                     <svg className="h-4 w-4" fill={favorites.includes(dashboard._id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                     </svg>
//                   </button>
//                 </div>
//               </CustomCardHeader>
//               <CustomCardContent className="space-y-4">
//                 <p className="text-gray-600 text-sm line-clamp-2">{dashboard?.description}</p>

//                 <div className="space-y-2 text-xs text-gray-500 border-t pt-3">
//                   <div className="flex items-center justify-between">
//                     <span className="flex items-center">
//                       <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                       Created by
//                     </span>
//                     <span className="font-medium">{dashboard?.createdBy?.name || 'Admin'}</span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <span className="flex items-center">
//                       <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       Created at
//                     </span>
//                     <span className="font-medium">
//                       {dashboard?.createdAt ? new Date(dashboard.createdAt).toLocaleDateString() : 'N/A'}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleViewDashboard(dashboard._id)}
//                   className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                 >
//                   <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                   View Dashboard
//                 </button>
//               </CustomCardContent>
//             </CustomCard>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//           {/* Table Header */}
//           <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
//             <div className="grid grid-cols-12 gap-4 items-center text-sm text-gray-600">
//               <div className="col-span-4">Dashboard</div>
//               <div className="col-span-3">Company</div>
//               <div className="col-span-4">Accessed by</div>
//               <div className="col-span-1"></div>
//             </div>
//           </div>

//           {/* Table Rows */}
//           <div className="divide-y divide-gray-100">
//             {filteredDashboards.map((dashboard) => (
//               <div key={dashboard._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                 <div className="grid grid-cols-12 gap-4 items-center">
//                   {/* Dashboard Info */}
//                   <div className="col-span-4 flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
//                       </svg>
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <h3 className="font-medium text-gray-900 truncate">{dashboard.title}</h3>
//                       <p className="text-sm text-gray-500 truncate">{dashboard.description}</p>
//                     </div>
//                   </div>

//                   {/* Company */}
//                   <div className="col-span-3">
//                     <div className="text-sm text-gray-900">{dashboard?.company?.name || 'N/A'}</div>
//                     <div className="text-xs text-gray-500">Company</div>
//                   </div>

//                   {/* Access Users */}
//                   {dashboard?.accessUsers && dashboard.accessUsers.length > 0 ? (
//                     <div className="col-span-4">
//                       <div className="flex items-center space-x-2">
//                         <span className="text-xs text-gray-500">Accessed by</span>
//                         <div className="flex -space-x-1">
//                           {dashboard.accessUsers.slice(0, 4).map((accessUser, index) => {
//                             const initials = accessUser?.name
//                               ? accessUser.name
//                                 .split(' ')
//                                 .map(n => n[0])
//                                 .join('')
//                                 .toUpperCase()
//                               : '?';
//                             return (
//                               <div
//                                 key={accessUser._id || index}
//                                 className="relative group"
//                                 title={accessUser?.name || 'Unknown User'}
//                               >
//                                 <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors">
//                                   <span className="text-xs text-gray-600 font-medium">
//                                     {initials}
//                                   </span>
//                                 </div>
//                                 <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
//                                   {accessUser?.name || 'Unknown User'}
//                                 </div>
//                               </div>
//                             );
//                           })}
//                           {dashboard.accessUsers.length > 4 && (
//                             <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
//                               <span className="text-xs text-gray-500">
//                                 +{dashboard.accessUsers.length - 4}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="col-span-4">
//                       <p className="text-xs text-gray-400">No access users found</p>
//                     </div>
//                   )}

//                   {/* Actions */}
//                   <div className="col-span-1 flex items-center justify-end space-x-2">
//                     <button
//                       onClick={() => handleToggleFavorite(dashboard._id, dashboard.title)}
//                       className={`p-1 rounded ${favorites.includes(dashboard._id)
//                         ? 'text-red-600 hover:bg-red-50'
//                         : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
//                         }`}
//                       title={favorites.includes(dashboard._id) ? "Remove from favorites" : "Add to favorites"}
//                     >
//                       <svg className="h-5 w-5" fill={favorites.includes(dashboard._id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => handleViewDashboard(dashboard._id)}
//                       className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
//                     >
//                       View
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastProvider';
import { useSettings } from '../SettingsContext';
import { useDashboards } from '../DashboardContext';
import { useNavigate } from 'react-router-dom';

// Custom Card Components - MOVED OUTSIDE to prevent re-renders
const CustomCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

const CustomCardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CustomCardTitle = ({ children, className = "" }) => (
  <h3 className={`font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CustomCardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

// Custom Badge Component - MOVED OUTSIDE
const CustomBadge = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  const variants = {
    default: "bg-blue-100 text-blue-700",
    secondary: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    primary: "bg-blue-100 text-blue-700"
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <span className={`${baseClasses} ${variantClass} ${className}`}>
      {children}
    </span>
  );
};

export function DashboardBrowser() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [localFavorites, setLocalFavorites] = useState(new Set()); // Track favorites locally

  const { user } = useAuth();
  const { showToast } = useToast();
  const { preferences, updatePreferences } = useSettings();
  const {
    dashboards = [],
    favorites: favoriteDashboards = [],
    fetchFavoriteDashboards,
    toggleDashboardFavorite,
    checkDashboardFavoriteStatus,
    loading: dashboardsLoading
  } = useDashboards();

  // Departments for filter
  const departments = ['FINANCE', 'SALES', 'MARKETING', 'GENERAL', 'OTHER', 'HR'];

  // Initialize local favorites from context
  useEffect(() => {
    if (Array.isArray(favoriteDashboards)) {
      const favoriteIds = new Set(
        favoriteDashboards.map(dashboard => dashboard._id || dashboard.id)
      );
      setLocalFavorites(favoriteIds);
    }
  }, []);

  // Filter dashboards based on search and filters (case-insensitive, real-time)
  const filteredDashboards = useMemo(() => {
    return (dashboards || []).filter(dashboard => {
      if (!dashboard) return false;
      
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = !searchLower ||
        dashboard.title?.toLowerCase().includes(searchLower) ||
        dashboard.description?.toLowerCase().includes(searchLower);

      const matchesDepartment = !selectedDepartment ||
        dashboard.department?.toUpperCase() === selectedDepartment.toUpperCase();

      return matchesSearch && matchesDepartment;
    });
  }, [dashboards, searchTerm, selectedDepartment]);

  const handleViewDashboard = (dashboardId) => {
    if (!dashboardId) {
      showToast('Cannot view dashboard: Invalid ID', 'error');
      return;
    }
    navigate(`/view-dashboard/${dashboardId}`);
  };
 
 const handleToggleFavorite = async (dashboardId, title) => {
  if (!dashboardId) {
    showToast('Cannot toggle favorite: Invalid dashboard ID', 'error');
    return;
  }

  try {
    // Optimistically update UI
    const isCurrentlyFavorite = localFavorites.has(dashboardId);
    setLocalFavorites(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyFavorite) {
        newSet.delete(dashboardId);
      } else {
        newSet.add(dashboardId);
      }
      return newSet;
    });

    // Call API to toggle favorite
    const isFavorite = await toggleDashboardFavorite(dashboardId);
    
    // Show toast message
    showToast(
      isFavorite 
        ? `Added "${title || 'dashboard'}" to favorites`
        : `Removed "${title || 'dashboard'}" from favorites`,
      'success'
    );
  } catch (error) {
    console.error('Failed to toggle favorite:', error);
    
    // Revert optimistic update on error
    setLocalFavorites(prev => {
      const newSet = new Set(prev);
      const wasFavorite = !newSet.has(dashboardId);
      if (wasFavorite) {
        newSet.add(dashboardId);
      } else {
        newSet.delete(dashboardId);
      }
      return newSet;
    });

    showToast('Failed to update favorite', 'error');
  }
};

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('');
  };

  const hasActiveFilters = searchTerm || selectedDepartment;
  const viewMode = preferences?.viewMode || 'grid';

  const isDashboardFavorite = (dashboardId) => {
    return localFavorites.has(dashboardId);
  };

  if (dashboardsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboards</h1>
        <p className="text-gray-600 mt-1">Discover and explore available Power BI dashboards</p>
      </div>

      {/* Search and Filters */}
      <CustomCard>
        <CustomCardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Input - Real-time filtering */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search dashboards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Departments</option>
              {Array.isArray(departments) && departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            <div className="flex space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* View Toggle and Results */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <div className="border border-gray-200 rounded-lg p-1 bg-white flex">
            <button
              onClick={() => updatePreferences?.({ viewMode: 'grid' })}
              className={`px-3 py-1 rounded text-sm flex items-center ${viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </button>
            <button
              onClick={() => updatePreferences?.({ viewMode: 'list' })}
              className={`px-3 py-1 rounded text-sm flex items-center ${viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              List
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredDashboards.length} dashboard{filteredDashboards.length !== 1 ? 's' : ''}
          {localFavorites.size > 0 && ` • ${localFavorites.size} favorited`}
        </div>
      </div>

      {/* Dashboard Display */}
      {filteredDashboards.length === 0 ? (
        <CustomCard className="text-center">
          <CustomCardContent className="p-8">
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <svg className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {hasActiveFilters ? 'No dashboards match your filters' : 'No dashboards available'}
                </h3>
                <p className="text-gray-600 mb-4 max-w-md mx-auto">
                  {hasActiveFilters
                    ? 'Try adjusting your search criteria or clearing the filters'
                    : 'You don\'t have access to any dashboards yet. Contact your administrator for access.'
                  }
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </CustomCardContent>
        </CustomCard>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDashboards.map((dashboard) => {
            if (!dashboard?._id) return null;
            
            const isFavorite = isDashboardFavorite(dashboard._id);
            const dashboardTitle = dashboard?.title || 'Untitled Dashboard';
            const dashboardDescription = dashboard?.description || 'No description available';
            const createdByName = dashboard?.createdBy?.name || 'Admin';
            const createdAt = dashboard?.createdAt ? new Date(dashboard.createdAt).toLocaleDateString() : 'N/A';
            
            return (
              <CustomCard key={dashboard._id} className="hover:shadow-lg transition-all">
                <CustomCardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <CustomCardTitle className="text-base truncate">{dashboardTitle}</CustomCardTitle>
                      <div className="flex flex-wrap gap-2">
                        <CustomBadge variant="primary" className="text-xs">
                          Dashboard
                        </CustomBadge>
                        {dashboard?.department && (
                          <CustomBadge variant="secondary" className="text-xs">
                            {dashboard.department}
                          </CustomBadge>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(dashboard._id, dashboardTitle)}
                      className={`p-1 rounded-full ${isFavorite
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                        }`}
                      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      disabled={dashboardsLoading}
                    >
                      <svg 
                        className="h-4 w-4" 
                        fill={isFavorite ? "currentColor" : "none"} 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </CustomCardHeader>
                <CustomCardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{dashboardDescription}</p>

                  <div className="space-y-2 text-xs text-gray-500 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Created by
                      </span>
                      <span className="font-medium">{createdByName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Created at
                      </span>
                      <span className="font-medium">{createdAt}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDashboard(dashboard._id)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Dashboard
                  </button>
                </CustomCardContent>
              </CustomCard>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="grid grid-cols-12 gap-4 items-center text-sm text-gray-600">
              <div className="col-span-4">Dashboard</div>
              <div className="col-span-3">Department</div>
              <div className="col-span-4">Created By</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {filteredDashboards.map((dashboard) => {
              if (!dashboard?._id) return null;
              
              const isFavorite = isDashboardFavorite(dashboard._id);
              const dashboardTitle = dashboard?.title || 'Untitled Dashboard';
              const dashboardDescription = dashboard?.description || 'No description available';
              const createdByName = dashboard?.createdBy?.name || 'Admin';
              const department = dashboard?.department || 'Unknown';
              
              return (
                <div key={dashboard._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Dashboard Info */}
                    <div className="col-span-4 flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate">{dashboardTitle}</h3>
                        <p className="text-sm text-gray-500 truncate">{dashboardDescription}</p>
                      </div>
                    </div>

                    {/* Department */}
                    <div className="col-span-3">
                      <div className="text-sm text-gray-900">{department}</div>
                      <div className="text-xs text-gray-500">Department</div>
                    </div>

                    {/* Created By */}
                    <div className="col-span-4">
                      <div className="text-sm text-gray-900">{createdByName}</div>
                      <div className="text-xs text-gray-500">Creator</div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleToggleFavorite(dashboard._id, dashboardTitle)}
                        className={`p-1 rounded ${isFavorite
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                          }`}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        disabled={dashboardsLoading}
                      >
                        <svg 
                          className="h-5 w-5" 
                          fill={isFavorite ? "currentColor" : "none"} 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleViewDashboard(dashboard._id)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}