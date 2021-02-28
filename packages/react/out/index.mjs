import React from 'react';

function init() {
    if (process.env.NODE_ENV === 'development') {
        webMI.setConfig('data.websocket', false);
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * Registers an event handler. Can be used with DOM elements as well as with webMI internal modules
 * (such as webMI.data).
 * @param target The event target.
 * @param name The event to handle.
 * @param handler The event handler.
 */

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

/**
 * A hook that returns a variable's value.
 * @param address The variable's node id.
 */
function useValue(address) {
    var _this = this;
    var _a = React.useState({
        loading: true
    }), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        var readValue = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, read(address)];
                    case 1:
                        data = _a.sent();
                        setState({
                            loading: false,
                            data: data
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        setState({ loading: false, error: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        readValue();
    }, [address]);
    return state;
}

/**
 * A hook that returns the live value of a variable.
 * @param address The variable's address.
 */
function useSubscription(address) {
    var _a = React.useState({
        loading: true,
        value: null
    }), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        var subscription = subscribe(address, function (value) {
            setState(__assign({ loading: false }, value));
        });
        return subscription.cancel;
    }, [address]);
    return state;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
var noop = function () { };
/**
 * A hook to call a webMI method script.
 * @param name The method script to call.
 * @param options The options to use.
 */
function useCall(name, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, defaults = _b.defaults, _c = _b.onCompleted, onCompleted = _c === void 0 ? noop : _c, _d = _b.onError, onError = _d === void 0 ? noop : _d;
    var _e = React.useState({
        called: false,
        loading: false,
        data: undefined
    }), state = _e[0], setState = _e[1];
    var callScript = React.useCallback(function (args) { return __awaiter(_this, void 0, void 0, function () {
        var data_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setState(function (current) { return (__assign(__assign({}, current), { called: true, loading: true })); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, call(name, __assign(__assign({}, (defaults || {})), args))];
                case 2:
                    data_1 = _a.sent();
                    setState(function (c) { return (__assign(__assign({}, c), { data: data_1, error: undefined, loading: false })); });
                    onCompleted(data_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setState(function (c) { return (__assign(__assign({}, c), { data: undefined, error: error_1, loading: false })); });
                    onError(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [name, defaults]);
    return [callScript, state];
}

init();

export { useCall, useSubscription, useValue };
//# sourceMappingURL=index.mjs.map
