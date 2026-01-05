import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ContentProvider } from '@/lib/ContentContext';
import { ThemeProvider } from '@/lib/ThemeContext';

import Index from './pages/Index';
import Landing from './pages/Landing';
import Programmes from './pages/programmes';
import Evenement from './pages/evenement';
import Contact from './pages/contact';
import About from './pages/about';
import Newsletter from './pages/newsletter';
import Don from './pages/don';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminIndex from './pages/admin/Index';
import Dashboard from './pages/admin/Dashboard';
import Navbar from '@/components/ui/header';
import RequireAuth from '@/components/auth/RequireAuth';

const queryClient = new QueryClient();

// Layout component that includes the Header
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>}>
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
