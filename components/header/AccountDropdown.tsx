"use client";

import { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";
import { SignInModal } from "@/components/auth/SignInModal";
import { useRouter } from "next/navigation";

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Login Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 font-medium"
      >
        <User className="w-4 h-4" />
        <span>Login</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
          {/* Dropdown Content */}
          <div className="p-4">
            {/* Account Header */}
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                Account
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign In or Create an Account to Unlock All Access
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {/* Create Account Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsSignInModalOpen(true);
                }}
                className="w-full py-2.5 px-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Create Account
              </button>

              {/* Log In Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsSignInModalOpen(true);
                }}
                className="w-full py-2.5 px-3 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold rounded-lg transition-all duration-200 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 dark:text-purple-300"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      <SignInModal
        open={isSignInModalOpen}
        onOpenChange={setIsSignInModalOpen}
      />
    </div>
  );
}