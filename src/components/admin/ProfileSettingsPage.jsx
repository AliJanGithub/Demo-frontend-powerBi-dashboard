import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastProvider';
import { useTheme } from '../ThemeContext';
import { ProfilePictureUpload } from '../user/ProfilePictureUpload';
import api from '../../lib/api';

export function ProfileSettingsPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || ''
  });

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showToast('Name is required', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await api.put('/users/update/name', { name: formData.name });
      if (response?.data?.success) {
        showToast('Profile updated successfully', 'success');
        if (updateUser) updateUser({ ...user, name: formData.name });
      } else {
        showToast(response?.data?.message || 'Failed to update profile', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, #f8fafc 0%, ${theme.primaryColor}08 100%)` }}>
      {/* Themed Header */}
      <header style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }} className="shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
              <p className="text-white/70 text-sm mt-0.5">Manage your personal information and preferences</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Profile Header with Gradient */}
              <div className="h-24 relative" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-xl">
                    <div 
                      className="h-full w-full rounded-xl flex items-center justify-center text-3xl font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
                    >
                      {user?.name?.charAt(0) || 'A'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Admin User'}</h2>
                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
                <div className="mt-4">
                  <span 
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {user?.role === 'ADMIN' ? 'Administrator' : user?.role || 'User'}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="border-t border-gray-100 px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl" style={{ backgroundColor: `${theme.primaryColor}08` }}>
                    <p className="text-2xl font-bold" style={{ color: theme.primaryColor }}>
                      {user?.createdAt ? Math.floor((Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)) : 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Days Active</p>
                  </div>
                  <div className="text-center p-3 rounded-xl" style={{ backgroundColor: `${theme.secondaryColor}08` }}>
                    <p className="text-2xl font-bold" style={{ color: theme.secondaryColor }}>100%</p>
                    <p className="text-xs text-gray-500 mt-1">Profile Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Picture Upload */}
            <ProfilePictureUpload />

            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: `${theme.primaryColor}05` }}>
                <div className="flex items-center">
                  <div className="p-2.5 rounded-xl mr-4" style={{ backgroundColor: `${theme.primaryColor}15` }}>
                    <svg className="h-5 w-5" style={{ color: theme.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <p className="text-sm text-gray-500">Update your personal details</p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md"
                    style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>
              
              <div className="p-6 space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200"
                      style={{ '--tw-ring-color': theme.primaryColor }}
                      onFocus={(e) => { e.target.style.borderColor = theme.primaryColor; }}
                      onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; }}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent text-gray-900">{user?.name}</div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="px-4 py-3 bg-gray-100 rounded-xl border-2 border-transparent text-gray-600 flex items-center">
                    <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user?.email}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Email is managed by administrators
                  </p>
                </div>

                {/* Edit Actions */}
                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center px-6 py-3 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                      style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => { setFormData({ name: user?.name || '' }); setIsEditing(false); }}
                      className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Account Information Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center" style={{ backgroundColor: `${theme.secondaryColor}05` }}>
                <div className="p-2.5 rounded-xl mr-4" style={{ backgroundColor: `${theme.secondaryColor}15` }}>
                  <svg className="h-5 w-5" style={{ color: theme.secondaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                  <p className="text-sm text-gray-500">Your account details and status</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${theme.primaryColor}05` }}>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</p>
                    <p className="text-sm font-mono text-gray-900 mt-1 truncate">{user?._id}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${theme.secondaryColor}05` }}>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</p>
                    <p className="text-sm text-gray-900 mt-1">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
