
// import React, { useState, useRef, useEffect, use } from 'react';
// import { useSettings } from '../SettingsContext';
// import { useToast } from '../ToastProvider';
// import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
// import { Button } from '../ui/button';
// import { Image, Upload } from '../icons/Icons';
// import { useAuth } from '../AuthContext';
// import { Users } from 'lucide-react';

// // export function OrganizationSettings() {
// //   const { settings } = useSettings();
// //   const { showToast } = useToast();
// //   const fileInputRef = useRef(null);

// //   const { user, userLogo, uploadUserLogo, fetchUserLogo } = useAuth(); // ✅ aligned with new AuthContext

// //   const [previewLogo, setPreviewLogo] = useState(userLogo || settings.companyLogo);

// //   // ✅ Fetch logo from backend if not loaded yet
// //   useEffect(() => {
// //     if (user?._id) fetchUserLogo(user._id);
// //   }, [user?._id]);

// //   // ✅ Update preview whenever userLogo changes (after fetch/upload)
// //   useEffect(() => {
// //     if (userLogo) setPreviewLogo(userLogo);
// //   }, [userLogo]);

// //   /**
// //    * ✅ Handles logo upload
// //    */
// //   const handleLogoUpload = async (event) => {
// //     const file = event.target.files?.[0];
// //     if (!file) return;

// //     if (file.size > 2 * 1024 * 1024) {
// //       showToast('Logo file must be less than 2MB', 'error');
// //       return;
// //     }

// //     // Local preview for instant feedback
// //     const reader = new FileReader();
// //     reader.onload = (e) => setPreviewLogo(e.target?.result);
// //     reader.readAsDataURL(file);

// //     try {
// //       await uploadUserLogo(file); // ✅ use context function
// //       await fetchUserLogo(user._id); // ✅ refresh immediately
// //       showToast('Logo uploaded successfully!', 'success');
// //     } catch (error) {
// //       console.error('Upload error:', error);
// //       showToast('Error uploading logo', 'error');
// //     }
// //   };

// //   const removeLogo = () => {
// //     setPreviewLogo(null);
// //     if (fileInputRef.current) fileInputRef.current.value = '';
// //   };

// //   return (
// //     <div id="legacy-design-wrapper" className="space-y-6">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-2xl text-gray-900 mb-2">Organization Settings</h1>
// //         <p className="text-gray-600">
// //           Customize your organization's branding and appearance
// //         </p>
// //       </div>

// //       {/* Company Information */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle className="flex items-center space-x-2">
// //             <span className="text-lg font-semibold">Company Information</span>
// //           </CardTitle>
// //         </CardHeader>

// //         <CardContent className="space-y-4">
// //           <div className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
// //             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
// //               <span className="text-sm text-gray-500">Company Name</span>
// //               <span className="font-medium text-gray-800">
// //                 {user?.company?.name || 'N/A'}
// //               </span>
// //             </div>

// //             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
// //               <span className="text-sm text-gray-500">Created At</span>
// //               <span className="font-medium text-gray-800">
// //                 {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
// //               </span>
// //             </div>

// //             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
// //               <span className="text-sm text-gray-500">Role</span>
// //               <span className="font-medium text-gray-800">{user?.role || 'N/A'}</span>
// //             </div>

// //             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
// //               <span className="text-sm text-gray-500">Creator Email</span>
// //               <span className="font-medium text-gray-800">
// //                 {user?.invitedBy || 'N/A'}
// //               </span>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* ✅ Company Logo Upload Section */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle className="flex items-center space-x-2">
// //             <Image className="h-5 w-5" />
// //             <span>Company Logo</span>
// //           </CardTitle>
// //         </CardHeader>

