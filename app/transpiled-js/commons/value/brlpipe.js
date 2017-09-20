"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PADDING = "000000";
var BrlPipe = /** @class */ (function () {
    function BrlPipe() {
        // TODO comes from configuration settings
        this.PREFIX = 'R$ ';
        this.DECIMAL_SEPARATOR = ",";
        this.THOUSANDS_SEPARATOR = ".";
        this.SUFFIX = '';
    }
    BrlPipe.prototype.transform = function (value, fractionSize) {
        if (fractionSize === void 0) { fractionSize = 2; }
        var _a = (value || "").toString()
            .split("."), integer = _a[0], _b = _a[1], fraction = _b === void 0 ? "" : _b;
        fraction = fractionSize > 0
            ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
            : "";
        if (integer.indexOf("R$") + 1) {
            integer = integer.replace('R$ ', '');
            if (integer.indexOf(fraction) + 1) {
                integer = integer.replace(fraction, '');
            }
        }
        else {
            integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
        }
        // return this.PREFIX + integer + fraction;
        if (integer.trim().length === 0) {
            integer = "0";
        }
        return this.PREFIX + integer + fraction;
    };
    BrlPipe.prototype.parse = function (value, fractionSize) {
        if (fractionSize === void 0) { fractionSize = 2; }
        var _a = (value || "").replace(this.PREFIX, "")
            .replace(this.SUFFIX, "")
            .split(this.DECIMAL_SEPARATOR), integer = _a[0], _b = _a[1], fraction = _b === void 0 ? "" : _b;
        integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");
        fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
            ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
            : "";
        return integer + fraction;
    };
    BrlPipe = __decorate([
        core_1.Pipe({ name: "money" }),
        __metadata("design:paramtypes", [])
    ], BrlPipe);
    return BrlPipe;
}());
exports.BrlPipe = BrlPipe;
//# sourceMappingURL=brlpipe.js.map