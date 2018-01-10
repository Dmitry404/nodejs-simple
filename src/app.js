const compression = require('compression');
const morgan = require('morgan');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../conf/swagger.json');
const {
  errorHandlers, welcome, authors, books,
} = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(compression());

app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/', welcome);
app.use('/authors', authors);
app.use('/books', books);

app.use(errorHandlers.pageNotFound);
app.use(errorHandlers.serverError);

module.exports = app;
