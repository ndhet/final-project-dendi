const { Op } = require('sequelize'); // Mengimpor operator Sequelize seperti LIKE
const { Order } = require('../models'); // Memastikan model Order terimpor dengan benar
const { sequelize } = require('../config/database'); // Mengimpor instance sequelize untuk fungsi agregasi

// @desc    Mengambil semua order
// @route   GET /api/orders (terlindungi, untuk admin)
// @route   GET /api/public/orders (publik, untuk tampilan umum)
// @access  Publik / Privat
const getOrders = async (req, res) => {
    // Mengambil parameter query: halaman, batasan data per halaman, dan kata kunci pencarian
    // Perhatikan: 'page' dan 'limit' diambil tanpa nilai default di destructuring agar bisa divalidasi/didefault di parsedPage/parsedLimit.
    const { page, limit, search = '' } = req.query; 
    
    // --- Bagian KRUSIAL: Memastikan 'page' dan 'limit' adalah angka yang valid ---
    const parsedPage = parseInt(page) || 1; // Jika page tidak valid, default ke 1
    const parsedLimit = parseInt(limit) || 10; // Jika limit tidak valid, default ke 10 (misal: frontend kirim 5 atau 9999)
    
    const offset = (parsedPage - 1) * parsedLimit; // Menghitung offset menggunakan parsedPage dan parsedLimit

    try {
        const whereClause = {}; // Objek untuk kondisi filter data yang ditampilkan
        if (search) {
            // Logika pencarian: mencari di beberapa kolom (customerName, merchantName, product, server)
            whereClause[Op.or] = [
                { customerName: { [Op.like]: `%${search}%` } },
                { merchantName: { [Op.like]: `%${search}%` } },
                { product: { [Op.like]: `%${search}%` } },
                { server: { [Op.like]: `%${search}%` } },
            ];
        }

        // --- Mengambil data order untuk halaman saat ini (terpengaruh pencarian jika ada) ---
        // 'count' akan mencerminkan jumlah item setelah filtering.
        const { count, rows } = await Order.findAndCountAll({
            where: whereClause, // Menerapkan filter pencarian jika ada
            limit: parsedLimit, // Menggunakan parsedLimit di sini
            offset: offset,     // Menggunakan offset di sini
            order: [['expiredDate', 'ASC']], // Mengurutkan berdasarkan tanggal expired secara ascending
        });

        // --- MENGHITUNG TOTAL PENJUALAN KESELURUHAN DARI SELURUH DATABASE ---
        // Query terpisah ini TIDAK menerapkan filter pencarian atau paginasi,
        // sehingga selalu mendapatkan total dari SEMUA data yang ada di database.
        const totalSalesResult = await Order.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('price')), 'totalSales'] // Menggunakan fungsi SQL SUM()
            ],
            raw: true // Mendapatkan hasil mentah dari query
        });

        // Memparsing total penjualan keseluruhan menjadi float. Jangan format di sini.
        const totalSumOfAllSales = parseFloat(totalSalesResult[0].totalSales || 0);

        // Menghitung total penjualan dari order yang diambil DI HALAMAN INI (jika masih diperlukan)
        // Nilai ini juga dikirim sebagai float murni.
        const totalSalesOnPage = rows.reduce((acc, order) => acc + parseFloat(order.price || 0), 0);


        // Mengirimkan respons JSON
        res.json({
            totalItems: count, // Total item setelah filtering (relevan untuk paginasi frontend)
            totalPages: Math.ceil(count / parsedLimit), // Total halaman berdasarkan limit yang diminta
            currentPage: parsedPage, // Halaman saat ini
            orders: rows, // Data order untuk halaman saat ini
            totalSalesOnPage: totalSalesOnPage, // Total penjualan pada halaman ini (float murni)
            totalSumOfAllSales: totalSumOfAllSales // Total penjualan keseluruhan dari seluruh database (float murni)
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil order.' });
    }
};

// @desc    Mengambil satu order berdasarkan ID
// @route   GET /api/orders/:id
// @access  Privat (Admin)
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id); // Mencari order berdasarkan Primary Key (ID)
        if (!order) {
            return res.status(404).json({ message: 'Order tidak ditemukan.' });
        }
        res.json(order); // Mengirimkan order yang ditemukan
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil order berdasarkan ID.' });
    }
};

// @desc    Membuat order baru
// @route   POST /api/orders
// @access  Privat (Admin)
const createOrder = async (req, res) => {
    // Mengambil field-field dari body request, termasuk harga (price)
    const { customerName, merchantName, product, expiredDate, productSpecification, server, price } = req.body;

    // Validasi dasar: Memastikan semua field wajib diisi dan harga tidak kosong
    if (!customerName || !merchantName || !product || !expiredDate || !server || price === undefined || price === null) {
        return res.status(400).json({ message: 'Mohon lengkapi semua field yang diperlukan, termasuk harga.' });
    }

    try {
        const newOrder = await Order.create({
            customerName,
            merchantName,
            product,
            expiredDate,
            productSpecification,
            server,
            price: parseFloat(price), // Memastikan harga disimpan sebagai angka desimal
        });
        res.status(201).json(newOrder); // Mengirimkan respons 201 (Created) dengan order yang baru dibuat
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat membuat order baru.' });
    }
};

