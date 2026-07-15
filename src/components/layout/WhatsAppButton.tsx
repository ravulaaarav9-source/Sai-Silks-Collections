"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919642449960?text=Hello%20Sai%20Silks%20Collections,%20I'm%20interested%20in%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-bounce hover:animate-none group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-black text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us
      </span>
    </a>
  );
}
