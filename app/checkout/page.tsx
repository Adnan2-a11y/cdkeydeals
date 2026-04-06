"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, Lock, Truck, CreditCard, Plus, Check, Shield, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PaymentModal, PaymentMethod, paymentMethods } from "@/components/checkout/PaymentModal";

// Types for form data
interface CheckoutFormData {
  email: string;
  phone: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  deliveryPhone: string;
}

interface FormErrors {
  [key: string]: string;
}

// Country options
const countries = [
  { value: "BD", label: "Bangladesh" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "IN", label: "India" },
  { value: "PK", label: "Pakistan" },
];

// Shipping methods
const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 0,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 150,
  },
];

export default function CheckoutPage() {
  const { state } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    phone: "",
    country: "BD",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    deliveryPhone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  
  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  const subtotal = state.totalPrice;
  const shippingCost = selectedShipping === "express" ? 150 : 0;
  const total = subtotal + shippingCost - appliedDiscount;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    if (!formData.deliveryPhone.trim()) {
      newErrors.deliveryPhone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;
    
    setIsApplyingDiscount(true);
    // Simulate discount application
    setTimeout(() => {
      if (discountCode.toLowerCase() === "save10") {
        setAppliedDiscount(subtotal * 0.1);
      } else {
        setAppliedDiscount(0);
      }
      setIsApplyingDiscount(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid - would normally proceed to payment
      console.log("Form submitted:", formData);
    }
  };

  // If cart is empty, show empty state
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#00d4aa] text-white font-medium rounded-lg hover:bg-[#00b894] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm">Back to cart</span>
            </Link>
            <Link href="/" className="text-xl font-bold text-gray-900">
              CDKeyDeals
            </Link>
            <div className="flex items-center text-gray-600">
              <Lock className="w-4 h-4 mr-1" />
              <span className="text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact
                </h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Delivery
                </h2>
                <div className="space-y-4">
                  {/* Country Select */}
                  <div>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>

                  {/* Apartment */}
                  <div>
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.apartment}
                      onChange={(e) =>
                        handleInputChange("apartment", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* City and Postal Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Postal code"
                        value={formData.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all ${
                          errors.postalCode ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.deliveryPhone}
                      onChange={(e) =>
                        handleInputChange("deliveryPhone", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all ${
                        errors.deliveryPhone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.deliveryPhone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.deliveryPhone}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Shipping Method Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Shipping method
                </h2>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedShipping === method.id
                          ? "border-[#00d4aa] bg-[#00d4aa]/5"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={() => setSelectedShipping(method.id)}
                          className="w-4 h-4 text-[#00d4aa] border-gray-300 focus:ring-[#00d4aa]"
                        />
                        <div className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {method.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="font-medium text-gray-900">
                        {method.price === 0
                          ? "Free"
                          : `৳${method.price.toLocaleString()}`}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Payment Section */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Payment Method
                </h2>
                
                {selectedPayment ? (
                  // Selected Payment Method Display
                  <div className="space-y-4">
                    <div className="relative bg-gradient-to-r from-[#00d4aa]/10 to-[#00b894]/10 border-2 border-[#00d4aa] rounded-xl p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-8 bg-white rounded-md flex items-center justify-center border border-gray-100 shadow-sm">
                          {paymentMethods.find(m => m.id === selectedPayment.id)?.logo}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{selectedPayment.name}</p>
                          <p className="text-sm text-gray-500">{selectedPayment.description}</p>
                        </div>
                        <div className="w-6 h-6 bg-[#00d4aa] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Payment Benefits */}
                      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#00d4aa]/20">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Shield className="w-4 h-4 text-[#00d4aa]" />
                          <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Clock className="w-4 h-4 text-[#00d4aa]" />
                          <span>Instant Delivery</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Change Payment Button */}
                    <button
                      type="button"
                      onClick={() => setIsPaymentModalOpen(true)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Change Payment Method
                    </button>
                  </div>
                ) : (
                  // Add Payment Method Button
                  <button
                    type="button"
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-[#00d4aa] hover:text-[#00d4aa] hover:bg-[#00d4aa]/5 transition-all flex items-center justify-center gap-2 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#00d4aa]/10 flex items-center justify-center transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span>Add Payment Method</span>
                  </button>
                )}
              </section>

              {/* Pay Now Button - Mobile Only */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={!selectedPayment}
                  className={`w-full py-4 font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                    selectedPayment
                      ? "bg-[#00d4aa] text-white hover:bg-[#00b894] shadow-lg shadow-[#00d4aa]/25"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  {selectedPayment ? `Pay with ${selectedPayment.name}` : "Select Payment Method"}
                </button>
              </div>

              {/* Footer Links */}
              <footer className="pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <Link href="/refund-policy" className="hover:text-gray-900">
                    Refund policy
                  </Link>
                  <Link href="/shipping-policy" className="hover:text-gray-900">
                    Shipping policy
                  </Link>
                  <Link href="/privacy-policy" className="hover:text-gray-900">
                    Privacy policy
                  </Link>
                  <Link href="/terms-of-service" className="hover:text-gray-900">
                    Terms of service
                  </Link>
                </div>
              </footer>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-gray-50 rounded-lg p-6 lg:sticky lg:top-8">
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xs text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </p>
                      {item.category && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.category}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          ৳{item.price.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  disabled={!discountCode.trim() || isApplyingDiscount}
                  className="px-4 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedDiscount > 0 && (
                <p className="text-sm text-green-600 mb-4">
                  Discount applied: -৳{appliedDiscount.toLocaleString()}
                </p>
              )}

              {/* Order Summary */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shippingCost === 0 ? "Free" : `৳${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">
                      -৳{appliedDiscount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 mr-1">BDT</span>
                    <span className="text-xl font-bold text-gray-900">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pay Now Button - Desktop */}
              <div className="hidden lg:block mt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!selectedPayment}
                  className={`w-full py-4 font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                    selectedPayment
                      ? "bg-[#00d4aa] text-white hover:bg-[#00b894] shadow-lg shadow-[#00d4aa]/25"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  {selectedPayment ? `Pay ৳${total.toLocaleString()} with ${selectedPayment.name}` : "Select Payment Method"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSelectPayment={setSelectedPayment}
        selectedPaymentId={selectedPayment?.id}
      />
    </div>
  );
}
