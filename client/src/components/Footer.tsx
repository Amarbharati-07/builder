import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-info">
            <h3 className="footer-logo">Luxe Estates</h3>
            <p className="footer-tagline">
              Crafting luxury spaces and sustainable lifestyles for over 25 years.
            </p>
            <div className="social-links">
              <a href="#" className="social-btn">
                <Facebook className="social-icon" />
              </a>
              <a href="#" className="social-btn">
                <Twitter className="social-icon" />
              </a>
              <a href="#" className="social-btn">
                <Instagram className="social-icon" />
              </a>
              <a href="#" className="social-btn">
                <Linkedin className="social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="link-list">
              <li><Link href="/projects"><span className="link-item">All Projects</span></Link></li>
              <li><Link href="/experience"><span className="link-item">Our Story</span></Link></li>
              <li><Link href="/careers"><span className="link-item">Careers</span></Link></li>
              <li><Link href="/news"><span className="link-item">News & Events</span></Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="footer-legal">
            <h4 className="footer-heading">Legal</h4>
            <ul className="link-list">
              <li><a href="#" className="link-item">Privacy Policy</a></li>
              <li><a href="#" className="link-item">Refund Policy</a></li>
              <li><a href="#" className="link-item">RERA Information</a></li>
              <li><a href="#" className="link-item">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact & Awards */}
          <div className="footer-contact">
            <h4 className="footer-heading">Get in Touch</h4>
            <div className="contact-list">
              <a href="tel:+15551234567" className="contact-item group">
                <div className="contact-icon-box">
                  <Phone className="contact-icon" />
                </div>
                +1 (555) 123-4567
              </a>
              <a href="mailto:info@luxeestates.com" className="contact-item group">
                <div className="contact-icon-box">
                  <Mail className="contact-icon" />
                </div>
                info@luxeestates.com
              </a>
              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin className="contact-icon" />
                </div>
                <span>123 Luxury Avenue, Prime City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* CSR & Awards Section */}
        <div className="footer-extra">
          <div className="extra-item">
            <h4 className="extra-heading">CSR & Awards</h4>
            <p className="extra-text">
              Recognized with multiple national awards for excellence in sustainable development and community outreach programs.
            </p>
          </div>
          <div className="extra-item">
            <h4 className="extra-heading">Blogs & Resources</h4>
            <p className="extra-text">
              Explore our curated collection of articles on real estate investment, interior design, and lifestyle trends.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p className="copyright">&copy; 2024 Luxe Estates. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#" className="bottom-link">Sitemap</a>
            <a href="#" className="bottom-link">Contact RERA</a>
            <a href="#" className="bottom-link">Complaints Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
