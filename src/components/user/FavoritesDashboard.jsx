// import React, { useEffect, useMemo } from 'react';
// import { useAuth } from '../AuthContext';
// import { useData } from '../DataContext';
// import { useToast } from '../ToastProvider';
// import { Button } from '../ui/button';
// import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
// import { Badge } from '../ui/badge';
// import { 
//   Heart, 
//   Eye, 
//   Calendar,
//   User,
//   Monitor,
//   FileText
// } from '../icons/Icons';
// import { useDashboards } from '../DashboardContext';
// import { useNavigate } from 'react-router-dom';



// export function FavoritesDashboard() {
//   const { user } = useAuth();
//   const { showToast } = useToast();
//   const { 
//     favorites, 
//     reportFavorites,
//     // getUserAccessibleDashboards, 
//     // getUserAccessibleReports,
//     toggleFavorite, 
//     toggleReportFavorite,
//     trackUsage,
//     trackReportUsage
//   } = useData();
//   const {fetchDashboards,dashboards,loading}=useDashboards()
// console.log("dashboardssssssssssss",dashboards)
//   const accessibleDashboards = dashboards

  
//   // useEffect(()=>{
//   //   done()
//   // },[])
//   const accessibleReports =  [
//   {
//     id: '1',
//     title: 'Income Statement Report',
//     description: 'Comprehensive income statement with revenue, expenses, and profit analysis',
//     embedUrl: 'https://globaldata365-my.sharepoint.com/personal/haseeb_tariq_globaldata365_com/_layouts/15/Doc.aspx?sourcedoc={48a9e4a5-4ad9-4210-875e-898cf80ec2f5}&action=embedview&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True',
//     department: 'Finance',
//     createdBy: '1',
//     createdAt: '2024-01-01',
//     lastModified: '2024-01-25',
//     isActive: true,
//     accessUsers: ['1', '2', '3']
//   },
//   {
//     id: '2',
//     title: 'Balance Sheet Report',
//     description: 'Detailed balance sheet analysis with assets, liabilities, and equity breakdown',
//     embedUrl: 'https://example.sharepoint.com/:x:/s/finance/balance-sheet-2024',
//     department: 'Finance',
//     createdBy: '1',
//     createdAt: '2024-01-05',
//     lastModified: '2024-01-28',
//     isActive: true,
//     accessUsers: ['1', '2']
//   },
//   {
//     id: '3',
//     title: 'Sales Performance Report',
//     description: 'Monthly sales analysis with detailed performance metrics by region and product',
//     embedUrl: 'https://example.sharepoint.com/:x:/s/sales/performance-report',
//     department: 'Sales',
//     createdBy: '1',
//     createdAt: '2024-01-08',
//     lastModified: '2024-01-30',
//     isActive: true,
//     accessUsers: ['1', '2', '3']
//   },
//   {
//     id: '4',
//     title: 'HR Analytics Report',
//     description: 'Employee analytics including headcount, turnover, and performance metrics',
//     embedUrl: 'https://example.sharepoint.com/:x:/s/hr/analytics-2024',
//     department: 'Human Resources',
//     createdBy: '1',
//     createdAt: '2024-01-12',
//     lastModified: '2024-02-01',
//     isActive: true,
//     accessUsers: ['1', '3']
//   }
// ];
//   // const favoriteDashboards = accessibleDashboards.filter(d => favorites.includes(d._id));
//   const favoriteReports = accessibleReports.filter(r => reportFavorites.includes(r.id));
// const navigate=useNavigate()
//   // Combine and sort favorites by last modified date
//   const allFavorites = useMemo(() => {
//     const dashboardItems = accessibleDashboards.map(d => ({
//       id: d.id,
//       title: d.title,
//       description: d.description,
//       // type: 'dashboard' ,
//       // lastModified: d.lastModified,
//       // department: d.department
//     }));

//     const reportItems = favoriteReports.map(r => ({
//       id: r.id,
//       title: r.title,
//       description: r.description,
//       type: 'report' ,
//       lastModified: r.lastModified,
//       department: r.department
//     }));

//     return [...dashboardItems, ...reportItems].sort((a, b) => 
//       new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
//     );
//   }, [ favoriteReports]);

//   const handleViewItem = (item) => {
//     console.log("itemmmmm",item)
//     if (item.type === 'reportss') {
//         trackReportUsage(item._id, 'view');
//       (window ).navigate('view-report', { id: item._id });
//     } else {
//         // trackUsage(item?._id, 'view');
//       // navigate('view-dashboard', { id: item._id });
//        navigate(`/view-dashboard/${item._id}`);
//     }
//   };

