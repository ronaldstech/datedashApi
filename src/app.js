const express = require('express');
const cors = require('cors');

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//exporting the module
module.exports = app;