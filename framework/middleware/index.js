const myMiddleware = (req, res, next) => {
  console.log('Executing my middleware');
  next();
};

module.exports = myMiddleware;