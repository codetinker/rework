import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Users,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ColumnDef {
  header: string;
  accessorKey: string;
  cell?: (item: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  data: any[];
  columns: ColumnDef[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onViewApplications?: (item: any) => void;
  onAdd?: () => void;
  title?: string;
  searchPlaceholder?: string;
  pageSize?: number;
}

export function DataTable({
  data,
  columns,
  onEdit,
  onDelete,
  onViewApplications,
  onAdd,
  title,
  searchPlaceholder = "Search records...",
  pageSize = 10,
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle sorting logic
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Search filtering
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        Object.values(item).some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchQuery, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize]);

  const hasActions = onEdit || onDelete || onViewApplications;

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {title && (
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            {title}
          </h2>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 bg-card border-border"
            />
          </div>
          {onAdd && (
            <Button onClick={onAdd} className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.accessorKey}
                  className={cn(
                    "font-semibold text-foreground",
                    column.sortable && "cursor-pointer select-none hover:bg-muted transition-colors"
                  )}
                  onClick={() => column.sortable && handleSort(column.accessorKey)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            "h-3 w-3 -mb-1",
                            sortConfig?.key === column.accessorKey &&
                              sortConfig.direction === "asc"
                              ? "text-primary"
                              : "text-muted-foreground/30"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-3 w-3",
                            sortConfig?.key === column.accessorKey &&
                              sortConfig.direction === "desc"
                              ? "text-primary"
                              : "text-muted-foreground/30"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className="text-right font-semibold text-foreground">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={item.id || index} className="hover:bg-muted/30">
                  {columns.map((column) => (
                    <TableCell key={column.accessorKey}>
                      {column.cell ? column.cell(item) : item[column.accessorKey]}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {onViewApplications && (
                            <DropdownMenuItem onClick={() => onViewApplications(item)} className="cursor-pointer">
                              <Users className="mr-2 h-4 w-4" /> Applicants
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)} className="cursor-pointer">
                              <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
                              className="text-destructive focus:text-destructive cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="h-32 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min((currentPage - 1) * pageSize + 1, processedData.length)} to{" "}
            {Math.min(currentPage * pageSize, processedData.length)} of{" "}
            {processedData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 text-xs"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
