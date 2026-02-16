/**
 * File Manager Types and Interfaces
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

export interface FileItem {
  _id: string;
  type: 'image' | 'pdf' | 'document' | 'video' | 'audio' | 'other';
  ext: string;
  bytes: number; // size in bytes
  sourceUrl: string; // external source url
  pathUrl: string; // for display/download
  name: string; // original filename
  title?: string; // display title
  description?: string;
  tags?: string[];
  date: {
    created: string;
    updated: string;
  };
  // Trash system properties
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  updatedAt?: string;
}

export interface FileUploadData {
  file: File;
  title?: string;
  description?: string;
  tags?: string[];
}