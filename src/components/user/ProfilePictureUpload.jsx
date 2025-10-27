import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useToast } from "../ToastProvider";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { User, Camera, Upload, Trash2, Check } from "../icons/Icons";

export function ProfilePictureUpload({ className = "" }) {
  const { user, userLogo, uploadUserLogo, fetchUserLogo } = useAuth();
  const { showToast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // ✅ Fetch user logo when component mounts or user changes
  useEffect(() => {
    if (user?._id) {
      fetchUserLogo(user._id).catch((err) =>
        console.error("Failed to fetch user logo:", err)
      );
    }
  }, [user?._id, fetchUserLogo]);

  // 🔹 Handle logo upload with proper loading + preview
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

  // 🔹 Remove profile picture (if backend supports it)
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

  return (
    <Card className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          {/* Current Profile Picture */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-success/10 border-2 border-primary/20">
              {userLogo ? (
                <img
                  src={userLogo}
                  alt={user?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary/60" />
                </div>
              )}
            </div>
            {userLogo && (
              <Badge
                variant="success"
                className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center"
              >
                <Check className="h-3 w-3" />
              </Badge>
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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetDialog}
                    disabled={isUploading}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {userLogo ? "Change Picture" : "Add Picture"}
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2 text-primary" />
                      {userLogo ? "Update Profile Picture" : "Add Profile Picture"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    {/* Current/Preview Image */}
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-success/10 border-2 border-primary/20">
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
                            <User className="h-12 w-12 text-primary/60" />
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

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? "Uploading..." : "Choose Image"}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Supported: JPG, PNG (max 2MB)
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      {userLogo && !isUploading && (
                        <Button
                          variant="destructive"
                          onClick={handleRemove}
                          disabled={isUploading}
                          className="flex-1"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Picture
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        disabled={isUploading}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
