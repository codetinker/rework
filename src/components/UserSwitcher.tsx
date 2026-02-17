import React, { useState } from 'react';
import { 
  Users, 
  ChevronUp, 
  Shield, 
  User as UserIcon, 
  Headphones,
  Crown,
  Settings
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { mockUsers } from '@/services/mockData';
import { UserRole } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return <Crown className="w-4 h-4" />;
    case UserRole.CONTENT_MANAGER:
      return <Settings className="w-4 h-4" />;
    case UserRole.SUPPORT_STAFF:
      return <Headphones className="w-4 h-4" />;
    default:
      return <UserIcon className="w-4 h-4" />;
  }
};

const getRoleBadgeColor = (role: UserRole) => {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return "bg-red-500/10 text-red-600 border-red-500/20";
    case UserRole.CONTENT_MANAGER:
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case UserRole.SUPPORT_STAFF:
      return "bg-green-500/10 text-green-600 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20";
  }
};

const getRoleDisplayName = (role: UserRole) => {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return "Super Admin";
    case UserRole.CONTENT_MANAGER:
      return "Content Manager";
    case UserRole.SUPPORT_STAFF:
      return "Support Staff";
    default:
      return role;
  }
};

export const UserSwitcher: React.FC = () => {
  const { currentUser, switchUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) return null;

  return (
    <div className="fixed bottom-6 left-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-12 px-4 bg-background/95 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs font-semibold">
                  {currentUser.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">
                  {currentUser.name?.split(' ')[0] || 'User'}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-xs px-1.5 py-0 h-4 ${getRoleBadgeColor(currentUser.role)}`}
                >
                  {getRoleDisplayName(currentUser.role)}
                </Badge>
              </div>
              <ChevronUp className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          side="top" 
          align="start" 
          className="w-80 p-0 bg-background/95 backdrop-blur-sm border-border/50"
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Switch User (Testing)</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Switch between different user roles to test access permissions
            </p>
            
            <div className="space-y-2">
              {mockUsers.map((user) => (
                <div key={user.id}>
                  <Button
                    variant={currentUser.id === user.id ? "secondary" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => {
                      switchUser(user.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{user.name || 'Unknown User'}</span>
                          {currentUser.id === user.id && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {getRoleIcon(user.role)}
                          <span className="text-xs text-muted-foreground">
                            {getRoleDisplayName(user.role)}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </Button>
                  
                  {user.id !== mockUsers[mockUsers.length - 1].id && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
            
            <Separator className="my-3" />
            
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-3 h-3" />
                <span>Super Admin: Full access to all modules</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-3 h-3" />
                <span>Content Manager: Manage content, limited user access</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-3 h-3" />
                <span>Support Staff: Chat & inquiries, read-only content</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};