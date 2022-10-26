const express = require("express");

const routes = require("./router");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

module.exports = app