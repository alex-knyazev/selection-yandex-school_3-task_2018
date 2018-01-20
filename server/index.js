const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const pagesRoutes = require('./pages/routes');
const graphqlRoutes = require('./graphql/routes');
const { port, staticFolder } = require('./config.js');

const app = express();

app.use(bodyParser.json());

app.use('/', pagesRoutes)
app.use('/graphql', graphqlRoutes);
app.use(express.static(path.join(__dirname, staticFolder)));

app.listen(port, () => console.log(`Express app listening on localhost:${port}`));
