// frontend/src/components/common/MonthlySalesCard.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api/axiosConfig';

const MonthlySalesCard = ({ title, year }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [monthlyTotal, setMonthlyTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecificMonthlySales = async () => {
      setLoading(true);
      setError(null);
      const fetchYear = year || selectedMonth.getFullYear();
      const fetchMonth = selectedMonth.getMonth() + 1; // getMonth() returns 0-11, so add 1

      try {
        const response = await api.get('/orders/monthly-sales', {
          params: { year: fetchYear, month: fetchMonth }
        });
        setMonthlyTotal(response.data.totalForMonth);
      } catch (err) {
        console.error('Error fetching specific monthly sales:', err);
        setError('Gagal memuat total penjualan bulan ini.');
        setMonthlyTotal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecificMonthlySales();
  }, [selectedMonth, year]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3 sm:p-6">
      {title && (
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 sm:text-xl text-center">
          {title}
        </h3>
      )}
      
      <div className="flex flex-col items-center gap-y-3 sm:flex-row sm:justify-between sm:gap-x-4">
        <div className="w-full max-w-xs text-center sm:w-1/2 sm:text-left">
          <label htmlFor="monthPicker" className="block text-sm font-italic mb-1 text-gray-700 dark:text-gray-300">
            Pilih Bulan:
          </label>
          <DatePicker
            id="monthPicker"
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="shadow-none appearance-none bg-transparent border-none rounded-none w-full py-1.5 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-none dark:text-white text-center sm:text-left" /* text-center untuk mobile, text-left untuk desktop */
            wrapperClassName="w-full"
          />
        </div>

        <div className="w-full max-w-xs text-center sm:w-1/2 sm:text-left">
          {loading ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">Memuat total...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-0.5 lg:text-right xl:text-right">Total Penjualan:</p>
              <p className="text-sm font-bold text-blue-500 dark:text-blue-200 rounded-md lg:text-right xl:text-right animate-pulse">
                Rp{parseFloat(monthlyTotal !== null ? monthlyTotal : 0).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlySalesCard;
