import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ROUTE_PATHS } from "@/lib/index";
import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserSwitcher } from "@/components/UserSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Layout
import { Layout } from "@/components/Layout";

// Page Imports
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import Clients from "@/pages/Clients";
import Services from "@/pages/Services";
import Chat from "@/pages/Chat";
import Career from "@/pages/Career";
import Training from "@/pages/Training";
import News from "@/pages/News";
import Inquiries from "@/pages/Inquiries";
import Users from "@/pages/Users";
import Login from "@/pages/Login";
import AccessLogs from "@/pages/AccessLogs";
import RoleManagement from "@/pages/RoleManagement";
import APIDemo from "@/pages/APIDemo";
import FileManager from "@/pages/FileManager";
import Trash from "@/pages/Trash";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Helper component to ensure window scrolls to top on navigation
 */
function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * RWNA CMS Main Application Component
 * © 2026 RWNA Engineering Sdn. Bhd.
 */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <UserProvider>
          <BrowserRouter>
            <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />

            {/* Protected Routes Wrapper */}
            <Route
              path={ROUTE_PATHS.DASHBOARD}
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.PROJECTS}
              element={
                <Layout>
                  <Projects />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.CLIENTS}
              element={
                <Layout>
                  <Clients />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.CAREER}
              element={
                <Layout>
                  <Career />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.TRAINING}
              element={
                <Layout>
                  <Training />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.NEWS}
              element={
                <Layout>
                  <News />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.INQUIRIES}
              element={
                <Layout>
                  <Inquiries />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.CHAT}
              element={
                <Layout>
                  <Chat />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.USERS}
              element={
                <Layout>
                  <Users />
                </Layout>
              }
            />
            <Route
              path="/access-logs"
              element={
                <Layout>
                  <AccessLogs />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.ROLES}
              element={
                <Layout>
                  <RoleManagement />
                </Layout>
              }
            />
            <Route
              path="/api-demo"
              element={
                <Layout>
                  <APIDemo />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.FILE_MANAGER}
              element={
                <Layout>
                  <FileManager />
                </Layout>
              }
            />

            <Route
              path={ROUTE_PATHS.SERVICES}
              element={
                <Layout>
                  <Services />
                </Layout>
              }
/>

            <Route
              path={ROUTE_PATHS.TRASH}
              element={
                <Layout>
                  <Trash />
                </Layout>
              }
            />

            {/* 404 Redirect to Dashboard */}
            <Route path="*" element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
          </Routes>
            <ThemeSwitcher />
            <UserSwitcher />
          </BrowserRouter>
          <Toaster />
          <Sonner position="top-right" closeButton richColors />
        </UserProvider>
      </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
