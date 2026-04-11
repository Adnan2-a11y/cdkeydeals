import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 leading-relaxed">

      {/* Header */}
      <div className="border-b pb-8 mb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-foreground">
          Refund Policy
        </h1>
        <p className="text-lg font-semibold text-blue-600">
          CDKeyDeals Return and Refund Policy
        </p>
        <p className="text-sm text-gray-500 italic">
          Effective Date: January 10, 2026
        </p>
      </div>

      {/* Intro */}
      <section className="mb-10 space-y-4">
        <p>
          At <span className="font-bold">CDKeyDeals.com</span>, we sell digital
          products such as Microsoft keys, game keys, gift cards, and other
          instantly delivered items. Because these products are delivered
          electronically and can be accessed immediately, most purchases become
          final once a key or code is delivered and viewed.
        </p>
        <p>
          This return and refund policy explains when you may be eligible for a
          refund, replacement, or store credit. This policy forms part of our
          Terms and Conditions and Privacy Policy.
        </p>
        <p>
          By purchasing from CDKeyDeals.com, you agree to this return and refund
          policy. We may update this policy periodically with an updated
          effective date.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          1) General Rules (Digital Goods)
        </h2>

        <h3 className="font-semibold mb-2">
          Digital products are generally non-refundable
        </h3>
        <p className="mb-4">
          Once a digital key or code is delivered and accessed, viewed, redeemed,
          or activated, the transaction is usually final.
        </p>

        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Change of mind after accessing the code</li>
          <li>Accidental purchase (after viewing)</li>
          <li>Regret after purchase</li>
          <li>Successfully activated or redeemed products</li>
        </ul>

        <h3 className="font-semibold mb-2">
          Why returns are limited for digital items
        </h3>
        <p className="mb-4">
          Digital items cannot be physically returned. Once delivered, they can
          be copied or used, making standard returns impractical.
        </p>

        <h3 className="font-semibold mb-2">Please verify before you buy</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Product title, edition, description</li>
          <li>System requirements and compatibility</li>
          <li>Region restrictions</li>
          <li>Activation instructions</li>
        </ul>

        <p className="mt-4">
          Questions? Email{" "}
          <span className="text-blue-600">support@cdkeydeals.com</span>
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          2) When Refunds or Replacements May Be Approved
        </h2>

        <p className="mb-4">
          Refunds or replacements are approved only in specific cases with proper
          evidence (order details, screenshots, errors).
        </p>

        <div className="space-y-4">

          <div>
            <h3 className="font-semibold">A) Invalid or non-working key</h3>
            <p>
              If verified, we may provide a replacement key or full refund.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">B) Delivery failure</h3>
            <p>
              If not received within 24 hours, we may resend or refund.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">C) Duplicate purchase</h3>
            <p>
              Refund allowed if reported before activation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">D) Unauthorized purchase</h3>
            <p>
              Verified fraud cases may be refunded.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">E) Legal rights</h3>
            <p>
              Local consumer laws will be respected.
            </p>
          </div>

        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10 bg-gray-50 dark:bg-muted p-6 rounded-xl border">
        <h2 className="text-2xl font-bold mb-4">
          3) Non-Refundable Situations
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Activated or redeemed products</li>
          <li>Third-party platform issues</li>
          <li>Bulk/reseller purchases</li>
          <li>Partially used gift cards/subscriptions</li>
          <li>Final sale items</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          4) How to Request a Refund
        </h2>

        <p className="mb-2">
          <strong>Timeframe:</strong> Within 7 days of purchase
        </p>

        <h3 className="font-semibold mb-2">What to include</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Order number</li>
          <li>Email used at checkout</li>
          <li>Product name</li>
          <li>Issue description</li>
          <li>Screenshots (recommended)</li>
        </ul>

        <p>
          Send to:{" "}
          <span className="text-blue-600">support@cdkeydeals.com</span>
        </p>

        <p className="mt-2">Response time: within 48 hours</p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          5) Resolution Options
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Refund (5–10 business days)</li>
          <li>Replacement key</li>
          <li>Store credit</li>
        </ul>

        <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground">
          Some processing fees may not be refundable.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          6) Chargebacks and Disputes
        </h2>
        <p>
          Please contact us before filing a chargeback. Accounts may be suspended
          during investigation if disputes are opened without notice.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          7) Product Warranty
        </h2>
        <p>
          Some products may include a warranty. If a license is revoked after
          activation (not due to misuse), contact support.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          8) Changes to This Policy
        </h2>
        <p>
          We may update this policy anytime. Continued use means acceptance of
          changes.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          9) Contact Us
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

export default RefundPolicy;