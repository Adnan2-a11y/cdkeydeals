import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 leading-relaxed">
      
      {/* Header */}
      <div className="border-b pb-8 mb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-foreground">
          Shipping Policy
        </h1>
        <p className="text-lg font-semibold text-blue-600">
          CDKeyDeals Shipping Policy
        </p>
        <p className="text-sm text-gray-500 italic">
          Effective Date: January 10, 2026
        </p>
      </div>

      {/* Intro */}
      <section className="mb-10 space-y-4">
        <p>
          At <span className="font-bold">CDKeyDeals.com</span>, we sell digital-only
          products such as genuine Microsoft keys, game keys, gift cards, and other
          downloadable codes. That means there are no physical parcels, no couriers,
          and no waiting on delivery trucks. Instead, your purchase is delivered
          electronically—fast, secure, and accessible anytime.
        </p>
        <p>
          This CDKeyDeals Shipping Policy explains how our digital delivery works,
          typical delivery times, and what to do if you ever run into an issue. This
          policy is also connected to our Terms and Conditions, Refund Policy, and
          Privacy Policy. By placing an order, you agree to this Shipping Policy.
        </p>
        <p>
          We may update this page occasionally, and we will revise the effective
          date when changes are made.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          1) How Digital Delivery Works (No Physical Shipping)
        </h2>

        <p className="mb-4">
          The CDKeyDeals Shipping Policy is simple: all products are delivered digitally.
        </p>

        <h3 className="font-semibold mb-2">Instant delivery method</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>By email to the address used at checkout</li>
          <li>Inside your account dashboard under “My Orders”</li>
        </ul>

        <h3 className="font-semibold mb-2">What you receive</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>The digital key/code</li>
          <li>Activation or redemption instructions (Steam, Microsoft, Xbox, etc.)</li>
          <li>Relevant guides or links if needed</li>
        </ul>

        <h3 className="font-semibold mb-2">No physical items</h3>
        <p className="mb-4">
          We do not ship boxes, discs, or printed codes. No USPS, UPS, DHL, or other carriers.
        </p>

        <h3 className="font-semibold text-green-700 mb-2">
          Digital-first, eco-friendly
        </h3>
        <p>
          Everything is electronic, reducing waste and ensuring instant delivery.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          2) Delivery Timelines (What to Expect)
        </h2>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
            <p><strong>Typical:</strong> Seconds to a few minutes</p>
            <p><strong>Rare cases:</strong> Up to 5–10 minutes</p>
          </div>

          <h3 className="font-semibold">Email delivery tips</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Check Spam/Junk/Promotions</li>
            <li>Verify your email address</li>
            <li>Check “My Orders” dashboard</li>
          </ul>

          <p>
            Delivery is global and 24/7. Some products may be region-locked
            (EU/US specific), so always check product details.
          </p>

          <p>
            Pre-orders are delivered on the official release date or when suppliers allow.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10 bg-gray-50 dark:bg-muted p-6 rounded-xl border">
        <h2 className="text-2xl font-bold mb-4">
          3) Shipping Fees (Digital Delivery Is Free)
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <li className="bg-white dark:bg-card p-3 rounded shadow">No shipping fees</li>
          <li className="bg-white dark:bg-card p-3 rounded shadow">No handling fees</li>
          <li className="bg-white dark:bg-card p-3 rounded shadow">No extra charges</li>
        </ul>

        <p className="mt-4">
          Final price = product price + applicable taxes (if required).
        </p>

        <p className="mt-2">
          VAT or local taxes may apply depending on your country.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          4) Delivery Problems & How We Fix Them
        </h2>

        <h3 className="font-semibold mb-2">If you didn’t receive your key</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Check Spam/Junk folder</li>
          <li>Check “My Orders”</li>
          <li>Confirm your email address</li>
        </ul>

        <p className="mb-4">
          Contact support within 24 hours if still missing.
        </p>

        <h3 className="font-semibold mb-2">Technical delays</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Email provider blocking</li>
          <li>Internet/device issues</li>
          <li>Payment verification delays</li>
        </ul>

        <h3 className="font-semibold mb-2">Invalid email</h3>
        <p className="mb-4">
          Orders may be canceled if email is invalid.
        </p>

        <h3 className="font-semibold mb-2">Refunds</h3>
        <p>
          If delivery fails due to our error, we replace or refund as per policy.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          5) Tracking Your Order
        </h2>
        <p className="mb-2">No courier tracking is needed.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Check “My Orders” dashboard</li>
          <li>Check order confirmation email</li>
        </ul>
        <p className="mt-2">Support available 24/7 via chat or tickets.</p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          6) Updates to This Policy
        </h2>
        <p>
          We may update this policy anytime. Continued use means acceptance of changes.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          7) Contact Us
        </h2>
        <p>Email: <span className="text-blue-600">support@cdkeydeals.com</span></p>
        <p>Support: 24/7 live chat or ticket system</p>
        <p className="mt-2 text-sm text-gray-500">
          27 OLD GLOUCESTER STREET LONDON WC1N 3AX
        </p>
      </section>

    </div>
  );
};

export default ShippingPolicy;