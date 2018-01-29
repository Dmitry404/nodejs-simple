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
  errorHandlers, uploadedFiles, appAuth, PassportAnonymous,
} = require('./middlewares');
const {
  welcome, books, users, rates, authors, reviews, book, accounts,
} = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const swaggerDoc = YAML.load('conf/swagger.yaml');
app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const publicRoutes = {
  '/': 'GET',
  '/favicon.ico': 'GET',
  '/api/v1/readme': 'GET',
  '/users/sign-in': 'GET',
  '/users/sign-up': 'POST',
};
passport.use(new PassportAnonymous(publicRoutes));
passport.use(appAuth.jwtStrategy);
passport.initialize();
app.use(passport.authenticate(['jwt', 'anonymous'], { session: false }));
app.use(appAuth.authorizeUser());

app.use(uploadedFiles({
  uploadDir: path.resolve(__dirname, 'public', 'uploads'),
  routes: {
    '/users': {
      method: 'POST',
      fieldName: 'avatar',
    },
    '/books/:bookId(\\d+)': {
      method: 'PUT',
      fieldName: 'cover',
    },
  },
}));

app.get('/', welcome);
app.get('/api/v1/readme', welcome);
app.use('/books', books);
app.use('/books/:bookId(\\d+)', book);
app.use('/books/:bookId(\\d+)/reviews', reviews);
app.use('/users', users);
app.use('/users/sign-[in|out|up]', accounts);
app.use('/rates', rates);
app.use('/authors', authors);

app.set('json spaces', app.get('env') === 'development' ? 2 : 0);

app.use(errorHandlers.pageNotFound);
app.use(errorHandlers.serverError);

module.exports = app;
