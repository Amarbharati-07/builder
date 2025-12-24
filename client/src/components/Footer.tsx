import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Luxe Estates</h3>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Crafting luxury spaces and sustainable lifestyles for over 25 years.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/projects"><span className="text-white/70 hover:text-white transition cursor-pointer">All Projects</span></Link></li>
              <li><Link href="/experience"><span className="text-white/70 hover:text-white transition cursor-pointer">Our Story</span></Link></li>
              <li><Link href="/careers"><span className="text-white/70 hover:text-white transition cursor-pointer">Careers</span></Link></li>
              <li><Link href="/news"><span className="text-white/70 hover:text-white transition cursor-pointer">News & Events</span></Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-white/70 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Refund Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">RERA Information</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact & Awards */}
          <div>
            <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <a href="tel:+15551234567" className="flex items-center gap-3 text-white/70 hover:text-white transition group">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary transition">
                  <Phone className="w-4 h-4" />
                </div>
                +1 (555) 123-4567
              </a>
              <a href="mailto:info@luxeestates.com" className="flex items-center gap-3 text-white/70 hover:text-white transition group">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="w-4 h-4" />
                </div>
                info@luxeestates.com
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Luxury Avenue, Prime City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* CSR & Awards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/10">
          <div>
            <h4 className="font-bold text-lg mb-4">CSR & Awards</h4>
            <p className="text-white/70 text-sm">
              Recognized with multiple national awards for excellence in sustainable development and community outreach programs.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Blogs & Resources</h4>
            <p className="text-white/70 text-sm">
              Explore our curated collection of articles on real estate investment, interior design, and lifestyle trends.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; 2024 Luxe Estates. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Sitemap</a>
            <a href="#" className="hover:text-white transition">Contact RERA</a>
            <a href="#" className="hover:text-white transition">Complaints Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
