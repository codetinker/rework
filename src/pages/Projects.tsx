import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trophy, Calendar, MapPin, Building2, Download } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { springPresets, fadeInUp } from '@/lib/motion';

// Type definitions
interface YearData {
  [client: string]: string[];
}

interface ProjectYear {
  [year: string]: YearData;
}

interface ProjectCategory {
  name: string;
  projects: ProjectYear[];
}

// New project data structure based on provided JSON
const projectData: ProjectCategory[] = [
  {
    "name": "On Site Machining (Onshore & Offshore)",
    "projects": [
      {
        "2015": {
          "ARKEMA THIOCHEMICALS SDN BHD": ["TO PERFORM HTW SERVICES", "TO PERFORM FLANGE FACING & MAIN HOLE COVER SERVICES", "TO PERFORM HTW SERVICES"],
          "SHIN EVERSENDAI ENGINEERING (M) SDN BHD": ["TO PERFORM INTERNAL BORING SERVICES", "TO PERFORM COLD CUTTING, BEVELLING & TAPPER SERVICES", "TO PERFORM THREADING SERVICES"],
          "DAYANG ENTERPRISE SDN BHD": ["TO PERFORM HOT BOLTING SERVICES (SHUTDOWN)", "TO PERFORM COLD CUTTING SERVICES (SHUTDOWN)", "TO PERFORM HTW SERVICES (SHUTDOWN)", "TO PERFORM COLD CUTTING & BEVEL SERVICES"],
          "SHAPADU ENERGY & ENGINEERING SDN BHD": ["TO PERFORM COLD CUTTING & BEVELLING SERVICES", "TO PERFORM COLD CUTTING SERVICES"],
          "PETRONAS GAS BERHAD": ["TO PERFORM COLD CUTTING SERVICES", "TO PERFORM COLD CUTTING SERVICES", "TO PERFORM HTW SERVICES", "TO PERFORM HTW SERVICES (SHUTDOWN)", "TO PERFORM FLANGE FACING SERVICES (SHUTDOWN)", "TO PERFORM HBT SERVICES (SHUTDOWN)"],
          "MTBE MALAYSIA SDN BHD": ["TO RECTIFY LEAK D 218 (SHUTDOWN)"],
          "PFCE ENGINEERING SDN BHD": ["TO PERFORM HTW SERVICES", "TO PERFORM HTW SERVICES", "TO PERFORM HTW SERVICES", "TO PERFORM HTW SERVICES", "TO PERFORM COLD TAPPING SERVICES"],
          "PETRONAS PENAPISAN MELAKA SDN BHD": [
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM MILLING & FLANGE FACING SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES (SHUTDOWN)",
            "TO PERFORM FLANGE FACING CHANEL HEAD SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM FLANGE FACING SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES (SHUTDOWN)",
            "TO PERFORM HTW SERVICES",
            "TO PERFORM HTW SERVICES"
          ],
          "MALAYSIA MARINE AND HEAVY ENGINEERING SDN BHD": ["ON SITE MILLING BASE PLATE AT SK316 PLATFORM", "TO PERFORM FLANGE FACING SERVICES", "TO PERFORM COLD TAPPING AT TOPSIDE SERVICES", "TO PERFORM FLANGE FACING SERVICES"],
          "BASF PETRONAS CHEMICALS SDN BHD": ["TO PERFORM HTW SERVICES", "TO PERFORM HTW SERVICES", "TO PERFORM BEVELLING SERVICES", "TO PERFORM HTW SERVICES", "TO PERFORM HTW SERVICES", "TO PERFORM FLANGE FACING SERVICES", "TO PERFORM HTW SERVICES"],
          "KENCANA HL SDN BHD": ["TO PERFORM FLANGE FACING SERVICES"],
          "KEJURUTERAAN QKS SDN BHD": ["TO PERFORM COLD CUTTING & BEVEL SERVICES", "TO PERFORM HBT SERVICES", "TO PERFORM HTW SERVICES", "TO PERFORM HBT SERVICES"],
          "MASER MARINE ENGINEERING SDN BHD": ["TO PERFORM HTW SERVICES", "TO PERFORM FLANGE FACING SERVICES", "TO PERFORM HTW SERVICES"],
          "BREDERO SHAW (MALAYSIA) SDN BHD": ["IMPP TESTPIECE PREPARATION FOR PERSEPHONE PROJECT", "TO PERFORM INTERNAL TAPERING SERVICES FOR NORTH MALAY BASIN"],
          "BICARA SEPAKAT SDN BHD": ["TO PERFORM COLD CUTTING SERVICES"],
          "BARISAN SAMUDERA SDN BHD": ["TO PERFORM FLANGE FACING SERVICES"],
          "NEWWIN ENGINEERING PAKA SDN BHD": ["TO PERFORM COLD TAPPING SERVICES", "TO PERFORM HTW SERVICES"],
          "TH HEAVY ENGINEERING": ["TO PERFORM LINE BORING SERVICES"],
          "ENPROSERVE (M) SDN BHD": ["TO PERFORM FLANGE FACING SERVICES"],
          "SYNO HYDRO CORPORATION SDN BHD": ["TO PERFORM COLD CUTTING SERVICES"],
          "SCIENCE-TECH SOLUTION SDN BHD": ["TO PERFORM MANUAL TOURQE WRENCH SERVICES"],
          "GOM RESOURCES SDN BHD": ["TO PERFORM FLANGE FACING SERVICES"],
          "TURCOMP ENGINEERING SDN BHD": ["TO PERFORM HTW SERVICES"],
          "PETRA RESOURCES SDN BHD (KL)": ["TO PERFORM COLD CUTTING SERVICES", "TO PERFORM DRILLING SERVICES"],
          "TL OFFHSORE SDN BHD": ["PROVISION OF INTERNAL & EXTERNAL TAPERING SERVICES"],
          "TALISMAN MALAYSIA LIMITED": ["RENTAL FLANGE FACING MACHINE", "TO SUPPLY MATERIAL FOR PM-305 (SAA) FABRICATION WORK", "TO PERFORM FLANGE FACING SERVICES"],
          "PETROFAC MALAYSIA LIMITED": ["TO PERFORM FLANGE FACING SERVICES"],
          "FMC WELLHEAD EQUIPMENT SDN BHD": ["TO PERFORM COLD CUTTING & BEVEL FLOWLOOP PIPE SERVICES", "TO PERFORM COLD CUTTING & BEVEL WELL JUMPER SERVICES", "TO PERFORM COLD CUTTING (ASADA) SERVICES"],
          "FMC TECHNOLOGIES GLOBAL SUPPLY SDN BHD": ["TO PERFORM COLD CUTTING &BEVEL SERVICES"],
          "TJSB SERVICES SDN BHD": ["TO PERFORM MILLING SERVICES"],
          "MSET ENGINEERING CORPORATION SDN BHD": ["TO PERFORM HTW SERVICES", "TO PERFORM HTW SERVICES"],
          "TECHNOFIT SDN BHD": ["TO PERFORM COLD CUTTING & BEVELLING SERVICES"],
          "KNM PROCESS SYSTEMS SDN BHD": ["TO PERFORM FLANGE FACING SERVICES"],
          "ASIA PROPEL SDN BHD": ["TO PERFORM PAD EYE DRILLING SERVICES"],
          "PETRA FABRICATOR SDN BHD": ["TO PERFORM FLANGE FACING SERVICES", "TO PERFORM HTW SERVICES"],
          "PFCE PONTEROSSO SDN BHD": ["TO PERFORM HTW SERVICES", "TO PERFORM FLANGE FACING SERVICES"],
          "HSE RESOURCES SDN BHD": ["TO PERFORM HTW SERVICES"],
          "CENTRALISE UTILITIES FACILITIES GEBENG": ["TO PERFORM FLANGE FACING SERVICES"]
        },
        "2014": {
          "SCIENCE TECH SOLUTIONS": ["TO PERFORM HTW SERVICES AT PPM"],
          "PASCA BINA SDN BHD": ["TO PERFORM HTW SERVICES AT OPTIMAL", "TO PERFORM HTW SERVICES & FLANGE FACING SERVICES AT OPTIMAL"],
          "PETRONAS PENAPISAN MELAKA": ["TO PERFORM FLANGE FACING SERVICES AT PPM"],
          "PFC ENGINEERING SDN BHD": ["TO PERFORM HTW SERVICES AT RESAK"],
          "EPIC MUSHTARI ENGINEERING SDN BHD": ["TO PERFORM FLANGE FACING SERVICES AT CAKERAWALA", "TO PERFORM COLD CUTTING SERVICES AT TKY", "TO PERFORM FLANGE FACING SERVICES AT TKY", "TO PERFORM FLANGE FACING SERVICES AT EPIC TKY", "TO PERFOM COLD CUTTING SERVICES AT EPIC MUSTARI"],
          "SHIN EVERSENDAI ENGINEERING (M) SDN BHD": ["TO PERFORM BEVELING AT TANJUNG BIN"],
          "FMC TECHNOLOGY GLOBAL SUPPLY SDN BHD": ["TO PERFORM COLD CUTTING SERVICES AT FMC YARD"],
          "SRIMULTEC ENGINEERING SDN BHD": ["TO PERFORM FLANGE FACING SERVICES AT CENDOR"],
          "MMHE ENGINEERING SDN BHD": ["TO PERFORM FLANGE FACING SERVICES AT MMHE"],
          "DAYANG ENTERPRISE HOLDINGS BHD": ["TO PERFORM COLD CUTTING SERVICES AT BEKOK A", "TO PERFOM FLANGE FACING SERVICES AT DAYANG YARD KSB"],
          "CARIMIN ENGINEERING SERVICES SDN BHD": ["TO PERFORM COLD CUTTING, BEVELING & COLD TAPPING FOR ERB WEST INFILL DRILLING AT ERB WEST"],
          "KNM PROCESS SYSTEMS SDN BHD": ["TO PERFORM FLANGE FACING SERVICES AT KNM", "TO PERFORM HTW SERVICES AT BASF"],
          "DIALOG": ["TO PERFORM FLANGE FACING SERVICES AT MTBE"],
          "MUSHTARI MAINTENANCE SERVICES SDN BHD": ["TO PERFORM FLANGE FACING SERVICES AT GPP A"],
          "MSET ENGINEERING CORPORATION SDN BHD": ["TO PERFORM HTW SERVICES AT MSET"],
          "BUKIT FRASER THERMAL TECHNOLOGY SDN BHD": ["TO PERFORM FLANGE FACING SERVICES AT RAWANG INTEGRATED INDUSTRIAL ESTATE"],
          "PETRA RESOURCES SDN.BHD": ["TO PERFORM COLD CUTTING SERVICES AT TUKAU PLATFORM"],
          "PARAS SAKSAMA SDN BHD": ["TO PERFORM FLANGE FACING SERVICES AT KANEKA"],
          "SYARIKAT STEELCON SDN BHD": ["ON-SITE FLANGE FACING SERVICES FOR FLANGE 18\" X 300# (ALLOY STEEL MATERIAL) FOR COLD COLLECTOR FLANGES AT NILAI"],
          "PVJB GROUP SDN BHD": ["ON SITE FLANGE FACING SERVICES AT LABUAN GAS TERMINAL"],
          "PETRONAS CHEMICAL BERHAD": ["TO PERFORM ON SITE FLANGE FACING SERVICES AT ASIAN BINTULU FERTILIZER"],
          "VINYL CHLORIDE (MALAYSIA) SDN. BHD": ["TO PERFORM COLD CUTTING SERVICES AT VCM"],
          "BASF PETRONAS CHEMICALS SDN BHD": ["TO PERFORM HTW SERVICES AT BASF"],
          "POLYPLASTICS ASIA PACIFIC SDN. BHD": ["TO PERFORM FLANGE FACING SERVICES AT POLYPLASTIC GEBENG"],
          "PETROFAC/ PCSB": ["TO PERFORM FLANGE FACING SERVICES AT TKY"],
          "KHD HUMBOLDF WEDAG": ["TO PERFORM MILLING SERVICES OF BASE PLATE AT YARD RWNA"],
          "TOYO ENGINEERING & CONSTRUCTION SDN. BHD.": ["TO PERFORM HTW SERVICES AT GPP A"],
          "TTES TEAM&SPECIALIST SDN BHD": ["TO PERFORM ON SITE HTW SERVICE AT KSB PHASE 2"]
        },
        "2013": {
          "BASF PETRONAS CHEMICAL SDN BHD": ["HYDRAULIC TORQUE WRENCH ACTIVITIES", "HYDRAULIC TORQUE WRENCH ACTIVITIES", "ONSITE HYDRAULIC TORQUE WRENCH SERVICE", "ON SITE HYDRAULIC TORQUE WRENCH SERIVCE", "TO PERFORM HTW SERVICES"],
          "PFC ENGINEERING SDN BHD": ["TO PERFORM COLD CUTTING & BEVELLING WORK AT MURPHY PLANT", "TO PERFORM HYDRAULIC BOLT TENSIONNING AT MURPHY PLANT", "TO PERFORM BEVELLING SERVICES AT BORF PLANT"],
          "SHAPADU ENERGY & ENGINEERING SDN BHD": ["TO PERFORM COLD CUTTING FOR OFFSHORE PIPING CONSISTS OF SUPPLY EQUIPMENT, TOOL, CONSUMABLE, NECESSARY FACILITIES, SUPERVISION AND MANPOWER AT TAPIS A, C, E & P"],
          "NEWWIN ENGINEERING (M) SDN BHD": ["TO PERFORM RE-SURFACE CHANNEL HEAD AND TUBESHEET – GPP SHUTDOWN"],
          "MUSHTARI MAINTENANCE SDN BHD": ["TO PERFORM FLANGE FACING SERVICES FOR T4-351"],
          "PETRONAS GAS BERHAD": ["TO PERFORM HTW SERVICES (RETIGHTEN NUT FOR COMPRESSURE CASSING)", "TO PERFORM HTW SERVICES (TO TIGHTEN NUT FOR COMPRESSURE CASSING) AT COMPRESSAR HOUSE"],
          "CENTRALISED UTILITY FACILITIES": ["TO PERFORM HTW AT BOILER B, BLINDING POINT . 10'' x 2500 M AT COGEN"],
          "TMM ENGINERING SERVICES SDN BHD": ["ONSITE FLANGE RESURFACE"],
          "SARAWAK SHELL BERHAD": ["COLD CUTTING SERVICES AT PDY ENDEAVOUR @ E11"],
          "FLEXSYS CHEMICALS (M) SDN BHD": ["FLANGE FACING FOR 6\" SPOOL"],
          "OMBAK MARINE SDN BHD": ["COLD CUTTING SERVICES"],
          "BAXTECH RESOURCES SDN BHD": ["PROVISION OF TOPSIDE RISER MODIFICATIONS AT SUMANDAK FOR PCSB/SBO"],
          "OMBAK MARINE GROUP SDN BHD": ["TO PERFORM HTW AT BAYAN PLATFORM"],
          "PREMIER VIABLE SDN BHD": ["COLD CUTTING & BOLT TENSIONING SERVICES", "COLD CUTTING & BOLT TENSIONING SERVICES (1ST MOB & 2ND MOB)"],
          "FMC WELLHEAD EQUIPMENT SDN BHD": ["COLD CUTTING AND BEVELLING 30\" OD PIPE SERVICES", "COLD CUTTING AND BEVELING 30\" OD PIPE SERVICES", "COLD CUTTING AND BEVELING 8\" OD PIPE SERVICES, PROJECT GWF", "COLD CUTTING AND BEVELLING 30'' OD PIPE SERVICE AT FMC YARD", "TO PERFORM ONSITE BEVELLING SERVICES AT FMC YARD"],
          "PFCE ENGINEERING SDN BHD": ["COLD CUTTING SERVICES", "BOLT TENSIONING SERVICES"],
          "KENCHANA HL SDN BHD": ["ONSITE MILING ACTIVITIES FOR BASE PLATE FRAME. SIZE : 1016mm x 381mm TO REDUCE THICKNESS"],
          "TL OFFSHORE SDB BHD": ["UNDERWATER COLD CUTTING AT F 23"],
          "GAS PENAPISAN PETRONAS": ["TO PERFORM FLANGE FACING SERVICES AT GPP KOMPLEKS B"],
          "DIALOG GROUP BERHAD": ["TO PERFORM FLANGE FACING SERVICES AT DIALOG PLANT"],
          "EPIC MUSHTARI ENGINEERING SDN BHD": ["ON SITE MACHINING SERVICES AT PDH PLANT"],
          "HSE RESOURCES SDN BHD": ["ON SITE MACHINING SERVICES AT PDH PLANT"],
          "ALLIED MARINE & EQUIPMENT SDN BHD": ["TO PERFORM REPLACEMENT OF CAISSON AT BEKOK A"],
          "MMHE ENGINEERING SDN BHD": ["COLD CUTTING AND BEVELLING WORKS OF CRA MATERIALS FOR TAPIS-R TOPSIDE", "TO PEFORM ON SITE FLANGE RESURFACE PADESTAL CRANE CENDOR", "TO PERFORM COLD TAPPING TAPIS R TOPSIDE SPOOL PIPES"],
          "MSET ENGINEERING CORPORATION SDN BHD": ["TO PERFORM FLANGE FACING ONE UNIT GLYCOL REBOILER (9V-605) FOR BEKOK C RESTORATION PROJECT", "TO PERFORM FLANGE FACING FOR EQUIPMENT NO 370 A AND 370 B AT MSET YARD 5"],
          "SHAPADU ENERGY & ENGINEERING SDN. BHD": ["TO PERFORM COLD TAPPING AND WELDING AT BEKOK C"]
        },
        "2012": {
          "SHAHPADU ENERGY & ENGINEERING SDN BHD": [
            "to perform cold cutting services (ksb phase 1)",
            "to perform cold cutting services (ksb phase 1)",
            "TO PERFORM COLD CUTTING SERVICES FOR 28\" PIPES",
            "TO PERFORM COLD CUTTING SERVICES (KSB PHASE 1)",
            "TO PERFORM HOT BOLTING SERVICES AT RESAK PLATFORM FOR 7/8'' UP 3.15'' NUT SIZE",
            "TO PERFORM COLD CUTTING PIPE 4'' (2 CUT & 2 BEVEL)",
            "TO PERFORM ONLINE WELDING, COLD TAPPING AND COLD CUTTING AT DULANG A, B, C",
            "TO SUPPLY MANPOWER AND MACHINES FOR ODDS BOLTING SERVICE AT RESAK PLATFORM",
            "ONLINE WELDING AND COLD TAPPING AT RESAK",
            "ONLINE WELDING AND COLD TAPPING AT RESAK",
            "HOT BOLTING AT RESAK",
            "HOT BOLTING AT RESAK",
            "TO SUPPLY MANPOWER AND MACHINES FOR ODDS BOLTING SERVICE AT RESAK PLATFORM",
            "ONLINE WELDING AND COLD TAPPING AT RESAK",
            "ONLINE WELDING AND COLD TAPPING AT RESAK",
            "HOT BOLTING AT RESAK",
            "COLD CUTTING AT BEKOK B",
            "TO PERFORM COLD CUTTING SERVICES FOR 16\" PIPES",
            "COLD CUTTING & COLD TAPPING AT BARONIA",
            "COLD CUTTING",
            "COLD CUTTING AT BEKOK A TIONG A",
            "ONLINE WELDING AND COLD TAPPING AT RESAK",
            "HOT BOLTING AT RESAK",
            "COLD CUTTING AT BEKOK B",
            "TO PERFORM COLD CUTTING SERVICES FOR 16\" PIPES"
          ],
          "PFC ENGINEERING SDN BHD": [
            "TO PERFORM ON SITE HTW 55 & 46MM SERVICES AT MTBE",
            "TO PERFORM ON SITE HYDRAULICS TORQUE WRENCH AT RESAK PLATFORM",
            "TO PERFORM ON SITE HTW 60X65MM",
            "TO PERFORM COLD CUTTING & BEVELING FOR 24\" PIPE",
            "to perform cold cutting services",
            "to perform cold cutting services for prr2 project (august-september)",
            "TO PERFORM HTW AT DUYONG PLATFORM",
            "TO PERFORM COLD CUTTING AT TIONG PLATFORM",
            "TO PERFORM HTW AT ANGSI PLATFORM",
            "COLD CUTTING AND BEVELING SERVICES AT PFCE YARD",
            "TO PERFORM HTW FOR 55MM NUT SIZE AT OSC - TCO, KERTEH",
            "TO PERFORM HTW AT ANGSI PLATFORM",
            "TO PERFORM ONSITE HTW AT ONSHORE GAS TERMINAL",
            "TO PERFORM CUTTING CASING 36\" AT TOPAZ DRILLER",
            "TO PERFORM HYDRAULIC TORQUE WRENCH AT BEKOK C"
          ],
          "BASF PETRONAS CHEMICALS SDN BHD": ["TO PERFORM ON SITE COLD TAPPING FOR COLUMN NOZZLE 60MM AT BASF", "TO PERFORM BOLT TIGHTENING AT TOP COVER E2210", "TO PERFORM COLD TAPPING FOR COLUMN NOZZLE SIZE 60MM 8TY-2 HOLE", "TO PERFORM HTW SERVICES AT BASF", "TO PERFORM BOLT TENTIONING 50MM-80MM AT BASF", "TO PERFORM HTW 90MM, 98MM, 100MM, 102MM, 115MM AT BASF", "TO PERFORM HTW 75MM AT BASF AND FLANGE FACING SIZE 24\"", "TO PERFORM ON SITE HYDRAULIC TORQUE WRENCH SERVICES"]
        }
      }
    ]
  },
  {
    "name": "Fabrication, Installation & Maintenance (Onshore & Offshore)",
    "projects": [
      {
        "2006": {
          "M3NERGY FPSO PERINTIS SDN BHD / PETRONAS CARIGALI SDN BHD": ["FABRICATION OF NEW P-600 DISCHARGE LINE SPOOLS FOR WATER INJECTION PIPING", "SERVICING OF PRESSURE SAFETY RELIEF VALVE FOR DECK BOILER", "FABRICATION OF PIPE SPOOL FOR METERING CRUDE OIL FACILITIES", "SERVICING OF 12\" GLOBE VALVE PROJECT", "SERVICES & REPAIR OF LAUNCHER DOOR PROJECT", "CHEMICAL CLEANING & HYDROTEST HYDRAULIC PIPING", "FABRICATION OF 4\" 6\" AND 8\" DELUGE PIPING SPOOLS"]
        },
        "2007": {
          "FPSO VENTURES SDN BHD": ["PROVISION WORK TO SUPPLY OF MANPOWER TO CARRYOUT THE MEASUREMENT AND ISOMETRIC DRAWING AS FOLLOW SCOPE OF WORK FOR FSO CENDOR"],
          "M3NERGY FPSO PERINTIS SDN BHD / PETRONAS CARIGALI SDN BHD": [
            "PRE-FABRICATION OF GALLEY PIPING",
            "PRE-FABRICATION AND INSTALLATION OF CHAIN ROLLER AT FSO PUTERI CAKERAWALA",
            "FABRICATION, INSTALLATION, TESTING AND COMMISSIONING OF PIPING AND STRUCTURE FOR FPSO PERINTIS SHUTDOWN 2007",
            "SUPPLY OF MANPOWER, EQUIPMENT, TOOLS AND CONSUMABLES FOR PERINTIS SHUTDOWN 2007",
            "SITE SURVEY & STRINGING AND PREPARATION OF NEW AND DEMOLITION DRAWING",
            "TO SUPPLY MANPOWER, TOOLS AND CONSUMABLES TO PERFORM BLASTING & PRIMER AND PIPE BEND",
            "TO PROVIDE MANPOWER, EQUIPMENT, TOOLS AND CONSUMABLES FOR FABRICATION OF PIPE SPOOLS (ONSHORE)"
          ],
          "MTBE (M) SDN BHD": ["FABRICATION & INSTALLATION FOR T1 TO T2 PIPE UPGRADING", "FABRICATION, INSTALLATION, TESTING AND COMMISSIONING FOR UTILITY WATER PIPING A520"]
        }
      }
    ]
  },
  {
    "name": "Sacrificial Anode Installation & Specialized Coatings",
    "projects": [
      {
        "2015": {
          "BREDEROSHAW (M) SDN BHD": ["ANODE INSTALLATION FOR CPOC PHASE 3 DEVELOPMENT PROJECT", "ANODE INSTALLATION FOR NORTH MALAY BASIN PROJECT", "DOUBLER PLATE & ANODE INSTALLATION FOR PTTEP ARTHIT LONG TERM CONTRACT 1 (ARTHIT 2D)", "DOUBLER PLATE INSTALLATION FOR PERSEPHONE PROJECT", "PACKER PLATE INSTALLATION AND ANODE INSTALLATION FOR CHEVRON PHASE 48", "ANODE INSTALLATION FOR CHEVRON PRAI TERMINAL PROJECT"]
        },
        "2014": {
          "BREDEROSHAW (M) SDN BHD": [
            "TESTPIECE PREPARATION FOR TCPL QUALIFICATION TRIAL",
            "DOUBLER PLATE & ANODE INSTALLATION FOR SKO-PL381 PIPELINE",
            "ANODE INSTALLATION AND DOUBLER PLATE INSTALLATION FOR MAHARAJA LELA SOUTH",
            "ANODE INSTALLATION FOR CHAMPION INTERMEDIATE DEEP PROJECT (CPID)",
            "DOUBLER PLATE INSTALLATION AND ANODE INSTALLATION FOR DALAK PIPELINE",
            "ANODE INSTALLATION AND PINBRAZING INSTALLATION FOR MALIKAI PROJECT BATCH 2 PIPELINE",
            "GLASS FLAKE EPOXY COATING APPLICATION FOR PIPE OD 10.75IN FOR CPID (J-TUBES) PROJECT",
            "DOUBLER PLATE INSTALLATION & ANODE INSTALLATION FOR SK316 DEVELOPMENT PROJECT",
            "TESTPIECE PREPARATION FOR PIPE OD 16'' FOR CHEVRON PHASE 46 PROJECT (CVX 46-3901)",
            "TESTPIECE PREPARATION FOR PIPE OD 42'' FOR ICHTHYS GEP PROJECT(HBE)",
            "TESTPIECE PREPARATION(COLD APPLICATION) FOR PIPE OD 16'' FOR CHEVRON PHASE 45(CVX 45-3901)",
            "TESTPIECE PREPARATION (COLD APPLICATION) FOR PIPE OD 26'' FOR PTTEP BUNDLED PHASES (ARTHIT 2C)",
            "ONSITE COLD CUTTING SERVICES FOR PIPE OD 18'' CRA FOR ICHTHYS URF PROJECT",
            "ONSITE COLD CUTTING SERVICES FOR PIPE OD 14'' & 24'' FOR WHEATSTONE UPSTREAM PROJECT-SUPPLY OF FLOWLINE COATING & BRACALET ANODES",
            "ANODE DISMANTLE AND TESTPIECE PREPARATION (COLD APPLICATION) FOR  PIPE OD 14'' & 24'' (CRA) FOR WHEATSTONE UPSTREAM PROJECT",
            "COLD CUTTING AND TESTPIECE PREPARATION(COLD APPLICATION) FOR PIPE OD 10.75'' FOR MALIKAI PROJECT BATCH 2 PIPELINE",
            "ANODE INSTALLATION AND DOUBLE PLATE INSTALLATION FOR PTTEP BUNDLED PHASES (ARTHIT 2C)",
            "COLD CUTTING AND TESTPIECE PREPARATION(COLD APPLICATION) FOR PIPE OD 8'' FOR MALIKAI PROJECT BATCH 2 PIPELINE",
            "ONSITE COLD CUTTING SERVICES FOR PIPE OD 16'' (CRA) FPR GWF-1",
            "PROVISION OF EQUIPMENT AND SERVICES FOR MILL MARK RECTIFICATION FOR JULIMAR DEVELOPMENT PROJECT",
            "COLD CUTTING SERVICES & TESTPIECE PREPARATION RING(COLD APPLICATION) FOR PIPE OD 18'' CRA FOR ICHTHYS URF PROJECT(7LPP)",
            "TESTPIECE PREPARATION(COLD APPLICATION) FOR PIPE OD 14'' & 18'' FOR PTTEP LONG TERM CONTRACT OF BONGKOT FIELD DEVELOPMENT(BONGKOT 3M)PQT",
            "ANODE INSTALLATION AND PIN BRAZING INSTALLATION FOR JULIMAR DEVELOPMENT PROJECT",
            "TESTPIECE PREPARATION (COLD APPLICATION) FOR PIPE OD 16'' FOR CVX 1302-3901",
            "IMPP COATING TESTPIECE PREPARATION FOR ICHTHYS URF PROJECT",
            "ANODES INSTALLATION AND DOUBLE PLATE INSTALLATION FOR 28IN GAS PIPELINE FOR EVA-NMB DELIVERY SYSTEM(ENGDS) PROJECT(TRUNKLINE)",
            "SPU COATING TESTPIECE PREPARATION FOR MALIKAI PROJECT BATCH 2 PIPELINE",
            "TESTPIECE PREPARATION(COLD APPLICATION) FOR PIPE OD 24'' CRA FOR BULAN-C WELLHEAD PLATFORM"
          ]
        }
      }
    ]
  }
];

