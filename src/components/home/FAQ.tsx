
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the MVP development process work?",
      answer: "Our MVP development follows a structured 4-step process: 1) Submit your idea through our detailed form, 2) Receive an auto-generated demo document with requirements and mockups, 3) Track development progress with milestone updates, 4) Final delivery with deployment and documentation. Throughout the process, you'll have direct communication with our development team and can provide feedback at each milestone."
    },
    {
      question: "What's included in the website and 3D brand packages?",
      answer: "Our website packages include template selection, custom configuration, payment gateway integration, domain setup, SSL certificates, and ongoing support. 3D brand experiences additionally include WebGL optimization, interactive elements, brand storytelling features, and performance optimization for all devices. Both packages include deployment assistance and technical documentation."
    },
    {
      question: "How do milestone payments work?",
      answer: "Payments are divided into milestones based on project complexity. Typically: 30% upon project initiation, 40% at development completion, and 30% upon final delivery. For larger projects, we may have additional interim milestones. You only pay when each milestone is completed to your satisfaction, ensuring you're always protected."
    },
    {
      question: "Do you provide domain management services?",
      answer: "Yes! We offer comprehensive domain management including domain search and purchase, DNS configuration, SSL certificate installation, and ongoing technical support. You maintain full ownership of your domain while we handle all the technical complexities. We also provide white-label domain management for agencies."
    },
    {
      question: "What kind of support do you provide after launch?",
      answer: "We provide 30 days of free support after launch, including bug fixes, minor adjustments, and technical assistance. Extended support packages are available for ongoing maintenance, updates, and feature additions. We also offer training sessions to help you manage your platform independently."
    },
    {
      question: "How do you protect my ideas and data?",
      answer: "We take security seriously. All projects are covered by comprehensive NDAs before any work begins. Our development environment uses enterprise-grade security, encrypted communications, and secure code repositories. Your intellectual property remains yours throughout the entire process."
    },
    {
      question: "Can I make changes during development?",
      answer: "Absolutely! Our milestone-based approach allows for feedback and revisions at each stage. Minor adjustments are included in the project scope, while major changes may require scope adjustments. We maintain transparent communication about any scope changes and their impact on timeline and cost."
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern, scalable technologies including React, Node.js, Next.js for web development, Three.js and WebGL for 3D experiences, and cloud infrastructure for reliable hosting. For mobile apps, we utilize React Native and Flutter. All our solutions are built with performance, security, and scalability in mind."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our services and process
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-gray-200 hover:border-blue-300 transition-colors duration-300">
              <CardContent className="p-0">
                <button
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
