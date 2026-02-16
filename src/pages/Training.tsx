import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  BookOpen, 
  Wrench, 
  Shield, 
  Target,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone
} from "lucide-react";
import { IMAGES } from "@/assets/images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";

const TRAINING_PROGRAMS = [
  {
    title: "Precision Metal Designing and Machining",
    duration: "4-6 months",
    category: "CNC Operations",
    description: "Comprehensive training in precision machining using DMG Mori and advanced CNC equipment",
    qualifications: [
      "Diploma in Mechanical Engineering or Manufacturing Technology",
      "Basic knowledge of machining processes and CAD/CAM",
      "Computer literacy and technical drawing skills",
      "Attention to detail and precision",
      "Problem-solving and analytical skills"
    ],
    jobScope: [
      "DMG Mori CNC Turnmill Machine operations",
      "Double Column Fully Automatic Band Saw operations",
      "Waterjet Cutting Machine programming and operation",
      "TMT CNC Turning Machine operations",
      "Pinnacle CNC Milling Machine (LV126 & LV105) operations",
      "NC Surface Grinding Machine (SD6120AA) operations",
      "DMG MORI CNC Milling Machine (DMU 50) operations",
      "DMG MORI CNC Turn Mill Machine (DMU 125) operations"
    ],
    benefits: [
      "Training on industry-leading DMG Mori equipment",
      "Certification in precision machining",
      "Career advancement in manufacturing technology",
      "Competitive training allowance",
      "Access to state-of-the-art facilities"
    ]
  },
  {
    title: "Cold Cutting & Bevelling",
    duration: "3-4 months",
    category: "On-Site Machining",
    description: "Training in onshore and offshore on-site machining for cold cutting and bevelling operations",
    qualifications: [
      "Diploma/Degree in Mechanical, Chemical, or Petroleum Engineering",
      "Final year students or fresh graduates welcome",
      "Strong interest in oil & gas industry operations",
      "Good communication skills in English and Bahasa Malaysia",
      "Willingness to work in offshore/onshore environments"
    ],
    jobScope: [
      "Cold cutting and bevelling operations in hazardous environments",
      "Low Clearance Split Frame operations (½\" to 108\" Pipe OD)",
      "Travel L Cutter operations (6\" to 72\" Pipe OD & 33ft Vessel Diameter)",
      "Mobile, convenient setup for on-site work",
      "Pneumatic or hydraulic driven motor operations",
      "Wide range of bevel types and sizes",
      "Safety protocols for hazardous environments"
    ],
    benefits: [
      "Fast and easy setup techniques",
      "Safe and cost-effective solution training",
      "Experience with largest collection of cold-cutting machines in SEA region",
      "Hands-on training with state-of-the-art equipment",
      "Potential for permanent employment"
    ]
  },
  {
    title: "Flange Facing & Milling",
    duration: "2-4 months",
    category: "Precision Machining",
    description: "Training in on-site flange facing and milling to produce lathe quality surfaces",
    qualifications: [
      "Diploma in Mechanical Engineering or Manufacturing Technology",
      "Basic knowledge of machining processes",
      "Understanding of flange types and specifications",
      "Attention to detail and precision",
      "Problem-solving skills"
    ],
    jobScope: [
      "Flange facing operations (½\" to 150\" O.D. Flange)",
      "Milling operations (25mm to 2,300mm, XYZ axis)",
      "External/internal-mounted operations",
      "All facing types (RTJ, Raised Face, Lens Ring etc.)",
      "Pneumatic or hydraulic driven motor operations",
      "On-site repair of large equipment",
      "Quality control and flatness testing"
    ],
    benefits: [
      "Training on comprehensive flange facing and milling machines",
      "Quick setup techniques for fast machining process",
      "Experience with largest collection in SEA region",
      "Career advancement in precision machining",
      "Competitive training allowance"
    ]
  },
  {
    title: "Pipe End Prep",
    duration: "2-3 months",
    category: "Pipe Operations",
    description: "Training in precision on-site bevelling and counter boring for pipe end preparation",
    qualifications: [
      "Diploma in Mechanical Engineering or related field",
      "Understanding of pipe systems and welding preparation",
      "Basic knowledge of machining operations",
      "Safety-conscious mindset",
      "Physical fitness for on-site work"
    ],
    jobScope: [
      "Pipe End Prep machine operations (¼\" to 14\" sizes)",
      "Precision on-site bevelling and counter boring",
      "Light wall, heavy wall pipe, tube or casing operations",
      "Internal and external clamp operations",
      "Quality bevel and counter bore production",
      "End prep for elbow, tees & valves",
      "Precise measurements and quality control"
    ],
    benefits: [
      "Quick and easy setup techniques",
      "Flexibility in bevel type selection",
      "Minimal clearance operation skills",
      "Onshore and offshore environment training",
      "Industry-recognized pipe preparation skills"
    ]
  },
  {
    title: "Hydraulic Bolt Tensioning",
    duration: "1-3 months",
    category: "Specialized Operations",
    description: "Training in accurate bolt loading using hydraulic technology for oil & gas industry",
    qualifications: [
      "Diploma/Degree in Mechanical Engineering or related field",
      "Interest in precision bolting operations",
      "Good analytical and technical skills",
      "Understanding of torque and tension principles",
      "Commitment to safety and accuracy"
    ],
    jobScope: [
      "Hydraulic bolt tensioning operations (1\" to 3½\" stud bolt sizes)",
      "Offshore, onshore topside and sub-sea applications",
      "Accurate load control and pressure application",
      "Multiple fastener loading techniques",
      "Uniform bolt loading procedures",
      "Friction co-efficiency estimation",
      "Equipment setup and operation"
    ],
    benefits: [
      "Training on state-of-the-art hydraulic equipment",
      "High accuracy techniques (+/- 3% precision standards)",
      "Specialized skills for oil & gas industry",
      "Career path in specialized bolting operations",
      "Industry-recognized qualifications"
    ]
  },
  {
    title: "Hydraulic/Pneumatic Torque Wrench",
    duration: "1-2 months",
    category: "Torque Operations",
    description: "Training in hydraulic & pneumatic torque wrench systems for precise fastener operations",
    qualifications: [
      "Diploma in Mechanical Engineering or related field",
      "Basic understanding of torque principles",
      "Good hand-eye coordination",
      "Attention to detail and precision",
      "Safety-conscious approach"
    ],
    jobScope: [
      "Hydraulic/Pneumatic torque wrench operations (27mm to 145mm nut sizes)",
      "Pre-determined controlled torque application",
      "Fastener tightening and loosening operations",
      "Equipment calibration and testing",
      "Pneumatic or hydraulic driven motor operations",
      "High accuracy operations (+/- 3% with standard torque chart)",
      "Rigid steel design equipment handling"
    ],
    benefits: [
      "Cutting-edge, compact tool expertise",
      "High accuracy and reliability training",
      "Versatile equipment operation skills",
      "Quick and easy setup techniques",
      "Industry-standard torque wrench certification"
    ]
  },
  {
    title: "Hot/Cold Tapping",
    duration: "3-4 months",
    category: "Live System Operations",
    description: "Training in hot/cold tapping for branch connections on live pressurized systems",
    qualifications: [
      "Diploma/Degree in Mechanical or Petroleum Engineering",
      "Understanding of pressure systems and safety protocols",
      "Experience with welding or machining operations",
      "Strong safety mindset and risk assessment skills",
      "Ability to work under pressure"
    ],
    jobScope: [
      "Hot/Cold tapping operations (½\" to 12\" sizes)",
      "Branch connection installation on live systems",
      "Online welding data preparation using proven software",
      "Piping and vessel material operations",
      "Temperature probe monitoring point installation",
      "Isolation equipment (stopples) entry point creation",
      "No pipe content release procedures"
    ],
    benefits: [
      "Continuous system operation expertise",
      "Cost-effective solution training",
      "Latest internationally proven software training",
      "High-demand specialized skills",
      "Reduced downtime operation techniques"
    ]
  },
  {
    title: "W3P Enclosure System (Welding Habitat)",
    duration: "2-3 months",
    category: "Safety Systems",
    description: "Training in SIRIM QAS certified safety enclosure for hot work operations",
    qualifications: [
      "Diploma/Degree in Safety Engineering, Mechanical Engineering or related field",
      "Understanding of hazardous environment operations",
      "Knowledge of welding and hot work procedures",
      "Safety-first mindset and attention to detail",
      "Good problem-solving and technical skills"
    ],
    jobScope: [
      "W3P Enclosure System installation and operation",
      "Safety enclosure setup for welding operations",
      "Positive pressure system management",
      "Airlock door and emergency panel operations",
      "Gas detection and auto shutdown system",
      "Fire retardant fabric handling (up to 550°C)",
      "Offshore platforms and petrochemical plants operations"
    ],
    benefits: [
      "SIRIM QAS International certification training",
      "Specialized safety system expertise",
      "High-demand skills for offshore operations",
      "Safety-critical career advancement",
      "Industry-leading safety qualifications"
    ]
  },
  {
    title: "Line Boring and Hole Drilling & Threading",
    duration: "2-4 months",
    category: "Precision Drilling",
    description: "Training in line boring, hole drilling and threading for on-site machining applications",
    qualifications: [
      "Diploma in Mechanical Engineering or Manufacturing Technology",
      "Basic knowledge of drilling and boring operations",
      "Understanding of threading and precision measurements",
      "Good hand-eye coordination",
      "Problem-solving and technical skills"
    ],
    jobScope: [
      "Line boring operations for hole enlargement",
      "Hole drilling and threading operations",
      "Versatile portable drilling machine operations",
      "General drilling and stud removal applications",
      "Linear rails & guides for accuracy and rigidity",
      "Auto feed / hand feed gearbox and motor operations",
      "Direct spindle drive operations"
    ],
    benefits: [
      "High precision drilling techniques",
      "Light weight equipment operation skills",
      "Easy setup and assembly training",
      "Reduced production downtime techniques",
      "Versatile on-site machining skills"
    ]
  },
  {
    title: "On-Site Valve Services",
    duration: "3-5 months",
    category: "Valve Operations",
    description: "Comprehensive training in on-site valve grinding, lapping and repair services",
    qualifications: [
      "Diploma in Mechanical Engineering or related field",
      "Understanding of valve systems and operations",
      "Basic knowledge of grinding and lapping processes",
      "Attention to detail and precision",
      "Safety-conscious approach to equipment operation"
    ],
    jobScope: [
      "On-site grinding & lapping machines for safety valves",
      "Special tools for grinding conical valve seats",
      "Sealing faces machining for safety valves",
      "Tapered valve seats repair in high-pressure valves",
      "Cross-hatched grinding pattern production",
      "Portable machine operations for valve disks and flanges (3/8\" - 64\")",
      "Grinding & lapping consumables handling"
    ],
    benefits: [
      "Specialized valve repair expertise",
      "Safety valve certification training",
      "High-pressure system operation skills",
      "Portable equipment operation techniques",
      "Industry-recognized valve service qualifications"
    ]
  }
];

