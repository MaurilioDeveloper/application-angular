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
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var OmegaMaskDirective = /** @class */ (function () {
    function OmegaMaskDirective(model) {
        var _this = this;
        this.model = model;
        this.model.control.valueChanges.subscribe(function (data) {
            if (!data) {
                return;
            }
            var valor = data.replace(/\D/g, '');
            var pad = _this.OmegaMask.replace(/\D/g, '').replace(/9/g, '_');
            var valorMask = valor + pad.substring(0, pad.length - valor.length);
            var valorMaskPos = 0;
            valor = '';
            for (var i = 0; i < _this.OmegaMask.length; i++) {
                if (isNaN(parseInt(_this.OmegaMask.charAt(i)))) {
                    valor += _this.OmegaMask.charAt(i);
                }
                else {
                    valor += valorMask[valorMaskPos++];
                }
            }
            if (valor.indexOf('_') > -1) {
                valor = valor.substr(0, valor.indexOf('_'));
            }
            data = valorMask.substring(0, pad.length);
            _this.model.valueAccessor.writeValue(valor);
            _this.model.viewToModelUpdate(data);
            _this.model.model = data;
        });
    }
    __decorate([
        core_1.Input('omegamask'),
        __metadata("design:type", String)
    ], OmegaMaskDirective.prototype, "OmegaMask", void 0);
    OmegaMaskDirective = __decorate([
        core_1.Directive({
            selector: '[omegamask]',
        }),
        __metadata("design:paramtypes", [forms_1.NgModel])
    ], OmegaMaskDirective);
    return OmegaMaskDirective;
}());
exports.OmegaMaskDirective = OmegaMaskDirective;
//# sourceMappingURL=omegaMask.diretive.js.map