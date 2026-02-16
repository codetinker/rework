import React, { useState } from "react";
import { 
  Briefcase, 
  Plus, 
  Users, 
  FileText, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  TrendingUp,
  Clock,
  AlertTriangle
} from "lucide-react";
import { 
  ROUTE_PATHS, 
  JobPosting,
  JobApplication
} from "@/lib/index";
import { mockJobPostings, mockJobApplications } from "@/services/mockData";
import { DataTable } from "@/components/ui/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Career() {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobPostings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [publishStartDate, setPublishStartDate] = useState<Date>(new Date());
  const [publishEndDate, setPublishEndDate] = useState<Date>(new Date());
  const [hasEndDate, setHasEndDate] = useState(false);
  const [isApplicationsDialogOpen, setIsApplicationsDialogOpen] = useState(false);
  const [viewingJobApplications, setViewingJobApplications] = useState<JobApplication[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isResponseTemplateDialogOpen, setIsResponseTemplateDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [responseSubject, setResponseSubject] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [currentResponseType, setCurrentResponseType] = useState<string>('');
  const [isTemplateEditMode, setIsTemplateEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');
  
  // Delete confirmation states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<JobPosting | null>(null);
  const [careerSettings, setCareerSettings] = useState({
    sendByEmail: true,
    sendByWhatsApp: false,
    autoResponseEnabled: true
  });

  const totalApplications = jobs.reduce((sum, job) => sum + job.applicationCount, 0);
  const openPositions = jobs.filter(j => j.status === "open").length;

  const columns = [
    {
      accessorKey: "title",
      header: "Position Title",
      cell: (item: JobPosting) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{item.title}</span>
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (item: JobPosting) => (
        <Badge variant="secondary" className="font-normal">
          {item.type}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (item: JobPosting) => {
        const status = item.status;
        return (
          <Badge 
            className={ 
              status === "open" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : 
              status === "draft" ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" : 
              "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20"
            }
          >
            {status.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "applicationCount",
      header: "Applications",
      cell: (item: JobPosting) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>{item.applicationCount}</span>
        </div>
      ),
    },
    {
      accessorKey: "postedAt",
      header: "Posted Date",
      cell: (item: JobPosting) => (
        <span className="text-muted-foreground">{new Date(item.postedAt).toLocaleDateString()}</span>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingJob(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (job: JobPosting) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };

  const handleDelete = (job: JobPosting) => {
    setJobToDelete(job);
    setIsDeleteDialogOpen(true);
  };

  const confirmMoveToTrash = () => {
    if (!jobToDelete) return;
    
    const now = new Date();
    
    setJobs(jobs.map(j => j.id === jobToDelete.id ? {
      ...j,
      isDeleted: true,
      deletedAt: now.toISOString(),
      deletedBy: "Current User", // In real app, get from auth context
      updatedAt: now.toISOString()
    } : j));
    
    setIsDeleteDialogOpen(false);
    const jobTitle = jobToDelete.title;
    setJobToDelete(null);
    toast.success(`"${jobTitle}" moved to trash. Will be permanently deleted in 7 days.`);
  };

  const handleViewApplications = (job: JobPosting) => {
    const applications = mockJobApplications.filter(app => app.jobId === job.id);
    setViewingJobApplications(applications);
    setSelectedJob(job);
    setIsApplicationsDialogOpen(true);
  };

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    // Skip 'new' status as it doesn't need a response template
    if (newStatus !== 'new') {
      // Open response template dialog for all status changes except 'new'
      const application = viewingJobApplications.find(app => app.id === applicationId);
      if (application) {
        setSelectedApplication(application);
        setCurrentResponseType(newStatus);
        setIsTemplateEditMode(false);  // This is status change, not template editing
        
        // Set default templates based on status
        switch (newStatus) {
          case 'reviewed':
            setResponseSubject('Application Update - Interview Invitation');
            setResponseContent(`Dear ${application.name},\n\nWe have reviewed your application for the ${selectedJob?.title} position and are impressed with your qualifications.\n\nWe would like to invite you for an interview to discuss this opportunity further. Our HR team will contact you within the next 2 business days to schedule a convenient time.\n\nPlease prepare to discuss your experience and how it relates to this role.\n\nBest regards,\nRWNA HR Team`);
            break;
          case 'shortlisted':
            setResponseSubject('Congratulations - You\'ve Been Shortlisted!');
            setResponseContent(`Dear ${application.name},\n\nCongratulations! You have been shortlisted for the ${selectedJob?.title} position at RWNA.\n\nYou have successfully passed our initial screening and interview process. We are now moving forward with the final selection process.\n\nOur HR team will contact you within the next 1-2 business days with further details about the next steps.\n\nThank you for your continued interest in joining our team.\n\nBest regards,\nRWNA HR Team`);
            break;
          case 'hired':
            setResponseSubject('Congratulations! Job Offer from RWNA');
            setResponseContent(`Dear ${application.name},\n\nCongratulations! We are pleased to offer you the position of ${selectedJob?.title} at RWNA.\n\nWe were impressed with your qualifications and believe you will be a valuable addition to our team.\n\nPlease reply to this email to confirm your acceptance of this offer. We will then send you the detailed offer letter and next steps for onboarding.\n\nWelcome to the RWNA family!\n\nBest regards,\nRWNA HR Team`);
            break;
          case 'rejected':
            setResponseSubject('Application Status Update');
            setResponseContent(`Dear ${application.name},\n\nThank you for your interest in the ${selectedJob?.title} position at RWNA and for taking the time to apply.\n\nAfter careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.\n\nWe encourage you to apply for future opportunities that match your skills and experience. We will keep your resume on file for consideration.\n\nThank you again for your interest in RWNA.\n\nBest regards,\nRWNA HR Team`);
            break;
        }
        
        setIsResponseTemplateDialogOpen(true);
      }
      return;
    }
    
    // Handle 'new' status change normally (no template needed)
    setViewingJobApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus as JobApplication['status'] }
          : app
      )
    );
    toast.success(`Application status updated to ${newStatus}`);
  };

  const handleSendResponse = () => {
    if (selectedApplication) {
      // Update the application status
      setViewingJobApplications(prev => 
        prev.map(app => 
          app.id === selectedApplication.id 
            ? { ...app, status: currentResponseType as JobApplication['status'] }
            : app
        )
      );
      
      // Simulate sending email/WhatsApp
      toast.success(`${currentResponseType.toUpperCase()} notification sent to ${selectedApplication.name}`);
      
      // Close dialog
      setIsResponseTemplateDialogOpen(false);
      setSelectedApplication(null);
      setIsTemplateEditMode(false);
    }
  };

  const handleEditTemplate = (templateType: string) => {
    setCurrentResponseType(templateType);
    setIsTemplateEditMode(true);  // This is template editing from Settings
    
    // Set default templates based on type
    switch (templateType) {
      case 'new':
        setResponseSubject('Application Received - Thank You');
        setResponseContent(`Dear {applicantName},\n\nThank you for your application for the {jobTitle} position at {companyName}.\n\nWe have received your application and will review it shortly. Our HR team will contact you within 3-5 business days regarding the next steps.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\n{companyName} HR Team`);
        break;
      case 'reviewed':
        setResponseSubject('Application Update - Interview Invitation');
        setResponseContent(`Dear {applicantName},\n\nWe have reviewed your application for the {jobTitle} position and are impressed with your qualifications.\n\nWe would like to invite you for an interview to discuss this opportunity further. Our HR team will contact you within the next 2 business days to schedule a convenient time.\n\nPlease prepare to discuss your experience and how it relates to this role.\n\nBest regards,\n{companyName} HR Team`);
        break;
      case 'shortlisted':
        setResponseSubject('Congratulations - You\'ve Been Shortlisted!');
        setResponseContent(`Dear {applicantName},\n\nCongratulations! You have been shortlisted for the {jobTitle} position at {companyName}.\n\nYou have successfully passed our initial screening and interview process. We are now moving forward with the final selection process.\n\nOur HR team will contact you within the next 1-2 business days with further details about the next steps.\n\nThank you for your continued interest in joining our team.\n\nBest regards,\n{companyName} HR Team`);
        break;
      case 'hired':
        setResponseSubject('Congratulations! Job Offer from RWNA');
        setResponseContent(`Dear {applicantName},\n\nCongratulations! We are pleased to offer you the position of {jobTitle} at {companyName}.\n\nWe were impressed with your qualifications and believe you will be a valuable addition to our team.\n\nPlease reply to this email to confirm your acceptance of this offer. We will then send you the detailed offer letter and next steps for onboarding.\n\nWelcome to the {companyName} family!\n\nBest regards,\n{companyName} HR Team`);
        break;
      case 'rejected':
        setResponseSubject('Application Status Update');
        setResponseContent(`Dear {applicantName},\n\nThank you for your interest in the {jobTitle} position at {companyName} and for taking the time to apply.\n\nAfter careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.\n\nWe encourage you to apply for future opportunities that match your skills and experience. We will keep your resume on file for consideration.\n\nThank you again for your interest in {companyName}.\n\nBest regards,\n{companyName} HR Team`);
        break;
    }
    
    setIsResponseTemplateDialogOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for save/update would go here
    setIsDialogOpen(false);
    toast.success(editingJob ? "Job updated successfully" : "New job posted successfully");
  };

  // Filter jobs based on search query (exclude deleted jobs)
  const activeJobs = jobs.filter(job => !job.isDeleted);
  const filteredJobs = activeJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Career Management</h1>
          <p className="text-muted-foreground">
            Manage job openings and track recruitment across the organization.
            <span className="ml-2 text-sm font-medium text-primary">
              (Showing {filteredJobs.length} of {jobs.length} entries)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          <Button onClick={handleAdd} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Openings</CardTitle>
            <Briefcase className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openPositions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently published on main website
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
            <Users className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Review Pending</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              Applications requiring initial screening
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-xl border border-border/50 shadow-sm">
        <DataTable 
          data={filteredJobs} 
          columns={columns} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewApplications={handleViewApplications}
          title="Job Postings"
        />
      </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Career Settings</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Configure email templates and notification settings for job applications and candidate communications.
                </p>
              </div>
              
              {/* Send via Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Send via</h4>
                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                        careerSettings.sendByEmail ? 'bg-primary/80' : 'bg-muted-foreground/30'
                      }`}
                      onClick={() => setCareerSettings(prev => ({ ...prev, sendByEmail: !prev.sendByEmail }))}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        careerSettings.sendByEmail ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                    <Label className="text-sm font-medium">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                        careerSettings.sendByWhatsApp ? 'bg-primary/80' : 'bg-muted-foreground/30'
                      }`}
                      onClick={() => setCareerSettings(prev => ({ ...prev, sendByWhatsApp: !prev.sendByWhatsApp }))}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        careerSettings.sendByWhatsApp ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                    <Label className="text-sm font-medium">WhatsApp</Label>
                  </div>
                </div>
              </div>
              
              {/* Response Templates Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Response Templates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* New Application Template */}
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">Application Received</h5>
                        <p className="text-xs text-muted-foreground">Auto-response when application is submitted</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('new')}>
                      Edit Template
                    </Button>
                  </div>
                  
                  {/* Reviewed Template */}
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <Eye className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">Application Reviewed</h5>
                        <p className="text-xs text-muted-foreground">Notification when application is reviewed</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('reviewed')}>
                      Edit Template
                    </Button>
                  </div>
                  
                  {/* Shortlisted Template */}
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">Candidate Shortlisted</h5>
                        <p className="text-xs text-muted-foreground">Interview invitation template</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('shortlisted')}>
                      Edit Template
                    </Button>
                  </div>
                  
                  {/* Hired Template */}
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">Candidate Hired</h5>
                        <p className="text-xs text-muted-foreground">Job offer and welcome message</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('hired')}>
                      Edit Template
                    </Button>
                  </div>
                  
                  {/* Rejected Template */}
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">Application Rejected</h5>
                        <p className="text-xs text-muted-foreground">Polite rejection notification</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('rejected')}>
                      Edit Template
                    </Button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingJob ? "Edit Job Posting" : "Create New Job Posting"}</DialogTitle>
              <DialogDescription>
                Fill in the details for the position. This information will be displayed on the public career page.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue={editingJob?.title} placeholder="e.g. Senior Site Engineer" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue={editingJob?.department || "Operations"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Safety">Safety & Compliance</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={editingJob?.location} placeholder="e.g. Gebeng, Kuantan" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select defaultValue={editingJob?.type || "Full-time"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue={editingJob?.description} 
                  placeholder="Brief overview of the role..." 
                  className="h-24"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (One per line)</Label>
                <Textarea 
                  id="requirements" 
                  defaultValue={editingJob?.requirements.join("\n")} 
                  placeholder="- Bachelor Degree in...\n- 5 years experience..."
                  className="h-24"
                />
              </div>

              {/* Publishing Schedule */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-sm font-medium">Publishing Schedule</h3>
                
                <div className="space-y-2">
                  <Label>Publish Start Date & Time</Label>
                  <DateTimePicker
                    date={publishStartDate}
                    onDateChange={(date: Date | undefined) => setPublishStartDate(date || new Date())}
                    placeholder="Select publish start date and time"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                      hasEndDate ? 'bg-primary/80' : 'bg-muted-foreground/30'
                    }`}
                    onClick={() => setHasEndDate(!hasEndDate)}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                      hasEndDate ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                  <Label className="text-sm font-medium">Set End Publish Date & Time</Label>
                </div>
                
                {hasEndDate && (
                  <div className="space-y-2">
                    <Label>Publish End Date & Time</Label>
                    <DateTimePicker
                      date={publishEndDate}
                      onDateChange={(date: Date | undefined) => setPublishEndDate(date || new Date())}
                      placeholder="Select publish end date and time"
                    />
                  </div>
                )}
                
                {!hasEndDate && (
                  <p className="text-sm text-muted-foreground">Job posting will be published indefinitely</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Posting Status</Label>
                <Select defaultValue={editingJob?.status || "draft"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open (Published)</SelectItem>
                    <SelectItem value="draft">Draft (Hidden)</SelectItem>
                    <SelectItem value="closed">Closed (Archived)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary">
                {editingJob ? "Update Posting" : "Publish Job"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Applications Dialog */}
      <Dialog open={isApplicationsDialogOpen} onOpenChange={setIsApplicationsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Applications for {selectedJob?.title}
            </DialogTitle>
            <DialogDescription>
              {viewingJobApplications.length} application(s) received for this position
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {viewingJobApplications.length > 0 ? (
              viewingJobApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="font-medium text-lg">{application.name}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Phone:</span>
                          <span>{application.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Email:</span>
                          <span>{application.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Applied:</span>
                          <span>{new Date(application.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Select 
                        value={application.status} 
                        onValueChange={(value) => handleStatusChange(application.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue>
                            <Badge 
                              className={
                                application.status === "new" ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" :
                                application.status === "reviewed" ? "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20" :
                                application.status === "shortlisted" ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" :
                                application.status === "hired" ? "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20" :
                                "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                              }
                            >
                              {application.status.toUpperCase()}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500/10 text-blue-600">NEW</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="reviewed">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-500/10 text-yellow-600">REVIEWED</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="shortlisted">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500/10 text-green-600">SHORTLISTED</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="hired">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-purple-500/10 text-purple-600">HIRED</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem value="rejected">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-500/10 text-red-600">REJECTED</Badge>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(application.resumeUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        View Resume
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No applications received yet</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplicationsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Response Template Dialog */}
      <Dialog open={isResponseTemplateDialogOpen} onOpenChange={setIsResponseTemplateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Send {currentResponseType.toUpperCase()} Notification
            </DialogTitle>
            <DialogDescription>
              Customize the message before sending to {selectedApplication?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Available Variables Guide */}
            <div className="bg-muted/50 p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Available Variables</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{applicantName}'}</code> - Applicant's name</div>
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{jobTitle}'}</code> - Job position title</div>
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{companyName}'}</code> - Company name (RWNA)</div>
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{department}'}</code> - Job department</div>
              </div>
            </div>
            
            {/* Subject Field */}
            <div>
              <Label htmlFor="response-subject">Subject</Label>
              <Input
                id="response-subject"
                value={responseSubject}
                onChange={(e) => setResponseSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            
            {/* Content Field */}
            <div>
              <Label htmlFor="response-content">Message Content</Label>
              <Textarea
                id="response-content"
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                placeholder="Enter message content..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>
            

          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsResponseTemplateDialogOpen(false); setIsTemplateEditMode(false); }}>
              Cancel
            </Button>
            <Button onClick={handleSendResponse} className="bg-primary">
              {isTemplateEditMode ? 'Save Template' : 'Send Notification'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Move to Trash?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to move "{jobToDelete?.title}" to trash?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-start gap-3">
                <Trash2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium">What happens next:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Job posting will be moved to trash
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      You can restore it within 7 days
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-destructive rounded-full" />
                      After 7 days, it will be permanently deleted
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmMoveToTrash}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Move to Trash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
