import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryPopup({ isOpen, onClose }: EnquiryPopupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: "Enquiry from popup",
        }),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Your details have been submitted!" });
        setName("");
        setEmail("");
        setPhone("");
        onClose();
      } else {
        toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast({ title: "Error", description: "An error occurred. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-slate-950 rounded-lg shadow-2xl max-w-md w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition"
          data-testid="button-close-popup"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-2xl font-serif text-gray-600 dark:text-gray-300 text-center">
            PLEASE ENTER YOUR DETAILS BELOW
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-testid="input-name"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-3 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-amber-600 transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-3 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-amber-600 transition"
              />
            </div>

            {/* Phone Field */}
            <div className="flex gap-3">
              <div className="w-20 border border-gray-300 dark:border-gray-600 rounded px-3 py-3 bg-white dark:bg-slate-900 flex items-center justify-center text-gray-600 dark:text-gray-400 font-medium flex-shrink-0">
                +91
              </div>
              <input
                type="tel"
                placeholder="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                data-testid="input-phone"
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-4 py-3 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-amber-600 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-submit-popup"
          >
            {isLoading ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
