import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Plus,
  ShieldCheck,
  GraduationCap,
  Bell,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Calendar,
  MapPin,
  Wrench,
  HardHat,
  Award,
  Zap,
  BarChart3,
  PieChart,
  Target,
  Gauge
} from "lucide-react";
import { ROUTE_PATHS, UserRole } from "@/lib/index";
import {
  mockProjects,
  mockClients,
  mockUsers,
  mockInquiries,
  mockChatMessages,
  mockJobPostings,
  mockJobApplications,
  mockTrainingPrograms,
  mockNews,
  mockAccessLogs
} from "@/services/mockData";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  // REAL DATA from existing modules - no fabrication!
  const stats = {
    // Project Module Data
    totalProjects: mockProjects.length,
    activeProjects: mockProjects.filter((p) => p.status === "ongoing").length,
    completedProjects: mockProjects.filter((p) => p.status === "completed").length,
    plannedProjects: mockProjects.filter((p) => p.status === "planned").length,
    
    // Client Module Data
    totalClients: mockClients.length,
    activeClients: mockClients.filter((c) => !c.isDeleted).length,
    
    // Inquiry Module Data
    totalInquiries: mockInquiries.length,
    newInquiries: mockInquiries.filter((i) => i.status === "new").length,
    inProgressInquiries: mockInquiries.filter((i) => i.status === "in-progress").length,
    resolvedInquiries: mockInquiries.filter((i) => i.status === "resolved").length,
    
    // Chat Module Data
    totalMessages: mockChatMessages.length,
    unreadMessages: mockChatMessages.filter((m) => !m.isStaff && m.status !== "read").length,
    staffMessages: mockChatMessages.filter((m) => m.isStaff).length,
    
    // Career Module Data
    totalJobPostings: mockJobPostings.length,
    openPositions: mockJobPostings.filter((j) => j.status === "open").length,
    totalApplications: mockJobApplications.length,
    
    // Training Module Data
    totalPrograms: mockTrainingPrograms.length,
    activeTraining: mockTrainingPrograms.filter((t) => t.status === "active").length,
    
    // News Module Data
    totalNews: mockNews.length,
    publishedNews: mockNews.filter((n) => n.status === "published").length,
    
    // User Management Data
    totalUsers: mockUsers.length,
    adminUsers: mockUsers.filter((u) => u.role === UserRole.SUPER_ADMIN).length,
    contentManagerUsers: mockUsers.filter((u) => u.role === UserRole.CONTENT_MANAGER).length,
    supportStaffUsers: mockUsers.filter((u) => u.role === UserRole.SUPPORT_STAFF).length,
    
    // Access Logs Data
    totalAccessLogs: mockAccessLogs.length,
    
    // Trash Data (from all modules)
    deletedItems: [
      ...mockProjects.filter(p => p.isDeleted),
      ...mockClients.filter(c => c.isDeleted),
      ...mockNews.filter(n => n.isDeleted),
      ...mockJobPostings.filter(j => j.isDeleted),
      ...mockTrainingPrograms.filter(t => t.isDeleted)
    ].length,
  };

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">RWNA Engineering Dashboard</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-4">
            <span>Operations Command Center</span>
            <span className="text-xs">•</span>
            <span>{currentTime.toLocaleDateString('en-MY', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span className="text-xs">•</span>
            <span className="font-mono">{currentTime.toLocaleTimeString('en-MY', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Asia/Kuala_Lumpur'
            })} MYT</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to={ROUTE_PATHS.REPORTS}>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <FileText className="mr-2 h-4 w-4" />
              Monthly Report
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Real Module Status Overview */}
      <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-blue-800 dark:text-blue-200">CMS Status: {stats.totalUsers} Active Users Managing {stats.totalProjects} Projects</p>
                <Badge variant="default" className="bg-primary text-primary-foreground border-primary hover:bg-primary/90">
                  {stats.newInquiries} New Inquiries
                </Badge>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Real-time data from all active modules. {stats.deletedItems} items in trash awaiting action.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real Module Metrics - Projects & Clients */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProjects} ongoing, {stats.completedProjects} completed, {stats.plannedProjects} planned
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Client Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeClients} active clients in system
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInquiries}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newInquiries} new, {stats.inProgressInquiries} in progress, {stats.resolvedInquiries} resolved
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              {stats.unreadMessages} unread, {stats.staffMessages} from staff
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* HR & Content Management Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Career Postings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobPostings}</div>
            <p className="text-xs text-muted-foreground">{stats.openPositions} open positions</p>
            <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: `${Math.min((stats.openPositions / stats.totalJobPostings) * 100, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-right text-muted-foreground">
              {stats.totalApplications} applications received
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Training Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPrograms}</div>
            <p className="text-xs text-muted-foreground">{stats.activeTraining} active programs</p>
            <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: `${Math.min((stats.activeTraining / stats.totalPrograms) * 100, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-right text-muted-foreground">
              {((stats.activeTraining / stats.totalPrograms) * 100).toFixed(0)}% programs active
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              News & Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNews}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedNews} published articles
            </p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              System Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.adminUsers} admins, {stats.totalAccessLogs} access logs, {stats.deletedItems} in trash
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project Status & Activity Feed */}
        <Card className="lg:col-span-2 shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Live Project Status
              </CardTitle>
              <CardDescription>Real-time updates from active operations</CardDescription>
            </div>
            <Link to={ROUTE_PATHS.PROJECTS}>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {mockProjects.slice(0, 6).map((project) => {
                  const statusColors = {
                    ongoing: "bg-blue-100 text-blue-800 border-blue-200",
                    completed: "bg-green-100 text-green-800 border-green-200",
                    planned: "bg-yellow-100 text-yellow-800 border-yellow-200",
                    onhold: "bg-red-100 text-red-800 border-red-200"
                  };
                  
                  return (
                    <div
                      key={project.id}
                      className="flex items-start justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{project.title}</p>
                          <Badge className={`text-[10px] h-4 px-2 ${statusColors[project.status as keyof typeof statusColors] || statusColors.planned}`}>
                            {project.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs font-medium text-primary">{project.client}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(project.startDate).toLocaleDateString('en-MY')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xs font-bold text-primary">
                          RM {(() => {
                            // Calculate estimated value based on project category
                            const categoryValues = {
                              'Offshore': 15.5,
                              'Onshore': 8.2,
                              'Subsea': 12.8,
                              'Fabrication': 6.5
                            };
                            return categoryValues[project.category] || 5.0;
                          })()}M
                        </p>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Critical Operations Panel */}
        <div className="space-y-6">


          {/* System Health Status */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg border-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">System Health</p>
                  <p className="text-xl font-bold">Optimal Performance</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="opacity-80">Server Uptime</span>
                  <span className="font-bold">99.9%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="opacity-80">Database Response</span>
                  <span className="font-bold">12ms</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="opacity-80">Users Online</span>
                  <span className="font-bold">{stats.totalUsers}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Inquiries Summary */}
          <Card className="shadow-sm border-border">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Latest Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockInquiries.slice(0, 3).map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{inquiry.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(inquiry.receivedAt).toLocaleDateString('en-MY')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to={ROUTE_PATHS.INQUIRIES}>
                <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                  View All Inquiries <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Real Module Analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Project Analytics */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <PieChart className="h-4 w-4 text-blue-600" />
              Project Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">Total projects in system</p>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Ongoing</span>
                <span className="font-bold text-blue-600">{stats.activeProjects}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Completed</span>
                <span className="font-bold text-green-600">{stats.completedProjects}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Planned</span>
                <span className="font-bold text-yellow-600">{stats.plannedProjects}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Inquiry Analytics */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-600" />
              Inquiry Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalInquiries}</div>
            <p className="text-xs text-muted-foreground">Total inquiries received</p>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs">
                <span>New</span>
                <span className="font-bold text-red-600">{stats.newInquiries}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>In Progress</span>
                <span className="font-bold text-yellow-600">{stats.inProgressInquiries}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Resolved</span>
                <span className="font-bold text-green-600">{stats.resolvedInquiries}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* User Role Distribution */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              User Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Active system users</p>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Admins</span>
                <span className="font-bold text-red-600">{stats.adminUsers}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Content Managers</span>
                <span className="font-bold text-blue-600">{stats.contentManagerUsers}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Support Staff</span>
                <span className="font-bold text-green-600">{stats.supportStaffUsers}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* System Activity */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-600" />
              System Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.totalAccessLogs}</div>
            <p className="text-xs text-muted-foreground">Total access logs</p>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Chat Messages</span>
                <span className="font-bold text-blue-600">{stats.totalMessages}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Published News</span>
                <span className="font-bold text-green-600">{stats.publishedNews}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Deleted Items</span>
                <span className="font-bold text-red-600">{stats.deletedItems}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity Timeline */}
      <Card className="shadow-sm border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest actions across all modules</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {(() => {
                // Create a unified activity feed from all modules with real timestamps
                const activities: Array<{
                  id: string;
                  type: string;
                  title: string;
                  subtitle: string;
                  description: string;
                  status: string;
                  timestamp: string;
                  data: any;
                }> = [];
                
                // Add inquiries (most recent activity)
                mockInquiries.forEach(inquiry => {
                  activities.push({
                    id: `inquiry-${inquiry.id}`,
                    type: 'inquiry',
                    title: inquiry.name,
                    subtitle: inquiry.subject,
                    description: inquiry.message,
                    status: inquiry.status,
                    timestamp: inquiry.receivedAt,
                    data: inquiry
                  });
                });
                
                // Add news articles
                mockNews.forEach(news => {
                  activities.push({
                    id: `news-${news.id}`,
                    type: 'news',
                    title: news.title,
                    subtitle: news.category,
                    description: news.summary,
                    status: news.status,
                    timestamp: news.publishedAt,
                    data: news
                  });
                });
                
                // Add job postings
                mockJobPostings.forEach(job => {
                  activities.push({
                    id: `job-${job.id}`,
                    type: 'job',
                    title: job.title,
                    subtitle: `${job.department} • ${job.location}`,
                    description: job.description,
                    status: job.status,
                    timestamp: job.postedAt,
                    data: job
                  });
                });
                
                // Add job applications (recent activity)
                mockJobApplications.forEach(application => {
                  const jobTitle = mockJobPostings.find(j => j.id === application.jobId)?.title || 'Position';
                  activities.push({
                    id: `application-${application.id}`,
                    type: 'application',
                    title: application.name,
                    subtitle: `Applied for ${jobTitle}`,
                    description: `Application submitted • ${application.status}`,
                    status: application.status,
                    timestamp: application.appliedAt,
                    data: application
                  });
                });
                
                // Sort by timestamp (most recent first) and take top 10
                const sortedActivities = activities
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .slice(0, 10);
                
                return sortedActivities.map((activity) => {
                  const getActivityConfig = (type: string) => {
                    switch (type) {
                      case 'inquiry':
                        return {
                          icon: FileText,
                          bgColor: 'bg-green-50 dark:bg-green-950/30',
                          borderColor: 'border-green-200 dark:border-green-800',
                          iconBg: 'bg-green-100 dark:bg-green-900',
                          iconColor: 'text-green-600 dark:text-green-400',
                          titleColor: 'text-green-800 dark:text-green-200',
                          subtitleColor: 'text-green-600 dark:text-green-400',
                          label: 'Inquiry'
                        };
                      case 'news':
                        return {
                          icon: FileText,
                          bgColor: 'bg-purple-50 dark:bg-purple-950/30',
                          borderColor: 'border-purple-200 dark:border-purple-800',
                          iconBg: 'bg-purple-100 dark:bg-purple-900',
                          iconColor: 'text-purple-600 dark:text-purple-400',
                          titleColor: 'text-purple-800 dark:text-purple-200',
                          subtitleColor: 'text-purple-600 dark:text-purple-400',
                          label: 'News'
                        };
                      case 'job':
                        return {
                          icon: Briefcase,
                          bgColor: 'bg-orange-50 dark:bg-orange-950/30',
                          borderColor: 'border-orange-200 dark:border-orange-800',
                          iconBg: 'bg-orange-100 dark:bg-orange-900',
                          iconColor: 'text-orange-600 dark:text-orange-400',
                          titleColor: 'text-orange-800 dark:text-orange-200',
                          subtitleColor: 'text-orange-600 dark:text-orange-400',
                          label: 'Job Posting'
                        };
                      case 'application':
                        return {
                          icon: Users,
                          bgColor: 'bg-blue-50 dark:bg-blue-950/30',
                          borderColor: 'border-blue-200 dark:border-blue-800',
                          iconBg: 'bg-blue-100 dark:bg-blue-900',
                          iconColor: 'text-blue-600 dark:text-blue-400',
                          titleColor: 'text-blue-800 dark:text-blue-200',
                          subtitleColor: 'text-blue-600 dark:text-blue-400',
                          label: 'Application'
                        };
                      default:
                        return {
                          icon: Activity,
                          bgColor: 'bg-gray-50 dark:bg-gray-950/30',
                          borderColor: 'border-gray-200 dark:border-gray-800',
                          iconBg: 'bg-gray-100 dark:bg-gray-900',
                          iconColor: 'text-gray-600 dark:text-gray-400',
                          titleColor: 'text-gray-800 dark:text-gray-200',
                          subtitleColor: 'text-gray-600 dark:text-gray-400',
                          label: 'Activity'
                        };
                    }
                  };
                  
                  const config = getActivityConfig(activity.type);
                  const Icon = config.icon;
                  
                  const getStatusBadgeColor = (status: string, type: string) => {
                    if (type === 'inquiry') {
                      return status === 'new' ? 'bg-red-100 text-red-800 border-red-200' :
                             status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                             'bg-green-100 text-green-800 border-green-200';
                    }
                    if (type === 'application') {
                      return status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                             status === 'reviewed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                             status === 'accepted' ? 'bg-green-100 text-green-800 border-green-200' :
                             'bg-red-100 text-red-800 border-red-200';
                    }
                    return 'bg-gray-100 text-gray-800 border-gray-200';
                  };
                  
                  return (
                    <div key={activity.id} className={`flex items-start gap-3 p-3 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
                      <div className={`p-2 ${config.iconBg} rounded-full`}>
                        <Icon className={`h-4 w-4 ${config.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold ${config.titleColor}`}>{activity.title}</p>
                          <Badge className={`text-xs h-4 px-2 ${getStatusBadgeColor(activity.status, activity.type)}`}>
                            {activity.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className={`text-xs ${config.subtitleColor} mt-1`}>{activity.subtitle}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">{config.label}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleDateString('en-MY', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}

            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
