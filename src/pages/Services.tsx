import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  CheckCircle2, 
  Cog, 
  Waves, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Wrench,
  X,
  Settings,
  Scissors,
  Hammer,
  Drill,
  Gauge,
  Flame,
  Home,
  Microscope
} from "lucide-react";
import { IMAGES } from "@/assets/images";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SubService {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  keyFeatures: string[];
  specifications: string[];
  image?: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  subServices: SubService[];
}

const services: Service[] = [
  {
    id: "onsite-machining",
    title: "On-site Machining Services",
    description: "Comprehensive machining services delivered directly to your location, eliminating downtime and transportation costs.",
    icon: <Settings className="w-6 h-6" />,
    subServices: [
      {
        id: "cold-cutting",
        title: "Cold Cutting & Bevelling",
        description: "RWNA caters to your onshore or offshore on-site machining needs for cold cutting and bevelling. This method of pipe cutting and bevelling is highly recommended.",
        image: "PIPE_CUTTING_1",
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
          "Flexibility to choose from wide range of bevel types and sizes",
          "Parts and accessories are also interchangeable",
          "Able to cut and bevel large range of pipe sizes, schedule and materials"
        ],
        specifications: [
          "Low Clearance Split Frame: Size ranges from ½\" to 108\" Pipe OD",
          "Travel L Cutter: Size ranges from 6\" to 72\" Pipe OD & 33ft Vessel Diameter"
        ]
      },
      {
        id: "flange-facing",
        title: "Flange Facing & Milling",
        description: "RWNA's on-site flange facing and milling teams are committed to produce a lathe quality surface on all types of flange face, seal groove, weld preparation and also counter boring.",
        image: "FLANGE_MILLING_5",
        benefits: [
          "A more permanent and cheaper alternative to expensive leak-sealing techniques or flange replacement, gauging and re-welding",
          "Helps keep systems running efficiently and safely",
          "Reclaim scrap flanges and flanged valves",
          "Fast and easy to set-up",
          "Solid performance. Ability to complete most jobs during scheduled down time, reducing any unnecessary delays"
        ],
        keyFeatures: [
          "Quick and easy set up for fast machining process",
          "Choice of pneumatic or hydraulic driven motor",
          "Allows easy on-site repair of large equipment previously made impossible",
          "All facing types are available (RTJ, Raised Face, Lens Ring etc.)"
        ],
        specifications: [
          "Flange Facing: Sizes ranges from ½\" to 150\" O.D. Flange, External/internal-mounted",
          "Milling: Size ranges from 25mm to 2,300mm, XYZ axis, Passes the flatness test"
        ]
      },
      {
        id: "pipe-end-prep",
        title: "Pipe End Prep",
        description: "With RWNA's onshore and offshore on-site Pipe End Prep service, you can eliminate the reliance of oxy/acetylene for bevel preparation. Whether using manual welding or automated welding, this is the optimum way to manufacture bevels on-site.",
        image: "PIPE_CUTTING_3",
        benefits: [],
        keyFeatures: [
          "Quick and easy set up for fast machining process",
          "Quality bevel and counter bore",
          "Requires minimal clearance",
          "Flexibility to choose from any bevel type",
          "Precise measurements",
          "End prep for elbow, tees & valves"
        ],
        specifications: [
          "Size ranges from ¼\" to 14\"",
          "Bevelling and counter boring application",
          "Internal and external clamp"
        ]
      },
      {
        id: "hydraulic-bolt-tensioning",
        title: "Hydraulic Bolt Tensioning",
        description: "RWNA has highly trained technicians and state of the art equipment for all bolting needs. We offer an accurate method of tightening threaded fasteners with subsequent load bearing capabilities through hydraulic technology.",
        image: "HYDRAULIC_TOOLS_1",
        benefits: [
          "Suitable for offshore, onshore topside and sub-sea applications",
          "The applied load is controlled very accurately, because it is directly proportional to the pressure applied to the tensioner",
          "Operation of tooling and improved accuracy reduces time required to retighten the load",
          "Tensioning allows for loading multiple fasteners in a joint at the same time",
          "Uniform bolt loading ensures a high level of accuracy by applying a consistent force",
          "Purely axial, tensile loading ensures no torsional stresses are introduced"
        ],
        keyFeatures: [
          "Highly portable, convenient, quick and easy set up",
          "Hydraulic-driven motor",
          "Easily estimate friction co-efficiency",
          "Zero inaccuracy as force is pre-set based on piston area and tensioning device pressure"
        ],
        specifications: [
          "Stud bolt size ranges from 1\" to 3½\""
        ]
      },
      {
        id: "torque-wrench",
        title: "Hydraulic/Pneumatic Torque Wrench",
        description: "RWNA owns and operates state of the art hydraulic & pneumatic torque wrenches supported by qualified and experienced manpower. A hydraulic torque wrench is a tool designed to exert torque on a fastener to achieve proper tightening or loosening of a connection through the use of hydraulics.",
        benefits: [
          "Our hydraulic/pneumatic torque wrench system is cutting-edge, compact and an accurate tool for loosening and tightening bolted connection without damaging bolts",
          "Tested and calibrated for high accuracy, reliable and repeatability"
        ],
        keyFeatures: [
          "Rigid steel design ensuring durability, reliability and safety",
          "High versatility: one hydraulic drive unit per torque capacity can be used to drive any hexagon head within that range",
          "Quick and easy set up for efficient operation",
          "Choice of pneumatic or hydraulic driven motors",
          "Higher accuracy of up to +/- 3% with standard torque chart"
        ],
        specifications: [
          "Nut size ranges from 27mm to 145mm"
        ]
      },
      {
        id: "hot-cold-tapping",
        title: "Hot/Cold Tapping",
        description: "RWNA presents the best hot/cold tapping solution that allows a branch connection to be made into piping or vessels while the system remains live and under working pressure.",
        benefits: [
          "Ensures continuous system operations",
          "Reduces downtime and costs for clients",
          "Safe and cost-effective solution, allowing efficient repair or modification while under full operating conditions",
          "The latest internationally proven software is used to prepare the data for online welding"
        ],
        keyFeatures: [
          "Additional branches allowing supply to and from other areas of the plant etc.",
          "Hot Taps performed on a variety of piping and vessel materials and mediums",
          "No pipe content released to the atmosphere",
          "Monitoring points for temperature probes",
          "Entry points for isolation equipment (stopples)",
          "Cutting, realignment and re-welding of pipeline sections are unnecessary"
        ],
        specifications: [
          "Size ranges from ½\" to 12\""
        ]
      },
      {
        id: "line-boring",
        title: "Line Boring and Hole Drilling & Threading",
        description: "RWNA offers both onshore and offshore on-site machining services for line boring as well as hole drilling and threading. Line boring is the process of enlarging a hole that has already been drilled (or cast).",
        benefits: [
          "Eliminate costly dismantling",
          "Decrease production downtime",
          "High precision",
          "Light weight",
          "Easy to setup",
          "Suitable for an array of on-site machining applications",
          "Uses the latest linear guide ways and heavy duty spindles with ISO standard spindle tapers",
          "Efficient with all materials"
        ],
        keyFeatures: [
          "Hollow hard chrome precision ground boring bar",
          "Infinite variable feed rate and adjustable boring arms",
          "Easy assembly and less production downtime",
          "Eliminates transportation of equipment to repair/workshop area as it can be done on large equipment",
          "Linear rails & guides for accuracy and rigidity",
          "Spindle accepts standard tooling",
          "Direct spindle drive",
          "Auto feed / hand feed gearbox and motor"
        ],
        specifications: []
      },
      {
        id: "valve-services",
        title: "On-Site Valve Services",
        description: "Comprehensive valve grinding, lapping, and testing services performed on-site to restore valve performance and extend operational life.",
        benefits: [
          "Time saving",
          "On-site service eliminates valve body removal requirements",
          "Improve valve lifetime and operating efficiency",
          "Able to restore valve original performance",
          "Cost efficient solution"
        ],
        keyFeatures: [
          "On-Site Grinding & Lapping Machines for Safety Valves",
          "On-Site Special Tools for Grinding Conical Valve Seats",
          "Grinding & Lapping Consumables",
          "On-Site Portable Machine for Grinding & Lapping of Sealing Faces (3/8 inch - 64 inch)",
          "On-Site High Speed Grinding Machines for Machining Flat and Conical Seats (¾ inch - 60 inch)",
          "Valve Testing",
          "Surface Lapping",
          "Gate Valves Wedges & Control Valve Discs Grinding Table"
        ],
        specifications: []
      }
    ]
  },
  {
    id: "subsea-cutting",
    title: "Subsea Pipeline and Structure Cutting",
    description: "Advanced underwater cutting solutions for pipeline maintenance, decommissioning, and emergency repairs.",
    icon: <Waves className="w-6 h-6" />,
    subServices: [
      {
        id: "diamond-wire-saw",
        title: "Diamond Wire Saw (DWS)",
        description: "RWNA Subsea Diamond Wire Saw System has been specially designed to cut submerged pipes (horizontal and vertical), tubular structures and pipelines of varying materials and thickness.",
        image: "SUBSEA_CUTTING_3",
        benefits: [
          "Remote controlled cutting",
          "Reliable cutting method",
          "Produces clean and even cuts",
          "Cut is complete and verified when the wire travels through the structure/pipe"
        ],
        keyFeatures: [
          "Constructed from lightweight aluminium plate",
          "Easily replaceable long-life diamond wire cutting element",
          "Hydraulic-driven synchronized clamping arms",
          "Intelligent self-adjusting automatic feed system to ensure smooth and even cut",
          "Flexible mounting on multiple positions: vertically, horizontally or any desired angles",
          "Capable of easily cutting through most materials such as concrete coated pipe and cladded pipe"
        ],
        specifications: [
          "Effortlessly cuts from 4\" to 36\" O.D.",
          "Deep water cutting",
          "Shallow or deep water platform decommissioning",
          "Pipeline repair and maintenance",
          "Destructive pipeline decommissioning",
          "Cutting mixed materials (i.e. steel and grout)"
        ]
      },
      {
        id: "hydraulic-split-frame",
        title: "Hydraulic Driven Heavy Duty Split Frame (HD HDSF)",
        description: "RWNA also provides Subsea Cutting service using Hydraulic Driven Heavy Duty Split Frame \"HD HDSF\" machines depending on the cutting requirements.",
        benefits: [
          "Designed for parting and beveling of larger diameter pipelines in the field",
          "Constructed with a bigger cross section, larger gear sets and massive hardened steel components",
          "Steel construction makes them suitable for extreme usage",
          "Produces a precision lathe finish using safe cold cutting process",
          "Minimizes risk of explosion in gas and petrochemical lines",
          "Superior strength",
          "Suitable for onshore surface and subsea cutting & bevelling operations"
        ],
        keyFeatures: [
          "O.D tracking slides, parting and bevelling",
          "Hydraulic driven motor",
          "Ratcheting hinge mechanism for scissoring open and close",
          "Self-squaring mounting system with adjustable clamping legs",
          "Lifting hooks for vertical or horizontal mounting",
          "Fully enclosed bearings and drive gears for safety and durability"
        ],
        specifications: [
          "Capable of cutting up to 108\" O.D. tubular structure, vessel and pipes"
        ]
      }
    ]
  },
  {
    id: "w3p-enclosure",
    title: "W3P Enclosure System (Habitat for Welding)",
    description: "SIRIM QAS internationally certified safety enclosure for hot work, primarily welding, designed to protect, prevent, and pressurize.",
    icon: <ShieldCheck className="w-6 h-6" />,
    subServices: [
      {
        id: "w3p-system",
        title: "W3P Enclosure System",
        description: "RWNA's W3P Enclosure System is a SIRIM QAS internationally certified safety enclosure (also known as a welding habitat) for hot work, primarily welding.",
        benefits: [
          "Specially designed for optimal welding in horizontal area",
          "Modifications (size of enclosures, etc.) can be made to meet requirements",
          "Qualified technicians and engineers can creatively solve ad-hoc site issues",
          "Highly customizable enclosures to meet all of our clients' needs"
        ],
        keyFeatures: [
          "Inflatable structure, designed for offshore platforms and petrochemical plants placement",
          "Easy installation and disassembly via fabric panels with interchangeable zips",
          "Expandable walls create spaces on platforms and isolate welding area",
          "Airlock door prevents entry of hazardous substances",
          "Simple control panel installed with auto shutdown system (upon gas detection) and emergency panel for fast evacuation",
          "Automatic shutdown system is triggered when gas is detected",
          "Emergency push button is provided for manual system shutdown",
          "Alarm during low pressure detection",
          "Cost-effective, portable and simple control panel with auto shutdown system"
        ],
        specifications: [
          "FR PVC-coated fabric is BS 5438 compliant and certified by SIRIM QAS International",
          "Enclosure sewn with fire retardant thread and attached with fire retardant hook and loop",
          "Consist of certified explosion proof equipment that is safe to use in hazardous environments",
          "PROTECT: Confines flammable hot work residue for protection",
          "PREVENT: Isolates hot work area from hazardous environment to prevent explosion",
          "PRESSURIZE: Creates a positive pressure within the enclosure"
        ]
      }
    ]
  },
  {
    id: "precision-machining",
    title: "Precision Metal Designing and Machining",
    description: "State-of-the-art CNC machinery and precision manufacturing capabilities for complex engineering components.",
    icon: <Cpu className="w-6 h-6" />,
    subServices: [
      {
        id: "dmg-mori-turnmill",
        title: "DMG Mori CNC Turnmill Machine",
        description: "DMG Mori, NL2000 - Made in Japan. Multipurpose machine able to perform both turning and milling functions.",
        image: "CNC_MACHINING_1",
        benefits: [
          "Multipurpose; Able to perform both turning and milling functions",
          "Able to clamp workpiece with maximum diameter of 190mm and length of 400mm",
          "High efficiency and time saving",
          "Innovative turret head design and best turning properties"
        ],
        keyFeatures: [
          "XYZ axis",
          "Turning process: Threading, Hole drilling, Parting, Boring, Outside diameter (OD) and inside diameter (ID) profiling",
          "Milling Process: Reaming, Counter bore, Profiling, Etc."
        ],
        specifications: []
      },
      {
        id: "bandsaw",
        title: "Double Column Fully Automatic Band Saw",
        description: "Model WA-460 HANC - Made in Taiwan. Double column machine provides maximum capacity and rigidity.",
        benefits: [
          "Double column machine provides maximum capacity and rigidity",
          "High performance machine with premium blade",
          "Sturdy construction, low maintenance and high durability",
          "Precision feed pressure and feed rate"
        ],
        keyFeatures: [
          "Able to cut through solid materials into any desired size",
          "Able to cut through metal, steel, wooden block and etc."
        ],
        specifications: []
      },
      {
        id: "waterjet",
        title: "Waterjet Cutting Machine",
        description: "Flow Model MACH2 3120b - Made in USA. Cutting process by using water and abrasive (garnet).",
        benefits: [
          "Rigid construction for structural integrity and heavy duty material",
          "Cut through metal smoothly with maximum thickness of 2.5 inches",
          "Reliable performance and consistent quality",
          "No material delamination"
        ],
        keyFeatures: [
          "Cutting process by using water and abrasive (garnet)",
          "Able to cut through materials to produce complex shapes and angles at any desired size"
        ],
        specifications: []
      },
      {
        id: "tmt-cnc",
        title: "TMT CNC Turning Machine",
        description: "TMT Model L-290M - Made in Taiwan. Easy to operate with high precision and accuracy.",
        benefits: [
          "Easy to operate",
          "High precision and accuracy",
          "Superior machining stability with one-piece cast iron base"
        ],
        keyFeatures: [
          "XZ axis",
          "Turning process only: Threading, Hole drilling (Side drilling), Parting, Facing, Outside diameter (OD) and inside diameter (ID) profiling"
        ],
        specifications: []
      },
      {
        id: "dmgt-nc",
        title: "DMGT NC Turning Machine",
        description: "DMTG Model CKE 6150Z - Made in China. Easy to operate with automatic forced lubrication.",
        benefits: [
          "Easy to operate",
          "Automatic forced lubrication",
          "High speed, high spindle torque, big spindle bore"
        ],
        keyFeatures: [
          "XZ axis",
          "Turning process: Reaming process, Threading, Hole drilling, Parting, Facing, Outside diameter (OD) and inside diameter (ID) profiling"
        ],
        specifications: []
      },
      {
        id: "pinnacle-lv126",
        title: "Pinnacle CNC Milling Machine (LV126)",
        description: "Pinnacle, LV126 - Made in Taiwan. High accuracy of positioning and repeatability.",
        benefits: [
          "Able to clamp work piece with diameter up to 1000mm",
          "High accuracy of positioning and repeatability",
          "Rugged construction assures optimum rigidity and stability",
          "High precision spindle for high quality machining",
          "User friendly"
        ],
        keyFeatures: [
          "XYZ axis linear way",
          "Milling Process: Side drilling (a-axis attachment), Profiling, Reaming, Etc."
        ],
        specifications: []
      },
      {
        id: "pinnacle-lv105",
        title: "Pinnacle CNC Milling Machine (LV105)",
        description: "Pinnacle, LV105 - Made in Taiwan. High accuracy of positioning and repeatability.",
        benefits: [
          "Able to clamp work piece with diameter up to 800mm",
          "High accuracy of positioning and repeatability",
          "Rugged construction assures optimum rigidity and stability",
          "High precision spindle for high quality machining",
          "User friendly"
        ],
        keyFeatures: [
          "XYZ axis linear way",
          "Milling Process: Profiling, Reaming, Etc."
        ],
        specifications: []
      },
      {
        id: "surface-grinding",
        title: "NC Surface Grinding Machine (SD6120AA)",
        description: "PROTH Model SD6120AA - Made in Taiwan. Surface grinding is one of the oldest and widely used grinding process.",
        benefits: [
          "Surface grinding is one of the oldest and widely used grinding process",
          "User friendly, time saving, and cost saving",
          "Consistent surface qualities",
          "Reduce mechanical deformation of work pieces"
        ],
        keyFeatures: [
          "Surface Grinding",
          "Slotting",
          "Parting tools"
        ],
        specifications: []
      },
      {
        id: "dmg-mori-dmu50",
        title: "DMG MORI CNC Milling Machine (DMU 50)",
        description: "DMG MORI Model: DMU 50 - Made in Germany. 5-axis universal milling with positioning and simultaneous capabilities.",
        benefits: [
          "Able to plan work piece with diameter up to 400mm",
          "High flexibility with variable table options from fixed to swivel rotary table",
          "High work piece weights and maximum precision",
          "Optimum space economy with excellent accessibility to the working area",
          "User friendly"
        ],
        keyFeatures: [
          "5-axis universal milling: Positioning, Simultaneous",
          "Milling process: Profiling, Reaming, Etc."
        ],
        specifications: []
      },
      {
        id: "dmg-mori-dmu125",
        title: "DMG MORI CNC Turn Mill Machine (DMU 125)",
        description: "DMG MORI Model: DMU 125 - Made in Germany. 5-axis universal turn mill with positioning and simultaneous capabilities.",
        benefits: [
          "Able to plan work piece with diameter up to 1000mm",
          "DuoBLOCK® design for the highest precision and dynamics and best access to work piece",
          "Multipurpose; Able to perform both turning and milling functions",
          "Rugged construction assures optimum rigidity and stability",
          "High precision machining up to 0.005mm"
        ],
        keyFeatures: [
          "5-axis universal turn mill: Positioning, Simultaneous",
          "Vertical lathe",
          "Turning Process: Threading, Hole drilling, Parting, Boring, Outside diameter (OD) and inside diameter (ID) profiling",
          "Milling process: Profiling, Reaming, Etc."
        ],
        specifications: []
      }
    ]
  },
  {
    id: "sacrificial-anode",
    title: "Sacrificial Anode Installation and Specialized Coating",
    description: "RWNA has been supporting major pipeline coating applicators since 2001 for installation of sacrificial anode on the coated line pipes.",
    icon: <Zap className="w-6 h-6" />,
    subServices: [
      {
        id: "anode-installation",
        title: "Sacrificial Anode Installation",
        description: "Sacrificial anode is part of the defensive system to ensure continuous integrity of a pipeline system. Bredero Shaw Sdn Bhd and PPSC Industries Sdn Bhd are among our major customers in this field of interest.",
        benefits: [],
        keyFeatures: [
          "Installation of sacrificial anode on coated line pipes",
          "Part of the defensive system to ensure continuous integrity of a pipeline system",
          "Supporting major pipeline coating applicators since 2001"
        ],
        specifications: []
      },
      {
        id: "specialized-coating",
        title: "Specialized Coatings and Pin Brazing",
        description: "We also provide services in specialized coatings and pin brazing to complement our anode installation services.",
        benefits: [],
        keyFeatures: [
          "Specialized coatings application",
          "Pin brazing services",
          "Complementary services to anode installation"
        ],
        specifications: []
      }
    ]
  },
  {
    id: "fabrication-maintenance",
    title: "Fabrication and Maintenance (Onshore and Offshore)",
    description: "Comprehensive fabrication, installation, and maintenance services for piping, structures, and mechanical equipment.",
    icon: <Wrench className="w-6 h-6" />,
    subServices: [
      {
        id: "fabrication-services",
        title: "Fabrication and Installation Services",
        description: "Complete fabrication and installation services for various industrial applications.",
        benefits: [],
        keyFeatures: [
          "Fabrication and Installation of piping and Steel Structures",
          "Construction of pipeline and other Pipeline Related Facilities",
          "Blasting and Painting Works",
          "Hook-up and Commissioning Services"
        ],
        specifications: []
      },
      {
        id: "maintenance-services",
        title: "Plant Maintenance and Equipment Services",
        description: "Comprehensive maintenance and equipment services for industrial plants and facilities.",
        benefits: [],
        keyFeatures: [
          "Plant Maintenance and Turnaround - Cleaning and Services of Vessel, Reactor, Heat Exchanger, Air Fin Cooler and Boiler",
          "Plant Equipment Erection and Installation - New Installation and Replacement of Vessel, Reactor, Heat Exchanger, Fin Cooler and Boiler",
          "Fired and Unfired Vessel Repair - approved by DOSH"
        ],
        specifications: []
      }
    ]
  },
  {
    id: "boiler-pressure-vessel",
    title: "Manufacture, Assembly, Repairs & Alteration of Power Boilers (S) & Pressure Vessels (U,U2)",
    description: "ASME certified manufacturing, assembly, repair and alteration services for power boilers and pressure vessels.",
    icon: <Gauge className="w-6 h-6" />,
    subServices: [
      {
        id: "asme-services",
        title: "ASME Certified Services",
        description: "Complete ASME certified services for power boilers and pressure vessels with proper documentation and compliance.",
        benefits: [],
        keyFeatures: [
          "ASME U, U2, S certification",
          "Manufacture of new pressure vessels and power boilers",
          "Assembly services at location and field sites",
          "Repairs and alterations of existing equipment",
          "Full compliance with ASME standards and regulations"
        ],
        specifications: []
      }
    ]
  }
];

