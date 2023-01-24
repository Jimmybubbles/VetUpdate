const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:2701/vetupdate',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

module.exports = mongoose.connection;