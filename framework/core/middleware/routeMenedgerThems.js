'use strict';
const path = require('path');
const RouteManager = require('../routeManager');
const ServiceTheme = require('../services/serviceTheme');
class middlewareRouteMenedgerThems {
  serviceTheme = new ServiceTheme();
  theme = this.serviceTheme.getActiveTheme();

  pagesPath = path.join(__dirname, `../../themes/${this.theme.name}/public`);
  getRoutesPagesPath = require(`../../themes/${this.theme.name}/routes`);
  generateRoute(app) {
    const routeManager = new RouteManager(app);
    const routes = new this.getRoutesPagesPath().getRoutes(this.pagesPath);
    routes.forEach((route) => {
      routeManager.addRoute(route);
    });
  }
}

module.exports = middlewareRouteMenedgerThems;
