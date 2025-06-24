import React, { useState, useEffect, useCallback } from 'react';
import Pagination from '../common/Pagination';
import OrderForm from '../forms/OrderForm';
import api from '../../api/axiosConfig';

const AdminOrderTable = ({ totalSumOfAllSales }) => { 
  const [editingOrder, setEditingOrder] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const itemsPerPage = 5;

  // States baru untuk data tabel yang dikelola di sini
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // State untuk pencarian

  // Modifikasi fetchOrders agar bisa digunakan di dalam AdminOrderTable
  const internalFetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm, // Kirim searchTerm dari sini
        },
      });
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data?.message || error.message);
      // Penanganan error autentikasi harus ada di AdminDashboard atau di AuthContext
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm]); // Dependensi: currentPage, itemsPerPage, searchTerm

  useEffect(() => {
    internalFetchOrders();
  }, [internalFetchOrders]); // Panggil fetchOrders internal

  const handleAddOrderClick = () => {
    setEditingOrder(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (order) => {
    setEditingOrder({ ...order });
    setIsFormVisible(true);
  };

  const handleDeleteClick = async (orderId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus order ini?')) {
      try {
        await api.delete(`/orders/${orderId}`);
        alert('Order berhasil dihapus!');
        internalFetchOrders(); // Refresh data setelah delete
      } catch (error) {
        console.error('Error deleting order:', error.response?.data?.message || error.message);
        alert('Gagal menghapus order.');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingOrder) {
        await api.put(`/orders/${editingOrder.id}`, formData);
        alert('Order berhasil diperbarui!');
      } else {
        await api.post('/orders', formData);
        alert('Order berhasil ditambahkan!');
      }
      setIsFormVisible(false);
      setEditingOrder(null);
      internalFetchOrders(); // Refresh data setelah submit form
    } catch (error) {
      console.error('Error submitting order:', error.response?.data?.message || error.message);
      alert('Gagal menyimpan order.');
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingOrder(null);
  };

  const handlePageChange = (page) => { // Paginasi dikelola di sini
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => { // Fungsi pencarian dikelola di sini
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian berubah
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  if (!orders || (orders.length === 0 && !isFormVisible && !loading)) { // Tambahkan !loading
    return (
      <div className="container mx-auto p-4 dark:text-gray-400">
        <div className="mb-8 flex justify-between items-center">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md text-sm font-semibold animate-pulse">
                Total Penjualan: Rp{parseFloat(totalSumOfAllSales).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <button
                onClick={handleAddOrderClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 px-3 rounded-md transition duration-150 ease-in-out flex items-center"
            >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Tambah Order
            </button>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari order..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 text-sm"
          />
        </div>
        <p className="text-center text-gray-500 mt-8">Tidak ada order ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md text-sm font-semibold animate-pulse">
          Total Penjualan: Rp{parseFloat(totalSumOfAllSales).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <button
          onClick={handleAddOrderClick}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 px-3 rounded-md transition duration-150 ease-in-out flex items-center"
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Tambah Order
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari order..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 text-sm"
        />
      </div>

      {isFormVisible && (
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl">
          <OrderForm
            initialData={editingOrder || {}}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            key={editingOrder ? `edit-${editingOrder.id}` : 'add-new-order'}
          />
        </div>
      )}

      {loading ? ( // Tambahkan loading state di sini
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">Memuat order...</p>
      ) : (
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
                <th scope="col" className="px-6 py-3 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700">
              {orders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">{startIndex + index + 1}.</td>
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
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(order)}
                      title="Edit"
                      className="text-indigo-600 hover:text-indigo-900 mx-2 transition-colors duration-200 dark:text-indigo-400 dark:hover:text-indigo-200"
                    >
                      <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L15.232 5.232z"></path></svg>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(order.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-900 mx-2 transition-colors duration-200 dark:text-red-400 dark:hover:text-red-200"
                    >
                      <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} {/* Tutup conditional loading */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminOrderTable;
