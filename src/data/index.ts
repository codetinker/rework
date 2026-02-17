import { Service, Project, Client } from "@/lib/index";
import { IMAGES } from "@/assets/images";

export interface Policy {
  id: string;
  title: string;
  imageKey: string;
  description: string;
}

export interface Office {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string[];
  fax: string[];
  coordinates: { lat: number; lng: number };
  mapUrl: string;
}

export const services: Service[] = [
  {
    id: "on-site-machining",
    title: "On-site Machining",
    category: "Machining",
    isActive: true,
    shortDescription: "Comprehensive cold cutting, flange facing, and precision pipe end preparation services.",
    fullDescription: [
      "Cold cutting and bevelling of pipes from 2\" to 120\" diameter.",
      "Flange facing up to 120\" diameter with high precision tolerances.",
      "Pipe end preparation and internal counter-boring.",
      "Bolt tensioning and torquing services for critical joints.",
      "On-site milling and drilling for structural modifications."
    ],
    imageKey: "MACHINING_1",
    iconName: "Settings"
  },
  {
    id: "subsea-cutting",
    title: "Subsea Pipeline & Structure Cutting",
    category: "Subsea",
    isActive: true,
    shortDescription: "Advanced subsea cutting solutions using Diamond Wire Saws and hydraulic split frames.",
    fullDescription: [
      "Diamond Wire Saw (DWS) operations for subsea pipelines and structures.",
      "Hydraulic split frame cutting and bevelling in deep sea environments.",
      "Internal pile cutting and platform decommissioning support.",
      "ROV-deployable cutting tools for specialized subsea operations."
    ],
    imageKey: "SUBSEA_1",
    iconName: "Waves"
  },
  {
    id: "w3p-enclosure",
    title: "W3P Enclosure System",
    category: "Safety",
    isActive: true,
    shortDescription: "SIRIM certified welding habitat designed for safe hot work in hazardous environments.",
    fullDescription: [
      "Pressurized welding habitat system for Zone 1 and Zone 2 environments.",
      "Integrated gas detection and automatic shutdown systems.",
      "Modular panel design to fit complex pipe geometries.",
      "Certified fire-retardant materials with high temperature resistance."
    ],
    imageKey: "WELDING_2",
    iconName: "ShieldCheck"
  },
  {
    id: "precision-machining",
    title: "Precision Metal Designing & Machining",
    category: "Machining",
    isActive: true,
    shortDescription: "High-end CNC machining and custom component manufacturing at our IPC center.",
    fullDescription: [
      "CNC Turning and Milling for high-precision components.",
      "Custom tool design and fabrication for specialized oil & gas applications.",
      "Material testing and quality assurance at our Innovation & Production Centre.",
      "Rapid prototyping for engineering solutions."
    ],
    imageKey: "MACHINING_3",
    iconName: "Cpu"
  },
  {
    id: "anode-installation",
    title: "Sacrificial Anode Installation",
    category: "Subsea",
    isActive: true,
    shortDescription: "Specialized cathodic protection and coating services for subsea assets.",
    fullDescription: [
      "Installation of sacrificial anodes on pipelines and subsea structures.",
      "Retrofit anode systems for life extension of existing assets.",
      "Specialized underwater coating and repair services.",
      "CP surveys and protection level monitoring."
    ],
    imageKey: "SUBSEA_5",
    iconName: "Zap"
  },
  {
    id: "fabrication-maintenance",
    title: "Fabrication & Maintenance",
    category: "Fabrication",
    isActive: true,
    shortDescription: "Onshore and offshore structural fabrication and equipment maintenance.",
    fullDescription: [
      "Structural steel fabrication for offshore platforms.",
      "Pipeline spool fabrication and installation.",
      "Preventive and corrective maintenance for heavy industrial equipment.",
      "Blasting and painting services for corrosion control."
    ],
    imageKey: "PROJECTS_2",
    iconName: "Wrench"
  }
];

