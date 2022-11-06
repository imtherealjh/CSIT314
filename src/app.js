const express = require("express");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const routes = require("./router");

app.set('view engine', 'ejs');
app.set("views", path.join(process.cwd(), 'views'));
// Mount the middleware at "/css" to serve css content only when their request path is prefixed with "/css".
app.use('*/css',express.static('public/css'));
// Mount the middleware at "/js" to serve js content only when their request path is prefixed with "/js".
app.use('*/js',express.static('public/js'));
// For font awesome
// Mount the middleware at "/webfonts" to serve webfonts content only when their request path is prefixed with "/webfonts".
app.use('*/webfonts',express.static('public/webfonts'));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());

app.use("/", routes);

module.exports = app