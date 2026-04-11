"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface MegaMenuWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * MegaMenuWrapper - Provides full-width dropdown container
 *
 * This component solves the dropdown layout issue by:
 * 1. Using fixed positioning to break out of container constraints
 * 2. Calculating proper top position based on navbar element
 * 3. Providing full viewport width with internal content alignment
 * 4. Handling proper z-index and overflow management
 */
export default function MegaMenuWrapper({
  isOpen,
  onClose,
  children,
  className = ""
}: MegaMenuWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle escape key and outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll when dropdown is open
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.addEventListener('touchmove', preventScroll, { passive: false });
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop to dim the page content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/60 z-40 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Full-width dropdown container */}
          <motion.div
            ref={wrapperRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-0 right-0 top-[64px] z-50 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-2xl"
            style={{
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto'
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
