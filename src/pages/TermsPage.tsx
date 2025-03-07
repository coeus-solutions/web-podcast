import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Web Podcast, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of our platform or to products and services available through our platform or from Web Podcast.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Video Upload and Processing</h2>
            <p>Our platform allows you to upload videos for processing. You understand and agree that:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>You must have the right to use and share any content you upload</li>
              <li>Maximum file size for uploads is 100MB</li>
              <li>Only video file formats are accepted</li>
              <li>Processing time may vary based on file size and system load</li>
              <li>We reserve the right to remove any content that violates our terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Token System</h2>
            <p>Our platform operates on a token-based system:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Tokens are required for video processing</li>
              <li>Token costs vary based on video length and processing options</li>
              <li>Unused tokens are non-refundable</li>
              <li>Tokens cannot be transferred between accounts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. User Content</h2>
            <p>When uploading content to Web Podcast, you retain your intellectual property rights. However, you grant us a license to use, modify, perform, display, reproduce, and distribute your content on our platform. You agree not to upload any content that:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Violates any intellectual property rights</li>
              <li>Contains harmful or malicious code</li>
              <li>Includes inappropriate or offensive material</li>
              <li>Violates any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Service Availability</h2>
            <p>While we strive to provide uninterrupted service, we do not guarantee that our services will be available at all times. We may experience hardware, software, or other problems, resulting in service interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or modify our platform at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Account Termination</h2>
            <p>We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activities</li>
              <li>Non-payment of fees</li>
              <li>Extended periods of inactivity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Limitation of Liability</h2>
            <p>Web Podcast shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. This includes, but is not limited to, loss of data, profits, or business opportunities.</p>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              ← Back to Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 