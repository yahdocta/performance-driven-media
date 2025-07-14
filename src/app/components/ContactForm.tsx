'use client';

import { useState } from 'react';

interface ContactFormProps {
  submitButtonText: string;
}

export default function ContactForm({ submitButtonText }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budgetRange: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Using Formspree for static site compatibility
      const response = await fetch('https://formspree.io/f/mpwlalob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          budgetRange: formData.budgetRange,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.name}`
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: '',
          budgetRange: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <input
          type="text"
          name="projectType"
          placeholder="Project Type"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <input
          type="text"
          name="budgetRange"
          placeholder="Budget Range"
          value={formData.budgetRange}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors resize-none"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
          Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-8 py-4 text-lg font-bold transition-colors duration-300 ${
          isSubmitting 
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
            : 'bg-red-500 hover:bg-red-600 text-black'
        }`}
      >
        {isSubmitting ? 'Sending...' : submitButtonText}
      </button>
    </form>
  );
} 