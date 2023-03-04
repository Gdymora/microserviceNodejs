"use strict";
const path = require("path");
const RouteManager = require("../routeManager");
const ServiceTheme = require("../../app/routes/serviceTheme");
class middlewareRouteMenedgerThems {
  serviceTheme = new ServiceTheme();
  constructor(db) {
    this.db = db;
      this.init();
    }
    posts; 
    async init() {
      this.posts = await this.serviceTheme.getDataTheme(this.db);     
    }

  theme = this.serviceTheme.getActiveTheme();
  getRoutesPagesPath = require(`../../themes/${this.theme.name}/routes`);
  async someFunction() {
    const data = {
     pagesPath: await path.join(__dirname, `../../themes/${this.theme.name}/public`),
     posts: await this.serviceTheme.getDataTheme(this.db),
   };
   
   return await new this.getRoutesPagesPath().getRoutes(data);
    
 }
 async generateRoute(app) {
    const routeManager = new RouteManager(app);
    const routes = await this.someFunction(); //new this.getRoutesPagesPath().getRoutes(this.data);
    routes.forEach((route) => {
      routeManager.addRoute(route);
    });
  }
}

module.exports = middlewareRouteMenedgerThems;
