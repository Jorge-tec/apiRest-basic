const express = require('express');
const mongoose = require('mongoose');
const unirest = require('unirest');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos

const uri = `mongodb://localhost:27017/${process.env.DBNAME}`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/validateToken', verifyToken, dashboadRoutes);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    });
});

//ping a la apicoingecko
app.get('/pingApi', (req, res) => {
unirest.get('https://api.coingecko.com/api/v3/ping')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .then((response) => {
    res.json(response.body)
  })
});


// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`);
});