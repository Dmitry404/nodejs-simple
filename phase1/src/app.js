const compression = require('compression');
const morgan = require('morgan');
const winston = require('winston');
const moment = require('moment');
const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../conf/swagger.json');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h2>Hello Worm</h2> Go to <a href="http://localhost:3000/api/v1/readme">http://localhost:3000/api/v1/readme</a> to get started');
});
router.get('/api/v1/readme', (req, res) => {
  const options = {
    root: __dirname,
    headers: {
      'Content-Type': 'text/markdown',
    },
  };
  res.sendFile('static/README.md', options);
});

router.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, 'static/404.png'));
});

router.use((err, req, res) => {
  winston.error(err);
  if (app.get('env') === 'development') {
    res.status(500).send(err.stack);
  } else {
    res.status(500).end();
  }
});

app.use(morgan('combined'));
app.use(compression());
app.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/', router);
app.listen(3000, () => winston.info(`Phase 1 app has been started on http://localhost:3000 at ${moment().toISOString()}`));
