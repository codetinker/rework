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

// Real RWNA Engineering Clients - Complete Directory (165+ companies)
export const mockClients: Client[] = [
  // A
  {
    id: "aker-solutions",
    name: "AKER SOLUTIONS (M) SDN BHD",
    industry: "Subsea Technology",
    logoKey: "CLIENT_1",
    contactPerson: "Lars Andersen",
    position: "Regional Director",
    email: "lars.andersen@akersolutions.com",
    website: "https://www.akersolutions.com",
    projectCount: 6,
    isDeleted: false
  },
  {
    id: "anz-engineering",
    name: "ANZ ENGINEERING SDN BHD",
    industry: "Engineering Services",
    logoKey: "CLIENT_2",
    contactPerson: "Ahmad Nazri",
    position: "Managing Director",
    email: "ahmad.nazri@anzeng.com.my",
    website: "https://www.anzengineering.com.my",
    projectCount: 3,
    isDeleted: false
  },
  {
    id: "asturi-metal",
    name: "ASTURI METAL BUILDERS (M) SDN BHD",
    industry: "Metal Fabrication",
    logoKey: "CLIENT_3",
    contactPerson: "Ir. Asturi Rahman",
    position: "Technical Director",
    email: "asturi.rahman@asturimetal.com.my",
    website: "https://www.asturimetal.com.my",
    projectCount: 8,
    isDeleted: false
  },
  {
    id: "al-jaami",
    name: "AL-JAAMI ENG & DEV SDN BHD",
    industry: "Engineering & Development",
    logoKey: "CLIENT_4",
    contactPerson: "Jamal Al-Jaami",
    position: "Chief Executive Officer",
    email: "jamal@aljaami.com.my",
    website: "https://www.aljaami.com.my",
    projectCount: 4,
    isDeleted: false
  },
  {
    id: "amc",
    name: "AMALGAMATED METAL CORPORATION (M) SDN BHD (AMC)",
    industry: "Metal Processing",
    logoKey: "CLIENT_5",
    contactPerson: "David Lim",
    position: "Operations Manager",
    email: "david.lim@amc.com.my",
    website: "https://www.amc.com.my",
    projectCount: 12,
    isDeleted: false
  },
  {
    id: "alam-dingin",
    name: "ALAM DINGIN AIR CONDITIONING ENGINEERING",
    industry: "HVAC Engineering",
    logoKey: "CLIENT_6",
    contactPerson: "Mohd Alam",
    position: "Project Manager",
    email: "mohd.alam@alamdingin.com.my",
    website: "https://www.alamdingin.com.my",
    projectCount: 2,
    isDeleted: false
  },
  {
    id: "alam-swiber",
    name: "ALAM SWIBER OFFSHORE (M) SDN BHD",
    industry: "Offshore Services",
    logoKey: "CLIENT_7",
    contactPerson: "Captain Swiber Alam",
    position: "Marine Operations Director",
    email: "swiber.alam@alamswiber.com.my",
    website: "https://www.alamswiber.com.my",
    projectCount: 7,
    isDeleted: false
  },
  {
    id: "allied-marine",
    name: "ALLIED MARINE & EQUIPMENT SDN BHD",
    industry: "Marine Equipment",
    logoKey: "CLIENT_8",
    contactPerson: "Robert Allied",
    position: "General Manager",
    email: "robert.allied@alliedmarine.com.my",
    website: "https://www.alliedmarine.com.my",
    projectCount: 5,
    isDeleted: false
  },
  {
    id: "aans-technical",
    name: "AANS TECHNICAL & SERVICES SDN BHD",
    industry: "Technical Services",
    logoKey: "CLIENT_9",
    contactPerson: "Ahmad Aans",
    position: "Technical Director",
    email: "ahmad.aans@aanstechnical.com.my",
    website: "https://www.aanstechnical.com.my",
    projectCount: 6,
    isDeleted: false
  },
  {
    id: "altus-oil",
    name: "ALTUS OIL AND GAS SERVICES",
    industry: "Oil & Gas Services",
    logoKey: "CLIENT_10",
    contactPerson: "Michael Altus",
    position: "Service Manager",
    email: "michael.altus@altusoil.com",
    website: "https://www.altusoil.com",
    projectCount: 9,
    isDeleted: false
  },
  // B
  {
    id: "basf-petronas",
    name: "BASF PETRONAS CHEMICALS SDN BHD",
    industry: "Petrochemicals",
    logoKey: "CLIENT_11",
    contactPerson: "Dr. Hans Weber",
    position: "Plant Manager",
    email: "hans.weber@basf-petronas.com",
    website: "https://www.basf-petronas.com.my",
    projectCount: 15,
    isDeleted: false
  },
  {
    id: "barmada-mcdermott",
    name: "BARMADA MC DERMOTT",
    industry: "Offshore Construction",
    logoKey: "CLIENT_12",
    contactPerson: "Ahmad Barmada",
    position: "Operations Director",
    email: "ahmad.barmada@mcdermott.com",
    website: "https://www.mcdermott.com",
    projectCount: 11,
    isDeleted: false
  },
  {
    id: "bjs-offshore",
    name: "BJS OFFSHORE SDN BHD",
    industry: "Offshore Services",
    logoKey: "CLIENT_13",
    contactPerson: "Benny Tan",
    position: "Project Director",
    email: "benny.tan@bjsoffshore.com.my",
    website: "https://www.bjsoffshore.com.my",
    projectCount: 4,
    isDeleted: false
  },
  // E
  {
    id: "exxonmobil",
    name: "EXXONMOBIL EXPLORATION AND PRODUCTION",
    industry: "Oil & Gas Exploration",
    logoKey: "CLIENT_14",
    contactPerson: "James Mitchell",
    position: "Project Director",
    email: "james.mitchell@exxonmobil.com",
    website: "https://www.exxonmobil.com",
    projectCount: 18,
    isDeleted: false
  },
  // H
  {
    id: "hyundai",
    name: "HYUNDAI ENGINEERING CO. LTD.",
    industry: "Engineering & Construction",
    logoKey: "CLIENT_15",
    contactPerson: "Park Sung-ho",
    position: "Country Manager",
    email: "sungho.park@hec.co.kr",
    website: "https://www.hec.co.kr",
    projectCount: 8,
    isDeleted: false
  },
  // K
  {
    id: "kencana-hl",
    name: "KENCANA HL SDN BHD",
    industry: "Oil & Gas Services",
    logoKey: "CLIENT_16",
    contactPerson: "Tan Sri Mokhzani Mahathir",
    position: "Executive Chairman",
    email: "mokhzani@kencana.com.my",
    website: "https://www.kencana.com.my",
    projectCount: 22,
    isDeleted: false
  },
  // M
  {
    id: "mmhe",
    name: "MALAYSIA MARINE AND HEAVY ENGINEERING HOLDINGS BERHAD",
    industry: "Marine Engineering",
    logoKey: "CLIENT_17",
    contactPerson: "Ir. Lim Chee Kong",
    position: "Engineering Manager",
    email: "cheekong.lim@mmhe.com.my",
    website: "https://www.mmhe.com.my",
    projectCount: 16,
    isDeleted: false
  },
  // P
  {
    id: "petronas-carigali",
    name: "PETRONAS CARIGALI SDN BHD",
    industry: "Oil & Gas Exploration",
    logoKey: "CLIENT_18",
    contactPerson: "Datuk Ahmad Faizal",
    position: "Senior Operations Manager",
    email: "ahmad.faizal@petronas.com.my",
    website: "https://www.petronas.com",
    projectCount: 35,
    isDeleted: false
  },
  {
    id: "petrofac-malaysia",
    name: "PETROFAC MALAYSIA",
    industry: "Engineering Services",
    logoKey: "CLIENT_19",
    contactPerson: "David Thompson",
    position: "Country Manager",
    email: "david.thompson@petrofac.com",
    website: "https://www.petrofac.com",
    projectCount: 13,
    isDeleted: false
  },
  // S
  {
    id: "sapura-acergy",
    name: "SAPURA ACERGY SDN BHD",
    industry: "Offshore Services",
    logoKey: "CLIENT_20",
    contactPerson: "Captain Mohd Rashid",
    position: "Marine Operations Director",
    email: "rashid.mohd@sapuraenergy.com",
    website: "https://www.sapuraenergy.com",
    projectCount: 19,
    isDeleted: false
  },
  // T
  {
    id: "toyo-engineering",
    name: "TOYO ENGINEERING & CONSTRUCTION SDN BHD",
    industry: "Engineering & Construction",
    logoKey: "CLIENT_21",
    contactPerson: "Takeshi Yamamoto",
    position: "Project Manager",
    email: "takeshi.yamamoto@toyo-eng.com",
    website: "https://www.toyo-eng.com",
    projectCount: 7,
    isDeleted: false
  }
];

