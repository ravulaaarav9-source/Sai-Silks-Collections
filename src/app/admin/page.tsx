"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
      if (count !== null) setTotalProducts(count);
    };
    fetchCount();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link 
          href="/admin/inventory/new"
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-red-50 p-4 rounded-lg text-primary">
            <Package size={32} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
