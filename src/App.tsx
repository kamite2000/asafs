import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { ContentProvider } from '@/lib/ContentContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import Navbar from '@/components/ui/header';
import RequireAuth from '@/components/auth/RequireAuth';

// Lazy load page components
const Index = lazy(() => import('./pages/Index'));
const Landing = lazy(() => import('./pages/Landing'));
const Programmes = lazy(() => import('./pages/programmes'));
const Evenement = lazy(() => import('./pages/evenement'));
const Contact = lazy(() => import('./pages/contact'));
const About = lazy(() => import('./pages/about'));
const Newsletter = lazy(() => import('./pages/newsletter'));
const Don = lazy(() => import('./pages/don'));
const Success = lazy(() => import('./pages/Success'));
const Dictionary = lazy(() => import('./pages/Dictionary'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const AdminIndex = lazy(() => import('./pages/admin/Index'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));

const queryClient = new QueryClient();

// Layout component that includes the Header
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <ContentProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              {/* Admin Entry Point - Authentication */}
              <Route path="/admin" element={<AdminIndex />} />

              {/* Auth Routes - Can be accessed directly, or via Admin Landing */}
              <Route path="auth/login" element={<Login />} />
              <Route path="auth/register" element={<Register />} />
              <Route path="auth/forgot-password" element={<ForgotPassword />} />

              {/* Admin Dashboard - Protected */}
              <Route 
                path="admin/dashboard" 
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                } 
              />

              {/* Main App Routes - Public - With Header */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="programmes" element={<Programmes />} />
                <Route path="evenement" element={<Evenement />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="newsletter" element={<Newsletter />} />
                <Route path="don" element={<Don />} />
                <Route path="success" element={<Success />} />
                <Route path="dictionnaire" element={<Dictionary />} />
              </Route>

              {/* Fallback - Redirect to Home */}
              <Route path="*" element={<Index />} />
            </Routes>
          </BrowserRouter>
        </ContentProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
