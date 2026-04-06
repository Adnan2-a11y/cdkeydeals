"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Payment method type
export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  logo: React.ReactNode;
}

// Payment methods configuration
const paymentMethods: PaymentMethod[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Credit/Debit Card",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-6" fill="none">
        <path
          d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.44 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"
          fill="#635BFF"
        />
      </svg>
    ),
  },
  {
    id: "helcim",
    name: "Helcim",
    description: "Secure Card Payment",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-6" fill="none">
        <rect width="24" height="24" rx="4" fill="#1A1F71" />
        <path
          d="M6 8h3v8H6V8zm5-2h3v10h-3V6zm5 4h3v6h-3v-6z"
          fill="#00D4AA"
        />
      </svg>
    ),
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Fast & Secure Checkout",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-6" fill="none">
        <path
          d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"
          fill="#003087"
        />
        <path
          d="M21.076 7.164c-.008.043-.016.087-.025.13-1.154 5.932-5.113 7.984-10.166 7.984H8.356a1.248 1.248 0 0 0-1.233 1.056L6.076 23.04a.648.648 0 0 0 .64.748h4.19c.46 0 .85-.334.922-.788l.038-.196.731-4.63.047-.255a.93.93 0 0 1 .92-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.776-4.471a3.71 3.71 0 0 0-1.072-.82l.005.29z"
          fill="#3086C8"
        />
        <path
          d="M19.826 6.612c-.148-.043-.301-.082-.459-.117a5.805 5.805 0 0 0-.508-.085 12.49 12.49 0 0 0-1.596-.098h-4.832a.928.928 0 0 0-.921.788l-1.108 7.01-.032.204a1.248 1.248 0 0 1 1.233-1.056h2.439c4.807 0 8.563-1.953 9.672-7.606.032-.168.06-.332.085-.494a5.958 5.958 0 0 0-.921-.389 6.43 6.43 0 0 0-.252-.077z"
          fill="#003087"
        />
      </svg>
    ),
  },
  {
    id: "fastspring",
    name: "FastSpring",
    description: "Global Payment Solution",
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-6" fill="none">
        <rect width="24" height="24" rx="4" fill="#00A651" />
        <path
          d="M4 12l4-4v8l-4-4zm16 0l-4 4V8l4 4zm-8-4l4 4-4 4V8z"
          fill="white"
        />
      </svg>
    ),
  },
];

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPayment: (method: PaymentMethod) => void;
  selectedPaymentId?: string;
}

export function PaymentModal({
  open,
  onOpenChange,
  onSelectPayment,
  selectedPaymentId,
}: PaymentModalProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    selectedPaymentId
  );

  const handleSelect = (value: string) => {
    setSelectedId(value);
  };

  const handleProceed = () => {
    const selectedMethod = paymentMethods.find((m) => m.id === selectedId);
    if (selectedMethod) {
      onSelectPayment(selectedMethod);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#00d4aa]" />
            Select Payment Method
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-1">
            Choose your preferred payment option to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-4">
          <RadioGroup
            value={selectedId}
            onValueChange={handleSelect}
            className="grid gap-3"
          >
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                htmlFor={method.id}
                className={cn(
                  "relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                  "hover:border-[#00d4aa]/50 hover:bg-[#00d4aa]/5",
                  selectedId === method.id
                    ? "border-[#00d4aa] bg-[#00d4aa]/10 shadow-sm"
                    : "border-gray-200 bg-white"
                )}
              >
                <RadioGroupItem
                  value={method.id}
                  id={method.id}
                  className="sr-only"
                />

                {/* Custom Radio Circle */}
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedId === method.id
                      ? "border-[#00d4aa] bg-[#00d4aa]"
                      : "border-gray-300"
                  )}
                >
                  {selectedId === method.id && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>

                {/* Logo */}
                <div className="flex-shrink-0 w-14 h-8 bg-gray-50 rounded-md flex items-center justify-center border border-gray-100">
                  {method.logo}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>

                {/* Selected Indicator */}
                {selectedId === method.id && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#00d4aa] rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </label>
            ))}
          </RadioGroup>

          {/* Security Badge */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Your payment is secure and encrypted</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <Button
            onClick={handleProceed}
            disabled={!selectedId}
            className={cn(
              "w-full h-12 text-base font-semibold rounded-xl transition-all duration-200",
              selectedId
                ? "bg-[#00d4aa] hover:bg-[#00b894] text-white shadow-lg shadow-[#00d4aa]/25"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            )}
          >
            {selectedId ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Proceed to Pay
              </>
            ) : (
              "Select a Payment Method"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { paymentMethods };
