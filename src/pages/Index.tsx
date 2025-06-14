
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import ServicesOverview from '../components/home/ServicesOverview';
import ProcessFlow from '../components/home/ProcessFlow';
import FAQ from '../components/home/FAQ';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesOverview />
        <ProcessFlow />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
