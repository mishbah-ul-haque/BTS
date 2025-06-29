import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, PlayIcon, PauseIcon, StarIcon, CheckIcon, ArrowRightIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { HeartIcon, SparklesIcon, GiftIcon, CameraIcon } from '@heroicons/react/solid';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    const video = document.getElementById('bg-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const services = [
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Wedding Planning",
      description: "Complete wedding coordination from concept to celebration",
      features: ["Venue Selection", "Vendor Coordination", "Timeline Management"]
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "Corporate Events",
      description: "Professional corporate gatherings that leave lasting impressions",
      features: ["Conference Planning", "Team Building", "Product Launches"]
    },
    {
      icon: <GiftIcon className="w-8 h-8" />,
      title: "Private Parties",
      description: "Intimate celebrations tailored to your unique vision",
      features: ["Birthday Parties", "Anniversaries", "Holiday Events"]
    },
    {
      icon: <CameraIcon className="w-8 h-8" />,
      title: "Special Occasions",
      description: "Memorable moments crafted with attention to every detail",
      features: ["Graduations", "Retirement Parties", "Milestone Celebrations"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Bride",
      content: "Behind The Scenes made our wedding absolutely magical. Every detail was perfect!",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "CEO, TechCorp",
      content: "Our product launch was flawless thanks to their incredible attention to detail.",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Emily Rodriguez",
      role: "Event Host",
      content: "They transformed my vision into reality. Couldn't have asked for better service!",
      rating: 5,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const stats = [
    { number: "500+", label: "Events Planned", icon: "🎉" },
    { number: "98%", label: "Client Satisfaction", icon: "⭐" },
    { number: "50+", label: "Trusted Vendors", icon: "🤝" },
    { number: "5", label: "Years Experience", icon: "📅" }
  ];

  return (
    <div className="min-h-screen bg-background font-poppins overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
           style={{
             backgroundColor: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
             backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
             borderBottom: scrollY > 50 ? '1px solid rgba(168, 213, 186, 0.2)' : 'none'
           }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold text-text-dark animate-slide-in-left">
              Behind The Scenes
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 animate-slide-in-right">
              {['Home', 'Services', 'About', 'Testimonials', 'Contact'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-text-dark hover:text-primary transition-all duration-300 hover:scale-110 transform animate-fade-in-down"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-all duration-300 transform hover:scale-110"
            >
              {isMenuOpen ? 
                <XIcon className="w-6 h-6 text-text-dark animate-spin-in" /> : 
                <MenuIcon className="w-6 h-6 text-text-dark animate-bounce-in" />
              }
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-500 ease-out transform ${
            isMenuOpen ? 'max-h-64 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
          } overflow-hidden`}>
            <div className="py-4 space-y-3">
              {['Home', 'Services', 'About', 'Testimonials', 'Contact'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-text-dark hover:text-primary transition-all duration-300 hover:translate-x-2 transform animate-slide-in-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          id="bg-video"
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        >
          <source src="/pcbg2.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent animate-gradient-shift"></div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-semibold mb-6 animate-title-reveal">
            Behind The Scenes
          </h1>
          <p className="text-xl lg:text-2xl mb-8 leading-relaxed animate-subtitle-reveal">
            Creating perfect moments while you enjoy them
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-buttons-reveal">
            <button className="px-8 py-4 bg-accent text-text-dark font-medium rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse-glow">
              Plan Your Event
            </button>
            <button className="px-8 py-4 border-2 border-white/50 text-white font-medium rounded-xl hover:bg-white hover:text-text-dark transition-all duration-300 transform hover:scale-105 backdrop-blur-sm animate-border-dance">
              View Portfolio
            </button>
          </div>
        </div>

        {/* Video Controls */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110 animate-float"
        >
          {isPlaying ? 
            <PauseIcon className="w-6 h-6 text-white" /> : 
            <PlayIcon className="w-6 h-6 text-white" />
          }
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <ChevronDownIcon className="w-8 h-8 text-white/80 animate-pulse" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent/30 rounded-full animate-float-1"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary/20 rounded-full animate-float-2"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-highlight/40 rounded-full animate-float-3"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-highlight/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                id={`stat-${index}`}
                data-animate
                className={`text-center transform transition-all duration-700 ${
                  isVisible[`stat-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } hover:scale-110 animate-counter-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-2 animate-bounce-in" style={{ animationDelay: `${index * 100}ms` }}>
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-semibold text-primary mb-2 animate-number-count">
                  {stat.number}
                </div>
                <div className="text-text-light animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold text-text-dark mb-6 animate-slide-in-up">
              Our Services
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              From intimate gatherings to grand celebrations, we bring your vision to life with meticulous planning and flawless execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                id={`service-${index}`}
                data-animate
                className={`group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                  isVisible[`service-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                } hover:scale-105 animate-card-flip`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl text-white mr-4 group-hover:scale-110 transition-transform duration-300 animate-icon-bounce">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-text-dark group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-text-light mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-text-dark animate-slide-in-right"
                      style={{ animationDelay: `${(index * 200) + (featureIndex * 100)}ms` }}
                    >
                      <CheckIcon className="w-5 h-5 text-accent mr-3 animate-check-mark" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className="mt-6 flex items-center text-primary hover:text-accent transition-colors duration-300 group-hover:translate-x-2 transform">
                  Learn More
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold text-text-dark mb-6 animate-slide-in-up">
              What Our Clients Say
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Don't just take our word for it - hear from the people who've experienced our exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                id={`testimonial-${index}`}
                data-animate
                className={`bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                  isVisible[`testimonial-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } hover:scale-105 animate-testimonial-slide`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 animate-profile-bounce"
                  />
                  <div>
                    <h4 className="font-semibold text-text-dark animate-fade-in-right">
                      {testimonial.name}
                    </h4>
                    <p className="text-text-light text-sm animate-fade-in-right animation-delay-100">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 text-yellow-400 animate-star-twinkle"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                <p className="text-text-dark leading-relaxed animate-fade-in-up animation-delay-300">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-text-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-gradient-shift"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold mb-6 animate-slide-in-up">
              Let's Create Magic Together
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Ready to turn your vision into reality? Get in touch and let's start planning your perfect event.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="animate-slide-in-left">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:bg-white/20"
                  />
                </div>
                <div className="animate-slide-in-right">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:bg-white/20"
                  />
                </div>
              </div>
              
              <div className="animate-fade-in-up animation-delay-200">
                <input
                  type="text"
                  placeholder="Event Type"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:bg-white/20"
                />
              </div>
              
              <div className="animate-fade-in-up animation-delay-400">
                <textarea
                  rows={6}
                  placeholder="Tell us about your vision..."
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 resize-none hover:bg-white/20"
                ></textarea>
              </div>
              
              <div className="text-center animate-fade-in-up animation-delay-600">
                <button className="px-12 py-4 bg-accent text-text-dark font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse-glow">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-accent/20 rounded-full animate-float-1"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-primary/15 rounded-full animate-float-2"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-highlight/25 rounded-full animate-float-3"></div>
      </section>

      {/* Footer */}
      <footer className="bg-text-dark text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-semibold mb-4 animate-fade-in-up">
              Behind The Scenes
            </div>
            <p className="text-white/60 mb-6 animate-fade-in-up animation-delay-200">
              Creating perfect moments while you enjoy them
            </p>
            <div className="flex justify-center space-x-6 animate-fade-in-up animation-delay-400">
              {['Instagram', 'Facebook', 'Twitter', 'LinkedIn'].map((social, index) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/60 hover:text-accent transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {social}
                </a>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-white/40 text-sm animate-fade-in-up animation-delay-600">
              © 2024 Behind The Scenes. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;