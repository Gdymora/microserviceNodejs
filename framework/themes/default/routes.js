class getRoutesPagesPath {
  getRoutes(data) { 
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
            res.render(data.pagesPath, { posts: data.posts, showRecentPostsWidget: true });
          },
        ],
      },
      {
        method: 'GET',
        path: '/about',
        handler: [
          (req, res) => {
            res.render(data.pagesPath + '/about', { posts: data.posts, showRecentPostsWidget: true });
          },
        ],
      },
      {
        method: 'GET',
        path: '/blog',
        handler: [
          (req, res) => {
            res.render(data.pagesPath + '/blog', { posts: data.posts });
          },
        ],
      },
    ];
    return routes;
  }
}

module.exports = getRoutesPagesPath;