// @desc    Memperbarui order
// @route   PUT /api/orders/:id
// @access  Privat (Admin)
const updateOrder = async (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL
    // Mengambil field-field yang mungkin diperbarui dari body request
    const { customerName, merchantName, product, expiredDate, productSpecification, server, price } = req.body;

    try {
        const order = await Order.findByPk(id); // Mencari order yang akan diperbarui
        if (!order) {
            return res.status(404).json({ message: 'Order tidak ditemukan.' });
        }

        // Memperbarui field hanya jika nilai baru disediakan (bukan undefined)
        order.customerName = customerName !== undefined ? customerName : order.customerName;
        order.merchantName = merchantName !== undefined ? merchantName : order.merchantName;
        order.product = product !== undefined ? product : order.product;
        order.expiredDate = expiredDate !== undefined ? expiredDate : order.expiredDate;
        order.productSpecification = productSpecification !== undefined ? productSpecification : order.productSpecification;
        order.server = server !== undefined ? server : order.server;
        // Memperbarui harga, memastikan diubah ke float jika nilai disediakan
        order.price = (price !== undefined && price !== null) ? parseFloat(price) : order.price;

        await order.save(); // Menyimpan perubahan ke database
        res.json(order); // Mengirimkan respons dengan order yang telah diperbarui
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat memperbarui order.' });
    }
};

// @desc    Menghapus order
// @route   DELETE /api/orders/:id
// @access  Privat (Admin)
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id); // Mencari order yang akan dihapus
        if (!order) {
            return res.status(404).json({ message: 'Order tidak ditemukan.' });
        }

        await order.destroy(); // Menghapus order dari database
        res.json({ message: 'Order berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat menghapus order.' });
    }
};

// @desc    Mengambil total penjualan per bulan tertentu atau semua bulan di tahun tertentu, berdasarkan created_at
// @route   GET /api/orders/monthly-sales
// @access  Public (bisa diakses publik atau admin)
const getMonthlySales = async (req, res) => {
    const { month, year } = req.query; // Ambil parameter month dan year

    try {
        let whereClause = {};

        // Jika bulan dan tahun disediakan, filter spesifik bulan itu
        if (month && year) {
            // Membangun rentang tanggal untuk bulan tertentu
            const startDate = new Date(parseInt(year), parseInt(month) - 1, 1); // Bulan -1 karena JS bulan 0-11
            const endDate = new Date(parseInt(year), parseInt(month), 0); // Hari ke-0 dari bulan berikutnya adalah hari terakhir bulan ini

            whereClause.created_at = { // Filter berdasarkan created_at
                [Op.between]: [startDate, endDate]
            };
        } else if (year) {
            // Jika hanya tahun disediakan, tampilkan semua bulan di tahun itu
            const currentYear = parseInt(year);
            whereClause.created_at = { // Filter berdasarkan created_at
                [Op.between]: [`${currentYear}-01-01 00:00:00`, `${currentYear}-12-31 23:59:59`]
            };
        } else {
            // Default ke tahun saat ini jika tidak ada bulan/tahun yang ditentukan
            const currentYear = new Date().getFullYear();
            whereClause.created_at = { // Filter berdasarkan created_at
                [Op.between]: [`${currentYear}-01-01 00:00:00`, `${currentYear}-12-31 23:59:59`]
            };
        }

        const monthlySalesData = await Order.findAll({
            attributes: [
                // Ekstrak bulan dan tahun dari created_at
                [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m'), 'monthYear'], // Format YYYY-MM
                [sequelize.fn('SUM', sequelize.col('price')), 'monthlyTotal'] // Jumlahkan harga untuk setiap bulan
            ],
            where: whereClause, // Menerapkan filter berdasarkan bulan/tahun
            group: [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m')], // Kelompokkan berdasarkan YYYY-MM
            order: [[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m'), 'ASC']], // Urutkan berdasarkan YYYY-MM
            raw: true
        });

        // Mengirimkan respons tergantung apakah bulan dan tahun spesifik diminta atau tidak
        if (month && year) {
            // Jika bulan dan tahun spesifik diminta, kirim total tunggal (float murni)
            const totalForSpecificMonth = monthlySalesData[0] ? parseFloat(monthlySalesData[0].monthlyTotal || 0) : 0;
            res.json({ totalForMonth: totalForSpecificMonth, month: `${year}-${month.padStart(2, '0')}` });
        } else {
            // Jika hanya tahun atau default, kirim array data per bulan (float murni)
            const formattedMonthlySales = monthlySalesData.map(data => ({
                monthYear: data.monthYear,
                monthlyTotal: parseFloat(data.monthlyTotal || 0) // Mengirim angka float murni
            }));
            res.json(formattedMonthlySales);
        }

    } catch (error) {
        console.error('Error fetching monthly sales:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil penjualan bulanan.' });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getMonthlySales
};
