/**
 * Notification System Context and Hook
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock notifications for demonstration
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Project Inquiry',
    message: 'Zulkifli Hassan submitted a new RFQ for flange facing service',
    type: 'info',
    timestamp: '2026-02-17T10:30:00Z',
    read: false,
    actionUrl: '/inquiries',
    actionLabel: 'View Inquiry'
  },
  {
    id: '2',
    title: 'Project Completed',
    message: 'Welding project for Petronas Carigali has been completed successfully',
    type: 'success',
    timestamp: '2026-02-17T09:15:00Z',
    read: false,
    actionUrl: '/projects',
    actionLabel: 'View Project'
  },
  {
    id: '3',
    title: 'Training Reminder',
    message: 'Welding certification training starts tomorrow at 9:00 AM',
    type: 'warning',
    timestamp: '2026-02-16T16:45:00Z',
    read: true,
    actionUrl: '/training',
    actionLabel: 'View Training'
  },
  {
    id: '4',
    title: 'New Job Application',
    message: 'Ahmad Rahman applied for Senior Welding Engineer position',
    type: 'info',
    timestamp: '2026-02-16T14:20:00Z',
    read: false,
    actionUrl: '/career',
    actionLabel: 'View Application'
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'Scheduled maintenance completed successfully. All systems operational.',
    type: 'success',
    timestamp: '2026-02-16T02:00:00Z',
    read: true
  }
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}