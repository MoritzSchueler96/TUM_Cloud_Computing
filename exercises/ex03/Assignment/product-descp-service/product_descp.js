module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    //Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductURL', productURL);
    this.add('role:product,cmd:getProductName', productName);

    //To DO: add the pattern functions and describe the logic inside the function
    function productURL(msg, respond) {
        console.log(msg);
        const bookId = msg.Id;
        var parsed = JSON.parse(mockData);
        var res = parsed[bookId].productURL;
        console.log(`book ID = ${bookId} \n`);
        console.log(`book name = ${res} \n`);
        respond(null, { result: res });
    }

    function productName(msg, respond) {
        console.log(msg);
        const bookId = msg.Id;
        var parsed = JSON.parse(mockData);
        var res = parsed[bookId].productName;
        console.log(`book ID = ${bookId} \n`);
        console.log(`book name = ${res} \n`);
        respond(null, { result: res });
    }
};