//   const handleRemoveFavorite = (item) => {
//     if (item.type === 'dashboard') {
//       toggleFavorite(item.id);
//     } else {
//       toggleReportFavorite(item.id);
//     }
//     showToast(`Removed "${item.title}" from favorites`);
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 17) return 'Good afternoon';
//     return 'Good evening';
//   };
//   if (loading) {
//     return(
//       <p>Loading Dashboard</p>
//     )
//   }
//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="mb-8">
//         <h1 className="text-4xl text-gray-900 mb-3">
//           {getGreeting()}, {user?.name?.split(' ')[0]}!
//         </h1>
//         <p className="text-lg text-gray-600">
//           Welcome back to BI Portal 365
//         </p>
//       </div>

//       {/* Favorites Section */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h2 className="text-xl text-gray-900">Your Favorites</h2>
//             <p className="text-gray-600 text-sm">Quick access to your most important dashboards and reports</p>
//           </div>
//           {dashboards?.length > 0 && (
//             <div className="flex items-center space-x-2">
//               <Badge variant="secondary" className="text-sm">
//                 {dashboards?.length} favorite{dashboards?.length !== 1 ? 's' : ''}
//               </Badge>
//               <div className="flex items-center space-x-1 text-xs text-gray-500">
//                 <div className="flex items-center space-x-1">
//                   <Monitor className="h-3 w-3 text-primary" />
//                   <span>{dashboards?.length}</span>
//                 </div>
//                 <span>•</span>
//                 <div className="flex items-center space-x-1">
//                   <FileText className="h-3 w-3 text-success" />
//                   <span>{favoriteReports.length}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {dashboards.length === 0 ? (
//         <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//           <CardContent className="p-12 text-center">
//             <div className="space-y-6">
//               <div className="bg-gradient-to-br from-primary/10 to-success/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center border-2 border-primary/20">
//                 <Heart className="h-12 w-12 text-primary" />
//               </div>
//               <div>
//                 <h3 className="text-xl text-gray-900 mb-3">No favorites yet</h3>
//                 <p className="text-gray-600 mb-6 max-w-md mx-auto">
//                   Discover powerful insights by exploring our dashboards and reports. Add your most important ones to favorites for quick access.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <Button 
//                     onClick={() => (window ).navigate('user', { tab: 'browse' })}
//                     variant="outline"
//                   >
//                     <Monitor className="h-4 w-4 mr-2" />
//                     Browse Dashboards
//                   </Button>
//                   <Button 
//                     onClick={() => (window ).navigate('user', { tab: 'reports' })}
//                     variant="outline"
//                   >
//                     <FileText className="h-4 w-4 mr-2" />
//                     Browse Reports
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {dashboards?.map((item) => (
//             <Card key={`${item?.type}-${item?._id}`} className="hover:shadow-xl transition-all duration-200 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-2 flex-1">
//                     <CardTitle className="text-lg">{item?.title}</CardTitle>
//                     <Badge 
//                       variant="secondary" 
//                       className={
//                         item.type === 'dashboard' 
//                           ? "bg-primary/10 text-primary border-primary/20"
//                           : "bg-success/10 text-success border-success/20"
//                       }
//                     >
//                       {/* {item.type === 'dashboard' ? 'Dashboard' : 'Report'} */}
//                         Dashboard
//                     </Badge>
//                   </div>
//                   {/* <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleRemoveFavorite(item)}
//                     className="text-red-600 hover:text-red-700"
//                   >
//                     <Heart className="h-4 w-4 fill-current" />
//                   </Button> */}
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <p className="text-gray-600 text-sm truncate">{item?.description}</p>
                
//                 <div className="space-y-2 text-xs text-gray-500 border-t pt-3">
//                   <div className="flex items-center justify-between">
//                     <span className="flex items-center">
//                       <User className="h-3 w-3 mr-1" />
//                       Created by 
//                     </span>
//                         <span>{item?.createdBy?.name}</span>
//                   </div>
//                   {item?.company?.name && (
//                     <div className="flex items-center justify-between">
//                       <span className="flex items-center">
//                         <Monitor className="h-3 w-3 mr-1" />
//                         Department
//                       </span>
//                       <span>{item?.company?.name}</span>
//                     </div>
//                   )}
//                   <div className="flex items-center justify-between">
//                     <span className="flex items-center">
//                       <Calendar className="h-3 w-3 mr-1" />
//                       Created at
//                     </span>
//                     <span>{new Date(item?.createdAt).toLocaleDateString()}</span>
//                   </div>
//                 </div>

//                 <Button 
//                   className="w-full"
//                   onClick={() => handleViewItem(item)}
//                 >
//                   <Eye className="h-4 w-4 mr-2" />
//                   {/* View {item.type === 'dashboard' ? 'Dashboard' : 'Report'} */}
//                   View Dashboard
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// // }
// import React, { useEffect, useMemo } from 'react';
// import { useAuth } from '../AuthContext';
// import { useData } from '../DataContext';
// import { useToast } from '../ToastProvider';
// import { useDashboards } from '../DashboardContext';
// import { useNavigate } from 'react-router-dom';

// export function FavoritesDashboard() {
//   const { user } = useAuth();
//   const { showToast } = useToast();
//   const { 
//     favorites, 
//     reportFavorites,
//     toggleFavorite, 
//     toggleReportFavorite,
//     trackUsage,
//     trackReportUsage
//   } = useData();
  
//   const { fetchDashboards, dashboards, loading } = useDashboards();
//   const navigate = useNavigate();

//   console.log("dashboardssssssssssss", dashboards);

//   const accessibleDashboards = dashboards;

//   const accessibleReports = [
//     {
//       id: '1',
//       title: 'Income Statement Report',
//       description: 'Comprehensive income statement with revenue, expenses, and profit analysis',
//       embedUrl: 'https://globaldata365-my.sharepoint.com/personal/haseeb_tariq_globaldata365_com/_layouts/15/Doc.aspx?sourcedoc={48a9e4a5-4ad9-4210-875e-898cf80ec2f5}&action=embedview&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True',
//       department: 'Finance',
//       createdBy: '1',
//       createdAt: '2024-01-01',
//       lastModified: '2024-01-25',
//       isActive: true,
//       accessUsers: ['1', '2', '3']
//     }
//   ];

//   const favoriteReports = accessibleReports.filter(r => reportFavorites.includes(r.id));

//   // Combine and sort favorites
//   const allFavorites = useMemo(() => {
//     const dashboardItems = accessibleDashboards.map(d => ({
//       _id: d._id,
//       id: d._id,
//       title: d.title,
//       description: d.description,
//       type: 'dashboard',
//       createdBy: d.createdBy,
//       company: d.company,
//       createdAt: d.createdAt,
//       lastModified: d.updatedAt || d.createdAt,
//       department: d.department
//     }));

//     const reportItems = favoriteReports.map(r => ({
//       id: r.id,
//       title: r.title,
//       description: r.description,
//       type: 'report',
//       lastModified: r.lastModified,
//       department: r.department
//     }));

//     return [...dashboardItems, ...reportItems].sort((a, b) => 
//       new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
//     );
//   }, [accessibleDashboards, favoriteReports]);

//   const handleViewItem = (item) => {
//     console.log("itemmmmm", item);
//     if (item.type === 'report') {
//       trackReportUsage(item.id, 'view');
//       navigate(`/view-report/${item.id}`);
//     } else {
//       trackUsage(item._id, 'view');
//       navigate(`/view-dashboard/${item._id}`);
//     }
//   };

//   const handleRemoveFavorite = (item) => {
//     if (item.type === 'dashboard') {
//       toggleFavorite(item.id);
//     } else {
//       toggleReportFavorite(item.id);
//     }
//     showToast(`Removed "${item.title}" from favorites`);
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 17) return 'Good afternoon';
//     return 'Good evening';
//   };

//   // Custom Card Component
//   const CustomCard = ({ children, className = "" }) => (
//     <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
//       {children}
//     </div>
//   );

//   const CustomCardHeader = ({ children, className = "" }) => (
//     <div className={`px-6 py-4 ${className}`}>
//       {children}
//     </div>
//   );

//   const CustomCardTitle = ({ children, className = "" }) => (
//     <h3 className={`font-semibold text-gray-900 ${className}`}>
//       {children}
//     </h3>
//   );

//   const CustomCardContent = ({ children, className = "" }) => (
//     <div className={`px-6 py-4 ${className}`}>
//       {children}
//     </div>
//   );

//   // Custom Badge Component
//   const CustomBadge = ({ children, variant = "default", className = "" }) => {
//     const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
//     const variants = {
//       default: "bg-blue-100 text-blue-700",
//       secondary: "bg-gray-100 text-gray-700",
//       success: "bg-green-100 text-green-700",
//       warning: "bg-yellow-100 text-yellow-700",
//       danger: "bg-red-100 text-red-700",
//       primary: "bg-blue-100 text-blue-700",
//       dashboard: "bg-blue-100 text-blue-700",
//       report: "bg-green-100 text-green-700"
//     };
    
//     return (
//       <span className={`${baseClasses} ${variants[variant]} ${className}`}>
//         {children}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//           {getGreeting()}, {user?.name?.split(' ')[0]}!
//         </h1>
//         <p className="text-lg text-gray-600">
//           Welcome back to BI Portal 365
//         </p>
//       </div>

//       {/* Favorites Section */}
//       <div>
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//           <div>
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900">Your Favorites</h2>
//             <p className="text-gray-600 text-sm mt-1">
//               Quick access to your most important dashboards and reports
//             </p>
//           </div>
          
//           {dashboards?.length > 0 && (
//             <div className="flex items-center space-x-4 mt-4 md:mt-0">
//               <CustomBadge variant="secondary" className="text-sm">
//                 {dashboards?.length} favorite{dashboards?.length !== 1 ? 's' : ''}
//               </CustomBadge>
//               <div className="flex items-center space-x-2 text-xs text-gray-500">
//                 <div className="flex items-center space-x-1">
//                   <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
//                   </svg>
//                   <span>{dashboards?.length}</span>
//                 </div>
//                 <span>•</span>
//                 <div className="flex items-center space-x-1">
//                   <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span>{favoriteReports.length}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {dashboards.length === 0 ? (
//         <CustomCard className="text-center">
//           <CustomCardContent className="p-12">
//             <div className="space-y-6">
//               <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center border-2 border-blue-200">
//                 <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">No favorites yet</h3>
//                 <p className="text-gray-600 mb-6 max-w-md mx-auto">
//                   Discover powerful insights by exploring our dashboards and reports. Add your most important ones to favorites for quick access.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <button
//                     onClick={() => navigate('/user/browse')}
//                     className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                   >
//                     <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
//                     </svg>
//                     Browse Dashboards
//                   </button>
//                   <button
//                     onClick={() => navigate('/user/reports')}
//                     className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                   >
//                     <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     Browse Reports
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </CustomCardContent>
//         </CustomCard>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {accessibleDashboards?.map((item) => (
//             <CustomCard key={item._id} className="hover:shadow-lg transition-all">
//               <CustomCardHeader>
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-2 flex-1">
//                     <CustomCardTitle className="text-base truncate">{item?.title}</CustomCardTitle>
//                     <CustomBadge variant="dashboard">
//                       Dashboard
//                     </CustomBadge>
//                   </div>
//                   <button
//                     onClick={() => handleRemoveFavorite({
//                       id: item._id,
//                       title: item.title,
//                       type: 'dashboard'
//                     })}
//                     className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
//                     title="Remove from favorites"
//                   >
//                     <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                     </svg>
//                   </button>
//                 </div>
//               </CustomCardHeader>
//               <CustomCardContent className="space-y-4">
//                 <p className="text-gray-600 text-sm line-clamp-2">{item?.description}</p>
                
//                 <div className="space-y-2 text-xs text-gray-500 border-t pt-3">
//                   <div className="flex items-center justify-between">
//                     <span className="flex items-center">
//                       <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                       Created by
//                     </span>
//                     <span className="font-medium">{item?.createdBy?.name || 'Admin'}</span>
//                   </div>
                  
//                   {item?.company?.name && (
//                     <div className="flex items-center justify-between">
//                       <span className="flex items-center">
//                         <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                         </svg>
//                         Company
//                       </span>
//                       <span className="font-medium">{item?.company?.name}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex items-center justify-between">
//                     <span className="flex items-center">
//                       <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       Created at
//                     </span>
//                     <span className="font-medium">
//                       {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleViewItem({
//                     _id: item._id,
//                     type: 'dashboard',
//                     title: item.title
//                   })}
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
//       )}
//     </div>
//   );
// // }
// import React, { useEffect, useMemo, useState } from 'react';
// import { useAuth } from '../AuthContext';
// import { useToast } from '../ToastProvider';
// import { useDashboards } from '../DashboardContext';
// import { useNavigate } from 'react-router-dom';

// export function FavoritesDashboard() {
//   const { user } = useAuth();
//   const { showToast } = useToast();
//   const { 
//     favorites = [], 
//     fetchFavoriteDashboards,
//     removeDashboardFromFavorites,
//     loading = false
//   } = useDashboards();
  
//   const navigate = useNavigate();
//   const [localLoading, setLocalLoading] = useState(false);

//   // Mock reports data (if you still need it) - with default empty array
//   const accessibleReports = [
//     {
//       id: '1',
//       title: 'Income Statement Report',
//       description: 'Comprehensive income statement with revenue, expenses, and profit analysis',
//       embedUrl: 'https://globaldata365-my.sharepoint.com/personal/haseeb_tariq_globaldata365_com/_layouts/15/Doc.aspx?sourcedoc={48a9e4a5-4ad9-4210-875e-898cf80ec2f5}&action=embedview&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True',
//       department: 'Finance',
//       createdBy: '1',
//       createdAt: '2024-01-01',
//       lastModified: '2024-01-25',
//       isActive: true,
//       accessUsers: ['1', '2', '3'],
//       type: 'report'
//     }
//   ];

//   // Filter favorite reports (if using mock data)
//   const favoriteReports = accessibleReports || []; // Adjust this based on your actual report favorites

//   // Combine and sort favorites with proper guards
//   const allFavorites = useMemo(() => {
//     // Ensure favorites is an array
//     const safeFavorites = Array.isArray(favorites) ? favorites : [];
//     const safeFavoriteReports = Array.isArray(favoriteReports) ? favoriteReports : [];
    
//     const dashboardItems = safeFavorites.map(d => ({
//       _id: d?._id || d?.id || '',
//       id: d?.id || d?._id || '',
//       title: d?.title || 'Untitled Dashboard',
//       description: d?.description || 'No description available',
//       type: 'dashboard',
//       createdBy: d?.createdBy || { name: 'Unknown' },
//       company: d?.company || { name: 'Unknown Company' },
//       createdAt: d?.createdAt || new Date().toISOString(),
//       lastModified: d?.updatedAt || d?.createdAt || new Date().toISOString(),
//       department: d?.department || 'Unknown',
//       embedUrl: d?.embedUrl || '',
//       tags: Array.isArray(d?.tags) ? d.tags : []
//     })).filter(item => item._id); // Filter out items without ID

//     const reportItems = safeFavoriteReports.map(r => ({
//       _id: r?.id || '',
//       id: r?.id || '',
//       title: r?.title || 'Untitled Report',
//       description: r?.description || 'No description available',
//       type: 'report',
//       lastModified: r?.lastModified || new Date().toISOString(),
//       department: r?.department || 'Unknown',
//       embedUrl: r?.embedUrl || '',
//       createdAt: r?.createdAt || new Date().toISOString(),
//       createdBy: r?.createdBy ? { name: r.createdBy } : { name: 'Unknown' },
//       company: r?.company ? { name: r.company } : { name: 'Unknown Company' }
//     })).filter(item => item._id); // Filter out items without ID

//     return [...dashboardItems, ...reportItems].sort((a, b) => {
//       const dateA = a?.lastModified ? new Date(a.lastModified).getTime() : 0;
//       const dateB = b?.lastModified ? new Date(b.lastModified).getTime() : 0;
//       return dateB - dateA;
//     });
//   }, [favorites, favoriteReports]);

//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const loadFavorites = async () => {
//     setLocalLoading(true);
//     try {
//       await fetchFavoriteDashboards();
//     } catch (error) {
//       console.error('Failed to load favorites:', error);
//       showToast('Failed to load favorites', 'error');
//     } finally {
//       setLocalLoading(false);
//     }
//   };

//   const handleViewItem = (item) => {
//     if (!item) return;
    
//     console.log("Viewing item:", item);
//     const itemId = item._id || item.id;
//     if (!itemId) {
//       showToast('Cannot view item: Invalid ID', 'error');
//       return;
//     }
    
//     if (item.type === 'report') {
//       navigate(`/view-report/${itemId}`);
//     } else {
//       navigate(`/view-dashboard/${itemId}`);
//     }
//   };

//   const handleRemoveFavorite = async (item) => {
//     if (!item) return;
    
//     try {
//       const itemId = item._id || item.id;
//       if (!itemId) {
//         showToast('Cannot remove item: Invalid ID', 'error');
//         return;
//       }
      
//       if (item.type === 'dashboard') {
//         await removeDashboardFromFavorites(itemId);
//         showToast(`Removed "${item.title || 'item'}" from favorites`, 'success');
//       } else {
//         // Handle report unfavorite if needed
//         showToast(`Removed "${item.title || 'item'}" from favorites`, 'success');
//       }
//     } catch (error) {
//       console.error('Failed to remove favorite:', error);
//       showToast('Failed to remove from favorites', 'error');
//     }
//   };

//   const handleToggleFavorite = async (itemId) => {
//     if (!itemId) return;
    
//     try {
//       // If you want to implement toggle instead of remove
//       // await toggleDashboardFavorite(itemId);
//       // showToast('Favorite status updated', 'success');
//     } catch (error) {
//       console.error('Failed to toggle favorite:', error);
//       showToast('Failed to update favorite', 'error');
//     }
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 17) return 'Good afternoon';
//     return 'Good evening';
//   };

//   // Custom Card Component
//   const CustomCard = ({ children, className = "" }) => (
//     <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
//       {children}
//     </div>
//   );

//   const CustomCardHeader = ({ children, className = "" }) => (
//     <div className={`px-6 py-4 ${className}`}>
//       {children}
//     </div>
//   );

//   const CustomCardTitle = ({ children, className = "" }) => (
//     <h3 className={`font-semibold text-gray-900 ${className}`}>
//       {children}
//     </h3>
//   );

//   const CustomCardContent = ({ children, className = "" }) => (
//     <div className={`px-6 py-4 ${className}`}>
//       {children}
//     </div>
//   );

//   // Custom Badge Component
//   const CustomBadge = ({ children, variant = "default", className = "" }) => {
//     const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
//     const variants = {
//       default: "bg-blue-100 text-blue-700",
//       secondary: "bg-gray-100 text-gray-700",
//       success: "bg-green-100 text-green-700",
//       warning: "bg-yellow-100 text-yellow-700",
//       danger: "bg-red-100 text-red-700",
//       primary: "bg-blue-100 text-blue-700",
//       dashboard: "bg-blue-100 text-blue-700",
//       report: "bg-green-100 text-green-700"
//     };
    
//     const variantClass = variants[variant] || variants.default;
    
//     return (
//       <span className={`${baseClasses} ${variantClass} ${className}`}>
//         {children}
//       </span>
//     );
//   };

//   // Loading state
//   const isLoading = loading || localLoading;
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   const totalFavorites = Array.isArray(allFavorites) ? allFavorites.length : 0;
//   const dashboardFavorites = Array.isArray(allFavorites) 
//     ? allFavorites.filter(item => item?.type === 'dashboard').length 
//     : 0;
//   const reportFavorites = Array.isArray(allFavorites) 
//     ? allFavorites.filter(item => item?.type === 'report').length 
//     : 0;

//   const userName = user?.name ? user.name.split(' ')[0] : 'User';

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//           {getGreeting()}, {userName}!
//         </h1>
//         <p className="text-lg text-gray-600">
//           Welcome back to BI Portal 365
//         </p>
//       </div>

//       {/* Favorites Section */}
//       <div>
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//           <div>
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900">Your Favorites</h2>
//             <p className="text-gray-600 text-sm mt-1">
//               Quick access to your most important dashboards and reports
//             </p>
//           </div>
          
//           {totalFavorites > 0 && (
//             <div className="flex items-center space-x-4 mt-4 md:mt-0">
//               <CustomBadge variant="secondary" className="text-sm">
//                 {totalFavorites} favorite{totalFavorites !== 1 ? 's' : ''}
//               </CustomBadge>
//               <div className="flex items-center space-x-2 text-xs text-gray-500">
//                 <div className="flex items-center space-x-1">
//                   <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
//                   </svg>
//                   <span>{dashboardFavorites}</span>
//                 </div>
//                 <span>•</span>
//                 <div className="flex items-center space-x-1">
//                   <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <span>{reportFavorites}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {totalFavorites === 0 ? (
//         <CustomCard className="text-center">
//           <CustomCardContent className="p-12">
//             <div className="space-y-6">
//               <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center border-2 border-blue-200">
//                 <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">No favorites yet</h3>
//                 <p className="text-gray-600 mb-6 max-w-md mx-auto">
//                   Discover powerful insights by exploring our dashboards and reports. Add your most important ones to favorites for quick access.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <button
//                     onClick={() => navigate('/user/browse')}
//                     className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                   >
//                     <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
//                     </svg>
//                     Browse Dashboards
//                   </button>
//                   <button
//                     onClick={() => navigate('/user/reports')}
//                     className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                   >
//                     <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     Browse Reports
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </CustomCardContent>
//         </CustomCard>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {Array.isArray(allFavorites) && allFavorites.map((item) => {
//             if (!item) return null;
            
//             const itemId = item._id || item.id;
//             const itemTitle = item.title || 'Untitled';
//             const itemDescription = item.description || 'No description available';
//             const itemType = item.type || 'dashboard';
//             const itemCreatedBy = item.createdBy || { name: 'Unknown' };
//             const itemCompany = item.company || { name: 'Unknown Company' };
//             const itemDepartment = item.department || 'Unknown';
//             const itemTags = Array.isArray(item.tags) ? item.tags : [];
//             const itemLastModified = item.lastModified || item.createdAt || new Date().toISOString();
            
//             return (
//               <CustomCard key={itemId || Math.random()} className="hover:shadow-lg transition-all">
//                 <CustomCardHeader>
//                   <div className="flex justify-between items-start">
//                     <div className="space-y-2 flex-1">
//                       <CustomCardTitle className="text-base truncate">{itemTitle}</CustomCardTitle>
//                       <div className="flex flex-wrap gap-2">
//                         <CustomBadge variant={itemType}>
//                           {itemType === 'dashboard' ? 'Dashboard' : 'Report'}
//                         </CustomBadge>
//                         {itemTags.length > 0 && (
//                           <CustomBadge variant="secondary" className="text-xs">
//                             {itemTags[0]}
//                             {itemTags.length > 1 && ` +${itemTags.length - 1}`}
//                           </CustomBadge>
//                         )}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveFavorite(item)}
//                       className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
//                       title="Remove from favorites"
//                     >
//                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </CustomCardHeader>
//                 <CustomCardContent className="space-y-4">
//                   <p className="text-gray-600 text-sm line-clamp-2">{itemDescription}</p>
                  
//                   <div className="space-y-2 text-xs text-gray-500 border-t pt-3">
//                     {itemCreatedBy.name && (
//                       <div className="flex items-center justify-between">
//                         <span className="flex items-center">
//                           <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                           </svg>
//                           Created by
//                         </span>
//                         <span className="font-medium">{itemCreatedBy.name}</span>
//                       </div>
//                     )}
                    
//                     {itemCompany.name && (
//                       <div className="flex items-center justify-between">
//                         <span className="flex items-center">
//                           <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                           </svg>
//                           Company
//                         </span>
//                         <span className="font-medium">{itemCompany.name}</span>
//                       </div>
//                     )}
                    
//                     {itemDepartment && (
//                       <div className="flex items-center justify-between">
//                         <span className="flex items-center">
//                           <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                           </svg>
//                           Department
//                         </span>
//                         <span className="font-medium">{itemDepartment}</span>
//                       </div>
//                     )}
                    
//                     <div className="flex items-center justify-between">
//                       <span className="flex items-center">
//                         <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                         {itemType === 'report' ? 'Last updated' : 'Created at'}
//                       </span>
//                       <span className="font-medium">
//                         {itemLastModified ? new Date(itemLastModified).toLocaleDateString() : 'N/A'}
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => handleViewItem(item)}
//                     className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//                     disabled={!itemId}
//                   >
//                     <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                     View {itemType === 'dashboard' ? 'Dashboard' : 'Report'}
//                   </button>
//                 </CustomCardContent>
//               </CustomCard>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastProvider';
import { useDashboards } from '../DashboardContext';
import { useNavigate } from 'react-router-dom';