// //         <CardContent className="space-y-6">
// //           <div className="space-y-4">
// //             <div className="flex items-start space-x-4">
// //               <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
// //                 {previewLogo ? (
// //                   <img
// //                     src={previewLogo}
// //                     alt="Company Logo"
// //                     className="w-full h-full object-contain rounded-lg"
// //                   />
// //                 ) : (
// //                   <div className="text-center">
// //                     <Image className="h-8 w-8 text-gray-400 mx-auto mb-1" />
// //                     <span className="text-xs text-gray-500">No logo</span>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="flex-1 space-y-2">
// //                 <div className="flex space-x-2">
// //                   <Button
// //                     variant="outline"
// //                     onClick={() => fileInputRef.current?.click()}
// //                     className="flex items-center space-x-2"
// //                   >
// //                     <Upload className="h-4 w-4" />
// //                     <span>Upload Logo</span>
// //                   </Button>
// //                   {/* {previewLogo && (
// //                     <Button variant="outline" onClick={removeLogo}>
// //                       Remove
// //                     </Button>
// //                   )} */}
// //                 </div>
// //                 <p className="text-sm text-gray-500">
// //                   Upload a square logo (recommended 200x200px, max 2MB)
// //                   <br />
// //                   Supported formats: PNG, JPG, SVG
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Hidden file input */}
// //             <input
// //               ref={fileInputRef}
// //               type="file"
// //               accept="image/*"
// //               onChange={handleLogoUpload}
// //               className="hidden"
// //             />
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }
// export function OrganizationSettings() {
//   const { settings } = useSettings();
//   const { showToast } = useToast();
//   const fileInputRef = useRef(null);
//   const { user, userLogo, uploadUserLogo, fetchUserLogo } = useAuth();
//   const [previewLogo, setPreviewLogo] = useState(userLogo || settings.companyLogo);

//   useEffect(() => {
//     if (user?._id) fetchUserLogo(user._id);
//   }, [user?._id]);

//   useEffect(() => {
//     if (userLogo) setPreviewLogo(userLogo);
//   }, [userLogo]);

//   const handleLogoUpload = async (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) {
//       showToast('Logo must be under 2MB', 'error');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => setPreviewLogo(e.target?.result);
//     reader.readAsDataURL(file);

//     try {
//       await uploadUserLogo(file);
//       await fetchUserLogo(user._id);
//       showToast('Logo uploaded successfully!', 'success');
//     } catch {
//       showToast('Error uploading logo', 'error');
//     }
//   };

//   const removeLogo = () => {
//     setPreviewLogo(null);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   return (
//     <div
//       id="organization-settings"
//       className="space-y-8 p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl shadow-xl border border-blue-100/50"
//     >
//       {/* HEADER */}
//       <div className="text-center mb-6">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
//           Organization Settings
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Manage your organization’s identity, logo, and appearance.
//         </p>
//       </div>

//       {/* COMPANY INFO CARD */}
//       <div
//         className="relative rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl 
//         shadow-md hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300"
//       >
//         <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/10 via-purple-200/10 to-indigo-200/10 opacity-60" />
//         <Card className="relative border-none bg-transparent">
//           <CardHeader className="border-b border-gray-100/50">
//             <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
//               <Users className="h-5 w-5 text-blue-600" />
//               <span>Company Information</span>
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-3 pt-4">
//             {[
//               ['Company Name', user?.company?.name],
//               ['Created At', user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'],
//               ['Role', user?.role],
//               ['Creator Email', user?.email],
//             ].map(([label, value]) => (
//               <div
//                 key={label}
//                 className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-blue-50/60 transition"
//               >
//                 <span className="text-sm text-gray-500">{label}</span>
//                 <span className="font-medium text-gray-800">{value || 'N/A'}</span>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>