export default function Services() {
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);

  const handleSubServiceClick = (subService: SubService) => {
    setSelectedSubService(subService);
  };

  const closeModal = () => {
    setSelectedSubService(null);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={IMAGES.MACHINING_2}
            alt="Engineering background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Engineering <span className="text-primary">Solutions</span> for the Future
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              RWNA Engineering provides world-class on-site machining, subsea solutions, and specialized safety systems for the global oil and gas industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-16"
          >
            {services.map((service, serviceIndex) => (
              <motion.div
                key={service.id}
                variants={staggerItem}
                className="space-y-8"
              >
                {/* Service Header */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    <span className="text-primary">
                      {serviceIndex + 1}.
                    </span>{" "}
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    {service.description}
                  </p>
                </div>

                {/* Sub-services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.subServices.map((subService, index) => (
                    <Card
                      key={subService.id}
                      className="cursor-pointer hover:border-primary/50 transition-all duration-300 bg-card border-border"
                      onClick={() => handleSubServiceClick(subService)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-foreground flex items-center justify-between">
                          <span>{subService.title}</span>
                          <ChevronRight className="h-5 w-5 text-primary" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {subService.description}
                        </p>
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sub-service Modal */}
      <Dialog open={!!selectedSubService} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSubService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedSubService.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Image */}
                {selectedSubService.image && (
                  <div className="w-full h-64 overflow-hidden rounded-lg">
                    <img
                      src={IMAGES[selectedSubService.image as keyof typeof IMAGES]}
                      alt={selectedSubService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Description */}
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSubService.description}
                  </p>
                </div>

                {/* Benefits */}
                {selectedSubService.benefits.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-3">
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedSubService.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Features */}
                {selectedSubService.keyFeatures.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedSubService.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Cog className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications */}
                {selectedSubService.specifications.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-3">
                      Specifications
                    </h4>
                    <ul className="space-y-2">
                      {selectedSubService.specifications.map((spec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Settings className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {spec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our expert team to discuss your project requirements and discover how RWNA Engineering can deliver the perfect solution for your needs.
            </p>
            <Link to={ROUTE_PATHS.CONTACT}>
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Contact Us Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}