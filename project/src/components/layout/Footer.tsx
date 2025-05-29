import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">StartUpLegal</span>
            </div>
            <p className="text-sm text-gray-600">
              Legal compliance made simple for South African startups and SMEs. Stay compliant, stay focused on growth.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Solutions
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/solutions/compliance-assessment" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Compliance Assessment
                </Link>
              </li>
              <li>
                <Link to="/solutions/document-templates" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Document Templates
                </Link>
              </li>
              <li>
                <Link to="/solutions/legal-updates" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Legal Updates
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Industries
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} StartUpLegal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;