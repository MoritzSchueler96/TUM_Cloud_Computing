module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');
    //To DO: Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductPrice', productPrice);

    //To DO: add the pattern functions and describe the logic inside the function
    function productPrice(msg, respond) {
        console.log(msg);
        const bookId = msg.Id;
        var parsed = JSON.parse(mockData);
        var res = parsed[bookId].productPrice;
        console.log(`book ID = ${bookId} \n`);
        console.log(`book name = ${res} \n`);
        respond(null, { result: res });
    }
};
