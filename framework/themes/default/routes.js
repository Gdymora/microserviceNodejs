class getRoutesPagesPath {
  getRoutes(pagesPath) {
    const routes = [
      {
        method: 'GET',
        path: '/index',
        handler: [
          (req, res) => {
            res.send('Hello, world!');
          },
        ],
      },
      {
        method: 'GET',
        path: '/',
        handler: [
          (req, res, next) => {
            console.log('I am middleware');
            next();
          },
          (req, res) => {
            res.render(pagesPath);
          },
        ],
      },
      {
        method: 'GET',
        path: '/blog',
        handler: [
          (req, res) => {
            res.render(pagesPath + '/blog');
          },
        ],
      },
    ];
    return routes;
  }
}

module.exports = getRoutesPagesPath;
