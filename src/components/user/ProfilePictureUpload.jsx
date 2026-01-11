// import React, { useState, useRef, useEffect } from "react";
// import { useAuth } from "../AuthContext";
// import { useToast } from "../ToastProvider";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { Badge } from "../ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import { User, Camera, Upload, Trash2, Check } from "../icons/Icons";

// export function ProfilePictureUpload({ className = "" }) {
//   const { user, userLogo, uploadUserLogo, fetchUserLogo } = useAuth();
//   const { showToast } = useToast();

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [previewLogo, setPreviewLogo] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   // ✅ Fetch user logo when component mounts or user changes
//   useEffect(() => {
//     if (user?._id) {
//       fetchUserLogo(user._id).catch((err) =>
//         console.error("Failed to fetch user logo:", err)
//       );
//     }
//   }, [user?._id, fetchUserLogo]);

//   // 🔹 Handle logo upload with proper loading + preview
//   const handleLogoUpload = async (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate size
//     if (file.size > 2 * 1024 * 1024) {
//       showToast("Logo file must be less than 2MB", "error");
//       return;
//     }

//     // Local preview
//     const reader = new FileReader();
//     reader.onload = (e) => setPreviewLogo(e.target?.result);
//     reader.readAsDataURL(file);

//     try {
//       setIsUploading(true);
//       await uploadUserLogo(file);
//       await fetchUserLogo(user._id);
//       showToast("Logo uploaded successfully!", "success");
//       setIsDialogOpen(false);
//       setPreviewLogo(null);
//     } catch (error) {
//       console.error("Upload error:", error);
//       showToast("Error uploading logo", "error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // 🔹 Remove profile picture (if backend supports it)
//   const handleRemove = async () => {
//     if (!user) return;
//     try {
//       setIsUploading(true);
//       await uploadUserLogo(null); // assume null clears it on backend
//       await fetchUserLogo(user._id);
//       showToast("Profile picture removed", "success");
//       setIsDialogOpen(false);
//     } catch (error) {
//       showToast("Failed to remove picture", "error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const resetDialog = () => {
//     setPreviewLogo(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <Card className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm ${className}`}>
//       <CardContent className="p-6">
//         <div className="flex items-center space-x-4">
//           {/* Current Profile Picture */}
//           <div className="relative">
//             <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-success/10 border-2 border-primary/20">
//               {userLogo ? (
//                 <img
//                   src={userLogo}
//                   alt={user?.name || "Profile"}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <User className="h-8 w-8 text-primary/60" />
//                 </div>
//               )}
//             </div>
//             {userLogo && (
//               <Badge
//                 variant="success"
//                 className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center"
//               >
//                 <Check className="h-3 w-3" />
//               </Badge>
//             )}
//           </div>

//           {/* Upload Controls */}
//           <div className="flex-1">
//             <h3 className="font-medium text-gray-900 mb-1">Profile Picture</h3>
//             <p className="text-sm text-gray-600 mb-3">
//               {userLogo
//                 ? "Update your profile picture"
//                 : "Add a profile picture to personalize your account"}
//             </p>

//             <div className="flex space-x-2">
//               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 <DialogTrigger asChild>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={resetDialog}
//                     disabled={isUploading}
//                   >
//                     <Camera className="h-4 w-4 mr-2" />
//                     {userLogo ? "Change Picture" : "Add Picture"}
//                   </Button>
//                 </DialogTrigger>

//                 <DialogContent className="max-w-md">
//                   <DialogHeader>
//                     <DialogTitle className="flex items-center">
//                       <Camera className="h-5 w-5 mr-2 text-primary" />
//                       {userLogo ? "Update Profile Picture" : "Add Profile Picture"}
//                     </DialogTitle>
//                   </DialogHeader>

//                   <div className="space-y-4">
//                     {/* Current/Preview Image */}
//                     <div className="flex justify-center">
//                       <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-success/10 border-2 border-primary/20">
//                         {previewLogo ? (
//                           <img
//                             src={previewLogo}
//                             alt="Preview"
//                             className="w-full h-full object-cover"
//                           />
//                         ) : userLogo ? (
//                           <img
//                             src={userLogo}
//                             alt="Current"
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <User className="h-12 w-12 text-primary/60" />
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* File Input */}
//                     <div className="space-y-3">
//                       <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*"
//                         onChange={handleLogoUpload}
//                         className="hidden"
//                       />

