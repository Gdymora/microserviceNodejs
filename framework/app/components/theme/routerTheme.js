const express = require('express');
const router = express.Router();
const DirectoryTraversal = require('../../../core/cli/directoryTraversal');
const traversal = new DirectoryTraversal();

router.get('/', async (req, res) => {
 let directory = await traversal.traverseDirectory('./themes');
  res.send('theme router ' + JSON.stringify(directory));
});

module.exports = router;
