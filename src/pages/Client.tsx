import { motion } from "framer-motion";
import { Users, Building2, Handshake, ExternalLink } from "lucide-react";
import { clients } from "@/data/index";
import { ClientCard } from "@/components/Cards";
import { ROUTE_PATHS } from "@/lib/index";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const clientLogos = [
  { name: "Aker Solutions", logo: "/images/clients/aker-solutions.jpg" },
  { name: "Asturi Metal", logo: "/images/clients/asturi-metal.png" },
  { name: "BASF Petronas Chemicals", logo: "/images/clients/basf-petronas-chemicals.gif" },
  { name: "Bredero Shaw", logo: "/images/clients/bredero-shaw.gif" },
  { name: "Calidad", logo: "/images/clients/calidad.jpg" },
  { name: "Carimin", logo: "/images/clients/carimin.jpg" },
  { name: "Dayang", logo: "/images/clients/dayang.gif" },
  { name: "Duta Klasik", logo: "/images/clients/duta-klasik.jpg" },
  { name: "Edaran Fokus", logo: "/images/clients/edaran-fokus.jpg" },
  { name: "Epic", logo: "/images/clients/epic.png" },
  { name: "Ethelyene", logo: "/images/clients/ethelyene.jpg" },
  { name: "ExxonMobil", logo: "/images/clients/exxon-mobil.gif" },
  { name: "Fraser", logo: "/images/clients/fraser.jpg" },
  { name: "HSE Resources", logo: "/images/clients/hse-resources.png" },
  { name: "Kencana Petroleum", logo: "/images/clients/kencana-petroleum.jpg" },
  { name: "KNM", logo: "/images/clients/knm.jpg" },
  { name: "M3nergy", logo: "/images/clients/m3nergy.jpg" },
  { name: "MMC", logo: "/images/clients/mmc.jpg" },
  { name: "MSET", logo: "/images/clients/mset.png" },
  { name: "MTBE Malaysia", logo: "/images/clients/mtbe-malaysia.jpg" },
  { name: "Mushtari", logo: "/images/clients/mushtari.jpg" },
  { name: "Newwin", logo: "/images/clients/newwin.png" },
  { name: "Optimal", logo: "/images/clients/optimal.gif" },
  { name: "Petlin", logo: "/images/clients/petlin.png" },
  { name: "Petra Perdana", logo: "/images/clients/petra-perdana.gif" },
  { name: "Petronas Carigali", logo: "/images/clients/petronas-carigali.jpg" },
  { name: "Petronas Gas", logo: "/images/clients/petronas-gas.jpg" },
  { name: "Petronas Penapisan Melaka", logo: "/images/clients/petronas-penapisan-melaka.jpg" },
  { name: "Petronas Penapisan Terengganu", logo: "/images/clients/petronas-penapisan-terengganu.jpg" },
  { name: "PFCE", logo: "/images/clients/pfce.png" },
  { name: "Pioneer Engineering", logo: "/images/clients/pioneer-engineering.png" },
  { name: "Polyplastic", logo: "/images/clients/polyplastic.gif" },
  { name: "RMS Engineering", logo: "/images/clients/rms-engineering.gif" },
  { name: "Sapura Acergy", logo: "/images/clients/sapura-acergy.gif" },
  { name: "Sapuracrest Petroleum", logo: "/images/clients/sapuracrest-petroleum.jpg" },
  { name: "Shapadu", logo: "/images/clients/shapadu.gif" },
  { name: "Sime Darby Energy Utilities", logo: "/images/clients/sime-darby-energy-utilities.png" },
  { name: "Talisman Energy", logo: "/images/clients/talisman-energy.gif" },
  { name: "TL Offshore", logo: "/images/clients/tl-offshore.jpg" },
  { name: "TMM Engineering", logo: "/images/clients/tmm-engineering.jpg" },
  { name: "Warga Hikmat", logo: "/images/clients/warga-hikmat.jpg" },
  { name: "Wasco", logo: "/images/clients/wasco.jpg" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function Client() {
  // Group clients alphabetically
  const groupedClients = clients.reduce((acc, client) => {
    const firstLetter = client.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(client);
    return acc;
  }, {} as Record<string, typeof clients>);

  // Sort the letters
  const sortedLetters = Object.keys(groupedClients).sort();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />
          <div className="grid grid-cols-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border-r border-b border-white/10" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-primary-foreground/80 mb-4"
            >
              <Handshake className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm font-bold font-mono">Partnerships</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6"
            >
              Our Valued Clients
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed"
            >
              We take pride in our long-standing relationships with industry leaders in the global energy and engineering sectors.
              Our commitment to excellence has made us a trusted partner for multi-national corporations and regional powerhouses.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Client Stats / Intro */}
      <section className="py-12 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Global Network</h3>
                <p className="text-muted-foreground text-sm">Serving clients across Southeast Asia and beyond.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Sector Diversity</h3>
                <p className="text-muted-foreground text-sm">Expertise spanning oil, gas, renewable energy, and marine.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <ExternalLink className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Strategic Alliances</h3>
                <p className="text-muted-foreground text-sm">Built on trust, safety, and operational excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Partners in Excellence</h2>
              <p className="text-muted-foreground">
                Our client portfolio includes some of the world's most demanding operators. 
                We provide specialized engineering solutions that ensure their assets remain safe, efficient, and productive.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Active Portfolio: {clients.length} Organizations
            </div>
          </div>
          {/* Trusted by Industry Leaders - Client Logos */}
          <div className="mb-16 bg-background overflow-hidden">
            <div className="container mx-auto px-4 mb-16">
              <div className="text-center">
                <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Partners</h2>
                <h3 className="text-4xl font-bold">Trusted by Industry Leaders</h3>
              </div>
            </div>

            <div className="relative flex overflow-x-hidden">
              <div className="flex animate-infinite-scroll py-8">
                {[...clientLogos, ...clientLogos].map((client, idx) => (
                  <div
                    key={`${client.name}-${idx}`}
                    className="mx-8 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="w-[120px] h-12 flex items-center justify-center">
                      <img 
                        src={client.logo} 
                        alt={client.name}
                        className="max-h-12 max-w-[120px] w-auto h-auto object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complete Client Directory - Simple Design */}
          <div>
            <h3 className="text-2xl font-bold mb-12 text-center">Complete Client Directory</h3>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {sortedLetters.map((letter) => (
                  <motion.div
                    key={letter}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className=""
                  >
                    <h4 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">
                      {letter}
                    </h4>
                    <div className="space-y-1">
                      {groupedClients[letter]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((client) => (
                          <div
                            key={client.id}
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            {client.name}
                          </div>
                        ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-accent/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to partner with RWNA?</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Discover how our precision engineering and on-site machining expertise can enhance your operational efficiency and asset integrity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="px-8 py-6 rounded-xl">
                <Link to={ROUTE_PATHS.INQUIRIES}>
                  Contact Our Team
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="px-8 py-6 rounded-xl">
                <Link to={ROUTE_PATHS.SERVICES}>
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Quote Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-3xl p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl" />
             
             <div className="max-w-2xl mx-auto text-center relative z-10">
                <blockquote className="text-2xl md:text-3xl font-medium italic mb-8">
                  "RWNA Engineering has consistently demonstrated technical prowess and a safety-first mindset on our offshore platforms. Their precision in on-site machining is unparalleled."
                </blockquote>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-1 bg-primary-foreground/30 mb-4" />
                  <p className="font-bold">Senior Operations Manager</p>
                  <p className="text-primary-foreground/60 text-sm uppercase tracking-widest">Major Oil & Gas Operator</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
