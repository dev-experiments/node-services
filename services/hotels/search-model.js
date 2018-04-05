const proHttp = require("./../../utility/proHttp");
const source = require("./hotels-source-service");

const searchQuery = function (req, res, next) {
    let data = {};
    data.docid = '022PXX22.XX22.131122132903.R1S7';
    data.type_flag = 2;
    const context = 'HTTP-FETCH-RSVN';
    const result = proHttp.get(source.rsvnInfo(), data).then(function (response) {
        if (response.data.error.code == 0) {

            const output = proHttp.successResponse()
                .setData(response.data.results)
                .setMessage('Result received')
                .setContext(context).output();
            //console.log('output',output);
            proHttp.success(res, output);
            // proHttp.debugPromise(response,res);
        } else {
            throw new Error(response.data.error.msg);
        }
    }).catch(function (err) {
        const output = proHttp.errorResponse()
            .setMessage(err.message)
            .setContext(context).output();
        //console.log(err.message, err);
        proHttp.error(res, output);
    });

}

module.exports = {
    searchQuery: searchQuery
}