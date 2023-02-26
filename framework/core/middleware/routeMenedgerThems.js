'use strict';
const path = require('path');
const RouteManager = require('../routeManager');
const ServiceTheme = require('../../app/routes/serviceTheme');
class middlewareRouteMenedgerThems {
  serviceTheme = new ServiceTheme();
  theme = this.serviceTheme.getActiveTheme();
  posts = this.serviceTheme.getDataTheme();

  getRoutesPagesPath = require(`../../themes/${this.theme.name}/routes`);
  data = {
    pagesPath: path.join(__dirname, `../../themes/${this.theme.name}/public`),
    posts: this.posts,
  };
  generateRoute(app) {
    const routeManager = new RouteManager(app);
    const routes = new this.getRoutesPagesPath().getRoutes(this.data);
    routes.forEach((route) => {
      routeManager.addRoute(route);
    });
  }
}

module.exports = middlewareRouteMenedgerThems;