// Real RWNA Engineering Projects - Actual Project Portfolio
export const mockProjects: Project[] = [
  {
    id: "cold-cutting-72-pipe",
    title: "Cold Cutting 72\" OD Pipe",
    category: "Fabrication",
    status: "completed",
    description: "Cold cutting operations for large diameter pipe at RWNA Fabrication Yard.",
    location: "RWNA Fabrication Yard",
    client: "Internal Project",
    imageKey: "RWNA_PROJECTS_1",
    isDeleted: false
  },
  {
    id: "cutting-bevel-62-bfw",
    title: "Cutting & \"J\" Bevel of 62\" OD E-18-02A/B/C BFW Preheated",
    category: "Fabrication",
    status: "completed",
    description: "Precision cutting and bevelling operations for large diameter preheated pipes.",
    location: "Tepat Teknik Klang, Selangor, Malaysia",
    client: "Tapat Teknik Sdn Bhd, Petronas Fertilizer Kedah, Malaysia",
    imageKey: "RWNA_PROJECTS_2",
    isDeleted: false
  },
  {
    id: "gwf-1-cutting-16-cra",
    title: "GWF-1 Cutting of 16\" [CRA] OD Pipe",
    category: "Fabrication",
    status: "completed",
    description: "Specialized cutting operations for Corrosion Resistant Alloy (CRA) pipes.",
    location: "RWNA Fabrication Yard",
    client: "Bredero Shaw (M) Sdn Bhd / Woodside Energy Limited",
    imageKey: "RWNA_PROJECTS_3",
    isDeleted: false
  },
  {
    id: "yamal-europipe-gas",
    title: "Yamal Europipe Gas Cutting & \"J\" Bevel of 56\" OD Pipe",
    category: "Fabrication",
    status: "completed",
    description: "Large diameter pipe cutting and bevelling for international gas pipeline project.",
    location: "Malaysia",
    client: "Bredero Shaw (M) Sdn Bhd / Nippon Steel Japan",
    imageKey: "RWNA_PROJECTS_4",
    isDeleted: false
  },
  {
    id: "wheatstone-upstream",
    title: "Wheatstone Upstream External Pipe End Machining of 24\" OD Pipe",
    category: "Onshore",
    status: "completed",
    description: "External pipe end machining for upstream operations in major Australian gas project.",
    location: "Bredero Shaw Kuantan, Malaysia",
    client: "Bredero Shaw (M) Sdn Bhd / Chevron Australia PTL Ltd",
    imageKey: "RWNA_PROJECTS_5",
    isDeleted: false
  },
  {
    id: "gon-upstream-boring",
    title: "GON Upstream Internal Boring of 7.626\" & 9.626\" OD Pipe",
    category: "Onshore",
    status: "completed",
    description: "Internal boring operations for upstream pipeline infrastructure.",
    location: "Malaysia",
    client: "Coatings (M) Sdn Bhd / Chevron Australia Pty Ltd",
    imageKey: "RWNA_PROJECTS_6",
    isDeleted: false
  },
  {
    id: "gumusut-kakap-cutback",
    title: "Gumusut Kakap Cutback Configuration (Shaving)",
    category: "Subsea",
    status: "completed",
    description: "Specialized cutback configuration and shaving operations for subsea pipeline project.",
    location: "Serimax Yard Pelabuhan Kuantan, Malaysia",
    client: "Serimax Welding Services (M) Sdn Bhd / Sapura Kencana-Sapura Acergy / Sabah Shell Petroleum Company",
    imageKey: "RWNA_PROJECTS_7",
    isDeleted: false
  },
  {
    id: "flange-resurface-pedestal",
    title: "Flange Resurface Pedestal Crane Column of 110\" for Barge H131 & H132",
    category: "Offshore",
    status: "completed",
    description: "Large diameter flange resurfacing for pedestal crane columns on marine barges.",
    location: "Boustead Shipyard Pulau Jerejak, Penang, Malaysia",
    client: "Srimultex Engineering / Boustead Naval Shipyard / Pacific Singapore",
    imageKey: "RWNA_PROJECTS_8",
    isDeleted: false
  },
  {
    id: "w3p-enclosure-dulang",
    title: "W3P Enclosure System (Habitat for Welding)",
    category: "Offshore",
    status: "completed",
    description: "Deployment of W3P welding habitat system for safe hot work operations.",
    location: "Dulang Platform",
    client: "Tanjung Offshore Services Sdn. Bhd.",
    imageKey: "RWNA_PROJECTS_9",
    isDeleted: false
  },
  {
    id: "subsea-concrete-cutting",
    title: "Subsea Concrete Coated Linepipe Cutting at Bekok C",
    category: "Subsea",
    status: "completed",
    description: "Subsea cutting operations for concrete coated pipeline at offshore location.",
    location: "Bekok C Platform",
    client: "GOM / Petronas Carigali Sdn Bhd",
    imageKey: "RWNA_PROJECTS_10",
    isDeleted: false
  },
  {
    id: "fabrication-maintenance",
    title: "Fabrication & Maintenance (Onshore & Offshore)",
    category: "Offshore",
    status: "ongoing",
    description: "Comprehensive fabrication and maintenance services for onshore and offshore facilities.",
    location: "Various Locations",
    client: "Multiple Clients",
    imageKey: "RWNA_PROJECTS_11",
    isDeleted: false
  },
  {
    id: "valve-grinding-ytl",
    title: "Onsite Valve Grinding & Lapping for 10\" X 2500# Gate Valve",
    category: "Onshore",
    status: "completed",
    description: "On-site valve grinding and lapping services for high-pressure gate valve.",
    location: "YTL Power Station",
    client: "YTL Power Station",
    imageKey: "RWNA_PROJECTS_12",
    isDeleted: false
  },
  {
    id: "valve-grinding-cufk",
    title: "Onsite Valve Grinding and Lapping Services for Various Size of Valve for CUFK TA 2017",
    category: "Onshore",
    status: "completed",
    description: "Comprehensive valve grinding and lapping services during turnaround operations.",
    location: "CUFK Facility",
    client: "Enproserve (M) Sdn. Bhd.",
    imageKey: "RWNA_PROJECTS_13",
    isDeleted: false
  },
  {
    id: "valve-grinding-24-gate",
    title: "Onsite Valve Grinding and Lapping Services for 24\" X 150# Gate Valve",
    category: "Onshore",
    status: "completed",
    description: "Large diameter gate valve grinding and lapping services.",
    location: "Tati Production Facility",
    client: "Tati Production Sdn. Bhd.",
    imageKey: "RWNA_PROJECTS_14",
    isDeleted: false
  },
  {
    id: "valve-grinding-pcasb",
    title: "Onsite Valve Grinding and Lapping Services for Various Size of Valve for PCASB TA 2017",
    category: "Onshore",
    status: "completed",
    description: "Multi-size valve grinding and lapping services during planned turnaround.",
    location: "PCASB Facility",
    client: "Enproserve (M) Sdn. Bhd.",
    imageKey: "RWNA_PROJECTS_15",
    isDeleted: false
  }
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
    receivedAt: "2026-02-13T16:20:00Z"
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
    assignedTo: "u3"
  }
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