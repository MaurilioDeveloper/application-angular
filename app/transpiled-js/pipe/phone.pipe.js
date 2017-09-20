"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PhonePipe = /** @class */ (function () {
    function PhonePipe() {
    }
    PhonePipe.prototype.transform = function (value) {
        if (value) {
            value = value.toString();
            if (value.length == 10) {
                return value.substring(0, 0).concat("(")
                    .concat(value.substring(3, 1))
                    .concat(")")
                    .concat(value.substring(6, 1))
                    .concat("-").concat(value.substr(7, 4));
            }
            else {
                return value.substring(0, 0).concat("(")
                    .concat(value.substring(3, 1))
                    .concat(")")
                    .concat(value.substring(5, 1))
                    .concat("-").concat(value.substr(6, 4));
            }
        }
        return value;
    };
    PhonePipe = __decorate([
        core_1.Pipe({ name: 'phoneMask' })
    ], PhonePipe);
    return PhonePipe;
}());
exports.PhonePipe = PhonePipe;
//# sourceMappingURL=phone.pipe.js.map