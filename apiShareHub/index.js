const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')


connectDB()
const app = express();
app.use(cors())
app.use(express.json())

app.use('/api', require('./routes/routes'))

app.listen(4000, () => {
    console.log('Servidor ejecutándose en el puerto 4000');
})
