"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CnpjPipe = /** @class */ (function () {
    function CnpjPipe() {
    }
    CnpjPipe.prototype.transform = function (value) {
        if (value) {
            value = value.toString();
            if (value.length === 14) {
                return value.substring(0, 2).concat(".")
                    .concat(value.substring(2, 5))
                    .concat(".")
                    .concat(value.substring(5, 8))
                    .concat("/")
                    .concat(value.substring(8, 12))
                    .concat("-")
                    .concat(value.substring(12, 14));
            }
        }
        return value;
    };
    CnpjPipe = __decorate([
        core_1.Pipe({ name: 'cnpjMask' })
    ], CnpjPipe);
    return CnpjPipe;
}());
exports.CnpjPipe = CnpjPipe;
//# sourceMappingURL=cnpj.pipe.js.map