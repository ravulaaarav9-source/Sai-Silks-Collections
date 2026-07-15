import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-background pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-secondary">Sai Silks Collections</h3>
            <p className="text-background/80 mb-6 leading-relaxed">
              "Tradition Woven with Elegance" <br/>
              Premium Collection of Sarees, Dress Materials & Handloom Fabrics for Every Occasion.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Products", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`} className="text-background/80 hover:text-secondary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/admin" className="text-background/60 hover:text-secondary text-sm transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-secondary">Categories</h4>
            <ul className="space-y-3">
              {["Cotton Sarees", "Designer Sarees", "Dress Materials", "Kalamkari", "Pattu Sarees", "Handloom Sarees"].map((cat) => (
                <li key={cat}>
                  <Link href={`/products`} className="text-background/80 hover:text-secondary transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-secondary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-background/80">
                <MapPin className="shrink-0 mt-1 text-secondary" size={20} />
                <span>217 & 218, Opp. Maruthi Showroom, Beside Vasavi Wholesale Cloth Market, Kakani Road, Guntur – 522001</span>
              </li>
              <li className="flex items-center gap-3 text-background/80">
                <Phone className="shrink-0 text-secondary" size={20} />
                <div className="flex flex-col">
                  <a href="tel:9642449960" className="hover:text-secondary transition-colors">9642449960</a>
                  <a href="tel:9160165609" className="hover:text-secondary transition-colors">9160165609</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-background/80">
                <FaWhatsapp className="shrink-0 text-secondary" size={20} />
                <a href="https://wa.me/919642449960" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  +91 9642449960
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Sai Silks Collections. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-background/60">
            <Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
