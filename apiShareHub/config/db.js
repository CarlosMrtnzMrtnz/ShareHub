const mongoose = require('mongoose')
require('dotenv').config({path: 'config.env'})

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.DB_MONGO)
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error)
        connectDB()
    }
}

module.exports = connectDB
