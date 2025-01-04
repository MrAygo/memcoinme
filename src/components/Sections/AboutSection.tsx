import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            About memcoin.me
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            The premier platform for creating professional memecoin landing pages
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: 'Secure & Reliable',
    description: 'Built with security in mind, ensuring your project is safe and always available.',
    icon: <Shield className="w-8 h-8 text-indigo-600" />
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized for speed with instant previews and rapid deployment.',
    icon: <Zap className="w-8 h-8 text-indigo-600" />
  },
  {
    title: 'Global Reach',
    description: 'Connect with users worldwide through our distributed network.',
    icon: <Globe className="w-8 h-8 text-indigo-600" />
  }
];