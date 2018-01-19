const compression = require('compression');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const {
  errorHandlers, uploadedFiles, welcome, books, users, rates, authors, reviews, book,
} = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(uploadedFiles({
  uploadDir: '/tmp',
  routes: {
    '/users': {
      method: 'post',
      fieldName: 'avatar',
    },
  },
}));

const swaggerDoc = YAML.load('conf/swagger.yaml');
app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/', welcome);
app.use('/books', books);
app.use('/books/:bookId(\\d+)', book);
app.use('/books/:bookId(\\d+)/reviews', reviews);
app.use('/users', users);
app.use('/rates', rates);
app.use('/authors', authors);

app.set('json spaces', app.get('env') === 'development' ? 2 : 0);

app.use(errorHandlers.pageNotFound);
app.use(errorHandlers.serverError);

module.exports = app;
