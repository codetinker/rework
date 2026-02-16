import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Policy {
  id: number;
  title: string;
  description: string;
  pdfUrl: string;
}

const policies: Policy[] = [
  {
    id: 1,
    title: "Occupational Health & Safety Policy",
    description: "Comprehensive policy outlining our commitment to maintaining the highest standards of workplace safety and health for all employees, contractors, and stakeholders. Establishes safety protocols, risk management procedures, and emergency response guidelines to ensure zero harm in all operations.",
    pdfUrl: "http://www.rwna.com.my/images/policy/hsepolicy.pdf"
  },
  {
    id: 2,
    title: "Quality Policy",
    description: "Our dedication to delivering exceptional quality in all services and maintaining continuous improvement in our operations. Defines quality standards, customer satisfaction objectives, and systematic approaches to achieving excellence in engineering solutions.",
    pdfUrl: "http://www.rwna.com.my/images/policy/qualitypolicy.pdf"
  },
  {
    id: 3,
    title: "Drug & Alcohol Policy",
    description: "Zero-tolerance policy ensuring a safe, productive work environment free from substance abuse. Establishes testing procedures, prevention programs, and rehabilitation support to maintain workplace safety and employee wellbeing.",
    pdfUrl: "http://www.rwna.com.my/images/policy/drugandalcholopolicy.pdf"
  },
  {
    id: 4,
    title: "Stop Work Policy",
    description: "Empowering all personnel to stop work when unsafe conditions or practices are observed, prioritizing safety above all else. Provides clear authority and procedures for work cessation without fear of reprisal, ensuring immediate hazard mitigation.",
    pdfUrl: "http://www.rwna.com.my/images/policy/stopworkpolicy.pdf"
  },
  {
    id: 5,
    title: "Human Right Policy",
    description: "Our commitment to respecting and protecting human rights in all aspects of our business operations. Addresses fair labor practices, non-discrimination, worker dignity, and ethical treatment of all individuals within our sphere of influence.",
    pdfUrl: "http://www.rwna.com.my/images/policy/humanrightpolicy.pdf"
  },
  {
    id: 6,
    title: "Light Duty Management and Return to Work Policy",
    description: "Structured approach to supporting injured employees through recovery and safe return to work. Outlines modified work arrangements, medical management procedures, and rehabilitation support to facilitate successful workplace reintegration.",
    pdfUrl: "http://www.rwna.com.my/images/policy/lightduty.pdf"
  },
  {
    id: 7,
    title: "ESG Policy",
    description: "Environmental, Social, and Governance policy demonstrating our commitment to sustainable business practices. Integrates environmental stewardship, social responsibility, and ethical governance into our strategic decision-making and operational excellence.",
    pdfUrl: "http://www.rwna.com.my/images/policy/esgpolicy.pdf"
  },
  {
    id: 8,
    title: "Anti Bribery Policy",
    description: "Strict anti-corruption measures ensuring ethical business conduct and compliance with all applicable laws. Establishes clear guidelines for gift policies, conflict of interest management, and transparent business dealings to maintain integrity and trust.",
    pdfUrl: "http://www.rwna.com.my/images/policy/antibriberypolicy.pdf"
  },
  {
    id: 9,
    title: "Enviromental Policy",
    description: "Our commitment to environmental stewardship and sustainable practices in all operations. Defines environmental management systems, pollution prevention measures, and resource conservation strategies to minimize our ecological footprint.",
    pdfUrl: "http://www.rwna.com.my/images/policy/enviromentalpolicy.pdf"
  }
];

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const handleViewPolicy = (policy: Policy) => {
    window.open(policy.pdfUrl, '_blank', 'height=1000,width=1000');
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Company <span className="text-primary">Policies</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive policies ensure the highest standards of safety, quality, and ethical conduct across all operations.
          </p>
        </motion.div>

        {/* Policies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors duration-300 flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-primary mb-4" />
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      {String(policy.id).padStart(2, '0')}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground leading-tight">
                    {policy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-1">
                    {policy.description}
                  </p>
                  
                  <Button
                    onClick={() => handleViewPolicy(policy)}
                    variant="outline"
                    size="sm"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Policy
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Policy Compliance
              </h3>
              <p className="text-muted-foreground mb-6">
                All RWNA Engineering personnel, contractors, and partners are required to comply with these policies. 
                Regular training and updates ensure continuous adherence to our high standards.
              </p>
              <div className="text-sm text-muted-foreground">
                Last Updated: {new Date().toLocaleDateString()} | Version: 2026.1
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}