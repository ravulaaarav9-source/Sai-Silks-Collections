import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Get in Touch</h1>
          <div className="h-1 w-24 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our collections, need styling advice, or want to place an order, our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Visit Our Store</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      217 & 218, Opp. Maruthi Showroom,<br />
                      Beside Vasavi Wholesale Cloth Market,<br />
                      Kakani Road,<br />
                      Guntur – 522001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                    <div className="flex flex-col text-sm text-gray-600">
                      <a href="tel:9642449960" className="hover:text-primary transition-colors">+91 9642449960</a>
                      <a href="tel:9160165609" className="hover:text-primary transition-colors">+91 9160165609</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <FaWhatsapp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">WhatsApp</h4>
                    <a href="https://wa.me/919642449960" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-[#25D366] transition-colors">
                      +91 9642449960
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Business Hours</h4>
                    <p className="text-sm text-gray-600">
                      Monday - Saturday: 10:00 AM - 9:00 PM<br />
                      Sunday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" id="phone" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="+91 9876543210" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="john@example.com" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="Inquiry about Kanjivaram Sarees" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>
                
                <button type="button" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 w-full md:w-auto">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
        </div>

        {/* Map Section */}
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-200">
          <iframe 
            src="https://maps.google.com/maps?q=Kakani%20Road,%20Guntur,%20Andhra%20Pradesh%20522001&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Sai Silks Location Map"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
