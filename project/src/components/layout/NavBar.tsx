import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Scale, Shield, UserCircle } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSolutions = () => setIsSolutionsOpen(!isSolutionsOpen);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Scale className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">StartUpLegal</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <div className="relative">
                <button
                  onClick={toggleSolutions}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  Solutions
                  <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", isSolutionsOpen && "rotate-180")} />
                </button>
                
                {isSolutionsOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/solutions/compliance-assessment"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent"
                        onClick={() => setIsSolutionsOpen(false)}
                      >
                        Compliance Assessment
                      </Link>
                      <Link
                        to="/solutions/document-templates"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent"
                        onClick={() => setIsSolutionsOpen(false)}
                      >
                        Document Templates
                      </Link>
                      <Link
                        to="/solutions/legal-updates"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent"
                        onClick={() => setIsSolutionsOpen(false)}
                      >
                        Legal Updates
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/faq" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary">
                FAQ
              </Link>
              
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  leftIcon={<UserCircle className="h-4 w-4" />}
                  onClick={() => navigate('/dashboard')}
                >
                  {user?.fullName ?? 'Dashboard'}
                </Button>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Get Started
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={toggleSolutions}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary w-full text-left"
            >
              <div className="flex items-center justify-between">
                <span>Solutions</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isSolutionsOpen && "rotate-180")} />
              </div>
            </button>
            
            {isSolutionsOpen && (
              <div className="pl-6 space-y-1">
                <Link
                  to="/solutions/compliance-assessment"
                  className="block pl-3 pr-4 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                  onClick={toggleMenu}
                >
                  Compliance Assessment
                </Link>
                <Link
                  to="/solutions/document-templates"
                  className="block pl-3 pr-4 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                  onClick={toggleMenu}
                >
                  Document Templates
                </Link>
                <Link
                  to="/solutions/legal-updates"
                  className="block pl-3 pr-4 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                  onClick={toggleMenu}
                >
                  Legal Updates
                </Link>
              </div>
            )}
            
            <Link
              to="/faq"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            
            <Link
              to="/contact"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-primary"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary w-full text-left"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block pl-3 pr-4 py-2 text-base font-medium bg-primary text-white hover:bg-primary-dark mx-3 my-2 rounded-md text-center"
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;