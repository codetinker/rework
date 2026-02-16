import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText, Mail, Phone } from 'lucide-react';
import { springPresets, fadeInUp } from '@/lib/motion';

const PrivacyPolicy: React.FC = () => {
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how RWNA Engineering collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: February 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
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
              {/* Information We Collect */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Contact us through our website forms or email</li>
                    <li>Request quotes or services</li>
                    <li>Apply for employment or training programs</li>
                    <li>Subscribe to our newsletters or updates</li>
                    <li>Visit our facilities or attend our events</li>
                  </ul>
                  <p>This may include your name, email address, phone number, company information, and any other details you choose to provide.</p>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and improve our engineering services</li>
                    <li>Respond to your inquiries and requests</li>
                    <li>Process job applications and training program enrollments</li>
                    <li>Send you relevant business communications</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Maintain safety and security standards</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Information Sharing and Disclosure</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations or court orders</li>
                    <li>To protect our rights, property, or safety, or that of others</li>
                    <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>
                </div>
              </div>

              {/* Data Security */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Data Security</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Secure data transmission using encryption protocols</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication procedures</li>
                    <li>Employee training on data protection practices</li>
                    <li>Compliance with ISO 9001:2015 quality management standards</li>
                  </ul>
                </div>
              </div>

              {/* Your Rights */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Your Rights</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict certain processing activities</li>
                    <li>Withdraw consent where processing is based on consent</li>
                    <li>File a complaint with relevant data protection authorities</li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-sm">privacy@rwna.com.my</p>
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

export default PrivacyPolicy;