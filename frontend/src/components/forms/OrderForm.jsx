import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, format } from 'date-fns';

const OrderForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => ({
    customerName: initialData.customerName || '',
    merchantName: initialData.merchantName || '',
    product: initialData.product || '',
    productSpecification: initialData.productSpecification || '',
    server: initialData.server || '',
    price: initialData.price || '',
  }));

  const [selectedExpiredDate, setSelectedExpiredDate] = useState(() =>
    initialData.expiredDate ? parseISO(initialData.expiredDate) : null
  );

  useEffect(() => {
    setFormData({
      customerName: initialData.customerName || '',
      merchantName: initialData.merchantName || '',
      product: initialData.product || '',
      productSpecification: initialData.productSpecification || '',
      server: initialData.server || '',
      price: initialData.price || '',
    });
    setSelectedExpiredDate(initialData.expiredDate ? parseISO(initialData.expiredDate) : null);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedExpiredDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      expiredDate: selectedExpiredDate ? format(selectedExpiredDate, 'yyyy-MM-dd') : null,
      price: parseFloat(formData.price),
    };
    onSubmit(dataToSend);

    if (!initialData.id) {
      setFormData({
        customerName: '',
        merchantName: '',
        product: '',
        productSpecification: '',
        server: '',
        price: '',
      });
      setSelectedExpiredDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        {initialData.id ? 'Edit Order' : 'Add New Order'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Nama Customer:
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-white dark:border-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="merchantName" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Nama Merchant:
          </label>
          <input
            type="text"
            id="merchantName"
            name="merchantName"
            value={formData.merchantName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-white dark:border-gray-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="product" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Produk:
          </label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-white dark:border-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiredDate" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Tanggal Expired:
          </label>
          <DatePicker
            selected={selectedExpiredDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline datepicker-input dark:bg-gray-600 dark:text-white dark:border-gray-500"
            wrapperClassName="w-full"
            placeholderText="Pilih Tanggal Expired"
            id="expiredDate"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="productSpecification" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Spesifikasi Produk:
        </label>
        <textarea
          id="productSpecification"
          name="productSpecification"
          value={formData.productSpecification}
          onChange={handleChange}
          rows="3"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-white dark:border-gray-500"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="server" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Server:
          </label>
          <input
            type="text"
            id="server"
            name="server"
            value={formData.server}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-white dark:border-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
            Harga:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-white dark:border-gray-500"
            required
            step="0.01"
            min="0"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600 dark:hover:bg-green-800"
        >
          {initialData.id ? 'Update Order' : 'Add Order'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default OrderForm;
