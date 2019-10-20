const mongoose = require('mongoose');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const car = require('./routes/car');
const users = require('./routes/user');
const company = require('./routes/company');
const sales = require('./routes/sales')
app.use(express.json());

app.use('/api/auth/', auth);
app.use('/api/cars/', car);
app.use('/api/users/', users);
app.use('/api/companies/', company);
app.use('/api/sales/', sales);
//console.log(process.env)

const port = process.env.PORT || 3003
app.listen(port, ()=> console.log('Escuchando Puerto: ' + port));

mongoose.connect('mongodb://localhost/carsdb', 
  {useNewUrlParser: true,useUnifiedTopology: true })
.then(res => console.log("Conectado a la db"))
.catch(err => console.log("Error al conectar"));