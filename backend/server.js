const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access admin dashboard at http://localhost:${PORT}/api/auth/login`);
    console.log(`Access public orders at http://localhost:${PORT}/api/public/orders`);
});
