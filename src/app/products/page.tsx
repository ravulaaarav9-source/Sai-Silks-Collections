"use client";
import { useState, useEffect, Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";

const CATEGORIES = ["All", "Cotton Sarees", "Designer Sarees", "Dress Materials", "Kalamkari", "Nighties", "Blouse Bundles", "Handloom Sarees", "Pattu Sarees"];
const SORTS = ["Latest", "Price: Low to High", "Price: High to Low", "Popular"];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      const matched = CATEGORIES.find(c => 
        c.toLowerCase().replace(' ', '-').includes(categoryParam.toLowerCase())
      );
      if (matched) setSelectedCategory(matched);
    }
  }, [categoryParam]);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.category.toLowerCase().includes(search.toLowerCase()) || 
                          (product.fabric && product.fabric.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    // Latest is already sorted by created_at DESC from supabase
    return 0;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Page Header */}
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our premium range of traditionally woven and modern designer sarees.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Search size={18} /> Search
            </h3>
            <input 
              type="text" 
              placeholder="Search by name, material..." 
              className="w-full p-3 rounded border border-gray-200 focus:outline-none focus:border-primary transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Filter size={18} /> Categories
            </h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category"
                    className="accent-primary w-4 h-4"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  <span className={`transition-colors ${selectedCategory === cat ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-primary'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Sort By</h3>
            <select 
              className="w-full p-3 rounded border border-gray-200 focus:outline-none focus:border-primary transition-colors"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORTS.map((sort) => (
                <option key={sort} value={sort}>{sort}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl animate-pulse">Loading collections...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl mb-4">No products found matching your criteria.</p>
              <button 
                onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                className="text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  key={product.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                >
                  <Link href={`/products/${product.id}`} className="relative h-80 overflow-hidden bg-gray-100 shrink-0">
                    {product.images && product.images.length > 0 ? (
                      <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </Link>
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">{product.category}</p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors mb-2">{product.name}</h3>
                    </Link>
                    
                    <div className="mt-auto flex justify-between items-center pt-4">
                      <div>
                        {product.offerPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-foreground">₹{product.offerPrice.toLocaleString()}</span>
                            <span className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                        )}
                      </div>
                      
                      <a
                        href={`https://wa.me/919642449960?text=Hello%20Sai%20Silks%20Collections,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}%0A%0AImage:%20${encodeURIComponent(product.images?.[0] || 'No Image')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-100 text-green-600 hover:bg-[#25D366] hover:text-white p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                        title="Order on WhatsApp"
                      >
                        <FaWhatsapp size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
