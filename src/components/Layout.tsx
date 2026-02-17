import React, { useState, useMemo } from "react";
import { NotificationDropdown } from "@/components/NotificationDropdown";
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
  ChevronRight,
  LogOut,
  FileText,
  User,
  Activity,
  Database,
  FolderOpen,
  Trash2,
  Building2,
  Sun,
  Moon,
  Phone,
  Mail,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTE_PATHS, UserRole } from "@/lib/index";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  { label: "Reports", path: ROUTE_PATHS.REPORTS, icon: FileText },
  { label: "Trash", path: ROUTE_PATHS.TRASH, icon: Trash2 },
  { label: "User Management", path: ROUTE_PATHS.USERS, icon: ShieldCheck },
  { label: "API Demo", path: ROUTE_PATHS.API_DEMO, icon: Database },
];

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const location = useLocation();
  const { currentUser, hasPermission } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  // Get trash count from actual deleted items across all modules
  const getTrashCount = () => {
    // Count actual deleted items from all modules
    // In a real app, this would aggregate from all module APIs
    
    // Mock trash items count (matching the actual items in Trash.tsx)
    const trashItems = [
      { type: "service" },
      { type: "news" },
      { type: "career" },
      { type: "training" },
      { type: "client" }
      // No project items - so project count is 0
    ];
    
    return trashItems.length; // Returns 5 (actual count)
  };
  
  const trashCount = getTrashCount();

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supportForm.name || !supportForm.email || !supportForm.subject || !supportForm.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Simulate form submission
    try {
      // In a real app, this would send to your support system
      console.log('Support form submitted:', supportForm);
      toast.success('Support request submitted successfully! We will get back to you soon.');
      
      // Reset form
      setSupportForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSupportDialogOpen(false);
    } catch (error) {
      toast.error('Failed to submit support request. Please try again.');
    }
  };

  // Filter navigation items based on user permissions
  const adminNavItems = useMemo(() => {
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
      [ROUTE_PATHS.REPORTS]: 'reports',
      [ROUTE_PATHS.TRASH]: 'trash',
    };

    const visibleNavItems = NAV_ITEMS.filter(item => {
      // Dashboard and File Manager are always visible
      if (item.path === ROUTE_PATHS.DASHBOARD || item.path === ROUTE_PATHS.FILE_MANAGER) return true;
      
      const resource = routeResourceMap[item.path];
      return resource ? hasPermission(resource, 'read') : true;
    });

    // Add Admin-only items for Super Admins
    return currentUser?.role === UserRole.SUPER_ADMIN 
      ? [
          ...visibleNavItems, 
          { label: "Settings", path: ROUTE_PATHS.COMPANY_SETTINGS, icon: Building2 },
          { label: "Role Management", path: ROUTE_PATHS.ROLES, icon: Shield },
          { label: "Access Logs", path: "/access-logs", icon: Activity }
        ]
      : visibleNavItems;
  }, [currentUser, hasPermission]);

  const currentNavItem = NAV_ITEMS.find((item) => item.path === location.pathname) || {
    label: "Admin Portal",
  };

  return (
    <>
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
                {isSidebarOpen && (
                  <div className="flex items-center justify-between flex-1">
                    <span>{item.label}</span>
                    {item.path === ROUTE_PATHS.TRASH && trashCount > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 px-2 text-xs">
                        {trashCount}
                      </Badge>
                    )}
                  </div>
                )}
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
                      <div className="flex items-center justify-between flex-1">
                        <span>{item.label}</span>
                        {item.path === ROUTE_PATHS.TRASH && trashCount > 0 && (
                          <Badge variant="destructive" className="ml-2 h-5 px-2 text-xs">
                            {trashCount}
                          </Badge>
                        )}
                      </div>
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
            <NotificationDropdown />

            {/* Theme Switcher */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'AD'}
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
                      {currentUser?.role?.replace('_', ' ') || 'Admin'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={ROUTE_PATHS.PROFILE_SETTINGS}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
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
              © 2026 RWNA Engineering Sdn. Bhd. | Powered by{' '}
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
              <button 
                onClick={() => setIsSupportDialogOpen(true)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Support
              </button>

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

    {/* Support Dialog */}
    <Dialog open={isSupportDialogOpen} onOpenChange={setIsSupportDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Code Studio Support</DialogTitle>
          <DialogDescription>
            Need help? Contact our support team or submit a support request.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <a href="tel:+60182652081" className="text-sm text-muted-foreground hover:text-primary">
                  +60 18-265 2081
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:rizalsalim@codestudio.my" className="text-sm text-muted-foreground hover:text-primary">
                  rizalsalim@codestudio.my
                </a>
              </div>
            </div>
          </div>
          
          {/* Support Form */}
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="support-name">Name *</Label>
                <Input
                  id="support-name"
                  value={supportForm.name}
                  onChange={(e) => setSupportForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Email *</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={supportForm.email}
                  onChange={(e) => setSupportForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="support-subject">Subject *</Label>
              <Input
                id="support-subject"
                value={supportForm.subject}
                onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="support-message">Message *</Label>
              <Textarea
                id="support-message"
                value={supportForm.message}
                onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Please describe your issue or question in detail..."
                rows={4}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsSupportDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
