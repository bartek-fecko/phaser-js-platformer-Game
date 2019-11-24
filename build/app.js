// tslint:disable: no-console
'use strict';
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const path = require('path');
dotenv.config({ path: './.env' });
const PORT = process.env.PORT;
const INDEX = path.join(__dirname, '../client/build/index.html');
// const testRoute = require('./routes/posts/test').router;
const server = express()
    .use(cors())
    // .use('/api/test', testRoute)
    .use(express.static(path.join(__dirname, '../client/build/')))
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
