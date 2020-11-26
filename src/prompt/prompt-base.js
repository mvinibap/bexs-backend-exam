const routesService = require('../services/routes');
const { getDb } = require('../services/inputFile');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function consoleInterface() {
    rl.question('please enter the route:', async function (route) {
        var routes = route.split("-");
        var origin = routes[0];
        var destination = routes[1];

        var bestRoute = await routesService.findBestRoute(origin, destination)

        var bestRouteStr = bestRoute.path.join(' - ');

        console.log(`best route: ${bestRouteStr} > $${bestRoute.price}`);

        consoleInterface();
    });

}

module.exports = {
    consoleInterface
}
