'use strict';

function main(params) {
    var groupNo = params['groupNo'];

    if (groupNo) {
        return {"group": 'group ' + groupNo + ' application deployed using openwhisk'};
    } else {
        return {"group": 'group 33 application deployed using openwhisk'};
    }
}
