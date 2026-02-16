import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ChevronDown,
  Facebook, 
  Linkedin, 
  Youtube, 
  ExternalLink,
  Printer
} from "lucide-react";
import { IMAGES } from "@/assets/images";
import { ROUTE_PATHS } from "@/lib/index";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatWidget } from "@/components/ChatWidget";
import { ThemeToggleLink } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  path?: string;
  dropdown?: DropdownItem[];
}

interface DropdownItem {
  label: string;
  path: string;
  external?: boolean;
}

// Main navigation items with dropdowns
const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: ROUTE_PATHS.HOME },
  {
    label: "Company",
    dropdown: [
      { label: "About Us", path: ROUTE_PATHS.ABOUT },
      { label: "Clients", path: ROUTE_PATHS.CLIENTS },
      { label: "News & Events", path: ROUTE_PATHS.NEWS_EVENTS },
      { label: "Policies", path: ROUTE_PATHS.POLICIES },
      { label: "Projects", path: ROUTE_PATHS.PROJECTS },
      { label: "Recognition", path: ROUTE_PATHS.RECOGNITION },
      { label: "Services", path: ROUTE_PATHS.SERVICES },
    ]
  },
  {
    label: "Careers & Training",
    dropdown: [
      { label: "Career Opportunities", path: ROUTE_PATHS.CAREER },
      { label: "Industrial Training", path: ROUTE_PATHS.INDUSTRIAL_TRAINING },
    ]
  },
  {
    label: "Portal",
    dropdown: [
      { label: "E-RWNA", path: "http://e.rwna.com.my/", external: true },
      { label: "Webmail", path: "http://webmail.rwna.com.my/", external: true },
    ]
  },
  { label: "Contact", path: ROUTE_PATHS.CONTACT },
];

