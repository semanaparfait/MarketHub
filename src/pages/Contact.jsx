import React from 'react';
import { useState } from 'react';

export default function Contact() {
  const [contactMethod, setContactMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && contactMethod && (contactMethod === 'phone' ? phoneNumber : email)) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h1>
        
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            Thank you! We'll contact you soon.
          </div>
        )}

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          
            />
          </div>

          {/* Contact Method */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Preferred Contact Method *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={contactMethod === 'phone'}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="mr-2"
                />
                Phone
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={contactMethod === 'email'}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="mr-2"
                />
                Email
              </label>
            </div>
          </div>

          {/* Phone Number Field */}
          {contactMethod === 'phone' && (
            <div className="animate-fadeIn">
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               
              />
            </div>
          )}

          {/* Email Field */}
          {contactMethod === 'email' && (
            <div className="animate-fadeIn">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             
              />
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us more about your needs..."
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Submit Contact Request
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Other Ways to Reach Us
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>📞 Phone: +250 782 324 912</p>
            <p>📧 Email: mgshspr@gmail.com</p>
            <p>🏢 Address: 123 Business St, Suite 100</p>
          </div>
        </div>
      </div>
    </div>
  );
}