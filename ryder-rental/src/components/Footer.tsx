import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Bike } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
               {/* Logo */}
                      <Link to="/" className="flex items-center gap-2">
                        <img
                          src="/ryder-logo-transparent.png"
                          alt="Ryder"
                          className="h-28 w-auto"
                        />
                      </Link>
            <p className="text-sm text-background/60 mb-4 max-w-xs">
              Electric bike rentals for food delivery professionals across
              Poland.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-background/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-background mb-4 text-sm">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#bikes"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Bikes
                </a>
              </li>
              <li>
                <a
                  href="#offers"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-background mb-4 text-sm">
              Support
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-background mb-4 text-sm">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Warsaw, Poland</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+48 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@ryder.pl</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/40">
          <p>{"© 2026 Ryder. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
}
