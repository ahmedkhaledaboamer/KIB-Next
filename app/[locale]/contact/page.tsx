'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
<section
  className="relative min-h-screen overflow-hidden"
  style={{
    paddingTop: 'clamp(8rem, 10vw, 8rem)',      
    paddingBottom: 'clamp(3rem, 8vw, 6rem)',    
    paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
    paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
  }}
>
    {/* Background */}
    <div className="absolute inset-0">
      <img
        src="/images/dd.webp"
        alt="Contact Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-teal-900/80" />
    </div>
  
    {/* Animated Background Elements */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
  
    {/* Content */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center w-full  ">
        
      {/* Left Side - Content */}
<div className="space-y-8 text-white">
  {/* Title */}
  <div className="space-y-4">
    <h1
      className="font-black tracking-tight"
      style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
    >
      CONTACT US
    </h1>
    <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" />
  </div>

  {/* Subtitle */}
  <p
    className="text-gray-300 leading-relaxed"
    style={{ fontSize: 'clamp(1rem, 2.5vw, 2.5rem)' }}
  >
    Reach out to our team for professional guidance and support
  </p>

  {/* Description */}
  <p
    className="text-gray-400 leading-relaxed"
    style={{ fontSize: 'clamp(0.875rem, 2vw, 2.5rem)' }}
  >
    We're here to support you every step of the way. Whether you have questions, need expert guidance, or are ready to start your business journey in the UAE, our team is always available to assist you.
  </p>

  {/* Contact Info Cards */}
  <div className="space-y-4 pt-8">
    {/* Phone */}
    <div className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-teal-400/50">
      <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <Phone className="w-7 h-7 text-white" />
      </div>
      <div>
        <p
          className="text-gray-400 mb-1"
          style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}
        >
          Call Us
        </p>
        <a
          href="tel:+971521068882"
          className="font-bold text-white hover:text-teal-400 transition-colors"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
        >
          +971-521068882
        </a>
      </div>
    </div>

    {/* Email */}
    <div className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50">
      <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <Mail className="w-7 h-7 text-white" />
      </div>
      <div>
        <p
          className="text-gray-400 mb-1"
          style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}
        >
          Email Us
        </p>
        <a
          href="mailto:info@shazmlc.com"
          className="font-bold text-white hover:text-cyan-400 transition-colors break-all"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
        >
          info@shazmlc.com
        </a>
      </div>
    </div>

    {/* Location */}
    <div className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-400/50">
      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <MapPin className="w-7 h-7 text-white" />
      </div>
      <div>
        <p
          className="text-gray-400 mb-1"
          style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}
        >
          Location
        </p>
        <p
          className="font-bold text-white"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
        >
          United Arab Emirates
        </p>
      </div>
    </div>
  </div>
</div>

  
        {/* Right Side - Contact Form with Glassmorphism */}
<div className="relative">
  {/* Glass Card */}
  <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
    {/* Decorative Corner Gradients */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400/30 to-transparent rounded-full blur-2xl" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/30 to-transparent rounded-full blur-2xl" />

    <div className="relative z-10">
      {/* Form Title */}
      <h2
        className="font-bold text-white mb-8 text-center"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
      >
        Contact Us
      </h2>

      {/* Success Message */}
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/50 rounded-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <p
            className="text-green-400 font-semibold"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 2rem)' }}
          >
            Message sent successfully!
          </p>
        </div>
      )}

      {/* Contact Form */}
      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label
            className="block font-semibold text-white mb-2"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 2rem)' }}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1.5rem)' }}
          />
        </div>

        {/* Email Input */}
        <div>
          <label
            className="block font-semibold text-white mb-2"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 2rem)' }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1.5rem)' }}
          />
        </div>

        {/* Message Textarea */}
        <div>
          <label
            className="block font-semibold text-white mb-2"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 2rem)' }}
          >
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help you..."
            rows={5}
            className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all resize-none"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1.35rem)' }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 3rem)' }}
        >
          <span>Send Message</span>
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>

  {/* Decorative Elements */}
  <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" />
  <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
</div>

      </div>
    </div>
  </section>
  
  );
}