//                       <Button
//                         variant="outline"
//                         className="w-full"
//                         onClick={() => fileInputRef.current?.click()}
//                         disabled={isUploading}
//                       >
//                         <Upload className="h-4 w-4 mr-2" />
//                         {isUploading ? "Uploading..." : "Choose Image"}
//                       </Button>

//                       <p className="text-xs text-gray-500 text-center">
//                         Supported: JPG, PNG (max 2MB)
//                       </p>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex space-x-2 pt-2">
//                       {userLogo && !isUploading && (
//                         <Button
//                           variant="destructive"
//                           onClick={handleRemove}
//                           disabled={isUploading}
//                           className="flex-1"
//                         >
//                           <Trash2 className="h-4 w-4 mr-2" />
//                           Remove Picture
//                         </Button>
//                       )}

//                       <Button
//                         variant="outline"
//                         onClick={() => setIsDialogOpen(false)}
//                         disabled={isUploading}
//                         className="flex-1"
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useToast } from "../ToastProvider";

export function ProfilePictureUpload({ className = "" }) {
  const { user, userLogo, uploadUserLogo, fetchUserLogo } = useAuth();
  const { showToast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch user logo when component mounts or user changes
  useEffect(() => {
    if (user?._id) {
      fetchUserLogo(user._id).catch((err) =>
        console.error("Failed to fetch user logo:", err)
      );
    }
  }, [user?._id, fetchUserLogo]);

  // Handle logo upload with proper loading + preview
  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size > 2 * 1024 * 1024) {
      showToast("Logo file must be less than 2MB", "error");
      return;
    }

    // Local preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewLogo(e.target?.result);
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);
      await uploadUserLogo(file);
      await fetchUserLogo(user._id);
      showToast("Logo uploaded successfully!", "success");
      setIsDialogOpen(false);
      setPreviewLogo(null);
    } catch (error) {
      console.error("Upload error:", error);
      showToast("Error uploading logo", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Remove profile picture (if backend supports it)
  const handleRemove = async () => {
    if (!user) return;
    try {
      setIsUploading(true);
      await uploadUserLogo(null); // assume null clears it on backend
      await fetchUserLogo(user._id);
      showToast("Profile picture removed", "success");
      setIsDialogOpen(false);
    } catch (error) {
      showToast("Failed to remove picture", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const resetDialog = () => {
    setPreviewLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Custom Card Component
  const CustomCard = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );

  const CustomCardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
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
    <CustomCard className={className}>
      <CustomCardContent>
        <div className="flex items-center space-x-4">
          {/* Current Profile Picture */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-green-100 border-2 border-blue-200">
              {userLogo ? (
                <img
                  src={userLogo}
                  alt={user?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            {userLogo && (
              <CustomBadge
                variant="success"
                className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </CustomBadge>
            )}
          </div>

          {/* Upload Controls */}
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">Profile Picture</h3>
            <p className="text-sm text-gray-600 mb-3">
              {userLogo
                ? "Update your profile picture"
                : "Add a profile picture to personalize your account"}
            </p>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  resetDialog();
                  setIsDialogOpen(true);
                }}
                disabled={isUploading}
                className="flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {userLogo ? "Change Picture" : "Add Picture"}
              </button>
            </div>
          </div>
        </div>
      </CustomCardContent>

      {/* Profile Picture Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {userLogo ? "Update Profile Picture" : "Add Profile Picture"}
                </h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Current/Preview Image */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-green-100 border-2 border-blue-200">
                    {previewLogo ? (
                      <img
                        src={previewLogo}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : userLogo ? (
                      <img
                        src={userLogo}
                        alt="Current"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* File Input */}
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {isUploading ? "Uploading..." : "Choose Image"}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Supported: JPG, PNG (max 2MB)
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {userLogo && !isUploading && (
                    <button
                      onClick={handleRemove}
                      disabled={isUploading}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove Picture
                    </button>
                  )}

                  <button
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isUploading}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CustomCard>
  );
}