// {/* SUBSCRIPTION INFO CARD */}
// <div
//   className="relative rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl 
//   shadow-md hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300"
// >
//   <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-200/10 via-emerald-200/10 to-teal-200/10 opacity-60" />
//   <Card className="relative border-none bg-transparent">
//     <CardHeader className="border-b border-gray-100/50">
//       <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
//         <Users className="h-5 w-5 text-green-600" />
//         <span>Subscription Information</span>
//       </CardTitle>
//     </CardHeader>
// <CardContent className="space-y-3 pt-4">
//   {(() => {
//     // 🔥 This will come from DB in real case
//     const subscriptionEndRaw = user?.subscriptionEnd || "2026-04-29T20:05:31.133Z";

//     // Convert to date object
//     const subscriptionEndDate = new Date(subscriptionEndRaw);
//     const now = new Date();

//     // Calculate days left
//     const diffTime = subscriptionEndDate - now;
//     const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

//     // Format date nicely
//     const formattedEndDate = subscriptionEndDate.toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//     return (
//       <>
//         {/* Plan Type */}
//         <div className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-green-50/60 transition">
//           <span className="text-sm text-gray-500">Plan Type</span>
//           <span className="font-medium text-gray-800">
//             {user?.subscriptionPlan || "Pro"}
//           </span>
//         </div>

//         {/* Subscription Ends In */}
//         <div className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-green-50/60 transition">
//           <span className="text-sm text-gray-500">Subscription Ends In</span>
//           <span
//             className={`font-semibold ${
//               daysLeft < 7 ? "text-red-600" : "text-green-600"
//             }`}
//           >
//             {daysLeft} {daysLeft === 1 ? "day" : "days"}
//           </span>
//         </div>

//         {/* End Date */}
//         <div className="flex justify-between items-center px-3 py-2 rounded-xl hover:bg-green-50/60 transition">
//           <span className="text-sm text-gray-500">End Date</span>
//           <span className="font-medium text-gray-800">{formattedEndDate}</span>
//         </div>
//       </>
//     );
//   })()}
// </CardContent>

//   </Card>
// </div>

//       {/* COMPANY LOGO CARD */}
//       <div
//         className="relative rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl 
//         shadow-md hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300"
//       >
//         <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-200/10 via-pink-200/10 to-indigo-200/10 opacity-60" />
//         <Card className="relative border-none bg-transparent">
//           <CardHeader className="border-b border-gray-100/50">
//             <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
//               <Image className="h-5 w-5 text-purple-600" />
//               <span>Company Logo</span>
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6 pt-4">
//             <div className="flex items-start space-x-6">
//               {/* Logo Preview Box */}
//               <div
//                 className="relative w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl 
//                 flex items-center justify-center bg-gray-50/70 hover:border-purple-400 transition"
//               >
//                 {previewLogo ? (
//                   <img
//                     src={previewLogo}
//                     alt="Company Logo"
//                     className="w-full h-full object-contain rounded-lg shadow-sm"
//                   />
//                 ) : (
//                   <div className="text-center">
//                     <Image className="h-8 w-8 text-gray-400 mx-auto mb-1" />
//                     <span className="text-xs text-gray-500">No logo</span>
//                   </div>
//                 )}
//               </div>

//               {/* Upload Actions */}
//               <div className="flex-1 space-y-3">
//                 <div className="flex space-x-3">
//                   <Button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md transition"
//                   >
//                     <Upload className="h-4 w-4 mr-2" />
//                     Upload Logo
//                   </Button>

//                   {previewLogo && (
//                     <Button
//                       variant="outline"
//                       onClick={removeLogo}
//                       className="hover:bg-red-50 hover:text-red-600 border-red-200 text-red-500"
//                     >
//                       Remove
//                     </Button>
//                   )}
//                 </div>

//                 <p className="text-sm text-gray-500 leading-relaxed">
//                   Recommended size: <span className="font-medium text-gray-700">200×200px</span>, max 2MB. <br />
//                   Supported: PNG, JPG, SVG.
//                 </p>
//               </div>
//             </div>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleLogoUpload}
//               className="hidden"
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../SettingsContext';
import { useToast } from '../ToastProvider';
import { useAuth } from '../AuthContext';

