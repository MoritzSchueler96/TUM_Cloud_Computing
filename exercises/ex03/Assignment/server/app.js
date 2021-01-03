// =============================================================================
/**
 * Cloud Computing Cource Exercises
 * Exercise 3
 *  Build A microservice
 * Developed by 'Group33'
 * Moritz Schüler, 03721689
 */
// =============================================================================
/**
 * BASE SETUP
 * import the packages we need
 */
const express = require('express');
/**
 * import the Services we need
 */
const helloWorldService = require('./services/helloWorld');
const productDescpService = require('./services/productDescp');
const productPriceService = require('./services/productPrice');
/**
 * javascript promises for join function
 */
const join = require('bluebird').join;

const app = express();

const router = express.Router();
/**
 * Middleware to use for all requests
 */
router.use(function (req, res, next) {
    /**
     * Logs can be printed here while accessing any routes
     */
    console.log('Accessing Exercises Routes');
    console.log('Params:');
    console.log(req.params);
    console.log('URL:');
    console.log(req.url);
    console.log('Result:');
    console.log(res.statusCode);
    console.log('Next:');
    next();
});
/**
 * Base route of the router : to make sure everything is working check http://localhost:8080/exercises)
 */
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to Cloud Computing Exercises API!' });
});
/**
 * Exercise 3:
 */
// query params: name & productId
router.route('/exercise3/:name/:productId').get(function (req, res) {
    console.log('Route params');
    console.log(req.params);
    join(
        helloWorldService.sayWelcome(req.params.name),
        productDescpService.getProductURL(req.params.productId),
        productDescpService.getProductName(req.params.productId),
        productPriceService.getProductPrice(req.params.productId),
        function (
            resulthelloWorld,
            productDescpServiceURL,
            productDescpServiceName,
            productPriceServicePrice
        ) {
            var ex3_response_message = {
                hello: resulthelloWorld.result,
                product_id: req.params.productId,
                productURL: productDescpServiceURL.result,
                productPrice: productPriceServicePrice.result,
                productName: productDescpServiceName.result,
            };
            res.send(ex3_response_message);
        }
    );
});
/**
 * REGISTER OUR ROUTES
 * our router is now pointing to /api
 */
app.use('/api', router);

module.exports = app;
