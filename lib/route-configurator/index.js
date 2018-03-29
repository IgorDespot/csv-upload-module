/*
input json
{
    "/": './routes/login/index'
}
*/
var path = require('path');

module.exports = function configureRoutes(expressApp, config, basePath) {
    if (!basePath) {
        throw "You did not specify the base Route path."
    }
    var mapᐸpathͺRouteᐳ = getPathToRouteMapping(config, basePath);
    mount(expressApp, mapᐸpathͺRouteᐳ);
}

function getPathToRouteMapping(config, basePath) {
    var mountPaths = Object.getOwnPropertyNames(config);
    var mapᐸpathͺRouteᐳ = {}
    mountPaths.forEach((mountPath) => {
        mapᐸpathͺRouteᐳ[mountPath] = require(
            path.join(basePath, config[mountPath])
        );
    });
    return mapᐸpathͺRouteᐳ;
}

function mount(expressApp, mountPathToRouteMap) {
    var mountPaths = Object.getOwnPropertyNames(mountPathToRouteMap);
    mountPaths.forEach((mountPath) => {
        expressApp.use(mountPath, mountPathToRouteMap[mountPath]);
    });
}
