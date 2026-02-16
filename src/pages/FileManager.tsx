import React, { useState, useRef } from 'react';
import {
  Upload,
  Download,
  Trash2,
  Search,
  Filter,
  Grid,
  List,
  Image as ImageIcon,
  FileText,
  File,
  Video,
  Music,
  Eye,
  Edit,
  Copy,
  ExternalLink,
  FolderOpen,
  Plus,
  X,
  Calendar,
  Tag,
  HardDrive
} from 'lucide-react';
import { FileItem, FileUploadData } from '@/types/file';
import { sendAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Mock data for development
const mockFiles: FileItem[] = [
  {
    _id: 'f1',
    type: 'image',
    ext: 'png',
    bytes: 2048576,
    sourceUrl: 'https://example.com/upload/image1.png',
    pathUrl: '/files/images/project-offshore-1.png',
    name: 'project-offshore-1.png',
    title: 'Offshore Platform Project',
    description: 'Main project image for offshore platform maintenance',
    tags: ['project', 'offshore', 'platform'],
    date: {
      created: '2026-02-10T08:30:00Z',
      updated: '2026-02-10T08:30:00Z'
    }
  },
  {
    _id: 'f2',
    type: 'pdf',
    ext: 'pdf',
    bytes: 5242880,
    sourceUrl: 'https://example.com/upload/manual.pdf',
    pathUrl: '/files/documents/safety-manual-2026.pdf',
    name: 'safety-manual-2026.pdf',
    title: 'Safety Manual 2026',
    description: 'Updated safety procedures and guidelines',
    tags: ['safety', 'manual', 'procedures'],
    date: {
      created: '2026-01-15T14:20:00Z',
      updated: '2026-02-01T10:15:00Z'
    }
  },
  {
    _id: 'f3',
    type: 'image',
    ext: 'jpg',
    bytes: 1536000,
    sourceUrl: 'https://example.com/upload/team.jpg',
    pathUrl: '/files/images/team-photo-2026.jpg',
    name: 'team-photo-2026.jpg',
    title: 'Team Photo 2026',
    description: 'Annual team photo at RWNA headquarters',
    tags: ['team', 'photo', 'company'],
    date: {
      created: '2026-02-14T16:45:00Z',
      updated: '2026-02-14T16:45:00Z'
    }
  }
];

/**
 * File Manager Component
 * Manage images and files with upload, download, and organization features
 */
export default function FileManager() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>(mockFiles);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<FileItem | null>(null);
  const [uploadData, setUploadData] = useState<FileUploadData>({
    file: null as any,
    title: '',
    description: '',
    tags: []
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter files based on search and type
  React.useEffect(() => {
    let filtered = files;

    if (searchQuery) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(file => file.type === typeFilter);
    }

    setFilteredFiles(filtered);
  }, [files, searchQuery, typeFilter]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string, ext: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Music className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadData({
      file,
      title: file.name.split('.')[0],
      description: '',
      tags: []
    });
    setIsUploadDialogOpen(true);
  };

  const handleUploadSubmit = async () => {
    if (!uploadData.file) return;

    try {
      // Create file object
      const fileExt = uploadData.file.name.split('.').pop() || '';
      const fileType = uploadData.file.type.startsWith('image/') ? 'image' :
                      uploadData.file.type === 'application/pdf' ? 'pdf' :
                      uploadData.file.type.startsWith('video/') ? 'video' :
                      uploadData.file.type.startsWith('audio/') ? 'audio' : 'other';

      const newFile: FileItem = {
        _id: `f${Date.now()}`,
        type: fileType,
        ext: fileExt,
        bytes: uploadData.file.size,
        sourceUrl: URL.createObjectURL(uploadData.file),
        pathUrl: `/files/${fileType}s/${uploadData.file.name}`,
        name: uploadData.file.name,
        title: uploadData.title || uploadData.file.name,
        description: uploadData.description,
        tags: uploadData.tags,
        date: {
          created: new Date().toISOString(),
          updated: new Date().toISOString()
        }
      };

      // In real implementation, upload to server via API
      const response = await sendAPI({
        route: '/files/upload',
        data: {
          file: uploadData.file,
          metadata: {
            title: uploadData.title,
            description: uploadData.description,
            tags: uploadData.tags
          }
        }
      });

      if (response.error) {
        console.error('Upload failed:', response.error);
        // For demo, add to local state anyway
        setFiles(prev => [newFile, ...prev]);
      } else {
        // Use response data if available
        setFiles(prev => [response.data || newFile, ...prev]);
      }

      toast.success('File uploaded successfully');
      setIsUploadDialogOpen(false);
      setUploadData({ file: null as any, title: '', description: '', tags: [] });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    }
  };

  const handleDownload = (file: FileItem) => {
    // Create download link
    const link = document.createElement('a');
    link.href = file.sourceUrl || file.pathUrl;
    link.download = file.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloading ${file.name}`);
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await sendAPI({
        route: '/files/delete',
        data: { _id: fileId }
      });

      if (response.error) {
        console.error('Delete failed:', response.error);
      }

      setFiles(prev => prev.filter(f => f._id !== fileId));
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
      toast.success('File deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete file');
    }
  };

  const handleEdit = (file: FileItem) => {
    setEditingFile(file);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editingFile) return;

    try {
      const response = await sendAPI({
        route: '/files/update',
        data: {
          _id: editingFile._id,
          title: editingFile.title,
          description: editingFile.description,
          tags: editingFile.tags
        }
      });

      if (response.error) {
        console.error('Update failed:', response.error);
      }

      setFiles(prev => prev.map(f => 
        f._id === editingFile._id ? { ...editingFile, date: { ...f.date, updated: new Date().toISOString() } } : f
      ));
      
      toast.success('File updated successfully');
      setIsEditDialogOpen(false);
      setEditingFile(null);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update file');
    }
  };

  const handleCopyUrl = (file: FileItem) => {
    navigator.clipboard.writeText(file.pathUrl);
    toast.success('File URL copied to clipboard');
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return;
    if (!confirm(`Delete ${selectedFiles.length} selected files?`)) return;

    try {
      const response = await sendAPI({
        route: '/files/bulk-delete',
        data: { fileIds: selectedFiles }
      });

      if (response.error) {
        console.error('Bulk delete failed:', response.error);
      }

      setFiles(prev => prev.filter(f => !selectedFiles.includes(f._id)));
      setSelectedFiles([]);
      toast.success(`${selectedFiles.length} files deleted successfully`);
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast.error('Failed to delete files');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">File Manager</h1>
              <p className="text-muted-foreground">
                Manage images, documents, and media files
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,application/pdf,.doc,.docx,.txt"
            />
          </div>
        </div>

        {/* Toolbar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="pdf">PDFs</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                {selectedFiles.length > 0 && (
                  <>
                    <Badge variant="secondary">
                      {selectedFiles.length} selected
                    </Badge>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleBulkDelete}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Selected
                    </Button>
                  </>
                )}
                
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <Card key={file._id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* File Preview */}
                    <div className="relative aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {file.type === 'image' ? (
                        <img
                          src={file.sourceUrl || file.pathUrl}
                          alt={file.title || file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-muted-foreground">
                          {getFileIcon(file.type, file.ext)}
                        </div>
                      )}
                      
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file._id)}
                          onChange={() => toggleFileSelection(file._id)}
                          className="w-4 h-4 rounded border-2"
                        />
                      </div>

                      {/* Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">
                              •••
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDownload(file)}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(file)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyUrl(file)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(file._id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm truncate" title={file.title || file.name}>
                        {file.title || file.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="uppercase">{file.ext}</span>
                        <span>{formatFileSize(file.bytes)}</span>
                      </div>
                      {file.tags && file.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {file.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {file.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{file.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredFiles.map((file) => (
                  <div key={file._id} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file._id)}
                      onChange={() => toggleFileSelection(file._id)}
                      className="w-4 h-4 rounded border-2"
                    />
                    
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      {file.type === 'image' ? (
                        <img
                          src={file.sourceUrl || file.pathUrl}
                          alt={file.title || file.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        getFileIcon(file.type, file.ext)
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{file.title || file.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {file.description || 'No description'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="uppercase">{file.ext}</span>
                      <span>{formatFileSize(file.bytes)}</span>
                      <span>{format(new Date(file.date.created), 'MMM dd, yyyy')}</span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDownload(file)}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(file)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyUrl(file)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(file._id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredFiles.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No files found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || typeFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Upload your first file to get started'
                }
              </p>
              {!searchQuery && typeFilter === 'all' && (
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Upload Dialog */}
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription>
                Add details for your file to make it easier to find later
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">File</label>
                <p className="text-sm text-muted-foreground">
                  {uploadData.file?.name} ({uploadData.file ? formatFileSize(uploadData.file.size) : ''})
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={uploadData.title}
                  onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add a description (optional)"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Tags</label>
                <Input
                  placeholder="Enter tags separated by commas"
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                    setUploadData(prev => ({ ...prev, tags }));
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUploadSubmit}>
                Upload File
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit File Details</DialogTitle>
              <DialogDescription>
                Update the file information
              </DialogDescription>
            </DialogHeader>
            
            {editingFile && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editingFile.title || ''}
                    onChange={(e) => setEditingFile(prev => prev ? { ...prev, title: e.target.value } : null)}
                    placeholder="Enter a descriptive title"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={editingFile.description || ''}
                    onChange={(e) => setEditingFile(prev => prev ? { ...prev, description: e.target.value } : null)}
                    placeholder="Add a description (optional)"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    value={editingFile.tags?.join(', ') || ''}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                      setEditingFile(prev => prev ? { ...prev, tags } : null);
                    }}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}