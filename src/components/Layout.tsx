import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users2,
  Settings2,
  UserPlus,
  GraduationCap,
  Newspaper,
  MessageSquare,
  MessageCircle,
  ShieldCheck,
  Shield,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  LogOut,
  User,
  Activity,
  Database,
  FolderOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTE_PATHS, UserRole } from "@/lib/index";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle, 
  SheetHeader 
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard },
  { label: "Projects", path: ROUTE_PATHS.PROJECTS, icon: Briefcase },
  { label: "Clients", path: ROUTE_PATHS.CLIENTS, icon: Users2 },
  { label: "Services", path: ROUTE_PATHS.SERVICES, icon: Settings2 },
  { label: "Career", path: ROUTE_PATHS.CAREER, icon: UserPlus },
  { label: "Training", path: ROUTE_PATHS.TRAINING, icon: GraduationCap },
  { label: "News", path: ROUTE_PATHS.NEWS, icon: Newspaper },
  { label: "Inquiries", path: ROUTE_PATHS.INQUIRIES, icon: MessageSquare },
  { label: "Live Chat", path: ROUTE_PATHS.CHAT, icon: MessageCircle },
  { label: "File Manager", path: ROUTE_PATHS.FILE_MANAGER, icon: FolderOpen },
  { label: "User Management", path: ROUTE_PATHS.USERS, icon: ShieldCheck },
  { label: "API Demo", path: ROUTE_PATHS.API_DEMO, icon: Database },
];

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { currentUser, hasPermission } = useUser();

  // Filter navigation items based on user permissions
  const getVisibleNavItems = () => {
    return NAV_ITEMS.filter(item => {
      // Dashboard and File Manager are always visible
      if (item.path === ROUTE_PATHS.DASHBOARD || item.path === ROUTE_PATHS.FILE_MANAGER) return true;
      
      // Map routes to resources for permission checking
      const routeResourceMap: Record<string, string> = {
        [ROUTE_PATHS.PROJECTS]: 'projects',
        [ROUTE_PATHS.CLIENTS]: 'clients',
        [ROUTE_PATHS.SERVICES]: 'services',
        [ROUTE_PATHS.CAREER]: 'career',
        [ROUTE_PATHS.TRAINING]: 'training',
        [ROUTE_PATHS.NEWS]: 'news',
        [ROUTE_PATHS.INQUIRIES]: 'inquiries',
        [ROUTE_PATHS.CHAT]: 'chat',
        [ROUTE_PATHS.FILE_MANAGER]: 'files',
        [ROUTE_PATHS.USERS]: 'users',
        [ROUTE_PATHS.API_DEMO]: 'api',
      };
      
      const resource = routeResourceMap[item.path];
      return resource ? hasPermission(resource, 'read') : true;
    });
  };

  const visibleNavItems = getVisibleNavItems();

  // Add Admin-only items for Super Admins
  const adminNavItems = currentUser?.role === UserRole.SUPER_ADMIN 
    ? [
        ...visibleNavItems, 
        { label: "Role Management", path: ROUTE_PATHS.ROLES, icon: Shield },
        { label: "Access Logs", path: "/access-logs", icon: Activity }
      ]
    : visibleNavItems;

  const currentNavItem = NAV_ITEMS.find((item) => item.path === location.pathname) || {
    label: "Admin Portal",
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-sidebar transition-all duration-300 lg:block",
          !isSidebarOpen && "w-20"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-6">
            <Link to={ROUTE_PATHS.DASHBOARD} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Briefcase className="h-5 w-5" />
              </div>
              {isSidebarOpen && (
                <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                  RWNA <span className="text-sidebar-primary">CMS</span>
                </span>
              )}
            </Link>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-sidebar-border">
                <AvatarImage src="" />
                <AvatarFallback className="bg-sidebar-primary/20 text-sidebar-primary text-xs font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-sidebar-foreground">Admin User</span>
                  <span className="text-xs text-sidebar-foreground/50">Super Admin</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          "lg:ml-64",
          !isSidebarOpen && "lg:ml-20"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Mobile Nav Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-0">
                <SheetHeader className="p-6 text-left">
                  <SheetTitle className="text-sidebar-foreground flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    RWNA CMS
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-4 space-y-1 px-4">
                  {adminNavItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        cn(
                          "flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-muted-foreground">CMS</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground">{currentNavItem.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search records..."
                className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-destructive"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {currentUser ? currentUser.name.split(' ').map(n => n[0]).join('') : 'AD'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser?.name || 'Administrator'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser?.email || 'admin@rwna.com.my'}
                    </p>
                    <p className="text-xs leading-none text-primary font-medium">
                      {currentUser?.role.replace('_', ' ') || 'Admin'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-x-hidden">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 py-4 px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2026 RWNA Engineering Sdn. Bhd. CMS v1.0.0 | Powered by{' '}
              <a 
                href="https://codestudio.my" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Code Studio
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Support</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span className="text-muted-foreground/40">|</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                System Online
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
