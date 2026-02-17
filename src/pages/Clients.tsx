import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Mail, 
  User, 
  Globe, 
  Plus, 
  Search, 
  MoreVertical,
  Briefcase,
  ExternalLink,
  Trash2,
  Edit,
  AlertTriangle
} from "lucide-react";
import { Client, ROUTE_PATHS } from "@/lib/index";
import { clientsAPI } from "@/services/api";
import { mockClients } from "@/services/mockData";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/**
 * Clients Management Page
 * Handles client portfolios, contact information, and industry classification.
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete confirmation states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clientsAPI.getAll();
        if (!response.error && response.data) {
          setClients(response.data.clients || []);
        } else {
          console.error('Clients API error:', response.error);
          setClients([]);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
        toast.error("Failed to load client data");
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  const columns = [
    {
      header: "Client Name",
      accessorKey: "name",
      cell: (client: Client) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center border border-border overflow-hidden">
            {client.logoKey ? (
              <Building2 className="h-5 w-5 text-muted-foreground" />
            ) : (
              <span className="text-xs font-bold">{client.name.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{client.name}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Industry",
      accessorKey: "industry",
      cell: (client: Client) => (
        <Badge variant="secondary" className="font-normal bg-secondary/50">
          {client.industry}
        </Badge>
      ),
    },
    {
      header: "Primary Contact",
      accessorKey: "contactPerson",
      cell: (client: Client) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-sm">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            {client.contactPerson}
          </div>
          <div className="text-xs text-muted-foreground mb-1">
            {client.position}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            {client.email}
          </div>
        </div>
      ),
    },
    {
      header: "Projects",
      accessorKey: "projectCount",
      cell: (client: Client) => (
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary" />
          <span className="font-semibold">{client.projectCount}</span>
        </div>
      ),
    },
    {
      header: "Website",
      accessorKey: "website",
      cell: (client: Client) => client.website ? (
        <a 
          href={client.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <Globe className="h-3 w-3" />
          Visit Site
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      ) : (
        <span className="text-xs text-muted-foreground">N/A</span>
      ),
    },
  ];

  const handleAddClient = () => {
    setEditingClient(null);
    setIsDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsDialogOpen(true);
  };

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteDialogOpen(true);
  };

  const confirmMoveToTrash = () => {
    if (!clientToDelete) return;
    
    const now = new Date();
    
    setClients(clients.map(c => c.id === clientToDelete.id ? {
      ...c,
      isDeleted: true,
      deletedAt: now.toISOString(),
      deletedBy: "Current User", // In real app, get from auth context
      updatedAt: now.toISOString()
    } : c));
    
    setIsDeleteDialogOpen(false);
    const clientName = clientToDelete.name;
    setClientToDelete(null);
    toast.success(`"${clientName}" moved to trash. Will be permanently deleted in 7 days.`);
  };

  const handleSaveClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const clientData = {
      name: formData.get("name") as string,
      industry: formData.get("industry") as string,
      contactPerson: formData.get("contactPerson") as string,
      position: formData.get("position") as string,
      email: formData.get("email") as string,
      website: formData.get("website") as string,
    };

    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...clientData } : c));
      toast.success("Client information updated");
    } else {
      const newClient: Client = {
        id: `c${clients.length + 1}`,
        ...clientData,
        logoKey: "DEFAULT_LOGO",
        projectCount: 0,
      };
      setClients([...clients, newClient]);
      toast.success("New client added to portfolio");
    }

    setIsDialogOpen(false);
  };

  // Filter clients based on search query (exclude deleted clients)
  const activeClients = (clients || []).filter(client => !client.isDeleted);
  const filteredClients = activeClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
          <p className="text-muted-foreground">
            Maintain your corporate partnerships and track project engagement across industries.
            <span className="ml-2 text-sm font-medium text-primary">
              (Showing {filteredClients.length} of {clients.length} entries)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by client name or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          <Button onClick={handleAddClient} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
          <p className="text-2xl font-bold">{clients.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Active Industries</p>
          <p className="text-2xl font-bold">{new Set(clients.map(c => c.industry)).size}</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
          <p className="text-2xl font-bold">
            {clients.reduce((acc, curr) => acc + curr.projectCount, 0)}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <DataTable
          data={filteredClients}
          columns={columns}
          title="Client Portfolio"
          onEdit={handleEditClient}
          onDelete={handleDeleteClient}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSaveClient}>
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle>
              <DialogDescription>
                Enter the details of the corporate partner below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Company Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={editingClient?.name || ""} 
                  placeholder="e.g. PETRONAS Carigali" 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry Sector</Label>
                <Input 
                  id="industry" 
                  name="industry" 
                  defaultValue={editingClient?.industry || ""} 
                  placeholder="e.g. Oil & Gas Exploration" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input 
                    id="contactPerson" 
                    name="contactPerson" 
                    defaultValue={editingClient?.contactPerson || ""} 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position in Company</Label>
                  <Input 
                    id="position" 
                    name="position" 
                    defaultValue={editingClient?.position || ""} 
                    placeholder="Project Manager" 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    defaultValue={editingClient?.email || ""} 
                    placeholder="office@client.com" 
                    required 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input 
                  id="website" 
                  name="website" 
                  type="url" 
                  defaultValue={editingClient?.website || ""} 
                  placeholder="https://www.example.com" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground">
                {editingClient ? "Update Client" : "Add Client"}
              </Button>
            </DialogFooter>
          </form>
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
              Are you sure you want to move "{clientToDelete?.name}" to trash?
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
                      Client will be moved to trash
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
