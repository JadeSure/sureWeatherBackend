const mongoose = require('mongoose')

const dbConnection = () => {
    const connectionString = process.env.CONNECTION_STRING

    const db = mongoose.connection;
    db.on('connected', () => {
        console.log('DB connected');
    })

    db.on('error', error => {
        console.log(error.message);
        process.exit(1);
    })

    db.on('disconnected', () => {
        console.log('mongodb connection disconnected');
    })

    return mongoose.connect(connectionString)
}

module.exports = dbConnection
