import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  HeartPulse, 
  Lightbulb, 
  Send, 
  ChevronRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  MapPin
} from "lucide-react";
import { IMAGES } from "@/assets/images";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const JOB_OPENINGS = [
  {
    title: "Safety & Health Officer (SHO)",
    department: "Safety & Compliance",
    location: "Ta Paka & Gebeng",
    type: "Full-time",
    duration: "Permanent",
    description: "Ensure workplace safety and health compliance across all operations",
    icon: ShieldCheck,
    color: "bg-red-500",
    email: "hr@rwna.com.my",
    requirements: [
      "Diploma/Degree in Occupational Safety & Health, Environmental Engineering or related field",
      "Minimum 2 years experience in oil & gas industry",
      "NIOSH certification required",
      "Knowledge of OSHA, DOSH regulations and ISO 45001 standards",
      "Experience in offshore/onshore operations preferred"
    ],
    responsibilities: [
      "Conduct safety inspections, risk assessments, incident investigations",
      "Implement HSE policies and procedures",
      "Coordinate safety training programs",
      "Ensure compliance with regulatory requirements"
    ]
  },
  {
    title: "Site Supervisor",
    department: "On-site Operations",
    location: "Various Sites (Offshore/Onshore)",
    type: "Full-time",
    duration: "Permanent",
    description: "Lead and supervise on-site machining operations",
    icon: Users,
    color: "bg-blue-500",
    email: "ruzaima@rwna.com.my",
    ccEmail: "hr@rwna.com.my",
    requirements: [
      "Diploma in Mechanical/Chemical Engineering or related field",
      "Minimum 3-5 years site supervision experience in oil & gas operations",
      "Strong leadership and communication skills",
      "Knowledge of on-site machining operations, cold cutting, flange facing",
      "BOSIET/HUET certification for offshore work"
    ],
    responsibilities: [
      "Supervise on-site machining operations",
      "Coordinate with clients and project teams",
      "Ensure quality and safety standards",
      "Manage site personnel and equipment"
    ]
  },
  {
    title: "CNC Programmer",
    department: "Production & Innovation Centre",
    location: "Gebeng, Kuantan",
    type: "Full-time",
    duration: "Permanent",
    description: "Program and operate advanced CNC machinery for precision manufacturing",
    icon: GraduationCap,
    color: "bg-green-500",
    email: "hr@rwna.com.my",
    requirements: [
      "Diploma/Certificate in Mechanical Engineering, Manufacturing Technology or CNC Programming",
      "Minimum 1-2 years experience with CNC machines (DMG Mori, Pinnacle)",
      "Proficiency in CAD/CAM software (Mastercam, SolidWorks)",
      "Knowledge of G-code programming and machining processes"
    ],
    responsibilities: [
      "Program CNC machines for precision machining",
      "Create and optimize machining programs",
      "Perform quality checks and troubleshooting",
      "Collaborate with engineering team on custom solutions"
    ]
  },
  {
    title: "Storekeeper",
    department: "Logistics & Inventory",
    location: "Kuantan, Pahang",
    type: "Full-time",
    duration: "Permanent",
    description: "Manage inventory and logistics operations",
    icon: Briefcase,
    color: "bg-orange-500",
    email: "hr@rwna.com.my",
    requirements: [
      "SPM qualification or equivalent",
      "Minimum 1 year experience in inventory management",
      "Computer literacy (MS Office, inventory software)",
      "Good organizational and record-keeping skills",
      "Knowledge of spare parts and equipment handling"
    ],
    responsibilities: [
      "Manage inventory of spare parts and equipment",
      "Maintain accurate stock records",
      "Coordinate with procurement and operations teams",
      "Ensure proper storage and handling of materials"
    ]
  },
  {
    title: "Project Engineer",
    department: "Engineering",
    location: "Kemaman, Terengganu",
    type: "Full-time",
    duration: "Permanent",
    description: "Support engineering projects from planning to execution",
    icon: Lightbulb,
    color: "bg-purple-500",
    email: "ruzaima@rwna.com.my",
    ccEmail: "hr@rwna.com.my",
    requirements: [
      "Degree in Mechanical/Chemical/Petroleum Engineering",
      "Fresh graduates welcome, 1-2 years experience preferred",
      "Knowledge of oil & gas operations, piping systems, pressure vessels",
      "Proficiency in engineering software (AutoCAD, SolidWorks)",
      "Strong analytical and problem-solving skills"
    ],
    responsibilities: [
      "Support project planning and execution",
      "Prepare technical drawings and specifications",
      "Coordinate with clients and contractors",
      "Conduct site surveys and technical assessments"
    ]
  },
  {
    title: "QC Inspector",
    department: "Quality Control",
    location: "Various Sites",
    type: "Full-time",
    duration: "Permanent",
    description: "Ensure quality standards and compliance across all operations",
    icon: CheckCircle2,
    color: "bg-teal-500",
    email: "hr@rwna.com.my",
    requirements: [
      "Diploma in Mechanical/Chemical Engineering or related field",
      "Minimum 2 years experience in quality control/inspection",
      "NDT Level II certification (UT, MT, PT, RT) preferred",
      "Knowledge of ASME, API, ASTM standards",
      "Experience with inspection equipment and measuring tools"
    ],
    responsibilities: [
      "Perform quality inspections on machining work",
      "Conduct NDT testing as required",
      "Prepare inspection reports and certificates",
      "Ensure compliance with quality standards and client specifications"
    ]
  }
];

