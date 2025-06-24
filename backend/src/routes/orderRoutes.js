const express = require('express');
const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getMonthlySales
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/public', getOrders);

router.get('/monthly-sales', getMonthlySales);

router.route('/').get(protect, getOrders).post(protect, createOrder);

router.route('/:id').get(protect, getOrderById).put(protect, updateOrder).delete(protect, deleteOrder);

module.exports = router;
