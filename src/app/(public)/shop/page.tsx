// src/app/(public)/shop/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart, Tag } from "lucide-react";
import { FirestoreProductRepository } from "@/repositories/implementations/firebase/FirestoreProductRepository";

const DEFAULT_TENANT_ID = 'rw-hq-main';

export const metadata: Metadata = {
  title: "Shop Premium Electronics & Security | Kigali Tech",
  description: "Browse our catalog of Smart TVs, CCTV kits, and networking gear. Available for delivery and installation in Kigali.",
};

export default async function ShopIndexPage() {
  const repository = new FirestoreProductRepository();
  
  // We use findFeatured here to quickly grab our seeded active products
  const products = await repository.findFeatured(DEFAULT_TENANT_ID, 20);

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header Banner */}
      <section className="bg-[#0B1B3D] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Equipment <span className="text-[#F97316]">Store</span>
          </h1>
          <p className="text-lg text-gray-300">
            Premium security cameras, Smart TVs, and networking gear. Delivered across the city.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <span className="text-gray-600 font-medium">{products.length} items</span>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.images[0] || "https://placehold.co/600x400/png?text=No+Image"} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Out of Stock Overlay */}
                  {!product.isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                      <span className="rounded-full bg-red-100 px-4 py-2 font-bold text-red-700">Out of Stock</span>
                    </div>
                  )}
                  
                  {/* Sale Badge */}
                  {product.salePriceRWF && product.isAvailable && (
                    <div className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      SALE
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                    <Tag className="h-3 w-3" />
                    {product.brand}
                  </div>
                  
                  <Link href={`/shop/${product.slug}`} className="mb-2 block">
                    <h3 className="text-lg font-bold leading-tight text-gray-900 transition-colors hover:text-[#F97316]">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="mb-6 text-sm text-gray-600 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-4">
                    <div className="flex flex-col">
                      {product.salePriceRWF ? (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            RWF {product.basePriceRWF.toLocaleString()}
                          </span>
                          <span className="text-xl font-bold text-gray-900">
                            RWF {product.salePriceRWF.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-gray-900">
                          RWF {product.basePriceRWF.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <Link 
                      href={`/shop/${product.slug}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1B3D] text-white transition-colors hover:bg-[#F97316]"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="py-20 text-center">
              <h3 className="text-xl font-semibold text-gray-900">Store is currently empty</h3>
              <p className="mt-2 text-gray-500">Check back soon as we add new inventory.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}