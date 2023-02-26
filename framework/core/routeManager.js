class RouteManager {
  constructor(app) {
    this.app = app;
    this.routes = [];
  }

  addRoute(route) {
    this.routes.push(route);
    this.app[route.method.toLowerCase()](route.path, ...route.handler);
  }
}

module.exports = RouteManager;
