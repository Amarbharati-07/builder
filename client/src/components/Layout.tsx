import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Mail, Instagram, Facebook, Linkedin, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import ChatWidget from "./ChatWidget";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "./EnquiryModal";
import { EnquiryPopup } from "./EnquiryPopup";
import "./Layout.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/news", label: "News" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="layout flex flex-col min-h-screen font-sans text-foreground bg-background">
      {/* Navigation */}
      <header
        className={cn(
          "navbar",
          isScrolled || location !== "/" 
            ? "navbar-scrolled" 
            : "navbar-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/">
            <div className="logo cursor-pointer">
              <span className={cn(
                "logo-text font-serif text-2xl font-bold tracking-widest",
                isScrolled || location !== "/" ? "text-primary" : "text-white"
              )}>
                LUXE ESTATES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "nav-link",
                  location === link.href && "active",
                  !isScrolled && location === "/" && location !== link.href && "text-white/90 hover:text-white"
                )}>
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button 
                variant={isScrolled || location !== "/" ? "default" : "outline"}
                className={cn(
                  "btn btn-call rounded-none px-6 mr-4",
                  !isScrolled && location === "/" && "border-white text-white hover:bg-white hover:text-black hover:border-white"
                )}
              >
                Call: +91 999 000 0000
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant={isScrolled || location !== "/" ? "default" : "outline"}
                className={cn(
                  "btn btn-enquire rounded-none px-6",
                  !isScrolled && location === "/" && "border-white text-white hover:bg-white hover:text-black hover:border-white"
                )}
              >
                Enquire Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="btn-mobile md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled || location !== "/" ? "text-foreground" : "text-white"} />
            ) : (
              <Menu className={isScrolled || location !== "/" ? "text-foreground" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="nav-mobile absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-6 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span 
                  className="nav-link-mobile block text-lg font-medium hover:text-primary cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="main-content flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer footer-container">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="footer-info">
              <h3 className="footer-logo font-serif text-2xl font-bold tracking-widest text-primary mb-6">LUXE ESTATES</h3>
              <p className="footer-text text-white/60 text-sm leading-relaxed mb-6">
                Redefining luxury living with architectural masterpieces that stand the test of time. 
                Experience the pinnacle of elegance and comfort.
              </p>
              <div className="social-links flex space-x-4">
                <a href="#" className="social-link text-white/60 hover:text-primary transition-colors"><Instagram size={20} /></a>
                <a href="#" className="social-link text-white/60 hover:text-primary transition-colors"><Facebook size={20} /></a>
                <a href="#" className="social-link text-white/60 hover:text-primary transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>

            <div className="footer-links">
              <h4 className="footer-title font-serif text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="links-list space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span className="link text-white/60 hover:text-primary transition-colors cursor-pointer text-sm">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-contact">
              <h4 className="footer-title font-serif text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="contact-list space-y-4">
                <li className="contact-item flex items-start space-x-3 text-white/60 text-sm">
                  <MapPin className="icon w-5 h-5 text-primary shrink-0" />
                  <span>123 Luxury Lane, Golden Mile,<br />Beverly Hills, CA 90210</span>
                </li>
                <li className="contact-item flex items-center space-x-3 text-white/60 text-sm">
                  <Phone className="icon w-5 h-5 text-primary shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="contact-item flex items-center space-x-3 text-white/60 text-sm">
                  <Mail className="icon w-5 h-5 text-primary shrink-0" />
                  <span>info@luxeestates.com</span>
                </li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4 className="footer-title font-serif text-lg font-semibold mb-6">Newsletter</h4>
              <p className="newsletter-text text-white/60 text-sm mb-4">Subscribe to receive updates on new launches.</p>
              <div className="newsletter-form flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="input bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary text-white transition-colors rounded-none"
                />
                <Button className="btn btn-subscribe w-full rounded-none bg-primary text-white hover:bg-primary/90">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="footer-bottom mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
            <p className="copyright">&copy; 2024 Luxe Estates. All rights reserved.</p>
            <div className="legal-links flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="legal-link hover:text-white">Privacy Policy</a>
              <a href="#" className="legal-link hover:text-white">Terms of Service</a>
              <a href="#" className="legal-link hover:text-white">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />

      {/* Enquiry Popup - Auto appears every 20 seconds */}
      <EnquiryPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
