import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Plus,
  Search,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  BookOpen,
  AlertCircle,
  Eye,
  UserCheck,
  TrendingUp,
  Award,
  MapPin,
  DollarSign,
  X,
  Mail,
  Settings,
  UserPlus,
  Send,
  CheckCircle,
  XCircle,
  MessageSquare,
  Filter,
  AlertTriangle
} from "lucide-react";
import { TrainingProgram, Inquiry, TrainingParticipant, TrainingInquiry, EmailTemplate, TrainingSettings, ROUTE_PATHS } from "@/lib/index";
import { mockTrainingPrograms, mockInquiries } from "@/services/mockData";
import { sendAPI, trainingAPI } from "@/services/api";
import { DataTable, ColumnDef } from "@/components/ui/DataTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { springPresets, fadeInUp } from "@/lib/motion";
import { toast } from "sonner";
import { DateTimePicker, DatePicker } from "@/components/ui/date-time-picker";

// Mock participants data
interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  enrolledAt: string;
  status: 'enrolled' | 'completed' | 'dropped' | 'in-progress';
  progress: number;
  certificateIssued?: boolean;
}

const mockParticipants: Record<string, Participant[]> = {
  't1': [
    {
      id: 'p1',
      name: 'Ahmad Rahman',
      email: 'ahmad.rahman@petronas.com',
      phone: '+60123456789',
      company: 'PETRONAS',
      position: 'Senior Technician',
      enrolledAt: '2026-01-15T09:00:00Z',
      status: 'in-progress',
      progress: 75,
      certificateIssued: false
    },
    {
      id: 'p2',
      name: 'Sarah Lim',
      email: 'sarah.lim@shell.com',
      phone: '+60198765432',
      company: 'Shell Malaysia',
      position: 'Operations Engineer',
      enrolledAt: '2026-01-15T09:00:00Z',
      status: 'completed',
      progress: 100,
      certificateIssued: true
    }
  ]
};

