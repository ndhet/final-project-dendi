import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminOrderTable from '../components/tables/AdminOrderTable';
import MonthlySalesCard from '../components/common/MonthlySalesCard';
import api from '../api/axiosConfig';

const AdminDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSumOfAllSales, setTotalSumOfAllSales] = useState(0); // Ini adalah total keseluruhan dari DB
  // const [searchTerm, setSearchTerm] = useState(''); // <--- HAPUS STATE INI
  const itemsPerPage = 5;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          // search: searchTerm, // <--- HAPUS KIRIMAN SEARCHTERM INI
        },
      });
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
      setTotalSumOfAllSales(response.data.totalSumOfAllSales);
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data?.message || error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Sesi Anda telah berakhir atau Anda tidak diotorisasi. Mohon login kembali.');
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, logout, navigate, itemsPerPage]); // Hapus searchTerm dari dependensi

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      fetchOrders();
    }
  }, [user, authLoading, navigate, fetchOrders]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const handleSearchChange = (e) => { // <--- HAPUS FUNGSI INI
  //   setSearchTerm(e.target.value);
  //   setCurrentPage(1);
  // };

  if (authLoading) {
    return <div className="text-center mt-10 dark:text-gray-200">Memuat autentikasi...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-200 text-center">
          REKAP PENJUALAN
        </h2>
        
        <MonthlySalesCard year={new Date().getFullYear()} />
        

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">Memuat order...</p>
        ) : (
          <AdminOrderTable
            orders={orders}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            fetchOrders={fetchOrders} // fetchOrders akan dimodifikasi untuk menerima searchTerm dari AdminOrderTable
            totalSumOfAllSales={totalSumOfAllSales}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
