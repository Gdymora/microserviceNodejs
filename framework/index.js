const express = require('express');
const userRouter = require('./components/user/userRouter');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 500 })
);

app.use('/users', userRouter.init());

app.use(function (err, req, res, next) {
  const logger = container.resolve('logger');
  logger.error(err);
  res.status(500).send('Something went wrong');
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
