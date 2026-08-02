import { getQuotesAction } from "@/actions/getQuotes";
import { Clock, CheckCircle, MapPin, Phone, User } from "lucide-react";
import { StatusButton } from "./components/StatusButton";
import { DeleteButton } from "./components/DeleteButton";
// 1. Import the new form component
import { AddProductForm } from "./components/AddProductForm"; 

// Opt out of static caching so you always see fresh leads
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const quotes = await getQuotesAction();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your shop inventory and incoming service requests.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm border border-gray-200">
            <span className="font-semibold text-[#0B1B3D]">{quotes.length}</span>
            <span className="text-sm text-gray-600">Total Leads</span>
          </div>
        </div>

        {/* 2. Inject the Add Product Form */}
        <div className="mb-12">
          <AddProductForm />
        </div>

        {/* Data Table for Leads */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Leads</h2>
        </div>
        
        <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Service Required</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date Received</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No quotes received yet.
                    </td>
                  </tr>
                ) : (
                  quotes.map((quote) => (
                    <tr key={quote.id} className="transition-colors hover:bg-gray-50">
                      
                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-2 font-semibold text-gray-900">
                            <User className="h-4 w-4 text-gray-400" /> {quote.customerName}
                          </span>
                          <span className="flex items-center gap-2 text-gray-500">
                            <Phone className="h-4 w-4 text-gray-400" /> {quote.customerPhone}
                          </span>
                        </div>
                      </td>

                      {/* Service Info */}
                      <td className="px-6 py-4 font-medium text-[#0B1B3D]">
                        {quote.serviceRequested}
                        {quote.notes && (
                          <p className="mt-1 max-w-xs truncate text-xs font-normal text-gray-500" title={quote.notes}>
                            Note: {quote.notes}
                          </p>
                        )}
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#F97316]" />
                          {quote.location?.district} — {quote.location?.sector}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <StatusButton id={quote.id} currentStatus={quote.status} />
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(quote.createdAt).toLocaleDateString('en-RW', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DeleteButton id={quote.id} />
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}