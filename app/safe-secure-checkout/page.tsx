import React from 'react';

const SafeSecureCheckout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 leading-relaxed">

      {/* Header */}
      <div className="border-b pb-8 mb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-foreground">
          Safe & Secure Checkout
        </h1>
        <p className="text-lg font-semibold text-blue-600">
          CDKeyDeals Secure Checkout Policy
        </p>
        <p className="text-sm text-gray-500 dark:text-muted-foreground italic">
          Effective Date: January 10, 2026
        </p>
      </div>

      {/* Intro */}
      <section className="mb-10 space-y-4">
        <p>
          At <span className="font-bold">CDKeyDeals.com</span>, we prioritize your security
          and peace of mind during every transaction. Our checkout process is designed
          to be fast, secure, and user-friendly, ensuring your digital products are
          delivered safely while protecting your personal and payment information.
        </p>
        <p>
          This Safe & Secure Checkout Policy explains how our instant delivery works,
          delivery timeframes, troubleshooting steps, and our commitment to a secure
          shopping experience. This policy works alongside our Terms and Conditions,
          Privacy Policy, and Refund Policy.
        </p>
        <p>
          By completing a purchase on CDKeyDeals.com, you agree to this checkout policy.
          We may update this policy periodically with an updated effective date.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          1) How Instant Delivery Works
        </h2>

        <p className="mb-4">
          Once your payment is successfully processed, your digital products are delivered
          instantly through two convenient methods:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-2 text-blue-800">
              📧 Email Delivery
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Digital key sent to your checkout email</li>
              <li>Includes activation instructions</li>
              <li>Delivery confirmation included</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold mb-2 text-green-800">
              📱 Account Dashboard
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Access under "My Orders" section</li>
              <li>Available 24/7 after login</li>
              <li>Download anytime, anywhere</li>
            </ul>
          </div>
        </div>

        <h3 className="font-semibold mb-2">What you'll receive</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your digital product key/code</li>
          <li>Step-by-step activation instructions</li>
          <li>Order confirmation and receipt</li>
          <li>Customer support contact information</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          2) Delivery Timeframe
        </h2>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700 mb-2">
              ⚡ Instant Delivery
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-muted-foreground">
              Typically within seconds to 2 minutes
            </p>
          </div>
        </div>

        <h3 className="font-semibold mb-2">Standard delivery times</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Most orders:</strong> 30 seconds - 2 minutes</li>
          <li><strong>Rare delays:</strong> Up to 10 minutes</li>
          <li><strong>Payment verification:</strong> May take 5-15 minutes</li>
        </ul>

        <h3 className="font-semibold mb-2">Factors that may affect delivery</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Payment processor verification</li>
          <li>Email provider filtering</li>
          <li>High volume periods</li>
          <li>First-time customer verification</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-10 bg-yellow-50 p-6 rounded-xl border border-yellow-200">
        <h2 className="text-2xl font-bold mb-4">
          3) If You Don't Receive Your Download Link
        </h2>

        <p className="mb-4">
          Don't worry! Most delivery issues are resolved quickly. Follow these steps:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Step 1: Check Email Folders</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Spam/Junk folder</li>
              <li>Promotions tab (Gmail)</li>
              <li>Updates or Social tabs</li>
              <li>Trash folder (recently deleted)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Step 2: Check Account Dashboard</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Login to your CDKeyDeals account</li>
              <li>Navigate to "My Orders"</li>
              <li>Click on your recent order</li>
              <li>Download your product directly</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Step 3: Contact Support</h3>
            <p>
              If you still haven't received your order after 30 minutes, contact our
              24/7 support team at <span className="text-blue-600">support@cdkeydeals.com</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1">
              Include your order number and email used for purchase
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          4) No Physical Shipping - Digital Only
        </h2>

        <div className="bg-gray-50 dark:bg-muted p-6 rounded-xl border">
          <h3 className="font-semibold mb-3 text-lg">
            🌍 100% Digital Delivery
          </h3>
          
          <p className="mb-4">
            CDKeyDeals specializes in digital products only. We do not ship physical items
            such as boxes, discs, or printed materials.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-card p-4 rounded border">
              <h4 className="font-semibold mb-2 text-green-700">✅ What We Deliver</h4>
              <ul className="text-sm space-y-1">
                <li>Digital product keys</li>
                <li>Download codes</li>
                <li>Activation instructions</li>
                <li>Instant access</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-card p-4 rounded border">
              <h4 className="font-semibold mb-2 text-red-700">❌ What We Don't Ship</h4>
              <ul className="text-sm space-y-1">
                <li>Physical boxes</li>
                <li>CD/DVD discs</li>
                <li>Printed manuals</li>
                <li>USB drives</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-muted-foreground">
            This digital-first approach ensures instant delivery, reduces environmental impact,
            and eliminates shipping costs.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          5) Security & Payment Protection
        </h2>

        <div className="space-y-4">
          <h3 className="font-semibold">🔒 Secure Payment Processing</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>SSL encryption for all transactions</li>
            <li>PCI DSS compliant payment processors</li>
            <li>Multiple payment methods supported</li>
            <li>Fraud detection systems active</li>
          </ul>

          <h3 className="font-semibold">🛡️ Your Protection</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure data storage practices</li>
            <li>Privacy policy compliance</li>
            <li>Safe checkout guarantee</li>
            <li>24/7 monitoring for suspicious activity</li>
          </ul>
        </div>
      </section>

      {/* Section 6 */}
      <section className="mb-10 bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h2 className="text-2xl font-bold mb-4">
          6) Refund Policy for Digital Goods
        </h2>

        <p className="mb-4">
          Due to the nature of digital products, our refund policy is designed to be fair
          while protecting against unauthorized use:
        </p>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold">✅ Refund Eligible</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Invalid or non-working product keys</li>
              <li>Duplicate purchases</li>
              <li>Delivery failures (our error)</li>
              <li>Unauthorized purchases</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">❌ Non-Refundable</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Successfully activated products</li>
              <li>Change of mind after delivery</li>
              <li>Compatibility issues (if clearly stated)</li>
              <li>Regional restriction violations</li>
            </ul>
          </div>
        </div>

        <p className="mt-4 text-sm">
          For detailed refund information, please review our full{" "}
          <span className="text-blue-600 font-semibold">Refund Policy</span>.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          7) Customer Support
        </h2>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
          <p className="font-semibold text-green-800">
            🎯 24/7 Support Available
          </p>
        </div>

        <ul className="space-y-2">
          <li><strong>Email:</strong> <span className="text-blue-600">support@cdkeydeals.com</span></li>
          <li><strong>Live Chat:</strong> Available on our website</li>
          <li><strong>Response Time:</strong> Within 2-4 hours</li>
          <li><strong>Emergency Issues:</strong> Mark as "Urgent" in subject line</li>
        </ul>

        <p className="mt-4 text-sm text-gray-600 dark:text-muted-foreground">
          Our support team is trained to handle delivery issues, payment concerns,
          and technical questions quickly and professionally.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          8) Policy Updates
        </h2>
        <p>
          We may update this Safe & Secure Checkout Policy periodically to reflect
          changes in our processes, security measures, or regulatory requirements.
          Continued use of our services indicates acceptance of any policy changes.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-10 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">
          Contact Us
        </h2>
        <p>Email: <span className="text-blue-600">support@cdkeydeals.com</span></p>
        <p>Support: 24/7 live chat or ticket system</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-muted-foreground">
          27 OLD GLOUCESTER STREET LONDON WC1N 3AX
        </p>
      </section>

    </div>
  );
};

export default SafeSecureCheckout;
