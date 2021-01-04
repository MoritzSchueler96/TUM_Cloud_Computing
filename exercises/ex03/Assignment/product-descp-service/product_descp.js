module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    //Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductURL', productURL);
    this.add('role:product,cmd:getProductName', productName);

    //To DO: add the pattern functions and describe the logic inside the function
    function productURL(msg, respond) {
        var res = '';

        for (let i = 0; i < mockData.length; i++) {
            // program logic
            if (mockData[i].product_id == msg.productId) {
                res = mockData[i].product_url;
                break;
            }
        }
        respond(null, { result: res });
    }

    function productName(msg, respond) {
        var res = '';

        for (let i = 0; i < mockData.length; i++) {
            // program logic
            if (mockData[i].product_id == msg.productId) {
                res = mockData[i].product_name;
                break;
            }
        }
        respond(null, { result: res });
    }
};
