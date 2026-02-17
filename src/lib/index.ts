/**
 * Core types, constants, and utilities for the RWNA CMS
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

export const ROUTE_PATHS = {
  DASHBOARD: "/",
  LOGIN: "/login",
  PROJECTS: "/projects",
  CLIENTS: "/clients",
  SERVICES: "/services",
  CAREER: "/career",
  TRAINING: "/training",
  NEWS: "/news",
  INQUIRIES: "/inquiries",
  CHAT: "/chat",
  USERS: "/users",
  ROLES: "/roles",
  API_DEMO: "/api-demo",
  FILE_MANAGER: "/files",
  TRASH: "/trash",
  REPORTS: "/reports",
  PROFILE_SETTINGS: "/profile-settings",
  COMPANY_SETTINGS: "/company-settings",
} as const;

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  CONTENT_MANAGER = "CONTENT_MANAGER",
  SUPPORT_STAFF = "SUPPORT_STAFF",
}

export enum PermissionLevel {
  READ = "READ",
  WRITE = "WRITE",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
  status: "active" | "inactive";
  // Trash system properties
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  updatedAt?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, Permission[]>;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  // Trash system properties
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

export interface Permission {
  action: 'create' | 'read' | 'update' | 'delete';
  granted: boolean;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  client: string;
  category: "Offshore" | "Onshore" | "Subsea" | "Fabrication";
  status: "completed" | "ongoing" | "planned";
  imageKey: string;
  startDate?: string;
  completionDate?: string;
  // Trash system properties
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  updatedAt?: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  logoKey: string;
  contactPerson: string;
  position: string;
  email: string;
  website?: string;
  projectCount: number;
  // Trash system properties
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isStaff: boolean;
  status: "sent" | "delivered" | "read";
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  description: string;
  requirements: string[];
  status: "open" | "closed" | "draft";
  postedAt: string;
  applicationCount: number;
  // Trash system properties
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  updatedAt?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  name: string;
  phone: string;
  email: string;
  resumeUrl: string;
  appliedAt: string;
  status: "new" | "reviewed" | "shortlisted" | "hired" | "rejected";
}

export interface CareerResponseTemplate {
  id: string;
  type: "new" | "reviewed" | "shortlisted" | "hired" | "rejected";
  subject: string;
  content: string;
  isActive: boolean;
}

export interface CareerSettings {
  sendByEmail: boolean;
  sendByWhatsApp: boolean;
  autoResponseEnabled: boolean;
  responseTemplates: CareerResponseTemplate[];
}

export interface TrainingProgram {
  id: string;
  title: string;
  code: string;
  duration: string;
  description: string;
  prerequisites: string[];
  status: "active" | "scheduled" | "archived";
  capacity: number;
  enrolled: number;
  location?: string;
  instructor?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  closeApplicationDate?: string;
  trainingMapUrl?: string;
  // Trash system properties
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  updatedAt?: string;
}

export interface TrainingParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  enrolledCourses: {
    courseCode: string;
    programName: string;
    enrollmentDate: string;
    status: "enrolled" | "completed" | "dropped" | "pending";
    progress: number; // 0-100
    grade?: string;
    certificateIssued?: boolean;
  }[];
  totalCoursesCompleted: number;
  joinedDate: string;
  lastActivity: string;
  notes?: string;
}

export interface TrainingInquiry extends Inquiry {
  interestedPrograms: string[]; // program IDs
  preferredStartDate?: string;
  trainingBudget?: string;
  groupSize?: number;
  customRequirements?: string;
  inquiryStatus: "new" | "contacted" | "qualified" | "accepted" | "rejected" | "converted";
  assignedTo?: string;
  followUpDate?: string;
  responseEmailSent?: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: "inquiry_response" | "acceptance" | "rejection" | "course_notification" | "reminder" | "certificate";
  isActive: boolean;
  variables: string[]; // Available variables like {name}, {courseName}, etc.
  createdAt: string;
  updatedAt: string;
}

export interface TrainingSettings {
  id: string;
  autoResponseEnabled: boolean;
  defaultInquiryResponseTemplate: string;
  acceptanceEmailTemplate: string;
  rejectionEmailTemplate: string;
  courseNotificationTemplate: string;
  reminderEmailTemplate: string;
  certificateEmailTemplate: string;
  emailSignature: string;
  notificationSettings: {
    newInquiry: boolean;
    courseEnrollment: boolean;
    courseCompletion: boolean;
    upcomingDeadlines: boolean;
  };
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Company" | "Industry" | "Achievement" | "Event";
  author: string;
  publishedAt: string;
  imageKey: string;
  isFeatured: boolean;
  status: "published" | "draft" | "archived";
  // Trash system properties
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  updatedAt?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "resolved" | "spam";
  receivedAt: string;
  assignedTo?: string;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  details?: string;
}

// Legacy permission interface for backward compatibility
export interface LegacyPermission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export const ROLE_PERMISSIONS: Record<UserRole, LegacyPermission[]> = {
  [UserRole.SUPER_ADMIN]: [
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'roles', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'projects', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'clients', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'services', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'career', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'training', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'news', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'inquiries', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'chat', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'settings', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'files', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'reports', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'trash', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'api', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'access_logs', actions: ['read'] },
  ],
  [UserRole.CONTENT_MANAGER]: [
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'projects', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'clients', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'services', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'career', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'training', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'news', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'inquiries', actions: ['read', 'update'] },
    { resource: 'chat', actions: ['read', 'update'] },
    { resource: 'files', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'trash', actions: ['read', 'update'] },
  ],
  [UserRole.SUPPORT_STAFF]: [
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'projects', actions: ['read'] },
    { resource: 'clients', actions: ['read'] },
    { resource: 'career', actions: ['read'] },
    { resource: 'training', actions: ['read'] },
    { resource: 'news', actions: ['read'] },
    { resource: 'inquiries', actions: ['create', 'read', 'update'] },
    { resource: 'chat', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'files', actions: ['read'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'trash', actions: ['read'] },
  ],
};

export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  imageKey: string;
  iconName: string;
  category: string;
  isActive: boolean;
}

// System Modules for Permission Management
export const SYSTEM_MODULES: Module[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Access to main dashboard and analytics',
    actions: ['read']
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Manage project listings and details',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'clients',
    name: 'Clients',
    description: 'Manage client information and relationships',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Manage service offerings and descriptions',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'career',
    name: 'Career',
    description: 'Manage job postings and applications',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'training',
    name: 'Training',
    description: 'Manage training programs and registrations',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'news',
    name: 'News',
    description: 'Manage news articles and announcements',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'inquiries',
    name: 'Inquiries',
    description: 'Manage customer inquiries and responses',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'chat',
    name: 'Live Chat',
    description: 'Access to live chat system and conversations',
    actions: ['read', 'update']
  },
  {
    id: 'users',
    name: 'User Management',
    description: 'Manage user accounts and permissions',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'roles',
    name: 'Role Management',
    description: 'Manage user roles and permissions',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'files',
    name: 'File Manager',
    description: 'Manage files, images, and documents',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'access_logs',
    name: 'Access Logs',
    description: 'View system access logs and audit trails',
    actions: ['read']
  },
  {
    id: 'reports',
    name: 'Reports',
    description: 'Generate and view system reports and analytics',
    actions: ['create', 'read', 'update', 'delete']
  },
  {
    id: 'trash',
    name: 'Trash Management',
    description: 'Manage deleted items and restore functionality',
    actions: ['read', 'update', 'delete']
  },
  {
    id: 'api',
    name: 'API Demo',
    description: 'Access to API testing and demonstration tools',
    actions: ['read']
  },
  {
    id: 'settings',
    name: 'System Settings',
    description: 'Manage system configuration and company settings',
    actions: ['create', 'read', 'update', 'delete']
  }
];
