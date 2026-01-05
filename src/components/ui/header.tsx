import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.programs'), path: '/programmes' },
    { name: t('nav.events'), path: '/evenement' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <img
                loading="lazy"
                src="/asft.png"
                className="relative object-contain w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                alt="Logo ASAFS"
              />
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <p className="text-[9px] font-black text-blue-600 tracking-widest uppercase">Action Solidaire</p>
              <p className="text-[11px] font-bold text-slate-900 dark:text-white uppercase transition-colors">ASAFS RDC</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-blue-600 px-1 py-1 rounded-full border border-blue-500 shadow-lg shadow-blue-900/10">
            <div className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-1.5 text-[11px] font-black rounded-full transition-all duration-300 uppercase tracking-tight ${
                    isActive(link.path)
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-white hover:text-blue-50 hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA Section */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-2 px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-800">
               <Globe className="w-3 h-3 text-slate-400" />
               <select 
                 onChange={(e) => changeLanguage(e.target.value)}
                 value={i18n.language}
                 className="bg-transparent text-[10px] font-bold text-slate-600 dark:text-slate-400 outline-none cursor-pointer uppercase"
               >
                 <option value="fr">FR</option>
                 <option value="en">EN</option>
                 <option value="swa">SWA</option>
               </select>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <Link
              to="/don"
              className="hidden sm:flex items-center gap-2 px-5 py-2 text-[10px] font-black text-slate-950 bg-[#F4D227] rounded-full hover:bg-[#ffe045] transition-all duration-300 uppercase tracking-widest"
            >
              <Heart className="w-3 h-3 fill-current" />
              {t('nav.donate')}
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block w-full p-4 rounded-2xl text-base font-bold transition-colors ${
                isActive(link.path)
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/don"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full p-4 bg-[#F4D227] text-slate-950 font-black rounded-2xl"
          >
            <Heart className="w-5 h-5 fill-current" />
            {t('nav.donate')}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;