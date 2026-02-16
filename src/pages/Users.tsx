import React, { useState, useEffect } from "react";
import { 
  UserPlus, 
  Shield, 
  Mail, 
  Clock, 
  UserCheck, 
  UserX, 
  ShieldAlert,
  ShieldCheck,
  Info,
  Activity,
  Search,
  Plus
} from "lucide-react";
import { 
  User, 
  UserRole, 
  PermissionLevel,
  Role 
} from "@/lib/index";
import { usersAPI, rolesAPI, sendAPI, handleAPIResponse } from "@/services/api";
import { mockUsers, mockRoles } from "@/services/mockData";
import { DataTable, ColumnDef } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
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
import { useToast } from "@/components/ui/use-toast";

const roleConfig = {
  [UserRole.SUPER_ADMIN]: {
    label: "Super Admin",
    color: "bg-primary/10 text-primary border-primary/20",
    icon: ShieldAlert,
    description: "Full system access and management"
  },
  [UserRole.CONTENT_MANAGER]: {
    label: "Content Manager",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    icon: ShieldCheck,
    description: "Manage projects, news, and services"
  },
  [UserRole.SUPPORT_STAFF]: {
    label: "Support Staff",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    icon: Info,
    description: "Handle inquiries and customer chat"
  }
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the new API service with pagination
        const [usersResponse, rolesResponse] = await Promise.all([
          usersAPI.getAll({ page: 1, keyword: '', limit: 50 }),
          rolesAPI.getAll({ page: 1, keyword: '', limit: 20 })
        ]);
        
        // Handle API responses
        if (!usersResponse.error && usersResponse.data) {
          setUsers(usersResponse.data);
        } else {
          console.error('Users API error:', usersResponse.error);
          // Fallback to mock data
          setUsers(mockUsers);
        }
        
        if (!rolesResponse.error && rolesResponse.data) {
          setRoles(rolesResponse.data);
        } else {
          console.error('Roles API error:', rolesResponse.error);
          // Fallback to mock roles data
          setRoles(mockRoles);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        // Fallback to mock data on error
        setUsers(mockUsers);
        setRoles(mockRoles);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper function to get role by UserRole enum (for backward compatibility)
  const getRoleIdByUserRole = (userRole: UserRole): string => {
    const roleMap = {
      [UserRole.SUPER_ADMIN]: 'r1',
      [UserRole.CONTENT_MANAGER]: 'r2', 
      [UserRole.SUPPORT_STAFF]: 'r3'
    };
    return roleMap[userRole] || 'r3';
  };

  // Helper function to get role name by UserRole enum
  const getRoleNameByUserRole = (userRole: UserRole): string => {
    const role = roles.find(r => r.id === getRoleIdByUserRole(userRole));
    return role?.name || userRole.replace('_', ' ');
  };

  // Helper function to convert role ID back to UserRole enum (for backward compatibility)
  const getUserRoleByRoleId = (roleId: string): UserRole => {
    const roleMap = {
      'r1': UserRole.SUPER_ADMIN,
      'r2': UserRole.CONTENT_MANAGER,
      'r3': UserRole.SUPPORT_STAFF
    };
    return roleMap[roleId as keyof typeof roleMap] || UserRole.SUPPORT_STAFF;
  };

  const columns: ColumnDef[] = [
    {
      header: "User",
      accessorKey: "name",
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (user: User) => {
        const config = roleConfig[user.role];
        const Icon = config?.icon || Shield;
        const roleName = getRoleNameByUserRole(user.role);
        return (
          <Badge variant="outline" className={`flex items-center gap-1.5 px-2 py-0.5 ${config?.color || 'bg-muted/10 text-muted-foreground border-muted/20'}`}>
            <Icon size={12} />
            {roleName}
          </Badge>
        );
      }
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (user: User) => (
        <Badge 
          variant={user.status === "active" ? "default" : "secondary"}
          className={user.status === "active" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none" : ""}
        >
          {user.status === "active" ? "Active" : "Inactive"}
        </Badge>
      )
    },
    {
      header: "Last Login",
      accessorKey: "lastLogin",
      cell: (user: User) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock size={14} />
          <span className="text-sm">
            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("en-GB", { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            }) : "Never"}
          </span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    toast({
      title: "User access restricted",
      description: `${user.name} has been set to inactive status.`,
    });
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: "inactive" } : u));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const roleId = formData.get("role") as string;
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: getUserRoleByRoleId(roleId),
      status: formData.get("status") as "active" | "inactive",
    };

    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
      toast({ title: "User Updated", description: "Staff information has been saved successfully." });
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        lastLogin: new Date().toISOString(),
      };
      setUsers(prev => [...prev, newUser]);
      toast({ title: "User Created", description: "New staff member has been granted access." });
    }
    setIsDialogOpen(false);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage staff access levels and monitor activity across the CMS.
            <span className="ml-2 text-sm font-medium text-primary">
              (Showing {filteredUsers.length} of {users.length} entries)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <UserCheck size={16} className="text-primary" />
              Active Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === "active").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Members with current access</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield size={16} className="text-emerald-600" />
              Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role !== UserRole.SUPPORT_STAFF).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Admins and Managers</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity size={16} className="text-amber-600" />
              Support Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === UserRole.SUPPORT_STAFF).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Staff handling daily inquiries</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/40 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <DataTable 
            data={filteredUsers} 
            columns={columns} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            title="Registered CMS Users"
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
              <DialogDescription>
                Define access levels and profile details for RWNA CMS staff.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Full Name</Label>
                <Input id="name" name="name" defaultValue={editingUser?.name} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email Address</Label>
                <Input id="email" name="email" type="email" defaultValue={editingUser?.email} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">System Role</Label>
                <div className="col-span-3">
                  <Select name="role" defaultValue={editingUser ? getRoleIdByUserRole(editingUser.role) : 'r3'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground mt-1.5">
                    Roles determine access to projects, financial inquiries, and user management.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <div className="col-span-3">
                  <Select name="status" defaultValue={editingUser?.status || "active"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary">
                {editingUser ? "Save Changes" : "Create Account"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
