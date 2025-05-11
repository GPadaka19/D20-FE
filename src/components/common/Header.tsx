import React from 'react';
import { Menu, Home, History, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ title = 'Pothole Detection System' }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-gray-800 hover:underline">
              {title}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <Home className="w-4 h-4 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/history" className="flex items-center text-gray-600 hover:text-gray-900">
              <History className="w-4 h-4 mr-1" />
              <span>History</span>
            </Link>
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              <BarChart2 className="w-4 h-4 mr-1" />
              <span>Dashboard</span>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-3 space-y-3">
            <Link 
              to="/" 
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                <span>Home</span>
              </div>
            </Link>
            <Link 
              to="/history" 
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <History className="w-4 h-4 mr-2" />
                <span>History</span>
              </div>
            </Link>
            <Link 
              to="/dashboard" 
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <BarChart2 className="w-4 h-4 mr-2" />
                <span>Dashboard</span>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;