const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const {
  errorHandlers, uploadedFiles, appAuth,
} = require('./middlewares');
const {
  welcome, books, users, rates, authors, reviews, book,
} = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const swaggerDoc = YAML.load('conf/swagger.yaml');
app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

passport.use(appAuth.jwtStrategy);
passport.initialize();
app.use(passport.authenticate('jwt', { session: false }));
app.use(appAuth.authorizeUser());

app.use(uploadedFiles({
  uploadDir: path.resolve(__dirname, 'public', 'uploads'),
  routes: {
    '/users': {
      method: 'post',
      fieldName: 'avatar',
    },
    '/books/:bookId(\\d+)': {
      method: 'put',
      fieldName: 'cover',
    },
  },
}));

app.get('/', welcome);
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

