/* eslint-disable import/prefer-default-export */
/// <reference types="@atvise/types-webmi" />
function getWebMI() {
    if (!window.webMI) {
        throw new Error("No webmi detected. Is your atvise server running?");
    }
    return window.webMI;
}

var webmiData = getWebMI().data;
function isErrorResult(result) {
    return result.error;
}
var createDataError = function (result) {
    return Object.assign(new Error(result.errorstring), { code: result.error });
};
function resultCallback(resolve, reject) {
    return function (result) {
        if (isErrorResult(result)) {
            reject(createDataError(result));
        }
        else {
            resolve(result);
        }
    };
}
function promisifyDataCall(fn) {
    return new Promise(function (resolve, reject) { return fn(resultCallback(resolve, reject)); });
}
function read(address) {
    return promisifyDataCall(function (cb) { return webmiData.read(address, cb); });
}
function write(address, value) {
    return promisifyDataCall(function (cb) { return webmiData.write(address, value, cb); });
}
function call(name, args) {
    return promisifyDataCall(function (cb) { return webmiData.call(name, args, cb); });
}
function subscribe(address, onResult) {
    var subscription = webmiData.subscribe(address, function (result) {
        return onResult(isErrorResult(result) ? { error: createDataError(result) } : { data: result });
    });
    return {
        cancel: function () { return webmiData.unsubscribe(subscription); }
    };
}

export { call, read, subscribe, write };
//# sourceMappingURL=index.mjs.map
