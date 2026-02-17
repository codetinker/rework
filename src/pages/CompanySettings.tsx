/**
 * Company Settings Page
 * © 2026 RWNA Engineering Sdn. Bhd.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Save,
  ArrowLeft,
  Settings,
  MessageSquare,
  Globe,
  Eye,
  EyeOff,
  AlertTriangle,
  Calendar,
  Wrench
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CompanySettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Company Information State
  const [companyInfo, setCompanyInfo] = useState({
    name: 'RWNA Engineering Sdn. Bhd.',
    regNumber: '200101003108',
    mainAddress: 'Lot 1/129, Kawasan Perindustrian Gebeng Fasa 2',
    city: 'Kuantan',
    state: 'Pahang',
    postcode: '26080',
    country: 'Malaysia',
    phone: '+(609) 5839 511/12/13/15',
    fax: '+(609) - 583 9510/5008',
    email: 'information@rwna.com.my',
    website: 'https://rwna.com.my',
    businessHours: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 8:00 AM - 1:00 PM',
    description: 'Specializing in on-site machining, subsea cutting, and safety enclosure systems. Delivering engineering excellence to the oil & gas industry since 2001.'
  });

  // Email Configuration State (Brevo)
  const [emailConfig, setEmailConfig] = useState({
    enabled: true,
    senderName: 'RWNA Engineering',
    senderEmail: 'noreply@rwna.com.my',
    brevoToken: '',
    showToken: false
  });

  // WhatsApp API Configuration State
  const [whatsappConfig, setWhatsappConfig] = useState({
    enabled: true,
    token: '',
    instance: '',
    phoneRegistered: '',
    showToken: false
  });

  // Website Control State
  const [websiteControl, setWebsiteControl] = useState({
    lockMode: 'no', // 'no', 'coming-soon', 'maintenance'
    afterSchedule: 'show-website', // 'show-website', 'continue-lock'
    scheduled: false,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
    comingSoonMessage: 'Our new website is coming soon. Stay tuned for exciting updates!'
  });

  const handleCompanyInfoSave = () => {
    toast({
      title: "Company Information Updated",
      description: "Company details have been saved successfully.",
    });
  };

  const handleEmailConfigSave = () => {
    if (emailConfig.enabled && (!emailConfig.brevoToken || !emailConfig.senderEmail)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required email configuration fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Email Configuration Saved",
      description: "Brevo email settings have been updated successfully.",
    });
  };

  const handleWhatsAppConfigSave = () => {
    if (whatsappConfig.enabled && (!whatsappConfig.token || !whatsappConfig.instance || !whatsappConfig.phoneRegistered)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required WhatsApp API fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "WhatsApp Configuration Saved",
      description: "WhatsApp API settings have been updated successfully.",
    });
  };

  const handleWebsiteControlSave = () => {
    if (websiteControl.scheduled && (!websiteControl.startDate || !websiteControl.endDate)) {
      toast({
        title: "Missing Schedule",
        description: "Please set both start and end dates for scheduled maintenance.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Website Control Updated",
      description: "Website maintenance settings have been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Company Settings</h1>
          <p className="text-muted-foreground">Manage company information and system configuration</p>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="email">Email Config</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp API</TabsTrigger>
          <TabsTrigger value="website">Website Control</TabsTrigger>
        </TabsList>

        {/* Company Information Tab */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Update your company details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input
                    id="regNumber"
                    value={companyInfo.regNumber}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, regNumber: e.target.value }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Main Office Address
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mainAddress">Street Address</Label>
                    <Input
                      id="mainAddress"
                      value={companyInfo.mainAddress}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, mainAddress: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={companyInfo.city}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={companyInfo.state}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, state: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={companyInfo.postcode}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, postcode: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={companyInfo.country}
                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, country: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fax">Fax</Label>
                    <Input
                      id="fax"
                      value={companyInfo.fax}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, fax: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Textarea
                  id="businessHours"
                  value={companyInfo.businessHours}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, businessHours: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={companyInfo.description}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleCompanyInfoSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Company Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Configuration Tab */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Brevo Email Configuration
              </CardTitle>
              <CardDescription>
                Configure Brevo email service for system notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Enable Email Service</p>
                  <p className="text-sm text-muted-foreground">Enable or disable email notifications</p>
                </div>
                <Switch
                  checked={emailConfig.enabled}
                  onCheckedChange={(checked) => setEmailConfig(prev => ({ ...prev, enabled: checked }))}
                />
              </div>

              {emailConfig.enabled && (
                <>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="senderName">Sender Name</Label>
                      <Input
                        id="senderName"
                        value={emailConfig.senderName}
                        onChange={(e) => setEmailConfig(prev => ({ ...prev, senderName: e.target.value }))}
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">Sender Email</Label>
                      <Input
                        id="senderEmail"
                        type="email"
                        value={emailConfig.senderEmail}
                        onChange={(e) => setEmailConfig(prev => ({ ...prev, senderEmail: e.target.value }))}
                        placeholder="noreply@yourcompany.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brevoToken">Brevo API Token</Label>
                    <div className="relative">
                      <Input
                        id="brevoToken"
                        type={emailConfig.showToken ? "text" : "password"}
                        value={emailConfig.brevoToken}
                        onChange={(e) => setEmailConfig(prev => ({ ...prev, brevoToken: e.target.value }))}
                        placeholder="xkeysib-..."
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setEmailConfig(prev => ({ ...prev, showToken: !prev.showToken }))}
                      >
                        {emailConfig.showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Get your API token from Brevo dashboard → Account → SMTP & API → API Keys
                    </p>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button onClick={handleEmailConfigSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp API Tab */}
        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                WhatsApp API Configuration
              </CardTitle>
              <CardDescription>
                Configure WhatsApp API for customer communication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Enable WhatsApp API</p>
                  <p className="text-sm text-muted-foreground">Enable or disable WhatsApp integration</p>
                </div>
                <Switch
                  checked={whatsappConfig.enabled}
                  onCheckedChange={(checked) => setWhatsappConfig(prev => ({ ...prev, enabled: checked }))}
                />
              </div>

              {whatsappConfig.enabled && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="whatsappToken">API Token</Label>
                      <div className="relative">
                        <Input
                          id="whatsappToken"
                          type={whatsappConfig.showToken ? "text" : "password"}
                          value={whatsappConfig.token}
                          onChange={(e) => setWhatsappConfig(prev => ({ ...prev, token: e.target.value }))}
                          placeholder="66d867721480f"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setWhatsappConfig(prev => ({ ...prev, showToken: !prev.showToken }))}
                        >
                          {whatsappConfig.showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsappInstance">Instance ID</Label>
                      <Input
                        id="whatsappInstance"
                        value={whatsappConfig.instance}
                        onChange={(e) => setWhatsappConfig(prev => ({ ...prev, instance: e.target.value }))}
                        placeholder="66D895589BB92"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneRegistered">Registered Phone Number</Label>
                      <Input
                        id="phoneRegistered"
                        value={whatsappConfig.phoneRegistered}
                        onChange={(e) => setWhatsappConfig(prev => ({ ...prev, phoneRegistered: e.target.value }))}
                        placeholder="60125103448"
                      />
                      <p className="text-xs text-muted-foreground">
                        Phone number registered with WhatsApp Business API (without + symbol)
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button onClick={handleWhatsAppConfigSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save WhatsApp Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Control Tab */}
        <TabsContent value="website" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Website Control
              </CardTitle>
              <CardDescription>
                Control main website visibility and maintenance mode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Lock website?</Label>
                  <p className="text-sm text-muted-foreground mb-3">Choose the current state of your website</p>
                  <RadioGroup
                    value={websiteControl.lockMode}
                    onValueChange={(value) => setWebsiteControl(prev => ({ ...prev, lockMode: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No (The website is live and accessible)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="coming-soon" id="coming-soon" />
                      <Label htmlFor="coming-soon">Show Coming Soon (Display coming soon page)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maintenance" id="maintenance" />
                      <Label htmlFor="maintenance">Show Maintenance (Display maintenance page)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {websiteControl.lockMode !== 'no' && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="font-medium">Schedule Lock Period</p>
                          <p className="text-sm text-muted-foreground">Set automatic start and end times</p>
                        </div>
                        <Switch
                          checked={websiteControl.scheduled}
                          onCheckedChange={(checked) => setWebsiteControl(prev => ({ ...prev, scheduled: checked }))}
                        />
                      </div>

                      {websiteControl.scheduled && (
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date & Time</Label>
                            <div className="flex gap-2">
                              <Input
                                id="startDate"
                                type="date"
                                value={websiteControl.startDate}
                                onChange={(e) => setWebsiteControl(prev => ({ ...prev, startDate: e.target.value }))}
                              />
                              <Input
                                type="time"
                                value={websiteControl.startTime}
                                onChange={(e) => setWebsiteControl(prev => ({ ...prev, startTime: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endDate">End Date & Time</Label>
                            <div className="flex gap-2">
                              <Input
                                id="endDate"
                                type="date"
                                value={websiteControl.endDate}
                                onChange={(e) => setWebsiteControl(prev => ({ ...prev, endDate: e.target.value }))}
                              />
                              <Input
                                type="time"
                                value={websiteControl.endTime}
                                onChange={(e) => setWebsiteControl(prev => ({ ...prev, endTime: e.target.value }))}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <Label className="text-base font-medium">After Schedule Expired?</Label>
                        <p className="text-sm text-muted-foreground mb-3">What happens when the schedule ends</p>
                        <RadioGroup
                          value={websiteControl.afterSchedule}
                          onValueChange={(value) => setWebsiteControl(prev => ({ ...prev, afterSchedule: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="show-website" id="show-website" />
                            <Label htmlFor="show-website">Show Website (Automatically go live)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="continue-lock" id="continue-lock" />
                            <Label htmlFor="continue-lock">Continue Lock (Keep current state)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Custom Messages</h3>
                      
                      {websiteControl.lockMode === 'maintenance' && (
                        <div className="space-y-2">
                          <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                          <Textarea
                            id="maintenanceMessage"
                            value={websiteControl.maintenanceMessage}
                            onChange={(e) => setWebsiteControl(prev => ({ ...prev, maintenanceMessage: e.target.value }))}
                            rows={3}
                          />
                        </div>
                      )}

                      {websiteControl.lockMode === 'coming-soon' && (
                        <div className="space-y-2">
                          <Label htmlFor="comingSoonMessage">Coming Soon Message</Label>
                          <Textarea
                            id="comingSoonMessage"
                            value={websiteControl.comingSoonMessage}
                            onChange={(e) => setWebsiteControl(prev => ({ ...prev, comingSoonMessage: e.target.value }))}
                            rows={3}
                          />
                        </div>
                      )}
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800 dark:text-yellow-200">Warning</p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            If login is disabled, any logged-in users will be forced to log out when maintenance mode is activated.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleWebsiteControlSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Website Control Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}