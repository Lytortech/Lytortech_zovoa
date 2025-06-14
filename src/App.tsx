
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MVP from "./pages/MVP";
import MVPWorkflow from "./pages/MVPWorkflow";
import Websites from "./pages/Websites";
import WebsiteWorkflow from "./pages/WebsiteWorkflow";
import ThreeDBrands from "./pages/3DBrands";
import ThreeDWorkflow from "./pages/ThreeDWorkflow";
import NotFound from "./pages/NotFound";
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mvp" element={<MVP />} />
          <Route path="/mvp-workflow" element={<MVPWorkflow />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/website-workflow" element={<WebsiteWorkflow />} />
          <Route path="/3d-brands" element={<ThreeDBrands />} />
          <Route path="/3d-workflow" element={<ThreeDWorkflow />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
