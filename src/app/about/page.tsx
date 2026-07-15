import Image from "next/image";
import { Star, ShieldCheck, Clock, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="https://placehold.co/1920x1080/7B1E2B/FFF8F0?text=About+Our+Heritage"
          alt="About Sai Silks"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Our Heritage</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Tradition Woven with Elegance since our inception.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/800x1200/1F5D50/FFF8F0?text=Store+Front"
                alt="Sai Silks Store"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Welcome to <span className="text-primary">Sai Silks Collections</span>
              </h2>
              <div className="w-20 h-1 bg-secondary mb-8"></div>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Located in the heart of Guntur, Sai Silks Collections has been the premier destination for authentic, high-quality traditional and modern ethnic wear. Our journey began with a simple vision: to bring the finest weaves of India directly to our customers.
                </p>
                <p>
                  Specializing in Pure Kanjivaram Pattu Sarees, Handloom creations, elegant Designer wear, and premium Dress Materials, we pride ourselves on curating collections that reflect the rich cultural tapestry of our heritage. Every piece in our showroom is selected with an eye for detail, quality, and timeless elegance.
                </p>
                <p>
                  Whether you are shopping for a grand wedding, a festive celebration, or daily elegance, our extensive range ensures that you will find exactly what you are looking for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Our Core Values</h2>
            <div className="h-1 w-24 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">We source only the finest fabrics and materials, ensuring lasting elegance and comfort in every weave.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Authenticity</h3>
              <p className="text-gray-600">Genuine handloom and traditional designs directly from skilled weavers across the country.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Trust</h3>
              <p className="text-gray-600">A legacy built on the unwavering trust and satisfaction of our loyal customers in Guntur.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Timeless Style</h3>
              <p className="text-gray-600">Designs that transcend seasonal trends, offering you elegance that truly lasts a lifetime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
