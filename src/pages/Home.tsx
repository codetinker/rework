import {
  HeroSection,
  CompanySection,
  VideoSection,
  ServicesSection,
  PoliciesSection,
  ProjectsSection,
  ClientsSection,
  RecognitionSection,
  CareerAndTrainingSection,
  QuoteSection,
  MapSection,
} from "@/components/Sections";
import { ChatWidget } from "@/components/ChatWidget";
import { motion } from "framer-motion";

/**
 * Home Page
 * 
 * This page serves as the primary landing page for RWNA Engineering Sdn. Bhd.
 * It follows the specific flow requested:
 * a) Hero Slider
 * b) Company Overview
 * c) Services Brief
 * d) Policies Slider
 * e) Project Gallery
 * f) Client Logo Slider
 * g) Recognition/Certifications
 * h) Career Opportunities
 * i) Industrial Training
 * j) Request Quote CTA
 * k) Office Map
 */
export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col w-full"
    >
      {/* Hero section with image and text slider */}
      <HeroSection />

      {/* Brief company introduction with link to About Us */}
      <CompanySection />

      {/* Company overview video showcasing engineering capabilities */}
      <VideoSection />

      {/* Overview of engineering services */}
      <ServicesSection />

      {/* Policies displayed as a product card slider */}
      <PoliciesSection />

      {/* Project gallery with interactive image descriptions */}
      <ProjectsSection />

      {/* Continuous client logo slider */}
      <ClientsSection />

      {/* Brief about licenses, certifications, and awards */}
      <RecognitionSection />

      {/* Career and Industrial Training combined section */}
      <CareerAndTrainingSection />

      {/* Call to action for project quotes */}
      <QuoteSection />

      {/* Interactive map showing main office location */}
      <MapSection />

      {/* Floating live chat interface */}
      <ChatWidget />
    </motion.main>
  );
}
