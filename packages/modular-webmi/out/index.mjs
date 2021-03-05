/**
 * Registers an event handler. Can be used with DOM elements as well as with webMI internal modules
 * (such as webMI.data).
 * @param target The event target.
 * @param name The event to handle.
 * @param handler The event handler.
 */
function addEvent(target, name, handler) {
    var active = true;
    webMI.addEvent(target, name, function (e) {
        if (!active)
            return;
        handler(e);
    });
    // NOTE: webMI.removeEvent is not implemented for all events 🙄
    // We call it with the same signature as addEvent, but don't rely on it to work.
    return function () {
        active = false;
        webMI.removeEvent(target, name, handler);
    };
}

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
var isLoginErrorResult = function (result) { return Object.prototype.hasOwnProperty.call(result, 'error'); };
var isLoginSuccessResult = function (result) { return !isLoginErrorResult(result) && !!result.username; };
function login(username, password) {
    return new Promise(function (resolve, reject) {
        webmiData.login(username, password, function (_a) {
            var result = _a[""];
            if (isLoginErrorResult(result))
                reject(new Error(result.error));
            else
                resolve(isLoginSuccessResult(result) ? result : null);
        });
    });
}
function logout() {
    return new Promise(function (resolve) { return webmiData.logout(resolve); });
}
var addDataEvent = function (name, callback) { return addEvent(webmiData, name, callback); };
function subscribe(address, onResult) {
    var subscription = webmiData.subscribe(address, function (result) {
        return onResult(isErrorResult(result) ? { error: createDataError(result) } : { data: result });
    });
    return {
        cancel: function () { return webmiData.unsubscribe(subscription); }
    };
}

export { addDataEvent, addEvent, call, login, logout, read, subscribe, write };
//# sourceMappingURL=index.mjs.map
