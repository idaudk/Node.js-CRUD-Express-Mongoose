const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

env.config({ path : 'config.env'});
const PORT = process.env.PORT || 8080;

//log request 
app.use(morgan('tiny'));

//connection db
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({urlencoded: true}));

//view engine
app.set('view-engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'views/ejs'))

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css'))); 
app.use('/images', express.static(path.resolve(__dirname, 'assets/images'))); 
app.use('/js', express.static(path.resolve(__dirname, 'assets/js'))); 

//router
app.use('/', require('./server/routes/router'));


app.listen(PORT);