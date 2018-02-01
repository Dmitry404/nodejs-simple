const express = require('express');
const path = require('path');

const welcome = express.Router();

welcome.get('/', (req, res) => {
  const { host } = req.headers.host;
  res.send(`<h2>Hello Worm</h2> Go to <a href="http://${host}/api/v1/readme">http://${host}/api/v1/readme</a> to get started`);
});

welcome.get('/api/v1/readme', (req, res) => {
  const options = {
    root: path.resolve(__dirname, '..', 'public'),
    headers: {
      'Content-Type': 'text/markdown',
    },
  };
  res.sendFile('README.md', options);
});

module.exports = welcome;
