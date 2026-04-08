"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#00d4aa]/10 to-[#00d4aa]/5 dark:from-[#00d4aa]/5 dark:to-[#00d4aa]/2">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#00d4aa]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#00d4aa]" />
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground dark:text-gray-400 mb-6">
            Get the latest deals, new arrivals, and exclusive offers delivered
            straight to your inbox.
          </p>

          {isSubmitted ? (
            <div className="bg-[#00d4aa]/20 border border-[#00d4aa]/30 rounded-lg p-4">
              <p className="text-[#00d4aa] font-medium">
                Thanks for subscribing! Check your email for exclusive deals.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-card dark:bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa] transition-colors"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#00d4aa] hover:bg-[#00b894] text-white font-semibold rounded-lg transition-colors shrink-0"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground dark:text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
}
