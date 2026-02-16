import React, { useState, useEffect } from "react";
import { 
  Wrench, 
  Waves, 
  Shield, 
  Cog, 
  Zap, 
  Drill,
  Settings,
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Upload,
  Image as ImageIcon,
  FileText,
  List,
  Clipboard,
  GripVertical,
  FolderPlus,
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";

/**
 * Services Management Page
 * Complete content management system for RWNA Engineering service offerings with category management.
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  iconType: string;
  order: number;
  serviceCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;
  photo?: string;
  benefits: string[];
  keyFeatures: string[];
  specifications: string[];
  iconType: string;
  status: 'active' | 'featured' | 'coming_soon' | 'draft';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

const iconOptions = [
  { value: 'wrench', label: 'Wrench', icon: <Wrench className="h-4 w-4" /> },
  { value: 'waves', label: 'Waves', icon: <Waves className="h-4 w-4" /> },
  { value: 'shield', label: 'Shield', icon: <Shield className="h-4 w-4" /> },
  { value: 'cog', label: 'Cog', icon: <Cog className="h-4 w-4" /> },
  { value: 'zap', label: 'Zap', icon: <Zap className="h-4 w-4" /> },
  { value: 'drill', label: 'Drill', icon: <Drill className="h-4 w-4" /> },
  { value: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  { value: 'award', label: 'Award', icon: <Award className="h-4 w-4" /> },
];

// Initial categories without numbering
const mockCategories: ServiceCategory[] = [
  {
    id: "cat1",
    name: "On-site Machining Services",
    description: "Comprehensive machining services delivered directly to your location, eliminating downtime and transportation costs.",
    iconType: "wrench",
    order: 1,
    serviceCount: 8,
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z"
  },
  {
    id: "cat2",
    name: "Subsea Pipeline and Structure Cutting",
    description: "Advanced underwater cutting solutions for pipeline maintenance, decommissioning, and emergency repairs.",
    iconType: "waves",
    order: 2,
    serviceCount: 2,
    createdAt: "2026-01-02T10:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z"
  },
  {
    id: "cat3",
    name: "W3P Enclosure System (Habitat for Welding)",
    description: "SIRIM QAS internationally certified safety enclosure for hot work, primarily welding, designed to protect, prevent, and pressurize.",
    iconType: "shield",
    order: 3,
    serviceCount: 1,
    createdAt: "2026-01-03T10:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z"
  },
  {
    id: "cat4",
    name: "Precision Metal Designing and Machining",
    description: "State-of-the-art CNC machinery and precision manufacturing capabilities for complex engineering components.",
    iconType: "cog",
    order: 4,
    serviceCount: 10,
    createdAt: "2026-01-04T10:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z"
  },
  {
    id: "cat5",
    name: "Sacrificial Anode Installation and Specialized Coating",
    description: "RWNA has been supporting major pipeline coating applicators since 2001 for installation of sacrificial anode on the coated line pipes.",
    iconType: "zap",
    order: 5,
    serviceCount: 2,
    createdAt: "2026-01-05T10:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z"
  },
  {
    id: "cat6",
    name: "Fabrication and Maintenance (Onshore and Offshore)",
    description: "Comprehensive fabrication, installation, and maintenance services for piping, structures, and mechanical equipment.",
    iconType: "drill",
    order: 6,
    serviceCount: 2,
    createdAt: "2026-01-06T10:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z"
  },
  {
    id: "cat7",
    name: "Manufacture, Assembly, Repairs & Alteration of Power Boilers (S) & Pressure Vessels (U,U2)",
    description: "ASME certified manufacturing, assembly, repair and alteration services for power boilers and pressure vessels.",
    iconType: "award",
    order: 7,
    serviceCount: 1,
    createdAt: "2026-01-07T10:00:00Z",
    updatedAt: "2026-02-15T14:30:00Z"
  }
];

const mockServices: Service[] = [
  // Category 1: On-site Machining Services (8 services)
  {
    id: "s1",
    title: "Cold Cutting & Bevelling",
    category: "On-site Machining Services",
    shortDescription: "RWNA caters to your onshore or offshore on-site machining needs for cold cutting and bevelling. This method of pipe cutting and bevelling is highly recommended.",
    detailedDescription: "Comprehensive machining services delivered directly to your location, eliminating downtime and transportation costs. RWNA caters to your onshore or offshore on-site machining needs for cold cutting and bevelling.",
    benefits: [
      "It is conducive in hazardous environments (where instances of fire or explosion are possible) due to the low rpm of milling or lathe process",
      "It is a good replacement for traditional methods such as torches, reed cutters, and grinders",
      "Field cuts are performed with greater accuracy and speed",
      "Higher level of safety is assured",
      "Fast and easy to set-up",
      "Safe and cost-effective solution"
    ],
    keyFeatures: [
      "Mobile, convenient, quick and easy set up, work can be done instantly on-site",
      "Short pipe end preparation time",
      "Requires minimum clearance, able to fit into tight working areas and minimize machine height",
      "Split frame design creates easy setup, installation and operation",
      "Choice of pneumatic or hydraulic driven motor",
      "Flexibility to choose from a wide range of bevel types and sizes",
      "Parts and accessories are also interchangeable",
      "Able to cut and bevel large range of pipe sizes, schedule and materials"
    ],
    specifications: [
      "Low Clearance Split Frame: Size ranges from ½\" to 108\" Pipe OD",
      "Travel Cutter: Size ranges from 6\" to 72\" Pipe OD & 22ft Vessel Diameter"
    ],
    iconType: "wrench",
    status: "featured",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-20T09:00:00Z"
  },
  {
    id: "s2",
    title: "Flange Facing & Milling",
    category: "On-site Machining Services",
    shortDescription: "RWNA's on-site flange facing and milling teams are committed to produce a lathe quality surface on all types of flange face, seal groove, weld preparation and also counter boring.",
    detailedDescription: "On-site flange facing and milling with lathe quality surface finish for all types of flange faces, providing precision machining services at your location.",
    benefits: [
      "Lathe quality surface finish",
      "Eliminates transportation costs",
      "Reduces downtime",
      "On-site precision work"
    ],
    keyFeatures: [
      "All types of flange faces",
      "Seal groove preparation", 
      "Weld preparation",
      "Counter boring capabilities"
    ],
    specifications: [
      "Flange sizes: 2\" to 120\" diameter",
      "Surface finish: Ra 3.2 μm or better"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-05T16:45:00Z",
    publishedAt: "2026-01-15T10:00:00Z"
  },
  // Add more services here (truncated for brevity - keeping the same structure)
  {
    id: "s3",
    title: "Diamond Wire Saw (DWS)",
    category: "Subsea Pipeline and Structure Cutting",
    shortDescription: "RWNA Subsea Diamond Wire Saw System has been specially designed to cut submerged pipes (horizontal and vertical), tubular structures and pipelines of varying materials and thickness.",
    detailedDescription: "Advanced underwater cutting solutions for pipeline maintenance, decommissioning, and emergency repairs using specialized diamond wire saw technology.",
    benefits: [
      "Precise underwater cutting",
      "Minimal environmental impact",
      "Suitable for various materials",
      "Emergency repair capability"
    ],
    keyFeatures: [
      "Horizontal and vertical cutting",
      "Various materials compatibility",
      "Different thickness capability",
      "Submerged operation"
    ],
    specifications: [
      "Cutting diameter: Up to 48\" pipe OD",
      "Operating depth: Up to 300m",
      "Wire speed: Variable control"
    ],
    iconType: "waves",
    status: "featured",
    createdAt: "2026-01-20T12:00:00Z",
    updatedAt: "2026-02-12T11:20:00Z",
    publishedAt: "2026-01-25T14:00:00Z"
  },
  {
    id: "s4",
    title: "Hydraulic Bolt Tensioning",
    category: "On-site Machining Services",
    shortDescription: "RWNA has highly trained technicians and state of the art equipment for all bolting needs. We offer an accurate method of tightening threaded fasteners with subsequent load bearing capabilities through hydraulic technology.",
    detailedDescription: "Professional hydraulic bolt tensioning services with highly trained technicians and state-of-the-art equipment for accurate fastener tightening and load bearing applications.",
    benefits: [
      "Highly trained technicians",
      "State of the art equipment",
      "Accurate tightening method",
      "Superior load bearing capabilities"
    ],
    keyFeatures: [
      "Hydraulic technology",
      "Threaded fastener expertise",
      "Load bearing optimization",
      "Professional service team"
    ],
    specifications: [
      "Bolt sizes: M12 to M100",
      "Tensioning force: Up to 500 tons",
      "Accuracy: ±5% of target load"
    ],
    iconType: "settings",
    status: "active",
    createdAt: "2026-01-14T11:00:00Z",
    updatedAt: "2026-02-08T15:20:00Z",
    publishedAt: "2026-01-20T12:45:00Z"
  },
  {
    id: "s5",
    title: "Hydraulic/Pneumatic Torque Wrench",
    category: "On-site Machining Services",
    shortDescription: "RWNA owns and operates state of the art hydraulic & pneumatic torque wrenches supported by qualified and experienced manpower. A hydraulic torque wrench is a tool designed to exert torque on a fastener to achieve proper tightening or loosening of a connection through the use of hydraulics.",
    detailedDescription: "State-of-the-art hydraulic and pneumatic torque wrench services with qualified and experienced manpower for precise fastener tightening and loosening operations.",
    benefits: [
      "State of the art equipment",
      "Qualified and experienced manpower",
      "Precise torque application",
      "Proper tightening and loosening"
    ],
    keyFeatures: [
      "Hydraulic torque wrenches",
      "Pneumatic torque wrenches",
      "Fastener expertise",
      "Connection optimization"
    ],
    specifications: [
      "Torque range: 100 Nm to 47,000 Nm",
      "Accuracy: ±4% of reading",
      "Operating pressure: Up to 700 bar"
    ],
    iconType: "wrench",
    status: "active",
    createdAt: "2026-01-16T13:00:00Z",
    updatedAt: "2026-02-09T09:45:00Z",
    publishedAt: "2026-01-22T14:30:00Z"
  },
  {
    id: "s6",
    title: "Hot/Cold Tapping",
    category: "On-site Machining Services",
    shortDescription: "RWNA presents the best hot/cold tapping solution that allows a branch connection to be made into piping or vessels while the system remains live and under working pressure.",
    detailedDescription: "Advanced hot and cold tapping solutions enabling branch connections to be made into live piping systems and vessels under working pressure without shutdown.",
    benefits: [
      "No system shutdown required",
      "Live system operation",
      "Working pressure maintenance",
      "Cost-effective branch connections"
    ],
    keyFeatures: [
      "Hot tapping capability",
      "Cold tapping services",
      "Live system connections",
      "Pressure vessel compatibility"
    ],
    specifications: [
      "Pipe sizes: 2\" to 48\" diameter",
      "Pressure rating: Up to 150 bar",
      "Temperature range: -20°C to +400°C"
    ],
    iconType: "drill",
    status: "featured",
    createdAt: "2026-01-18T10:30:00Z",
    updatedAt: "2026-02-11T16:15:00Z",
    publishedAt: "2026-01-24T11:00:00Z"
  },
  {
    id: "s7",
    title: "Line Boring and Hole Drilling & Threading",
    category: "On-site Machining Services",
    shortDescription: "RWNA offers both onshore and offshore on-site machining services for line boring as well as hole drilling and threading. Line boring is the process of enlarging a hole that has already been drilled (or cast).",
    detailedDescription: "Comprehensive onshore and offshore line boring, hole drilling, and threading services for precision machining applications and equipment alignment.",
    benefits: [
      "Onshore and offshore capability",
      "Precision hole enlargement",
      "Equipment alignment services",
      "Threading capabilities"
    ],
    keyFeatures: [
      "Line boring expertise",
      "Hole drilling services",
      "Threading operations",
      "Precision machining"
    ],
    specifications: [
      "Boring diameter: Up to 500mm",
      "Drilling capacity: Up to 100mm diameter",
      "Threading: M6 to M100"
    ],
    iconType: "drill",
    status: "active",
    createdAt: "2026-01-20T14:00:00Z",
    updatedAt: "2026-02-12T10:30:00Z",
    publishedAt: "2026-01-26T15:45:00Z"
  },
  {
    id: "s8",
    title: "On-Site Valve Services",
    category: "On-site Machining Services",
    shortDescription: "Comprehensive valve grinding, lapping, and testing services performed on-site to restore valve performance and extend operational life.",
    detailedDescription: "Professional on-site valve services including grinding, lapping, and testing to restore valve performance, extend operational life, and ensure system reliability.",
    benefits: [
      "Restored valve performance",
      "Extended operational life",
      "On-site convenience",
      "System reliability improvement"
    ],
    keyFeatures: [
      "Valve grinding services",
      "Precision lapping",
      "Performance testing",
      "Operational life extension"
    ],
    specifications: [
      "Valve sizes: 1\" to 48\" diameter",
      "Valve types: Gate, Globe, Ball, Check",
      "Pressure classes: 150# to 2500#"
    ],
    iconType: "settings",
    status: "active",
    createdAt: "2026-01-22T12:00:00Z",
    updatedAt: "2026-02-13T14:20:00Z",
    publishedAt: "2026-01-28T16:30:00Z"
  },

  // Category 2: Subsea Pipeline and Structure Cutting (2 services)
  {
    id: "s10",
    title: "Hydraulic Driven Heavy Duty Split Frame (HD HDSF)",
    category: "Subsea Pipeline and Structure Cutting",
    shortDescription: "RWNA also provides Subsea Cutting service using Hydraulic Driven Heavy Duty Split Frame \"HD HDSF\" machines depending on the cutting requirements.",
    detailedDescription: "Heavy-duty subsea cutting services using hydraulic driven split frame machines designed for demanding underwater cutting applications and varying requirements.",
    benefits: [
      "Heavy-duty cutting capability",
      "Hydraulic power system",
      "Adaptable to cutting requirements",
      "Robust subsea operation"
    ],
    keyFeatures: [
      "Hydraulic driven system",
      "Heavy duty construction",
      "Split frame design",
      "Requirement-based adaptation"
    ],
    specifications: [
      "Cutting capacity: Up to 60\" pipe OD",
      "Operating depth: Up to 500m",
      "Hydraulic pressure: Up to 350 bar"
    ],
    iconType: "waves",
    status: "active",
    createdAt: "2026-01-24T15:30:00Z",
    updatedAt: "2026-02-14T12:45:00Z",
    publishedAt: "2026-01-30T17:15:00Z"
  },

  // Category 3: W3P Enclosure System (1 service)
  {
    id: "s11",
    title: "W3P Enclosure System",
    category: "W3P Enclosure System (Habitat for Welding)",
    shortDescription: "RWNA's W3P Enclosure System is a SIRIM QAS internationally certified safety enclosure (also known as a welding habitat) for hot work, primarily welding.",
    detailedDescription: "SIRIM QAS internationally certified safety enclosure for hot work, primarily welding, designed to protect, prevent, and pressurize.",
    benefits: [
      "SIRIM QAS internationally certified",
      "Enhanced safety for hot work",
      "Prevents contamination",
      "Controlled environment"
    ],
    keyFeatures: [
      "International safety standards",
      "Hot work protection",
      "Welding habitat design",
      "Pressurization capability"
    ],
    specifications: [
      "Certification: SIRIM QAS International",
      "Pressure rating: Up to 15 PSI",
      "Temperature range: -20°C to +60°C"
    ],
    iconType: "shield",
    status: "featured",
    createdAt: "2026-01-05T09:30:00Z",
    updatedAt: "2026-02-08T13:15:00Z",
    publishedAt: "2026-01-10T11:00:00Z"
  },

  // Category 4: Precision Metal Designing and Machining (10 services)
  {
    id: "s12",
    title: "DMG Mori CNC Turnmill Machine",
    category: "Precision Metal Designing and Machining",
    shortDescription: "DMG Mori, NL2000 - Made in Japan. Multipurpose machine able to perform both turning and milling functions.",
    detailedDescription: "State-of-the-art CNC machinery and precision manufacturing capabilities for complex engineering components using advanced Japanese technology.",
    benefits: [
      "High precision manufacturing",
      "Dual turning and milling capability",
      "Japanese quality and reliability",
      "Complex component production"
    ],
    keyFeatures: [
      "Multipurpose turning and milling",
      "Advanced CNC control system",
      "High accuracy positioning",
      "Automated tool changing"
    ],
    specifications: [
      "Model: DMG Mori NL2000",
      "Origin: Made in Japan",
      "Max turning diameter: 500mm",
      "Spindle speed: Up to 4000 RPM"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-12T14:00:00Z",
    updatedAt: "2026-02-06T10:30:00Z",
    publishedAt: "2026-01-18T09:00:00Z"
  },
  {
    id: "s13",
    title: "Double Column Fully Automatic Band Saw",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Model WA-460 HANC - Made in Taiwan. Double column machine provides maximum capacity and rigidity.",
    detailedDescription: "High-capacity band saw with double column design for maximum rigidity and precision cutting of large materials.",
    benefits: [
      "Maximum cutting capacity",
      "Superior rigidity and stability",
      "Fully automatic operation",
      "High precision cuts"
    ],
    keyFeatures: [
      "Double column design",
      "Fully automatic operation",
      "Large material capacity",
      "Precision cutting control"
    ],
    specifications: [
      "Model: WA-460 HANC",
      "Origin: Made in Taiwan",
      "Cutting capacity: 460mm diameter",
      "Blade speed: Variable control"
    ],
    iconType: "settings",
    status: "active",
    createdAt: "2026-01-14T16:00:00Z",
    updatedAt: "2026-02-07T11:20:00Z",
    publishedAt: "2026-01-19T14:30:00Z"
  },
  {
    id: "s14",
    title: "Waterjet Cutting Machine",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Flow Model MACH2 3120b - Made in USA. Cutting process by using water and abrasive (garnet).",
    detailedDescription: "Advanced waterjet cutting technology for complex materials and precision requirements using high-pressure water and abrasive cutting.",
    benefits: [
      "No heat affected zone",
      "Precise cutting of various materials",
      "Complex geometry capability",
      "Minimal material waste"
    ],
    keyFeatures: [
      "High-pressure water cutting",
      "Abrasive garnet system",
      "Multi-material compatibility",
      "CNC controlled precision"
    ],
    specifications: [
      "Model: Flow MACH2 3120b",
      "Origin: Made in USA",
      "Cutting pressure: Up to 60,000 PSI",
      "Table size: 3120mm x 1560mm"
    ],
    iconType: "zap",
    status: "featured",
    createdAt: "2026-01-08T11:00:00Z",
    updatedAt: "2026-02-04T15:45:00Z",
    publishedAt: "2026-01-14T12:00:00Z"
  },
  {
    id: "s15",
    title: "TMT CNC Turning Machine",
    category: "Precision Metal Designing and Machining",
    shortDescription: "TMT Model L-290M - Made in Taiwan. Easy to operate with high precision and accuracy.",
    detailedDescription: "High-precision CNC turning machine designed for easy operation while maintaining exceptional accuracy and repeatability.",
    benefits: [
      "Easy operation interface",
      "High precision turning",
      "Consistent accuracy",
      "Reliable performance"
    ],
    keyFeatures: [
      "User-friendly CNC control",
      "High precision spindle",
      "Automatic tool changer",
      "Rigid machine construction"
    ],
    specifications: [
      "Model: TMT L-290M",
      "Origin: Made in Taiwan",
      "Max turning diameter: 290mm",
      "Spindle speed: Up to 3500 RPM"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-16T09:00:00Z",
    updatedAt: "2026-02-08T14:15:00Z",
    publishedAt: "2026-01-22T10:30:00Z"
  },
  {
    id: "s16",
    title: "DMGT NC Turning Machine",
    category: "Precision Metal Designing and Machining",
    shortDescription: "DMTG Model CKE 6150Z - Made in China. Easy to operate with automatic forced lubrication.",
    detailedDescription: "Reliable NC turning machine with automatic forced lubrication system for consistent performance and easy operation in production environments.",
    benefits: [
      "Easy operation",
      "Automatic forced lubrication",
      "Consistent performance",
      "Production reliability"
    ],
    keyFeatures: [
      "NC control system",
      "Forced lubrication system",
      "Production efficiency",
      "Reliable operation"
    ],
    specifications: [
      "Model: DMTG CKE 6150Z",
      "Origin: Made in China",
      "Max turning diameter: 500mm",
      "Chuck size: 250mm"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-18T11:30:00Z",
    updatedAt: "2026-02-09T16:45:00Z",
    publishedAt: "2026-01-24T12:15:00Z"
  },
  {
    id: "s17",
    title: "Pinnacle CNC Milling Machine (LV126)",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Pinnacle, LV126 - Made in Taiwan. High accuracy of positioning and repeatability.",
    detailedDescription: "High-precision CNC milling machine with exceptional positioning accuracy and repeatability for demanding machining applications.",
    benefits: [
      "High positioning accuracy",
      "Excellent repeatability",
      "Precision machining capability",
      "Reliable performance"
    ],
    keyFeatures: [
      "CNC milling capability",
      "High accuracy positioning",
      "Repeatability excellence",
      "Precision control"
    ],
    specifications: [
      "Model: Pinnacle LV126",
      "Origin: Made in Taiwan",
      "Table size: 1300mm x 600mm",
      "Spindle speed: Up to 8000 RPM"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-20T13:45:00Z",
    updatedAt: "2026-02-11T09:30:00Z",
    publishedAt: "2026-01-26T14:00:00Z"
  },
  {
    id: "s18",
    title: "Pinnacle CNC Milling Machine (LV105)",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Pinnacle, LV105 - Made in Taiwan. High accuracy of positioning and repeatability.",
    detailedDescription: "Compact CNC milling machine with high accuracy positioning and repeatability for precision machining of smaller components.",
    benefits: [
      "High positioning accuracy",
      "Excellent repeatability",
      "Compact design",
      "Precision machining"
    ],
    keyFeatures: [
      "CNC milling capability",
      "Compact footprint",
      "High accuracy positioning",
      "Repeatability excellence"
    ],
    specifications: [
      "Model: Pinnacle LV105",
      "Origin: Made in Taiwan",
      "Table size: 1050mm x 500mm",
      "Spindle speed: Up to 8000 RPM"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-22T15:20:00Z",
    updatedAt: "2026-02-12T11:45:00Z",
    publishedAt: "2026-01-28T16:30:00Z"
  },
  {
    id: "s19",
    title: "NC Surface Grinding Machine (SD6120AA)",
    category: "Precision Metal Designing and Machining",
    shortDescription: "PROTH Model SD6120AA - Made in Taiwan. Surface grinding is one of the oldest and widely used grinding process.",
    detailedDescription: "Professional NC surface grinding machine utilizing one of the oldest and most widely used grinding processes for precision surface finishing.",
    benefits: [
      "Proven grinding technology",
      "Precision surface finishing",
      "Wide application range",
      "Reliable operation"
    ],
    keyFeatures: [
      "NC control system",
      "Surface grinding capability",
      "Precision finishing",
      "Wide process application"
    ],
    specifications: [
      "Model: PROTH SD6120AA",
      "Origin: Made in Taiwan",
      "Table size: 600mm x 1200mm",
      "Grinding wheel: 355mm diameter"
    ],
    iconType: "settings",
    status: "active",
    createdAt: "2026-01-24T10:15:00Z",
    updatedAt: "2026-02-13T14:30:00Z",
    publishedAt: "2026-01-30T11:45:00Z"
  },
  {
    id: "s20",
    title: "DMG MORI CNC Milling Machine (DMU 50)",
    category: "Precision Metal Designing and Machining",
    shortDescription: "DMG MORI Model: DMU 50 - Made in Germany. 5-axis universal milling with positioning and simultaneous capabilities.",
    detailedDescription: "Advanced 5-axis universal milling machine with both positioning and simultaneous capabilities for complex component manufacturing.",
    benefits: [
      "5-axis milling capability",
      "Universal machining",
      "Positioning and simultaneous modes",
      "German engineering quality"
    ],
    keyFeatures: [
      "5-axis universal milling",
      "Positioning capabilities",
      "Simultaneous machining",
      "Complex geometry production"
    ],
    specifications: [
      "Model: DMG MORI DMU 50",
      "Origin: Made in Germany",
      "5-axis capability",
      "Spindle speed: Up to 18000 RPM"
    ],
    iconType: "cog",
    status: "featured",
    createdAt: "2026-01-26T12:30:00Z",
    updatedAt: "2026-02-14T16:15:00Z",
    publishedAt: "2026-02-01T13:00:00Z"
  },
  {
    id: "s21",
    title: "DMG MORI CNC Turn Mill Machine (DMU 125)",
    category: "Precision Metal Designing and Machining",
    shortDescription: "DMG MORI Model: DMU 125 - Made in Germany. 5-axis universal turn mill with positioning and simultaneous capabilities.",
    detailedDescription: "Premium 5-axis universal turn mill machine combining turning and milling operations with positioning and simultaneous capabilities for ultimate precision.",
    benefits: [
      "5-axis turn mill capability",
      "Universal machining operations",
      "Positioning and simultaneous modes",
      "Premium German engineering"
    ],
    keyFeatures: [
      "5-axis turn mill operations",
      "Universal machining capability",
      "Positioning and simultaneous modes",
      "Complex component production"
    ],
    specifications: [
      "Model: DMG MORI DMU 125",
      "Origin: Made in Germany",
      "5-axis turn mill capability",
      "Max turning diameter: 500mm"
    ],
    iconType: "cog",
    status: "featured",
    createdAt: "2026-01-28T14:45:00Z",
    updatedAt: "2026-02-15T10:20:00Z",
    publishedAt: "2026-02-03T15:30:00Z"
  },

  // Category 5: Sacrificial Anode Installation and Specialized Coating (2 services)
  {
    id: "s22",
    title: "Sacrificial Anode Installation",
    category: "Sacrificial Anode Installation and Specialized Coating",
    shortDescription: "Sacrificial anode is part of the defensive system to ensure continuous integrity of a pipeline system. Bredero Shaw Sdn Bhd and PPSC Industries Sdn Bhd are among our major customers in this field of interest.",
    detailedDescription: "RWNA has been supporting major pipeline coating applicators since 2001 for installation of sacrificial anode on the coated line pipes.",
    benefits: [
      "Continuous pipeline integrity",
      "Corrosion protection system",
      "Proven track record since 2001",
      "Major industry partnerships"
    ],
    keyFeatures: [
      "Defensive corrosion system",
      "Pipeline integrity assurance",
      "Coated line pipe compatibility",
      "Industry standard installation"
    ],
    specifications: [
      "Installation method: Welded attachment",
      "Anode types: Aluminum, Zinc, Magnesium",
      "Pipeline compatibility: All standard sizes",
      "Coating systems: Compatible with major applicators"
    ],
    iconType: "zap",
    status: "featured",
    createdAt: "2026-01-06T13:00:00Z",
    updatedAt: "2026-02-03T09:15:00Z",
    publishedAt: "2026-01-11T10:45:00Z"
  },
  {
    id: "s23",
    title: "Specialized Coatings and Pin Brazing",
    category: "Sacrificial Anode Installation and Specialized Coating",
    shortDescription: "We also provide services in specialized coatings and pin brazing to complement our anode installation services.",
    detailedDescription: "Comprehensive coating and pin brazing services that complement our sacrificial anode installation capabilities for complete pipeline protection.",
    benefits: [
      "Complete protection system",
      "Complementary services",
      "Specialized coating expertise",
      "Integrated solution approach"
    ],
    keyFeatures: [
      "Specialized coating application",
      "Pin brazing technology",
      "Anode installation integration",
      "Complete system approach"
    ],
    specifications: [
      "Coating types: Epoxy, Polyethylene, FBE",
      "Pin brazing: Copper-silver alloy",
      "Temperature range: Up to 200°C",
      "Application method: Spray, brush, dip"
    ],
    iconType: "award",
    status: "active",
    createdAt: "2026-01-09T10:30:00Z",
    updatedAt: "2026-02-05T14:20:00Z",
    publishedAt: "2026-01-16T11:15:00Z"
  },

  // Category 6: Fabrication and Maintenance (2 services)
  {
    id: "s24",
    title: "Fabrication and Installation Services",
    category: "Fabrication and Maintenance (Onshore and Offshore)",
    shortDescription: "Complete fabrication and installation services for various industrial applications.",
    detailedDescription: "Comprehensive fabrication, installation, and maintenance services for piping, structures, and mechanical equipment both onshore and offshore.",
    benefits: [
      "Complete project solutions",
      "Onshore and offshore capability",
      "Quality fabrication standards",
      "Timely project delivery"
    ],
    keyFeatures: [
      "Structural fabrication",
      "Piping system installation",
      "Mechanical equipment setup",
      "Quality assurance programs"
    ],
    specifications: [
      "Fabrication standards: ASME, API, AWS",
      "Material types: Carbon steel, Stainless steel, Alloys",
      "Welding processes: SMAW, GMAW, GTAW, SAW",
      "Capacity: Up to 500 tons per project"
    ],
    iconType: "drill",
    status: "active",
    createdAt: "2026-01-11T15:00:00Z",
    updatedAt: "2026-02-08T12:30:00Z",
    publishedAt: "2026-01-17T13:45:00Z"
  },
  {
    id: "s25",
    title: "Plant Maintenance and Equipment Services",
    category: "Fabrication and Maintenance (Onshore and Offshore)",
    shortDescription: "Comprehensive maintenance and equipment services for industrial plants and facilities.",
    detailedDescription: "Complete maintenance solutions for industrial plants including preventive maintenance, equipment overhaul, and emergency repair services.",
    benefits: [
      "Reduced downtime",
      "Preventive maintenance programs",
      "Emergency response capability",
      "Equipment life extension"
    ],
    keyFeatures: [
      "Scheduled maintenance programs",
      "Equipment overhaul services",
      "Emergency repair response",
      "Condition monitoring systems"
    ],
    specifications: [
      "Response time: 24/7 emergency service",
      "Equipment types: Pumps, Compressors, Heat exchangers",
      "Maintenance standards: ISO 14224, API 510/570/653",
      "Service locations: Onshore and offshore facilities"
    ],
    iconType: "settings",
    status: "active",
    createdAt: "2026-01-13T12:00:00Z",
    updatedAt: "2026-02-09T16:00:00Z",
    publishedAt: "2026-01-20T08:30:00Z"
  },

  // Category 7: Manufacture, Assembly, Repairs & Alteration of Power Boilers (1 service)
  {
    id: "s26",
    title: "ASME Certified Services",
    category: "Manufacture, Assembly, Repairs & Alteration of Power Boilers (S) & Pressure Vessels (U,U2)",
    shortDescription: "Complete ASME certified services for power boilers and pressure vessels with proper documentation and compliance.",
    detailedDescription: "ASME certified manufacturing, assembly, repair and alteration services for power boilers and pressure vessels with comprehensive documentation and regulatory compliance.",
    benefits: [
      "ASME certification compliance",
      "Complete documentation",
      "Regulatory compliance",
      "Quality assurance"
    ],
    keyFeatures: [
      "Power boiler services",
      "Pressure vessel expertise",
      "Manufacturing capabilities",
      "Assembly and repair services"
    ],
    specifications: [
      "Certifications: ASME S, U, U2 stamps",
      "Pressure ratings: Up to 2500 PSI",
      "Temperature ratings: Up to 650°C",
      "Documentation: Complete ASME compliance"
    ],
    iconType: "award",
    status: "featured",
    createdAt: "2026-01-30T16:00:00Z",
    updatedAt: "2026-02-15T12:45:00Z",
    publishedAt: "2026-02-05T14:15:00Z"
  }
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [categories, setCategories] = useState<ServiceCategory[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  
  // Category management states
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [draggedCategory, setDraggedCategory] = useState<ServiceCategory | null>(null);
  
  // Form state for arrays
  const [benefitsInput, setBenefitsInput] = useState('');
  const [keyFeaturesInput, setKeyFeaturesInput] = useState('');
  const [specificationsInput, setSpecificationsInput] = useState('');

  // Get category options without numbering
  const categoryOptions = categories.sort((a, b) => a.order - b.order).map(cat => cat.name);

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Category management functions
  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: ServiceCategory) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category && category.serviceCount > 0) {
      toast.error(`Cannot delete category "${category.name}" - it has ${category.serviceCount} services assigned`);
      return;
    }
    
    setCategories(categories.filter(c => c.id !== categoryId));
    toast.success("Category deleted successfully");
  };

  const handleCategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const categoryData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      iconType: formData.get("iconType") as string,
    };

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? {
        ...c,
        ...categoryData,
        updatedAt: new Date().toISOString()
      } : c));
      toast.success("Category updated successfully");
    } else {
      const newCategory: ServiceCategory = {
        id: `cat${categories.length + 1}`,
        ...categoryData,
        order: categories.length + 1,
        serviceCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully");
    }

    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  // Drag and drop functions
  const handleDragStart = (e: React.DragEvent, category: ServiceCategory) => {
    setDraggedCategory(category);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetCategory: ServiceCategory) => {
    e.preventDefault();
    
    if (!draggedCategory || draggedCategory.id === targetCategory.id) {
      setDraggedCategory(null);
      return;
    }

    const draggedIndex = categories.findIndex(c => c.id === draggedCategory.id);
    const targetIndex = categories.findIndex(c => c.id === targetCategory.id);
    
    const newCategories = [...categories];
    const [removed] = newCategories.splice(draggedIndex, 1);
    newCategories.splice(targetIndex, 0, removed);
    
    // Update order numbers
    const updatedCategories = newCategories.map((cat, index) => ({
      ...cat,
      order: index + 1,
      updatedAt: new Date().toISOString()
    }));
    
    setCategories(updatedCategories);
    setDraggedCategory(null);
    toast.success("Category order updated");
  };

  // Service management functions (existing)
  const handleAddService = () => {
    setEditingService(null);
    setBenefitsInput('');
    setKeyFeaturesInput('');
    setSpecificationsInput('');
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setBenefitsInput(service.benefits.join('\\n'));
    setKeyFeaturesInput(service.keyFeatures.join('\\n'));
    setSpecificationsInput(service.specifications.join('\\n'));
    setIsDialogOpen(true);
  };

  const handleViewService = (service: Service) => {
    setViewingService(service);
    setIsViewDialogOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
    toast.success("Service deleted successfully");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const benefitsArray = benefitsInput.split('\\n').map(b => b.trim()).filter(b => b);
    const keyFeaturesArray = keyFeaturesInput.split('\\n').map(f => f.trim()).filter(f => f);
    const specificationsArray = specificationsInput.split('\\n').map(s => s.trim()).filter(s => s);
    
    const serviceData = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      shortDescription: formData.get("shortDescription") as string,
      detailedDescription: formData.get("detailedDescription") as string,
      photo: formData.get("photo") as string,
      benefits: benefitsArray,
      keyFeatures: keyFeaturesArray,
      specifications: specificationsArray,
      iconType: formData.get("iconType") as string,
      status: formData.get("status") as Service['status'],
    };

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? {
        ...s,
        ...serviceData,
        updatedAt: new Date().toISOString()
      } : s));
      toast.success("Service updated successfully");
    } else {
      const newService: Service = {
        id: `s${services.length + 1}`,
        ...serviceData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: serviceData.status !== 'draft' ? new Date().toISOString() : undefined
      };
      setServices([...services, newService]);
      toast.success("Service created successfully");
    }

    setIsDialogOpen(false);
    setEditingService(null);
    setBenefitsInput('');
    setKeyFeaturesInput('');
    setSpecificationsInput('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'featured':
        return <Badge className="bg-primary/10 text-primary border-primary/20"><Star className="h-3 w-3 mr-1" />Featured</Badge>;
      case 'active':
        return <Badge variant="secondary"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'coming_soon':
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Coming Soon</Badge>;
      case 'draft':
        return <Badge variant="outline" className="text-muted-foreground"><Edit className="h-3 w-3 mr-1" />Draft</Badge>;
      default:
        return null;
    }
  };

  const getIcon = (iconType: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      wrench: <Wrench className="h-5 w-5" />,
      waves: <Waves className="h-5 w-5" />,
      shield: <Shield className="h-5 w-5" />,
      cog: <Cog className="h-5 w-5" />,
      zap: <Zap className="h-5 w-5" />,
      drill: <Drill className="h-5 w-5" />,
      settings: <Settings className="h-5 w-5" />,
      award: <Award className="h-5 w-5" />,
    };
    return iconMap[iconType] || <Settings className="h-5 w-5" />;
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.name === category);
    if (categoryData) {
      return getIcon(categoryData.iconType);
    }
    return <Settings className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Manage RWNA Engineering service offerings and technical capabilities.
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">Services Management</TabsTrigger>
          <TabsTrigger value="categories">Categories Management</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-muted-foreground">
              <span className="text-sm font-medium text-primary">
                (Showing {filteredServices.length} of {services.length} services)
              </span>
            </p>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={handleAddService}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="coming_soon">Coming Soon</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            {(categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-200 border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {getIcon(service.iconType)}
                      </div>
                      <div className="flex flex-col">
                        <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          {getCategoryIcon(service.category)}
                          <span className="truncate">{service.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(service.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewService(service)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditService(service)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteService(service.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Features ({service.keyFeatures.length}):</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.keyFeatures.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature.length > 20 ? `${feature.substring(0, 20)}...` : feature}
                        </Badge>
                      ))}
                      {service.keyFeatures.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.keyFeatures.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <span>Updated: {new Date(service.updatedAt).toLocaleDateString()}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleViewService(service)}>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No services found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Category Management</h2>
              <p className="text-muted-foreground">
                Manage service categories with drag & drop sorting.
                <span className="ml-2 text-sm font-medium text-primary">
                  ({categories.length} categories)
                </span>
              </p>
            </div>
            <Button onClick={handleAddCategory}>
              <FolderPlus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>

          {/* Categories List */}
          <div className="space-y-4">
            {categories.sort((a, b) => a.order - b.order).map((category) => (
              <Card 
                key={category.id} 
                className="group hover:shadow-md transition-all duration-200 cursor-move"
                draggable
                onDragStart={(e) => handleDragStart(e, category)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GripVertical className="h-4 w-4" />
                        <span className="text-sm font-mono">#{category.order}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {getIcon(category.iconType)}
                      </div>
                      <div className="flex flex-col">
                        <CardTitle className="text-lg leading-tight">{category.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {category.serviceCount} services
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Category
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-destructive"
                            disabled={category.serviceCount > 0}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Category
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <FolderPlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first service category to get started.
              </p>
              <Button onClick={handleAddCategory}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Category Add/Edit Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Update category information.' : 'Create a new service category.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCategory?.name || ""}
                  placeholder="On-site Machining Services"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iconType">Icon</Label>
                <Select name="iconType" defaultValue={editingCategory?.iconType || ""} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon}
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingCategory?.description || ""}
                placeholder="Brief description of this service category..."
                rows={3}
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingCategory ? 'Update Category' : 'Create Category'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Service Add/Edit Dialog (existing - truncated for brevity) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
            <DialogDescription>
              {editingService ? 'Update service information and detailed content.' : 'Create a new service offering for RWNA Engineering with complete details.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Service Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={editingService?.title || ""}
                      placeholder="Cold Cutting & Bevelling"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue={editingService?.category || ""} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="iconType">Icon</Label>
                    <Select name="iconType" defaultValue={editingService?.iconType || ""} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              {option.icon}
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={editingService?.status || "draft"} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="coming_soon">Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Service Photo URL</Label>
                  <Input
                    id="photo"
                    name="photo"
                    defaultValue={editingService?.photo || ""}
                    placeholder="https://example.com/service-photo.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of the service photo or upload to your media library
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    defaultValue={editingService?.shortDescription || ""}
                    placeholder="Brief description shown on service cards..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detailedDescription">Detailed Description</Label>
                  <Textarea
                    id="detailedDescription"
                    name="detailedDescription"
                    defaultValue={editingService?.detailedDescription || ""}
                    placeholder="Comprehensive description with technical details and overview..."
                    rows={5}
                    required
                  />
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    value={benefitsInput}
                    onChange={(e) => setBenefitsInput(e.target.value)}
                    placeholder="Enter each benefit on a new line..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter each benefit on a separate line
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keyFeatures">Key Features</Label>
                  <Textarea
                    id="keyFeatures"
                    value={keyFeaturesInput}
                    onChange={(e) => setKeyFeaturesInput(e.target.value)}
                    placeholder="Enter each key feature on a new line..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter each key feature on a separate line
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specifications">Technical Specifications</Label>
                  <Textarea
                    id="specifications"
                    value={specificationsInput}
                    onChange={(e) => setSpecificationsInput(e.target.value)}
                    placeholder="Enter each specification on a new line..."
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter each technical specification on a separate line
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingService ? 'Update Service' : 'Create Service'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Service View Dialog (existing - truncated for brevity) */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewingService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getIcon(viewingService.iconType)}
                  </div>
                  <div>
                    <DialogTitle>{viewingService.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                      {getCategoryIcon(viewingService.category)}
                      {viewingService.category}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getStatusBadge(viewingService.status)}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {viewingService.shortDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingService.keyFeatures.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditService(viewingService);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Service
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}