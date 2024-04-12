const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')




connectDB()
const app = express();
app.use(cors())
app.use(express.json())

app.use("/assets", express.static('uploads'))
app.use('/api', require('./routes/routes'))
app.get('/api/health', (req, res) => {
    // Devolver un mensaje de estado saludable
    res.status(200).json({ status: 'OK', message: 'API is healthy' });
  });

app.listen(4000, () => {
    console.log('Servidor ejecutándose en el puerto 4000');
})
