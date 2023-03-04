class RouterComponentGenerator {
  static generate(name) {
    return `const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('${name} router');
});

module.exports = router;
`;
  }
}
module.exports = RouterComponentGenerator;