export const policies: Policy[] = [
  {
    id: "quality-policy",
    title: "Quality Policy",
    imageKey: "HERO_BG_4",
    description: "Committed to delivering engineering excellence through strict adherence to ISO 9001 standards and continuous improvement."
  },
  {
    id: "hse-policy",
    title: "HSE Policy",
    imageKey: "WELDING_1",
    description: "Our primary goal is 'Zero Harm' to people, assets, and the environment in all our operations."
  },
  {
    id: "environmental-policy",
    title: "Environmental Policy",
    imageKey: "SUBSEA_2",
    description: "Minimizing our ecological footprint through sustainable practices and strict compliance with environmental regulations."
  },
  {
    id: "drug-alcohol-policy",
    title: "Drug & Alcohol Policy",
    imageKey: "MACHINING_5",
    description: "Maintaining a safe and healthy workplace by ensuring all employees and contractors are free from the influence of drugs and alcohol."
  },
  {
    id: "stop-work-authority",
    title: "Stop Work Authority",
    imageKey: "WELDING_4",
    description: "Empowering every individual to stop work if they perceive an unsafe condition or behavior without fear of reprisal."
  },
  {
    id: "sexual-harassment-policy",
    title: "Sexual Harassment Policy",
    imageKey: "HERO_BG_6",
    description: "Providing a professional work environment free from harassment, where all employees are treated with dignity and respect."
  },
  {
    id: "smoking-policy",
    title: "Smoking Policy",
    imageKey: "PROJECTS_4",
    description: "Designating specific safe zones for smoking to ensure fire safety and protect the health of non-smoking personnel."
  },
  {
    id: "social-media-policy",
    title: "Social Media Policy",
    imageKey: "MACHINING_8",
    description: "Guidelines for responsible online presence to protect company reputation and maintain professional confidentiality."
  },
  {
    id: "pdpa-policy",
    title: "PDPA Policy",
    imageKey: "HERO_BG_9",
    description: "Safeguarding personal data in compliance with the Personal Data Protection Act 2010 of Malaysia."
  }
];

