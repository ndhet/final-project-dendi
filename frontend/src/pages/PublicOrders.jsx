// frontend/src/pages/PublicOrders.jsx
import React, { useState, useEffect, useCallback } from 'react';
import PublicOrderTable from '../components/tables/PublicOrderTable';
import EmojiCursorEffect from '../components/common/EmojiCursorEffect';
import MonthlySalesCard from '../components/common/MonthlySalesCard'; // Impor MonthlySalesCard
import api from '../api/axiosConfig';

const PublicOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalSumOfAllSales, setTotalSumOfAllSales] = useState(0);

  const [currentPublicPage, setCurrentPublicPage] = useState(1);
  const [publicTotalPages, setPublicTotalPages] = useState(1);
  const itemsPerPage = 5;

  const fetchPublicOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders/public', {
        params: {
          page: currentPublicPage,
          limit: itemsPerPage,
          search: searchTerm,
        },
      });
      setOrders(response.data.orders);
      setPublicTotalPages(response.data.totalPages);
      setTotalSumOfAllSales(response.data.totalSumOfAllSales);
    } catch (error) {
      console.error('Error fetching public orders:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [currentPublicPage, searchTerm, itemsPerPage]);

  useEffect(() => {
    fetchPublicOrders();
  }, [fetchPublicOrders]);

  const handlePublicPageChange = (page) => {
    setCurrentPublicPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPublicPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <EmojiCursorEffect />
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="mb-6 flex justify-between items-center">
          <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md text-sm font-semibold animate-pulse">
            Total Penjualan: Rp{parseFloat(totalSumOfAllSales).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-200">
            REKAP PENJUALAN
          </h2>
        </div>

        <MonthlySalesCard />
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari order..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 text-sm"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">Memuat order...</p>
        ) : (
          <PublicOrderTable
            orders={orders}
            totalPages={publicTotalPages}
            currentPage={currentPublicPage}
            onPageChange={handlePublicPageChange}
            totalSalesOnPage={totalSumOfAllSales}
          />
        )}
      </div>
    </div>
  );
};

export default PublicOrders;
