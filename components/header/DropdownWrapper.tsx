"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface DropdownWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function DropdownWrapper({
  isOpen,
  onClose,
  children,
  className = "",
}: DropdownWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute top-full left-0 mt-2 z-50 ${className}`}
        >
          {/* The main card container */}
          <div className="bg-[#1A1A1A] text-white rounded-xl shadow-2xl border border-white/5 overflow-hidden min-w-[600px]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
