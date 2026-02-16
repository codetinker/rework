import React, { useState, useEffect } from "react";
import { 
  Trash as TrashIcon,
  RotateCcw,
  AlertTriangle,
  Calendar,
  Eye,
  MoreVertical,
  Search,
  Filter,
  Wrench,
  Waves,
  Shield,
  Cog,
  Zap,
  Drill,
  Settings,
  Award,
  FileText,
  Briefcase,
  GraduationCap,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

/**
 * Centralized Trash Management Page
 * All deleted items from different modules are managed here
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

interface TrashItem {
  id: string;
  title: string;
  type: 'service' | 'news' | 'career' | 'training' | 'client' | 'project';
  category?: string;
  shortDescription?: string;
  iconType?: string;
  isDeleted: boolean;
  deletedAt: string;
  deletedBy: string;
  originalData: any; // Store original item data for restoration
}

// Mock trash data from different modules
const mockTrashItems: TrashItem[] = [
  {
    id: "trash_1",
    title: "Cold Cutting & Bevelling",
    type: "service",
    category: "On-site Machining Services",
    shortDescription: "RWNA caters to your onshore or offshore on-site machining needs for cold cutting and bevelling.",
    iconType: "wrench",
    isDeleted: true,
    deletedAt: "2026-02-15T10:30:00Z",
    deletedBy: "Admin User",
    originalData: { /* original service data */ }
  },
  {
    id: "trash_2", 
    title: "RWNA Engineering Wins Major Contract",
    type: "news",
    shortDescription: "RWNA Engineering has been awarded a significant contract for offshore platform maintenance.",
    isDeleted: true,
    deletedAt: "2026-02-14T14:20:00Z",
    deletedBy: "Content Manager",
    originalData: { /* original news data */ }
  },
  {
    id: "trash_3",
    title: "Senior Mechanical Engineer",
    type: "career",
    shortDescription: "We are looking for an experienced Senior Mechanical Engineer to join our team.",
    isDeleted: true,
    deletedAt: "2026-02-13T09:15:00Z",
    deletedBy: "HR Manager",
    originalData: { /* original job data */ }
  },
  {
    id: "trash_4",
    title: "Welding Safety Training Program",
    type: "training",
    shortDescription: "Comprehensive welding safety training for offshore operations.",
    isDeleted: true,
    deletedAt: "2026-02-12T16:45:00Z",
    deletedBy: "Training Coordinator",
    originalData: { /* original training data */ }
  },
  {
    id: "trash_5",
    title: "Petronas Malaysia",
    type: "client",
    shortDescription: "Major oil and gas company client profile.",
    isDeleted: true,
    deletedAt: "2026-02-11T11:30:00Z",
    deletedBy: "Account Manager",
    originalData: { /* original client data */ }
  }
];

