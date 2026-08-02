"use client";

import { useRef, useTransition, useState } from "react";
import { createProductAction } from "@/domains/products/actions/createProduct";
import { Plus, Loader2, CheckCircle } from "lucide-react";

export function AddProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await createProductAction(formData);
      if (result.success) {
        formRef.current?.reset();
        setSuccessMsg("Product added successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-[#0B1B3D]">Add New Product</h2>
      
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Product Name</label>
            <input required name="name" type="text" placeholder="e.g. Samsung 65&quot; 4K TV" className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
            <select required name="category" className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]">
              <option value="Televisions">Televisions</option>
              <option value="Security">Security & CCTV</option>
              <option value="Networking">Networking</option>
              <option value="Smart Home">Smart Home</option>
              <option value="Audio">Audio</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Price (RWF)</label>
            <input required name="price" type="text" placeholder="e.g. 950,000" className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Stock Status</label>
            <select required name="status" className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]">
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="flex items-center gap-1 text-sm font-medium text-green-600">
            {successMsg && (
              <>
                <CheckCircle className="h-4 w-4"/> {successMsg}
              </>
            )}
          </span>
          
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#F97316] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-70"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {isPending ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}