import React from 'react';
import { Check } from 'lucide-react';

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your project
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.featured 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white transform scale-105' 
                  : 'bg-white'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                  plan.featured 
                    ? 'bg-white text-indigo-600' 
                    : 'bg-indigo-600 text-white'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: 'Starter',
    price: 0,
    features: [
      'Basic template customization',
      'Standard hosting',
      'Community support'
    ]
  },
  {
    name: 'Pro',
    price: 29,
    featured: true,
    features: [
      'Advanced customization',
      'Premium templates',
      'Priority support',
      'Custom domain'
    ]
  },
  {
    name: 'Enterprise',
    price: 99,
    features: [
      'Unlimited projects',
      'Custom development',
      'Dedicated support',
      'Advanced analytics'
    ]
  }
];