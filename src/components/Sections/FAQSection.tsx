import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    question: 'How do I get started?',
    answer: 'Simply choose a template, customize it with your project details, and publish your landing page in minutes.'
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Yes! Pro and Enterprise plans support custom domain integration.'
  },
  {
    question: 'Is there a free plan?',
    answer: 'Yes, we offer a free starter plan with basic features to help you get started.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and crypto payments.'
  }
];