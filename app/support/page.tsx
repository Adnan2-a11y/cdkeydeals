import Link from "next/link";

export default function HelpSupportPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-muted-foreground mb-8">
          <Link href="/" className="hover:text-gray-700 dark:text-muted-foreground transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-foreground font-medium">Help & Support for CDKeyDeals 24/7</span>
        </nav>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-foreground mb-4">
          Help & Support for CDKeyDeals 24/7
        </h1>
        
        {/* Sub-headline */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-12">
          Your trusted partner for digital gaming and software solutions
        </h2>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section 1: The Urgency of Digital */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
              The Urgency of Digital
            </h3>
            <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mb-6">
              In today's fast-paced digital world, immediate access to software and games is essential. 
              We understand that you need your digital products instantly, which is why we've streamlined 
              our delivery system to provide you with keys and codes within minutes of purchase.
            </p>
            <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
              Whether you're a gamer eager to jump into the latest release or a professional needing 
              software for a critical project, our 24/7 support ensures you're never left waiting.
            </p>
          </section>

          {/* Section 2: Expertise at Your Fingertips */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
              Expertise at Your Fingertips
            </h3>
            <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mb-6">
              Our support team consists of digital product specialists with extensive knowledge of 
              gaming platforms, software licensing, and payment systems. We're here to help you 
              navigate any challenges you might encounter.
            </p>
            <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
              From technical troubleshooting to guidance on product compatibility, our experts are 
              available around the clock to provide you with accurate, helpful solutions.
            </p>
          </section>

          {/* Section 3: A Pillar of Trust */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
              A Pillar of Trust
            </h3>
            <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mb-6">
              Trust is the foundation of our service. We've built our reputation on reliable deliveries, 
              secure transactions, and transparent communication. When you choose CDKeyDeals, you're 
              choosing a partner committed to your satisfaction.
            </p>
            <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
              Our commitment to excellence extends beyond the purchase – we're here to ensure your 
              complete satisfaction with every product and service we provide.
            </p>
          </section>

          {/* Support Categories */}
          <section className="bg-gray-50 dark:bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-6">
              How We Can Help
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-foreground">Key Activation</h4>
                <ul className="space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>• Step-by-step activation guides</li>
                  <li>• Platform-specific instructions</li>
                  <li>• Troubleshooting invalid keys</li>
                  <li>• Regional compatibility checks</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-foreground">Troubleshooting</h4>
                <ul className="space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>• Download and installation issues</li>
                  <li>• Error code resolution</li>
                  <li>• Performance optimization</li>
                  <li>• System requirement verification</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-foreground">Payment</h4>
                <ul className="space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>• Payment method assistance</li>
                  <li>• Transaction status inquiries</li>
                  <li>• Refund and return policies</li>
                  <li>• Currency and pricing questions</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 dark:text-foreground">Product Info</h4>
                <ul className="space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>• Product specifications</li>
                  <li>• Compatibility information</li>
                  <li>• Release dates and updates</li>
                  <li>• Feature explanations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              Our support team is available 24/7 to help you with any questions or concerns.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Contact Support Now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