// Helper function to count total projects for a year across all clients
const countProjectsForYear = (yearData: Record<string, string[]>): number => {
  return Object.values(yearData).reduce((total, projects) => total + projects.length, 0);
};

// Helper function to get all years from project data and sort them
const getAllYears = (): string[] => {
  const years = new Set<string>();
  projectData.forEach(category => {
    category.projects.forEach(yearData => {
      Object.keys(yearData).forEach(year => years.add(year));
    });
  });
  return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>(projectData[0]?.name || '');
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set());

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
      // Also collapse all clients for this year
      const clientsToRemove = Array.from(expandedClients).filter(client => client.startsWith(`${year}-`));
      clientsToRemove.forEach(client => newExpanded.delete(client));
      setExpandedClients(new Set(Array.from(expandedClients).filter(client => !client.startsWith(`${year}-`))));
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleClient = (year: string, client: string) => {
    const clientKey = `${year}-${client}`;
    const newExpanded = new Set(expandedClients);
    if (newExpanded.has(clientKey)) {
      newExpanded.delete(clientKey);
    } else {
      newExpanded.add(clientKey);
    }
    setExpandedClients(newExpanded);
  };

  const selectedCategoryData = projectData.find(cat => cat.name === selectedCategory);
  const allYears = getAllYears();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Our Projects
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Showcasing our expertise across diverse engineering projects, from onsite machining to specialized coatings and fabrication works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springPresets.gentle, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            {projectData.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card text-card-foreground hover:bg-primary/10 border border-border'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Display */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {selectedCategoryData && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springPresets.gentle}
              className="max-w-6xl mx-auto"
            >
              <div className="space-y-6">
                {allYears.map((year) => {
                  // Find year data across all project entries for this category
                  const yearData = selectedCategoryData.projects.find(projectYear => year in projectYear)?.[year] as YearData | undefined;
                  
                  if (!yearData) return null;

                  const totalProjects = countProjectsForYear(yearData);
                  const isYearExpanded = expandedYears.has(year);

                  return (
                    <motion.div
                      key={year}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={springPresets.gentle}
                      className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
                    >
                      {/* Year Header */}
                      <button
                        onClick={() => toggleYear(year)}
                        className="w-full p-6 text-left hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground">{year}</h3>
                            <p className="text-muted-foreground">
                              {totalProjects} projects • {Object.keys(yearData).length} clients
                            </p>
                          </div>
                        </div>
                        {isYearExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>

                      {/* Year Content */}
                      <AnimatePresence>
                        {isYearExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={springPresets.gentle}
                            className="border-t border-border"
                          >
                            <div className="p-6 space-y-4">
                              {Object.entries(yearData).map(([client, projects]) => {
                                const clientKey = `${year}-${client}`;
                                const isClientExpanded = expandedClients.has(clientKey);

                                return (
                                  <div
                                    key={client}
                                    className="bg-muted/30 rounded-xl border border-border/50"
                                  >
                                    {/* Client Header */}
                                    <button
                                      onClick={() => toggleClient(year, client)}
                                      className="w-full p-4 text-left hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between rounded-xl"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-primary/10 rounded-lg">
                                          <Building2 className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                          <h4 className="font-semibold text-foreground">{client}</h4>
                                          <p className="text-sm text-muted-foreground">
                                            {projects.length} project{projects.length !== 1 ? 's' : ''}
                                          </p>
                                        </div>
                                      </div>
                                      {isClientExpanded ? (
                                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                      )}
                                    </button>

                                    {/* Client Projects */}
                                    <AnimatePresence>
                                      {isClientExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={springPresets.gentle}
                                          className="border-t border-border/30"
                                        >
                                          <div className="p-4 space-y-2">
                                            {projects.map((project, index) => (
                                              <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ ...springPresets.gentle, delay: index * 0.05 }}
                                                className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-border/30"
                                              >
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                <p className="text-sm text-foreground leading-relaxed">
                                                  {project}
                                                </p>
                                              </motion.div>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Download Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springPresets.gentle, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <div className="bg-card rounded-2xl border border-border p-8">
                  <p className="text-muted-foreground mb-4">
                    Need full completed project? Download below:
                  </p>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                    Full Report
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}