export const projects: Project[] = [
  {
    id: "cold-cutting-72-pipe",
    title: "Cold Cutting 72\" OD Pipe",
    category: "Fabrication",
    status: "completed",
    description: "Cold cutting operations for large diameter pipe at RWNA Fabrication Yard.",
    location: "RWNA Fabrication Yard",
    client: "Internal Project",
    imageKey: "RWNA_PROJECTS_1"
  },
  {
    id: "cutting-bevel-62-bfw",
    title: "Cutting & \"J\" Bevel of 62\" OD E-18-02A/B/C BFW Preheated",
    category: "Fabrication",
    status: "completed",
    description: "Precision cutting and bevelling operations for large diameter preheated pipes.",
    location: "Tepat Teknik Klang, Selangor, Malaysia",
    client: "Tapat Teknik Sdn Bhd, Petronas Fertilizer Kedah, Malaysia",
    imageKey: "RWNA_PROJECTS_2"
  },
  {
    id: "gwf-1-cutting-16-cra",
    title: "GWF-1 Cutting of 16\" [CRA] OD Pipe",
    category: "Fabrication",
    status: "completed",
    description: "Specialized cutting operations for Corrosion Resistant Alloy (CRA) pipes.",
    location: "RWNA Fabrication Yard",
    client: "Bredero Shaw (M) Sdn Bhd / Woodside Energy Limited",
    imageKey: "RWNA_PROJECTS_3"
  },
  {
    id: "yamal-europipe-gas",
    title: "Yamal Europipe Gas Cutting & \"J\" Bevel of 56\" OD Pipe",
    category: "Fabrication",
    status: "completed",
    description: "Large diameter pipe cutting and bevelling for international gas pipeline project.",
    location: "Malaysia",
    client: "Bredero Shaw (M) Sdn Bhd / Nippon Steel Japan",
    imageKey: "RWNA_PROJECTS_4"
  },
  {
    id: "wheatstone-upstream",
    title: "Wheatstone Upstream External Pipe End Machining of 24\" OD Pipe",
    category: "Onshore",
    status: "completed",
    description: "External pipe end machining for upstream operations in major Australian gas project.",
    location: "Bredero Shaw Kuantan, Malaysia",
    client: "Bredero Shaw (M) Sdn Bhd / Chevron Australia PTL Ltd",
    imageKey: "RWNA_PROJECTS_5"
  },
  {
    id: "gon-upstream-boring",
    title: "GON Upstream Internal Boring of 7.626\" & 9.626\" OD Pipe",
    category: "Onshore",
    status: "completed",
    description: "Internal boring operations for upstream pipeline infrastructure.",
    location: "Malaysia",
    client: "Coatings (M) Sdn Bhd / Chevron Australia Pty Ltd",
    imageKey: "RWNA_PROJECTS_6"
  },
  {
    id: "gumusut-kakap-cutback",
    title: "Gumusut Kakap Cutback Configuration (Shaving)",
    category: "Subsea",
    status: "completed",
    description: "Specialized cutback configuration and shaving operations for subsea pipeline project.",
    location: "Serimax Yard Pelabuhan Kuantan, Malaysia",
    client: "Serimax Welding Services (M) Sdn Bhd / Sapura Kencana-Sapura Acergy / Sabah Shell Petroleum Company",
    imageKey: "RWNA_PROJECTS_7"
  },
  {
    id: "flange-resurface-pedestal",
    title: "Flange Resurface Pedestal Crane Column of 110\" for Barge H131 & H132",
    category: "Offshore",
    status: "completed",
    description: "Large diameter flange resurfacing for pedestal crane columns on marine barges.",
    location: "Boustead Shipyard Pulau Jerejak, Penang, Malaysia",
    client: "Srimultex Engineering / Boustead Naval Shipyard / Pacific Singapore",
    imageKey: "RWNA_PROJECTS_8"
  },
  {
    id: "w3p-enclosure-dulang",
    title: "W3P Enclosure System (Habitat for Welding)",
    category: "Offshore",
    status: "completed",
    description: "Deployment of W3P welding habitat system for safe hot work operations.",
    location: "Dulang Platform",
    client: "Tanjung Offshore Services Sdn. Bhd.",
    imageKey: "RWNA_PROJECTS_9"
  },
  {
    id: "subsea-concrete-cutting",
    title: "Subsea Concrete Coated Linepipe Cutting at Bekok C",
    category: "Subsea",
    status: "completed",
    description: "Subsea cutting operations for concrete coated pipeline at offshore location.",
    location: "Bekok C Platform",
    client: "GOM / Petronas Carigali Sdn Bhd",
    imageKey: "RWNA_PROJECTS_10"
  },
  {
    id: "fabrication-maintenance",
    title: "Fabrication & Maintenance (Onshore & Offshore)",
    category: "Offshore",
    status: "ongoing",
    description: "Comprehensive fabrication and maintenance services for onshore and offshore facilities.",
    location: "Various Locations",
    client: "Multiple Clients",
    imageKey: "RWNA_PROJECTS_11"
  },
  {
    id: "valve-grinding-ytl",
    title: "Onsite Valve Grinding & Lapping for 10\" X 2500# Gate Valve",
    category: "Onshore",
    status: "completed",
    description: "On-site valve grinding and lapping services for high-pressure gate valve.",
    location: "YTL Power Station",
    client: "YTL Power Station",
    imageKey: "RWNA_PROJECTS_12"
  },
  {
    id: "valve-grinding-cufk",
    title: "Onsite Valve Grinding and Lapping Services for Various Size of Valve for CUFK TA 2017",
    category: "Onshore",
    status: "completed",
    description: "Comprehensive valve grinding and lapping services during turnaround operations.",
    location: "CUFK Facility",
    client: "Enproserve (M) Sdn. Bhd.",
    imageKey: "RWNA_PROJECTS_13"
  },
  {
    id: "valve-grinding-24-gate",
    title: "Onsite Valve Grinding and Lapping Services for 24\" X 150# Gate Valve",
    category: "Onshore",
    status: "completed",
    description: "Large diameter gate valve grinding and lapping services.",
    location: "Tati Production Facility",
    client: "Tati Production Sdn. Bhd.",
    imageKey: "RWNA_PROJECTS_14"
  },
  {
    id: "valve-grinding-pcasb",
    title: "Onsite Valve Grinding and Lapping Services for Various Size of Valve for PCASB TA 2017",
    category: "Onshore",
    status: "completed",
    description: "Multi-size valve grinding and lapping services during planned turnaround.",
    location: "PCASB Facility",
    client: "Enproserve (M) Sdn. Bhd.",
    imageKey: "RWNA_PROJECTS_15"
  }
];

const defaultClientProps = {
  industry: "Oil & Gas",
  logoKey: "CLIENT_LOGO",
  contactPerson: "Procurement Department",
  position: "Procurement Manager",
  email: "info@rwna.com.my",
  projectCount: 1,
};

