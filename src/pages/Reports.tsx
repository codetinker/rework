/**
 * Reports Page - Comprehensive Monthly Performance Reports
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  BarChart3,
  PieChart,
  Users,
  Briefcase,
  MessageSquare,
  GraduationCap,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  Target,
  Award,
  MapPin
} from "lucide-react";
import { 
  mockProjects, 
  mockClients, 
  mockInquiries, 
  mockNews, 
  mockJobPostings, 
  mockJobApplications,
  mockTrainingPrograms,
  mockUsers
} from "@/services/mockData";

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("2026-02");
  const [selectedYear, setSelectedYear] = useState("2026");

  // Calculate real metrics from actual data
  const calculateMetrics = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Project Analysis
    const totalProjects = mockProjects.length;
    const activeProjects = mockProjects.filter(p => p.status === 'ongoing').length;
    const completedProjects = mockProjects.filter(p => p.status === 'completed').length;
    const plannedProjects = mockProjects.filter(p => p.status === 'planned').length;

    // Calculate project values (based on project categories)
    const projectValues = mockProjects.map(project => {
      // Estimate project value based on category and scope
      const baseValues = {
        'Welding': 150000,
        'Inspection': 75000,
        'Maintenance': 100000,
        'Installation': 200000,
        'Fabrication': 300000,
        'Repair': 80000
      };
      
      const category = project.category || 'Welding';
      const baseValue = baseValues[category as keyof typeof baseValues] || 150000;
      
      // Add variation based on project scope indicators
      let multiplier = 1;
      if (project.description.toLowerCase().includes('offshore')) multiplier += 0.5;
      if (project.description.toLowerCase().includes('pipeline')) multiplier += 0.3;
      if (project.description.toLowerCase().includes('platform')) multiplier += 0.7;
      if (project.description.toLowerCase().includes('subsea')) multiplier += 0.8;
      
      return Math.round(baseValue * multiplier);
    });

    const totalProjectValue = projectValues.reduce((sum, value) => sum + value, 0);
    const avgProjectValue = totalProjectValue / totalProjects;

    // Client Analysis
    const totalClients = mockClients.length;
    // Since Client interface doesn't have status, assume all clients are active unless deleted
    const activeClients = mockClients.filter(c => !c.isDeleted).length;
    
    // Geographic distribution based on industry (since no location field)
    const clientsByIndustry = mockClients.reduce((acc, client) => {
      const industry = client.industry || 'Unknown';
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Inquiry Analysis
    const totalInquiries = mockInquiries.length;
    const newInquiries = mockInquiries.filter(i => i.status === 'new').length;
    const inProgressInquiries = mockInquiries.filter(i => i.status === 'in-progress').length;
    const resolvedInquiries = mockInquiries.filter(i => i.status === 'resolved').length;
    
    // Inquiry response rate
    const inquiryResponseRate = ((inProgressInquiries + resolvedInquiries) / totalInquiries * 100);

    // HR & Training Analysis
    const totalJobPostings = mockJobPostings.length;
    const openPositions = mockJobPostings.filter(j => j.status === 'open').length;
    const totalApplications = mockJobApplications.length;
    const applicationsByStatus = mockJobApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalTrainingPrograms = mockTrainingPrograms.length;
    const activeTraining = mockTrainingPrograms.filter(t => t.status === 'active').length;

    // Content & Communication
    const totalNews = mockNews.length;
    const publishedNews = mockNews.filter(n => n.status === 'published').length;

    // System Usage
    const totalUsers = mockUsers.length;
    const adminUsers = mockUsers.filter(u => u.role === 'SUPER_ADMIN').length;

    return {
      projects: {
        total: totalProjects,
        active: activeProjects,
        completed: completedProjects,
        planned: plannedProjects,
        totalValue: totalProjectValue,
        avgValue: avgProjectValue,
        completionRate: (completedProjects / totalProjects * 100)
      },
      clients: {
        total: totalClients,
        active: activeClients,
        byIndustry: clientsByIndustry,
        retentionRate: (activeClients / totalClients * 100)
      },
      inquiries: {
        total: totalInquiries,
        new: newInquiries,
        inProgress: inProgressInquiries,
        resolved: resolvedInquiries,
        responseRate: inquiryResponseRate,
        conversionRate: (resolvedInquiries / totalInquiries * 100)
      },
      hr: {
        jobPostings: totalJobPostings,
        openPositions: openPositions,
        applications: totalApplications,
        applicationsByStatus,
        trainingPrograms: totalTrainingPrograms,
        activeTraining: activeTraining,
        hiringRate: ((applicationsByStatus.hired || 0) / totalApplications * 100)
      },
      content: {
        totalNews: totalNews,
        publishedNews: publishedNews,
        publishRate: (publishedNews / totalNews * 100)
      },
      system: {
        totalUsers: totalUsers,
        adminUsers: adminUsers
      }
    };
  };

  const metrics = calculateMetrics();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Monthly Performance Report</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analysis of operations, projects, and business performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-01">January 2026</SelectItem>
              <SelectItem value="2026-02">February 2026</SelectItem>
              <SelectItem value="2026-03">March 2026</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Executive Summary - {selectedMonth}
          </CardTitle>
          <CardDescription>Key performance indicators and business highlights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{metrics.projects.total}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
              <div className="text-xs text-green-600 mt-1">
                {formatPercentage(metrics.projects.completionRate)} completion rate
              </div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{formatCurrency(metrics.projects.totalValue)}</div>
              <div className="text-sm text-muted-foreground">Project Portfolio Value</div>
              <div className="text-xs text-blue-600 mt-1">
                Avg: {formatCurrency(metrics.projects.avgValue)}
              </div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{metrics.clients.active}</div>
              <div className="text-sm text-muted-foreground">Active Clients</div>
              <div className="text-xs text-green-600 mt-1">
                {formatPercentage(metrics.clients.retentionRate)} retention rate
              </div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{formatPercentage(metrics.inquiries.responseRate)}</div>
              <div className="text-sm text-muted-foreground">Inquiry Response Rate</div>
              <div className="text-xs text-green-600 mt-1">
                {metrics.inquiries.resolved} resolved
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Reports */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="hr">HR & Training</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Projects Report */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Project Portfolio Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{metrics.projects.active}</div>
                    <div className="text-sm text-blue-800">Ongoing</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{metrics.projects.completed}</div>
                    <div className="text-sm text-green-800">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{metrics.projects.planned}</div>
                    <div className="text-sm text-orange-800">Planned</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{formatCurrency(metrics.projects.avgValue)}</div>
                    <div className="text-sm text-purple-800">Avg Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Project Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completion Rate</span>
                    <Badge variant="secondary">{formatPercentage(metrics.projects.completionRate)}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${metrics.projects.completionRate}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm">Total Portfolio Value</span>
                    <Badge variant="outline">{formatCurrency(metrics.projects.totalValue)}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Project Ratio</span>
                    <Badge variant="secondary">{formatPercentage((metrics.projects.active / metrics.projects.total) * 100)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Project Activities</CardTitle>
              <CardDescription>Latest project updates and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProjects.slice(0, 8).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-muted-foreground">{project.client} • {project.location}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={
                          project.status === 'completed' ? 'default' :
                          project.status === 'ongoing' ? 'secondary' : 'outline'
                        }
                      >
                        {project.status.toUpperCase()}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {project.startDate ? new Date(project.startDate).toLocaleDateString('en-MY') : 'TBD'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clients Report */}
        <TabsContent value="clients" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Client Portfolio Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{metrics.clients.total}</div>
                      <div className="text-sm text-blue-800">Total Clients</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{metrics.clients.active}</div>
                      <div className="text-sm text-green-800">Active Clients</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Client Retention Rate</span>
                    <Badge variant="secondary">{formatPercentage(metrics.clients.retentionRate)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Industry Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(metrics.clients.byIndustry)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 6)
                    .map(([industry, count]) => (
                    <div key={industry} className="flex justify-between items-center">
                      <span className="text-sm">{industry}</span>
                      <Badge variant="outline">{count} clients</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operations Report */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Customer Inquiries Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-lg font-bold text-red-600">{metrics.inquiries.new}</div>
                      <div className="text-xs text-red-800">New</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">{metrics.inquiries.inProgress}</div>
                      <div className="text-xs text-yellow-800">In Progress</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{metrics.inquiries.resolved}</div>
                      <div className="text-xs text-green-800">Resolved</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Response Rate</span>
                      <Badge variant="secondary">{formatPercentage(metrics.inquiries.responseRate)}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Conversion Rate</span>
                      <Badge variant="outline">{formatPercentage(metrics.inquiries.conversionRate)}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content & Communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">{metrics.content.totalNews}</div>
                      <div className="text-sm text-purple-800">Total Articles</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{metrics.content.publishedNews}</div>
                      <div className="text-sm text-blue-800">Published</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Publish Rate</span>
                    <Badge variant="secondary">{formatPercentage(metrics.content.publishRate)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* HR & Training Report */}
        <TabsContent value="hr" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recruitment & Hiring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-600">{metrics.hr.jobPostings}</div>
                      <div className="text-sm text-orange-800">Job Postings</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{metrics.hr.applications}</div>
                      <div className="text-sm text-blue-800">Applications</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Open Positions</span>
                      <Badge variant="outline">{metrics.hr.openPositions}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hiring Success Rate</span>
                      <Badge variant="secondary">{formatPercentage(metrics.hr.hiringRate)}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Training & Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{metrics.hr.trainingPrograms}</div>
                      <div className="text-sm text-green-800">Total Programs</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{metrics.hr.activeTraining}</div>
                      <div className="text-sm text-blue-800">Active Programs</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Program Utilization</span>
                    <Badge variant="secondary">
                      {formatPercentage((metrics.hr.activeTraining / metrics.hr.trainingPrograms) * 100)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status Breakdown</CardTitle>
              <CardDescription>Current status of all job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-5">
                {Object.entries(metrics.hr.applicationsByStatus).map(([status, count]) => (
                  <div key={status} className="text-center p-3 border rounded-lg">
                    <div className="text-lg font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground capitalize">{status}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Report */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Project Success Rate</span>
                  <Badge variant="default">{formatPercentage(metrics.projects.completionRate)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Client Retention</span>
                  <Badge variant="secondary">{formatPercentage(metrics.clients.retentionRate)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inquiry Response</span>
                  <Badge variant="outline">{formatPercentage(metrics.inquiries.responseRate)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hiring Success</span>
                  <Badge variant="secondary">{formatPercentage(metrics.hr.hiringRate)}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{formatCurrency(metrics.projects.totalValue)}</div>
                  <div className="text-sm text-green-800">Total Project Value</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{formatCurrency(metrics.projects.avgValue)}</div>
                  <div className="text-sm text-blue-800">Average Project Value</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  System Utilization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Users</span>
                  <Badge variant="outline">{metrics.system.totalUsers}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Admin Users</span>
                  <Badge variant="secondary">{metrics.system.adminUsers}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Content Publish Rate</span>
                  <Badge variant="default">{formatPercentage(metrics.content.publishRate)}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Summary</CardTitle>
              <CardDescription>Overall business performance indicators for {selectedMonth}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">{metrics.projects.completed}</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">{metrics.clients.active}</div>
                  <div className="text-sm text-muted-foreground">Active Clients</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">{metrics.inquiries.resolved}</div>
                  <div className="text-sm text-muted-foreground">Inquiries Resolved</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <GraduationCap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">{metrics.hr.activeTraining}</div>
                  <div className="text-sm text-muted-foreground">Training Programs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}