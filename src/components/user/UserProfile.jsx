// import React, { useState } from 'react';
// import { useAuth } from '../AuthContext';
// import { useToast } from '../ToastProvider';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
// import { Badge } from '../ui/badge';
// import { Separator } from '../ui/separator';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
// import { Alert, AlertDescription } from '../ui/alert';
// import { ProfilePictureUpload } from './ProfilePictureUpload';
// import { User, Edit, Check, X, Lock, Key, Shield } from '../icons/Icons';
// import api from '../../lib/api';

// export function UserProfile() {
//   const { user, updateUser } = useAuth();
//   const { showToast } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
//   const [loading,setLoading]=useState(false)
//   const [formData, setFormData] = useState({
//     name: user?.name || ''
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [passwordErrors, setPasswordErrors] = useState({});
//   const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

//   const handleSave = async () => {
//   if (!formData.name.trim()) {
//     showToast('Name is required', 'error');
//     return;
//   }

//   setLoading(true);

//   try {
//     const response = await api.put('/users/update/name', { name: formData.name });

//     if (response?.data?.success) {
//       showToast('Settings updated successfully', 'success');
//       console.log('Name updated:', response.data.data);
//     } else {
//       showToast(response?.data?.message || 'Failed to update name', 'error');
//     }
//   } catch (err) {
//     console.error('Update name failed:', err);
//     showToast(err.response?.data?.message || err.message, 'error');
//   } finally {
//     setLoading(false);
//     setIsEditing(false);
//   }
// };


//   const handleCancel = () => {
//     setFormData({
//       name: user?.name || ''
//     });
//     setIsEditing(false);
//   };

//   const validatePassword = () => {
//     const errors = {};
    
//     if (!passwordData.currentPassword) {
//       errors.currentPassword = 'Current password is required';
//     }
    
//     if (!passwordData.newPassword) {
//       errors.newPassword = 'New password is required';
//     } else if (passwordData.newPassword.length < 6) {
//       errors.newPassword = 'Password must be at least 6 characters';
//     }
    
//     if (!passwordData.confirmPassword) {
//       errors.confirmPassword = 'Please confirm your new password';
//     } else if (passwordData.newPassword !== passwordData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }
    
//     if (passwordData.currentPassword === passwordData.newPassword) {
//       errors.newPassword = 'New password must be different from current password';
//     }

//     setPasswordErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//  const handlePasswordReset = async (e) => {
//   e.preventDefault();
  
//   if (!validatePassword()) return;

//   setIsSubmittingPassword(true);
//   const { currentPassword, newPassword } = passwordData;

//   try {
//     const response = await api.post("auth/change-password", {
//       currentPassword,
//       newPassword,
//     });

//     console.log("Password change response:", response);

//     showToast('Password updated successfully');
//     setPasswordData({
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setPasswordErrors({});
//     setIsPasswordDialogOpen(false);
//   } catch (error) {
//     console.error("Password change failed:", error);
//     showToast('Failed to update password', 'error');
//   } finally {
//     setIsSubmittingPassword(false);
//   }
// };

