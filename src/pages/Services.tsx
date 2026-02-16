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
  X,
  RotateCcw,
  AlertTriangle,
  Calendar,
  Trash
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
  // Trash system fields
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
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
      "Weld preparation services",
      "Counter boring capabilities"
    ],
    specifications: [
      "Flange sizes: 2\" to 120\" diameter",
      "Surface finish: Ra 3.2 μm or better",
      "Tolerance: ±0.002\" flatness"
    ],
    iconType: "wrench",
    status: "active",
    createdAt: "2026-01-16T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-21T09:00:00Z"
  },
  {
    id: "s3",
    title: "Line Boring",
    category: "On-site Machining Services",
    shortDescription: "Precision line boring services for accurate alignment and dimensional restoration of machinery components.",
    detailedDescription: "Professional line boring services to restore precise alignment and dimensions in machinery components, ensuring optimal performance and extended equipment life.",
    benefits: [
      "Precise alignment restoration",
      "Extended equipment life",
      "Reduced vibration and wear",
      "Improved operational efficiency"
    ],
    keyFeatures: [
      "Portable line boring equipment",
      "High precision capabilities",
      "Various bore sizes supported",
      "On-site service delivery"
    ],
    specifications: [
      "Bore diameter: 25mm to 1500mm",
      "Length capacity: Up to 6 meters",
      "Tolerance: ±0.01mm"
    ],
    iconType: "drill",
    status: "active",
    createdAt: "2026-01-17T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-22T09:00:00Z"
  },
  {
    id: "s4",
    title: "Valve Seat Cutting",
    category: "On-site Machining Services",
    shortDescription: "Specialized valve seat cutting and refurbishment services to restore valve sealing performance.",
    detailedDescription: "Expert valve seat cutting services to restore proper sealing surfaces and ensure optimal valve performance in critical applications.",
    benefits: [
      "Restored sealing performance",
      "Extended valve life",
      "Reduced leakage",
      "Cost-effective refurbishment"
    ],
    keyFeatures: [
      "Precision cutting tools",
      "Various valve types supported",
      "On-site refurbishment",
      "Quality surface finish"
    ],
    specifications: [
      "Valve sizes: 1\" to 48\" diameter",
      "Seat angles: 30°, 45°, 60°",
      "Surface finish: Ra 0.8 μm"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-18T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-23T09:00:00Z"
  },
  {
    id: "s5",
    title: "Portable Milling",
    category: "On-site Machining Services",
    shortDescription: "Portable milling services for precision machining of large components that cannot be moved to a workshop.",
    detailedDescription: "Advanced portable milling capabilities for precision machining of large, stationary components, bringing workshop-quality results to your location.",
    benefits: [
      "Workshop-quality results on-site",
      "No component removal required",
      "Reduced downtime",
      "Precision machining capabilities"
    ],
    keyFeatures: [
      "Portable milling machines",
      "Large component capability",
      "Precision tooling",
      "Flexible setup options"
    ],
    specifications: [
      "Milling capacity: Up to 2m x 1m",
      "Spindle power: 15-30 kW",
      "Positioning accuracy: ±0.02mm"
    ],
    iconType: "settings",
    status: "active",
    createdAt: "2026-01-19T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-24T09:00:00Z"
  },
  {
    id: "s6",
    title: "Shaft Turning",
    category: "On-site Machining Services",
    shortDescription: "On-site shaft turning and refurbishment services for rotating equipment maintenance and repair.",
    detailedDescription: "Professional shaft turning services to restore dimensional accuracy and surface finish of rotating shafts without equipment removal.",
    benefits: [
      "Equipment remains in place",
      "Restored dimensional accuracy",
      "Improved surface finish",
      "Extended shaft life"
    ],
    keyFeatures: [
      "Portable lathe equipment",
      "Various shaft diameters",
      "Precision turning capabilities",
      "Surface finishing options"
    ],
    specifications: [
      "Shaft diameter: 50mm to 2000mm",
      "Length capacity: Up to 8 meters",
      "Surface finish: Ra 1.6 μm"
    ],
    iconType: "wrench",
    status: "active",
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-25T09:00:00Z"
  },
  {
    id: "s7",
    title: "Keyway Cutting",
    category: "On-site Machining Services",
    shortDescription: "Precision keyway cutting services for shaft and hub connections in rotating machinery.",
    detailedDescription: "Expert keyway cutting services to create precise keyway slots for secure shaft-hub connections in rotating machinery applications.",
    benefits: [
      "Precise keyway dimensions",
      "Secure shaft connections",
      "Reduced assembly time",
      "Professional finish quality"
    ],
    keyFeatures: [
      "Portable keyway cutting tools",
      "Various keyway standards",
      "Precision cutting capability",
      "Quality surface finish"
    ],
    specifications: [
      "Keyway width: 3mm to 50mm",
      "Depth accuracy: ±0.05mm",
      "Length: Up to 500mm"
    ],
    iconType: "drill",
    status: "active",
    createdAt: "2026-01-21T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-26T09:00:00Z"
  },
  {
    id: "s8",
    title: "Thread Cutting & Repair",
    category: "On-site Machining Services",
    shortDescription: "Thread cutting and repair services for damaged or worn threaded connections in industrial equipment.",
    detailedDescription: "Comprehensive thread cutting and repair services to restore threaded connections and create new threads in existing components.",
    benefits: [
      "Restored thread integrity",
      "Cost-effective repair solution",
      "Extended component life",
      "Improved connection reliability"
    ],
    keyFeatures: [
      "Thread cutting tools",
      "Thread repair inserts",
      "Various thread standards",
      "Quality assurance testing"
    ],
    specifications: [
      "Thread sizes: M6 to M100",
      "Thread pitch: 0.5mm to 6mm",
      "Thread class: 6H/6g standard"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-22T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-27T09:00:00Z"
  },

  // Category 2: Subsea Pipeline and Structure Cutting (2 services)
  {
    id: "s9",
    title: "Subsea Pipeline Cutting",
    category: "Subsea Pipeline and Structure Cutting",
    shortDescription: "Advanced subsea pipeline cutting services for decommissioning, maintenance, and emergency response operations.",
    detailedDescription: "Specialized subsea pipeline cutting services using advanced underwater cutting technologies for safe and efficient pipeline operations in marine environments.",
    benefits: [
      "Safe underwater operations",
      "Minimal environmental impact",
      "Precise cutting capabilities",
      "Emergency response ready"
    ],
    keyFeatures: [
      "Diamond wire cutting",
      "Hydraulic cutting tools",
      "ROV-operated systems",
      "Environmental protection"
    ],
    specifications: [
      "Pipeline diameter: 4\" to 48\"",
      "Water depth: Up to 300m",
      "Cutting accuracy: ±5mm"
    ],
    iconType: "waves",
    status: "featured",
    createdAt: "2026-01-23T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-28T09:00:00Z"
  },
  {
    id: "s10",
    title: "Subsea Structure Dismantling",
    category: "Subsea Pipeline and Structure Cutting",
    shortDescription: "Comprehensive subsea structure dismantling services for offshore platform decommissioning and marine construction.",
    detailedDescription: "Expert subsea structure dismantling services for safe and efficient removal of offshore structures while maintaining environmental compliance.",
    benefits: [
      "Environmental compliance",
      "Safe dismantling procedures",
      "Efficient project execution",
      "Minimal marine disruption"
    ],
    keyFeatures: [
      "Controlled demolition techniques",
      "Environmental monitoring",
      "Debris recovery systems",
      "Safety protocols"
    ],
    specifications: [
      "Structure size: Up to 500 tons",
      "Water depth: Up to 200m",
      "Recovery rate: 95% minimum"
    ],
    iconType: "waves",
    status: "active",
    createdAt: "2026-01-24T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-29T09:00:00Z"
  },

  // Category 3: W3P Enclosure System (1 service)
  {
    id: "s11",
    title: "W3P Habitat Welding Enclosure",
    category: "W3P Enclosure System (Habitat for Welding)",
    shortDescription: "SIRIM QAS internationally certified safety enclosure system for underwater welding operations, designed to protect, prevent, and pressurize.",
    detailedDescription: "The W3P (Wet Welding Protection and Pressurization) system is a SIRIM QAS internationally certified habitat enclosure specifically designed for safe underwater welding operations.",
    benefits: [
      "SIRIM QAS international certification",
      "Enhanced safety for underwater welding",
      "Controlled working environment",
      "Reduced operational risks"
    ],
    keyFeatures: [
      "Pressurized habitat design",
      "Safety monitoring systems",
      "Emergency backup systems",
      "Quality welding environment"
    ],
    specifications: [
      "Working depth: Up to 50m",
      "Habitat size: 2m x 2m x 2m",
      "Pressure rating: 6 bar",
      "Certification: SIRIM QAS"
    ],
    iconType: "shield",
    status: "featured",
    createdAt: "2026-01-25T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-30T09:00:00Z"
  },

  // Category 4: Precision Metal Designing and Machining (10 services)
  {
    id: "s12",
    title: "CNC Precision Machining",
    category: "Precision Metal Designing and Machining",
    shortDescription: "State-of-the-art CNC machining services for complex precision components with tight tolerances.",
    detailedDescription: "Advanced CNC machining capabilities for producing high-precision components with complex geometries and tight tolerances for critical applications.",
    benefits: [
      "High precision manufacturing",
      "Complex geometry capability",
      "Consistent quality output",
      "Reduced lead times"
    ],
    keyFeatures: [
      "5-axis CNC machines",
      "CAD/CAM integration",
      "Quality inspection systems",
      "Material versatility"
    ],
    specifications: [
      "Tolerance: ±0.005mm",
      "Work envelope: 1500x1000x800mm",
      "Spindle speed: 12,000 RPM"
    ],
    iconType: "cog",
    status: "featured",
    createdAt: "2026-01-26T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-01-31T09:00:00Z"
  },
  {
    id: "s13",
    title: "Custom Component Design",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Custom component design and engineering services for specialized industrial applications.",
    detailedDescription: "Comprehensive design and engineering services for custom components, from concept development to final production-ready designs.",
    benefits: [
      "Tailored solutions",
      "Engineering expertise",
      "Design optimization",
      "Cost-effective development"
    ],
    keyFeatures: [
      "3D CAD modeling",
      "Finite element analysis",
      "Prototype development",
      "Design validation"
    ],
    specifications: [
      "Design software: SolidWorks, AutoCAD",
      "Analysis: FEA, CFD capabilities",
      "File formats: STEP, IGES, DWG"
    ],
    iconType: "settings",
    status: "active",
    createdAt: "2026-01-27T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-01T09:00:00Z"
  },
  {
    id: "s14",
    title: "Prototype Manufacturing",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Rapid prototype manufacturing services for product development and testing applications.",
    detailedDescription: "Fast and accurate prototype manufacturing services to support product development cycles and design validation processes.",
    benefits: [
      "Rapid turnaround",
      "Design validation support",
      "Cost-effective prototyping",
      "Multiple material options"
    ],
    keyFeatures: [
      "Rapid prototyping capability",
      "Various manufacturing methods",
      "Quality testing services",
      "Design iteration support"
    ],
    specifications: [
      "Lead time: 3-7 days",
      "Materials: Aluminum, steel, plastics",
      "Quantity: 1-100 pieces"
    ],
    iconType: "wrench",
    status: "active",
    createdAt: "2026-01-28T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-02T09:00:00Z"
  },
  {
    id: "s15",
    title: "Precision Turning",
    category: "Precision Metal Designing and Machining",
    shortDescription: "High-precision turning services for cylindrical components with exceptional surface finish and dimensional accuracy.",
    detailedDescription: "Advanced precision turning capabilities for producing high-quality cylindrical components with superior surface finish and tight dimensional tolerances.",
    benefits: [
      "Exceptional surface finish",
      "Tight dimensional control",
      "High production efficiency",
      "Quality consistency"
    ],
    keyFeatures: [
      "CNC turning centers",
      "Live tooling capability",
      "Automatic bar feeding",
      "In-process measurement"
    ],
    specifications: [
      "Diameter capacity: 3-500mm",
      "Length capacity: Up to 1500mm",
      "Surface finish: Ra 0.4 μm"
    ],
    iconType: "drill",
    status: "active",
    createdAt: "2026-01-29T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-03T09:00:00Z"
  },
  {
    id: "s16",
    title: "Precision Milling",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Advanced precision milling services for complex geometries and multi-axis machining requirements.",
    detailedDescription: "Sophisticated precision milling capabilities for producing complex components with intricate geometries and multi-axis machining requirements.",
    benefits: [
      "Complex geometry capability",
      "Multi-axis machining",
      "High material removal rates",
      "Excellent surface quality"
    ],
    keyFeatures: [
      "5-axis milling centers",
      "High-speed machining",
      "Advanced tooling systems",
      "Precision workholding"
    ],
    specifications: [
      "Work envelope: 2000x1500x1000mm",
      "Spindle speed: 15,000 RPM",
      "Positioning accuracy: ±0.003mm"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-04T09:00:00Z"
  },
  {
    id: "s17",
    title: "Wire EDM Services",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Wire electrical discharge machining services for intricate cuts and complex shapes in hardened materials.",
    detailedDescription: "Precision wire EDM services for creating intricate cuts, complex shapes, and fine details in hardened materials with exceptional accuracy.",
    benefits: [
      "Hardened material capability",
      "Intricate shape cutting",
      "No mechanical stress",
      "Excellent surface finish"
    ],
    keyFeatures: [
      "CNC wire EDM machines",
      "Automatic wire threading",
      "Submerged cutting capability",
      "Multi-axis positioning"
    ],
    specifications: [
      "Wire diameter: 0.1-0.3mm",
      "Workpiece thickness: Up to 400mm",
      "Cutting accuracy: ±0.002mm"
    ],
    iconType: "zap",
    status: "active",
    createdAt: "2026-01-31T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-05T09:00:00Z"
  },
  {
    id: "s18",
    title: "Surface Grinding",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Precision surface grinding services for achieving superior flatness and surface finish on critical components.",
    detailedDescription: "High-precision surface grinding services to achieve exceptional flatness, parallelism, and surface finish on critical machined components.",
    benefits: [
      "Superior surface finish",
      "Exceptional flatness",
      "Tight dimensional control",
      "Consistent quality output"
    ],
    keyFeatures: [
      "CNC surface grinders",
      "Automatic dressing systems",
      "In-process measurement",
      "Various grinding wheels"
    ],
    specifications: [
      "Table size: 1000x500mm",
      "Grinding accuracy: ±0.001mm",
      "Surface finish: Ra 0.1 μm"
    ],
    iconType: "settings",
    status: "active",
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-06T09:00:00Z"
  },
  {
    id: "s19",
    title: "Cylindrical Grinding",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Precision cylindrical grinding services for shafts, pins, and cylindrical components requiring tight tolerances.",
    detailedDescription: "Advanced cylindrical grinding capabilities for producing high-precision shafts, pins, and cylindrical components with exceptional roundness and surface finish.",
    benefits: [
      "Exceptional roundness",
      "Superior surface finish",
      "Tight tolerance capability",
      "High production rates"
    ],
    keyFeatures: [
      "CNC cylindrical grinders",
      "Automatic loading systems",
      "In-process gauging",
      "Various grinding methods"
    ],
    specifications: [
      "Diameter range: 5-500mm",
      "Length capacity: Up to 2000mm",
      "Roundness: 0.001mm"
    ],
    iconType: "drill",
    status: "active",
    createdAt: "2026-02-02T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-07T09:00:00Z"
  },
  {
    id: "s20",
    title: "Gear Manufacturing",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Precision gear manufacturing services for industrial gearboxes and power transmission applications.",
    detailedDescription: "Specialized gear manufacturing services producing high-quality gears for industrial applications with precise tooth profiles and superior quality.",
    benefits: [
      "Precise tooth profiles",
      "Superior gear quality",
      "Various gear types",
      "Quality testing included"
    ],
    keyFeatures: [
      "CNC gear cutting machines",
      "Gear grinding capability",
      "Quality inspection systems",
      "Heat treatment services"
    ],
    specifications: [
      "Module range: 0.5-10",
      "Diameter: Up to 1000mm",
      "Quality grade: DIN 6"
    ],
    iconType: "cog",
    status: "active",
    createdAt: "2026-02-03T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-08T09:00:00Z"
  },
  {
    id: "s21",
    title: "Quality Inspection Services",
    category: "Precision Metal Designing and Machining",
    shortDescription: "Comprehensive quality inspection and measurement services using advanced metrology equipment.",
    detailedDescription: "Professional quality inspection services using state-of-the-art metrology equipment to ensure component quality and dimensional accuracy.",
    benefits: [
      "Accurate measurements",
      "Quality assurance",
      "Detailed reporting",
      "Traceability documentation"
    ],
    keyFeatures: [
      "CMM measurement systems",
      "Optical measurement tools",
      "Surface roughness testing",
      "Dimensional reporting"
    ],
    specifications: [
      "CMM accuracy: ±0.001mm",
      "Measurement volume: 1000x800x600mm",
      "Temperature controlled: ±0.5°C"
    ],
    iconType: "award",
    status: "active",
    createdAt: "2026-02-04T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-09T09:00:00Z"
  },

  // Category 5: Sacrificial Anode Installation and Specialized Coating (2 services)
  {
    id: "s22",
    title: "Sacrificial Anode Installation",
    category: "Sacrificial Anode Installation and Specialized Coating",
    shortDescription: "Professional installation of sacrificial anodes on coated pipelines for cathodic protection systems.",
    detailedDescription: "Expert installation services for sacrificial anodes on coated pipelines, supporting major pipeline coating applicators since 2001 with proven cathodic protection solutions.",
    benefits: [
      "Proven track record since 2001",
      "Expert installation techniques",
      "Cathodic protection optimization",
      "Extended pipeline life"
    ],
    keyFeatures: [
      "Various anode types supported",
      "Precision installation methods",
      "Quality assurance testing",
      "Installation documentation"
    ],
    specifications: [
      "Anode types: Aluminum, Zinc, Magnesium",
      "Pipeline diameter: 4\" to 48\"",
      "Installation depth: Up to 30m"
    ],
    iconType: "zap",
    status: "featured",
    createdAt: "2026-02-05T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-10T09:00:00Z"
  },
  {
    id: "s23",
    title: "Specialized Pipeline Coating",
    category: "Sacrificial Anode Installation and Specialized Coating",
    shortDescription: "Advanced pipeline coating services for corrosion protection in marine and industrial environments.",
    detailedDescription: "Comprehensive pipeline coating services providing superior corrosion protection for pipelines in challenging marine and industrial environments.",
    benefits: [
      "Superior corrosion protection",
      "Extended service life",
      "Environmental resistance",
      "Cost-effective protection"
    ],
    keyFeatures: [
      "Multiple coating systems",
      "Surface preparation services",
      "Quality control testing",
      "Application expertise"
    ],
    specifications: [
      "Coating types: FBE, 3LPE, 3LPP",
      "Thickness range: 200-3000 μm",
      "Temperature rating: Up to 120°C"
    ],
    iconType: "shield",
    status: "active",
    createdAt: "2026-02-06T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-11T09:00:00Z"
  },

  // Category 6: Fabrication and Maintenance (2 services)
  {
    id: "s24",
    title: "Structural Fabrication",
    category: "Fabrication and Maintenance (Onshore and Offshore)",
    shortDescription: "Comprehensive structural fabrication services for onshore and offshore industrial applications.",
    detailedDescription: "Professional structural fabrication services providing complete solutions for piping systems, structural frameworks, and mechanical equipment in both onshore and offshore environments.",
    benefits: [
      "Onshore and offshore capability",
      "Complete fabrication solutions",
      "Quality workmanship",
      "Project management expertise"
    ],
    keyFeatures: [
      "Structural steel fabrication",
      "Piping system fabrication",
      "Mechanical equipment assembly",
      "Quality assurance programs"
    ],
    specifications: [
      "Steel grades: A36, A572, A992",
      "Welding standards: AWS D1.1, API 1104",
      "Capacity: Up to 500 tons"
    ],
    iconType: "drill",
    status: "active",
    createdAt: "2026-02-07T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-12T09:00:00Z"
  },
  {
    id: "s25",
    title: "Industrial Maintenance Services",
    category: "Fabrication and Maintenance (Onshore and Offshore)",
    shortDescription: "Comprehensive maintenance services for industrial equipment and infrastructure in onshore and offshore facilities.",
    detailedDescription: "Complete maintenance solutions for industrial equipment, piping systems, and infrastructure, ensuring optimal performance and extended service life in demanding environments.",
    benefits: [
      "Comprehensive maintenance solutions",
      "Reduced downtime",
      "Extended equipment life",
      "Cost-effective service delivery"
    ],
    keyFeatures: [
      "Preventive maintenance programs",
      "Emergency repair services",
      "Equipment refurbishment",
      "Condition monitoring"
    ],
    specifications: [
      "Service coverage: 24/7 availability",
      "Response time: <4 hours emergency",
      "Maintenance types: Preventive, corrective, predictive"
    ],
    iconType: "wrench",
    status: "active",
    createdAt: "2026-02-08T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-13T09:00:00Z"
  },

  // Category 7: Power Boilers & Pressure Vessels (1 service)
  {
    id: "s26",
    title: "ASME Boiler & Pressure Vessel Services",
    category: "Manufacture, Assembly, Repairs & Alteration of Power Boilers (S) & Pressure Vessels (U,U2)",
    shortDescription: "ASME certified manufacturing, assembly, repair and alteration services for power boilers and pressure vessels.",
    detailedDescription: "Complete ASME certified services for power boilers and pressure vessels, including manufacturing, assembly, repairs, and alterations in compliance with ASME Boiler and Pressure Vessel Code.",
    benefits: [
      "ASME certification compliance",
      "Complete service portfolio",
      "Quality assurance programs",
      "Regulatory compliance support"
    ],
    keyFeatures: [
      "ASME S, U, U2 stamp authority",
      "Design and engineering services",
      "Manufacturing capabilities",
      "Inspection and testing services"
    ],
    specifications: [
      "Pressure rating: Up to 1500 PSI",
      "Temperature rating: Up to 650°C",
      "Capacity: Up to 100,000 lbs/hr steam"
    ],
    iconType: "award",
    status: "featured",
    createdAt: "2026-02-09T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z",
    publishedAt: "2026-02-14T09:00:00Z"
  }
];

export default function Services() {
  // State management
  const [services, setServices] = useState<Service[]>(mockServices);
  const [categories, setCategories] = useState<ServiceCategory[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [viewingService, setViewingService] = useState<Service | null>(null);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  
  // Form state for arrays
  const [benefitsInput, setBenefitsInput] = useState('');
  const [keyFeaturesInput, setKeyFeaturesInput] = useState('');
  const [specificationsInput, setSpecificationsInput] = useState('');
  
  // Delete confirmation states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  // Get category options without numbering
  const categoryOptions = categories.sort((a, b) => a.order - b.order).map(cat => cat.name);

  // Filter services (exclude deleted services from main view)
  const activeServices = services.filter(service => !service.isDeleted);
  
  const filteredServices = activeServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Trash system functions
  const handleDeleteService = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteDialogOpen(true);
  };

  const confirmMoveToTrash = () => {
    if (!serviceToDelete) return;
    
    const now = new Date();
    
    setServices(services.map(s => s.id === serviceToDelete.id ? {
      ...s,
      isDeleted: true,
      deletedAt: now.toISOString(),
      deletedBy: "Current User", // In real app, get from auth context
      updatedAt: now.toISOString()
    } : s));
    
    setIsDeleteDialogOpen(false);
    const serviceName = serviceToDelete.title;
    setServiceToDelete(null);
    toast.success(`"${serviceName}" moved to trash. Will be permanently deleted in 7 days.`);
  };


  // Other service functions
  const handleAddService = () => {
    setEditingService(null);
    setBenefitsInput('');
    setKeyFeaturesInput('');
    setSpecificationsInput('');
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setBenefitsInput(service.benefits.join('\n'));
    setKeyFeaturesInput(service.keyFeatures.join('\n'));
    setSpecificationsInput(service.specifications.join('\n'));
    setIsDialogOpen(true);
  };

  const handleViewService = (service: Service) => {
    setViewingService(service);
    setIsViewDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const benefitsArray = benefitsInput.split('\n').map(b => b.trim()).filter(b => b);
    const keyFeaturesArray = keyFeaturesInput.split('\n').map(f => f.trim()).filter(f => f);
    const specificationsArray = specificationsInput.split('\n').map(s => s.trim()).filter(s => s);
    
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
    return iconMap[iconType] || <Wrench className="h-5 w-5" />;
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? getIcon(category.iconType) : <Wrench className="h-4 w-4" />;
  };

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
    const servicesInCategory = services.filter(s => s.category === category?.name);
    
    if (servicesInCategory.length > 0) {
      toast.error(`Cannot delete category "${category?.name}" because it contains ${servicesInCategory.length} service(s). Please move or delete the services first.`);
      return;
    }
    
    setCategories(categories.filter(c => c.id !== categoryId));
    toast.success(`Category "${category?.name}" deleted successfully`);
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

  // Drag and drop for categories
  const handleDragStart = (e: React.DragEvent, categoryId: string) => {
    e.dataTransfer.setData("text/plain", categoryId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCategoryId: string) => {
    e.preventDefault();
    const draggedCategoryId = e.dataTransfer.getData("text/plain");
    
    if (draggedCategoryId === targetCategoryId) return;

    const draggedCategory = categories.find(c => c.id === draggedCategoryId);
    const targetCategory = categories.find(c => c.id === targetCategoryId);
    
    if (!draggedCategory || !targetCategory) return;

    const newCategories = [...categories];
    const draggedIndex = newCategories.findIndex(c => c.id === draggedCategoryId);
    const targetIndex = newCategories.findIndex(c => c.id === targetCategoryId);
    
    // Remove dragged category and insert at target position
    const [removed] = newCategories.splice(draggedIndex, 1);
    newCategories.splice(targetIndex, 0, removed);
    
    // Update order numbers
    const updatedCategories = newCategories.map((category, index) => ({
      ...category,
      order: index + 1,
      updatedAt: new Date().toISOString()
    }));
    
    setCategories(updatedCategories);
    toast.success("Category order updated successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Services</h1>
            <p className="text-muted-foreground">
              Manage RWNA Engineering service offerings and categories
            </p>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">Services Management</TabsTrigger>
          <TabsTrigger value="categories">Categories Management</TabsTrigger>
        </TabsList>

        {/* Services Management Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Services Management</h2>
              <p className="text-muted-foreground">
                (Showing {filteredServices.length} of {activeServices.length} services)
              </p>
            </div>
            <Button onClick={handleAddService} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Service
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
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
                        <CardTitle className="text-lg leading-tight">
                          {service.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          {getCategoryIcon(service.category)}
                          <span className="truncate">{service.category}</span>
                        </div>
                      </div>
                    </div>
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
                          Edit Service
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteService(service)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Move to Trash
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(service.status)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Updated: {new Date(service.updatedAt).toLocaleDateString()}</span>
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
                {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                  ? "Try adjusting your search criteria or filters."
                  : "Get started by creating your first service."}
              </p>
              {(!searchQuery && categoryFilter === 'all' && statusFilter === 'all') && (
                <Button onClick={handleAddService}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Service
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        {/* Categories Management Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Categories Management</h2>
              <p className="text-muted-foreground">
                Manage service categories and their organization. Drag and drop to reorder.
              </p>
            </div>
            <Button onClick={handleAddCategory} className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              Add New Category
            </Button>
          </div>

          {/* Categories List */}
          <div className="space-y-4">
            {categories.sort((a, b) => a.order - b.order).map((category) => (
              <Card 
                key={category.id} 
                className="group hover:shadow-md transition-all duration-200 cursor-move"
                draggable
                onDragStart={(e) => handleDragStart(e, category.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GripVertical className="h-4 w-4" />
                        <span className="text-sm font-medium">#{category.order}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {getIcon(category.iconType)}
                      </div>
                      <div className="flex flex-col">
                        <CardTitle className="text-lg">
                          {category.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {category.serviceCount} services
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                    <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                    <span>Updated: {new Date(category.updatedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Move to Trash?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to move "{serviceToDelete?.title}" to trash?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-start gap-3">
                <Trash className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium">What happens next:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Service will be moved to trash
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
          <form onSubmit={handleCategorySubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCategory?.name}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iconType">Icon</Label>
                <Select name="iconType" defaultValue={editingCategory?.iconType || 'wrench'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon}
                          <span>{option.label}</span>
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
                defaultValue={editingCategory?.description}
                placeholder="Enter category description"
                rows={3}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Service Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={editingService?.title}
                      placeholder="Enter service title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue={editingService?.category}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iconType">Icon</Label>
                    <Select name="iconType" defaultValue={editingService?.iconType || 'wrench'}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              {option.icon}
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={editingService?.status || 'draft'}>
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
                  <Label htmlFor="photo">Photo URL (Optional)</Label>
                  <Input
                    id="photo"
                    name="photo"
                    defaultValue={editingService?.photo}
                    placeholder="Enter photo URL"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    defaultValue={editingService?.shortDescription}
                    placeholder="Enter a brief description (1-2 sentences)"
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="detailedDescription">Detailed Description</Label>
                  <Textarea
                    id="detailedDescription"
                    name="detailedDescription"
                    defaultValue={editingService?.detailedDescription}
                    placeholder="Enter detailed service description"
                    rows={5}
                    required
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits (One per line)</Label>
                  <Textarea
                    id="benefits"
                    value={benefitsInput}
                    onChange={(e) => setBenefitsInput(e.target.value)}
                    placeholder="Enter each benefit on a new line"
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keyFeatures">Key Features (One per line)</Label>
                  <Textarea
                    id="keyFeatures"
                    value={keyFeaturesInput}
                    onChange={(e) => setKeyFeaturesInput(e.target.value)}
                    placeholder="Enter each key feature on a new line"
                    rows={6}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specifications">Technical Specifications (One per line)</Label>
                  <Textarea
                    id="specifications"
                    value={specificationsInput}
                    onChange={(e) => setSpecificationsInput(e.target.value)}
                    placeholder="Enter each specification on a new line"
                    rows={8}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingService ? 'Update Service' : 'Create Service'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Service View Dialog (existing - truncated for brevity) */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {viewingService && (
                <>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getIcon(viewingService.iconType)}
                  </div>
                  {viewingService.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {viewingService?.category} • {viewingService && getStatusBadge(viewingService.status)}
            </DialogDescription>
          </DialogHeader>
          
          {viewingService && (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specs</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Short Description</h4>
                    <p className="text-muted-foreground">{viewingService.shortDescription}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Detailed Description</h4>
                    <p className="text-muted-foreground">{viewingService.detailedDescription}</p>
                  </div>
                  {viewingService.photo && (
                    <div>
                      <h4 className="font-semibold mb-2">Photo</h4>
                      <img 
                        src={viewingService.photo} 
                        alt={viewingService.title}
                        className="max-w-full h-auto rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="benefits" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {viewingService.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {viewingService.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Technical Specifications</h4>
                  <ul className="space-y-2">
                    {viewingService.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Clipboard className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="metadata" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Service ID</Label>
                      <p className="text-sm text-muted-foreground">{viewingService.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">{getStatusBadge(viewingService.status)}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <p className="text-sm text-muted-foreground">{viewingService.category}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Created</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(viewingService.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Last Updated</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(viewingService.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    {viewingService.publishedAt && (
                      <div>
                        <Label className="text-sm font-medium">Published</Label>
                        <p className="text-sm text-muted-foreground">
                          {new Date(viewingService.publishedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {viewingService && (
              <Button onClick={() => {
                setIsViewDialogOpen(false);
                handleEditService(viewingService);
              }} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Service
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}