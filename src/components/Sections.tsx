import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Award, 
  Shield, 
  Briefcase, 
  GraduationCap, 
  MapPin,
  Phone,
  Mail,
  Maximize2,
  ShieldCheck,
  Eye,
  Building2,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS, Policy, Project } from "@/lib/index";
import { 
  services, 
  policies, 
  projects, 
  clients, 
  companyStats 
} from "@/data/index";
import { 
  ServiceCard, 
  PolicyCard, 
  ProjectCard, 
  ClientCard, 
  StatCard 
} from "@/components/Cards";
import { IMAGES } from "@/assets/images";
import { Button } from "@/components/ui/button";
// Removed unused Carousel and Dialog imports
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";

// Certification/Achievement data for the slider
const certificationSlides = [
  {
    id: 1,
    image: IMAGES.REFINERY_COMPLEX_1,
    title: "ISO 45001",
    subtitle: "Safety Certified",
    icon: Shield,
    description: "Occupational Health and Safety Management Systems certification"
  },
  {
    id: 2,
    image: IMAGES.OIL_RIG_INDUSTRIAL_1,
    title: "ISO 9001",
    subtitle: "Quality Management",
    icon: Award,
    description: "Quality Management Systems certification for consistent excellence"
  },
  {
    id: 3,
    image: IMAGES.STEEL_PIPES_5,
    title: "ISO 14001",
    subtitle: "Environmental Certified",
    icon: Briefcase,
    description: "Environmental Management Systems certification for sustainable operations"
  },
  {
    id: 4,
    image: IMAGES.REFINERY_COMPLEX_2,
    title: "PETRONAS Approved",
    subtitle: "Vendor Status",
    icon: ShieldCheck,
    description: "Approved vendor status with PETRONAS for specialized services"
  },
  {
    id: 5,
    image: IMAGES.OIL_RIG_INDUSTRIAL_2,
    title: "2.5M+ Hours",
    subtitle: "LTI Free Record",
    icon: Award,
    description: "Over 2.5 million Lost Time Injury free hours achieved"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCertDragging, setIsCertDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [certStartX, setCertStartX] = useState(0);
  const [certCurrentX, setCertCurrentX] = useState(0);
  const slides = [
    {
      image: IMAGES.REFINERY_COMPLEX_1,
      title: "Engineering Excellence Since 2001",
      subtitle: "Pioneering subsea cutting and on-site machining solutions for the global energy sector."
    },
    {
      image: IMAGES.OIL_RIG_INDUSTRIAL_1,
      title: "Safety is Our Core Value",
      subtitle: "Over 2.5 Million LTI free hours achieved through rigorous HSE standards and innovation."
    },
    {
      image: IMAGES.STEEL_PIPES_5,
      title: "Innovation & Production Centre",
      subtitle: "State-of-the-art IPC facility in Gebeng providing high-precision CNC machining services."
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  useEffect(() => {
    if (!isDragging) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [slides.length, isDragging]);

  // Auto-advance certification slider (pause when dragging)
  useEffect(() => {
    if (!isCertDragging) {
      const certTimer = setInterval(() => {
        setCurrentCertSlide((prev) => (prev + 1) % certificationSlides.length);
      }, 4000); // Change every 4 seconds
      return () => clearInterval(certTimer);
    }
  }, [isCertDragging]);

  // Certification slider swipe handlers
  const handleCertMouseDown = (e: React.MouseEvent) => {
    setIsCertDragging(true);
    setCertStartX(e.clientX);
  };

  const handleCertMouseMove = (e: React.MouseEvent) => {
    if (!isCertDragging) return;
    setCertCurrentX(e.clientX);
  };

  const handleCertMouseUp = () => {
    if (!isCertDragging) return;
    setIsCertDragging(false);
    
    const diff = certStartX - certCurrentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        setCurrentCertSlide((prev) => (prev + 1) % certificationSlides.length);
      } else {
        // Swipe right - previous slide
        setCurrentCertSlide((prev) => (prev - 1 + certificationSlides.length) % certificationSlides.length);
      }
    }
  };

  const handleCertTouchStart = (e: React.TouchEvent) => {
    setIsCertDragging(true);
    setCertStartX(e.touches[0].clientX);
  };

  const handleCertTouchMove = (e: React.TouchEvent) => {
    if (!isCertDragging) return;
    setCertCurrentX(e.touches[0].clientX);
  };

  const handleCertTouchEnd = () => {
    if (!isCertDragging) return;
    setIsCertDragging(false);
    
    const diff = certStartX - certCurrentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        setCurrentCertSlide((prev) => (prev + 1) % certificationSlides.length);
      } else {
        // Swipe right - previous slide
        setCurrentCertSlide((prev) => (prev - 1 + certificationSlides.length) % certificationSlides.length);
      }
    }
  };

  return (
    <section className="relative">
      {/* Full-width Hero with Split Layout */}
      <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                  <span className="text-sm font-mono font-semibold text-primary uppercase tracking-wider">
                    Malaysia's Premier Oil & Gas Contractor
                  </span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-[0.9] tracking-tight">
                  Engineering
                  <span className="block text-primary">Excellence</span>
                  <span className="block text-4xl lg:text-5xl font-bold text-muted-foreground mt-2">
                    Since 2001
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  Pioneering subsea cutting, on-site machining, and specialized engineering solutions 
                  for the world's leading energy corporations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="px-8 py-4 text-lg font-semibold">
                  <Link to={ROUTE_PATHS.SERVICES}>Our Capabilities</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="px-8 py-4 text-lg font-semibold">
                  <Link to={ROUTE_PATHS.CONTACT}>Request Consultation</Link>
                </Button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-3xl font-black text-primary">2.5M+</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">LTI Free Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-primary">23+</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-primary">50+</div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Major Projects</div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual - Certification Slider */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                className={`relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl select-none transition-transform duration-200 ${
                  isCertDragging ? 'cursor-grabbing scale-[0.98]' : 'cursor-grab hover:scale-[1.02]'
                }`}
                onMouseDown={handleCertMouseDown}
                onMouseMove={handleCertMouseMove}
                onMouseUp={handleCertMouseUp}
                onMouseLeave={handleCertMouseUp}
                onTouchStart={handleCertTouchStart}
                onTouchMove={handleCertTouchMove}
                onTouchEnd={handleCertTouchEnd}
              >
                {/* Background Image with Animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCertSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={certificationSlides[currentCertSlide].image}
                      alt={certificationSlides[currentCertSlide].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>
                
                {/* Floating Certification Card with Animation */}
                <div className="absolute bottom-6 left-6 right-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`card-${currentCertSlide}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-black text-primary">
                            {certificationSlides[currentCertSlide].title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {certificationSlides[currentCertSlide].subtitle}
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          {React.createElement(certificationSlides[currentCertSlide].icon, {
                            className: "w-6 h-6 text-primary"
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                
                {/* Swipe Indicator - appears briefly on first load */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 3, duration: 1 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-xs font-medium">Swipe</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </motion.div>
              </div>
              
              {/* Navigation Dots - Below the card */}
              <div className="flex justify-center mt-6 space-x-3">
                {certificationSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCertSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCertSlide
                        ? 'bg-primary scale-125 shadow-lg'
                        : 'bg-primary/30 hover:bg-primary/60'
                    }`}
                    aria-label={`Go to certification ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanySection() {
  return (
    <section id="company" className="py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-mono font-semibold text-primary uppercase tracking-wider">
              About RWNA Engineering
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            Trusted by Industry
            <span className="block text-primary">Leaders Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Over two decades of engineering excellence in Malaysia's oil & gas sector
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Company Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Established in 2001, RWNA Engineering Sdn. Bhd. has evolved from a specialized subsea anode installation contractor into Malaysia's premier oil & gas engineering powerhouse. Our journey represents a commitment to continuous innovation, operational excellence, and unwavering safety standards.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                Today, we deliver mission-critical subsea cutting, high-precision on-site machining, and specialized engineering solutions to the world's leading energy corporations including PETRONAS, Shell, ExxonMobil, and other industry giants.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8 py-3">
                <Link to={ROUTE_PATHS.ABOUT}>Our Complete Story</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-3">
                <Link to={ROUTE_PATHS.SERVICES}>View Capabilities</Link>
              </Button>
            </div>
          </motion.div>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Safety Excellence</h3>
              <p className="text-muted-foreground mb-4">2.5+ Million LTI free hours achieved through rigorous HSE standards</p>
              <div className="text-2xl font-black text-primary">ISO 45001</div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Industry Recognition</h3>
              <p className="text-muted-foreground mb-4">Multiple awards for operational excellence and safety performance</p>
              <div className="text-2xl font-black text-primary">23+ Years</div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {companyStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-black text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [isServiceDragging, setIsServiceDragging] = useState(false);
  const [serviceStartX, setServiceStartX] = useState(0);
  const [serviceCurrentX, setServiceCurrentX] = useState(0);

  const servicesData = [
    {
      title: "On-site Machining",
      description: "Comprehensive machining services delivered directly to your location, eliminating downtime and transportation costs."
    },
    {
      title: "Subsea Cutting",
      description: "Advanced underwater cutting solutions for pipeline maintenance, decommissioning, and emergency repairs."
    },
    {
      title: "W3P Enclosure System",
      description: "SIRIM QAS certified safety enclosure for hot work, primarily welding, designed to protect and pressurize."
    },
    {
      title: "Precision Machining",
      description: "State-of-the-art CNC machinery and precision manufacturing capabilities for complex engineering components."
    },
    {
      title: "Anode Installation",
      description: "Sacrificial anode installation and specialized coating services for pipeline protection since 2001."
    },
    {
      title: "Fabrication & Maintenance",
      description: "Comprehensive fabrication, installation, and maintenance services for piping, structures, and equipment."
    },
    {
      title: "Pressure Vessels",
      description: "ASME certified manufacturing, assembly, repair and alteration services for power boilers and pressure vessels."
    }
  ];

  // Auto-advance services every 4 seconds with infinite scroll
  useEffect(() => {
    if (!isServiceDragging) {
      const interval = setInterval(() => {
        setCurrentServiceSlide((prev) => {
          const next = prev + 1;
          // Reset to beginning when reaching the end for seamless loop
          return next >= servicesData.length ? 0 : next;
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isServiceDragging, servicesData.length]);

  // Mouse handlers for services
  const handleServiceMouseDown = (e: React.MouseEvent) => {
    setIsServiceDragging(true);
    setServiceStartX(e.clientX);
    setServiceCurrentX(e.clientX);
  };

  const handleServiceMouseMove = (e: React.MouseEvent) => {
    if (!isServiceDragging) return;
    setServiceCurrentX(e.clientX);
  };

  const handleServiceMouseUp = () => {
    if (!isServiceDragging) return;
    
    const diff = serviceCurrentX - serviceStartX;
    const threshold = 50;
    
    if (diff > threshold) {
      // Swipe right - go to previous
      setCurrentServiceSlide((prev) => prev === 0 ? servicesData.length - 1 : prev - 1);
    } else if (diff < -threshold) {
      // Swipe left - go to next
      setCurrentServiceSlide((prev) => prev === servicesData.length - 1 ? 0 : prev + 1);
    }
    
    setIsServiceDragging(false);
  };

  // Touch handlers for services
  const handleServiceTouchStart = (e: React.TouchEvent) => {
    setIsServiceDragging(true);
    setServiceStartX(e.touches[0].clientX);
    setServiceCurrentX(e.touches[0].clientX);
  };

  const handleServiceTouchMove = (e: React.TouchEvent) => {
    if (!isServiceDragging) return;
    setServiceCurrentX(e.touches[0].clientX);
  };

  const handleServiceTouchEnd = () => {
    if (!isServiceDragging) return;
    
    const diff = serviceCurrentX - serviceStartX;
    const threshold = 50;
    
    if (diff > threshold) {
      // Swipe right - go to previous
      setCurrentServiceSlide((prev) => prev === 0 ? servicesData.length - 1 : prev - 1);
    } else if (diff < -threshold) {
      // Swipe left - go to next
      setCurrentServiceSlide((prev) => prev === servicesData.length - 1 ? 0 : prev + 1);
    }
    
    setIsServiceDragging(false);
  };

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">EXPERTISE</h2>
          <h3 className="text-4xl font-bold mb-6">Core Engineering Services</h3>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We provide specialized on-site machining and subsea solutions that meet the highest technical standards of the oil & gas industry.
          </p>
        </div>

        {/* Services Slider */}
        <div className="relative w-full mb-8">
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleServiceMouseDown}
            onMouseMove={handleServiceMouseMove}
            onMouseUp={handleServiceMouseUp}
            onMouseLeave={handleServiceMouseUp}
            onTouchStart={handleServiceTouchStart}
            onTouchMove={handleServiceTouchMove}
            onTouchEnd={handleServiceTouchEnd}
            style={{
              cursor: isServiceDragging ? 'grabbing' : 'grab'
            }}
          >
            <motion.div 
              className="flex gap-6 pl-4 md:pl-8"
              animate={{
                x: `calc(-${currentServiceSlide * 320}px - ${currentServiceSlide * 24}px)`,
                scale: isServiceDragging ? 0.98 : 1
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Duplicate cards for seamless infinite scroll */}
              {[...servicesData, ...servicesData.slice(0, 3)].map((service, index) => (
                <motion.div
                  key={`service-${index}`}
                  className="flex-shrink-0 w-80 bg-background rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -2 }}
                >
                  <h4 className="text-xl font-bold text-foreground mb-3">{service.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Swipe Indicator */}
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full backdrop-blur-sm"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Swipe to explore
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mb-8">
          {servicesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentServiceSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentServiceSlide
                  ? 'bg-primary'
                  : 'bg-primary/30 hover:bg-primary/60'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to={ROUTE_PATHS.SERVICES}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Explore Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PoliciesSection() {
  const policyList = [
    "Occupational Health & Safety Policy",
    "Quality Policy", 
    "Drug & Alcohol Policy",
    "Stop Work Policy",
    "Human Right Policy",
    "Light Duty Management and Return to Work Policy",
    "ESG Policy",
    "Anti Bribery Policy",
    "Environmental Policy"
  ];

  return (
    <section id="policies" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">COMMITMENT</h2>
          <h3 className="text-4xl font-bold mb-6">Corporate Policies</h3>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Our operational integrity is built on a foundation of strict adherence to international safety and quality standards. 
            We maintain comprehensive policies that ensure the highest levels of safety, quality, and ethical conduct across all our operations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 mb-12">
            {policyList.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-foreground font-medium">{policy}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={ROUTE_PATHS.POLICIES}>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              >
                <Eye className="w-5 h-5 mr-2" />
                Read Policies Here
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const authenticProjectsData = [
  {
    title: "COLD CUTTING 72\" OD PIPE",
    client: "",
    location: "RWNA Fabrication Yard",
    photo: "/images/project-reference/project01.jpg",
    description: "Large diameter pipe cold cutting operations at our fabrication facility."
  },
  {
    title: "CUTTING & \"J\" BEVEL OF 62\" OD E-18-02A/B/C BFW PREHEATED",
    client: "Tapat Teknik Sdn Bhd, Petronas Fertilizer Kedah, MALAYSIA",
    location: "Tepat Teknik Klang, Selangor, MALAYSIA",
    photo: "/images/project-reference/project02.jpg",
    description: "Precision cutting and bevelling operations for large diameter preheated pipes."
  },
  {
    title: "GWF-1 CUTTING OF 16\" [CRA] OD PIPE",
    client: "Bredero Shaw (M) Sdn Bhd / Woodside Energy Limited",
    location: "RWNA Fabrication Yard",
    photo: "/images/project-reference/project03.jpg",
    description: "Specialized cutting operations for Corrosion Resistant Alloy (CRA) pipes."
  },
  {
    title: "YAMAL EUROPIPE GAS CUTTING & \"J\" BEVEL OF 56\" OD PIPE",
    client: "Bredero Shaw (M) Sdn Bhd / Nippon Steel Japan",
    location: "",
    photo: "/images/project-reference/project04.jpg",
    description: "Large diameter pipe cutting and bevelling for international gas pipeline project."
  },
  {
    title: "WHEATSTONE UPSTREAM EXTERNAL PIPE END MACHINING OF 24\" OD PIPE",
    client: "Bredero Shaw (M) Sdn Bhd / CHEVRON AUSTRALIA PTL LTD",
    location: "Bredero Shaw Kuantan, MALAYSIA",
    photo: "/images/project-reference/project05.jpg",
    description: "External pipe end machining for upstream operations in major Australian gas project."
  },
  {
    title: "GON UPSTREAM INTERNAL BORING OF 7.626\" & 9.626\" OD PIPE",
    client: "COATINGS (M) SDN BHD / CHEVRON AUSTRALIA PTY LTD",
    location: "",
    photo: "/images/project-reference/project06.jpg",
    description: "Internal boring operations for upstream pipeline infrastructure."
  },
  {
    title: "GUMUSUT KAKAP CUTBACK CONFIGURATION (SHAVING)",
    client: "SERIMAX WELDING SERVICES (M) SDN BHD / SAPURA KENCANA-SAPURA ACERGY / SABAH SHELL PETROLEUM COMPANY",
    location: "Serimax Yard Pelabuhan Kuantan, MALAYSIA",
    photo: "/images/project-reference/project07.jpg",
    description: "Specialized cutback configuration and shaving operations for subsea pipeline project."
  },
  {
    title: "FLANGE RESURFACE PEDESTAL CRANE COLUMN OF 110\" FOR BARGE H131 & H132",
    client: "SRIMULTEX ENGINEERING / BOUSTEAD NAVAL SHIPYARD / PACIFIC SINGAPORE",
    location: "Boustead Shipyard Pulau Jerejak, Penang, MALAYSIA",
    photo: "/images/project-reference/project08.jpg",
    description: "Large scale flange resurfacing operations for marine crane pedestals."
  },
  {
    title: "W3P Enclosure System (Habitat for Welding)",
    client: "Tanjung Offshore Services Sdn. Bhd.",
    location: "Dulang Platform",
    photo: "/images/project-reference/project09.jpg",
    description: "SIRIM certified welding habitat system for safe hot work in hazardous environments."
  },
  {
    title: "SUBSEA CONCRETE COATED LINEPIPE CUTTING AT BEKOK C",
    client: "GOM / Petronas Carigali Sdn Bhd",
    location: "",
    photo: "/images/project-reference/project10.jpg",
    description: "Subsea pipeline cutting operations for concrete coated linepipes."
  },
  {
    title: "FABRICATION & MAINTENANCE (ONSHORE & OFFSHORE)",
    client: "",
    location: "",
    photo: "/images/project-reference/project11.jpg",
    description: "Comprehensive fabrication and maintenance services for onshore and offshore facilities."
  },
  {
    title: "ONSITE VALVE GRINDING & LAPPING FOR 10\" X 2500# GATE VALVE",
    client: "YTL Power Station",
    location: "",
    photo: "/images/project-reference/project13.jpg",
    description: "Precision onsite valve grinding and lapping services for high-pressure gate valves."
  },
  {
    title: "ONSITE VALVE GRINDING AND LAPPING SERVICES FOR VARIOUS SIZE OF VALVE FOR CUFK TA 2017",
    client: "Enproserve (M) Sdn. Bhd.",
    location: "",
    photo: "/images/project-reference/project12.jpg",
    description: "Comprehensive valve grinding and lapping services for turnaround activities."
  },
  {
    title: "ONSITE VALVE GRINDING AND LAPPING SERVICES FOR 24\" X 150# GATE VALVE",
    client: "Tati Production Sdn. Bhd.",
    location: "",
    photo: "/images/project-reference/project14.jpg",
    description: "Large diameter valve grinding and lapping services for production facilities."
  },
  {
    title: "ONSITE VALVE GRINDING AND LAPPING SERVICES FOR VARIOUS SIZE OF VALVE FOR PCASB TA 2017",
    client: "Enproserve (M) Sdn. Bhd.",
    location: "",
    photo: "/images/project-reference/project15.jpg",
    description: "Multi-size valve grinding and lapping services for scheduled turnaround operations."
  }
];

export function ProjectsSection() {
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
  const [isProjectDragging, setIsProjectDragging] = useState(false);
  const [projectStartX, setProjectStartX] = useState(0);
  const [projectCurrentX, setProjectCurrentX] = useState(0);

  const projectsData = authenticProjectsData;

  // Auto-advance projects every 5 seconds, pause when dragging
  useEffect(() => {
    if (isProjectDragging) return;
    
    const interval = setInterval(() => {
      setCurrentProjectSlide((prev) => {
        const next = prev + 1;
        return next >= projectsData.length ? 0 : next;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isProjectDragging, projectsData.length]);

  // Mouse handlers for projects
  const handleProjectMouseDown = (e: React.MouseEvent) => {
    setIsProjectDragging(true);
    setProjectStartX(e.clientX);
    setProjectCurrentX(e.clientX);
  };

  const handleProjectMouseMove = (e: React.MouseEvent) => {
    if (!isProjectDragging) return;
    setProjectCurrentX(e.clientX);
  };

  const handleProjectMouseUp = () => {
    if (!isProjectDragging) return;
    
    const diff = projectCurrentX - projectStartX;
    const threshold = 50;
    
    if (diff > threshold) {
      // Swipe right - go to previous
      setCurrentProjectSlide((prev) => prev === 0 ? projectsData.length - 1 : prev - 1);
    } else if (diff < -threshold) {
      // Swipe left - go to next
      setCurrentProjectSlide((prev) => prev === projectsData.length - 1 ? 0 : prev + 1);
    }
    
    setIsProjectDragging(false);
  };

  // Touch handlers for projects
  const handleProjectTouchStart = (e: React.TouchEvent) => {
    setIsProjectDragging(true);
    setProjectStartX(e.touches[0].clientX);
    setProjectCurrentX(e.touches[0].clientX);
  };

  const handleProjectTouchMove = (e: React.TouchEvent) => {
    if (!isProjectDragging) return;
    setProjectCurrentX(e.touches[0].clientX);
  };

  const handleProjectTouchEnd = () => {
    if (!isProjectDragging) return;
    
    const diff = projectCurrentX - projectStartX;
    const threshold = 50;
    
    if (diff > threshold) {
      // Swipe right - go to previous
      setCurrentProjectSlide((prev) => prev === 0 ? projectsData.length - 1 : prev - 1);
    } else if (diff < -threshold) {
      // Swipe left - go to next
      setCurrentProjectSlide((prev) => prev === projectsData.length - 1 ? 0 : prev + 1);
    }
    
    setIsProjectDragging(false);
  };

  // Navigation functions removed - using swipe only

  return (
    <section id="projects" className="py-24 bg-sidebar overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Portfolio</h2>
            <h3 className="text-4xl font-bold text-white">Project Showcase</h3>
            <p className="text-sidebar-foreground/70 mt-4 max-w-xl">
              Explore our track record of delivering complex engineering projects for major offshore and onshore facilities.
            </p>
          </div>
          
          {/* Project Counter */}
          <div className="text-sidebar-foreground/60 font-mono text-sm">
            {String(currentProjectSlide + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
          </div>
        </div>

        {/* Project Slider */}
        <div className="relative mb-12">

          {/* Project Display */}
          <div 
            className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleProjectMouseDown}
            onMouseMove={handleProjectMouseMove}
            onMouseUp={handleProjectMouseUp}
            onMouseLeave={handleProjectMouseUp}
            onTouchStart={handleProjectTouchStart}
            onTouchMove={handleProjectTouchMove}
            onTouchEnd={handleProjectTouchEnd}
            style={{
              cursor: isProjectDragging ? 'grabbing' : 'grab'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProjectSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: isProjectDragging ? 0.98 : 1
                }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <img
                  src={projectsData[currentProjectSlide].photo}
                  alt={projectsData[currentProjectSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Project Info Overlay */}
                <div className="absolute inset-0 p-4 md:p-8 lg:p-12 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl"
                  >
                    <h4 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
                      {projectsData[currentProjectSlide].title}
                    </h4>
                    <p className="text-white/80 text-sm md:text-lg mb-3 md:mb-4 leading-relaxed">
                      {projectsData[currentProjectSlide].description}
                    </p>
                    
                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                      {projectsData[currentProjectSlide].location && (
                        <div className="flex items-center text-white/70">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2 text-primary flex-shrink-0" />
                          <span className="text-xs md:text-sm">{projectsData[currentProjectSlide].location}</span>
                        </div>
                      )}
                      {projectsData[currentProjectSlide].client && (
                        <div className="flex items-center text-white/70">
                          <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-2 text-primary flex-shrink-0" />
                          <span className="text-xs md:text-sm">{projectsData[currentProjectSlide].client}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swipe Indicator */}
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Swipe to explore projects
          </motion.div>
        </div>



        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="w-full bg-white/20 rounded-full h-1">
            <motion.div 
              className="bg-primary h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentProjectSlide + 1) / projectsData.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Link 
            to={ROUTE_PATHS.PROJECTS}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-lg"
          >
            <Building2 className="w-5 h-5" />
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

const clientLogos = [
  { name: "Aker Solutions", logo: "/images/clients/aker-solutions.jpg" },
  { name: "Asturi Metal", logo: "/images/clients/asturi-metal.png" },
  { name: "BASF Petronas Chemicals", logo: "/images/clients/basf-petronas-chemicals.gif" },
  { name: "Bredero Shaw", logo: "/images/clients/bredero-shaw.gif" },
  { name: "Calidad", logo: "/images/clients/calidad.jpg" },
  { name: "Carimin", logo: "/images/clients/carimin.jpg" },
  { name: "Dayang", logo: "/images/clients/dayang.gif" },
  { name: "Duta Klasik", logo: "/images/clients/duta-klasik.jpg" },
  { name: "Edaran Fokus", logo: "/images/clients/edaran-fokus.jpg" },
  { name: "Epic", logo: "/images/clients/epic.png" },
  { name: "Ethelyene", logo: "/images/clients/ethelyene.jpg" },
  { name: "ExxonMobil", logo: "/images/clients/exxon-mobil.gif" },
  { name: "Fraser", logo: "/images/clients/fraser.jpg" },
  { name: "HSE Resources", logo: "/images/clients/hse-resources.png" },
  { name: "Kencana Petroleum", logo: "/images/clients/kencana-petroleum.jpg" },
  { name: "KNM", logo: "/images/clients/knm.jpg" },
  { name: "M3nergy", logo: "/images/clients/m3nergy.jpg" },
  { name: "MMC", logo: "/images/clients/mmc.jpg" },
  { name: "MSET", logo: "/images/clients/mset.png" },
  { name: "MTBE Malaysia", logo: "/images/clients/mtbe-malaysia.jpg" },
  { name: "Mushtari", logo: "/images/clients/mushtari.jpg" },
  { name: "Newwin", logo: "/images/clients/newwin.png" },
  { name: "Optimal", logo: "/images/clients/optimal.gif" },
  { name: "Petlin", logo: "/images/clients/petlin.png" },
  { name: "Petra Perdana", logo: "/images/clients/petra-perdana.gif" },
  { name: "Petronas Carigali", logo: "/images/clients/petronas-carigali.jpg" },
  { name: "Petronas Gas", logo: "/images/clients/petronas-gas.jpg" },
  { name: "Petronas Penapisan Melaka", logo: "/images/clients/petronas-penapisan-melaka.jpg" },
  { name: "Petronas Penapisan Terengganu", logo: "/images/clients/petronas-penapisan-terengganu.jpg" },
  { name: "PFCE", logo: "/images/clients/pfce.png" },
  { name: "Pioneer Engineering", logo: "/images/clients/pioneer-engineering.png" },
  { name: "Polyplastic", logo: "/images/clients/polyplastic.gif" },
  { name: "RMS Engineering", logo: "/images/clients/rms-engineering.gif" },
  { name: "Sapura Acergy", logo: "/images/clients/sapura-acergy.gif" },
  { name: "Sapuracrest Petroleum", logo: "/images/clients/sapuracrest-petroleum.jpg" },
  { name: "Shapadu", logo: "/images/clients/shapadu.gif" },
  { name: "Sime Darby Energy Utilities", logo: "/images/clients/sime-darby-energy-utilities.png" },
  { name: "Talisman Energy", logo: "/images/clients/talisman-energy.gif" },
  { name: "TL Offshore", logo: "/images/clients/tl-offshore.jpg" },
  { name: "TMM Engineering", logo: "/images/clients/tmm-engineering.jpg" },
  { name: "Warga Hikmat", logo: "/images/clients/warga-hikmat.jpg" },
  { name: "Wasco", logo: "/images/clients/wasco.jpg" }
];

export function ClientsSection() {
  return (
    <section id="clients" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Partners</h2>
          <h3 className="text-4xl font-bold">Trusted by Industry Leaders</h3>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-infinite-scroll py-8">
          {[...clientLogos, ...clientLogos].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="mx-8 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 bg-white rounded-lg p-4 shadow-sm"
            >
              <img 
                src={client.logo} 
                alt={client.name}
                className="h-12 w-auto object-contain max-w-[120px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Button asChild variant="default" size="lg" className="px-8 py-3">
          <Link to={ROUTE_PATHS.CLIENTS}>View Full Client List</Link>
        </Button>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export function RecognitionSection() {
  const licenses = [
    {
      title: "Registration As Unfired Pressure Vessel Fabricator",
      body: "DOSH",
      date: "18/06/2015",
      icon: ShieldCheck
    },
    {
      title: "Registration As Unfired Pressure Vessel And Steam Boiler Repairer",
      body: "DOSH",
      date: "21/06/2015",
      icon: ShieldCheck
    },
    {
      title: "Registration As Petroleum Contractor Company (Pipeline, Recticulation And Metering Station)",
      body: "DOSH",
      date: "22/11/2013",
      icon: ShieldCheck
    },
    {
      title: "License To Supply Equipment & Services To Carigali Companies And Oil & Gas Produces In Malaysia",
      body: "PETRONAS",
      date: "21/02/2002",
      icon: Award
    }
  ];

  return (
    <section id="recognition" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Accreditation</h2>
            <h3 className="text-4xl font-bold mb-8">Professional Licenses</h3>
            <p className="text-muted-foreground text-lg mb-8">
              RWNA holds essential professional licenses and registrations from regulatory bodies including DOSH and PETRONAS, ensuring full compliance with Malaysian oil & gas industry standards.
            </p>
            <Button asChild variant="default">
              <Link to={ROUTE_PATHS.RECOGNITION}>View All Certificates</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {licenses.map((license, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-background border border-border rounded-xl hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <license.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-sm leading-tight">{license.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium">{license.body}</span>
                      <span>{license.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CareerAndTrainingSection() {
  return (
    <section id="career-training" className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Career Section */}
          <div className="text-center">
            <Briefcase className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Build Your Future With Us</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join a team of elite engineers and technical specialists. We offer competitive benefits and opportunities to work on world-class energy projects.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to={ROUTE_PATHS.CAREER}>Explore Careers</Link>
            </Button>
          </div>

          {/* Industrial Training Section */}
          <div className="text-center">
            <GraduationCap className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Industrial Training Programs</h2>
            <p className="text-muted-foreground text-lg mb-8">
              We provide specialized training for students and professionals in on-site machining, subsea cutting, and high-precision CNC operations at our Innovation & Production Centre.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to={ROUTE_PATHS.INDUSTRIAL_TRAINING}>Training Programs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function QuoteSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
        <div>
          <h2 className="text-3xl font-bold mb-2">Ready to start your next project?</h2>
          <p className="text-primary-foreground/80">Contact our engineering team for a technical consultation and quote.</p>
        </div>
        <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
          <Link to={ROUTE_PATHS.CONTACT}>Request A Quote</Link>
        </Button>
      </div>
    </section>
  );
}

export function MapSection() {
  return (
    <section id="location" className="h-[500px] relative bg-muted">
      <div className="absolute inset-0 z-0">
        {/* Demo Interactive Map Placeholder */}
        <iframe
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15923.368393521633!2d103.3986!3d3.9745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTgnMjguMiJOIDEwM8KwMjMnNTUuMCJF!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy"
          className="w-full h-full border-0 grayscale invert opacity-80"
          loading="lazy"
        ></iframe>
      </div>
      <div className="absolute bottom-8 left-8 z-10 p-8 bg-background/95 backdrop-blur shadow-2xl rounded-2xl border border-border max-w-md hidden md:block">
        <h3 className="text-xl font-bold mb-4">Main Office</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
            <p className="text-sm text-muted-foreground">Lot 1/129, Kawasan Perindustrian Gebeng Fasa 2, 26080 Kuantan, Pahang, Malaysia</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">+(609) 5839 511/12/13/15</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">information@rwna.com.my</p>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-6" asChild>
          <a href="https://maps.google.com/?q=RWNA+Engineering+Gebeng" target="_blank" rel="noreferrer">
            Get Directions <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springPresets.gentle}
          >
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Company Overview</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              See Our <span className="text-primary">Engineering Excellence</span> in Action
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover how RWNA Engineering delivers world-class on-site machining, subsea cutting, 
              and safety solutions to the oil & gas industry. Watch our comprehensive company overview.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springPresets.gentle, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            {!isPlaying ? (
              // Video Thumbnail with Play Button
              <div className="relative w-full h-full group cursor-pointer" onClick={handlePlayVideo}>
                <img 
                  src={IMAGES.HERO_BG_1} 
                  alt="RWNA Engineering Company Video" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-primary transition-colors"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" />
                  </motion.div>
                </div>
                
                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-white text-xl md:text-2xl font-bold mb-2">
                    RWNA Engineering Company Overview
                  </h4>
                  <p className="text-white/80 text-sm md:text-base">
                    Watch our comprehensive video showcasing our engineering capabilities, 
                    advanced equipment, and successful project deliveries.
                  </p>
                </div>
              </div>
            ) : (
              // YouTube Embed
              <iframe
                src="https://www.youtube.com/embed/Q21JEFymvaA?autoplay=1&rel=0&modestbranding=1"
                title="RWNA Engineering Company Overview"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
          
          {/* Video Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springPresets.gentle, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50">
                <Building2 className="w-8 h-8 text-primary mx-auto mb-3" />
                <h5 className="font-semibold mb-2">Advanced Facilities</h5>
                <p className="text-sm text-muted-foreground">
                  State-of-the-art Innovation & Production Centre with cutting-edge equipment
                </p>
              </div>
              <div className="p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h5 className="font-semibold mb-2">Safety Excellence</h5>
                <p className="text-sm text-muted-foreground">
                  ISO certified safety management systems and specialized safety equipment
                </p>
              </div>
              <div className="p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50">
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <h5 className="font-semibold mb-2">Proven Track Record</h5>
                <p className="text-sm text-muted-foreground">
                  25+ years of engineering excellence serving major oil & gas companies
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
