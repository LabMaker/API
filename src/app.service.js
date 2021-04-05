"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppService = exports.TypeTest = void 0;
var common_1 = require("@nestjs/common");
var submissionFile = require('./utils/submissionIds.json');
var TypeTest = /** @class */ (function () {
    function TypeTest(ids2) {
        this.ids = ids2;
        console.log('Created');
    }
    return TypeTest;
}());
exports.TypeTest = TypeTest;
var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.prototype.getSubmissions = function () {
        //return new TypeTest(['test', 'test2']);
        return submissionFile.ids;
    };
    AppService = __decorate([
        common_1.Injectable()
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
