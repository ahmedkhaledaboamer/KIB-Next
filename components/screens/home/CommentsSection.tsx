'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function CommentsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="p-[5%]">
    <div className="relative   p-[5%] rounded-3xl   flex items-center">
          {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded-3xl ">
        <img
          src="/images/com.webp"
          alt="Background"
          className="w-full h-full object-cover rounded-3xl  "
        />
        <div className="absolute inset-0 bg-[#000]/30 rounded-3xl "  />
      </div>

      {/* Content */}
      <div className="relative z-10   mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Text */}
        <div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Leave a Comment
          </h2>
          <p className="text-2xl text-white/90">
            We'd love to hear your feedback
          </p>
        </div>

        {/* Right Side - Glassmorphism Form */}
        <div className="bg-white/10 backdrop-blur-xl p-8 max-w-4xl rounded-3xl border border-white/20 shadow-2xl space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all"
          />

          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={6}
            className="w-full px-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 focus:outline-none resize-none transition-all"
          />

          <button 
            onClick={handleSubmit}
            className="w-full px-6 py-4 bg-white/90 hover:bg-white text-gray-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
          >
            <span>Send Message</span>
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
    </section>
  );
}