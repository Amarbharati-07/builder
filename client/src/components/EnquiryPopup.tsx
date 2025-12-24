import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
];

export function EnquiryPopup({ isOpen, onClose }: EnquiryPopupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to India
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
          phone: `${selectedCountry.code}${phone}`,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-950 rounded-lg shadow-2xl w-full max-w-sm overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition z-10"
          data-testid="button-close-popup"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <h2 className="text-xl sm:text-2xl font-serif text-gray-600 dark:text-gray-300 text-center pr-8">
            PLEASE ENTER YOUR DETAILS BELOW
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="space-y-3">
            {/* Name Field */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-testid="input-name"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2.5 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-amber-600 transition box-border text-sm"
            />

            {/* Email Field */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="input-email"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2.5 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-amber-600 transition box-border text-sm"
            />

            {/* Phone Field */}
            <div className="flex gap-2 w-full min-w-0">
              <select
                value={selectedCountry.code}
                onChange={(e) => {
                  const country = countries.find(c => c.code === e.target.value && c.name === e.target.selectedOptions[0]?.dataset.country);
                  if (country) setSelectedCountry(country);
                }}
                data-testid="select-country"
                className="border border-gray-300 dark:border-gray-600 rounded px-2 py-2.5 bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 font-medium focus:outline-none focus:border-amber-600 transition cursor-pointer box-border text-xs flex-shrink-0 whitespace-nowrap"
              >
                {countries.map((country) => (
                  <option key={`${country.code}-${country.name}`} value={country.code} data-country={country.name}>
                    {country.flag} {country.name} ({country.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                data-testid="input-phone"
                className="flex-1 min-w-0 border border-gray-300 dark:border-gray-600 rounded px-3 py-2.5 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-amber-600 transition box-border text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-5 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            data-testid="button-submit-popup"
          >
            {isLoading ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
