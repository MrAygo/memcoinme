import React from 'react';
import { Menu } from 'lucide-react';
import { AuthButton } from '../Auth/AuthButton';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-br from-white via-white/80 to-white/40 bg-clip-text text-transparent animate-shimmer">
              memcoin.me
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <AuthButton />
          </div>

          <button className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="text-white/60 hover:text-white transition-all duration-300 font-medium tracking-wide relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300" />
    </a>
  );
}