import React, { useState } from 'react';
import { Inquiry } from '@/lib/index';
import { mockInquiries } from '@/services/mockData';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Mail,
  Clock,
  User,
  Building,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ShieldAlert,
  Calendar,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

/**
 * Inquiries Management Page
 * Handles contact form submissions, customer inquiries, and follow-up tracking.
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

const statusConfig = {
  new: { label: 'New', variant: 'default' as const, icon: AlertCircle, color: 'text-primary' },
  'in-progress': { label: 'In Progress', variant: 'secondary' as const, icon: Clock, color: 'text-amber-500' },
  resolved: { label: 'Resolved', variant: 'outline' as const, icon: CheckCircle, color: 'text-green-500' },
  spam: { label: 'Spam', variant: 'destructive' as const, icon: ShieldAlert, color: 'text-red-500' },
};

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate statistics for the dashboard cards
  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    pending: inquiries.filter((i) => i.status === 'in-progress').length,
    resolved: inquiries.filter((i) => i.status === 'resolved').length,
  };

  // Define columns for the DataTable
  const columns = [
    {
      header: 'Received At',
      accessorKey: 'receivedAt',
      cell: (item: Inquiry) => (
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
          <Calendar className="w-3 h-3" />
          {new Date(item.receivedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      ),
    },
    {
      header: 'Contact Information',
      accessorKey: 'name',
      cell: (item: Inquiry) => (
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{item.name}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Mail className="w-3 h-3" /> {item.email}
          </span>
        </div>
      ),
    },
    {
      header: 'Company',
      accessorKey: 'company',
      cell: (item: Inquiry) => (
        <div className="flex items-center gap-2">
          <Building className="w-3 h-3 text-muted-foreground" />
          <span className="text-sm">{item.company || 'Private Individual'}</span>
        </div>
      ),
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
      cell: (item: Inquiry) => (
        <span className="font-medium text-foreground line-clamp-1 max-w-[250px]">{item.subject}</span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (item: Inquiry) => {
        const config = statusConfig[item.status];
        return (
          <Badge variant={config.variant} className="capitalize font-medium shadow-none">
            {config.label}
          </Badge>
        );
      },
    },
  ];

  const handleViewDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsOpen(true);

    // Automatically move to "in-progress" if viewed for the first time
    if (inquiry.status === 'new') {
      updateStatus(inquiry.id, 'in-progress');
    }
  };

  const updateStatus = (id: string, newStatus: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  // Filter inquiries based on search query
  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Inquiries</h1>
          <p className="text-muted-foreground text-lg">
            Review and manage client requests submitted through the corporate portal.
            <span className="ml-2 text-sm font-medium text-primary">
              (Showing {filteredInquiries.length} of {inquiries.length} entries)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, subject, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Received</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary">New Submissions</CardTitle>
            <AlertCircle className="h-4 w-4 text-primary animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.new}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-amber-500">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-green-500">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.resolved}</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table Container */}
      <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
        <DataTable
          data={filteredInquiries}
          columns={columns}
          onEdit={handleViewDetails}
          title="Customer Inquiry Log"
        />
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-border/50 bg-background shadow-2xl">
          {selectedInquiry && (
            <div className="flex flex-col">
              {/* Dialog Header with Industrial Accent */}
              <div className="bg-sidebar p-8 border-b border-sidebar-border">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Badge variant={statusConfig[selectedInquiry.status].variant} className="mb-2">
                      {statusConfig[selectedInquiry.status].label}
                    </Badge>
                    <DialogTitle className="text-2xl font-black text-sidebar-foreground leading-tight">
                      {selectedInquiry.subject}
                    </DialogTitle>
                    <DialogDescription className="text-sidebar-foreground/60 flex items-center gap-2 font-mono text-xs">
                      <Calendar className="w-3 h-3" />
                      REF: INQ-{selectedInquiry.id.toUpperCase()} | {new Date(selectedInquiry.receivedAt).toLocaleString()}
                    </DialogDescription>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Sender Information</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                        {selectedInquiry.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{selectedInquiry.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedInquiry.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Corporate Body</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border/40">
                        <Building className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-bold">{selectedInquiry.company || 'Private Sector / N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                      <MessageSquare className="w-3 h-3 text-primary" /> Inquiry Message
                    </p>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-2xl border border-border/30 text-sm leading-relaxed text-foreground whitespace-pre-wrap font-sans min-h-[150px]">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 bg-muted/20 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
                  asChild
                >
                  <a href={`mailto:${selectedInquiry.email}?subject=RE: ${selectedInquiry.subject}`}>
                    <ExternalLink className="w-3 h-3" />
                    Reply via Email
                  </a>
                </Button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {selectedInquiry.status !== 'resolved' && (
                    <Button
                      onClick={() => {
                        updateStatus(selectedInquiry.id, 'resolved');
                        setIsDetailsOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto shadow-lg shadow-green-600/20"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Mark Resolved
                    </Button>
                  )}
                  {selectedInquiry.status !== 'spam' && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        updateStatus(selectedInquiry.id, 'spam');
                        setIsDetailsOpen(false);
                      }}
                      className="w-full sm:w-auto"
                    >
                      <ShieldAlert className="w-4 h-4 mr-2" /> Mark Spam
                    </Button>
                  )}
                  <Button variant="ghost" onClick={() => setIsDetailsOpen(false)} className="w-full sm:w-auto">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