//   const resetPasswordForm = () => {
//     setPasswordData({
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: ''
//     });
//     setPasswordErrors({});
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl text-gray-900 mb-2">Settings</h1>
//         <p className="text-gray-600">Manage your account settings and preferences</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Profile Information */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Profile Picture Upload */}
//           <ProfilePictureUpload />
          
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center">
//                   <User className="h-5 w-5 mr-2 text-primary" />
//                   Profile Information
//                 </CardTitle>
//                 {/* {!isEditing && (
//                   <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
//                     <Edit className="h-4 w-4 mr-2" />
//                     Edit
//                   </Button>
//                 )} */}
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 {isEditing ? (
//                   <Input
//                     id="name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="Enter your full name"
//                   />
//                 ) : (
//                   <p className="text-sm bg-gray-50 p-3 rounded-md border">{user?.name}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address</Label>
//                 <p className="text-sm bg-gray-100 p-3 rounded-md border text-gray-600">{user?.email}</p>
//                 <p className="text-xs text-gray-500">
//                   Email addresses are managed by administrators and cannot be changed by users.
//                 </p>
//               </div>

//               {isEditing && (
//                 <div className="flex space-x-2 pt-4">
//                   <Button onClick={handleSave}>
//                     <Check className="h-4 w-4 mr-2" />
//                     {loading ? "Saving " : "Save Changes"   }
//                   </Button>
//                   <Button variant="outline" onClick={handleCancel}>
//                     <X className="h-4 w-4 mr-2" />
//                     Cancel
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Security Settings */}
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Shield className="h-5 w-5 mr-2 text-primary" />
//                 Security Settings
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-primary/10 p-2 rounded-full">
//                     <Lock className="h-4 w-4 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Password</p>
//                     <p className="text-xs text-gray-500">Change your account password</p>
//                   </div>
//                 </div>
//                 <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
//                   <DialogTrigger asChild>
//                     <Button variant="outline" size="sm" onClick={resetPasswordForm}>
//                       <Key className="h-4 w-4 mr-2" />
//                       Change Password
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-md">
//                     <DialogHeader>
//                       <DialogTitle className="flex items-center">
//                         <Key className="h-5 w-5 mr-2 text-primary" />
//                         Change Password
//                       </DialogTitle>
//                     </DialogHeader>
//                     <form onSubmit={handlePasswordReset} className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="currentPassword">Current Password</Label>
//                         <Input
//                           id="currentPassword"
//                           type="password"
//                           value={passwordData.currentPassword}
//                           onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//                           placeholder="Enter current password"
//                         />
//                         {passwordErrors.currentPassword && (
//                           <p className="text-sm text-red-600">{passwordErrors.currentPassword}</p>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="newPassword">New Password</Label>
//                         <Input
//                           id="newPassword"
//                           type="password"
//                           value={passwordData.newPassword}
//                           onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//                           placeholder="Enter new password"
//                         />
//                         {passwordErrors.newPassword && (
//                           <p className="text-sm text-red-600">{passwordErrors.newPassword}</p>
//                         )}
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                         <Input
//                           id="confirmPassword"
//                           type="password"
//                           value={passwordData.confirmPassword}
//                           onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//                           placeholder="Confirm new password"
//                         />
//                         {passwordErrors.confirmPassword && (
//                           <p className="text-sm text-red-600">{passwordErrors.confirmPassword}</p>
//                         )}
//                       </div>

//                       <Alert>
//                         <AlertDescription className="text-sm">
//                           Password must be at least 6 characters long and different from your current password.
//                         </AlertDescription>
//                       </Alert>

//                       <div className="flex space-x-2 pt-4">
//                         <Button type="submit" disabled={isSubmittingPassword}>
//                           {isSubmittingPassword ? 'Updating...' : 'Update Password'}
//                         </Button>
//                         <Button 
//                           type="button" 
//                           variant="outline" 
//                           onClick={() => setIsPasswordDialogOpen(false)}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     </form>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Account Details */}
//         <div>
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle>Account Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label className="text-sm text-gray-500">Role</Label>
//                 <div className="mt-1">
//                   <Badge variant={user?.role === 'admin' ? 'default' : 'success'}>
//                     {user?.role === 'admin' ? 'Administrator' : 'User'}
//                   </Badge>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <Label className="text-sm text-gray-500">User ID</Label>
//                 <p className="text-sm mt-1 text-gray-700">{user?._id}</p>
//               </div>

//               <div>
//                 <Label className="text-sm text-gray-500">Member Since</Label>
//                 <p className="text-sm mt-1 text-gray-700">{user?.createdAt}</p>
//               </div>

//               <div>
//                 <Label className="text-sm text-gray-500">Last Login</Label>
//                 <p className="text-sm mt-1 text-gray-700">Today</p>
//               </div>

//               <Separator />

//               <div className="bg-primary/5 p-3 rounded-lg">
//                 <p className="text-xs text-primary">
//                   <Shield className="h-3 w-3 inline mr-1" />
//                   Your account is secured with BI Portal 365
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastProvider';
import { useTheme } from '../ThemeContext';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import api from '../../lib/api';
import { useState } from 'react';
export function UserProfile() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const { theme, updateTheme, resetTheme, loading: themeLoading, DEFAULT_THEME } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Theme state
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(theme.secondaryColor);
  
  const [formData, setFormData] = useState({
    name: user?.name || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showToast('Name is required', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await api.put('/users/update/name', { name: formData.name });

      if (response?.data?.success) {
        showToast('Settings updated successfully', 'success');
        console.log('Name updated:', response.data.data);
        // Update local user data
        if (updateUser) {
          updateUser({ ...user, name: formData.name });
        }
      } else {
        showToast(response?.data?.message || 'Failed to update name', 'error');
      }
    } catch (err) {
      console.error('Update name failed:', err);
      showToast(err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || ''
    });
    setIsEditing(false);
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = 'New password must be different from current password';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;

    setIsSubmittingPassword(true);
    const { currentPassword, newPassword } = passwordData;

    try {
      const response = await api.post("auth/change-password", {
        currentPassword,
        newPassword,
      });

      console.log("Password change response:", response);

      showToast('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordErrors({});
      setIsPasswordDialogOpen(false);
    } catch (error) {
      console.error("Password change failed:", error);
      showToast('Failed to update password', 'error');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const resetPasswordForm = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
  };

  // Theme handlers
  const handleSaveTheme = async () => {
    const result = await updateTheme({
      primaryColor,
      secondaryColor,
    });
    
    if (result.success) {
      showToast('Theme updated successfully!', 'success');
    } else {
      showToast('Failed to save theme. Changes applied locally.', 'warning');
    }
  };

  const handleResetTheme = async () => {
    setPrimaryColor(DEFAULT_THEME.primaryColor);
    setSecondaryColor(DEFAULT_THEME.secondaryColor);
    
    const result = await resetTheme();
    if (result.success) {
      showToast('Theme reset to default!', 'success');
    } else {
      showToast('Theme reset locally. Backend sync failed.', 'warning');
    }
  };

  // Preset theme options
  const presetThemes = [
    { name: 'Ocean Blue', primary: '#3B82F6', secondary: '#06B6D4' },
    { name: 'Forest Green', primary: '#10B981', secondary: '#84CC16' },
    { name: 'Royal Purple', primary: '#8B5CF6', secondary: '#EC4899' },
    { name: 'Sunset Orange', primary: '#F97316', secondary: '#EAB308' },
    { name: 'Crimson Red', primary: '#EF4444', secondary: '#F97316' },
    { name: 'Slate Gray', primary: '#64748B', secondary: '#94A3B8' },
  ];

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

  // Custom Badge Component
  const CustomBadge = ({ children, variant = "default", className = "" }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    const variants = {
      default: "bg-blue-100 text-blue-700",
      secondary: "bg-gray-100 text-gray-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-yellow-100 text-yellow-700",
      danger: "bg-red-100 text-red-700"
    };
    
    return (
      <span className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Information & Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Picture Upload */}
          <ProfilePictureUpload />
          
          {/* Profile Information Card */}
          <CustomCard>
            <CustomCardHeader>
              <div className="flex items-center justify-between">
                <CustomCardTitle className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Information
                </CustomCardTitle>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>
            </CustomCardHeader>
            <CustomCardContent className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="text-sm bg-gray-50 p-3 rounded-lg border">{user?.name}</div>
                )}
              </div>

              {/* Email Field (Read-only) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="text-sm bg-gray-100 p-3 rounded-lg border text-gray-600">{user?.email}</div>
                <p className="text-xs text-gray-500">
                  Email addresses are managed by administrators and cannot be changed by users.
                </p>
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="flex space-x-2 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              )}
            </CustomCardContent>
          </CustomCard>

          {/* Security Settings Card */}
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security Settings
              </CustomCardTitle>
            </CustomCardHeader>
            <CustomCardContent className="space-y-4">
              {/* Change Password Section */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Password</p>
                    <p className="text-xs text-gray-500">Change your account password</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    resetPasswordForm();
                    setIsPasswordDialogOpen(true);
                  }}
                  className="flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Change Password
                </button>
              </div>
            </CustomCardContent>
          </CustomCard>

          {/* Theme Settings Card */}
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle className="flex items-center">
                <svg className="h-5 w-5 mr-2" style={{ color: primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Theme Settings
              </CustomCardTitle>
            </CustomCardHeader>
            <CustomCardContent className="space-y-6">
              {/* Color Preview */}
              <div className="p-4 rounded-lg border" style={{ 
                background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)` 
              }}>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-md" 
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div 
                    className="w-12 h-12 rounded-lg shadow-md" 
                    style={{ backgroundColor: secondaryColor }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Current Theme Preview</p>
                    <p className="text-xs text-gray-500">These colors will be applied across the dashboard</p>
                  </div>
                </div>
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Primary Color */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                      placeholder="#3B82F6"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Used for buttons, links, and accents</p>
                </div>

                {/* Secondary Color */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                      placeholder="#10B981"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Used for highlights and gradients</p>
                </div>
              </div>

              {/* Preset Themes */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Quick Presets
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {presetThemes.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setPrimaryColor(preset.primary);
                        setSecondaryColor(preset.secondary);
                      }}
                      className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex -space-x-1">
                        <div 
                          className="w-5 h-5 rounded-full border-2 border-white shadow-sm" 
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div 
                          className="w-5 h-5 rounded-full border-2 border-white shadow-sm" 
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                      <span className="text-xs text-gray-700">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveTheme}
                  disabled={themeLoading}
                  className="flex items-center px-4 py-2 text-white rounded-lg disabled:opacity-50 transition-colors"
                  style={{ backgroundColor: primaryColor }}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {themeLoading ? 'Saving...' : 'Save Theme'}
                </button>
                <button
                  onClick={handleResetTheme}
                  disabled={themeLoading}
                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset to Default
                </button>
              </div>

              {/* Info Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 flex items-start">
                  <svg className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Theme changes are applied immediately and saved to your account. They will persist across sessions and devices.</span>
                </p>
              </div>
            </CustomCardContent>
          </CustomCard>
        </div>

        {/* Right Column - Account Details */}
        <div>
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Account Details</CustomCardTitle>
            </CustomCardHeader>
            <CustomCardContent className="space-y-4">
              {/* Role */}
              <div>
                <label className="text-sm text-gray-500">Role</label>
                <div className="mt-1">
                  <CustomBadge variant={user?.role === 'admin' ? 'default' : 'success'}>
                    {user?.role === 'admin' ? 'Administrator' : 'User'}
                  </CustomBadge>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* User ID */}
              <div>
                <label className="text-sm text-gray-500">User ID</label>
                <p className="text-sm mt-1 text-gray-700 font-mono truncate">{user?._id}</p>
              </div>

              {/* Member Since */}
              <div>
                <label className="text-sm text-gray-500">Member Since</label>
                <p className="text-sm mt-1 text-gray-700">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>

              {/* Last Login */}
              <div>
                <label className="text-sm text-gray-500">Last Login</label>
                <p className="text-sm mt-1 text-gray-700">Today</p>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Security Note */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800 flex items-start">
                  <svg className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Your account is secured with BI Portal 365</span>
                </p>
              </div>
            </CustomCardContent>
          </CustomCard>
        </div>
      </div>

      {/* Password Change Modal */}
      {isPasswordDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Change Password
                </h2>
                <button
                  onClick={() => setIsPasswordDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handlePasswordReset} className="space-y-4">
                {/* Current Password */}
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-sm text-red-600">{passwordErrors.currentPassword}</p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-sm text-red-600">{passwordErrors.newPassword}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    Password must be at least 6 characters long and different from your current password.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmittingPassword}
                    className={`flex-1 px-4 py-2 rounded-lg ${
                      isSubmittingPassword ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                  >
                    {isSubmittingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPasswordDialogOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}