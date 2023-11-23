require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const https = require('https');

import apiRoutes from './Routes/apiRoutes';

import './db/database'
import './discord/discord'

/* ROUTES */

const PORT = process.env.PORT || 3013;

app.use(express.json());
app.use(cors());

app.use(apiRoutes)

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const certificate = fs.readFileSync('./keys/certificate.crt', 'utf8');

var options = {
  key: privateKey,
  cert: certificate,
};

var server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log("server starting on port: " + PORT)
});



/*
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}!`);
});
*/

