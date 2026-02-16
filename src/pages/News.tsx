import React, { useState } from "react";
import { 
  Plus, 
  Newspaper, 
  Calendar, 
  User, 
  Tag, 
  FileText, 
  Star, 
  CheckCircle2, 
  Clock, 
  Archive,
  Image as ImageIcon,
  AlertCircle,
  Search,
  Trash2,
  Edit,
  AlertTriangle
} from "lucide-react";
import { 
  NewsItem, 
  ROUTE_PATHS 
} from "@/lib/index";
import { mockNews } from "@/services/mockData";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { toast } from "sonner";

const newsSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  category: z.enum(["Company", "Industry", "Achievement", "Event"]),
  status: z.enum(["published", "draft", "archived"]),
  author: z.string().min(2, "Author name is required"),
  isFeatured: z.boolean().default(false),
  publishedAt: z.date(),
  imageKey: z.string().min(1, "Image reference is required"),
});

type NewsFormValues = z.infer<typeof newsSchema>;

export default function News() {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete confirmation states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<NewsItem | null>(null);

  const form = useForm<NewsFormValues>({ 
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: "Company",
      status: "draft",
      author: "",
      isFeatured: false,
      publishedAt: new Date(),
      imageKey: "NEWS_DEFAULT",
    },
  });

  const handleAdd = () => {
    setEditingItem(null);
    form.reset({
      title: "",
      summary: "",
      content: "",
      category: "Company",
      status: "draft",
      author: "",
      isFeatured: false,
      publishedAt: new Date(),
      imageKey: "NEWS_DEFAULT",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    form.reset({
      title: item.title,
      summary: item.summary,
      content: item.content,
      category: item.category,
      status: item.status,
      author: item.author,
      isFeatured: item.isFeatured,
      publishedAt: new Date(item.publishedAt),
      imageKey: item.imageKey,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (item: NewsItem) => {
    setNewsToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmMoveToTrash = () => {
    if (!newsToDelete) return;
    
    const now = new Date();
    
    setNews(news.map(n => n.id === newsToDelete.id ? {
      ...n,
      isDeleted: true,
      deletedAt: now.toISOString(),
      deletedBy: "Current User", // In real app, get from auth context
      updatedAt: now.toISOString()
    } : n));
    
    setIsDeleteDialogOpen(false);
    const newsTitle = newsToDelete.title;
    setNewsToDelete(null);
    toast.success(`"${newsTitle}" moved to trash. Will be permanently deleted in 7 days.`);
  };

  const handleArchive = (id: string) => {
    if (confirm("Are you sure you want to archive this article?")) {
      setNews(news.map((n) => (n.id === id ? { ...n, status: "archived" as const } : n)));
      toast.success("Article archived successfully");
    }
  };

  const handleUnarchive = (id: string) => {
    if (confirm("Are you sure you want to restore this article?")) {
      setNews(news.map((n) => (n.id === id ? { ...n, status: "draft" as const } : n)));
      toast.success("Article restored to drafts");
    }
  };

  const onSubmit = (values: NewsFormValues) => {
    // Convert Date to ISO string for storage
    const formattedValues = {
      ...values,
      publishedAt: values.publishedAt.toISOString()
    };
    
    if (editingItem) {
      setNews(news.map((n) => (n.id === editingItem.id ? { ...editingItem, ...formattedValues } : n)));
      toast.success("News item updated successfully");
    } else {
      const newItem: NewsItem = {
        id: `n${Date.now()}`,
        title: formattedValues.title,
        summary: formattedValues.summary,
        content: formattedValues.content,
        category: formattedValues.category,
        status: formattedValues.status,
        author: formattedValues.author,
        isFeatured: formattedValues.isFeatured,
        publishedAt: formattedValues.publishedAt,
        imageKey: formattedValues.imageKey,
      };
      setNews([newItem, ...news]);
      toast.success("New news item published");
    }
    setIsDialogOpen(false);
  };

  const columns = [
    {
      header: "News Article",
      accessorKey: "title",
      cell: (item: NewsItem) => (
        <div className="flex items-center gap-3 py-1">
          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden shrink-0">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm line-clamp-1">{item.title}</span>
            <span className="text-xs text-muted-foreground line-clamp-1">{item.summary}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (item: NewsItem) => (
        <Badge variant="secondary" className="font-normal">
          <Tag className="w-3 h-3 mr-1" />
          {item.category}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: NewsItem) => {
        const statusConfig = {
          published: { color: "bg-green-500/10 text-green-600 border-green-200", icon: CheckCircle2 },
          draft: { color: "bg-amber-500/10 text-amber-600 border-amber-200", icon: Clock },
          archived: { color: "bg-slate-500/10 text-slate-600 border-slate-200", icon: Archive },
        };
        const config = statusConfig[item.status];
        const Icon = config.icon;
        return ( 
          <Badge className={`border ${config.color} shadow-none flex items-center gap-1 w-fit`}>
            <Icon className="w-3 h-3" />
            <span className="capitalize">{item.status}</span>
          </Badge>
        );
      },
    },
    {
      header: "Author",
      accessorKey: "author",
      cell: (item: NewsItem) => (
        <div className="flex items-center text-xs text-muted-foreground">
          <User className="w-3 h-3 mr-1" />
          {item.author}
        </div>
      ),
    },
    {
      header: "Published",
      accessorKey: "publishedAt",
      cell: (item: NewsItem) => (
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 mr-1" />
          {item.publishedAt}
        </div>
      ),
    },
    {
      header: "Featured",
      accessorKey: "isFeatured",
      cell: (item: NewsItem) => (
        item.isFeatured ? (
          <div className="flex justify-center">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
        ) : null
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (item: NewsItem) => (
        <div className="flex items-center gap-2">
          {item.status !== "archived" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleArchive(item.id)}
              className="h-8 px-2 text-xs"
            >
              <Archive className="w-3 h-3 mr-1" />
              Archive
            </Button>
          )}
          {item.status === "archived" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUnarchive(item.id)}
              className="h-8 px-2 text-xs"
            >
              <FileText className="w-3 h-3 mr-1" />
              Restore
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Filter news based on search query (exclude deleted news)
  const activeNews = news.filter(item => !item.isDeleted);
  const filteredNews = activeNews.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">News & Events Management</h1>
          <p className="text-muted-foreground">
            Create and manage company announcements, industry news, and event highlights.
            <span className="ml-2 text-sm font-medium text-primary">
              (Showing {filteredNews.length} of {news.length} entries)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news articles..."
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-card border rounded-lg p-4 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Newspaper className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Articles</p>
            <p className="text-2xl font-bold">{news.length}</p>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Published</p>
            <p className="text-2xl font-bold">
              {news.filter((n) => n.status === "published").length}
            </p>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-full">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Drafts</p>
            <p className="text-2xl font-bold">
              {news.filter((n) => n.status === "draft").length}
            </p>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-full">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Featured</p>
            <p className="text-2xl font-bold">
              {news.filter((n) => n.isFeatured).length}
            </p>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 flex items-center gap-4">
          <div className="p-3 bg-slate-500/10 rounded-full">
            <Archive className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Archived</p>
            <p className="text-2xl font-bold">
              {news.filter((n) => n.status === "archived").length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <DataTable
          data={filteredNews}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          title="Recent Articles"
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Article" : "Create New Article"}</DialogTitle>
            <DialogDescription>
              Fill in the details below to publish or update a news article on the website.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Article Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter article headline" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Brief Summary</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A short summary that appears in listings" 
                          className="h-20 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Company">Company</SelectItem>
                          <SelectItem value="Industry">Industry</SelectItem>
                          <SelectItem value="Achievement">Achievement</SelectItem>
                          <SelectItem value="Event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of the author" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publishedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Date & Time</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          onDateChange={field.onChange}
                          placeholder="Select publication date and time"
                        />
                      </FormControl>
                      <FormDescription>
                        Choose when this news article should be published
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageKey"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Cover Image Key</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input placeholder="e.g. NEWS_1" {...field} className="flex-1" />
                          <Button type="button" variant="outline" size="icon">
                            <ImageIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter the key for the image stored in the asset library.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Article Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write the full article content here..." 
                          className="min-h-[300px] font-sans" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 md:col-span-2">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Featured Article</FormLabel>
                        <FormDescription>
                          Pin this article to the homepage featured section.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary">
                  {editingItem ? "Save Changes" : "Publish Article"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
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
              Are you sure you want to move "{newsToDelete?.title}" to trash?
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
                      News article will be moved to trash
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