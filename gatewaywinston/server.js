require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.serverTargetPort;

app.get('/search/new-path', (req, res) => {
  res.send('Successfully route proxy');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
