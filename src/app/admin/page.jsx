import { getQuotesAction } from "@/actions/getQuotes";
import { Clock, CheckCircle, MapPin, Phone, User } from "lucide-react";

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
            <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
            <p className="mt-2 text-gray-600">Review and assign incoming service requests.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm border border-gray-200">
            <span className="font-semibold text-[#0B1B3D]">{quotes.length}</span>
            <span className="text-sm text-gray-600">Total Leads</span>
          </div>
        </div>

        {/* Data Table */}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
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
                        {quote.status === "pending" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                            <Clock className="h-3 w-3" /> Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                            <CheckCircle className="h-3 w-3" /> Contacted
                          </span>
                        )}
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