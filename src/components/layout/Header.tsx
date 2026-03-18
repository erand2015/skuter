'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingCart, User, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'FILLIMI', href: '/' },
  { name: 'SKUTERAT', href: '/scooters' },
  { name: 'SERVISI', href: '/service' },
  { name: 'PJESË', href: '/parts' },
  { name: 'KONTAKT', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled 
            ? 'bg-razer-black/95 backdrop-blur-xl border-b border-razer-green/30 py-2' 
            : 'bg-transparent py-4'
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <Zap className="w-8 h-8 text-razer-green" />
                <span className="text-2xl font-black tracking-tighter">
                  <span className="text-white">SKUTER</span>
                  <span className="text-razer-green razer-glow">ZONE</span>
                  <span className="text-xs align-top text-razer-green ml-1">.PRO</span>
                </span>
              </motion.div>
              
              {/* Glow effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -inset-2 bg-razer-green/20 blur-xl -z-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative px-4 py-2"
                  >
                    <span className="text-sm font-medium text-gray-300 hover:text-razer-green transition-colors relative z-10">
                      {item.name}
                    </span>
                    
                    {/* Hover background */}
                    <AnimatePresence>
                      {hoveredItem === item.name && (
                        <motion.div
                          layoutId="nav-hover"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 bg-razer-green/10 border border-razer-green/30 rounded -z-0"
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Active indicator */}
                    {item.name === 'FILLIMI' && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-razer-green"
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-300 hover:text-razer-green transition-colors relative"
              >
                <Search className="w-5 h-5" />
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute -inset-1 bg-razer-green/20 rounded-full -z-10"
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-300 hover:text-razer-green transition-colors relative"
              >
                <User className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-300 hover:text-razer-green transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-razer-green text-black text-xs rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-razer-green border border-razer-green/30 rounded"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-razer-dark border-l border-razer-green/30 p-6"
            >
              <div className="flex flex-col space-y-4 mt-16">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="block py-2 text-gray-300 hover:text-razer-green font-medium border-b border-razer-green/20"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
                
                <div className="pt-4">
                  <button className="w-full px-4 py-3 bg-razer-green text-black font-bold rounded hover:bg-razer-green/90 transition-colors">
                    KËRKO OFERTA
                  </button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}