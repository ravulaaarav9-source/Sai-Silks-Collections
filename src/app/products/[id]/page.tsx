"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingBag, ArrowLeft, Check, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

export default function ProductDetails() {
  const params = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      const { data } = await supabase.from('products').select('*').eq('id', params.id).single();
      if (data) setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-xl animate-pulse text-gray-500">Loading product details...</div></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex flex-col items-center justify-center"><h1 className="text-2xl font-bold mb-4">Product not found</h1><Link href="/products" className="text-primary hover:underline">Back to products</Link></div>;
  }

  const highlights = [
    { key: "Fabric", value: product.fabric },
    { key: "Color", value: product.color },
    { key: "SKU", value: product.sku },
  ].filter(h => h.value);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-primary font-medium">{product.category}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden bg-gray-100 group cursor-zoom-in">
              {(product.images && product.images.length > 0) ? (
                <Image 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-125" 
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            
            {(product.images && product.images.length > 0) && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-24 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
            </div>

            <div className="mb-6 flex items-center gap-2">
              {product.stock_status === 'in_stock' ? (
                <span className="flex items-center text-green-600 font-medium text-sm">
                  <Check size={16} className="mr-1" /> In Stock - Ready to Ship
                </span>
              ) : (
                <span className="text-red-500 font-medium text-sm">Out of Stock</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <a
              href={`https://wa.me/919642449960?text=Hello%20Sai%20Silks%20Collections,%20I'm%20interested%20in%20this%20product:%20${encodeURIComponent(product.name)}%0A%0AImage:%20${encodeURIComponent((product.images && product.images.length > 0) ? product.images[0] : 'No Image')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-4 rounded-md font-medium transition-all text-lg mb-10 shadow-md hover:shadow-lg"
            >
              <FaWhatsapp size={24} />
              Order on WhatsApp
            </a>

            {/* Product Highlights */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold mb-6 text-foreground font-serif">Product Highlights</h3>
              {highlights.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {highlights.map((highlight: any, idx: number) => (
                    <div key={idx} className="flex flex-col border-b border-gray-100 pb-2">
                      <span className="text-sm text-gray-500">{highlight.key}</span>
                      <span className="font-medium text-foreground">{highlight.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No highlights specified.</p>
              )}
            </div>

          </div>
        </div>



      </div>
    </div>
  );
}
