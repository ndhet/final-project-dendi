import React from 'react';
import Pagination from '../common/Pagination';

  const PublicOrderTable = ({ orders, totalPages, currentPage, onPageChange, totalSalesOnPage }) => {
  const itemsPerPage = 5; // Ini hanya untuk perhitungan nomor urut, karena limit sebenarnya dari parent
  const startIndex = (currentPage - 1) * itemsPerPage;

  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500 mt-8 dark:text-gray-400">Tidak ada order ditemukan.</p>;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">No</th>
              <th scope="col" className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Merchant</th>
              <th scope="col" className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Produk</th>
              <th scope="col" className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Expired</th>
              <th scope="col" className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Spesifikasi</th>
              <th scope="col" className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Server</th>
              <th scope="col" className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Harga</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700">
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{startIndex + index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{order.merchantName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{order.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {new Date(order.expiredDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                  {order.productSpecification || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {order.server}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  Rp{parseFloat(order.price).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PublicOrderTable;
