module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    //To DO: Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductPrice', productPrice);


    //To DO: add the pattern functions and describe the logic inside the function
    function productPrice(msg, respond) {
        res = '';
        for (let i = 0; i < mockData.length; i++) {
            if(msg.productId == mockData[i].product_id){
                res = mockData[i].product_price;
                break;
            }               
        }
        respond(null, { result: res });
    }

}