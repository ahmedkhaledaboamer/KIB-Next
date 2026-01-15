
'use client';

import React, { useState, useEffect } from 'react';
import { Send, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

interface Testimonial {
  rating: number;
  total: number;
  text: string;
  author: string;
  position: string;
}

interface CommentResponse {
  Name: string;
  Email: string;
  message: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export default function CommentsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const defaultTestimonials: Testimonial[] = [
    {
      rating: 4.8,
      total: 200,
      text: "The results we've seen after partnering with Bexon are beyond our expectations. They not only understood our vision but also brought new ideas.",
      author: "Ralph Edwards",
      position: "Co. Founder"
    },
    {
      rating: 4.9,
      total: 200,
      text: "Working with this team has been an absolute game-changer for our company. Their innovative approach and dedication to excellence exceeded !",
      author: "Sarah Mitchell",
      position: "CEO"
    },
    {
      rating: 4.7,
      total: 200,
      text: "Professional, creative, and results-driven. They delivered exactly what we needed and more. The entire process was smooth and collaborative.",
      author: "Michael Chen",
      position: "Director"
    }
  ];

  const mapCommentsToTestimonials = (comments: CommentResponse[]): Testimonial[] => {
    if (!comments || comments.length === 0) {
      return defaultTestimonials;
    }
    
    return comments.map((comment) => ({
      rating: 4.8,
      total: comments.length,
      text: comment.message || '',
      author: comment.Name || '',
      position: 'Client'
    }));
  };

  const fetchComments = async () => {
    setIsLoadingComments(true);
    try {
      const response = await fetch('https://shazmlc.cloud/webhook/website-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: 'fetch' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`);
      }

      const responseText = await response.text();
      let comments: CommentResponse[] = [];
      
      if (responseText) {
        try {
          comments = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Error parsing comments response:', parseError);
        }
      }

      if (Array.isArray(comments)) {
        const mappedTestimonials = mapCommentsToTestimonials(comments);
        setTestimonials(mappedTestimonials);
        if (mappedTestimonials.length > 0) {
          setCurrentSlide(0);
        }
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setTestimonials(defaultTestimonials);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
      newTouched[key] = true;
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://shazmlc.cloud/webhook/website-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          command: 'commit'
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      let result;
      const responseText = await response.text();
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          result = responseText;
        }
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
      
      await fetchComments();
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative p-[5%] min-h-screen flex items-center ">
      <div className="relative z-10 p-[5%] rounded-2xl shadow-lg   bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 w-full grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,4vw,3rem)] items-stretch">
        
        {/* Left Side - Form */}
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ 
              border: '1px solid rgba(253, 153, 8, 0.3)',
              backgroundColor: 'rgba(253, 153, 8, 0.05)'
            }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FD9908' }} />
              <span className="text-sm font-semibold" style={{ color: '#FD9908' }}>GET IN TOUCH</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#181d27' }}>
              Drop us a Line Here.
            </h2>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-2xl font-medium mb-2" style={{ color: '#181d27' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-white border rounded-xl placeholder-gray-400 focus:outline-none transition-all shadow-sm ${
                    touched.name && errors.name 
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                  }`}
                  style={{ color: '#181d27' }}
                  placeholder="John Doe"
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-xl text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-2xl font-medium mb-2" style={{ color: '#181d27' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-white border rounded-xl placeholder-gray-400 focus:outline-none transition-all shadow-sm ${
                    touched.email && errors.email 
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                  }`}
                  style={{ color: '#181d27' }}
                  placeholder="john@example.com"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-xl text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-2xl font-medium mb-2" style={{ color: '#181d27' }}>Message here... *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={6}
                className={`w-full px-4 py-3 bg-white border rounded-xl placeholder-gray-400 focus:outline-none resize-none transition-all shadow-sm ${
                  touched.message && errors.message 
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                }`}
                style={{ color: '#181d27' }}
                placeholder="Your message here..."
              />
              {touched.message && errors.message && (
                <p className="mt-1 text-xl text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span className="text-xl">{submitError}</span>
              </div>
            )}

            {/* Success Message */}
            {isSubmitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-xl">Thank you! Your feedback has been sent successfully.</span>
              </div>
            )}

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-4 text-white text-3xl cursor-pointer font-semibold rounded-full transition-all flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#181d27' }}
            >
              {isSubmitting ? (
                <>
                  <span>Sending...</span>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side - Testimonials Slider */}
        <div>
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 relative overflow-hidden shadow-xl h-full flex flex-col">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ backgroundColor: '#FD9908' }}></div>
            
            {/* Slider Container */}
            <div className="relative flex-1 flex flex-col justify-center">
              {isLoadingComments ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#FD9908' }}></div>
                </div>
              ) : testimonials.length > 0 ? (
                <div className="transition-opacity duration-500 flex flex-col h-full justify-between" style={{ opacity: 1 }}>
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-4xl font-semibold mb-2" style={{ color: '#181d27' }}>
                      Client Feedback 
                      <span className="ml-2" style={{ color: '#FD9908' }}>
                        ({testimonials[currentSlide].rating}/out of {testimonials[currentSlide].total})
                      </span>
                    </h3>
                  </div>

                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#FD9908' }}>
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-3xl leading-relaxed mb-8" style={{ color: '#181d27' }}>
                    {testimonials[currentSlide].text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-5xl" style={{ color: '#181d27' }}>
                        {testimonials[currentSlide].author}
                      </div>
                      <div className="text-gray-500 text-3xl">
                        {testimonials[currentSlide].position}
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="w-10 h-10 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" style={{ color: '#181d27' }} />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-colors text-white"
                        style={{ backgroundColor: '#181d27' }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                          currentSlide === index ? 'w-8' : 'w-2 bg-gray-300'
                        }`}
                        style={currentSlide === index ? { backgroundColor: '#181d27' } : {}}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p>No comments available yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}








// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Send, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

// interface Testimonial {
//   rating: number;
//   total: number;
//   text: string;
//   author: string;
//   position: string;
// }

// interface CommentResponse {
//   Name: string;
//   Email: string;
//   postive_message: string;
//   id: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function CommentsSection() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [isLoadingComments, setIsLoadingComments] = useState(true);

//   // Default testimonials as fallback
//   const defaultTestimonials: Testimonial[] = [
//     {
//       rating: 4.8,
//       total: 200,
//       text: "The results we've seen after partnering with Bexon are beyond our expectations. They not only understood our vision but also brought new ideas.",
//       author: "Ralph Edwards",
//       position: "Co. Founder"
//     },
//     {
//       rating: 4.9,
//       total: 200,
//       text: "Working with this team has been an absolute game-changer for our company. Their innovative approach and dedication to excellence exceeded !",
//       author: "Sarah Mitchell",
//       position: "CEO"
//     },
//     {
//       rating: 4.7,
//       total: 200,
//       text: "Professional, creative, and results-driven. They delivered exactly what we needed and more. The entire process was smooth and collaborative.",
//       author: "Michael Chen",
//       position: "Director"
//     }
//   ];

//   // Map API response to testimonial format
//   const mapCommentsToTestimonials = (comments: CommentResponse[]): Testimonial[] => {
//     if (!comments || comments.length === 0) {
//       return defaultTestimonials;
//     }
    
//     return comments.map((comment) => ({
//       rating: 4.8, // Default rating since API doesn't provide it
//       total: comments.length, // Use total comments count
//       text: comment.postive_message || '',
//       author: comment.Name || '',
//       position: 'Client' // Default position since API doesn't provide it
//     }));
//   };

//   // Fetch comments from API
//   const fetchComments = async () => {
//     setIsLoadingComments(true);
//     try {
//       const response = await fetch('https://shazmlc.cloud/webhook/website-feedback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ command: 'fetch' }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch comments: ${response.status}`);
//       }

//       const responseText = await response.text();
//       let comments: CommentResponse[] = [];
      
//       if (responseText) {
//         try {
//           comments = JSON.parse(responseText);
//         } catch (parseError) {
//           console.error('Error parsing comments response:', parseError);
//         }
//       }

//       if (Array.isArray(comments)) {
//         const mappedTestimonials = mapCommentsToTestimonials(comments);
//         setTestimonials(mappedTestimonials);
//         // Reset slide to 0 if we have new data
//         if (mappedTestimonials.length > 0) {
//           setCurrentSlide(0);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//       // Fallback to default testimonials on error
//       setTestimonials(defaultTestimonials);
//     } finally {
//       setIsLoadingComments(false);
//     }
//   };

//   // Fetch comments on component mount
//   useEffect(() => {
//     fetchComments();
//   }, []);

//   // Auto-play slider
//   useEffect(() => {
//     if (testimonials.length === 0) return;
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [testimonials.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const validateField = (name: string, value: string): string => {
//     switch (name) {
//       case 'name':
//         if (!value.trim()) return 'Name is required';
//         if (value.trim().length < 2) return 'Name must be at least 2 characters';
//         return '';
//       case 'email':
//         if (!value.trim()) return 'Email is required';
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
//         return '';
//       case 'message':
//         if (!value.trim()) return 'Message is required';
//         if (value.trim().length < 10) return 'Message must be at least 10 characters';
//         return '';
//       default:
//         return '';
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
//     const error = validateField(name, value);
//     setErrors(prev => ({ ...prev, [name]: error }));
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};
//     const newTouched: Record<string, boolean> = {};

//     Object.keys(formData).forEach(key => {
//       const error = validateField(key, formData[key as keyof typeof formData]);
//       if (error) newErrors[key] = error;
//       newTouched[key] = true;
//     });

//     setErrors(newErrors);
//     setTouched(newTouched);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitError(null);

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Send directly to API from client side with command = commit
//       const response = await fetch('https://shazmlc.cloud/webhook/website-feedback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           command: 'commit'
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text().catch(() => 'Unknown error');
//         throw new Error(`API request failed with status ${response.status}: ${errorText}`);
//       }

//       // Try to parse JSON response
//       let result;
//       const responseText = await response.text();
//       if (responseText) {
//         try {
//           result = JSON.parse(responseText);
//         } catch (parseError) {
//           result = responseText;
//         }
//       }

//       setIsSubmitted(true);
//       setFormData({ name: '', email: '', message: '' });
//       setTouched({});
//       setErrors({});
      
//       // Refetch comments after successful submission
//       await fetchComments();
      
//       // Reset success message after 3 seconds
//       setTimeout(() => {
//         setIsSubmitted(false);
//       }, 3000);
//     } catch (error) {
//       setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
//       console.error('Error submitting feedback:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="relative py-20 px-4 min-h-screen flex items-center bg-[#0a1f1f]">
//       <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,4vw,3rem)] items-stretch">
        
//         {/* Left Side - Form */}
//         <div className="space-y-8">
//           {/* Header */}
//           <div>
//             <div className="inline-flex items-center gap-2 px-4 py-2 border border-teal-500/30 rounded-full mb-6">
//               <div className="w-2 h-2 bg-teal-400 rounded-full" />
//               <span className="text-teal-400 text-sm font-medium">GET IN TOUCH</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
//               Drop us a Line Here.
//             </h2>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name & Email Row */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`w-full px-4 py-3 bg-[#0d2929] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
//                     touched.name && errors.name 
//                       ? 'border-red-500 focus:border-red-500' 
//                       : 'border-gray-700 focus:border-teal-500'
//                   }`}
//                   placeholder="John Doe"
//                 />
//                 {touched.name && errors.name && (
//                   <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                     <AlertCircle className="w-3 h-3" />
//                     {errors.name}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`w-full px-4 py-3 bg-[#0d2929] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
//                     touched.email && errors.email 
//                       ? 'border-red-500 focus:border-red-500' 
//                       : 'border-gray-700 focus:border-teal-500'
//                   }`}
//                   placeholder="john@example.com"
//                 />
//                 {touched.email && errors.email && (
//                   <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                     <AlertCircle className="w-3 h-3" />
//                     {errors.email}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Message */}
//             <div>
//               <label className="block text-sm text-gray-400 mb-2">Message here... *</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 rows={6}
//                 className={`w-full px-4 py-3 bg-[#0d2929] border rounded-lg text-white placeholder-gray-500 focus:outline-none resize-none transition-colors ${
//                   touched.message && errors.message 
//                     ? 'border-red-500 focus:border-red-500' 
//                     : 'border-gray-700 focus:border-teal-500'
//                 }`}
//                 placeholder="Your message here..."
//               />
//               {touched.message && errors.message && (
//                 <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                   <AlertCircle className="w-3 h-3" />
//                   {errors.message}
//                 </p>
//               )}
//             </div>

//             {/* Error Message */}
//             {submitError && (
//               <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 flex items-center gap-2">
//                 <AlertCircle className="w-5 h-5" />
//                 <span className="text-sm">{submitError}</span>
//               </div>
//             )}

//             {/* Success Message */}
//             {isSubmitted && (
//               <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-300 flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5" />
//                 <span className="text-sm">Thank you! Your feedback has been sent successfully.</span>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button 
//               type="submit"
//               disabled={isSubmitting}
//               className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-colors flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <span>Sending...</span>
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 </>
//               ) : (
//                 <>
//                   <span>Send Message</span>
//                   <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Right Side - Testimonials Slider */}
//         <div className="lg:mt-16">
//           <div className="bg-[#0d2929] rounded-3xl p-8 md:p-10 border border-gray-800 relative overflow-hidden">
//             {/* Slider Container */}
//             <div className="relative">
//               {isLoadingComments ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//               ) : testimonials.length > 0 ? (
//                 <div
//                   className="transition-opacity duration-500"
//                   style={{ opacity: 1 }}
//                 >
//                   {/* Header */}
//                   <div className="mb-6">
//                     <h3 className="text-2xl font-semibold text-gray-300 mb-2">
//                       Client Feedback 
//                       <span className="text-white ml-2">
//                         ({testimonials[currentSlide].rating}/out of {testimonials[currentSlide].total})
//                       </span>
//                     </h3>
//                   </div>

//                 {/* Quote Icon */}
//                 <div className="mb-6">
//                   <svg className="w-16 h-16 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
//                   </svg>
//                 </div>

//                 {/* Testimonial Text */}
//                 <p className="text-gray-300 text-lg leading-relaxed mb-8">
//                   {testimonials[currentSlide].text}
//                 </p>

//                 {/* Author Info */}
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-white font-semibold text-lg">
//                       {testimonials[currentSlide].author}
//                     </div>
//                     <div className="text-gray-400 text-sm">
//                       {testimonials[currentSlide].position}
//                     </div>
//                   </div>

//                   {/* Navigation Arrows */}
//                   <div className="flex gap-2">
//                     <button
//                       type="button"
//                       onClick={prevSlide}
//                       className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
//                     >
//                       <ChevronLeft className="w-5 h-5 text-white" />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={nextSlide}
//                       className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
//                     >
//                       <ChevronRight className="w-5 h-5 text-white" />
//                     </button>
//                   </div>
//                 </div>

//                   {/* Progress Dots */}
//                   <div className="flex justify-center gap-2 mt-6">
//                     {testimonials.map((_, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => setCurrentSlide(index)}
//                         className={`h-2 rounded-full transition-all ${
//                           currentSlide === index ? 'w-8 bg-teal-500' : 'w-2 bg-gray-600'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-12 text-gray-400">
//                   <p>No comments available yet.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }