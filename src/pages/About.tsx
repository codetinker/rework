import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Printer, 
  ExternalLink, 
  Target, 
  Eye, 
  History,
  ShieldCheck,
  Award
} from "lucide-react";
import { IMAGES } from "@/assets/images";
import { offices, companyStats } from "@/data/index";
import { StatCard } from "@/components/Cards";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.HERO_BG_2} 
            alt="RWNA Engineering Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Driven by <span className="text-primary">Precision</span>,
              <br />
              Built on Trust.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Established in 2001, RWNA Engineering has evolved from a local pipeline contractor 
              to a premier regional provider of integrated oil & gas engineering solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company History & Philosophy */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl"
            >
              <img 
                src={IMAGES.HERO_BG_10 || IMAGES.HERO_BG_3}
                alt="Innovation Center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <History className="w-4 h-4" />
                Our Legacy
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                Over Two Decades of Engineering Excellence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                RWNA Engineering Sdn. Bhd. started its journey in 2001, focusing on sacrificial anode installation 
                for subsea pipelines. Through unwavering commitment to quality and safety, we expanded our 
                capabilities to include precision on-site machining, subsea cutting, and our signature 
                W3P Enclosure Systems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, operating from our Innovation & Production Centre (IPC) in Gebeng, we serve major 
                international energy companies, providing critical maintenance and construction support 
                both onshore and offshore across Southeast Asia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card p-12 rounded-3xl border border-border shadow-sm h-full flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <div className="flex-grow">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  To implement the best technical, operational and HSE practices in delivering services to our clients. 
                  We always strive to meet our clients' requirements as well as specifications at competitive prices.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  To continuously upgrade and leverage on the company's technical, operational, human resource, 
                  facilities, equipment, financial and management capabilities to meet future challenges and exceed expectations.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To create a sustainable operation as a reliable oil and gas service provider.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card p-12 rounded-3xl border border-border shadow-sm h-full flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8">
                <Eye className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <div className="flex-grow">
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  To Be a Respectable, Reliable and Credible Service Provider in the Oil and Gas Industry 
                  and Achieve Sustainable Growth Without Compromising HSE and Quality.
                </p>
                <p className="text-base text-muted-foreground mb-4">To support our vision, we are inspired by these beliefs:</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-primary mb-1">People</h4>
                    <p className="text-sm text-muted-foreground">We grow our staff's capabilities, creating a great working place and inspiring them to be the best they can be.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Portfolio</h4>
                    <p className="text-sm text-muted-foreground">We create a portfolio of oil and gas services by anticipating and satisfying our clients' needs.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Performance</h4>
                    <p className="text-sm text-muted-foreground">We go the extra mile to deliver and complete projects for our valued clients.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Competency</h4>
                    <p className="text-sm text-muted-foreground">We consistently strive to deliver cost effective, on time and comprehensive solutions utilizing the latest technology.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Innovation & Production Centre */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <ShieldCheck className="w-4 h-4" />
                Innovation Hub
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                Innovation & Production Centre (IPC)
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our state-of-the-art Innovation & Production Centre in Gebeng serves as the heart of our 
                manufacturing capabilities. Equipped with advanced CNC machinery and precision tools, 
                the IPC enables us to deliver custom engineering solutions with unmatched accuracy.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">Advanced CNC turning and milling capabilities</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">Custom tool design and rapid prototyping</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">Material testing and quality assurance laboratory</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">Research & development for specialized oil & gas applications</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl"
            >
              <img 
                src={IMAGES.MACHINING_2 || IMAGES.MACHINING_1}
                alt="Innovation & Production Centre"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certified Quality & Safety */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl order-2 lg:order-1"
            >
              <img 
                src={IMAGES.WELDING_4 || IMAGES.WELDING_2}
                alt="Quality & Safety Certifications"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Award className="w-4 h-4" />
                Certifications
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                Certified Quality & Safety
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our commitment to excellence is validated through internationally recognized certifications 
                and rigorous compliance with industry standards, ensuring every project meets the highest 
                quality and safety requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-2xl border border-border h-full">
                  <h4 className="font-bold text-base mb-2">ISO 9001:2015</h4>
                  <p className="text-xs text-muted-foreground mb-2">Quality Management System</p>
                  <div className="text-xs text-primary">
                    <p>Body: BUREAU VERITAS</p>
                    <p>Date: 23/05/2008</p>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border h-full">
                  <h4 className="font-bold text-base mb-2">ISO 45001:2018</h4>
                  <p className="text-xs text-muted-foreground mb-2">Occupational Health & Safety Management</p>
                  <div className="text-xs text-primary">
                    <p>Body: BUREAU VERITAS</p>
                    <p>Date: 23/02/2019</p>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border h-full">
                  <h4 className="font-bold text-base mb-2">OHSAS 18001:2007</h4>
                  <p className="text-xs text-muted-foreground mb-2">Occupational Health & Safety Assessment Series</p>
                  <div className="text-xs text-primary">
                    <p>Body: BUREAU VERITAS</p>
                    <p>Date: 15/03/2016</p>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border h-full">
                  <h4 className="font-bold text-base mb-2">ASME U, U2 & S</h4>
                  <p className="text-xs text-muted-foreground mb-2">Pressure Vessel & Boiler Code Certification</p>
                  <div className="text-xs text-primary">
                    <p>Body: ASME</p>
                    <p>Date: 26/09/2014</p>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border h-full">
                  <h4 className="font-bold text-base mb-2">National Board U, U2 & S</h4>
                  <p className="text-xs text-muted-foreground mb-2">National Board Inspection Code Authorization</p>
                  <div className="text-xs text-primary">
                    <p>Body: NATIONAL BOARD</p>
                    <p>Date: 06/01/2015</p>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border h-full">
                  <h4 className="font-bold text-base mb-2">National Board R</h4>
                  <p className="text-xs text-muted-foreground mb-2">Repair Authorization for Pressure Equipment</p>
                  <div className="text-xs text-primary">
                    <p>Body: NATIONAL BOARD</p>
                    <p>Date: 26/09/2014</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-sidebar">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-2xl font-bold text-sidebar-foreground">Safety First</h4>
              <p className="text-sidebar-foreground/70">
                Uncompromising adherence to HSE standards to ensure zero accidents and a safe working environment.
              </p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-2xl font-bold text-sidebar-foreground">Quality Excellence</h4>
              <p className="text-sidebar-foreground/70">
                Precision engineering backed by ISO certifications and rigorous quality control processes.
              </p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-2xl font-bold text-sidebar-foreground">Reliable Partners</h4>
              <p className="text-sidebar-foreground/70">
                Building long-term relationships through integrity, transparency, and consistent performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
