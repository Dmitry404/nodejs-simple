const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const moment = require('moment');
const express = require('express');
const path = require('path');

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
  res.sendFile('README.md', options);
});

router.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '404.png'));
});

app.use(morgan('combined'));
app.use('/', router);
app.listen(3000, () => console.log('Phase 1 app is running on http://localhost:3000'));
