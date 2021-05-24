// require('dotenv').config();
var dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI : 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@cluster0.qtvnp.mongodb.net/' + process.env.MONGO_DB
}
