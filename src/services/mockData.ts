import {
  User,
  Project,
  Client,
  ChatMessage,
  JobPosting,
  JobApplication,
  TrainingProgram,
  NewsItem,
  Inquiry,
  UserRole,
  Service,
  AccessLog,
  Role,
  Permission,
  SYSTEM_MODULES
} from "@/lib/index";

/**
 * Mock Data Service for RWNA Engineering CMS
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Ahmad Razali",
    email: "ahmad.razali@rwna.com.my",
    role: UserRole.SUPER_ADMIN,
    status: "active",
    lastLogin: "2026-02-13T14:30:00Z",
  },
  {
    id: "u2",
    name: "Sarah Tan",
    email: "s.tan@rwna.com.my",
    role: UserRole.CONTENT_MANAGER,
    status: "active",
    lastLogin: "2026-02-14T08:15:00Z",
  },
  {
    id: "u3",
    name: "Kumar Subramaniam",
    email: "kumar.s@rwna.com.my",
    role: UserRole.SUPPORT_STAFF,
    status: "active",
    lastLogin: "2026-02-14T09:00:00Z",
  },
];

// Helper function to create permissions for a module
const createPermissions = (actions: ('create' | 'read' | 'update' | 'delete')[], granted: boolean = true): Record<string, Permission[]> => {
  const permissions: Record<string, Permission[]> = {};
  
  SYSTEM_MODULES.forEach(module => {
    permissions[module.id] = module.actions.map(action => ({
      action: action as 'create' | 'read' | 'update' | 'delete',
      granted: actions.includes(action as any) && granted
    }));
  });
  
  return permissions;
};

export const mockRoles: Role[] = [
  {
    id: "r1",
    name: "Super Administrator",
    description: "Full system access with all permissions",
    permissions: createPermissions(['create', 'read', 'update', 'delete']),
    isSystem: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "r2",
    name: "Content Manager",
    description: "Manage content and moderate user interactions",
    permissions: (() => {
      const perms = createPermissions(['read']);
      // Grant full access to content modules
      ['projects', 'clients', 'services', 'career', 'training', 'news', 'inquiries', 'chat', 'files'].forEach(module => {
        perms[module] = [{ action: 'create', granted: true }, { action: 'read', granted: true }, { action: 'update', granted: true }, { action: 'delete', granted: true }];
      });
      // Grant read access to users but no role management
      perms['users'] = [{ action: 'create', granted: false }, { action: 'read', granted: true }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      perms['roles'] = [{ action: 'create', granted: false }, { action: 'read', granted: false }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      perms['access_logs'] = [{ action: 'read', granted: false }];
      return perms;
    })(),
    isSystem: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "r3",
    name: "Support Staff",
    description: "Handle customer inquiries and provide support",
    permissions: (() => {
      const perms = createPermissions(['read']);
      // Grant access to support-related modules
      ['inquiries', 'chat'].forEach(module => {
        perms[module] = [{ action: 'create', granted: true }, { action: 'read', granted: true }, { action: 'update', granted: true }, { action: 'delete', granted: false }];
      });
      // Read-only access to content
      ['projects', 'clients', 'services', 'career', 'training', 'news'].forEach(module => {
        perms[module] = [{ action: 'create', granted: false }, { action: 'read', granted: true }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      });
      // No access to user/role management
      perms['users'] = [{ action: 'create', granted: false }, { action: 'read', granted: false }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      perms['roles'] = [{ action: 'create', granted: false }, { action: 'read', granted: false }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      perms['access_logs'] = [{ action: 'read', granted: false }];
      return perms;
    })(),
    isSystem: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "r4",
    name: "Editor",
    description: "Create and edit content with limited permissions",
    permissions: (() => {
      const perms = createPermissions(['read']);
      // Grant create/update access to content modules (no delete)
      ['projects', 'clients', 'services', 'career', 'training', 'news'].forEach(module => {
        perms[module] = [{ action: 'create', granted: true }, { action: 'read', granted: true }, { action: 'update', granted: true }, { action: 'delete', granted: false }];
      });
      // Read-only access to inquiries and chat
      ['inquiries', 'chat'].forEach(module => {
        perms[module] = [{ action: 'create', granted: false }, { action: 'read', granted: true }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      });
      // No access to user/role management
      perms['users'] = [{ action: 'create', granted: false }, { action: 'read', granted: false }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      perms['roles'] = [{ action: 'create', granted: false }, { action: 'read', granted: false }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      perms['access_logs'] = [{ action: 'read', granted: false }];
      return perms;
    })(),
    isSystem: false,
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-02-01T00:00:00Z"
  },
  {
    id: "r5",
    name: "Viewer",
    description: "Read-only access to most content",
    permissions: (() => {
      const perms = createPermissions(['read']);
      // Read-only access to content modules
      ['projects', 'clients', 'services', 'career', 'training', 'news', 'inquiries'].forEach(module => {
        perms[module] = [{ action: 'create', granted: false }, { action: 'read', granted: true }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      });
      // No access to chat, user/role management
      ['chat', 'users', 'roles', 'access_logs'].forEach(module => {
        perms[module] = [{ action: 'create', granted: false }, { action: 'read', granted: false }, { action: 'update', granted: false }, { action: 'delete', granted: false }];
      });
      return perms;
    })(),
    isSystem: false,
    createdAt: "2026-02-10T00:00:00Z",
    updatedAt: "2026-02-10T00:00:00Z"
  }
];

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "PETRONAS Carigali",
    industry: "Oil & Gas Exploration",
    logoKey: "CLIENT_1",
    contactPerson: "Ibrahim Musa",
    position: "Senior Project Manager",
    email: "ibrahim.musa@petronas.com",
    website: "https://www.petronas.com",
    projectCount: 42,
  },
  {
    id: "c2",
    name: "Shell Malaysia",
    industry: "Energy",
    logoKey: "CLIENT_2",
    contactPerson: "Elena Gilbert",
    position: "Operations Director",
    email: "elena.g@shell.com",
    website: "https://www.shell.com.my",
    projectCount: 18,
  },
  {
    id: "c3",
    name: "ExxonMobil",
    industry: "Oil & Gas",
    logoKey: "CLIENT_3",
    contactPerson: "Robert Chen",
    position: "Engineering Manager",
    email: "robert.chen@exxonmobil.com",
    projectCount: 12,
  },
  {
    id: "c4",
    name: "Sapura Energy",
    industry: "Offshore Engineering",
    logoKey: "CLIENT_4",
    contactPerson: "Fauzi Yusof",
    position: "Technical Lead",
    email: "fauzi.y@sapuraenergy.com",
    projectCount: 25,
  },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    title: "Kimanis Pipeline Cold Cutting",
    description: "High-precision on-site machining and cold cutting for the Kimanis terminal expansion project.",
    location: "Sabah, Malaysia",
    client: "PETRONAS Carigali",
    category: "Onshore",
    status: "completed",
    imageKey: "PROJECT_1",
    startDate: "2025-06-01",
    completionDate: "2025-12-15",
  },
  {
    id: "p2",
    title: "Subsea Diamond Wire Saw Cutting",
    description: "Decommissioning services using specialized subsea diamond wire saw for jacket leg removal.",
    location: "Terengganu Offshore",
    client: "Shell Malaysia",
    category: "Subsea",
    status: "ongoing",
    imageKey: "PROJECT_2",
    startDate: "2026-01-10",
  },
  {
    id: "p3",
    title: "FPSO Flange Facing Works",
    description: "Critical flange facing and bolt tensioning services during the scheduled FPSO maintenance turnaround.",
    location: "Sarawak Offshore",
    client: "Sapura Energy",
    category: "Offshore",
    status: "ongoing",
    imageKey: "PROJECT_3",
    startDate: "2026-02-01",
  },
  {
    id: "p4",
    title: "W3P Habitat Deployment",
    description: "Installation of SIRIM-certified welding habitats for offshore structural reinforcement.",
    location: "Labuan FT",
    client: "ExxonMobil",
    category: "Fabrication",
    status: "planned",
    imageKey: "PROJECT_4",
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: "m1",
    conversationId: "conv1",
    senderId: "visitor_882",
    senderName: "Visitor 882",
    message: "Hello, I am interested in your W3P Enclosure system for an upcoming project.",
    timestamp: "2026-02-14T09:45:00Z",
    isStaff: false,
    status: "read",
  },
  {
    id: "m2",
    conversationId: "conv1",
    senderId: "u3",
    senderName: "Kumar Subramaniam",
    message: "Welcome to RWNA! I can help you with that. Are you looking for a rental or a full service package?",
    timestamp: "2026-02-14T09:47:00Z",
    isStaff: true,
    status: "delivered",
  },
  {
    id: "m3",
    conversationId: "conv2",
    senderId: "visitor_910",
    senderName: "Visitor 910",
    message: "Do you provide on-site machining services in East Malaysia?",
    timestamp: "2026-02-14T10:15:00Z",
    isStaff: false,
    status: "sent",
  },
];

export const mockJobPostings: JobPosting[] = [
  {
    id: "j1",
    title: "Senior Site Engineer (Machining)",
    department: "Operations",
    location: "Gebeng, Kuantan",
    type: "Full-time",
    description: "Oversee complex on-site machining projects and ensure technical compliance with ASME standards.",
    requirements: ["Bachelor in Mechanical Engineering", "5+ years experience in O&G", "Willing to travel offshore"],
    status: "open",
    postedAt: "2026-01-20",
    applicationCount: 15,
  },
  {
    id: "j2",
    title: "CNC Machinist",
    department: "Innovation & Production",
    location: "Kuantan",
    type: "Full-time",
    description: "Operate high-precision CNC lathes and milling machines for custom tool fabrication.",
    requirements: ["Technical Certificate in Machining", "Experience with Mastercam", "Ability to read technical drawings"],
    status: "open",
    postedAt: "2026-02-05",
    applicationCount: 8,
  },
  {
    id: "j3",
    title: "HSE Officer",
    department: "Safety",
    location: "Miri, Sarawak",
    type: "Contract",
    description: "Ensure zero-LTI operations during offshore subsea cutting projects.",
    requirements: ["DOSH Green Book Holder", "BOSIET certification", "Strong knowledge of ISO 45001"],
    status: "draft",
    postedAt: "2026-02-10",
    applicationCount: 0,
  },
];

export const mockJobApplications: JobApplication[] = [
  // Applications for j1 - Senior Site Engineer
  {
    id: "app1",
    jobId: "j1",
    name: "Ahmad Rahman",
    phone: "+60123456789",
    email: "ahmad.rahman@email.com",
    resumeUrl: "/resumes/ahmad_rahman_resume.pdf",
    appliedAt: "2026-01-22",
    status: "new",
  },
  {
    id: "app2",
    jobId: "j1",
    name: "Sarah Lim",
    phone: "+60198765432",
    email: "sarah.lim@email.com",
    resumeUrl: "/resumes/sarah_lim_resume.pdf",
    appliedAt: "2026-01-25",
    status: "reviewed",
  },
  {
    id: "app3",
    jobId: "j1",
    name: "Muhammad Faiz",
    phone: "+60187654321",
    email: "m.faiz@email.com",
    resumeUrl: "/resumes/muhammad_faiz_resume.pdf",
    appliedAt: "2026-01-28",
    status: "shortlisted",
  },
  // Applications for j2 - CNC Machinist
  {
    id: "app4",
    jobId: "j2",
    name: "Raj Kumar",
    phone: "+60176543210",
    email: "raj.kumar@email.com",
    resumeUrl: "/resumes/raj_kumar_resume.pdf",
    appliedAt: "2026-02-07",
    status: "new",
  },
  {
    id: "app5",
    jobId: "j2",
    name: "Nurul Aina",
    phone: "+60165432109",
    email: "nurul.aina@email.com",
    resumeUrl: "/resumes/nurul_aina_resume.pdf",
    appliedAt: "2026-02-09",
    status: "reviewed",
  },
];

export const mockTrainingPrograms: TrainingProgram[] = [
  {
    id: "t1",
    title: "Advanced On-Site Cold Cutting",
    code: "RWNA-TR-001",
    duration: "5 Days",
    description: "Intensive training on hydraulic split-frame operation and safety protocols.",
    prerequisites: ["Basic Mechanical Knowledge", "Safety Induction"],
    status: "active",
    capacity: 12,
    enrolled: 10,
  },
  {
    id: "t2",
    title: "Subsea Diamond Wire Saw Operation",
    code: "RWNA-TR-005",
    duration: "3 Days",
    description: "Specialized training for ROV pilots and subsea technicians on cutting tool deployment.",
    prerequisites: ["Offshore Experience", "Technical Aptitude"],
    status: "scheduled",
    capacity: 8,
    enrolled: 4,
  },
];

export const mockNews: NewsItem[] = [
  {
    id: "n1",
    title: "RWNA Achieves 2.5 Million LTI-Free Hours",
    summary: "A significant milestone in our commitment to safety excellence across all operations.",
    content: "We are proud to announce that RWNA Engineering has officially surpassed 2.5 million Man-Hours without a Lost Time Incident...",
    category: "Achievement",
    author: "Sarah Tan",
    publishedAt: "2026-01-15",
    imageKey: "NEWS_1",
    isFeatured: true,
    status: "published",
  },
  {
    id: "n2",
    title: "New Innovation Centre Opens in Gebeng",
    summary: "Expansion of our R&D and precision machining capabilities with the new 20,000 sq ft facility.",
    content: "The new Innovation & Production Centre (IPC) features state-of-the-art CNC machinery and a dedicated R&D wing...",
    category: "Company",
    author: "Ahmad Razali",
    publishedAt: "2026-02-10",
    imageKey: "NEWS_2",
    isFeatured: false,
    status: "published",
  },
];

export const mockInquiries: Inquiry[] = [
  {
    id: "inq1",
    name: "Zulkifli Hassan",
    email: "zulkifli.h@technip.com",
    company: "TechnipFMC",
    subject: "RFQ for Flange Facing Service",
    message: "Requesting a quote for 24-inch flange facing on 15 offshore joints in Bintulu field.",
    status: "new",
    receivedAt: "2026-02-13T16:20:00Z",
  },
  {
    id: "inq2",
    name: "Lucy Wong",
    email: "lucy.wong@jgc.com",
    company: "JGC Malaysia",
    subject: "Training Program Query",
    message: "Are your cold cutting training programs HRDF claimable?",
    status: "in-progress",
    receivedAt: "2026-02-14T08:45:00Z",
    assignedTo: "u3",
  },
];

// API Mock Services

export const projectsAPI = {
  getAll: async () => [...mockProjects],
  getById: async (id: string) => mockProjects.find((p) => p.id === id),
  update: async (id: string, data: Partial<Project>) => {
    console.log(`Updating project ${id}`, data);
    return true;
  },
  delete: async (id: string) => {
    console.log(`Deleting project ${id}`);
    return true;
  },
};

export const clientsAPI = {
  getAll: async () => [...mockClients],
  getById: async (id: string) => mockClients.find((c) => c.id === id),
};

export const usersAPI = {
  getAll: async () => [...mockUsers],
  getCurrentUser: async () => mockUsers[0],
};

export const chatAPI = {
  getMessages: async (convId?: string) => {
    if (convId) return mockChatMessages.filter(m => m.conversationId === convId);
    return [...mockChatMessages];
  },
  sendMessage: async (msg: Partial<ChatMessage>) => {
    console.log("Sending message via socket mock", msg);
    return true;
  }
};

export const mockAccessLogs: AccessLog[] = [
  {
    id: "log1",
    userId: "u1",
    userName: "Ahmad Razali",
    action: "login",
    resource: "system",
    timestamp: "2026-02-14T08:00:00Z",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    success: true,
    details: "Successful login"
  },
  {
    id: "log2",
    userId: "u2",
    userName: "Sarah Tan",
    action: "create",
    resource: "projects",
    timestamp: "2026-02-14T09:15:00Z",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    success: true,
    details: "Created new project: Subsea Pipeline Cutting"
  },
  {
    id: "log3",
    userId: "u3",
    userName: "Kumar Subramaniam",
    action: "update",
    resource: "inquiries",
    timestamp: "2026-02-14T10:30:00Z",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    success: true,
    details: "Updated inquiry status to resolved"
  },
  {
    id: "log4",
    userId: "u2",
    userName: "Sarah Tan",
    action: "delete",
    resource: "news",
    timestamp: "2026-02-14T11:45:00Z",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    success: false,
    details: "Access denied: Insufficient permissions"
  },
  {
    id: "log5",
    userId: "u1",
    userName: "Ahmad Razali",
    action: "update",
    resource: "users",
    timestamp: "2026-02-14T12:00:00Z",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    success: true,
    details: "Updated user role for Kumar Subramaniam"
  }
];

// Access Logs API
export const accessLogsAPI = {
  getAll: async () => {
    return [...mockAccessLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },
  getByUser: async (userId: string) => {
    return mockAccessLogs.filter(log => log.userId === userId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },
  log: async (logEntry: Omit<AccessLog, 'id' | 'timestamp'>) => {
    const newLog: AccessLog = {
      ...logEntry,
      id: `log${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    mockAccessLogs.unshift(newLog);
    return newLog;
  }
};

// Roles API
export const rolesAPI = {
  getAll: async (): Promise<Role[]> => {
    return [...mockRoles];
  },
  getById: async (id: string): Promise<Role | null> => {
    return mockRoles.find(role => role.id === id) || null;
  },
  create: async (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> => {
    const newRole: Role = {
      ...roleData,
      id: `r${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockRoles.push(newRole);
    return newRole;
  },
  update: async (id: string, updates: Partial<Omit<Role, 'id' | 'createdAt'>>): Promise<Role | null> => {
    const index = mockRoles.findIndex(role => role.id === id);
    if (index === -1) return null;
    
    mockRoles[index] = {
      ...mockRoles[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockRoles[index];
  },
  delete: async (id: string): Promise<boolean> => {
    const index = mockRoles.findIndex(role => role.id === id);
    if (index === -1) {
      throw new Error('Role not found');
    }
    
    if (mockRoles[index].isSystem) {
      throw new Error('Cannot delete system roles');
    }
    
    // Check if any users are assigned to this role
    const roleMap = { 'r1': 'SUPER_ADMIN', 'r2': 'CONTENT_MANAGER', 'r3': 'SUPPORT_STAFF' };
    const userRole = roleMap[id as keyof typeof roleMap];
    if (userRole) {
      const assignedUsers = mockUsers.filter(user => user.role === userRole).length;
      if (assignedUsers > 0) {
        throw new Error(`Cannot delete role. ${assignedUsers} user${assignedUsers > 1 ? 's are' : ' is'} currently assigned to this role.`);
      }
    }
    
    mockRoles.splice(index, 1);
    return true;
  }
};