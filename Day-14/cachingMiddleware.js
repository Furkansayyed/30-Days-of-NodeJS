const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 2 });

function cachingMiddleware(req, res, next) {
    const key = req.originalUrl; // Use request URL as cache key
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log('Response served from cache');
        return res.send(cachedResponse);
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            // Cache the response before sending it
            cache.set(key, body);
            console.log('Response cached');
            res.sendResponse(body);
        };
        next();
    }
}

module.exports = cachingMiddleware;