export const clients: Client[] = [
  // A
  { id: "aker-solutions", name: "AKER SOLUTIONS (M) SDN BHD", ...defaultClientProps },
  { id: "anz-engineering", name: "ANZ ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "asturi-metal", name: "ASTURI METAL BUILDERS (M) SDN BHD", ...defaultClientProps },
  { id: "al-jaami", name: "AL-JAAMI ENG & DEV SDN BHD", ...defaultClientProps },
  { id: "amc", name: "AMALGAMATED METAL CORPORATION (M) SDN BHD (AMC)", ...defaultClientProps },
  { id: "alam-dingin", name: "ALAM DINGIN AIR CONDITIONING ENGINEERING", ...defaultClientProps },
  { id: "alam-swiber", name: "ALAM SWIBER OFFSHORE (M) SDN BHD", ...defaultClientProps },
  { id: "allied-marine", name: "ALLIED MARINE & EQUIPMENT SDN BHD", ...defaultClientProps },
  { id: "aans-technical", name: "AANS TECHNICAL & SERVICES SDN BHD", ...defaultClientProps },
  { id: "altus-oil", name: "ALTUS OIL AND GAS SERVICES", ...defaultClientProps },
  { id: "anggerik-laksana", name: "ANGGERIK LAKSANA SDN BHD", ...defaultClientProps },
  { id: "air-products", name: "AIR PRODUCTS SPECIALISED PROCESS EQUIPME", ...defaultClientProps },
  { id: "allseas", name: "ALLSEAS CONSTRUCTION CONTRACTORS S.A.", ...defaultClientProps },
  { id: "alstom-tnb", name: "ALSTOM - TNB JANAMANJUNG SDN BHD", ...defaultClientProps },
  
  // B
  { id: "bredero-shaw", name: "BREDERO SHAW (MALAYSIA) SDN BHD", ...defaultClientProps },
  { id: "barmada-mcdermott", name: "BARMADA MC DERMOTT", ...defaultClientProps },
  { id: "bjs-offshore", name: "BJS OFFSHORE SDN BHD", ...defaultClientProps },
  { id: "basf-petronas", name: "BASF PETRONAS CHEMICALS SDN BHD", ...defaultClientProps },
  { id: "bicara-sepakat", name: "BICARA SEPAKAT SDN BHD", ...defaultClientProps },
  { id: "barisan-samudera", name: "BARISAN SAMUDERA SDN BHD", ...defaultClientProps },
  { id: "bukit-fraser", name: "BUKIT FRASER THERMAL TECHNOLOGY SDN BHD", ...defaultClientProps },
  { id: "bumi-focus", name: "BUMI FOCUS SDN BHD", ...defaultClientProps },
  { id: "boilermaster", name: "BOILERMASTER SDN BHD", ...defaultClientProps },
  { id: "bayu-punama", name: "BAYU PUNAMA SDN BHD", ...defaultClientProps },
  { id: "baxtech", name: "BAXTECH RESOURCES SDN BHD", ...defaultClientProps },
  
  // C
  { id: "campbell-asia", name: "CAMPBELL ASIA PACIFIC", ...defaultClientProps },
  { id: "canadoil", name: "CANADOIL COATING LTD", ...defaultClientProps },
  { id: "cuf-kerteh", name: "CENTRALISE UTILITIES FACILITIES KERTEH", ...defaultClientProps },
  { id: "cuf-gebeng", name: "CENTRALISE UTILITIES FACILITIES GEBENG", ...defaultClientProps },
  { id: "carimin", name: "CARIMIN ENGINEERING SVS SDN BHD", ...defaultClientProps },
  { id: "calidad", name: "CALIDAD SDN BHD", ...defaultClientProps },
  { id: "combine-engineering", name: "COMBINE ENGINEERING AND SERVICES", ...defaultClientProps },
  { id: "cr-asia", name: "CR ASIA (MALAYSIA) SDN BHD", ...defaultClientProps },
  { id: "ckj-engineering", name: "CKJ ENGINEERING & SERVICES SDN BHD", ...defaultClientProps },
  { id: "coral-alliance", name: "CORAL ALLIANCE SDN BHD", ...defaultClientProps },
  
  // D
  { id: "dynamic-engineering", name: "DYNAMIC ENGINEERING & PLANT SERVICES", ...defaultClientProps },
  { id: "dipetro-synergy", name: "DIPETRO SYNERGY ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "dayang-enterprise", name: "DAYANG ENTERPRISE SDN BHD", ...defaultClientProps },
  { id: "duta-klasik", name: "DUTA KLASIK SDN BHD", ...defaultClientProps },
  { id: "dialog-plant", name: "DIALOG PLANT SERVICES SDN BHD", ...defaultClientProps },
  { id: "dan-marine", name: "DAN MARINE TRADING SDN BHD", ...defaultClientProps },
  { id: "dynaciate", name: "DYNACIATE ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "dominant-energy", name: "DOMINANT ENERGY SDN BHD", ...defaultClientProps },
  
  // E
  { id: "ecis-malaysia", name: "ECIS MALAYSIA SDN BHD", ...defaultClientProps },
  { id: "epic-mushtari", name: "EPIC MUSHTARI ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "edaran-fokus", name: "EDARAN FOKUS SDN BHD", ...defaultClientProps },
  { id: "exxonmobil", name: "EXXONMOBIL EXPLORATION AND PRODUCTION", ...defaultClientProps },
  { id: "eco-tower", name: "ECO TOWER SDN BHD", ...defaultClientProps },
  { id: "eastwing", name: "EASTWING CONSTRUCTOR SDN BHD", ...defaultClientProps },
  { id: "emas-ams", name: "EMAS-AMS PTE LTD", ...defaultClientProps },
  { id: "ellatec", name: "ELLATEC (MALAYSIA)SDN BHD", ...defaultClientProps },
  { id: "eversendai", name: "EVERSENDAI OIL & GAS (M) SDN BHD", ...defaultClientProps },
  { id: "eastern-soldar", name: "EASTERN SOLDAR ENGINEERING & CONSTRUCTION SDN BHD", ...defaultClientProps },
  
  // F
  { id: "fpg-oleochemicals", name: "FPG OLEOCHEMICALS SDN BHD", ...defaultClientProps },
  { id: "fumiko", name: "FUMIKO SDN BHD", ...defaultClientProps },
  { id: "flexsys", name: "FLEXSYS CHEMICALS (M) SDN BHD", ...defaultClientProps },
  { id: "fmc-wellhead", name: "FMC WELLHEAD EQUIPMENT SDN BHD", ...defaultClientProps },
  { id: "fmc-technologies", name: "FMC TECHNOLOGIES GLOBAL SUPPLY SDN BHD", ...defaultClientProps },
  { id: "fpso-ventures", name: "FPSO VENTURES SDN BHD", ...defaultClientProps },
  
  // G
  { id: "gatom", name: "GATOM ENGINEERING & SERVICES SDN BHD", ...defaultClientProps },
  { id: "gas-processing", name: "GAS PROCESSING PLANTS", ...defaultClientProps },
  { id: "gom-resources", name: "GOM RESOURCES SDN BHD", ...defaultClientProps },
  
  // H
  { id: "hse-resources", name: "HSE RESOURCES SDN BHD", ...defaultClientProps },
  { id: "hamdan-abdullah", name: "HAMDAN ABDULLAH SDN BHD", ...defaultClientProps },
  { id: "highbase", name: "HIGHBASE STRATEGIC SDN BHD", ...defaultClientProps },
  { id: "hyundai", name: "HYUNDAI ENGINEERING CO. LTD.", ...defaultClientProps },
  
  // I
  { id: "iev-engineering", name: "IEV ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "impian-bumiria", name: "IMPIAN BUMIRIA SDN BHD", ...defaultClientProps },
  
  // J
  { id: "juara-muda", name: "JUARA MUDA INDUSTRI SDN BHD", ...defaultClientProps },
  
  // K
  { id: "knm-ogpet", name: "KNM OGPET (EAST COAST) SDN BHD", ...defaultClientProps },
  { id: "kencana-hl", name: "KENCANA HL SDN BHD", ...defaultClientProps },
  { id: "knm-process", name: "KNM PROCESS SYSTEMS SDN BHD", ...defaultClientProps },
  { id: "kencana-jayamas", name: "KENCANA JAYAMAS SDN BHD", ...defaultClientProps },
  { id: "kencana-torsco", name: "KENCANA TORSCO SDN BHD", ...defaultClientProps },
  { id: "kencana-pinewell", name: "KENCANA PINEWELL SDN BHD", ...defaultClientProps },
  { id: "kuasa-fleksibel", name: "KUASA FLEKSIBEL SDN BHD", ...defaultClientProps },
  { id: "ketengah-jaya", name: "KETENGAH JAYA MAINTENANCE & SERVICES", ...defaultClientProps },
  { id: "khd-humboldt", name: "KHD HUMBOLDT WEDAQ", ...defaultClientProps },
  { id: "kejuruteraan-qks", name: "KEJURUTERAAN QKS SDN BHD", ...defaultClientProps },
  { id: "knm-exotic", name: "KNM EXOTIC EQUIPMENT SDN BHD", ...defaultClientProps },
  
  // L
  { id: "local-engineering", name: "LOCAL ENGINEERING (M) SDN BHD", ...defaultClientProps },
  { id: "lotte-chemical", name: "LOTTE CHEMICAL TITAN (M) SDN BHD", ...defaultClientProps },
  
  // M
  { id: "mushtari-maintenance", name: "MUSHTARI MAINTENANCE SERVICES SDN BHD", ...defaultClientProps },
  { id: "mtbe-malaysia", name: "MTBE MALAYSIA SDN BHD", ...defaultClientProps },
  { id: "mset-engineering", name: "MSET ENGINEERING CORPORATION SDN BHD", ...defaultClientProps },
  { id: "m3nergy-jda", name: "M3NERGY JDA SDN BHD", ...defaultClientProps },
  { id: "m3nergy-fpso", name: "M3NERGY FPSO PERINTIS SDN BHD", ...defaultClientProps },
  { id: "marubeni-steel", name: "MARUBENI ITOCHU STEEL INC.", ...defaultClientProps },
  { id: "marubeni-tubulars", name: "MARUBENI ITOCHU TUBULARS ASIA PTE LTD", ...defaultClientProps },
  { id: "mmhe", name: "MALAYSIA MARINE AND HEAVY ENGINEERING HOLDINGS BERHAD", ...defaultClientProps },
  { id: "majutera", name: "MAJUTERA SENDIRIAN BERHAD", ...defaultClientProps },
  { id: "master-scaff", name: "MASTER SCAFF SUPPLY SERVICES MAINTENANCE", ...defaultClientProps },
  { id: "malakoff", name: "MALAKOFF CORPORATION BERHAD", ...defaultClientProps },
  
  // N
  { id: "newwin-engineering", name: "NEWWIN ENGINEERING PAKA SDN BHD", ...defaultClientProps },
  { id: "nufa-engineering", name: "NUFA ENGINEERING & CONSULTANCY SDN BHD", ...defaultClientProps },
  { id: "newfield", name: "NEWFIELD PENINSULAR MALAYSIA INC", ...defaultClientProps },
  
  // O
  { id: "ombak-marine", name: "OMBAK MARINE GROUP SDN BHD", ...defaultClientProps },
  { id: "optimal-chemical", name: "OPTIMAL CHEMICAL (M) SDN BHD", ...defaultClientProps },
  { id: "og-works", name: "O&G WORKS SDN BHD", ...defaultClientProps },
  
  // P
  { id: "pfce-engineering", name: "PFCE ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "petronas-gas", name: "PETRONAS GAS BERHAD", ...defaultClientProps },
  { id: "pioneer-engineering", name: "PIONEER ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "petronas-terengganu", name: "PETRONAS PENAPISAN TERENGGANU SDN BHD", ...defaultClientProps },
  { id: "petronas-kedah", name: "PETRONAS FERTILIZER (KEDAH) SDN BHD", ...defaultClientProps },
  { id: "petronas-carigali", name: "PETRONAS CARIGALI SDN BHD", ...defaultClientProps },
  { id: "petra-resources", name: "PETRA RESOURCES SDN BHD", ...defaultClientProps },
  { id: "petronas-melaka", name: "PETRONAS PENAPISAN MELAKA SDN BHD", ...defaultClientProps },
  { id: "polyplastic", name: "POLYPLASTIC ASIA PACIFIC SDN BHD", ...defaultClientProps },
  { id: "petronas-ldpe", name: "PETRONAS CHEMICALS LDPE SDN BHD", ...defaultClientProps },
  { id: "pfce-integrated", name: "PFCE INTERGRATED FACILITY COMPLEX", ...defaultClientProps },
  { id: "premier-viable", name: "PREMIER VIABLE SDN BHD", ...defaultClientProps },
  { id: "petronas-ammonia", name: "PETRONAS AMMONIA SDN BHD", ...defaultClientProps },
  { id: "petrofac-malaysia", name: "PETROFAC MALAYSIA", ...defaultClientProps },
  { id: "pfmap", name: "PFMAP SDN BHD", ...defaultClientProps },
  { id: "pioneer-pegasus", name: "PIONEER PEGASUS SDN BHD", ...defaultClientProps },
  { id: "petrofac-ec", name: "PETROFAC E&C SDN BHD", ...defaultClientProps },
  { id: "pasca-bina", name: "PASCA BINA SDN BHD", ...defaultClientProps },
  { id: "puncak-jaya", name: "PUNCAK JAYA PETROLEUM SDN BHD", ...defaultClientProps },
  { id: "pbjv-group", name: "PBJV GROUP SDN BHD", ...defaultClientProps },
  { id: "paras-saksama", name: "PARAS SAKSAMA SDN BHD", ...defaultClientProps },
  { id: "promat-esm", name: "PROMAT ESM (M) SDN BHD", ...defaultClientProps },
  { id: "petronas-polyethylene", name: "PETRONAS CHEMMICALS POLYETHYLENE SDN BHD", ...defaultClientProps },
  { id: "petronas-ethylene", name: "PETRONAS CHEMMICALS ETHYLENE SDN BHD", ...defaultClientProps },
  
  // Q
  { id: "qasturie", name: "QASTURIE OFFSHORE ENGINEERING SDN BHD", ...defaultClientProps },
  
  // R
  { id: "rp-chemical", name: "RP CHEMICAL (M) SDN BHD", ...defaultClientProps },
  { id: "rms-engineering", name: "RMS ENGINEERING & SERVICES", ...defaultClientProps },
  { id: "red-sea", name: "RED SEA ENGINEERING (M) SDN BHD", ...defaultClientProps },
  { id: "rhea-offshore", name: "RHEA OFFSHORE SDN BHD", ...defaultClientProps },
  { id: "rotomech", name: "ROTOMECH SDN BHD", ...defaultClientProps },
  
  // S
  { id: "science-tech", name: "SCIENCE-TECH SOLUTION SDN BHD", ...defaultClientProps },
  { id: "sigur-ros", name: "SIGUR ROS SDN BHD", ...defaultClientProps },
  { id: "shapadu", name: "SHAPADU ENERGY & ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "sapura-acergy", name: "SAPURA ACERGY SDN BHD", ...defaultClientProps },
  { id: "saluran-pasifik", name: "SALURAN PASIFIK SDN BHD", ...defaultClientProps },
  { id: "srimultec", name: "SRIMULTEC ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "serimax", name: "SERIMAX MALAYSIA", ...defaultClientProps },
  { id: "swis-resources", name: "SWIS RESOURCES SDN BHD", ...defaultClientProps },
  { id: "shinko-plantech", name: "SHINKO PLANTECH MALAYSIA BRANCH", ...defaultClientProps },
  { id: "saa-engineering", name: "SAA ENGINEERING & MARINE SDN BHD", ...defaultClientProps },
  { id: "saipem", name: "SAIPEM ASIA SDN BHD", ...defaultClientProps },
  { id: "shineversendai", name: "SHINEVERSENDAI ENG (M) SDN.BHD.", ...defaultClientProps },
  { id: "samudra-oil", name: "SAMUDRA OIL SERVICES SDN BHD", ...defaultClientProps },
  { id: "seri-dinamik", name: "SERI DINAMIK ENGINEERING SDN. BHD.", ...defaultClientProps },
  { id: "sankyu", name: "SANKYU (M) SDN BHD", ...defaultClientProps },
  { id: "serba-dinamik", name: "SERBA DINAMIK SDN BHD", ...defaultClientProps },
  { id: "semi-hermatics", name: "SEMI HERMATICS ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "steelcon", name: "SYARIKAT STEELCON SDN BHD", ...defaultClientProps },
  
  // T
  { id: "tanjung-maintenance", name: "TANJUNG MAINTENANCE SERVICES SDN BHD", ...defaultClientProps },
  { id: "transwater", name: "TRANSWATER API SDN BHD", ...defaultClientProps },
  { id: "turcomp", name: "TURCOMP ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "tl-offshore", name: "TL OFFSHORE SDN BHD", ...defaultClientProps },
  { id: "tmm-engineering", name: "TMM ENGINEERING SERVICES SDN BHD", ...defaultClientProps },
  { id: "talisman", name: "TALISMAN MALAYSIA LIMITED", ...defaultClientProps },
  { id: "tepat-teknik", name: "TEPAT TEKNIK SDN BHD", ...defaultClientProps },
  { id: "tenaga-tiub", name: "TENAGA TIUB SDN BHD", ...defaultClientProps },
  { id: "target-energy", name: "TARGET ENERGY CO.(M)SDN BHD", ...defaultClientProps },
  { id: "toray-basf", name: "TORAY BASF PBT RESIN SDN BHD", ...defaultClientProps },
  { id: "tanjung-offshore", name: "TANJUNG OFFSHORE SERVICES SDN. BHD", ...defaultClientProps },
  { id: "ttes-team", name: "TTES TEAM & SPECIALIST SDN BHD", ...defaultClientProps },
  { id: "toyo-engineering", name: "TOYO ENGINEERING & CONSTRUCTION SDN BHD", ...defaultClientProps },
  { id: "tnb-repair", name: "TNB REPAIR AND MAINTANANCE SDN BHD", ...defaultClientProps },
  
  // V
  { id: "vinyl-chloride", name: "VINYL CHLORIDE (MALAYSIA) SDN BHD", ...defaultClientProps },
  { id: "vh-energy", name: "VH ENERGY SDN BHD", ...defaultClientProps },
  
  // W
  { id: "wing-hup-hing", name: "WING HUP HING ENGINEERING SDN BHD", ...defaultClientProps },
  { id: "welfield", name: "WELFIELD SERVICES SDN BHD", ...defaultClientProps }
];

export const offices: Office[] = [
  {
    id: "kuantan-main",
    city: "Kuantan",
    name: "Kuantan Office & Fabrication Yard (Main Operation Centre)",
    address: "Lot 1/129, Kawasan Perindustrian Gebeng Fasa 2, 26080 Kuantan, Pahang, Malaysia",
    phone: ["+(609) 5839 511/12/13/15/", "+(609) 5807 153/154"],
    fax: ["+(609) - 583 9510/5008"],
    coordinates: { lat: 3.9745, lng: 103.3986 },
    mapUrl: "https://maps.app.goo.gl/aT2zwkXTXbrdyCcN8"
  },
  {
    id: "kuala-lumpur",
    city: "Kuala Lumpur",
    name: "Kuala Lumpur Office",
    address: "Lot 5.48th Floor, Wisma Central, Jalan Ampang, 50450 Kuala Lumpur, Kuala Lumpur, Malaysia",
    phone: ["+(603) - 2161 4850/4831"],
    fax: ["+(603) - 2161 4890"],
    coordinates: { lat: 3.1569, lng: 101.7123 },
    mapUrl: "https://maps.app.goo.gl/SZKtEvshuoXmfc538"
  },
  {
    id: "paka",
    city: "Paka, Dungun",
    name: "Paka Office & Warehouse",
    address: "PT203 Pusat Niaga Paka, 23100 Paka, Dungun, Terengganu, Malaysia",
    phone: ["+(609) - 8270 728"],
    fax: [],
    coordinates: { lat: 4.6333, lng: 103.4333 },
    mapUrl: "https://maps.app.goo.gl/nzAUbwF4Beqm9qjj6"
  },
  {
    id: "sungai-udang",
    city: "Sungai Udang",
    name: "Sungai Udang Office & Warehouse",
    address: "No. 26A, 26B Jalan Wira Bakti 2, Taman Peruna, 76300 Sungai Udang, Melaka, Malaysia",
    phone: ["+(606) - 3515 288"],
    fax: ["+(606) - 3514 288"],
    coordinates: { lat: 2.2833, lng: 102.0833 },
    mapUrl: "https://maps.app.goo.gl/JG9JVUovbS5to2nt7"
  },
  {
    id: "miri",
    city: "Miri",
    name: "Miri Office & Warehouse",
    address: "Lot 1583, Eastwood Valley Industrial Area, Jalan Miri - By Pass, 98000 Miri, Sarawak, Malaysia",
    phone: ["+(6085) - 420 602"],
    fax: ["+(6085) - 423 739"],
    coordinates: { lat: 4.4147, lng: 113.9872 },
    mapUrl: "https://maps.app.goo.gl/JshczshnSq9yhscq6"
  },
  {
    id: "pengerang",
    city: "Sungai Rengit, Pengerang",
    name: "Pengerang Office & Warehouse",
    address: "Block H, G-09, Jalan Rengit 1/2, Taman Rengit Sentral, 81600 Sungai Rengit, Pengerang, Johor, Malaysia",
    phone: ["+(07) 822 4618"],
    fax: [],
    coordinates: { lat: 1.4167, lng: 104.1167 },
    mapUrl: "https://maps.app.goo.gl/P4LiVn8HDQy477178"
  }
];

export const companyStats = [
  {
    label: "Years of Experience",
    value: "25+",
    description: "Established in 2001, serving the oil & gas industry."
  },
  {
    label: "LTI Free Hours",
    value: "2.5M+",
    description: "Over 2.5 million Lost Time Injury free hours achieved."
  },
  {
    label: "Regional Presence",
    value: "6",
    description: "Strategic locations across Malaysia for comprehensive coverage."
  },
  {
    label: "ISO Certified",
    value: "2008",
    description: "ISO 9001:2015 certified since 2008 by Bureau Veritas."
  }
];