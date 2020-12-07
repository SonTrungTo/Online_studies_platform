require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET || "MyAppSecret",
    mongoUri: process.env.MONGO_URI || process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') + '/Sonsera2020'
};

export default config;