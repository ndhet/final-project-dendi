const { sequelize } = require('../config/database');
const User = require('./userModel');
const Order = require('./orderModel');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database & tables created/updated!');

        const count = await User.count();
        if (count === 0) {
            await User.create({
                username: 'admin',
                password: 'password123'
            });
            console.log('Default admin user created: admin / password123');
        }
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Order,
    syncDatabase
};
