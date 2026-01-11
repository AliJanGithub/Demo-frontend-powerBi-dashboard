// NotificationButton.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, MessageSquare, UserPlus, X, CheckCheck } from './icons/Icons';
import api from '../lib/api';

// Dashboard icon component (inline since it may not exist in Icons)
const DashboardIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export function NotificationButton() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);
  const socketRef = useRef(null);

  const accessToken = localStorage.getItem('accessToken');

  // Fetch all notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!user || !accessToken) return;
    
    setLoading(true);
    try {
      const response = await api.get('/notifications');
      if (response.data?.notifications) {
        setNotifications(response.data.notifications);
      } else if (Array.isArray(response.data)) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [user, accessToken]);

  // Mark notification as read via API
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      // Still update locally even if API fails
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
      );
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      // Still update locally
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  }, []);

  // Initialize: fetch notifications and setup socket
  useEffect(() => {
    if (!user || !accessToken) return;

    // Fetch existing notifications
    fetchNotifications();

    // Setup socket connection for real-time notifications
    const envApiUrl = import.meta.env.VITE_API_URL;
    const socketUrl = envApiUrl?.replace('/api', '') || 'http://localhost:5000';

    const socket = io(`${socketUrl}/notifications`, {
      auth: { token: accessToken },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('✅ Connected to notifications socket');
    });

    socket.on('new_notification', (notification) => {
      console.log('📬 New notification received:', notification);
      setNotifications((prev) => [notification, ...prev]);
    });

    socket.on('disconnect', () => {
      console.warn('⚠️ Disconnected from notifications socket');
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Notification socket error:', err.message);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user, accessToken, fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Handle notification click - navigate to dashboard
  const handleNotificationClick = useCallback((notification, closeDropdown = true) => {
    // Mark as read
    if (!notification.isRead) {
      markAsRead(notification._id);
    }

    // Navigate to dashboard if available
    if (notification.dashboard) {
      const dashboardId = typeof notification.dashboard === 'object' 
        ? notification.dashboard._id 
        : notification.dashboard;
      
      console.log('Navigating to dashboard:', dashboardId);
      navigate(`/view-dashboard/${dashboardId}`);
    }

    if (closeDropdown) {
      setTimeout(() => setIsOpen(false), 150);
    }
  }, [navigate, markAsRead]);

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'COMMENT':
      case 'MENTION':
        return <MessageSquare className="h-4 w-4" style={{ color: theme.primaryColor }} />;
      case 'DASHBOARD_CREATED':
      case 'DASHBOARD_ASSIGNED':
        return <DashboardIcon className="h-4 w-4" style={{ color: theme.secondaryColor }} />;
      case 'ACCESS_GRANTED':
        return <UserPlus className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Update dropdown position
  const updatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 350;
      const bottomSpace = window.innerHeight - rect.bottom;
      const top = bottomSpace < dropdownHeight 
        ? rect.top - dropdownHeight - 8 
        : rect.bottom + 8;

      setDropdownPosition({ 
        top, 
        right: window.innerWidth - rect.right 
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  // Click outside closes dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdown = document.getElementById('notification-dropdown');
      if (
        buttonRef.current && 
        !buttonRef.current.contains(e.target) &&
        dropdown && 
        !dropdown.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Dropdown content component
  const DropdownContent = () => (
    <div
      id="notification-dropdown"
      className="fixed w-80"
      style={{ 
        top: `${dropdownPosition.top}px`, 
        right: `${dropdownPosition.right}px`, 
        zIndex: 9999 
      }}
    >
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Header */}
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" style={{ color: theme.primaryColor }} />
              <h3 className="text-sm font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="px-1.5 py-0.5 text-xs" style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead} 
                  className="h-6 px-2"
                  title="Mark all as read"
                >
                  <CheckCheck className="h-3 w-3" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)} 
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <p className="text-xs">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="text-xs">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.isRead ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm leading-tight ${
                          !notification.isRead ? 'font-medium text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                        {!notification.isRead && (
                          <div className="h-2 w-2 rounded-full flex-shrink-0 ml-2 mt-1" style={{ backgroundColor: theme.primaryColor }} />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(notification.createdAt)}
                      </p>
                      {notification.dashboard && (
                        <p className="text-xs mt-1 hover:underline" style={{ color: theme.primaryColor }}>
                          Click to view dashboard
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - View All */}
          {notifications.length > 0 && (
            <div className="px-3 py-2 border-t border-gray-100 text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-600 h-6"
                onClick={() => {
                  // Could navigate to a full notifications page if needed
                  setIsOpen(false);
                }}
              >
                {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  if (!user) return null;

  return (
    <>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        className="relative p-2 h-auto"
        onClick={() => {
          if (!isOpen) updatePosition();
          setIsOpen(!isOpen);
        }}
      >
        <Bell className="h-5 w-5 text-gray-600" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && createPortal(<DropdownContent />, document.body)}
    </>
  );
}
