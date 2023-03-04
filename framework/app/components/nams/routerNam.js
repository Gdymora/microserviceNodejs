const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('nam router');
});

module.exports = router;
