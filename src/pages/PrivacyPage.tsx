import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <p>We collect the following types of information when you use Web Podcast:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Account Information: Name, email address, and password</li>
              <li>Usage Data: Login times, features used, and platform interactions</li>
              <li>Video Content: Videos you upload for processing</li>
              <li>Payment Information: Token purchase history (payment details are processed by our secure payment provider)</li>
              <li>Technical Data: IP address, browser type, device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To provide and maintain our video processing services</li>
              <li>To process your video uploads and generate clips</li>
              <li>To manage your account and token balance</li>
              <li>To communicate service updates and promotional offers</li>
              <li>To improve our platform and user experience</li>
              <li>To detect and prevent fraudulent activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Video Content Processing</h2>
            <p>Regarding your uploaded videos:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>We process videos solely for the purpose of generating clips and highlights</li>
              <li>Original videos are automatically deleted after processing is complete</li>
              <li>Generated clips are stored securely and accessible only to you</li>
              <li>We do not share or use your video content for any other purposes</li>
              <li>You maintain full ownership rights to your content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Security</h2>
            <p>We implement robust security measures to protect your information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Secure cloud storage with industry-standard protection</li>
              <li>Limited employee access to user data</li>
              <li>Regular backup procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Retention</h2>
            <p>We retain your information according to these guidelines:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Account information: As long as your account is active</li>
              <li>Original videos: Deleted immediately after processing</li>
              <li>Generated clips: Until deleted by you or account termination</li>
              <li>Usage data: Up to 12 months for analysis</li>
              <li>Payment records: As required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Privacy Rights</h2>
            <p>You have the following rights regarding your data:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of marketing communications</li>
              <li>Request limitation of data processing</li>
            </ul>
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