export function OrganizationSettings() {
  const { settings } = useSettings();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const { user, userLogo, uploadUserLogo, fetchUserLogo } = useAuth();
  const [previewLogo, setPreviewLogo] = useState(userLogo || settings.companyLogo);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user?._id) fetchUserLogo(user._id);
  }, [user?._id]);

  useEffect(() => {
    if (userLogo) setPreviewLogo(userLogo);
  }, [userLogo]);

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      showToast('Logo must be under 2MB', 'error');
      return;
    }

    // Local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewLogo(e.target?.result);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      await uploadUserLogo(file);
      await fetchUserLogo(user._id);
      showToast('Logo uploaded successfully!', 'success');
    } catch {
      showToast('Error uploading logo', 'error');
    } finally {
      setUploading(false);
    }
  };

  const removeLogo = () => {
    setPreviewLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Custom Card Component
  const CustomCard = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );

  const CustomCardHeader = ({ children, className = "" }) => (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );

  const CustomCardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );

  const CustomCardContent = ({ children, className = "" }) => (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );

  // Format subscription data
  const formatSubscriptionData = () => {
    const subscriptionEndRaw = user?.subscriptionEnd || "2026-04-29T20:05:31.133Z";
    const subscriptionEndDate = new Date(subscriptionEndRaw);
    const now = new Date();
    const diffTime = subscriptionEndDate - now;
    const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const formattedEndDate = subscriptionEndDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return { daysLeft, formattedEndDate };
  };

  const { daysLeft, formattedEndDate } = formatSubscriptionData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Organization Settings</h1>
        <p className="text-gray-600 mt-1">Customize your organization's branding and appearance</p>
      </div>

      {/* Company Information Card */}
      <CustomCard className="shadow-md">
        <CustomCardHeader>
          <CustomCardTitle className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Company Information
          </CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="space-y-3">
            {[
              ['Company Name', user?.company?.name],
              ['Created At', user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'],
              ['Role', user?.role],
              ['Creator Email', user?.email],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="font-medium text-gray-900">{value || 'N/A'}</span>
              </div>
            ))}
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* Subscription Information Card */}
      <CustomCard className="shadow-md">
        <CustomCardHeader>
          <CustomCardTitle className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Subscription Information
          </CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">Plan Type</span>
              <span className="font-medium text-gray-900">{user?.subscriptionPlan || "Pro"}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">Subscription Ends In</span>
              <span className={`font-semibold ${daysLeft < 7 ? 'text-red-600' : 'text-green-600'}`}>
                {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">End Date</span>
              <span className="font-medium text-gray-900">{formattedEndDate}</span>
            </div>
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* Company Logo Card */}
      <CustomCard className="shadow-md">
        <CustomCardHeader>
          <CustomCardTitle className="flex items-center">
            <svg className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Company Logo
          </CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Logo Preview */}
              <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {previewLogo ? (
                  <>
                    <img
                      src={previewLogo}
                      alt="Company Logo"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    {uploading && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <svg className="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-gray-500">No logo</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-3">
                <div className="flex space-x-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {uploading ? 'Uploading...' : 'Upload Logo'}
                  </button>

                  {previewLogo && (
                    <button
                      onClick={removeLogo}
                      disabled={uploading}
                      className="flex items-center px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>• Recommended size: 200×200px</p>
                  <p>• Maximum file size: 2MB</p>
                  <p>• Supported formats: PNG, JPG, SVG</p>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </div>
            </div>

            {/* Current Logo Preview */}
            {previewLogo && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Logo Preview:</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center bg-white">
                    <img
                      src={previewLogo}
                      alt="Logo Preview"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    This logo appears in dashboards and user interfaces
                  </div>
                </div>
              </div>
            )}
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* Settings Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium">Settings Information</p>
            <p className="text-sm text-blue-700 mt-1">
              Changes to organization settings are applied immediately across the platform.
              Contact support if you need to make changes to subscription plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}