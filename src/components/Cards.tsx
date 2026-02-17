import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Settings, Waves, ShieldCheck, Cpu, Zap, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Service, Project, Client, ROUTE_PATHS } from "@/lib/index";
import { IMAGES } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Policy {
  id: string;
  title: string;
  description: string;
  imageKey: string;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const iconMap: Record<string, React.ElementType> = {
  Settings,
  Waves,
  ShieldCheck,
  Cpu,
  Zap,
  Wrench,
};

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.iconName] || Settings;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={springTransition}
      className="group h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/50">
        <div className="relative h-48 overflow-hidden">
          <img
            src={IMAGES[service.imageKey as keyof typeof IMAGES]}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <div className="rounded-lg bg-primary/90 p-2 text-primary-foreground backdrop-blur-sm">
              <Icon size={24} />
            </div>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground line-clamp-1">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.shortDescription}
          </p>
        </CardContent>
        <CardFooter>
          <Link to={`${ROUTE_PATHS.SERVICES}#${service.id}`} className="w-full">
            <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground">
              Learn More
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function PolicyCard({ policy, onView }: { policy: Policy; onView?: (policy: Policy) => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-border/40 bg-card shadow-lg transition-all"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={IMAGES[policy.imageKey as keyof typeof IMAGES]}
          alt={policy.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <Badge variant="outline" className="mb-3 border-white/20 bg-white/10 text-white backdrop-blur-md">
          RWNA Policy
        </Badge>
        <h3 className="mb-2 text-lg font-bold tracking-tight">{policy.title}</h3>
        <p className="mb-4 text-xs text-white/70 line-clamp-2">{policy.description}</p>
        <Button
          size="sm"
          variant="secondary"
          className="w-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-white/10"
          onClick={() => onView?.(policy)}
        >
          <Eye size={14} className="mr-2" />
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

export function ProjectCard({ project, onClick }: { project: Project; onClick?: (project: Project) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50"
      onClick={() => onClick?.(project)}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={IMAGES[project.imageKey as keyof typeof IMAGES]}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-6">
        <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
        <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
        <div className="mt-4 flex items-center text-primary text-xs font-semibold">
          View Case Study <ArrowRight size={12} className="ml-1" />
        </div>
      </div>
    </motion.div>
  );
}

export function ClientCard({ client }: { client: Client }) {
  return (
    <div className="flex items-center justify-center p-6 grayscale transition-all hover:grayscale-0">
      <div className="text-center">
        {client.logoKey ? (
          <div className="w-[120px] h-12 flex items-center justify-center">
            <img 
              src={IMAGES[client.logoKey as keyof typeof IMAGES]} 
              alt={client.name} 
              className="max-h-12 max-w-[120px] w-auto h-auto object-contain" 
            />
          </div>
        ) : (
          <span className="text-xl font-bold tracking-tighter text-muted-foreground/60 hover:text-primary transition-colors">
            {client.name}
          </span>
        )}
      </div>
    </div>
  );
}

export function StatCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative z-10">
        <div className="mb-2 text-4xl font-black tracking-tight text-primary font-mono">
          {value}
        </div>
        <div className="mb-4 text-lg font-bold text-foreground">
          {label}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
