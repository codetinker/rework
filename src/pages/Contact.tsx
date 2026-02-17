import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Building2, Printer } from "lucide-react";
import { offices } from "@/data/index";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to discuss your next project? Get in touch with our engineering experts across Malaysia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl">Send Inquiry</CardTitle>
                  <p className="text-muted-foreground">
                    Tell us about your project requirements and we'll get back to you within 1-3 business days.
                  </p>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">First Name *</label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Last Name *</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company</label>
                      <Input placeholder="Your Company Name" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input type="email" placeholder="john@company.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone</label>
                        <Input placeholder="+60 12-345 6789" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Service Required</label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                        <option value="">Select a service</option>
                        <option value="on-site-machining">On-site Machining</option>
                        <option value="subsea-cutting">Subsea Pipeline & Structure Cutting</option>
                        <option value="w3p-enclosure">W3P Enclosure System</option>
                        <option value="precision-machining">Precision Metal Designing & Machining</option>
                        <option value="anode-installation">Sacrificial Anode Installation</option>
                        <option value="fabrication-maintenance">Fabrication & Maintenance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Project Details *</label>
                      <Textarea 
                        placeholder="Please describe your project requirements, timeline, and any specific technical specifications..."
                        rows={5}
                      />
                    </div>
                    <Button size="lg" className="w-full">
                      Send Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">Lot 1/129, Kawasan Perindustrian Gebeng Fasa 2</p>
                      <p className="text-muted-foreground">26080 Kuantan, Pahang, Malaysia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+(609) 5839 511/12/13/15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Printer className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Fax</p>
                      <p className="text-muted-foreground">+(609) - 583 9510/5008</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">information@rwna.com.my</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Sat: 8:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={staggerItem} className="text-sm font-mono text-primary uppercase tracking-widest mb-4">
              Our Regional Presence
            </motion.h2>
            <motion.h3 variants={staggerItem} className="text-4xl font-bold mb-6">
              Office Locations
            </motion.h3>
            <motion.p variants={staggerItem} className="text-muted-foreground max-w-2xl mx-auto">
              With strategic locations across Malaysia, we're positioned to serve your offshore and onshore engineering needs efficiently.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {offices.map((office) => (
              <motion.div key={office.id} variants={staggerItem}>
                <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{office.city}</CardTitle>
                        <p className="text-sm text-muted-foreground">{office.name}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <div className="text-sm">
                          {office.phone.map((phoneNumber: string, index: number) => (
                            <div key={index} className="leading-relaxed">
                              {phoneNumber}
                            </div>
                          ))}
                        </div>
                      </div>
                      {office.fax && office.fax.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Printer className="w-4 h-4 text-muted-foreground" />
                          <div className="text-sm">
                            {office.fax.map((faxNumber: string, index: number) => (
                              <div key={index} className="leading-relaxed">
                                {faxNumber}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                      <a href={office.mapUrl} target="_blank" rel="noopener noreferrer">
                        View on Map
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


    </div>
  );
}
