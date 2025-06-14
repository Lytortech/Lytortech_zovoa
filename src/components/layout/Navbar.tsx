
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Rocket, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();



  const isAuthenticated = true;
  const user = {
    name: currentUser?.displayName,
    email: currentUser?.email
  };



  const handleLogout = () => {
    console.log("Logout clicked");
    navigate('/login');

  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IdeaLaunch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link to="/mvp-workflow" className="text-gray-700 hover:text-blue-600 transition-colors">
              MVP Builder
            </Link>
            <Link to="/templates" className="text-gray-700 hover:text-blue-600 transition-colors">
              Templates
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-blue-600 transition-colors">
              Portfolio
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                My Projects
              </Link>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      My Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/services"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/mvp-workflow"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                MVP Builder
              </Link>
              <Link
                to="/templates"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Projects
                </Link>
              )}
              <div className="pt-4 pb-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start mb-2">
                        <User className="h-4 w-4 mr-2" />
                        My Projects
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start mb-2">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start mb-2">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
