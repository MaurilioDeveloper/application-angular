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
var app_message_1 = require("./../app.message");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var CustomPhoneDiretive = /** @class */ (function () {
    function CustomPhoneDiretive(model, appMessage) {
        var _this = this;
        this.model = model;
        this.appMessage = appMessage;
        this.model.control.valueChanges.subscribe(function (data) {
            if (!data) {
                return;
            }
            var valor = data.replace(/\D/g, '');
            if (valor.length == 11) {
                data = data.replace(/\D/g, '');
                data = data.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                _this.valid = true;
            }
            else if (valor.length == 10) {
                data = data.replace(/\D/g, '');
                data = data.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                _this.valid = true;
            }
            else {
                data = data.replace(/\D/g, '');
                _this.valid = false;
            }
            _this.model.valueAccessor.writeValue(data);
            _this.model.viewToModelUpdate(valor);
            _this.model.model = valor;
        });
    }
    CustomPhoneDiretive.prototype.onBlur = function ($event) {
        if (!this.valid) {
            this.appMessage.showError("Campo Telefone inválido");
        }
        var parent = $event.srcElement.closest('md-input-container');
        parent.className = parent.className.replace(" fieldInvalid", "");
        if (!this.valid) {
            parent.className += " fieldInvalid";
        }
    };
    __decorate([
        core_1.Input('valid'),
        __metadata("design:type", Object)
    ], CustomPhoneDiretive.prototype, "valid", void 0);
    CustomPhoneDiretive = __decorate([
        core_1.Directive({
            selector: '[customphone]',
            host: { '(blur)': 'onBlur($event)' }
        }),
        __metadata("design:paramtypes", [forms_1.NgModel, app_message_1.AppMessage])
    ], CustomPhoneDiretive);
    return CustomPhoneDiretive;
}());
exports.CustomPhoneDiretive = CustomPhoneDiretive;
//# sourceMappingURL=customPhone.directive.js.map