const BENEFITS = [
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "Comprehensive Healthcare",
    description: "Medical, dental, and insurance coverage for you and your family."
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Continuous Learning",
    description: "Specialized technical training and certification programs in O&G."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Safety First Culture",
    description: "Work in an environment that prioritizes your safety above all else."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Diverse Community",
    description: "Collaborate with experts from various engineering backgrounds."
  }
];

const VALUES = [
  { title: "Integrity", desc: "We uphold the highest standards of integrity in all our actions." },
  { title: "Innovation", desc: "We constantly seek smarter, safer ways to solve engineering challenges." },
  { title: "Excellence", desc: "We deliver high-quality engineering services that exceed expectations." },
  { title: "Collaboration", desc: "We work as one team to achieve sustainable success for our clients." }
];

export default function Career() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  
  const scrollToOpenings = () => {
    const openingsSection = document.getElementById('current-openings');
    if (openingsSection) {
      openingsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCulture = () => {
    const cultureSection = document.getElementById('culture-section');
    if (cultureSection) {
      cultureSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const toggleJob = (index: number) => {
    setExpandedJob(expandedJob === index ? null : index);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.HERO_BG_8} 
            alt="RWNA Careers" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/20 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <Briefcase className="w-4 h-4" />
              Join Our Team
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
              Building the Future of <span className="text-primary">Engineering.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              At RWNA, we don't just provide services; we build careers. Join a team of specialists dedicated to precision, safety, and innovation in the Oil & Gas industry.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" onClick={scrollToOpenings}>
                View Openings
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" onClick={scrollToCulture}>
                Our Culture
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why RWNA Section */}
      <section id="culture-section" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A Culture of Precision & Safety</h2>
              <p className="text-lg text-muted-foreground mb-6">
                With over 2.5 million LTI-free hours, safety isn't just a policy at RWNA—it's our way of life. We provide our employees with state-of-the-art equipment and rigorous training to ensure they can perform at their best while staying safe.
              </p>
              <ul className="space-y-4">
                {[
                  "Technical mastery through mentorship",
                  "Innovation-driven production environment",
                  "Competitive compensation & benefits",
                  "Global exposure through major O&G projects"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square rounded-3xl overflow-hidden border border-border shadow-xl"
              >
                <img src={IMAGES.MACHINING_5} alt="Culture 1" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="aspect-[3/4] rounded-3xl overflow-hidden border border-border shadow-xl mt-8"
              >
                <img src={IMAGES.WELDING_4} alt="Culture 2" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Bento Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Driven by Values</h2>
            <p className="text-muted-foreground">Our core values define how we work together and how we serve our clients.</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VALUES.map((value, idx) => (
              <motion.div key={idx} variants={staggerItem}>
                <Card className="h-full border-border/50 hover:border-primary/50 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/10 group-hover:bg-primary transition-colors" />
                  <CardContent className="pt-8">
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">More Than Just a Paycheck</h2>
            <p className="text-primary-foreground/80">We invest in our people's well-being and growth because we know they are our greatest asset.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section id="current-openings" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
              <p className="text-muted-foreground">Ready to take the next step? Explore our current job opportunities and find your place at RWNA.</p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                {JOB_OPENINGS.length} POSITIONS AVAILABLE
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {JOB_OPENINGS.map((job, index) => {
              const isExpanded = expandedJob === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-border/50 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all"
                >
                  {/* Job Header - Clickable */}
                  <button
                    onClick={() => toggleJob(index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">{job.title}</h3>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{job.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-muted-foreground transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/50"
                    >
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Requirements */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            Requirements
                          </h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary" />
                            Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Application Section */}
                      <div className="px-6 pb-6">
                        <div className="bg-muted/30 rounded-xl p-4 flex items-start justify-between gap-6">
                          <div className="flex gap-8 text-sm">
                            {/* Send CV to Column */}
                            <div>
                              <p className="font-medium text-foreground mb-1">Send CV to:</p>
                              <p className="text-primary font-mono">{job.email}</p>
                            </div>
                            
                            {/* CC Column */}
                            {job.ccEmail && (
                              <div>
                                <p className="font-medium text-foreground mb-1">CC to:</p>
                                <p className="text-muted-foreground font-mono">{job.ccEmail}</p>
                              </div>
                            )}
                          </div>
                          <Button 
                            size="lg"
                            className="rounded-full px-8"
                            onClick={() => window.location.href = `mailto:${job.email}${job.ccEmail ? `?cc=${job.ccEmail}` : ''}?subject=Application for ${job.title}`}
                          >
                            <Send className="mr-2 w-5 h-5" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl bg-card border border-border p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See a Perfect Fit?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented individuals. Send us your CV and we'll keep you in mind for future opportunities that match your expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Send className="w-4 h-4" />
                Submit Your CV
              </Button>
              <Button variant="outline" size="lg">
                Contact HR Department
              </Button>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              Email your application to <span className="text-primary font-medium">hr@rwna.com.my</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
