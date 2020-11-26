var { addRoute } = require('../services/inputFile');
var { findBestRoute } = require('../services/routes');

var includeRoute = async (req, resp) => {

    await addRoute(req.body.route)
    
    return resp.status(200).send({ response: 'Route included' });
};

var findPath = async (req, resp) => {

    var bestRoute = await findBestRoute(req.query.origin, req.query.target);
    var bestPathStr = bestRoute.path.join(' - ');
    var response = { bestPath: bestPathStr, price: bestRoute.price }

    return resp.send(response);
};

module.exports = {
    includeRoute,
    findPath,
};
