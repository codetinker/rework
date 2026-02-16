import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Leaf, ShieldCheck, ChevronRight, Globe, Zap, Recycle, ChevronLeft } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const newsData = [
  {
    id: 1,
    date: '15 Jan 2026',
    title: 'Offshore Platform Maintenance - South China Sea',
    location: 'Offshore Malaysia'
  },
  {
    id: 2,
    date: '20 Nov 2025',
    title: 'Excellence in Safety Award 2025',
    location: 'Kuala Lumpur'
  },
  {
    id: 3,
    date: '05 Sep 2025',
    title: 'Innovation & Production Centre Opening',
    location: 'Gebeng, Kuantan'
  },
  {
    id: 4,
    date: '12 Jul 2025',
    title: 'Industrial Training Program Intake',
    location: 'Multiple Locations'
  },
  {
    id: 5,
    date: '28 May 2025',
    title: 'ISO 45001:2018 Certification Renewal',
    location: 'Head Office'
  },
  {
    id: 6,
    date: '15 Mar 2025',
    title: 'Subsea Pipeline Cutting Project Completion',
    location: 'Sarawak Waters'
  },
  {
    id: 7,
    date: '08 Feb 2025',
    title: 'W3P Enclosure System SIRIM Certification',
    location: 'Shah Alam'
  },
  {
    id: 8,
    date: '22 Dec 2024',
    title: 'Annual Safety Excellence Achievement',
    location: 'All Locations'
  }
];

const scheduleWasteList = [
  'SW410 - Contaminated gloves and cotton rags',
  'SW418 - Discarded paint & thinner',
  'SW104 - Blasting garnet',
  'SW409 - Paint and Thinner Containers',
  'SW104 - Sand used in cutting steel plate',
  'SW306 - Spent Hydraulic Oil',
  'SW305 - Spent Lubricating Oil'
];



const commitments = [
  {
    icon: <Recycle className="w-6 h-6" />,
    title: 'Recycling',
    description: 'We have installed 2 sets of recycling bins at the premise, which consists of bins for glass, plastic, paper and cans. All staff are encourage to recycle and minimize waste.'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'E-Printing',
    description: 'E-RWNA system produce electronically printed reports, forms, master list and other work documents. We work towards in keeping softcopy records and minimize hardcopy records.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Scheduled Waste Management',
    description: 'Scheduled waste produced by our operation is managed according to standard and approved procedures.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Air Pollution Control System',
    description: 'We install a dust collector system to ensure that dust collected from our blasting operation is filtered and isolated from the environment.'
  }
];

const contractorList = [
  {
    name: "Urban Environmental Industries Sdn Bhd",
    address: "Lot 4, Jalan Perindustrian Gebeng 1/5, Kaw. Perindustrian Gebeng, 26080 Kuantan, Pahang"
  },
  {
    name: "Kualiti Alam Sdn Bhd",
    address: "Ladang Tanah Merah A3, Division Bukit Pelanduk, Port Dickson, Negeri Sembilan"
  }
];

const NewsEvents: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerView = 3;
  const totalItems = newsData.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  // Update scroll position when currentIndex changes
  useEffect(() => {
    if (scrollRef.current) {
      const itemWidth = 320 + 24; // card width + gap
      scrollRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : maxIndex);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < maxIndex ? prev + 1 : 0);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.PROJECTS_5} 
            alt="News and Events Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={springPresets.gentle}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              News & <span className="text-primary">Events</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with our latest milestones, environmental commitments, and industry-leading compliance standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Latest News - Horizontal Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest News</h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>
          </div>

          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >


            {/* Scrollable Container */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {newsData.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-80 bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-bold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  {item.location && (
                    <p className="text-sm text-muted-foreground">
                      📍 {item.location}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index 
                      ? 'bg-primary scale-110' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Environment Commitment Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold uppercase tracking-tight">Environment Commitment</h2>
              </div>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                At RWNA Engineering, we believe that industrial progress must not come at the cost of environmental integrity. Our sustainability framework is integrated into every project stage—from engineering design to offshore execution.
              </p>
              
              <div className="space-y-6">
                {commitments.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-background border border-border rounded-lg shadow-sm">
                    <div className="text-primary mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={springPresets.smooth}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800" 
                alt="Environment Commitment" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Environment Compliance Section */}
      <section className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Environmental Compliance</h2>
            <p className="text-lg text-muted-foreground mb-12">
              RWNA Engineering operates in strict accordance with national and international environmental laws. Our compliance is validated through rigorous internal audits and third-party certifications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-muted/50 rounded-2xl border border-border">
                <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="font-bold mb-2">Air Quality</h4>
                <p className="text-sm text-muted-foreground">Air emission monitoring conducted on 3rd May 2018 shows that the concentration of air impurities emitted from Chimney 1 COMPLIED with the limit as specified in the Environmental Quality (Clean Air) Regulations 2014.</p>
              </div>
              <div className="p-8 bg-muted/50 rounded-2xl border border-border">
                <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="font-bold mb-2">Schedule Waste</h4>
                <p className="text-sm text-muted-foreground">Scheduled waste produced by our operation is managed according to standard and approved procedures with proper documentation and disposal through licensed contractors.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Schedule Waste & Contractors */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Schedule Waste List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Recycle className="w-6 h-6 text-primary" />
                List of Schedule Waste
              </h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="space-y-3">
                  {scheduleWasteList.map((waste, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground">{waste}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Environmental Budget</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Estimate Environmental Budget 2019:</strong> RM100,000.00</p>
                    <p><strong>Environmental Spend 2018:</strong> RM50,000.00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contractor List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
                List of Contractors
              </h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="space-y-3">
                  {contractorList.map((contractor, index) => (
                    <div key={index} className="p-4 rounded-lg hover:bg-muted/50 transition-colors border-l-2 border-primary/20">
                      <h4 className="font-semibold text-foreground mb-1">{contractor.name}</h4>
                      <p className="text-sm text-muted-foreground">{contractor.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default NewsEvents;