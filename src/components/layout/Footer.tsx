
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">IdeaLaunch</span>
            </div>
            <p className="text-gray-300 text-sm">
              Transforming ideas into reality through MVP development, business websites, and immersive 3D experiences.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Github className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/mvp" className="hover:text-white transition-colors">MVP Development</Link></li>
              <li><Link to="/websites" className="hover:text-white transition-colors">Business Websites</Link></li>
              <li><Link to="/3d-brands" className="hover:text-white transition-colors">3D Brand Experiences</Link></li>
              <li><Link to="/domains" className="hover:text-white transition-colors">Domain Management</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@ideallaunch.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 IdeaLaunch. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
