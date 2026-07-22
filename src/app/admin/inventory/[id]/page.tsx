"use client";
import { useState, useEffect, use } from "react";
import { ArrowLeft, Upload, X, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import imageCompression from 'browser-image-compression';

const CATEGORIES = ["Cotton Sarees", "Designer Sarees", "Dress Materials", "Kalamkari", "Nighties", "Blouse Bundles", "Handloom Sarees", "Pattu Sarees"];

export default function ProductEditor({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";

  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "", category: "Pattu Sarees", price: "", description: "",
    fabric: "", color: "", sizes: "", sku: "", whatsapp_message: "",
    stock_status: "IN_STOCK", is_featured: false
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    
    const files = Array.from(e.target.files);
    // Limit to remaining slots
    const remainingSlots = 30 - images.length;
    const filesToUpload = files.slice(0, remainingSlots);

    let newImages = [...images];
    for (const file of filesToUpload) {
      try {
        // Compress the image before uploading
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(file, options);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage.from('products').upload(filePath, compressedFile);
        if (!uploadError) {
          const { data } = supabase.storage.from('products').getPublicUrl(filePath);
          newImages.push(data.publicUrl);
        } else {
          alert("Error uploading image: " + uploadError.message);
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        alert("Error compressing image");
      }
    }
    
    setImages(newImages);
    setUploading(false);
  };

  useEffect(() => {
    if (!isNew) {
      const fetchProduct = async () => {
        const { data } = await supabase.from('products').select('*').eq('id', resolvedParams.id).single();
        if (data) {
          setFormData({ ...data, price: data.price.toString() });
          if (data.images) setImages(data.images);
        }
      };
      fetchProduct();
    }
  }, [isNew, resolvedParams.id]);
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const productData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      images
    };

    let error;
    if (isNew) {
      const res = await supabase.from('products').insert([productData]);
      error = res.error;
    } else {
      const res = await supabase.from('products').update(productData).eq('id', resolvedParams.id);
      error = res.error;
    }

    if (error) {
      alert("Error saving product: " + error.message);
      console.error(error);
      setSaving(false);
      return;
    }
    
    window.location.href = "/admin/inventory";
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/inventory" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{isNew ? "Add New Product" : "Edit Product"}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
          
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Product Name <span className="text-red-500">*</span></label>
                <input name="name" value={formData.name} onChange={handleChange} required type="text" placeholder="e.g. Maroon Pure Kanjivaram Silk Saree" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
                <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none bg-white">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price (₹) <span className="text-red-500">*</span></label>
                <input name="price" value={formData.price} onChange={handleChange} required type="number" placeholder="15000" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Detailed description of the saree..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none resize-none"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Fabric</label>
                <input name="fabric" value={formData.fabric} onChange={handleChange} type="text" placeholder="e.g. Pure Kanjivaram Silk" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Color</label>
                <input name="color" value={formData.color} onChange={handleChange} type="text" placeholder="e.g. Maroon & Gold" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Available Sizes</label>
                <input name="sizes" value={formData.sizes} onChange={handleChange} type="text" className="w-full p-3 rounded-md border border-gray-300 focus:border-primary focus:outline-none" placeholder="e.g. Free Size, S, M, L" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Code / SKU</label>
                <input type="text" className="w-full p-3 rounded-md border border-gray-300 focus:border-primary focus:outline-none" placeholder="e.g. SS-KAN-001" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">WhatsApp Order Message (Optional)</label>
                <input type="text" className="w-full p-3 rounded-md border border-gray-300 focus:border-primary focus:outline-none" placeholder="Custom pre-filled message for WhatsApp" />
                <p className="text-xs text-gray-500">If left blank, a standard message will be generated automatically.</p>
              </div>
            </div>
          </div>

          {/* Status & Options */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Status & Visibility</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">SKU (Optional)</label>
                <input name="sku" value={formData.sku} onChange={handleChange} type="text" placeholder="e.g. KANJ-001" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Stock Status</label>
                <select name="stock_status" value={formData.stock_status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none bg-white">
                  <option value="IN_STOCK">In Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                  <input name="is_featured" checked={formData.is_featured} onChange={handleChange} type="checkbox" className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary" />
                  <div>
                    <span className="block font-medium text-gray-900">Featured Product</span>
                    <span className="block text-sm text-gray-500">Display this product prominently on the home page.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-gray-900">Product Images</h3>
              <span className="text-sm text-gray-500">{images.length}/30 Images</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                  <Image src={img} alt="Preview" fill className="object-cover" />
                  <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {images.length < 30 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-red-50 transition-colors cursor-pointer">
                  {uploading ? (
                     <span className="text-sm font-medium animate-pulse">Uploading...</span>
                  ) : (
                    <>
                      <Upload size={24} className="mb-2" />
                      <span className="text-sm font-medium">Upload Image</span>
                      <input type="file" multiple className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    </>
                  )}
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">First image will be used as the thumbnail. Max 30 images allowed.</p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-8 border-t">
            {!isNew ? (
              <button type="button" className="text-red-600 font-medium px-4 py-2 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2">
                <Trash2 size={18} /> Delete Product
              </button>
            ) : <div></div>}
            
            <div className="flex gap-4">
              <Link href="/admin/inventory" className="px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                Cancel
              </Link>
              <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-md font-medium transition-colors flex items-center gap-2">
                <Save size={20} />
                Save Changes
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
