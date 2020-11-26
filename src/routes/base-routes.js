const routesPath = "/routes";
const routes = require("../controllers/routesController");

module.exports = (app) => {
    app.post(`${routesPath}`, routes.includeRoute);
    app.get(`${routesPath}`, routes.findPath);
};
