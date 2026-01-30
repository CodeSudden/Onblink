import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="w-full bg-gradient-to-b from-blue-50 to-white pt-14 pb-12">
        <div className="mx-auto max-w-5xl px-6 py-12 text-gray-800">
          <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

          <p className="mb-6 text-sm text-gray-500">
            Last updated: January 2026
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
              <p>
                We value your privacy and are committed to protecting your
                personal data in accordance with the Data Privacy Act of 2012
                (Republic Act No. 10173) of the Philippines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
              <p>
                We may collect the following information:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Email address and account details (for registered users)</li>
                <li>Shortened URLs and related metadata</li>
                <li>Click data, timestamps, and basic analytics</li>
                <li>IP address and browser information for security and analytics</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
              <p>
                Your information is used to operate and improve the service,
                provide analytics, prevent abuse, and maintain system security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Cookies and Tracking</h2>
              <p>
                We may use cookies or similar technologies to improve user
                experience, analyze usage, and maintain session security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Data Sharing</h2>
              <p>
                We do not sell or rent personal data. Data may be shared only when
                required by law or to protect the integrity and security of the
                service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary to fulfill
                the purposes outlined in this policy or as required by law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
              <p>
                You have the right to access, correct, or request deletion of your
                personal data, subject to applicable laws and regulations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">8. Security</h2>
              <p>
                We implement reasonable technical and organizational measures to
                protect your data against unauthorized access, loss, or misuse.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
              <p>
                This Privacy Policy may be updated from time to time. Continued use
                of the service indicates acceptance of any changes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">10. Contact</h2>
              <p>
                If you have concerns about this Privacy Policy or your personal
                data, please contact us through the website.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
