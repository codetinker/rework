import React from "react";
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
  Bell
} from "lucide-react";
import { ROUTE_PATHS, UserRole } from "@/lib/index";
import {
  mockProjects,
  mockClients,
  mockUsers,
  mockInquiries,
  mockChatMessages,
  mockJobPostings,
  mockTrainingPrograms
} from "@/services/mockData";
import { StatsCard } from "@/components/ui/StatsCard";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  // Derived Statistics
  const stats = {
    totalProjects: mockProjects.length,
    activeProjects: mockProjects.filter((p) => p.status === "ongoing").length,
    totalClients: mockClients.length,
    newInquiries: mockInquiries.filter((i) => i.status === "new").length,
    unreadMessages: mockChatMessages.filter((m) => !m.isStaff && m.status !== "read").length,
    openCareers: mockJobPostings.filter((j) => j.status === "open").length,
    activeTraining: mockTrainingPrograms.filter((t) => t.status === "active").length,
    adminCount: mockUsers.filter((u) => u.role === UserRole.SUPER_ADMIN).length,
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">CMS Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back. Here is what's happening at RWNA Engineering today, February 14, 2026.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Clock className="mr-2 h-4 w-4" />
            View Logs
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Quick Report
          </Button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={Briefcase}
          trend={{ value: 12, isPositive: true }}
          description={`${stats.activeProjects} currently ongoing`}
        />
        <StatsCard
          title="Active Clients"
          value={stats.totalClients}
          icon={Users}
          trend={{ value: 4, isPositive: true }}
          description="Across 4 regions"
        />
        <StatsCard
          title="New Inquiries"
          value={stats.newInquiries}
          icon={FileText}
          trend={{ value: 2, isPositive: false }}
          description="Requires immediate response"
        />
        <StatsCard
          title="Live Chats"
          value={stats.unreadMessages}
          icon={MessageSquare}
          description="Active visitor conversations"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Inquiries & Activity */}
        <Card className="lg:col-span-2 shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Inquiries</CardTitle>
              <CardDescription>Latest submissions from the main website</CardDescription>
            </div>
            <Link to={ROUTE_PATHS.INQUIRIES}>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {mockInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-start justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{inquiry.name}</p>
                        {inquiry.status === "new" && (
                          <Badge variant="default" className="text-[10px] h-4 bg-primary px-1">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs font-medium text-primary">{inquiry.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{inquiry.message}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {new Date(inquiry.receivedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Quick Management Actions */}
        <div className="space-y-6">
          <Card className="shadow-sm border-border">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common management tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                asChild
              >
                <Link to={ROUTE_PATHS.PROJECTS}>
                  <Plus className="mr-2 h-4 w-4 text-primary" />
                  Add New Project
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                asChild
              >
                <Link to={ROUTE_PATHS.CAREER}>
                  <TrendingUp className="mr-2 h-4 w-4 text-primary" />
                  Post Job Opening
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                asChild
              >
                <Link to={ROUTE_PATHS.CHAT}>
                  <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                  Go to Live Chat
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                asChild
              >
                <Link to={ROUTE_PATHS.USERS}>
                  <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                  Manage Permissions
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground shadow-lg border-none">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">System Status</p>
                  <p className="text-xl font-bold">All Systems Go</p>
                </div>
              </div>
              <p className="mt-4 text-xs opacity-80">
                Socket connections for Live Chat are active. System performing at peak efficiency.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Training Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTraining}</div>
            <p className="text-xs text-muted-foreground">Active industrial courses</p>
            <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%]" />
            </div>
            <p className="mt-2 text-[10px] text-right text-muted-foreground">75% Enrollment Capacity</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Recruitment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openCareers}</div>
            <p className="text-xs text-muted-foreground">Open positions listed</p>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${i < 2 ? "bg-primary" : "bg-secondary"}`}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] text-right text-muted-foreground">2/5 Slots filled</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Staff Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">Currently active in CMS</p>
            <div className="mt-4 flex -space-x-2">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground"
                  title={user.name}
                >
                  {user.name.charAt(0)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
