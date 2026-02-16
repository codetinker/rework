import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle2, Award, Users, BookOpen, Microscope, ShieldCheck, Zap } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ROUTE_PATHS } from '@/lib';
import { Link } from 'react-router-dom';

const trainingPrograms = [
  {
    name: "Mechanical Engineering Technician",
    location: "Gebeng, Kuantan",
    qualification: "Diploma in Mechanical Engineering",
    jobScope: "Assist in on-site machining operations, equipment maintenance, and technical documentation"
  },
  {
    name: "Subsea Operations Specialist",
    location: "Labuan & Offshore",
    qualification: "Certificate in Marine Engineering or equivalent",
    jobScope: "Diamond Wire Saw operations, subsea cutting, and underwater maintenance support"
  },
  {
    name: "CNC Machining Technician",
    location: "Innovation & Production Centre, Gebeng",
    qualification: "Certificate in CNC Programming/Operations",
    jobScope: "Precision machining, CNC programming, quality control, and production planning"
  },
  {
    name: "W3P Enclosure System Operator",
    location: "Multiple Offshore Locations",
    qualification: "Certificate in Welding Technology",
    jobScope: "Setup and operation of pressurized welding habitats, gas detection, safety protocols"
  },
  {
    name: "Quality Assurance Inspector",
    location: "Gebeng, Kuantan",
    qualification: "Diploma in Quality Management/Engineering",
    jobScope: "Inspection procedures, documentation, compliance monitoring, and audit support"
  },
  {
    name: "HSE Coordinator",
    location: "All RWNA Locations",
    qualification: "Certificate in Occupational Safety & Health",
    jobScope: "Safety training, incident investigation, compliance monitoring, and risk assessment"
  },
  {
    name: "Hydraulic Systems Technician",
    location: "Kemaman & Offshore",
    qualification: "Certificate in Hydraulic Systems",
    jobScope: "Hydraulic bolt tensioning, torque wrench operations, and equipment calibration"
  },
  {
    name: "Pipeline Maintenance Specialist",
    location: "Bintulu & Miri",
    qualification: "Diploma in Petroleum Engineering",
    jobScope: "Hot/cold tapping operations, pipeline integrity, and maintenance planning"
  },
  {
    name: "Technical Documentation Officer",
    location: "Head Office, Gebeng",
    qualification: "Diploma in Technical Communication",
    jobScope: "Procedure writing, training materials, technical drawings, and compliance documentation"
  },
  {
    name: "Equipment Calibration Technician",
    location: "Innovation & Production Centre",
    qualification: "Certificate in Instrumentation & Control",
    jobScope: "Equipment calibration, maintenance scheduling, and precision measurement"
  }
];

const courseFeatures = [
  { label: "Industry Certified", value: "SIRIM & ISO", icon: <CheckCircle2 className="w-4 h-4 text-primary" /> },
  { label: "Training Hours", value: "40 - 120 Hours", icon: <BookOpen className="w-4 h-4 text-primary" /> },
  { label: "Success Rate", value: "98% Certified", icon: <Users className="w-4 h-4 text-primary" /> },
  { label: "Facility", value: "Gebeng IPC", icon: <GraduationCap className="w-4 h-4 text-primary" /> },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function IndustrialTraining() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.WELDING_8} 
            alt="Industrial Training Background" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-mono mb-4 border border-primary/30">
              SKILLS & COMPETENCY
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Empowering the Next Generation of <span className="text-primary">Engineering Leaders</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              RWNA Engineering's Innovation & Production Centre (IPC) in Gebeng provides world-class technical training 
              designed to meet the rigorous demands of the global Oil & Gas industry.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full">
                View Course Catalog
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-primary/50 text-primary">
                Inquire for Corporate
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Stats */}
      <section className="py-12 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {courseFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{feature.label}</p>
                  <p className="text-lg font-bold text-foreground">{feature.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs List */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industrial Training Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our comprehensive training programs designed to develop skilled professionals for the oil & gas industry. 
              Each program combines theoretical knowledge with hands-on practical experience.
            </p>
          </div>

          <motion.div 
            variants={stagger} 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {trainingPrograms.map((program, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="h-full border-border/50 bg-card hover:border-primary/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{program.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-mono">📍 {program.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Required Qualification:</h4>
                      <p className="text-sm text-muted-foreground">{program.qualification}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Job Scope:</h4>
                      <p className="text-sm text-muted-foreground">{program.jobScope}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Application Information */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-primary/5 border border-primary/20 rounded-2xl text-center"
          >
            <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Interested applicants please write-in with a detailed resume to <strong>internship@rwna.com.my</strong>. 
              If you have any inquiries regarding the careers, don't hesitate to call <strong>+609-5839513</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full">
                📧 Email Application
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                📞 Call +609-5839513
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certification Info */}
      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.MACHINING_1} 
                  alt="Training Facility" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-8 bg-primary rounded-2xl text-primary-foreground shadow-xl">
                <p className="text-4xl font-bold font-mono mb-1">SIRIM</p>
                <p className="text-sm opacity-80 uppercase tracking-widest">Certified Training Body</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Certification & Accreditation</h2>
              <p className="text-muted-foreground mb-6">
                At RWNA, we don't just teach; we certify competence. Our training modules are recognized by 
                national and international bodies, ensuring that our graduates are industry-ready from day one.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Competency certification recognized by major O&G operators.",
                  "Training content aligned with ASME & ISO safety standards.",
                  "Access to RWNA's fleet of over 60 specialized machines for hands-on practice.",
                  "Priority hiring opportunities for top-performing trainees."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 p-0.5 rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to={ROUTE_PATHS.ABOUT}>
                <Button size="lg" className="rounded-full">
                  Contact for Training Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section Hook */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-[2rem] bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-6 relative z-10">Ready to upgrade your team's capability?</h2>
            <p className="text-lg opacity-90 mb-8 relative z-10">
              We provide customized industrial training packages for corporate clients across the ASEAN region.
            </p>
            <Link to={ROUTE_PATHS.ABOUT} className="relative z-10">
              <Button size="lg" variant="secondary" className="rounded-full font-semibold">
                Request a Training Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
