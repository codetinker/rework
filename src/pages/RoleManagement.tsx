import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Lock,
  Unlock,
  Settings,
  Check,
  X,
  AlertTriangle,
  Search
} from 'lucide-react';
import { Role, Permission, SYSTEM_MODULES } from '@/lib/index';
import { rolesAPI, sendAPI, handleAPIResponse } from '@/services/api';
import { mockRoles } from '@/services/mockData';
import { useUser } from '@/contexts/UserContext';
import { DataTable } from '@/components/ui/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function RoleManagement() {
  const { currentUser, hasPermission } = useUser();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: {} as Record<string, Permission[]>
  });

  useEffect(() => {
    if (!hasPermission('roles', 'read')) {
      toast.error('Access denied: Insufficient permissions to view roles');
      return;
    }
    
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await rolesAPI.getAll();
      if (!response.error && response.data) {
        setRoles(response.data);
      } else {
        console.error('Roles API error:', response.error);
        // Fallback to mock data if available
        setRoles(mockRoles || []);
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      toast.error('Failed to fetch roles');
      // Fallback to mock data
      setRoles(mockRoles || []);
    } finally {
      setIsLoading(false);
    }
  };

  const initializePermissions = () => {
    const permissions: Record<string, Permission[]> = {};
    SYSTEM_MODULES.forEach(module => {
      permissions[module.id] = module.actions.map(action => ({
        action: action as 'create' | 'read' | 'update' | 'delete',
        granted: false
      }));
    });
    return permissions;
  };

  const handleCreateRole = () => {
    setFormData({
      name: '',
      description: '',
      permissions: initializePermissions()
    });
    setIsCreateDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: { ...role.permissions }
    });
    setIsEditDialogOpen(true);
  };

  const handlePermissionChange = (moduleId: string, action: string, granted: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [moduleId]: prev.permissions[moduleId].map(perm =>
          perm.action === action ? { ...perm, granted } : perm
        )
      }
    }));
  };

  const handleSubmit = async (isEdit: boolean = false) => {
    if (!formData.name.trim()) {
      toast.error('Role name is required');
      return;
    }

    try {
      if (isEdit && selectedRole) {
        await rolesAPI.update(selectedRole.id, {
          name: formData.name,
          description: formData.description,
          permissions: formData.permissions
        });
        toast.success('Role updated successfully');
        setIsEditDialogOpen(false);
      } else {
        await rolesAPI.create({
          name: formData.name,
          description: formData.description,
          permissions: formData.permissions,
          isSystem: false
        });
        toast.success('Role created successfully');
        setIsCreateDialogOpen(false);
      }
      
      fetchRoles();
    } catch (error) {
      toast.error(isEdit ? 'Failed to update role' : 'Failed to create role');
    }
  };

  const handleDeleteRole = async (role: Role) => {
    try {
      await rolesAPI.delete(role.id);
      toast.success('Role deleted successfully');
      fetchRoles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete role');
    }
  };

  const getPermissionSummary = (permissions: Record<string, Permission[]>) => {
    const totalPermissions = Object.values(permissions).flat().length;
    const grantedPermissions = Object.values(permissions).flat().filter(p => p.granted).length;
    return `${grantedPermissions}/${totalPermissions}`;
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Role Name',
      cell: (item: Role) => (
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="font-medium">{item.name}</span>
            {item.isSystem && (
              <Badge variant="secondary" className="text-xs w-fit">
                System Role
              </Badge>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: (item: Role) => (
        <span className="text-sm text-muted-foreground max-w-xs truncate">
          {item.description}
        </span>
      ),
    },
    {
      accessorKey: 'permissions',
      header: 'Permissions',
      cell: (item: Role) => (
        <Badge variant="outline" className="font-mono">
          {getPermissionSummary(item.permissions)}
        </Badge>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Last Updated',
      cell: (item: Role) => (
        <span className="text-sm text-muted-foreground">
          {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (item: Role) => (
        <div className="flex items-center gap-2">
          {hasPermission('roles', 'update') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditRole(item)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {hasPermission('roles', 'delete') && !item.isSystem && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Role</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete the role "{item.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteRole(item)}
                    className="bg-destructive text-destructive-foreground"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      ),
    },
  ];

  if (!hasPermission('roles', 'read')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Shield className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground text-center max-w-md">
          You don't have permission to view role management. Contact your administrator for access.
        </p>
      </div>
    );
  }

  const PermissionMatrix = ({ permissions, onChange, readOnly = false }: {
    permissions: Record<string, Permission[]>;
    onChange?: (moduleId: string, action: string, granted: boolean) => void;
    readOnly?: boolean;
  }) => (
    <div className="space-y-4">
      <h4 className="font-medium">Module Permissions</h4>
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 gap-0 bg-muted text-sm font-medium">
          <div className="p-3 border-r">Module</div>
          <div className="p-3 border-r text-center">Create</div>
          <div className="p-3 border-r text-center">Read</div>
          <div className="p-3 border-r text-center">Update</div>
          <div className="p-3 text-center">Delete</div>
        </div>
        {SYSTEM_MODULES.map((module) => (
          <div key={module.id} className="grid grid-cols-5 gap-0 border-t">
            <div className="p-3 border-r">
              <div className="font-medium">{module.name}</div>
              <div className="text-xs text-muted-foreground">{module.description}</div>
            </div>
            {['create', 'read', 'update', 'delete'].map((action) => {
              const hasAction = module.actions.includes(action as any);
              const permission = permissions[module.id]?.find(p => p.action === action);
              const isGranted = permission?.granted || false;
              
              return (
                <div key={action} className="p-3 border-r last:border-r-0 flex justify-center">
                  {hasAction ? (
                    readOnly ? (
                      isGranted ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-red-600" />
                      )
                    ) : (
                      <Switch
                        checked={isGranted}
                        onCheckedChange={(checked) => onChange?.(module.id, action, checked)}
                      />
                    )
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  // Filter roles based on search query
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground">
            Manage user roles and permissions across the system
            <span className="ml-2 text-sm font-medium text-primary">
              (Showing {filteredRoles.length} of {roles.length} entries)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          {hasPermission('roles', 'create') && (
            <Button onClick={handleCreateRole} className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">
              {roles.filter(r => r.isSystem).length} system roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.filter(r => !r.isSystem).length}</div>
            <p className="text-xs text-muted-foreground">
              User-created roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SYSTEM_MODULES.length}</div>
            <p className="text-xs text-muted-foreground">
              Protected modules
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage roles and their permissions
          </p>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredRoles}
            columns={columns}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Create Role Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role with specific permissions for system modules.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Name</label>
                <Input
                  placeholder="Enter role name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter role description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            
            <PermissionMatrix
              permissions={formData.permissions}
              onChange={handlePermissionChange}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit(false)}>
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Modify role permissions and details.
              {selectedRole?.isSystem && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-amber-50 dark:bg-amber-950 rounded-md">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-700 dark:text-amber-300">
                    This is a system role. Changes should be made carefully.
                  </span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Name</label>
                <Input
                  placeholder="Enter role name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={selectedRole?.isSystem}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Enter role description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            
            <PermissionMatrix
              permissions={formData.permissions}
              onChange={handlePermissionChange}
              readOnly={selectedRole?.isSystem}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit(true)} disabled={selectedRole?.isSystem}>
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}