export function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary">
      {/* Top Header Bar - Hidden on Mobile */}
      <div className="hidden border-b border-border/40 bg-muted/50 py-2 text-xs font-medium md:block">
        <div className="container mx-auto flex justify-between px-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Phone className="h-3.5 w-3.5 text-primary" />
              +(609) 5839 511/12/13/15
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Mail className="h-3.5 w-3.5 text-primary" />
              information@rwna.com.my
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/p/RWNA-Engineering-SdnBhd-100093191528942/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="https://www.youtube.com/@officialrwna4929" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-3.5 w-3.5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-md py-3 shadow-sm"
            : "bg-background py-5"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-4 group">
            <div className="relative h-14 w-14 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all overflow-hidden border-2 border-primary">
              <img 
                src={IMAGES.RWNA_LOGO_TRANSPARENT_20260213_002458_241} 
                alt="RWNA Engineering Logo" 
                className="w-full h-full object-contain p-1"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tight text-foreground">
                RWNA <span className="text-primary">ENGINEERING</span>
              </span>
              <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-[0.15em]">
                Oil & Gas Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              // Handle dropdown items
              if (item.dropdown) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.path} asChild>
                          {dropdownItem.external ? (
                            <a
                              href={dropdownItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 w-full"
                            >
                              {dropdownItem.label}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          ) : (
                            <Link to={dropdownItem.path} className="w-full">
                              {dropdownItem.label}
                            </Link>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              
              // Handle regular items
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
            
            {/* Theme Toggle */}
            <div className="ml-4 pl-4 border-l border-border/40">
              <ThemeToggleLink />
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to={ROUTE_PATHS.CONTACT} className="hidden sm:block">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 shadow-lg rounded-xl">
                Request Quote
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col h-full">
                <SheetHeader className="p-6 border-b border-border flex-shrink-0">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white text-xs font-bold">
                      RW
                    </div>
                    RWNA Navigation
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col py-4">
                  {NAV_ITEMS.map((item) => {
                    // Handle dropdown items in mobile
                    if (item.dropdown) {
                      return (
                        <div key={item.label}>
                          <div className="px-6 py-3 text-sm font-semibold text-primary bg-primary/5 border-b border-border/50">
                            {item.label}
                          </div>
                          {item.dropdown.map((dropdownItem) => (
                            dropdownItem.external ? (
                              <a
                                key={dropdownItem.path}
                                href={dropdownItem.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-8 py-3 text-base font-medium text-muted-foreground hover:bg-muted/50 transition-colors border-b border-border/30"
                              >
                                {dropdownItem.label}
                                <ExternalLink className="h-4 w-4 opacity-40" />
                              </a>
                            ) : (
                              <NavLink
                                key={dropdownItem.path}
                                to={dropdownItem.path}
                                className={({ isActive }) =>
                                  cn(
                                    "flex items-center justify-between px-8 py-3 text-base font-medium transition-colors border-b border-border/30",
                                    isActive ? "bg-primary/5 text-primary" : "text-muted-foreground hover:bg-muted/50"
                                  )
                                }
                              >
                                {dropdownItem.label}
                                <ChevronRight className="h-4 w-4 opacity-40" />
                              </NavLink>
                            )
                          ))}
                        </div>
                      );
                    }
                    
                    // Handle regular items
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center justify-between px-6 py-4 text-base font-medium transition-colors border-b border-border/50",
                            isActive ? "bg-primary/5 text-primary" : "text-muted-foreground hover:bg-muted/50"
                          )
                        }
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4 opacity-40" />
                      </NavLink>
                    );
                  })}
                  
                  {/* Theme Toggle in Mobile */}
                  <div className="px-6 py-4 border-b border-border/50">
                    <ThemeToggleLink />
                  </div>
                  
                    <div className="p-6 mt-4 pb-8">
                      <Link to={ROUTE_PATHS.CONTACT}>
                        <Button className="w-full rounded-xl">Request Quote</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Chat Widget - Available on all pages */}
      <ChatWidget />


      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-6">
              <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-white flex items-center justify-center overflow-hidden border border-primary">
                  <img 
                    src={IMAGES.RWNA_LOGO_TRANSPARENT_20260213_002458_241} 
                    alt="RWNA Engineering Logo" 
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight">RWNA ENGINEERING</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Specializing in on-site machining, subsea cutting, and safety enclosure systems. 
                Delivering engineering excellence to the oil & gas industry since 2001.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/p/RWNA-Engineering-SdnBhd-100093191528942/" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://www.youtube.com/@officialrwna4929" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="#" className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">Quick Links</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to={ROUTE_PATHS.ABOUT} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary/40" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.SERVICES} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary/40" />
                    Services
                  </Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.CAREER} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary/40" />
                    Career Opportunities
                  </Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.CONTACT} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary/40" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* HQ Contact */}
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">Main Office</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    Lot 1/129, Kawasan Perindustrian Gebeng Fasa 2,<br />
                    26080 Kuantan, Pahang, Malaysia
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">+(609) 5839 511/12/13/15</span>
                </li>
                <li className="flex gap-3">
                  <Printer className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">+(609) - 583 9510/5008</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">information@rwna.com.my</span>
                </li>
              </ul>
            </div>

            {/* Locations Summary */}
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground">Regional Hubs</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Kuantan (Main Operation Centre)</li>
                <li>Kuala Lumpur (Office)</li>
                <li>Paka, Dungun (Office & Warehouse)</li>
                <li>Sungai Udang (Office & Warehouse)</li>
                <li>Miri (Office & Warehouse)</li>
                <li>Pengerang (Office & Warehouse)</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 border-t border-border pt-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2026 RWNA Engineering Sdn. Bhd. (Co. Reg. No.: 200101003108). All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link to={ROUTE_PATHS.PRIVACY_POLICY} className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to={ROUTE_PATHS.TERMS_OF_SERVICE} className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <a 
                  href="https://codestudio.my" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
                >
                  Design by Code Studio
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