export default function Trash() {
  const [trashItems, setTrashItems] = useState<TrashItem[]>(mockTrashItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter trash items
  const filteredItems = trashItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                         (item.category?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  // Get type badge
  const getTypeBadge = (type: string) => {
    const typeConfig = {
      service: { label: 'Service', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      news: { label: 'News', color: 'bg-green-100 text-green-800 border-green-200' },
      career: { label: 'Career', color: 'bg-purple-100 text-purple-800 border-purple-200' },
      training: { label: 'Training', color: 'bg-orange-100 text-orange-800 border-orange-200' },
      client: { label: 'Client', color: 'bg-pink-100 text-pink-800 border-pink-200' },
      project: { label: 'Project', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.service;
    return (
      <Badge className={`${config.color} border`}>
        {config.label}
      </Badge>
    );
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      service: <Wrench className="h-4 w-4" />,
      news: <FileText className="h-4 w-4" />,
      career: <Briefcase className="h-4 w-4" />,
      training: <GraduationCap className="h-4 w-4" />,
      client: <Users className="h-4 w-4" />,
      project: <Cog className="h-4 w-4" />
    };
    return iconMap[type] || <FileText className="h-4 w-4" />;
  };

  // Get service icon (for services only)
  const getServiceIcon = (iconType?: string) => {
    if (!iconType) return <Wrench className="h-5 w-5" />;
    
    const iconMap: Record<string, React.ReactNode> = {
      wrench: <Wrench className="h-5 w-5" />,
      waves: <Waves className="h-5 w-5" />,
      shield: <Shield className="h-5 w-5" />,
      cog: <Cog className="h-5 w-5" />,
      zap: <Zap className="h-5 w-5" />,
      drill: <Drill className="h-5 w-5" />,
      settings: <Settings className="h-5 w-5" />,
      award: <Award className="h-5 w-5" />,
    };
    return iconMap[iconType] || <Wrench className="h-5 w-5" />;
  };

  // Calculate days until auto-deletion (7 days from deletion)
  const getDaysLeft = (deletedAt: string) => {
    const deletedDate = new Date(deletedAt);
    const autoDeleteDate = new Date(deletedDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const daysLeft = Math.ceil((autoDeleteDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
  };

  // Handle restore item
  const handleRestoreItem = (itemId: string) => {
    const item = trashItems.find(i => i.id === itemId);
    if (!item) return;

    // In real app, this would call the appropriate API to restore the item
    // For now, just remove from trash
    setTrashItems(trashItems.filter(i => i.id !== itemId));
    toast.success(`"${item.title}" restored successfully.`);
  };

  // Handle view item details
  const handleViewItem = (item: TrashItem) => {
    // In real app, this would open a view dialog with item details
    toast.info(`Viewing details for "${item.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <TrashIcon className="h-8 w-8" />
              Trash
            </h1>
            <p className="text-muted-foreground">
              Centralized trash management for all deleted items. Items will be permanently deleted after 7 days.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {['service', 'news', 'career', 'training', 'client', 'project'].map(type => {
          const count = trashItems.filter(item => item.type === type).length;
          return (
            <Card key={type} className="p-4">
              <div className="flex items-center gap-2">
                {getTypeIcon(type)}
                <div>
                  <p className="text-sm font-medium capitalize">{type}s</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search trash items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="service">Services</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="career">Career</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="client">Clients</SelectItem>
            <SelectItem value="project">Projects</SelectItem>
          </SelectContent>
        </Select>
        {(typeFilter !== 'all' || searchQuery) && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setTypeFilter('all');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Trash Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const daysLeft = getDaysLeft(item.deletedAt);
            
            return (
              <Card key={item.id} className="group border-destructive/20 bg-destructive/5">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                        {item.type === 'service' ? getServiceIcon(item.iconType) : getTypeIcon(item.type)}
                      </div>
                      <div className="flex flex-col">
                        <CardTitle className="text-lg leading-tight text-destructive">
                          {item.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {getTypeBadge(item.type)}
                          {item.category && (
                            <span className="text-xs text-muted-foreground truncate">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRestoreItem(item.id)}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restore
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewItem(item)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive font-medium">
                      {daysLeft > 0 ? `Deletes in ${daysLeft} day${daysLeft === 1 ? '' : 's'}` : 'Deleting soon'}
                    </span>
                  </div>
                  
                  {item.shortDescription && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.shortDescription}
                    </p>
                  )}
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Deleted: {new Date(item.deletedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3" />
                      <span>By: {item.deletedBy}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleRestoreItem(item.id)}
                      className="w-full"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <TrashIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery || typeFilter !== 'all' ? 'No items found' : 'Trash is empty'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || typeFilter !== 'all' 
              ? "Try adjusting your search criteria or filters."
              : "Deleted items from all modules will appear here and be automatically removed after 7 days."}
          </p>
        </div>
      )}

      {/* Summary */}
      {filteredItems.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredItems.length} of {trashItems.length} items in trash
        </div>
      )}
    </div>
  );
}