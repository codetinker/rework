import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Award, 
  ShieldCheck, 
  FileCheck, 
  Trophy, 
  CheckCircle2, 
  Star, 
  ExternalLink,
  Clock,
  ChevronDown,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { IMAGES } from "@/assets/images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";

const certifications = [
  {
    title: "ISO 9001:2015 Certification",
    issuer: "BUREAU VERITAS",
    description: "Quality Management System",
    icon: ShieldCheck,
    category: "Quality",
    date: "23/05/2008"
  },
  {
    title: "ISO 45001:2018 Certification",
    issuer: "BUREAU VERITAS",
    description: "Occupational Health & Safety Management",
    icon: ShieldCheck,
    category: "Safety",
    date: "23/02/2019"
  },
  {
    title: "OHSAS 18001:2007 Certification",
    issuer: "BUREAU VERITAS",
    description: "Occupational Health & Safety Assessment Series",
    icon: ShieldCheck,
    category: "Safety",
    date: "15/03/2016"
  },
  {
    title: "American Society Of Mechanical Engineering (ASME) Certification - U,U2 And S",
    issuer: "ASME",
    description: "Pressure Vessel & Boiler Code Certification",
    icon: FileCheck,
    category: "Engineering",
    date: "26/09/2014"
  },
  {
    title: "Certification Of Authorization To Register (U,U2 And S)",
    issuer: "NATIONAL BOARD",
    description: "National Board Inspection Code Authorization",
    icon: FileCheck,
    category: "Engineering",
    date: "06/01/2015"
  },
  {
    title: "Certification Of Authorization To Register (R)",
    issuer: "NATIONAL BOARD",
    description: "Repair Authorization for Pressure Equipment",
    icon: FileCheck,
    category: "Engineering",
    date: "26/09/2014"
  }
];

const licenses = [
  {
    title: "Registration As Unfired Pressure Vessel Fabricator",
    scope: "Authorization to fabricate unfired pressure vessels",
    body: "DOSH",
    date: "18/06/2015",
    status: "Active"
  },
  {
    title: "Registration As Unfired Pressure Vessel And Steam Boiler Repairer",
    scope: "Authorization to repair unfired pressure vessels and steam boilers",
    body: "DOSH",
    date: "21/06/2015",
    status: "Active"
  },
  {
    title: "Registration As Petroleum Contractor Company (Pipeline, Recticulation And Metering Station)",
    scope: "Authorization for petroleum contractor services",
    body: "DOSH",
    date: "22/11/2013",
    status: "Active"
  },
  {
    title: "License To Supply Equipment & Services To Carigali Companies And Oil & Gas Produces In Malaysia",
    scope: "Authorization to supply equipment and services to oil & gas companies",
    body: "PETRONAS",
    date: "21/02/2002",
    status: "Active"
  }
];

