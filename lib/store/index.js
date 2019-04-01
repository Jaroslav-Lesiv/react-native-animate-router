"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var mobx_1 = require("mobx");
var RouterStore = /** @class */ (function () {
    function RouterStore(config) {
        this.history = [];
        this.initialRoute = {
            key: ""
        };
        this.initialRoute = config.route;
        this.history = [config.route];
    }
    RouterStore.prototype.push = function (key, params) {
        if (params === void 0) { params = {}; }
        this.history.push({
            key: key,
            params: params
        });
    };
    RouterStore.prototype.replace = function (key, params) {
        if (params === void 0) { params = {}; }
        this.history[this.history.length - 1] = { key: key, params: params };
    };
    RouterStore.prototype.back = function () {
        var previsionRoute = this.history[this.history.length - 2];
        if (previsionRoute) {
            this.history = this.history.slice(0, this.history.length - 1);
        }
        else {
            this.history = [this.initialRoute];
        }
    };
    Object.defineProperty(RouterStore.prototype, "currentRoute", {
        get: function () {
            return this.history[this.history.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], RouterStore.prototype, "history");
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "push");
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "replace");
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "back");
    __decorate([
        mobx_1.computed
    ], RouterStore.prototype, "currentRoute");
    return RouterStore;
}());
exports["default"] = RouterStore;
