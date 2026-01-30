import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <div className="w-full bg-gradient-to-b from-blue-50 to-white pt-28 pb-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: January 2026
          </p>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-12 text-gray-800">
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using this website and its services, you agree to
                comply with and be bound by these Terms and Conditions. If you do
                not agree, please discontinue use of the service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
              <p>
                This platform provides URL shortening and QR code generation
                services. Users may access the service without creating an account.
                Registered users may have access to additional features such as
                link management, analytics, and link history.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Guest and Registered Usage</h2>
              <p>
                Links created without an account may be subject to limitations,
                including expiration, deletion, or lack of analytics. We do not
                guarantee long-term availability of links created by guest users.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Prohibited Activities</h2>
              <p>
                You agree not to use the service for unlawful, harmful, or abusive
                purposes, including but not limited to phishing, malware
                distribution, spam, fraud, or activities that violate applicable
                laws of the Philippines or other jurisdictions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
              <p>
                All content, branding, and system functionality on this website
                are owned by the service operator unless otherwise stated. You may
                not copy, modify, or distribute any part of the service without
                prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
              <p>
                The service is provided on an “as is” and “as available” basis. We
                are not liable for any loss, damages, or interruptions resulting
                from the use or inability to use the service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
              <p>
                We reserve the right to suspend or terminate access to the service
                at any time, without prior notice, if these Terms are violated.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and interpreted in accordance
                with the laws of the Republic of the Philippines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
              <p>
                If you have questions regarding these Terms, you may contact us
                through the website.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