/**
 * Training Management Page (CMS)
 * Complete CRUD operations for training programs with participant tracking
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

export default function Training() {
  const [programs, setPrograms] = useState<TrainingProgram[]>(mockTrainingPrograms);
  const [activeTab, setActiveTab] = useState("programs");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProgram, setEditingProgram] = useState<TrainingProgram | null>(null);
  const [viewingProgram, setViewingProgram] = useState<TrainingProgram | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // New state for participants and settings
  const [participants, setParticipants] = useState<TrainingParticipant[]>([]);
  const [inquiries, setInquiries] = useState<TrainingInquiry[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [trainingSettings, setTrainingSettings] = useState<TrainingSettings | null>(null);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  
  // Participant management state
  const [isParticipantViewDialogOpen, setIsParticipantViewDialogOpen] = useState(false);
  const [isParticipantEditDialogOpen, setIsParticipantEditDialogOpen] = useState(false);
  const [isAddParticipantDialogOpen, setIsAddParticipantDialogOpen] = useState(false);
  const [viewingParticipant, setViewingParticipant] = useState<TrainingParticipant | null>(null);
  const [editingParticipant, setEditingParticipant] = useState<TrainingParticipant | null>(null);
  const [isParticipantEmailDialogOpen, setIsParticipantEmailDialogOpen] = useState(false);
  const [selectedParticipantForEmail, setSelectedParticipantForEmail] = useState<TrainingParticipant | null>(null);
  
  // Response template state
  const [isResponseTemplateDialogOpen, setIsResponseTemplateDialogOpen] = useState(false);
  const [currentTemplateType, setCurrentTemplateType] = useState<'acceptance' | 'rejection' | 'course_notification' | 'certificate'>('acceptance');
  const [templateSubject, setTemplateSubject] = useState('');
  const [templateContent, setTemplateContent] = useState('');
  const [selectedInquiryForResponse, setSelectedInquiryForResponse] = useState<Inquiry | null>(null);
  
  // Send method toggles
  const [sendByEmail, setSendByEmail] = useState(true);
  const [sendByWhatsApp, setSendByWhatsApp] = useState(false);
  
  // Template editing state
  const [isTemplateEditDialogOpen, setIsTemplateEditDialogOpen] = useState(false);
  const [editingTemplateType, setEditingTemplateType] = useState<'acceptance' | 'rejection' | 'course_notification' | 'certificate'>('acceptance');
  const [editingTemplateSubject, setEditingTemplateSubject] = useState('');
  const [editingTemplateContent, setEditingTemplateContent] = useState('');
  const [templateEditorTab, setTemplateEditorTab] = useState<'write' | 'preview'>('write');
  const [courseStatus, setCourseStatus] = useState<string>('participate');
  const [responseTemplateTab, setResponseTemplateTab] = useState<'write' | 'preview'>('write');
  
  // Delete confirmation states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<TrainingProgram | null>(null);

  // Mock data for participants
  const mockParticipants: TrainingParticipant[] = [
    {
      id: '1',
      name: 'Ahmad Rahman',
      email: 'ahmad.rahman@petronas.com',
      phone: '+60123456789',
      company: 'Petronas',
      position: 'Senior Engineer',
      enrolledCourses: [
        {
          courseCode: 'WLD-001',
          programName: 'Advanced Welding Techniques',
          enrollmentDate: '2026-01-15',
          status: 'completed',
          progress: 100,
          grade: 'A',
          certificateIssued: true
        },
        {
          courseCode: 'SAF-002',
          programName: 'Industrial Safety Protocols',
          enrollmentDate: '2026-02-01',
          status: 'completed',
          progress: 100,
          grade: 'B+',
          certificateIssued: false
        },
        {
          courseCode: 'MCH-003',
          programName: 'Precision Machining',
          enrollmentDate: '2026-01-25',
          status: 'enrolled',
          progress: 45,
        }
      ],
      totalCoursesCompleted: 2,
      joinedDate: '2026-01-15',
      lastActivity: '2026-02-14',
      notes: 'Excellent performance in welding course'
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      email: 'siti.n@shell.com',
      phone: '+60198765432',
      company: 'Shell Malaysia',
      position: 'Technical Specialist',
      enrolledCourses: [
        {
          courseCode: 'MCH-003',
          programName: 'Precision Machining',
          enrollmentDate: '2026-01-20',
          status: 'enrolled',
          progress: 80,
        }
      ],
      totalCoursesCompleted: 0,
      joinedDate: '2026-01-20',
      lastActivity: '2026-02-13'
    }
  ];

  // Mock settings data
  const mockSettings: TrainingSettings = {
    id: '1',
    autoResponseEnabled: true,
    defaultInquiryResponseTemplate: 'welcome',
    acceptanceEmailTemplate: 'acceptance',
    rejectionEmailTemplate: 'rejection',
    courseNotificationTemplate: 'course_notification',
    reminderEmailTemplate: 'reminder',
    certificateEmailTemplate: 'certificate',
    emailSignature: 'Best regards,\nRWNA Engineering Training Team\nPhone: +60 3-1234 5678\nEmail: training@rwna.com',
    notificationSettings: {
      newInquiry: true,
      courseEnrollment: true,
      courseCompletion: true,
      upcomingDeadlines: false
    },
    updatedAt: '2026-02-16T02:00:00Z'
  };

  // Initialize participants and settings with mock data
  React.useEffect(() => {
    setParticipants(mockParticipants);
    setTrainingSettings(mockSettings);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    description: '',
    duration: '',
    location: '',
    instructor: '',
    price: '',
    capacity: 20,
    startDate: new Date(),
    endDate: new Date(),
    closeApplicationDate: new Date(),
    trainingMapUrl: '',
    status: 'scheduled' as 'active' | 'scheduled' | 'archived'
  });

  // Calculate Statistics
  const stats = useMemo(() => ({
    totalPrograms: programs.length,
    activePrograms: (programs || []).filter(p => p.status === "active").length,
    totalEnrolled: programs.reduce((acc, curr) => acc + curr.enrolled, 0),
    totalCapacity: programs.reduce((acc, curr) => acc + curr.capacity, 0),
    pendingInquiries: mockInquiries.filter(i => i.status === "new" || i.status === "in-progress").length
  }), [programs]);

  // Filter programs based on search query (exclude deleted programs)
  const filteredPrograms = useMemo(() => {
    const activePrograms = (programs || []).filter(program => !program.isDeleted);

    return activePrograms.filter(program =>
      program.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [programs, searchQuery]);

  // Reset form
  const resetForm = () => {
    setFormData({
      code: '',
      title: '',
      description: '',
      duration: '',
      location: '',
      instructor: '',
      price: '',
      capacity: 20,
      startDate: new Date(),
      endDate: new Date(),
      closeApplicationDate: new Date(),
      trainingMapUrl: '',
      status: 'scheduled'
    });
  };

  // Handle create
  const handleCreate = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  // Handle edit
  const handleEdit = (program: TrainingProgram) => {
    try {
      setEditingProgram(program);
      
      // Safe date conversion with fallbacks
      const safeDate = (dateValue: string | Date | undefined, fallback: Date = new Date()) => {
        if (!dateValue) return fallback;
        const date = new Date(dateValue);
        return isNaN(date.getTime()) ? fallback : date;
      };
      
      setFormData({
        code: program.code || '',
        title: program.title || '',
        description: program.description || '',
        duration: program.duration || '',
        location: program.location || '',
        instructor: program.instructor || '',
        price: program.price?.toString() || '',
        capacity: program.capacity || 20,
        startDate: safeDate(program.startDate),
        endDate: safeDate(program.endDate),
        closeApplicationDate: safeDate(program.closeApplicationDate),
        trainingMapUrl: program.trainingMapUrl || '',
        status: program.status || 'scheduled'
      });
      
      setIsEditDialogOpen(true);
    } catch (error) {
      console.error('Error in handleEdit:', error);
      toast.error('Failed to open edit dialog. Please try again.');
    }
  };

  // Handle view details
  const handleView = (program: TrainingProgram) => {
    setViewingProgram(program);
    setIsViewDialogOpen(true);
  };

  // Handle delete
  const handleDelete = (program: TrainingProgram) => {
    setProgramToDelete(program);
    setIsDeleteDialogOpen(true);
  };

  const confirmMoveToTrash = () => {
    if (!programToDelete) return;
    
    const now = new Date();
    
    setPrograms(programs.map(p => p.id === programToDelete.id ? {
      ...p,
      isDeleted: true,
      deletedAt: now.toISOString(),
      deletedBy: "Current User", // In real app, get from auth context
      updatedAt: now.toISOString()
    } : p));
    
    setIsDeleteDialogOpen(false);
    const programTitle = programToDelete.title;
    setProgramToDelete(null);
    toast.success(`"${programTitle}" moved to trash. Will be permanently deleted in 7 days.`);
  };

  // Handle accept inquiry
  const handleAcceptInquiry = async (inquiryId: string) => {
    const inquiry = mockInquiries.find(i => i.id === inquiryId);
    if (!inquiry) return;
    
    setSelectedInquiryForResponse(inquiry);
    setCurrentTemplateType('acceptance');
    setTemplateSubject('Course Application Accepted - {courseCode}');
    setTemplateContent('Dear {participantName},\n\nWe are pleased to inform you that your application for {courseName} ({courseCode}) has been accepted.\n\nCourse Details:\n- Course Code: {courseCode}\n- Course Name: {courseName}\n- Trainer: {trainerName}\n- Start Date: {startDate}\n\nPlease confirm your attendance by replying to this email.\n\nBest regards,\nRWNA Training Team');
    setIsResponseTemplateDialogOpen(true);
  };

  // Handle reject inquiry
  const handleRejectInquiry = async (inquiryId: string) => {
    const inquiry = mockInquiries.find(i => i.id === inquiryId);
    if (!inquiry) return;
    
    setSelectedInquiryForResponse(inquiry);
    setCurrentTemplateType('rejection');
    setTemplateSubject('Course Application Status - {courseCode}');
    setTemplateContent('Dear {participantName},\n\nThank you for your interest in {courseName} ({courseCode}).\n\nUnfortunately, we are unable to accept your application at this time due to [reason].\n\nWe encourage you to apply for future sessions or consider our other training programs.\n\nBest regards,\nRWNA Training Team');
    setIsResponseTemplateDialogOpen(true);
  };

  // Handle send email
  const handleSendEmail = async () => {
    if (!emailContent || selectedParticipants.length === 0) {
      toast.error('Please enter a message and select participants');
      return;
    }

    try {
      // Here you would call the API to send WhatsApp messages
      const recipients = participants.filter(p => selectedParticipants.includes(p.id));
      
      // Simulate API call
      // await whatsappAPI.sendBulkMessage({
      //   recipients: recipients.map(p => p.phone),
      //   message: emailContent
      // });
      
      toast.success(`WhatsApp message sent successfully to ${recipients.length} participant(s)`);
      
      // Reset form and close dialog
      setEmailSubject('');
      setEmailContent('');
      setSelectedParticipants([]);
      setIsEmailDialogOpen(false);
    } catch (error) {
      toast.error('Failed to send email');
    }
  };

  // Handle settings update
  const handleUpdateSettings = async () => {
    if (!trainingSettings) return;
    
    try {
      // Here you would call the API to update settings
      // await settingsAPI.update(trainingSettings);
      
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  // Handle notification setting change
  const handleNotificationChange = (key: keyof TrainingSettings['notificationSettings'], value: boolean) => {
    if (!trainingSettings) return;
    
    setTrainingSettings({
      ...trainingSettings,
      notificationSettings: {
        ...trainingSettings.notificationSettings,
        [key]: value
      }
    });
  };

  // Handle auto response toggle
  const handleAutoResponseToggle = (enabled: boolean) => {
    if (!trainingSettings) return;
    
    setTrainingSettings({
      ...trainingSettings,
      autoResponseEnabled: enabled
    });
  };

  // Participant handlers
  const handleViewParticipant = (participant: TrainingParticipant) => {
    setViewingParticipant(participant);
    setIsParticipantViewDialogOpen(true);
  };

  const handleEditParticipant = (participant: TrainingParticipant) => {
    setEditingParticipant(participant);
    setIsParticipantEditDialogOpen(true);
  };

  const handleAddParticipant = () => {
    setEditingParticipant(null);
    setIsAddParticipantDialogOpen(true);
  };

  const handleSendParticipantEmail = (participant: TrainingParticipant) => {
    setSelectedParticipantForEmail(participant);
    setEmailSubject('');
    setEmailContent('');
    setIsParticipantEmailDialogOpen(true);
  };

  const handleIssueCertificate = (participant: TrainingParticipant) => {
    // Here you would call the API to issue certificate
    toast.success(`Certificate issued to ${participant.name}`);
  };

  // Handle template editing
  const handleEditTemplate = (type: 'acceptance' | 'rejection' | 'course_notification' | 'certificate') => {
    setEditingTemplateType(type);
    
    // Set default templates based on type
    switch (type) {
      case 'acceptance':
        setEditingTemplateSubject('Course Application Accepted - {courseCode}');
        setEditingTemplateContent('Dear {participantName},\n\nWe are pleased to inform you that your application for {courseName} ({courseCode}) has been accepted.\n\nCourse Details:\n- Course Code: {courseCode}\n- Course Name: {courseName}\n- Trainer: {trainerName}\n- Start Date: {startDate}\n\nPlease confirm your attendance by replying to this email.\n\nBest regards,\nRWNA Training Team');
        break;
      case 'rejection':
        setEditingTemplateSubject('Course Application Status - {courseCode}');
        setEditingTemplateContent('Dear {participantName},\n\nThank you for your interest in {courseName} ({courseCode}).\n\nUnfortunately, we are unable to accept your application at this time.\n\nWe encourage you to apply for future sessions or consider our other training programs.\n\nBest regards,\nRWNA Training Team');
        break;
      case 'course_notification':
        setEditingTemplateSubject('Course Update - {courseCode}');
        setEditingTemplateContent('Dear {participantName},\n\nWe have an important update regarding your course {courseName} ({courseCode}).\n\n[Course update details]\n\nIf you have any questions, please contact us.\n\nBest regards,\nRWNA Training Team');
        break;
      case 'certificate':
        setEditingTemplateSubject('Certificate of Completion - {courseCode}');
        setEditingTemplateContent('Dear {participantName},\n\nCongratulations! You have successfully completed {courseName} ({courseCode}).\n\nYour certificate is attached to this email.\n\nCourse Details:\n- Course Code: {courseCode}\n- Course Name: {courseName}\n- Trainer: {trainerName}\n- Completion Date: {startDate}\n\nThank you for your participation.\n\nBest regards,\nRWNA Training Team');
        break;
    }
    
    setIsTemplateEditDialogOpen(true);
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      const programData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : undefined,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        closeApplicationDate: formData.closeApplicationDate.toISOString(),
        trainingMapUrl: formData.trainingMapUrl,
        enrolled: editingProgram?.enrolled || 0
      };

      if (editingProgram) {
        // Update existing program
        const response = await trainingAPI.update(editingProgram.id, programData);
        
        if (response.error) {
          toast.error(response.error);
          return;
        }

        setPrograms(prev => prev.map(p => 
          p.id === editingProgram.id 
            ? { ...p, ...programData, id: editingProgram.id }
            : p
        ));
        toast.success('Training program updated successfully');
        setIsEditDialogOpen(false);
      } else {
        // Create new program
        const response = await trainingAPI.create(programData);
        
        if (response.error) {
          toast.error(response.error);
          return;
        }

        const newProgram: TrainingProgram = {
          id: `t${Date.now()}`,
          ...programData,
          enrolled: 0,
          prerequisites: []
        };

        setPrograms(prev => [newProgram, ...prev]);
        toast.success('Training program created successfully');
        setIsCreateDialogOpen(false);
      }

      resetForm();
      setEditingProgram(null);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to save training program');
    } finally {
      setIsLoading(false);
    }
  };

  // Program Column Definitions
  const programColumns: ColumnDef[] = [
    {
      header: "Code",
      accessorKey: "code",
      cell: (item: TrainingProgram) => (
        <div className="font-mono text-sm font-medium">{item.code}</div>
      )
    },
    {
      header: "Program",
      accessorKey: "title",
      cell: (item: TrainingProgram) => (
        <div className="flex flex-col">
          <span className="font-medium">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.duration}</span>
        </div>
      )
    },
    {
      header: "Enrollment",
      accessorKey: "enrolled",
      cell: (item: TrainingProgram) => {
        const percentage = (item.enrolled / item.capacity) * 100;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3" />
              <span className="text-sm">{item.enrolled}/{item.capacity}</span>
            </div>
            <Progress value={percentage} className="h-1" />
          </div>
        );
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: TrainingProgram) => {
        const variants: Record<string, string> = {
          active: "bg-green-500/10 text-green-600 border-green-500/20",
          scheduled: "bg-blue-500/10 text-blue-600 border-blue-500/20",
          archived: "bg-gray-500/10 text-gray-600 border-gray-500/20",
        };
        return (
          <Badge variant="outline" className={variants[item.status] || ""}>
            {item.status.toUpperCase()}
          </Badge>
        );
      }
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (item: TrainingProgram) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleView(item)}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(item)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Program
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => handleDelete(item)}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  // Inquiry Column Definitions (for Applications tab)
  const inquiryColumns: ColumnDef[] = [
    {
      header: "Applicant",
      accessorKey: "name",
      cell: (item: Inquiry) => (
        <div className="flex flex-col">
          <span className="font-medium">{item.name}</span>
          <span className="text-xs text-muted-foreground">{item.email}</span>
        </div>
      )
    },
    {
      header: "Course",
      accessorKey: "course",
      cell: (item: Inquiry) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">WLD-001</span>
          <span className="text-xs text-muted-foreground">Advanced Welding Techniques</span>
        </div>
      )
    },
    {
      header: "Received",
      accessorKey: "receivedAt",
      cell: (item: Inquiry) => new Date(item.receivedAt).toLocaleDateString()
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: Inquiry) => {
        const variants: Record<string, string> = {
          new: "bg-blue-500/10 text-blue-600",
          "in-progress": "bg-amber-500/10 text-amber-600",
          resolved: "bg-green-500/10 text-green-600",
        };
        return (
          <Badge variant="outline" className={variants[item.status] || ""}>
            {item.status.toUpperCase()}
          </Badge>
        );
      }
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (item: Inquiry) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => handleAcceptInquiry(item.id)}
              className="text-green-600"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleRejectInquiry(item.id)}
              className="text-red-600"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  // Participant Column Definitions
  const participantColumns: ColumnDef[] = [
    {
      header: "Select",
      accessorKey: "select",
      cell: (item: TrainingParticipant) => (
        <input
          type="checkbox"
          checked={selectedParticipants.includes(item.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedParticipants(prev => [...prev, item.id]);
            } else {
              setSelectedParticipants(prev => prev.filter(id => id !== item.id));
            }
          }}
          className="rounded border-gray-300"
        />
      )
    },
    {
      header: "Participant",
      accessorKey: "name",
      cell: (item: TrainingParticipant) => (
        <div className="flex flex-col">
          <span className="font-medium">{item.name}</span>
          <span className="text-xs text-muted-foreground">{item.email}</span>
          <span className="text-xs text-muted-foreground">{item.company}</span>
        </div>
      )
    },
    {
      header: "Enrolled Courses",
      accessorKey: "enrolledCourses",
      cell: (item: TrainingParticipant) => (
        <div className="space-y-1">
          {item.enrolledCourses.map((course, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm font-medium">{course.courseCode}</span>
              <span className="text-xs text-muted-foreground">{course.programName}</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={course.status === 'completed' ? 'default' : course.status === 'enrolled' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {course.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{course.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      header: "Progress",
      accessorKey: "progress",
      cell: (item: TrainingParticipant) => {
        const avgProgress = item.enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / item.enrolledCourses.length;
        return (
          <div className="flex flex-col items-center">
            <div className="w-full bg-muted rounded-full h-2 mb-1">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${avgProgress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{Math.round(avgProgress)}%</span>
          </div>
        )
      }
    },
    {
      header: "Completed",
      accessorKey: "totalCoursesCompleted",
      cell: (item: TrainingParticipant) => (
        <div className="text-center">
          <span className="font-medium">{item.totalCoursesCompleted}</span>
          <span className="text-muted-foreground">/{item.enrolledCourses.length}</span>
        </div>
      )
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (item: TrainingParticipant) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewParticipant(item)}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSendParticipantEmail(item)}>
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEditParticipant(item)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="p-6 space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training Management</h1>
          <p className="text-muted-foreground">
            Manage industrial courses, certifications, and participant applications.
            <span className="ml-2 text-sm font-medium text-primary">
              (Showing {filteredPrograms.length} of {programs.length} entries)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs by code or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          <Button onClick={handleCreate} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Programs</p>
                <p className="text-2xl font-bold">{stats.totalPrograms}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold text-green-600">{stats.activePrograms}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Enrollment</p>
                <p className="text-2xl font-bold">{stats.totalEnrolled} <span className="text-xs text-muted-foreground font-normal">/ {stats.totalCapacity}</span></p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Inquiries</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pendingInquiries}</p>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-full">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Course Directory
          </TabsTrigger>
          <TabsTrigger value="participants" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Participants
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Inquiries
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="programs" className="mt-0 border-none p-0">
            <Card className="border-border/50">
              <CardHeader className="px-6">
                <CardTitle>Training Programs</CardTitle>
                <CardDescription>
                  Manage your curriculum of on-site machining and safety training modules.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <DataTable 
                  data={filteredPrograms}
                  columns={programColumns}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="mt-0 border-none p-0">
            <Card className="border-border/50">
              <CardHeader className="px-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Training Participants</CardTitle>
                  <CardDescription>
                    Manage enrolled participants and their course progress.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEmailDialogOpen(true)}
                    disabled={selectedParticipants.length === 0}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send WhatsApp ({selectedParticipants.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedParticipants.length === participants.length) {
                        setSelectedParticipants([]);
                      } else {
                        setSelectedParticipants(participants.map(p => p.id));
                      }
                    }}
                  >
                    {selectedParticipants.length === participants.length ? 'Deselect All' : 'Select All'}
                  </Button>
                  <Button size="sm" onClick={handleAddParticipant}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Participant
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <DataTable 
                  data={participants}
                  columns={participantColumns}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="mt-0 border-none p-0">
            <Card className="border-border/50">
              <CardHeader className="px-6">
                <CardTitle>Participant Inquiries</CardTitle>
                <CardDescription>
                  Leads and requests specifically related to training programs and certifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <DataTable 
                  data={mockInquiries.filter(i => i.subject.toLowerCase().includes('training'))}
                  columns={inquiryColumns}
                  searchPlaceholder="Search by name or subject..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Training Settings</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Configure email templates and notification settings for training programs and participant communications.
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
                          sendByEmail ? 'bg-primary/80' : 'bg-muted-foreground/30'
                        }`}
                        onClick={() => setSendByEmail(!sendByEmail)}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                          sendByEmail ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                      <Label className="text-sm font-medium">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                          sendByWhatsApp ? 'bg-primary/80' : 'bg-muted-foreground/30'
                        }`}
                        onClick={() => setSendByWhatsApp(!sendByWhatsApp)}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                          sendByWhatsApp ? 'translate-x-6' : 'translate-x-1'
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
                    
                    {/* Acceptance Template */}
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h5 className="font-medium">Acceptance Template</h5>
                          <p className="text-xs text-muted-foreground">When accepting participant to the course</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('acceptance')}>
                        Edit Template
                      </Button>
                    </div>
                    
                    {/* Rejection Template */}
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                          <XCircle className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <h5 className="font-medium">Rejection Template</h5>
                          <p className="text-xs text-muted-foreground">When rejecting participant from the course</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('rejection')}>
                        Edit Template
                      </Button>
                    </div>
                    
                    {/* Course Notification Template */}
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-medium">Course Notification</h5>
                          <p className="text-xs text-muted-foreground">General course updates and notifications</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('course_notification')}>
                        Edit Template
                      </Button>
                    </div>
                    
                    {/* Certificate Completion Template */}
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <Award className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <h5 className="font-medium">Certificate Completion</h5>
                          <p className="text-xs text-muted-foreground">When participant completes course and receives certificate</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditTemplate('certificate')}>
                        Edit Template
                      </Button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
          setEditingProgram(null);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProgram ? 'Edit Training Program' : 'Create New Training Program'}
            </DialogTitle>
            <DialogDescription>
              {editingProgram ? 'Update the training program details' : 'Add a new training program to your curriculum'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Program Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="e.g., OSM-101"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="title">Program Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., On-Site Machining Fundamentals"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed program description..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 5 days"
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                placeholder="Maximum participants"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., RWNA Training Center"
              />
            </div>
            <div>
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                placeholder="Lead instructor name"
              />
            </div>
            <div>
              <Label htmlFor="price">Price (RM)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Program fee"
              />
            </div>
            <div>
              <Label>Close Application By</Label>
              <DateTimePicker
                date={formData.startDate}
                onDateChange={(date) => setFormData(prev => ({ ...prev, startDate: date || new Date() }))}
                placeholder="Select application close date and time"
              />
            </div>
            <div>
              <Label>Start Training Date</Label>
              <DatePicker
                date={formData.endDate}
                onDateChange={(date: Date | undefined) => setFormData(prev => ({ ...prev, endDate: date || new Date() }))}
                placeholder="Select training start date"
              />
            </div>
            <div>
              <Label>End Training Date</Label>
              <DatePicker
                date={formData.closeApplicationDate || new Date()}
                onDateChange={(date: Date | undefined) => setFormData(prev => ({ ...prev, closeApplicationDate: date || new Date() }))}
                placeholder="Select training end date"
              />
            </div>
            <div>
              <Label htmlFor="trainingMapUrl">Training Map URL</Label>
              <Input
                id="trainingMapUrl"
                value={formData.trainingMapUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, trainingMapUrl: e.target.value }))}
                placeholder="e.g., https://maps.google.com/..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              setEditingProgram(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Saving...' : (editingProgram ? 'Update Program' : 'Create Program')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {viewingProgram?.title}
            </DialogTitle>
            <DialogDescription>
              Program Code: {viewingProgram?.code}
            </DialogDescription>
          </DialogHeader>

          {viewingProgram && (
            <div className="space-y-6">
              {/* Program Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Enrollment</span>
                    </div>
                    <div className="text-2xl font-bold">{viewingProgram.enrolled}/{viewingProgram.capacity}</div>
                    <Progress value={(viewingProgram.enrolled / viewingProgram.capacity) * 100} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <div className="text-2xl font-bold">{viewingProgram.duration}</div>
                    <div className="text-xs text-muted-foreground mt-1">{viewingProgram.location}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium">Price</span>
                    </div>
                    <div className="text-2xl font-bold">RM {viewingProgram.price?.toLocaleString() || 'TBA'}</div>
                    <div className="text-xs text-muted-foreground mt-1">Per participant</div>
                  </CardContent>
                </Card>
              </div>

              {/* Program Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Program Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="text-muted-foreground mt-1">{viewingProgram.description}</p>
                    </div>
                    <div>
                      <span className="font-medium">Instructor:</span>
                      <p className="text-muted-foreground">{viewingProgram.instructor}</p>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <Badge variant="outline" className="ml-2">
                        {viewingProgram.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Schedule</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Start Date:</span>
                      <p className="text-muted-foreground">{viewingProgram.startDate ? new Date(viewingProgram.startDate).toLocaleString() : 'TBA'}</p>
                    </div>
                    <div>
                      <span className="font-medium">End Date:</span>
                      <p className="text-muted-foreground">{viewingProgram.endDate ? new Date(viewingProgram.endDate).toLocaleString() : 'TBA'}</p>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-muted-foreground">{viewingProgram.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participants List */}
              <div>
                <h3 className="font-semibold mb-3">Participants ({(participants || []).filter(p => p.enrolledCourses.some(c => c.courseCode === viewingProgram.code)).length})</h3>
                {(participants || []).filter(p => p.enrolledCourses.some(c => c.courseCode === viewingProgram.code)).length > 0 ? (
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-1 gap-0 divide-y">
                      {(participants || []).filter(p => p.enrolledCourses.some(c => c.courseCode === viewingProgram.code)).map((participant: TrainingParticipant) => (
                        <div key={participant.id} className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <UserCheck className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{participant.name}</div>
                              <div className="text-sm text-muted-foreground">{participant.company} • {participant.position}</div>
                              <div className="text-xs text-muted-foreground">{participant.email}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            {(() => {
                              const course = participant.enrolledCourses.find(c => c.courseCode === viewingProgram.code);
                              if (!course) return null;
                              return (
                                <>
                                  <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                                    {course.status}
                                  </Badge>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Progress: {course.progress}%
                                  </div>
                                  {course.certificateIssued && (
                                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                      <Award className="w-3 h-3" />
                                      Certificate Issued
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No participants enrolled yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {viewingProgram && (
              <Button onClick={() => {
                setIsViewDialogOpen(false);
                handleEdit(viewingProgram);
              }}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Program
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Send WhatsApp Message to Participants</DialogTitle>
            <DialogDescription>
              Send WhatsApp message to {selectedParticipants.length} selected participant(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">

            <div>
              <Label htmlFor="whatsapp-message">WhatsApp Message</Label>
              <Textarea
                id="whatsapp-message"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Enter your WhatsApp message..."
                rows={8}
              />
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg mt-2">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 <strong>Tip:</strong> WhatsApp messages work best when they're concise and personal. 
                  Consider including course details and next steps.
                </p>
              </div>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <h4 className="font-medium mb-2">Recipients:</h4>
              <div className="space-y-1">
                {selectedParticipants.map(id => {
                  const participant = participants.find(p => p.id === id);
                  return participant ? (
                    <div key={id} className="text-sm">
                      {participant.name} ({participant.email})
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={!emailContent}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Send WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Participant View Dialog */}
      <Dialog open={isParticipantViewDialogOpen} onOpenChange={setIsParticipantViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Participant Details</DialogTitle>
            <DialogDescription>
              View participant information and course progress
            </DialogDescription>
          </DialogHeader>
          {viewingParticipant && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm">{viewingParticipant.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{viewingParticipant.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm">{viewingParticipant.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Company</Label>
                  <p className="text-sm">{viewingParticipant.company}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Enrolled Courses</Label>
                <div className="mt-2 space-y-3">
                  {viewingParticipant.enrolledCourses.map((course, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{course.courseCode}</p>
                          <p className="text-sm text-muted-foreground">{course.programName}</p>
                        </div>
                        <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                      
                      {/* Progress Details */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Date Information */}
                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="font-medium">Enrolled:</span>
                          <p>{new Date(course.enrollmentDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="font-medium">Last Activity:</span>
                          <p>{viewingParticipant.lastActivity ? new Date(viewingParticipant.lastActivity).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        {course.status === 'completed' && (
                          <div>
                            <span className="font-medium">Completed:</span>
                            <p>{new Date(course.enrollmentDate).toLocaleDateString()}</p>
                          </div>
                        )}
                        {course.grade && (
                          <div>
                            <span className="font-medium">Grade:</span>
                            <p className="font-medium text-foreground">{course.grade}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Course Status Management for Incomplete Courses */}
                      {course.status !== 'completed' && (
                        <div className="pt-2 border-t space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Course Status</Label>
                            <Select value={courseStatus} onValueChange={setCourseStatus}>
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="participate">Participate</SelectItem>
                                <SelectItem value="dropped">Dropped (Participant Request)</SelectItem>
                                <SelectItem value="removed">Removed (By Trainer)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {/* Reason field - only shown when dropped or removed */}
                          {(courseStatus === 'dropped' || courseStatus === 'removed') && (
                            <div className="space-y-2">
                              <Label htmlFor="status-reason" className="text-sm">
                                Reason {courseStatus === 'removed' ? '(Required)' : '(Optional)'}
                              </Label>
                              <Textarea
                                id="status-reason"
                                placeholder={`Enter reason for ${courseStatus === 'dropped' ? 'dropping' : 'removing'} participant...`}
                                rows={2}
                                className="text-sm"
                                required={courseStatus === 'removed'}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Certificate Status & Action */}
                      {course.status === 'completed' && (
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2">
                            {course.certificateIssued ? (
                              <>
                                <Award className="w-4 h-4 text-amber-500" />
                                <span className="text-sm text-amber-600 font-medium">Certificate Issued</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-orange-500" />
                                <span className="text-sm text-orange-600">Certificate Pending</span>
                              </>
                            )}
                          </div>
                          {!course.certificateIssued && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                // Update the course to mark certificate as issued
                                const updatedParticipant = {
                                  ...viewingParticipant,
                                  enrolledCourses: viewingParticipant.enrolledCourses.map(c => 
                                    c.courseCode === course.courseCode 
                                      ? { ...c, certificateIssued: true }
                                      : c
                                  )
                                };
                                setViewingParticipant(updatedParticipant);
                                toast.success(`Certificate issued for ${course.courseCode}`);
                              }}
                            >
                              <Award className="w-3 h-3 mr-1" />
                              Issue Certificate
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsParticipantViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Participant Edit Dialog */}
      <Dialog open={isParticipantEditDialogOpen} onOpenChange={setIsParticipantEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Participant</DialogTitle>
            <DialogDescription>
              Update participant information and course enrollment
            </DialogDescription>
          </DialogHeader>
          {editingParticipant && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input 
                    id="edit-name" 
                    defaultValue={editingParticipant.name}
                    placeholder="Enter participant name" 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    defaultValue={editingParticipant.email}
                    placeholder="Enter email address" 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input 
                    id="edit-phone" 
                    defaultValue={editingParticipant.phone}
                    placeholder="Enter phone number" 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-company">Company</Label>
                  <Input 
                    id="edit-company" 
                    defaultValue={editingParticipant.company}
                    placeholder="Enter company name" 
                  />
                </div>
                <div>
                  <Label htmlFor="edit-position">Position</Label>
                  <Input 
                    id="edit-position" 
                    defaultValue={editingParticipant.position}
                    placeholder="Enter job position" 
                  />
                </div>
              </div>
              
              <div>
                <Label>Enrolled Courses</Label>
                <div className="space-y-2 mt-2">
                  {editingParticipant.enrolledCourses.map((course, index) => (
                    <div key={index} className="border rounded p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{course.courseCode} - {course.programName}</p>
                        <p className="text-sm text-muted-foreground">Progress: {course.progress}%</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <X className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsParticipantEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Participant updated successfully');
              setIsParticipantEditDialogOpen(false);
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Update Participant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Participant Email Dialog */}
      <Dialog open={isParticipantEmailDialogOpen} onOpenChange={setIsParticipantEmailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Send Email to Participant</DialogTitle>
            <DialogDescription>
              Send email to {selectedParticipantForEmail?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="participant-email-subject">Subject</Label>
              <Input
                id="participant-email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div>
              <Label htmlFor="participant-email-content">Message</Label>
              <Textarea
                id="participant-email-content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Enter your message here..."
                rows={8}
              />
            </div>
            {selectedParticipantForEmail && (
              <div className="bg-muted p-3 rounded-lg">
                <h4 className="font-medium mb-2">Recipient:</h4>
                <div className="text-sm">
                  {selectedParticipantForEmail.name} ({selectedParticipantForEmail.email})
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsParticipantEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedParticipantForEmail) {
                  toast.success(`Email sent to ${selectedParticipantForEmail.name}`);
                  setIsParticipantEmailDialogOpen(false);
                  setEmailSubject('');
                  setEmailContent('');
                }
              }} 
              disabled={!emailSubject || !emailContent}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Participant Dialog */}
      <Dialog open={isAddParticipantDialogOpen} onOpenChange={setIsAddParticipantDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Participant</DialogTitle>
            <DialogDescription>
              Add a new participant to the training program
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="participant-name">Name</Label>
              <Input id="participant-name" placeholder="Enter participant name" />
            </div>
            <div>
              <Label htmlFor="participant-email">Email</Label>
              <Input id="participant-email" type="email" placeholder="Enter email address" />
            </div>
            <div>
              <Label htmlFor="participant-phone">Phone</Label>
              <Input id="participant-phone" placeholder="Enter phone number" />
            </div>
            <div>
              <Label htmlFor="participant-company">Company</Label>
              <Input id="participant-company" placeholder="Enter company name" />
            </div>
            <div>
              <Label htmlFor="participant-position">Position</Label>
              <Input id="participant-position" placeholder="Enter job position" />
            </div>
            <div>
              <Label htmlFor="participant-course">Course</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WLD-001">WLD-001 - Advanced Welding Techniques</SelectItem>
                  <SelectItem value="SAF-002">SAF-002 - Industrial Safety Protocols</SelectItem>
                  <SelectItem value="MCH-003">MCH-003 - Precision Machining</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddParticipantDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Participant added successfully');
              setIsAddParticipantDialogOpen(false);
            }}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Participant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Response Template Dialog */}
      <Dialog open={isResponseTemplateDialogOpen} onOpenChange={setIsResponseTemplateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentTemplateType === 'acceptance' ? 'Acceptance' : 
               currentTemplateType === 'rejection' ? 'Rejection' : 
               currentTemplateType === 'course_notification' ? 'Course Notification' : 'Certificate'} Response Template
            </DialogTitle>
            <DialogDescription>
              Customize the response template and add extra information before sending to the participant
            </DialogDescription>
          </DialogHeader>
          
          {/* Participant Info */}
          {selectedInquiryForResponse && (
            <div className="bg-muted p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-2">Participant Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {selectedInquiryForResponse.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {selectedInquiryForResponse.email}
                </div>
                <div>
                  <span className="font-medium">Course:</span> WLD-001 - Advanced Welding Techniques
                </div>
                <div>
                  <span className="font-medium">Applied:</span> {new Date(selectedInquiryForResponse.receivedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
          
          <Tabs value={responseTemplateTab} onValueChange={(value) => setResponseTemplateTab(value as 'write' | 'preview')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="write">Writing Response</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="write" className="space-y-6 mt-6">
              {/* Template Variables */}
              <div className="bg-muted/50 p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Available Variables</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{participantName}'}</code> - Participant's name</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{courseCode}'}</code> - Course code (e.g., WLD-001)</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{courseName}'}</code> - Course name</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{trainerName}'}</code> - Trainer's name</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{startDate}'}</code> - Course start date</div>
                </div>
              </div>
              
              {/* Subject */}
              <div>
                <Label htmlFor="template-subject">Subject</Label>
                <Input
                  id="template-subject"
                  value={templateSubject}
                  onChange={(e) => setTemplateSubject(e.target.value)}
                  placeholder="Enter subject"
                />
              </div>
              
              {/* Response */}
              <div>
                <Label htmlFor="template-content">Response</Label>
                <Textarea
                  id="template-content"
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  placeholder="Enter response content..."
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6 mt-6">
              {/* Preview */}
              <div>
                <Label>Preview (with variables replaced)</Label>
                <div className="bg-muted/30 p-4 rounded-lg border">
                  <div className="font-medium mb-2">
                    Subject: {templateSubject
                      .replace('{participantName}', selectedInquiryForResponse?.name || 'John Doe')
                      .replace('{courseCode}', 'WLD-001')
                      .replace('{courseName}', 'Advanced Welding Techniques')
                      .replace('{trainerName}', 'Ahmad Hassan')
                      .replace('{startDate}', '2026-03-01')}
                  </div>
                  <div className="text-sm whitespace-pre-wrap">
                    {templateContent
                      .replace('{participantName}', selectedInquiryForResponse?.name || 'John Doe')
                      .replace('{courseCode}', 'WLD-001')
                      .replace('{courseName}', 'Advanced Welding Techniques')
                      .replace('{trainerName}', 'Ahmad Hassan')
                      .replace('{startDate}', '2026-03-01')}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResponseTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              if (selectedInquiryForResponse) {
                const action = currentTemplateType === 'acceptance' ? 'accepted' : 'rejected';
                toast.success(`Inquiry ${action} and email sent to ${selectedInquiryForResponse.name}`);
                setIsResponseTemplateDialogOpen(false);
              }
            }}>
              <Send className="w-4 h-4 mr-2" />
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Edit Dialog */}
      <Dialog open={isTemplateEditDialogOpen} onOpenChange={setIsTemplateEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit {editingTemplateType === 'acceptance' ? 'Acceptance' : 
                   editingTemplateType === 'rejection' ? 'Rejection' : 
                   editingTemplateType === 'course_notification' ? 'Course Notification' : 'Certificate'} Template
            </DialogTitle>
            <DialogDescription>
              Customize the template content and variables for automated responses
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Template Variables Guide */}
            <div className="bg-muted/50 p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Available Variables</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{participantName}'}</code> - Participant's name</div>
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{courseCode}'}</code> - Course code (e.g., WLD-001)</div>
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{courseName}'}</code> - Course name</div>
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{trainerName}'}</code> - Trainer's name</div>
                <div><code className="bg-muted px-2 py-1 rounded text-xs font-mono">{'{startDate}'}</code> - Course start date</div>
              </div>
            </div>
            
            {/* Email Subject */}
            <div>
              <Label htmlFor="edit-template-subject">Email Subject</Label>
              <Input
                id="edit-template-subject"
                value={editingTemplateSubject}
                onChange={(e) => setEditingTemplateSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            
            {/* Email Content */}
            <div>
              <Label htmlFor="edit-template-content">Email Content</Label>
              <Textarea
                id="edit-template-content"
                value={editingTemplateContent}
                onChange={(e) => setEditingTemplateContent(e.target.value)}
                placeholder="Enter email content..."
                rows={15}
                className="font-mono text-sm"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTemplateEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success(`${editingTemplateType} template updated successfully`);
              setIsTemplateEditDialogOpen(false);
            }}>
              <Settings className="w-4 h-4 mr-2" />
              Save Template
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
              Are you sure you want to move "{programToDelete?.title}" to trash?
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
                      Training program will be moved to trash
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
    </motion.div>
  );
}