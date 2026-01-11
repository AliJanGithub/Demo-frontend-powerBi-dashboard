import React, { useState, useCallback } from 'react';
import { useData } from '../DataContext';
import { useAuth } from '../AuthContext';
import { useSettings } from '../SettingsContext';
import { useToast } from '../ToastProvider';
import { useDashboards } from '../DashboardContext';
import { useNavigate } from 'react-router-dom';
import { useUserManagement } from '../hooks/useUserManagement';
import { DashboardForm } from './DashboardForm'; // Adjust path as needed

export function DashboardManagement() {
  const { user, userRoleUser, loadings } = useAuth();
  const navigate = useNavigate();
  const { dashboards, loading, error, fetchDashboards, createDashboard, updateDashboard, deleteDashboard, assignDashboard } = useDashboards();
  const { users } = useUserManagement();
  const { showToast } = useToast();
  const { preferences, updatePreferences } = useSettings();
  const { departments } = useData();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDashboard, setEditingDashboard] = useState(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [selectedDashboardId, setSelectedDashboardId] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const viewMode = preferences.viewMode || 'grid';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    embedUrl: '',
    department: ''
  });
  console.log("dashboard manafement data ", dashboards, assignDashboard)
  const [formErrors, setFormErrors] = useState({});

  // Filter dashboards based on search and department (case-insensitive)
  const filteredDashboards = (dashboards || []).filter(dashboard => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      dashboard.title?.toLowerCase().includes(searchLower) ||
      dashboard.description?.toLowerCase().includes(searchLower);
    const matchesDepartment = selectedDepartment === 'all' ||
      dashboard.department?.toUpperCase() === selectedDepartment.toUpperCase();
    return matchesSearch && matchesDepartment;
  });

  // Use departments from useData context for filter dropdown (with fallback)
  const filterDepartments = ['all', ...(departments || [])];

  // Handler to open the dialog
  const handleAddUsersClick = (dashboardId) => {
    setSelectedDashboardId(dashboardId);
    setIsUserDialogOpen(true);
  };

  // Handler for selecting users
  const toggleUserSelection = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Function to assign selected users
  const handleAssignUsers = async () => {
    if (!selectedDashboardId || selectedUserIds.length === 0) {
      showToast('⚠️ Please select at least one user.');
      return;
    }

    try {
      await assignDashboard(selectedDashboardId, selectedUserIds);
      showToast('✅ Users assigned successfully!');
      setIsUserDialogOpen(false);
      setSelectedUserIds([]);
    } catch (error) {
      showToast(`❌ Failed to assign users: ${error.message || error}`);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.embedUrl.trim()) errors.embedUrl = 'Embed URL is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (formData) => {
    const dashboardData = {
      title: formData.title,
      description: formData.description,
      embedUrl: formData.embedUrl,
      department: formData.department,
    };

    if (editingDashboard) {
      try {
        await updateDashboard(editingDashboard, dashboardData);
        await fetchDashboards();
        showToast('Dashboard updated successfully');
        setIsEditDialogOpen(false);
        setEditingDashboard(null);
        resetForm();
      } catch (error) {
        showToast(`Error occurred in updating the dashboard: ${error}`);
      }
    } else {
      try {
        const result = await createDashboard(dashboardData);
        if (result.success) {
          showToast('✅ Dashboard added successfully');
          await fetchDashboards();
          setIsAddDialogOpen(false);
          resetForm();
        } else {
          showToast('❌ Failed to create dashboard');
        }
      } catch (error) {
        showToast(`Error occurred in creating a dashboard: ${error}`);
      }
    }
  };

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      embedUrl: '',
      department: ''
    });
    setFormErrors({});
  }, []);

  const handleEdit = (dashboard) => {
    setFormData({
      title: dashboard.title,
      description: dashboard.description,
      embedUrl: dashboard.embedUrl,
      department: dashboard.department
    });
    setEditingDashboard(dashboard._id);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const result = await deleteDashboard(id);
        if (result.success) {
          showToast('Dashboard deleted successfully');
        } else {
          showToast('Dashboard deletion unsuccessful');
        }
      } catch (error) {
        showToast(`Something went wrong: ${error}`);
      }
    }
  };

  // Fixed: Properly clear errors using functional update to avoid stale state
  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error using functional update to avoid stale closure
    setFormErrors(prev => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []); // Empty dependency array - stable function reference

  // Custom Card Component
  const CustomCard = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
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
  const CustomBadge = ({ children, className = "", variant = "default" }) => {
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

  // Custom Select Component
  const CustomSelect = ({ value, onValueChange, children, placeholder = "Select..." }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-gray-400"
        >
          <span>{value || placeholder}</span>
          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            {children}
          </div>
        )}
      </div>
    );
  };

  const CustomSelectItem = ({ value, children, onSelect }) => (
    <button
      type="button"
      onClick={() => {
        onSelect(value);
      }}
      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-700"
    >
      {children}
    </button>
  );

  // Simple Dashboard Form Component - FIXED VERSION
  // Using inline handlers for better focus management
  const SimpleDashboardForm = ({ isEdit = false }) => {
    // Local handlers that don't cause re-renders
    const handleInputChange = (field) => (e) => {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error if it exists
      setFormErrors(prev => {
        if (prev[field]) {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        }
        return prev;
      });
    };

    const handleSelectChange = (e) => {
      setFormData(prev => ({ ...prev, department: e.target.value }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Dashboard Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange('title')}
            placeholder="Enter dashboard title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formErrors.title && (
            <p className="text-sm text-red-600">{formErrors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange('description')}
            placeholder="Enter dashboard description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formErrors.description && (
            <p className="text-sm text-red-600">{formErrors.description}</p>
          )}
        </div>

        {/* Embed URL */}
        <div className="space-y-2">
          <label htmlFor="embedUrl" className="block text-sm font-medium text-gray-700">
            Power BI Embed URL *
          </label>
          <input
            id="embedUrl"
            type="text"
            value={formData.embedUrl}
            onChange={handleInputChange('embedUrl')}
            placeholder="https://app.powerbi.com/view?r=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formErrors.embedUrl && (
            <p className="text-sm text-red-600">{formErrors.embedUrl}</p>
          )}
        </div>

        {/* Department */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            value={formData.department}
            onChange={handleSelectChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsAddDialogOpen(false);
              setIsEditDialogOpen(false);
              setEditingDashboard(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isEdit ? 'Update Dashboard' : 'Add Dashboard'}
          </button>
        </div>
      </form>
    );
  };

  // Stats Cards Data
  const statsCards = [
    {
      title: "Total Dashboards",
      value: dashboards.length,
      icon: (
        <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
      ),
      gradient: "from-blue-500 to-blue-600"
    },
    // {
    //   title: "Active Users",
    //   value: userRoleUser.length,
    //   icon: (
    //     <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
    //       <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0c-.281.021-.563.043-.844.064M17 10a4 4 0 11-8 0 4 4 0 018 0z" />
    //       </svg>
    //     </div>
    //   ),
    //   gradient: "from-purple-500 to-purple-600"
    // },
    {
      title: "Departments",
      value: filterDepartments.length - 1,
      icon: (
        <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      ),
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Total Views",
      value: "1,248",
      icon: (
        <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      ),
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard Management
          </h1>
          <p className="text-gray-600 mt-1">Add, edit, and manage Power BI dashboards</p>
        </div>

        {/* Add Dashboard Button */}
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Dashboard
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-r ${stat.gradient} text-white rounded-xl p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search dashboards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {filterDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500 hidden md:block">
              {filteredDashboards.length} dashboard{filteredDashboards.length !== 1 ? 's' : ''} found
            </div>
            <div className="border border-gray-200 rounded-lg p-1 bg-gray-50 flex">
              <button
                onClick={() => updatePreferences({ viewMode: 'grid' })}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </button>
              <button
                onClick={() => updatePreferences({ viewMode: 'list' })}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <svg className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredDashboards.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dashboards Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedDepartment !== 'all'
                  ? 'Try adjusting your filters or search term'
                  : 'Get started by adding your first Power BI dashboard'}
              </p>
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDashboards.map((dashboard) => (
            <CustomCard key={dashboard?._id} className="hover:shadow-lg transition-all">
              <CustomCardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CustomCardTitle className="text-base truncate">
                      {dashboard?.title || "Untitled"}
                    </CustomCardTitle>
                    <CustomBadge variant="default" className="text-xs">
                      Power BI Dashboard
                    </CustomBadge>
                  </div>
                </div>
              </CustomCardHeader>
              <CustomCardContent className="space-y-4">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {dashboard?.description || "No description available"}
                </p>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Department
                    </span>
                    <span className="font-medium text-gray-900">
                      {dashboard?.department || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0c-.281.021-.563.043-.844.064M17 10a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Access Users
                    </span>
                    <span className="font-medium text-gray-900">
                      {dashboard?.accessUsers?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Created
                    </span>
                    <span className="text-gray-700">
                      {dashboard?.createdAt
                        ? new Date(dashboard.createdAt).toLocaleDateString()
                        : "Not available"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => navigate(`view-dashboard/${dashboard?._id}`)}
                    className="flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(dashboard)}
                    className="flex items-center justify-center px-3 py-2 border border-gray-300 hover:border-blue-400 hover:text-blue-600 rounded-lg"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </CustomCardContent>
            </CustomCard>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 md:px-6 py-3">
            <div className="grid grid-cols-12 gap-4 items-center text-sm text-gray-600">
              <div className="col-span-6 md:col-span-4">Dashboard</div>
              <div className="hidden md:block col-span-3">Department</div>
              <div className="hidden md:block col-span-3">Accessed by</div>
              <div className="col-span-6 md:col-span-2 text-right">Actions</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {filteredDashboards.map((dashboard) => (
              <div key={dashboard._id} className="px-4 md:px-6 py-4 hover:bg-gray-50/50">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Dashboard Info */}
                  <div className="col-span-6 md:col-span-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{dashboard.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{dashboard.description}</p>
                    </div>
                  </div>

                  {/* Department - Hidden on mobile */}
                  <div className="hidden md:block col-span-3">
                    <div className="text-sm text-gray-900">{dashboard?.department || "—"}</div>
                  </div>

                  {/* Access Users - Hidden on mobile */}
                  <div className="hidden md:block col-span-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-1">
                        {dashboard?.accessUsers?.slice(0, 3).map((userId, index) => (
                          <div key={userId} className="w-6 h-6 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-blue-600 font-medium">
                              {String.fromCharCode(65 + (index % 26))}
                            </span>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {dashboard?.accessUsers?.length || 0} users
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-6 md:col-span-2">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => navigate(`view-dashboard/${dashboard?._id}`)}
                        className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center"
                      >
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(dashboard)}
                        className="h-8 px-3 text-xs border border-gray-300 hover:border-blue-400 hover:text-blue-600 rounded flex items-center"
                      >
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile View - Department and Users */}
                <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Department:</span>
                      <span className="ml-2 font-medium">{dashboard?.department || "—"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Users:</span>
                      <span className="ml-2 font-medium">{dashboard?.accessUsers?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Dashboard Modal */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Dashboard
                </h2>
                <button
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <DashboardForm
                isEdit={false}
                departments={departments}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}
              />
            </div>
          </div>
        </div>
      )}


      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Dashboard
                </h2>
                <button
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingDashboard(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <DashboardForm
                isEdit={true}
                initialData={formData}
                departments={departments}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setEditingDashboard(null);
                  resetForm();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Assign Users Modal */}
      {isUserDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0c-.281.021-.563.043-.844.064M17 10a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Assign Users to Dashboard
                </h2>
                <button
                  onClick={() => setIsUserDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Select users to grant access to this dashboard.
              </p>

              {/* User list with checkboxes */}
              <div className="space-y-2 max-h-60 overflow-y-auto py-2">
                {userRoleUser.length > 0 ? (
                  userRoleUser.map((user) => (
                    <label
                      key={user._id}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedUserIds.includes(user._id)}
                          onChange={() => toggleUserSelection(user._id)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-800">{user.name}</span>
                      </div>
                      {selectedUserIds.includes(user._id) && (
                        <span className="text-blue-600 text-xs">
                          Selected
                        </span>
                      )}
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-3">
                    No users available to assign.
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
                <button
                  onClick={() => setIsUserDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignUsers}
                  disabled={selectedUserIds.length === 0 || loadings}
                  className={`px-4 py-2 rounded-lg ${selectedUserIds.length === 0 || loadings ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  {loadings ? "Assigning..." : "Assign Users"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}