export function FavoritesDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { 
    favorites = [], 
    fetchFavoriteDashboards,
    removeDashboardFromFavorites,
    loading = false
  } = useDashboards();
  
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);

  // Process and sort favorite dashboards
  const favoriteDashboards = useMemo(() => {
    // Ensure favorites is an array
    const safeFavorites = Array.isArray(favorites) ? favorites : [];
    
    const dashboardItems = safeFavorites.map(d => ({
      _id: d?._id || d?.id || '',
      id: d?.id || d?._id || '',
      title: d?.title || 'Untitled Dashboard',
      description: d?.description || 'No description available',
      createdBy: d?.createdBy || { name: 'Unknown' },
      company: d?.company || { name: 'Unknown Company' },
      createdAt: d?.createdAt || new Date().toISOString(),
      lastModified: d?.updatedAt || d?.createdAt || new Date().toISOString(),
      department: d?.department || 'Unknown',
      embedUrl: d?.embedUrl || '',
      tags: Array.isArray(d?.tags) ? d.tags : []
    })).filter(item => item._id); // Filter out items without ID

    return dashboardItems.sort((a, b) => {
      const dateA = a?.lastModified ? new Date(a.lastModified).getTime() : 0;
      const dateB = b?.lastModified ? new Date(b.lastModified).getTime() : 0;
      return dateB - dateA;
    });
  }, [favorites]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLocalLoading(true);
    try {
      await fetchFavoriteDashboards();
    } catch (error) {
      console.error('Failed to load favorites:', error);
      showToast('Failed to load favorite dashboards', 'error');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleViewDashboard = (dashboard) => {
    if (!dashboard) return;
    
    const dashboardId = dashboard._id || dashboard.id;
    if (!dashboardId) {
      showToast('Cannot view dashboard: Invalid ID', 'error');
      return;
    }
    
    navigate(`/view-dashboard/${dashboardId}`);
  };

  const handleRemoveFavorite = async (dashboard) => {
    if (!dashboard) return;
    
    try {
      const dashboardId = dashboard._id || dashboard.id;
      if (!dashboardId) {
        showToast('Cannot remove dashboard: Invalid ID', 'error');
        return;
      }
      
      await removeDashboardFromFavorites(dashboardId);
      showToast(`Removed "${dashboard.title || 'dashboard'}" from favorites`, 'success');
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      showToast('Failed to remove from favorites', 'error');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Custom Card Component
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

  // Custom Badge Component
  const CustomBadge = ({ children, variant = "default", className = "" }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    const variants = {
      default: "bg-blue-100 text-blue-700",
      secondary: "bg-gray-100 text-gray-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-yellow-100 text-yellow-700",
      danger: "bg-red-100 text-red-700",
      primary: "bg-blue-100 text-blue-700",
      dashboard: "bg-blue-100 text-blue-700"
    };
    
    const variantClass = variants[variant] || variants.default;
    
    return (
      <span className={`${baseClasses} ${variantClass} ${className}`}>
        {children}
      </span>
    );
  };

  // Loading state
  const isLoading = loading || localLoading;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalFavorites = Array.isArray(favoriteDashboards) ? favoriteDashboards.length : 0;
  const userName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-lg text-gray-600">
          Welcome back to BI Portal 365
        </p>
      </div>

      {/* Favorites Section */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Your Favorite Dashboards</h2>
            <p className="text-gray-600 text-sm mt-1">
              Quick access to your most important dashboards
            </p>
          </div>
          
          {totalFavorites > 0 && (
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <CustomBadge variant="secondary" className="text-sm">
                {totalFavorites} dashboard{totalFavorites !== 1 ? 's' : ''}
              </CustomBadge>
            </div>
          )}
        </div>
      </div>

      {totalFavorites === 0 ? (
        <CustomCard className="text-center">
          <CustomCardContent className="p-12">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center border-2 border-blue-200">
                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No favorite dashboards yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Discover powerful insights by exploring our dashboards. Add your most important ones to favorites for quick access.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate('/user/browse')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    Browse Dashboards
                  </button>
                </div>
              </div>
            </div>
          </CustomCardContent>
        </CustomCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.isArray(favoriteDashboards) && favoriteDashboards.map((dashboard) => {
            if (!dashboard) return null;
            
            const dashboardId = dashboard._id || dashboard.id;
            const dashboardTitle = dashboard.title || 'Untitled Dashboard';
            const dashboardDescription = dashboard.description || 'No description available';
            const createdByName = dashboard.createdBy?.name || 'Unknown';
            const companyName = dashboard.company?.name || 'Unknown Company';
            const department = dashboard.department || 'Unknown';
            const tags = Array.isArray(dashboard.tags) ? dashboard.tags : [];
            const lastModified = dashboard.lastModified || dashboard.createdAt || new Date().toISOString();
            
            return (
              <CustomCard key={dashboardId || Math.random()} className="hover:shadow-lg transition-all">
                <CustomCardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <CustomCardTitle className="text-base truncate">{dashboardTitle}</CustomCardTitle>
                      <div className="flex flex-wrap gap-2">
                        <CustomBadge variant="dashboard">
                          Dashboard
                        </CustomBadge>
                        {tags.length > 0 && (
                          <CustomBadge variant="secondary" className="text-xs">
                            {tags[0]}
                            {tags.length > 1 && ` +${tags.length - 1}`}
                          </CustomBadge>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFavorite(dashboard)}
                      className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove from favorites"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </CustomCardHeader>
                <CustomCardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{dashboardDescription}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500 border-t pt-3">
                    {createdByName && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Created by
                        </span>
                        <span className="font-medium">{createdByName}</span>
                      </div>
                    )}
                    
                    {companyName && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Company
                        </span>
                        <span className="font-medium">{companyName}</span>
                      </div>
                    )}
                    
                    {department && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Department
                        </span>
                        <span className="font-medium">{department}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Created at
                      </span>
                      <span className="font-medium">
                        {lastModified ? new Date(lastModified).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDashboard(dashboard)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    disabled={!dashboardId}
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
      )}
    </div>
  );
}