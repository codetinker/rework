import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  LayoutGrid, 
  Search, 
  Filter, 
  MoreVertical,
  HardHat,
  MapPin,
  Building2,
  Calendar,
  Trash2,
  Edit
} from 'lucide-react';
import { Project } from '@/lib/index';
import { projectsAPI, mockProjects, mockClients } from '@/services/mockData';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAll();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    setCurrentProject({
      title: '',
      client: '',
      category: 'Onshore',
      status: 'planned',
      location: '',
      description: '',
      imageKey: 'PROJECT_1'
    });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = async (project: Project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      const success = await projectsAPI.delete(project.id);
      if (success) {
        setProjects(prev => prev.filter(p => p.id !== project.id));
        toast.success('Project deleted successfully');
      }
    }
  };

  const handleSaveProject = async () => {
    if (!currentProject?.title || !currentProject?.client) {
      toast.error('Please fill in required fields');
      return;
    }

    if (currentProject.id) {
      // Update existing
      await projectsAPI.update(currentProject.id, currentProject);
      setProjects(prev => prev.map(p => p.id === currentProject.id ? { ...p, ...currentProject } as Project : p));
      toast.success('Project updated successfully');
    } else {
      // Add new
      const newProject: Project = {
        ...currentProject as Project,
        id: `p${Date.now()}`,
      };
      setProjects(prev => [newProject, ...prev]);
      toast.success('New project added successfully');
    }
    setIsDialogOpen(false);
  };

  const columns = [
    {
      accessorKey: 'title',
      header: 'Project Title',
      cell: (item: Project) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{item.title}</span>
          <span className="text-xs text-muted-foreground">ID: {item.id}</span>
        </div>
      ),
    },
    {
      accessorKey: 'client',
      header: 'Client',
      cell: (item: Project) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span>{item.client}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: (item: Project) => (
        <Badge variant="outline" className="bg-secondary/50 font-medium">
          {item.category}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (item: Project) => {
        const status = item.status;
        return (
          <Badge 
            className={`capitalize ${
              status === 'completed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 
              status === 'ongoing' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
              'bg-blue-500/10 text-blue-600 border-blue-500/20'
            }`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: (item: Project) => (
        <div className="flex items-center gap-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          {item.location}
        </div>
      ),
    }
  ];

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HardHat className="h-8 w-8 text-primary" />
            Project Portfolio
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage on-site machining, subsea, and offshore engineering projects.
            <span className="ml-2 text-sm font-medium text-primary">
              (Showing {filteredProjects.length} of {projects.length} entries)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search project name, client, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          <Button onClick={handleAddProject} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Total Projects</div>
          <div className="text-2xl font-bold">{projects.length}</div>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Active Operations</div>
          <div className="text-2xl font-bold text-amber-600">
            {projects.filter(p => p.status === 'ongoing').length}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Completed Handover</div>
          <div className="text-2xl font-bold text-emerald-600">
            {projects.filter(p => p.status === 'completed').length}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <DataTable 
          data={filteredProjects} 
          columns={columns} 
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
          title="Projects List"
        />
      </div>

      {/* Project Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentProject?.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              Fill in the details for the project profile. All changes will be updated on the main website.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Project Title</Label>
              <Input 
                id="title" 
                className="col-span-3" 
                value={currentProject?.title || ''}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">Client Name</Label>
              <Select 
                value={currentProject?.client || ''} 
                onValueChange={(val) => setCurrentProject(prev => ({ ...prev, client: val }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map(client => (
                    <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select 
                value={currentProject?.category || 'Onshore'} 
                onValueChange={(val) => setCurrentProject(prev => ({ ...prev, category: val as any }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Offshore">Offshore</SelectItem>
                  <SelectItem value="Onshore">Onshore</SelectItem>
                  <SelectItem value="Subsea">Subsea</SelectItem>
                  <SelectItem value="Fabrication">Fabrication</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select 
                value={currentProject?.status || 'planned'} 
                onValueChange={(val) => setCurrentProject(prev => ({ ...prev, status: val as any }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input 
                id="location" 
                className="col-span-3" 
                value={currentProject?.location || ''}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea 
                id="description" 
                className="col-span-3" 
                rows={4}
                value={currentProject?.description || ''}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProject}>Save Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
