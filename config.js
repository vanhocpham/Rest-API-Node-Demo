module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8818,
    URL: process.env.BASE_URL || 'http://localhost:8818',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://admin:admin@be-rhp-shard-00-00-qnyux.mongodb.net:27017,be-rhp-shard-00-01-qnyux.mongodb.net:27017,be-rhp-shard-00-02-qnyux.mongodb.net:27017/test?ssl=true&replicaSet=BE-RHP-shard-0&authSource=admin&retryWrites=true',
    MONGODB_ATLAS_PW: process.env.MONGODB_ATLAS_PW || 'admin',
    JWT_SECRET: "secret",
    FACEBOOK_APP_ID:"138020823733339",
    FACEBOOK_APP_SECRET:"de49b49c623147a4ebf0578382627466",
    GOOGLE_CLIENT_ID:"730063894420-arb0sgps1gckakbp1a8c56sci14dbg9e.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET:"To9-Gli0HBY5DXiyA3mjYVpP",
};