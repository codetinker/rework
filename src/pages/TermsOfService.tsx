import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, Shield, Mail, Phone } from 'lucide-react';
import { springPresets, fadeInUp } from '@/lib/motion';

const TermsOfService: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These terms govern your use of RWNA Engineering's services and website. Please read them carefully.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: February 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-12"
            >
              {/* Acceptance of Terms */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>By accessing and using RWNA Engineering Sdn Bhd's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                  <p>These terms apply to all visitors, users, and others who access or use our services.</p>
                </div>
              </div>

              {/* Services Description */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Services Description</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>RWNA Engineering provides specialized oil and gas engineering services including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>On-site machining services (cold cutting, flange facing, pipe end prep)</li>
                    <li>Hydraulic bolt tensioning and torque wrench operations</li>
                    <li>Hot/cold tapping and W3P enclosure system services</li>
                    <li>Precision metal designing and machining</li>
                    <li>Industrial training programs</li>
                    <li>Engineering consultation and project management</li>
                  </ul>
                  <p>All services are provided in accordance with industry standards and applicable regulations.</p>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">User Responsibilities</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>When using our services, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete information</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Maintain the confidentiality of any login credentials</li>
                    <li>Not use our services for any unlawful or prohibited activities</li>
                    <li>Respect intellectual property rights</li>
                    <li>Follow safety protocols and procedures during service delivery</li>
                  </ul>
                </div>
              </div>

              {/* Service Terms and Conditions */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Service Terms and Conditions</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <h3 className="text-lg font-semibold text-foreground">Project Execution</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>All projects require written agreements specifying scope, timeline, and costs</li>
                    <li>Changes to project scope must be approved in writing</li>
                    <li>Client must provide safe working conditions and necessary access</li>
                    <li>RWNA reserves the right to suspend work if safety conditions are inadequate</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6">Payment Terms</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment terms are specified in individual service agreements</li>
                    <li>Late payments may incur additional charges</li>
                    <li>Disputed invoices must be raised within 30 days of receipt</li>
                  </ul>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Limitation of Liability</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>RWNA Engineering's liability is limited as follows:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Total liability shall not exceed the value of the specific service contract</li>
                    <li>We are not liable for indirect, consequential, or punitive damages</li>
                    <li>Force majeure events (natural disasters, government actions, etc.) excuse performance delays</li>
                    <li>Client assumes responsibility for providing accurate specifications and requirements</li>
                  </ul>
                  <p>Our comprehensive insurance coverage provides additional protection for all parties involved in our operations.</p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Intellectual Property</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of RWNA Engineering or its content suppliers and is protected by intellectual property laws.</p>
                  <p>You may not reproduce, distribute, or create derivative works from our content without explicit written permission.</p>
                </div>
              </div>

              {/* Termination */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Termination</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>Either party may terminate service agreements with appropriate notice as specified in individual contracts. RWNA reserves the right to terminate services immediately if:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Safety requirements are not met</li>
                    <li>Payment terms are violated</li>
                    <li>Client breaches material terms of the agreement</li>
                    <li>Illegal activities are suspected</li>
                  </ul>
                </div>
              </div>

              {/* Governing Law */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Governing Law</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>These terms shall be governed by and construed in accordance with the laws of Malaysia. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of Malaysian courts.</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-sm">legal@rwna.com.my</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <p className="text-sm">+609-580 7154</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-background rounded-lg">
                    <p className="text-sm">
                      <strong>RWNA Engineering Sdn Bhd</strong><br />
                      PLO 15, Jalan Gebeng 2/1, Kawasan Perindustrian Gebeng,<br />
                      26080 Kuantan, Pahang, Malaysia
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;