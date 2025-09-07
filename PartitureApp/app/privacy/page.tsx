import { UniversalHeader } from "@/components/universal-header"
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <UniversalHeader 
        position="sticky"
        showLogo={true}
        navigationItems={[
          { label: "Explore", href: "/explore" },
          { label: "Playlist", href: "/playlist" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile", href: "/profile" },
          { label: "Settings", href: "/settings" },
        ]}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8 text-center">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, upload music
                files, or contact us for support.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information you provide:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Account information (email, username, password)</li>
                <li>Music files and audio recordings you upload</li>
                <li>Sheet music and compositions you create</li>
                <li>Profile information and preferences</li>
                <li>Communications with our support team</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your audio files and generate sheet music</li>
                <li>Enable you to share and discover music within our community</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Public Content:</strong> Music and sheet music you choose to share publicly will be visible to
                  other users
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share information with trusted service providers who assist
                  in operating our platform
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose information when required by law or to protect
                  our rights
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
                100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Control the privacy settings of your shared content</li>
                <li>Opt out of non-essential communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and
                provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@partiture.xyz
                  <br />
                  <strong>Address:</strong> Partiture Privacy Team
                  <br />
                  123 Music Street, Harmony City, HC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
