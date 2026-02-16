import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ROUTE_PATHS } from "@/lib/index";
import { Layout } from "@/components/Layout";

// Page Imports
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import Client from "@/pages/Client";
import Recognition from "@/pages/Recognition";
import Career from "@/pages/Career";
import Training from "@/pages/Training";
import NewsEvents from "@/pages/NewsEvents";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Policies from "@/pages/Policies";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path={ROUTE_PATHS.HOME} element={<Home />} />
              <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
              <Route path={ROUTE_PATHS.SERVICES} element={<Services />} />
              <Route path={ROUTE_PATHS.PROJECTS} element={<Projects />} />
              <Route path={ROUTE_PATHS.CLIENTS} element={<Client />} />
              <Route path={ROUTE_PATHS.RECOGNITION} element={<Recognition />} />
              <Route path={ROUTE_PATHS.CAREER} element={<Career />} />
              <Route
                path={ROUTE_PATHS.INDUSTRIAL_TRAINING}
                element={<Training />}
              />
              <Route path={ROUTE_PATHS.NEWS_EVENTS} element={<NewsEvents />} />
              <Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />
              <Route path={ROUTE_PATHS.POLICIES} element={<Policies />} />
              <Route path={ROUTE_PATHS.PRIVACY_POLICY} element={<PrivacyPolicy />} />
              <Route path={ROUTE_PATHS.TERMS_OF_SERVICE} element={<TermsOfService />} />
              <Route
                path="*"
                element={
                  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
                    <p className="text-muted-foreground mb-8">
                      The page you are looking for does not exist or has been moved.
                    </p>
                    <a
                      href={ROUTE_PATHS.HOME}
                      className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Back to Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster />
        <Sonner position="top-right" closeButton richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;