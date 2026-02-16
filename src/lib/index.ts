export const ROUTE_PATHS = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  PROJECTS: "/projects",
  CLIENTS: "/clients",
  RECOGNITION: "/recognition",
  CAREER: "/career",
  INDUSTRIAL_TRAINING: "/industrial-training",
  NEWS_EVENTS: "/news-events",
  CONTACT: "/contact",
  POLICIES: "/policies",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",
} as const;

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  imageKey: string;
  iconName: string;
}

export interface Policy {
  id: string;
  title: string;
  imageKey: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location?: string;
  client?: string;
  imageKey: string;
}

export interface Client {
  id: string;
  name: string;
  logoKey?: string;
}

export interface Office {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string[];
  fax?: string[];
  email?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapUrl: string;
}

export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];