const achievements = [
  {
    year: "2020",
    title: "Wafew Workplace Accident Free Week 2020",
    description: "Persatuan Pengamal ESH Pahang (PESHA)",
    icon: Trophy
  },
  {
    year: "2019",
    title: "Global Safety Days. Safe Choices Becomes Safe Habits. On Call Contractor",
    description: "BASF CHEMICALS",
    icon: Star
  },
  {
    year: "2017",
    title: "Best Contractor Hse Performance 1st Place For Mtbe Plant Turnaround",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Award
  },
  {
    year: "2016",
    title: "Certificate Of Appreciation - 1 Malaysian Steam And Internal Combustion Engineer Association East Boiler Seminar",
    description: "MSEIA",
    icon: Trophy
  },
  {
    year: "2016",
    title: "Certificate Of Appreciation - Program Karnival Kerjaya & Azam Kerja 1malaysia Peringkat Negeri Pahang",
    description: "PUSAT JOBS MALAYSIA PAHANG/JABATAN TENAGA KERJA",
    icon: Star
  },
  {
    year: "2016",
    title: "Contractor HSE Performance Award 1 Place - Turnaround PDH 2016",
    description: "PETRONAS",
    icon: Award
  },
  {
    year: "2016",
    title: "Certificate Of Appreciation - Meeting Desb Hse Expectations For Q1 2016",
    description: "DAYANG ENTERPRISE SDN BHD",
    icon: Trophy
  },
  {
    year: "2015",
    title: "HSE Excellence Award - Best HSE Performance",
    description: "PETRONAS GAS BERHAD",
    icon: Star
  },
  {
    year: "2015",
    title: "HSE Excellence Award - Best Housekeeping",
    description: "PETRONAS GAS BERHAD",
    icon: Award
  },
  {
    year: "2015",
    title: "Appreciation Award Gold Highest BO Contribution",
    description: "PETRONAS",
    icon: Trophy
  },
  {
    year: "2015",
    title: "Appreciation Award Silver Outstanding Senior PMT",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Star
  },
  {
    year: "2015",
    title: "Best Contractor Performance In Mechanical - Static",
    description: "PETRONAS",
    icon: Award
  },
  {
    year: "2015/2014",
    title: "Certificate Of Appreciation - Mechanical Static Category",
    description: "PETRONAS",
    icon: Trophy
  },
  {
    year: "2014",
    title: "Certificate Of Appreciation - Best Contractor (HSE) In Management Of Contractors Performance",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Star
  },
  {
    year: "2014",
    title: "Certificate Of Appreciation - Highest Behaviour Observation Contribution In Management Of Contractors Performance",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Award
  },
  {
    year: "2014",
    title: "Certificate Of Appreciation - Highest BO Submission 1st Place 8th MTBE Turnaround 2014",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Trophy
  },
  {
    year: "2014",
    title: "Certificate Of Appreciation - Achievement Of 1.7 Mil Contractor's Mahours Without LTI As December 2013",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Star
  },
  {
    year: "2013",
    title: "Certificate Of Appreciation - Participation In Management Of Contractors Performance Forum",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Award
  },
  {
    year: "2013",
    title: "Certificate Of Appreciation - For Supporting Industrial Training",
    description: "UNIVERSITY MALAYSIA PAHANG",
    icon: Trophy
  },
  {
    year: "2013",
    title: "Certificate Of Appreciation - Highest Behaviour Observation Submission",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Star
  },
  {
    year: "2013",
    title: "Certificate Of Appreciation - Certificate Programme For Safety And Health Officer",
    description: "NATIONAL INSTITUTE OF OCCUPATIONAL SAFETY AND HEALTH",
    icon: Award
  },
  {
    year: "2012",
    title: "High Potential Award Vendor",
    description: "PETRONAS",
    icon: Trophy
  },
  {
    year: "2012",
    title: "Appreciation Of Successful Shutdown Without LTI",
    description: "PETRONAS CARIGALI",
    icon: Star
  },
  {
    year: "2011/2010",
    title: "Certificate Of Appreciation - Best Contractor Award",
    description: "MTBE/PETRONAS CHEMICALS/POLYPROPYLENE",
    icon: Award
  },
  {
    year: "2010",
    title: "Best Contractor HSE Performance",
    description: "PETRONAS CHEMICALS MTBE",
    icon: Trophy
  },
  {
    year: "2010",
    title: "Certificate Of Appreciation - HSE Personality For FY2009/2010 Contractor Category",
    description: "MTBE/PETRONAS CHEMICALS/POLYPROPYLENE",
    icon: Star
  },
  {
    year: "2009",
    title: "Certificate Of Appreciation - FPSO Perintis Annual Shutdown",
    description: "PETRONAS CARIGALI",
    icon: Award
  },
  {
    year: "2009",
    title: "The Asian Oil, Gas & Petrochemical Engineering Exhibition",
    description: "MALAYSIA EXHIBITION SERVICE SDN BHD",
    icon: Trophy
  },
  {
    year: "2009/2008",
    title: "Most Promising Vendor",
    description: "PETRONAS",
    icon: Star
  },
  {
    year: "2008",
    title: "Most Promising Vendor",
    description: "PETRONAS",
    icon: Award
  }
];

// Group achievements by year
const groupedAchievements = achievements.reduce((acc, achievement) => {
  const year = achievement.year;
  if (!acc[year]) {
    acc[year] = [];
  }
  acc[year].push(achievement);
  return acc;
}, {} as Record<string, typeof achievements>);

// Sort years in descending order
const sortedYears = Object.keys(groupedAchievements).sort((a, b) => {
  // Handle year ranges like "2015/2014" and "2011/2010"
  const getFirstYear = (yearStr: string) => parseInt(yearStr.split('/')[0]);
  return getFirstYear(b) - getFirstYear(a);
});