const FACILITIES = [
  {
    name: "Innovation & Production Centre (INP)",
    description: "State-of-the-art facility with comprehensive CNC machinery and R&D capabilities",
    features: [
      "DMG Mori CNC Turnmill Machines",
      "Waterjet Cutting Technology",
      "Surface Grinding Equipment",
      "CAD/CAM Software Suite",
      "Quality Control Laboratory"
    ]
  },
  {
    name: "On-Site Training Facilities",
    description: "Real-world training environment with actual oil & gas equipment",
    features: [
      "Cold Cutting & Bevelling Equipment",
      "Hydraulic Bolt Tensioning Systems",
      "W3P Enclosure System (Welding Habitat)",
      "Valve Services Workshop",
      "Safety Training Center"
    ]
  }
];

export default function Training() {
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

  const toggleProgram = (index: number) => {
    setExpandedProgram(expandedProgram === index ? null : index);
  };
  
  const scrollToPrograms = () => {
    const programsSection = document.getElementById('training-programs');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToApply = () => {
    const applySection = document.getElementById('apply-section');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.HERO_BG_7} 
            alt="RWNA Training Programs" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/20 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="max-w-4xl"
          >
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary uppercase tracking-widest">
              Industrial Training
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Shape Your <span className="text-primary">Engineering</span> Future
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Join RWNA's comprehensive industrial training programs and gain hands-on experience 
              in cutting-edge oil & gas engineering operations. Learn from industry experts and 
              build your career with Malaysia's leading on-site machining specialist.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" onClick={scrollToApply}>
                <GraduationCap className="mr-2 w-5 h-5" />
                Apply for Training
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" onClick={scrollToPrograms}>
                <BookOpen className="mr-2 w-5 h-5" />
                Program Details
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="training-programs" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training programs designed to develop skilled professionals 
              for the oil & gas industry
            </p>
          </div>

          <div className="space-y-6">
            {TRAINING_PROGRAMS.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all">
                  {/* Program Header */}
                  <button
                    onClick={() => toggleProgram(index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">{program.title}</h3>
                          <Badge variant="secondary">{program.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{program.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {program.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-muted-foreground transition-transform ${
                        expandedProgram === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  {/* Expanded Content */}
                  {expandedProgram === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/50"
                    >
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Qualifications */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            Qualifications
                          </h4>
                          <ul className="space-y-2">
                            {program.qualifications.map((qual, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                {qual}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Job Scope */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-primary" />
                            Training Scope
                          </h4>
                          <ul className="space-y-2">
                            {program.jobScope.map((scope, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                {scope}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            Benefits
                          </h4>
                          <ul className="space-y-2">
                            {program.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Facilities */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">World-Class Training Facilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn with state-of-the-art equipment and real-world industry tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {FACILITIES.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full p-6 border-border/50 hover:border-primary/30 transition-all">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">{facility.name}</CardTitle>
                    <p className="text-muted-foreground">{facility.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {facility.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section id="apply-section" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Apply</h2>
              <p className="text-muted-foreground">
                Ready to start your engineering career? Follow these simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  step: "01",
                  title: "Submit Application",
                  description: "Send your CV, academic transcripts, and cover letter to our HR department"
                },
                {
                  step: "02", 
                  title: "Interview Process",
                  description: "Participate in technical and HR interviews to assess your suitability"
                },
                {
                  step: "03",
                  title: "Start Training",
                  description: "Begin your comprehensive training program with our experienced mentors"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <Card className="p-8 bg-primary/5 border-primary/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Ready to Apply?</h3>
                <p className="text-muted-foreground">
                  Submit your application using the contact information below
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Training Applications</p>
                    <p className="text-sm text-muted-foreground">internship@rwna.com.my</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Inquiries</p>
                    <p className="text-sm text-muted-foreground">+609-583 9513</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full px-8"
                  onClick={() => window.location.href = 'mailto:internship@rwna.com.my?subject=Industrial Training Application'}
                >
                  <Mail className="mr-2 w-5 h-5" />
                  Apply Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}