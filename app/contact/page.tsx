'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageSquare, HelpCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600">
                Have questions or need assistance? We're here to help.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Mail className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-900 mb-2">
                            Message Sent Successfully!
                          </h3>
                          <p className="text-green-800">
                            Thank you for contacting us. We'll get back to you within 1-2
                            business days.
                          </p>
                          <Button
                            onClick={() => setSubmitted(false)}
                            variant="outline"
                            className="mt-4"
                          >
                            Send Another Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="practitioner">I'm a Practitioner</option>
                          <option value="listing">Update Listing Information</option>
                          <option value="technical">Technical Issue</option>
                          <option value="feedback">Feedback or Suggestion</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="Tell us how we can help..."
                          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>

                      <p className="text-sm text-gray-600">
                        * Required fields. We typically respond within 1-2 business days.
                      </p>
                    </form>
                  )}
                </div>

                {/* Contact Information & FAQs */}
                <div className="space-y-6">
                  {/* Quick Contact Info */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Mail className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Email Support</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            For general inquiries and support
                          </p>
                          <a
                            href="mailto:support@hypnotherapy-finder.com"
                            className="text-blue-600 hover:underline"
                          >
                            support@hypnotherapy-finder.com
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* For Practitioners */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-4">
                        <MessageSquare className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg mb-1">For Practitioners</h3>
                          <p className="text-gray-600 text-sm mb-3">
                            Want to claim your profile, update your information, or get listed
                            in our directory?
                          </p>
                          <a
                            href="mailto:practitioners@hypnotherapy-finder.com"
                            className="text-blue-600 hover:underline"
                          >
                            practitioners@hypnotherapy-finder.com
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Common Questions */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-4">
                        <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg mb-3">
                            Looking for answers?
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Check our FAQ page for quick answers to common questions about
                            hypnotherapy, finding practitioners, and using our directory.
                          </p>
                          <Button asChild variant="outline" size="sm">
                            <a href="/faq">View FAQ</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Report Issue */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Report an Issue</h3>
                          <p className="text-gray-600 text-sm">
                            Found incorrect information in a listing? Notice a technical
                            problem? Let us know and we'll fix it promptly.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Response Time */}
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Our Commitment:</span> We strive to
                      respond to all inquiries within 1-2 business days. For urgent matters
                      regarding incorrect listing information, we typically respond within
                      24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Help */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Other Ways to Get Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="/faq"
                  className="p-6 bg-white border rounded-lg hover:border-blue-600 hover:shadow-md transition text-center"
                >
                  <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">FAQ</h3>
                  <p className="text-gray-600 text-sm">
                    Browse frequently asked questions
                  </p>
                </a>

                <a
                  href="/how-it-works"
                  className="p-6 bg-white border rounded-lg hover:border-blue-600 hover:shadow-md transition text-center"
                >
                  <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                  <p className="text-gray-600 text-sm">
                    Learn about hypnotherapy process
                  </p>
                </a>

                <a
                  href="/search"
                  className="p-6 bg-white border rounded-lg hover:border-blue-600 hover:shadow-md transition text-center"
                >
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Find a Practitioner</h3>
                  <p className="text-gray-600 text-sm">
                    Search our directory
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
