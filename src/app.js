const express = require("express");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const routes = require("./router");

app.set('view engine', 'ejs');
app.set("views", path.join(process.cwd(), 'views'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());

app.use("/", routes);

module.exports = app