export default function Recognition() {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const cardWidth = 320 + 24; // card width + gap
    sliderRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setCurrentSlide(index);
  };
  
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      // Handle scroll for navigation dots
      const handleScroll = () => {
        const cardWidth = 320 + 24;
        const newSlide = Math.round(slider.scrollLeft / cardWidth);
        setCurrentSlide(newSlide);
      };
      
      slider.addEventListener('scroll', handleScroll);
      
      return () => {
        slider.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.HERO_BG_6} 
            alt="Recognition Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary uppercase tracking-widest">
              Our Credentials
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Commitment to <span className="text-primary">Excellence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              RWNA Engineering maintains the highest industry standards through rigorous 
              certifications, specialized licenses, and an unwavering focus on safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Safety Highlight */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-2xl">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">2.5M+ LTI Free Hours</h2>
                <p className="text-primary-foreground/80">Exemplary safety record maintained across all project sites.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-400" />
              <span className="font-mono font-medium tracking-tighter">ISO 45001 COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* International Certifications Slider */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">International Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recognized by global standard bodies for quality and technical proficiency
            </p>
          </div>
          
          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
              onClick={() => scrollToSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
              onClick={() => scrollToSlide(Math.min(certifications.length - 1, currentSlide + 1))}
              disabled={currentSlide >= certifications.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            {/* Draggable Slider with Auto-scroll */}
            <div className="overflow-hidden">
              <div 
                ref={sliderRef}
                className="flex gap-6 cursor-grab active:cursor-grabbing overflow-x-auto scrollbar-hide"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {certifications.map((cert, index) => (
                  <Card key={index} className="flex-shrink-0 w-80 h-64 hover:shadow-lg transition-all group border-border/50 hover:border-primary/50 select-none flex flex-col">
                    <div className="p-6 pb-0 flex-1">
                      <div className="flex items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary transition-colors flex-shrink-0">
                          <cert.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-base leading-tight mb-1 break-words">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground break-words">{cert.issuer}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 break-words">{cert.description}</p>
                    </div>
                    {/* Fixed bottom section */}
                    <div className="px-6 py-4 bg-muted/20 border-t border-border/30 mt-auto">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-primary font-medium">{cert.date}</span>
                        <Badge variant="secondary">{cert.category}</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => scrollToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Licenses & Regulatory */}
      <section className="py-24 bg-accent/30">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={springPresets.gentle}
            >
              <h2 className="text-3xl font-bold mb-6">Regulatory Licenses</h2>
              <p className="text-muted-foreground mb-8">
                RWNA Engineering holds the necessary professional licenses and registrations 
                from regulatory authorities including DOSH and PETRONAS for our specialized services.
              </p>
              <div className="space-y-4">
                {licenses.map((license, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{license.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{license.scope}</p>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-muted-foreground">{license.body}</span>
                        <span className="text-primary">{license.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={springPresets.gentle}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.MACHINING_4} 
                  alt="Quality Control"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-8 -left-8 p-8 bg-background border border-border rounded-2xl shadow-xl max-w-xs hidden md:block">
                <p className="text-sm font-medium mb-2">Audit Standard</p>
                <p className="text-xs text-muted-foreground">
                  Our internal audits exceed ISO requirements to ensure mission-critical reliability in the field.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards & History Timeline */}
      <section className="py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Notable Achievements</h2>
            <p className="text-muted-foreground">A history of innovation and safety leadership since 2001. (Showing all 31 awards)</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {sortedYears.map((year, yearIdx) => {
              const yearAchievements = groupedAchievements[year];
              const isExpanded = expandedYears.has(year);
              
              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: yearIdx * 0.1 }}
                  className="border border-border/50 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm"
                >
                  {/* Year Header - Clickable */}
                  <button
                    onClick={() => toggleYear(year)}
                    className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold font-mono text-primary">{year}</h3>
                        <p className="text-sm text-muted-foreground">
                          {yearAchievements.length} award{yearAchievements.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Expandable Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/50"
                    >
                      <div className="p-6 relative">
                        {/* Tree structure with connecting lines */}
                        <div className="relative">
                          {/* Main vertical line */}
                          <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
                          
                          {yearAchievements.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`relative flex items-start gap-4 py-4 pl-16 pr-4 hover:bg-muted/20 transition-colors ${
                                idx === yearAchievements.length - 1 ? '' : 'border-b border-border/20'
                              }`}
                            >
                              {/* Horizontal connecting line */}
                              <div className="absolute left-6 top-1/2 w-8 h-px bg-border"></div>
                              
                              {/* Simple dot at the end of the line */}
                              <div className="absolute left-12 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
                              
                              {/* Award content */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground mb-1 leading-tight">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </motion.div>
                          ))}
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
      <section className="py-24 border-t border-border">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto p-12 bg-accent/50 rounded-[2rem] border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="w-32 h-32" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Verified Safety & Quality</h2>
            <p className="text-muted-foreground mb-8">
              Need verification of our certifications for your upcoming project? 
              Our compliance department can provide full documentation and audit records.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-8">
                Download Company Profile
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <Link to="/contact">
                  Contact Compliance Office
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
