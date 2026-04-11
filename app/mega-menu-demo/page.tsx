"use client";

import { useState } from "react";

export default function MegaMenuDemo() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mega Menu Demo
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Hover over the "Software" menu item to see the high-fidelity mega menu in action.
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
              <ul className="text-left space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Two-column layout with software categories and detailed content
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Smooth hover transitions with Framer Motion animations
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Blue accent color for active/hover states
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Lucide React icons (Monitor, Palette, Shield, Download)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Professional typography with Inter/system-sans fonts
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Clean white container with shadow-2xl and rounded-xl corners
                </li>
              </ul>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Software Categories</h2>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Microsoft Software</h3>
                  <p className="text-sm text-gray-600">Windows Keys, Office Keys, Project & Visio, SQL Server, Microsoft Server</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Creative & Productivity</h3>
                  <p className="text-sm text-gray-600">Adobe Creative Suite, Graphics Design, Video Editing, Photo Editing, Office Tools</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Security Software</h3>
                  <p className="text-sm text-gray-600">Antivirus, Firewall, VPN Services, Password Managers, Encryption Tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
