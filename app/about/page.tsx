import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, BookOpen, History, Users, Linkedin, Shield, Heart, MapPin, CheckCircle, PlayCircle, Focus, Eye, Accessibility } from 'lucide-react';

export const metadata = {
  title: 'About Hypnotherapy | History, Science, and Professional Standards',
  description: 'Learn about the history of hypnotherapy, from ancient practices to modern clinical applications. Discover professional certifications and what makes a qualified hypnotherapist.',
  keywords: 'hypnotherapy history, clinical hypnosis, hypnotherapy certification, professional hypnotherapist',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">Our Story</span>
                <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight">
                  Cultivating <span className="text-indigo-700">Clarity</span> and Inner Peace
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-700 font-medium">
                  We've built a sanctuary for those seeking professional guidance. Our platform bridges the gap between expert hypnotherapists and individuals ready for positive, lasting change.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Button asChild className="btn-gradient text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all">
                    <Link href="/search">Find a Therapist</Link>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-6 text-lg font-bold text-gray-700 transition-all hover:bg-gray-50 shadow-md">
                    <PlayCircle className="h-6 w-6 text-indigo-600" />
                    How It Works
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-[500px] w-full overflow-hidden rounded-[3rem] shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-all duration-500 group">
                  <img
                    alt="Professional hypnotherapy session"
                    className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    src="/therapy-session.png"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent z-10"></div>
                  <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/95 p-6 backdrop-blur-md shadow-xl border border-white z-20">
                    <p className="italic text-gray-800 text-lg font-medium">"The mind is a powerful tool. We're here to help you unlock its potential for healing."</p>
                    <p className="mt-2 font-bold text-indigo-700">— Dr. Alisha Vance</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-teal-400 opacity-20 blur-3xl animate-blob"></div>
                <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-yellow-300 opacity-20 blur-3xl animate-blob" style={{ animationDelay: '3s' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Section */}
        <section className="py-24 bg-white lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Our Foundation</h2>
              <p className="mt-6 mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed">
                Grounded in compassion and evidence-based practice, we are redefining the path to mental wellness through the transformative power of hypnotherapy.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex flex-col justify-between rounded-[2.5rem] bg-indigo-900 p-10 text-white lg:p-14 transition-transform hover:scale-[1.01] duration-300 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-100">Our Mission</span>
                  <h3 className="mt-4 text-3xl font-bold">Bridging the Gap</h3>
                  <p className="mt-6 text-lg leading-relaxed text-indigo-100/90">
                    To normalize the use of clinical hypnotherapy and connect individuals with high-quality, compassionate practitioners who facilitate deep healing and sustainable personal growth.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Focus className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">Focused on meaningful outcomes</span>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-[2.5rem] bg-teal-800 p-10 text-white lg:p-14 transition-transform hover:scale-[1.01] duration-300 shadow-xl relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 rounded-full filter blur-3xl opacity-10 -ml-20 -mb-20"></div>
                <div className="relative z-10">
                  <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-100">Our Vision</span>
                  <h3 className="mt-4 text-3xl font-bold">A World of Clarity</h3>
                  <p className="mt-6 text-lg leading-relaxed text-teal-100/90">
                    We envision a future where mental wellness is prioritized, accessible, and free of stigma, where every person has the tools to master their inner world.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Eye className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">Seeing beyond the horizon</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-indigo-50 p-10 text-gray-900 transition-all hover:bg-indigo-100 border border-indigo-100">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md text-indigo-600">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Radical Trust</h3>
                <p className="mt-4 text-gray-700 leading-relaxed font-medium">Every therapist undergoes a rigorous verification process to ensure the highest standards of ethics.</p>
              </div>

              <div className="group relative overflow-hidden rounded-[2.5rem] bg-teal-50 p-10 text-gray-900 transition-all hover:bg-teal-100 border border-teal-100">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md text-teal-600">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Empathy First</h3>
                <p className="mt-4 text-gray-700 leading-relaxed font-medium">We approach mental health with deep sensitivity, fostering a community that is supportive and non-judgmental.</p>
              </div>

              <div className="group relative overflow-hidden rounded-[2.5rem] bg-gray-50 p-10 text-gray-900 transition-all hover:bg-gray-100 border border-gray-200">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md text-gray-600">
                  <Accessibility className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Inclusive Care</h3>
                <p className="mt-4 text-gray-700 leading-relaxed font-medium">We are committed to making therapeutic resources accessible across different cultures and backgrounds.</p>
              </div>
            </div>
          </div>
        </section>

        {/* History Section - Ported Content */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <History className="h-10 w-10 text-indigo-700" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900">The Rich History of Hypnotherapy</h2>
            </div>

            <div className="space-y-12 relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-indigo-200 -z-10 hidden md:block"></div>

              {[
                {
                  title: 'Ancient Roots',
                  content: 'Trance-like states and healing rituals have been documented in ancient civilizations for thousands of years. Egyptian, Greek, and Hindu texts describe sleep temples and healing ceremonies that share similarities with modern hypnotherapy.',
                  time: 'Ancient Era'
                },
                {
                  title: '18th Century - Franz Mesmer',
                  content: 'Austrian physician Franz Mesmer (1734-1815) developed "animal magnetism," believing he could harness magnetic forces to heal patients. While his theories were later disproven, his work laid the foundation for understanding the power of suggestion and the mind-body connection. The term "mesmerize" comes from his name.',
                  time: '1734-1815'
                },
                {
                  title: '19th Century - Scientific Foundation',
                  content: 'Scottish surgeon James Braid (1795-1860) coined the term "hypnosis" and established it as a legitimate area of scientific study. French neurologist Jean-Martin Charcot brought it into mainstream medical practice, influencing Sigmund Freud.',
                  time: '1800s'
                },
                {
                  title: '20th Century - Milton Erickson',
                  content: 'Milton H. Erickson, MD revolutionized hypnotherapy with his innovative techniques. In 1958, both the AMA and APA recognized hypnosis as a valid therapeutic technique.',
                  time: '1900s'
                },
                {
                  title: '21st Century - Evidence-Based',
                  content: 'Modern hypnotherapy is backed by extensive research using brain imaging technology (fMRI, PET scans) that shows measurable changes in brain activity during hypnosis.',
                  time: 'Today'
                }
              ].map((era, idx) => (
                <div key={idx} className="relative md:pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm -z-10 hidden md:block"></div>

                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{era.title}</h3>
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{era.time}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">{era.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Founder - Enhanced Design */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest text-indigo-700">The Visionaries</span>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">People Behind the Platform</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-12 max-w-4xl mx-auto">
              {/* Founder Bio */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-100 to-teal-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-shrink-0 relative">
                    <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-600 to-teal-500 rounded-full blur-md opacity-30"></div>
                    <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white shadow-2xl">
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-5xl font-bold text-gray-400">
                        TS
                      </div>
                    </div>
                    {/* Placeholder Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-3 rounded-full shadow-lg">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Travis Steel</h3>
                    <p className="text-xl text-indigo-700 font-bold mb-6">Founder & Creator of Hypnotherapy Finder</p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                      Travis is passionate about connecting people with effective therapeutic solutions. With a background in modern hypnosis, he understands the transformative power of professional hypnotherapy.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 px-6 py-3 rounded-2xl">
                        <Award className="h-6 w-6 text-indigo-600" />
                        <div>
                          <p className="text-sm font-bold text-gray-900">Certified Modern Hypnosis</p>
                          <p className="text-xs text-gray-600">Institute of Applied Psychology AU</p>
                        </div>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/travis-steel-94596143/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#0077b5] text-white rounded-2xl hover:bg-[#006399] transition-all font-bold shadow-lg shadow-blue-900/10 transform hover:-translate-y-1"
                      >
                        <Linkedin className="h-5 w-5" />
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research & Scientific Evidence */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-16 justify-center text-center">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <BookOpen className="h-10 w-10 text-indigo-700" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900">Scientific Research & Evidence</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Pain Management', content: 'Multiple studies show hypnosis effectively reduces acute and chronic pain. Some patients achieve pain reduction comparable to medication.', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Anxiety & Stress', content: 'Research demonstrates hypnotherapy significantly reduces anxiety symptoms, with effects lasting months after treatment.', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50' },
                { title: 'Irritable Bowel Syndrome', content: 'Gut-directed hypnotherapy is recommended by the ACG, with studies showing 70-80% improvement rates.', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
                { title: 'Smoking Cessation', content: 'Meta-analyses suggest hypnotherapy can be more effective than nicotine replacement therapy alone.', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-xl transition-all hover:border-indigo-100 group">
                  <div className={`mb-6 p-4 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-indigo-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-6 shadow-2xl">
              <Shield className="h-12 w-12 text-indigo-300 flex-shrink-0" />
              <p className="text-lg font-medium">
                <span className="font-extrabold text-indigo-300">Note:</span> While research supports hypnotherapy's effectiveness, individual results vary. Hypnotherapy works best as part of a comprehensive treatment approach. Always consult healthcare providers for medical conditions.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section - Ultimate Design */}
        <section className="py-24 bg-white px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-[3rem] bg-stone-900 px-8 py-20 text-center text-white sm:px-16 shadow-2xl">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-indigo-600 blur-[120px]"></div>
                <div className="absolute -bottom-1/4 -right-1/4 h-full w-full rounded-full bg-teal-500 blur-[120px]"></div>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-8">Your wellness journey starts here.</h2>
                <p className="mx-auto mt-6 max-w-2xl text-xl text-stone-300 font-medium leading-relaxed">
                  Take the first step toward a more balanced life. Join thousands who have found clarity through our directory of world-class hypnotherapists.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-6">
                  <Button asChild size="lg" className="px-12 py-8 bg-white text-stone-900 font-extrabold rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/50 text-xl transform hover:-translate-y-1">
                    <Link href="/search">Find a Therapist Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="px-12 py-8 bg-transparent text-white font-bold rounded-2xl hover:bg-white/10 transition-all border-2 border-white/30 text-xl backdrop-blur-sm">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
