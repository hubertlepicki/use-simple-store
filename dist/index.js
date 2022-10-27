"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = exports.Store = void 0;
var react_1 = require("react");
var immer_1 = __importDefault(require("immer"));
var shallowequal_1 = __importDefault(require("shallowequal"));
var with_selector_1 = require("use-sync-external-store/shim/with-selector");
var Store = /** @class */ (function () {
    function Store(initialState) {
        this._listeners = [];
        this._state = Object(initialState);
        this.getState = this.getState.bind(this);
        this.update = this.update.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.useStore = this.useStore.bind(this);
    }
    Store.prototype.getState = function () {
        return this._state;
    };
    Store.prototype.update = function (mutate) {
        var _this = this;
        var nextState = (0, immer_1.default)(this._state, mutate);
        if (this._state !== (this._state = nextState)) {
            this._listeners.forEach(function (fn) { return fn(_this._state); });
        }
    };
    Store.prototype.subscribe = function (listener) {
        var _this = this;
        this._listeners.push(listener);
        return function () { return void _this._listeners.splice(_this._listeners.indexOf(listener), 1); };
    };
    Store.prototype.useStore = function (selector, deps) {
        if (selector === void 0) { selector = passThrough; }
        if (deps === void 0) { deps = []; }
        return (0, with_selector_1.useSyncExternalStoreWithSelector)(this.subscribe, this.getState, this.getState, (0, react_1.useCallback)(selector, deps), shallowequal_1.default);
    };
    return Store;
}());
exports.Store = Store;
function passThrough(val) {
    return val;
}
function createStore(initialState) {
    return new Store(initialState);
}
exports.createStore = createStore;
exports.default = createStore;
