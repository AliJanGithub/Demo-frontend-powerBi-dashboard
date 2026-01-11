import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useToast } from '../ToastProvider';
import { useTheme } from '../ThemeContext';
import api from '../../lib/api';

export function AccountSettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const { theme, updateTheme, resetTheme, DEFAULT_THEME } = useTheme();
  
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(theme.secondaryColor);
  const [savingTheme, setSavingTheme] = useState(false);

  const presetThemes = [
    { name: 'Ocean Blue', primary: '#3B82F6', secondary: '#06B6D4', icon: '🌊' },
    { name: 'Forest Green', primary: '#10B981', secondary: '#84CC16', icon: '🌲' },
    { name: 'Royal Purple', primary: '#8B5CF6', secondary: '#EC4899', icon: '👑' },
    { name: 'Sunset Orange', primary: '#F97316', secondary: '#EAB308', icon: '🌅' },
    { name: 'Crimson Red', primary: '#EF4444', secondary: '#F97316', icon: '🔥' },
    { name: 'Slate Gray', primary: '#64748B', secondary: '#94A3B8', icon: '🌫️' },
  ];

  const validatePassword = () => {
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) errors.newPassword = 'New password is required';
    else if (passwordData.newPassword.length < 6) errors.newPassword = 'Password must be at least 6 characters';
    if (!passwordData.confirmPassword) errors.confirmPassword = 'Please confirm your new password';
    else if (passwordData.newPassword !== passwordData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (passwordData.currentPassword === passwordData.newPassword) errors.newPassword = 'New password must be different';
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setIsSubmittingPassword(true);
    try {
      await api.post("auth/change-password", { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
      showToast('Password updated successfully', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({});
      setIsPasswordDialogOpen(false);
    } catch (error) {
      showToast('Failed to update password', 'error');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const handleSaveTheme = async () => {
    setSavingTheme(true);
    const result = await updateTheme({ primaryColor, secondaryColor });
    setSavingTheme(false);
    showToast(result.success ? 'Theme updated successfully!' : 'Theme applied locally', result.success ? 'success' : 'warning');
  };

  const handleResetTheme = async () => {
    setPrimaryColor(DEFAULT_THEME.primaryColor);
    setSecondaryColor(DEFAULT_THEME.secondaryColor);
    await resetTheme();
    showToast('Theme reset to default!', 'success');
  };

  const handleLogout = async () => {
    try { await logout(); navigate('/login'); } catch (error) { console.error('Logout failed:', error); }
  };

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, #f8fafc 0%, ${theme.primaryColor}08 100%)` }}>
      {/* Themed Header */}
      <header style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }} className="shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Account Settings</h1>
              <p className="text-white/70 text-sm mt-0.5">Manage your security, theme and preferences</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center" style={{ backgroundColor: `${theme.primaryColor}05` }}>
            <div className="p-2.5 rounded-xl mr-4" style={{ backgroundColor: `${theme.primaryColor}15` }}>
              <svg className="h-5 w-5" style={{ color: theme.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              <p className="text-sm text-gray-500">Manage your password and security preferences</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-200" style={{ backgroundColor: `${theme.primaryColor}03` }}>
              <div className="flex items-center">
                <div className="p-3 rounded-xl mr-4" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}20, ${theme.secondaryColor}20)` }}>
                  <svg className="h-6 w-6" style={{ color: theme.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Password</p>
                  <p className="text-sm text-gray-500">Last changed: Never</p>
                </div>
              </div>
              <button
                onClick={() => setIsPasswordDialogOpen(true)}
                className="px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`, color: 'white' }}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center" style={{ backgroundColor: `${theme.secondaryColor}05` }}>
            <div className="p-2.5 rounded-xl mr-4" style={{ backgroundColor: `${theme.secondaryColor}15` }}>
              <svg className="h-5 w-5" style={{ color: theme.secondaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Theme Customization</h3>
              <p className="text-sm text-gray-500">Personalize your dashboard appearance</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Live Preview */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-gray-200" style={{ background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)` }}>
              <p className="text-sm font-medium text-gray-500 mb-4">Live Preview</p>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }} />
                <div className="flex-1">
                  <div className="h-3 rounded-full mb-2" style={{ backgroundColor: primaryColor, width: '60%' }} />
                  <div className="h-3 rounded-full" style={{ backgroundColor: secondaryColor, width: '40%' }} />
                </div>
                <button className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: primaryColor }}>Button</button>
              </div>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border-2 border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Primary Color</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-16 h-16 rounded-xl cursor-pointer border-0 p-0" />
                    <div className="absolute inset-0 rounded-xl ring-2 ring-gray-200 pointer-events-none" />
                  </div>
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-mono text-sm focus:outline-none"
                    style={{ borderColor: primaryColor }}
                  />
                </div>
              </div>
              <div className="p-5 rounded-xl border-2 border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Secondary Color</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-16 h-16 rounded-xl cursor-pointer border-0 p-0" />
                    <div className="absolute inset-0 rounded-xl ring-2 ring-gray-200 pointer-events-none" />
                  </div>
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-mono text-sm focus:outline-none"
                    style={{ borderColor: secondaryColor }}
                  />
                </div>
              </div>
            </div>

            {/* Preset Themes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">Quick Presets</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {presetThemes.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => { setPrimaryColor(preset.primary); setSecondaryColor(preset.secondary); }}
                    className="group p-4 rounded-xl border-2 border-gray-100 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="h-10 w-10 rounded-xl shadow-md" style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` }} />
                    </div>
                    <p className="text-xs font-medium text-gray-600 text-center">{preset.icon} {preset.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={handleSaveTheme}
                disabled={savingTheme}
                className="flex-1 min-w-[200px] flex items-center justify-center px-6 py-3.5 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
              >
                {savingTheme ? (
                  <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {savingTheme ? 'Saving...' : 'Save Theme'}
              </button>
              <button onClick={handleResetTheme} className="px-6 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200">
                Reset to Default
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-red-100 flex items-center bg-red-50">
            <div className="p-2.5 rounded-xl mr-4 bg-red-100">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
              <p className="text-sm text-red-500">Irreversible actions</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between p-5 rounded-xl bg-red-50 border border-red-200">
              <div>
                <p className="font-semibold text-gray-900">Sign Out</p>
                <p className="text-sm text-gray-500">Sign out from your account on this device</p>
              </div>
              <button onClick={handleLogout} className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-lg">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Password Modal */}
      {isPasswordDialogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100" style={{ background: `linear-gradient(135deg, ${theme.primaryColor}10, ${theme.secondaryColor}10)` }}>
              <div className="flex items-center">
                <div className="p-2.5 rounded-xl mr-4" style={{ backgroundColor: `${theme.primaryColor}20` }}>
                  <svg className="h-5 w-5" style={{ color: theme.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              </div>
            </div>
            <form onSubmit={handlePasswordReset} className="p-6 space-y-5">
              {['currentPassword', 'newPassword', 'confirmPassword'].map((field, idx) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm Password'}
                  </label>
                  <input
                    type="password"
                    value={passwordData[field]}
                    onChange={(e) => setPasswordData({ ...passwordData, [field]: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-200"
                    onFocus={(e) => { e.target.style.borderColor = theme.primaryColor; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; }}
                  />
                  {passwordErrors[field] && <p className="text-sm text-red-600 mt-1">{passwordErrors[field]}</p>}
                </div>
              ))}
              <div className="p-4 rounded-xl" style={{ backgroundColor: `${theme.primaryColor}10` }}>
                <p className="text-sm" style={{ color: theme.primaryColor }}>
                  <svg className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Password must be at least 6 characters and different from current.
                </p>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="flex-1 flex items-center justify-center px-6 py-3 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                  style={{ background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}
                >
                  {isSubmittingPassword ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsPasswordDialogOpen(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); setPasswordErrors({}); }}
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
