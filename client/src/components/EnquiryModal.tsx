import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
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
          message: "Enquiry from modal popup",
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white dark:bg-slate-950 border-0">
        <DialogHeader className="relative text-center pb-6">
          <h2 className="text-2xl font-serif text-gray-400 dark:text-gray-300">
            PLEASE ENTER YOUR DETAILS BELOW
          </h2>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 text-amber-600 hover:text-amber-700 transition"
            data-testid="button-close-enquiry"
          >
            <X className="w-8 h-8" />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-testid="input-name"
            className="border-gray-300 text-gray-600 placeholder:text-gray-400"
          />

          <Input
            type="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-testid="input-email"
            className="border-gray-300 text-gray-600 placeholder:text-gray-400"
          />

          <div className="flex gap-2">
            <div className="w-20 border border-gray-300 rounded px-3 py-2 bg-white dark:bg-slate-900 flex items-center text-gray-600">
              <span>+91</span>
            </div>
            <Input
              type="tel"
              placeholder="Contact Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              data-testid="input-phone"
              className="flex-1 border-gray-300 text-gray-600 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-start gap-3 py-2">
            <input
              type="checkbox"
              id="consent"
              defaultChecked
              className="mt-1"
              data-testid="checkbox-consent"
            />
            <label htmlFor="consent" className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
              By opting in, you consent to receive service updates, offers, and alerts via RCS, SMS, and email.
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 mt-6"
            data-testid="button-submit-enquiry"
          >
            {isLoading ? "SUBMITTING..." : "SUBMIT"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
