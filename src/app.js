const compression = require('compression');
const morgan = require('morgan');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const {
  errorHandlers, welcome, authors, books,
} = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(compression());

const swaggerDoc = YAML.load('conf/swagger.yaml');
app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/', welcome);
app.use('/authors', authors);
app.use('/books', books);

app.set('json spaces', app.get('env') === 'development' ? 2 : 0);

app.use(errorHandlers.pageNotFound);
app.use(errorHandlers.serverError);

module.exports = app;
