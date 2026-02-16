import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Clock, 
  User, 
  Activity, 
  CheckCircle, 
  XCircle,
  Filter,
  Calendar,
  Monitor
} from 'lucide-react';
import { AccessLog, UserRole } from '@/lib/index';
import { accessLogsAPI, mockUsers } from '@/services/mockData';
import { useUser } from '@/contexts/UserContext';
import { DataTable } from '@/components/ui/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function AccessLogs() {
  const { currentUser, hasPermission } = useUser();
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterUser, setFilterUser] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterResource, setFilterResource] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (!hasPermission('users', 'read')) {
      toast.error('Access denied: Insufficient permissions to view access logs');
      return;
    }
    
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await accessLogsAPI.getAll();
      setLogs(data);
    } catch (error) {
      toast.error('Failed to fetch access logs');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter logs based on selected filters
  const filteredLogs = logs.filter(log => {
    const matchesUser = filterUser === 'all' || log.userId === filterUser;
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesResource = filterResource === 'all' || log.resource === filterResource;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'success' && log.success) ||
      (filterStatus === 'failed' && !log.success);
    
    return matchesUser && matchesAction && matchesResource && matchesStatus;
  });

  // Get unique resources for filter dropdown
  const uniqueResources = Array.from(new Set(logs.map(log => log.resource))).sort();

  const columns = [
    {
      accessorKey: 'timestamp',
      header: 'Time',
      cell: (item: AccessLog) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {new Date(item.timestamp).toLocaleDateString()}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(item.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'userName',
      header: 'User',
      cell: (item: AccessLog) => {
        const user = mockUsers.find(u => u.id === item.userId);
        return (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.userName}</span>
              {user && (
                <Badge 
                  variant="outline" 
                  className="text-xs w-fit mt-1"
                >
                  {user.role.replace('_', ' ')}
                </Badge>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: (item: AccessLog) => (
        <Badge 
          variant="secondary" 
          className="capitalize font-medium"
        >
          {item.action.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      accessorKey: 'resource',
      header: 'Resource',
      cell: (item: AccessLog) => (
        <Badge 
          variant="outline" 
          className="capitalize"
        >
          {item.resource}
        </Badge>
      ),
    },
    {
      accessorKey: 'success',
      header: 'Status',
      cell: (item: AccessLog) => (
        <div className="flex items-center gap-2">
          {item.success ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-600 font-medium">Success</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-600 font-medium">Failed</span>
            </>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: (item: AccessLog) => (
        <span className="text-sm text-muted-foreground max-w-xs truncate">
          {item.details || 'No details'}
        </span>
      ),
    },
    {
      accessorKey: 'ipAddress',
      header: 'IP Address',
      cell: (item: AccessLog) => (
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-mono">{item.ipAddress || 'N/A'}</span>
        </div>
      ),
    },
  ];

  // Statistics
  const totalLogs = logs.length;
  const successfulActions = logs.filter(log => log.success).length;
  const failedActions = logs.filter(log => !log.success).length;
  const uniqueUsers = new Set(logs.map(log => log.userId)).size;

  if (!hasPermission('users', 'read')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Shield className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground text-center max-w-md">
          You don't have permission to view access logs. Only Super Admins can access this feature.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Access Logs</h1>
          <p className="text-muted-foreground">
            Monitor user activities and system access across the CMS
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogs}</div>
            <p className="text-xs text-muted-foreground">
              All recorded activities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{successfulActions}</div>
            <p className="text-xs text-muted-foreground">
              {totalLogs > 0 ? Math.round((successfulActions / totalLogs) * 100) : 0}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedActions}</div>
            <p className="text-xs text-muted-foreground">
              Access denied or errors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">
              Users with activity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">User</label>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="switch_user">Switch User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Resource</label>
              <Select value={filterResource} onValueChange={setFilterResource}>
                <SelectTrigger>
                  <SelectValue placeholder="All resources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  {uniqueResources.map((resource) => (
                    <SelectItem key={resource} value={resource}>
                      {resource.charAt(0).toUpperCase() + resource.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <Button 
                variant="outline" 
                onClick={() => {
                  setFilterUser('all');
                  setFilterAction('all');
                  setFilterResource('all');
                  setFilterStatus('all');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Log</CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing {filteredLogs.length} of {totalLogs} log entries
          </p>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredLogs}
            columns={columns}
            pageSize={20}
          />
        </CardContent>
      </Card>
    </div>
  );
}