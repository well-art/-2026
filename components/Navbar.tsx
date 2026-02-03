import React, { useState } from 'react';
import { BookOpen, Search, X, LogOut, Menu } from 'lucide-react';

interface NavbarProps {
  scrollToSection: (id: string) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, searchTerm, onSearch, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: '規章制度', id: 'regulations' },
    { name: '粒子流程表', id: 'flowcharts' },
    { name: '共用表格', id: 'forms' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  const clearSearch = () => {
    onSearch('');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-40 border-b border-gray-100 h-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer z-10" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
          >
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl text-brand-gray tracking-tight truncate max-w-[200px] sm:max-w-none">
              智匯中心<span className="hidden sm:inline">：企業規範導航</span>
            </span>
          </div>
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-brand-gray hover:text-brand-green font-medium transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4 z-10">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="搜尋..."
                className="pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green w-48 transition-all focus:w-64"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                  title="清除搜尋"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1 text-gray-400 hover:text-brand-gray transition-colors"
              title="登出系統"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">登出</span>
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-gray hover:text-brand-green focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-100 shadow-lg">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="搜尋網站內容..."
              className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-brand-gray hover:bg-green-50 hover:text-brand-green transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="border-t border-gray-100 my-2"></div>
          <button
            onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <LogOut size={18} />
            登出系統
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;