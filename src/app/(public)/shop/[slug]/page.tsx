// src/app/(public)/shop/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShieldCheck, Wrench, CheckCircle, AlertCircle } from "lucide-react";
import { FirestoreProductRepository } from "@/repositories/implementations/firebase/FirestoreProductRepository";
import { QuoteRequestForm } from "@/domains/quotes/components/QuoteRequestForm";

const DEFAULT_TENANT_ID = 'rw-hq-main';

// FIX: Explicitly type params as a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. DYNAMIC SEO METADATA GENERATOR
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // FIX: Await the params Promise
  const { slug } = await params;
  
  const repository = new FirestoreProductRepository();
  const product = await repository.findBySlug(DEFAULT_TENANT_ID, slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.seoMeta?.title || product.name,
    description: product.seoMeta?.description || product.shortDescription,
    keywords: product.seoMeta?.keywords || [],
    openGraph: {
      title: product.seoMeta?.title || product.name,
      description: product.seoMeta?.description || product.shortDescription,
      type: "website",
      images: product.images.length > 0 ? [{ url: product.images[0] }] : [],
    },
  };
}

// 2. SERVER COMPONENT RENDERER
export default async function ProductDetailsPage({ params }: Props) {
  // FIX: Await the params Promise
  const { slug } = await params;
  
  const repository = new FirestoreProductRepository();
  const product = await repository.findBySlug(DEFAULT_TENANT_ID, slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Product Top Section */}
      <section className="px-6 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[0] || "https://placehold.co/800x800/png?text=Product+Image"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {!product.isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                  <span className="rounded-full bg-red-100 px-6 py-3 text-lg font-bold text-red-700 shadow-sm">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-square overflow-hidden rounded-lg border border-gray-100 bg-gray-50 cursor-pointer hover:border-[#0B1B3D]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`${product.name} view ${idx + 2}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#F97316]">
              {product.brand} • {product.category.replace('-', ' ')}
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{product.name}</h1>
            <p className="mb-6 text-sm text-gray-500">SKU: {product.sku}</p>

            <div className="mb-6 flex items-end gap-4">
              {product.salePriceRWF ? (
                <>
                  <span className="text-4xl font-extrabold text-gray-900">
                    RWF {product.salePriceRWF.toLocaleString()}
                  </span>
                  <span className="mb-1 text-xl font-medium text-gray-400 line-through">
                    RWF {product.basePriceRWF.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-extrabold text-gray-900">
                  RWF {product.basePriceRWF.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mb-8 text-lg text-gray-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quick Badges */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <ShieldCheck className="h-6 w-6 text-[#10B981]" />
                <div>
                  <div className="font-semibold text-gray-900">Warranty</div>
                  <div className="text-sm text-gray-600">{product.warrantyMonths} Months</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
                {product.isAvailable ? (
                  <CheckCircle className="h-6 w-6 text-[#10B981]" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-500" />
                )}
                <div>
                  <div className="font-semibold text-gray-900">Availability</div>
                  <div className="text-sm text-gray-600">
                    {product.isAvailable ? `${product.inventoryCount} in stock` : 'Currently unavailable'}
                  </div>
                </div>
              </div>
            </div>

            {/* Replaced Add to Cart with the Lead Gen Form */}
            <div className="mt-auto border-t border-gray-100 pt-8">
               <h3 className="mb-4 text-xl font-bold text-gray-900">Inquire About This Product</h3>
               {product.isAvailable ? (
                 <QuoteRequestForm />
               ) : (
                 <div className="rounded-xl bg-gray-50 p-6 text-center border border-gray-200">
                   <p className="text-gray-600">This product is currently out of stock. Please check back later.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details & Specs */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-16 lg:grid-cols-3">
          
          {/* Long Description */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Product Details</h2>
            <div className="prose text-gray-600 leading-relaxed max-w-none">
              <p>{product.longDescription}</p>
            </div>

            {/* Installation Banner */}
            {product.hasInstallationOption && (
              <div className="mt-12 flex items-start gap-4 rounded-xl border border-[#0B1B3D]/10 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-[#0B1B3D]/5 p-3">
                  <Wrench className="h-6 w-6 text-[#0B1B3D]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Professional Installation Available</h3>
                  <p className="mt-1 text-gray-600">
                    Need help setting this up? Our certified technicians can install and configure this equipment at your location.
                  </p>
                  {product.installationFeeRWF && (
                    <p className="mt-3 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-semibold text-gray-900">
                      Standard Fee: RWF {product.installationFeeRWF.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Specifications</h2>
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <dl className="divide-y divide-gray-100">
                {product.specifications.map((spec: { name: string; value: string }, idx: number) => (
                  <div key={idx} className="grid grid-cols-2 px-6 py-4 hover:bg-gray-50">
                    <dt className="text-sm font-medium text-gray-500">{spec.name}</dt>
                    <dd className="text-sm font-medium text-gray-900 text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}