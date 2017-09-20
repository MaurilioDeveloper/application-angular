"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DatexPipe = /** @class */ (function () {
    function DatexPipe() {
    }
    DatexPipe.prototype.transform = function (value, format) {
        if (format === void 0) { format = ""; }
        if (!value || value === "")
            return "";
        var data = new Date(value);
        return this.getFormattedDate(data);
    };
    DatexPipe.prototype.getFormattedDate = function (date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        var hour = date.getHours();
        hour = hour > 9 ? hour : '0' + hour;
        var minutes = date.getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;
        var seconds = date.getSeconds();
        seconds = seconds > 9 ? seconds : '0' + seconds;
        return day + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds;
    };
    DatexPipe = __decorate([
        core_1.Pipe({
            name: 'datex'
        })
    ], DatexPipe);
    return DatexPipe;
}());
exports.DatexPipe = DatexPipe;
//# sourceMappingURL=date.pipe.js.map