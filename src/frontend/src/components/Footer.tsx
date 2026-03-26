import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Mail, Smartphone, Youtube } from "lucide-react";
import { SiX } from "react-icons/si";

const FOOTER_LINKS = {
  Shop: ["Phones", "Accessories", "Deals", "New Arrivals", "Brands"],
  Help: ["FAQ", "Shipping Info", "Returns", "Track Order", "Contact Us"],
  Company: ["About Us", "Careers", "Press", "Blog", "Privacy Policy"],
};

const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "PayPal",
  "Apple Pay",
  "Google Pay",
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-shop-footer text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PhoneHQ</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Your one-stop destination for the latest smartphones and
              accessories from top brands worldwide.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="/"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                      data-ocid={`footer.${section.toLowerCase()}.${link.toLowerCase().replace(/ /g, "_")}.link`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Stay in the Loop
            </h4>
            <p className="text-sm text-white/60 mb-3">
              Get the latest deals and phone news delivered to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-primary"
                data-ocid="footer.newsletter.input"
              />
              <Button type="submit" data-ocid="footer.newsletter.submit_button">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-2">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="text-xs bg-white/10 px-2 py-1 rounded text-white/60"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
