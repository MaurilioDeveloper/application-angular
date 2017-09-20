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
var app_message_1 = require("./../../app.message");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var BrlDirective = /** @class */ (function () {
    function BrlDirective(model, appMessage, el) {
        this.model = model;
        this.appMessage = appMessage;
        this.el = el;
        this.ngModelChange = new core_1.EventEmitter();
        this.focus = false;
    }
    ;
    BrlDirective.prototype.ngOnInit = function () {
        var _this = this;
        var value = "0";
        if (this.model.model) {
            value = this.model.model;
        }
        setTimeout(function () {
            value = _this.toNumber(value).toFixed(2);
            _this.el.nativeElement.value = _this.toBrasilNumber(value);
        });
    };
    BrlDirective.prototype.limitValue = function (value) {
        value = value.toString();
        if (this.minValue && this.maxValue) {
            if (typeof value === "string") {
                value = parseFloat(value.replace(',', '.').replace('R$ ', ''));
            }
            if (value < this.minValue) {
                value = this.minValue;
            }
            if (value > this.maxValue) {
                value = this.maxValue;
            }
        }
    };
    BrlDirective.prototype.toNumber = function (valor) {
        valor = valor.toString();
        if (isNaN(parseFloat(valor))) {
            return 0;
        }
        else if (parseFloat(valor) < 0) {
            valor = parseFloat(valor) * -1;
            //   this.appMessage.showWarning("Valor " +  valor);
            return valor;
        }
        else {
            if (valor.indexOf('.') != -1) {
                if (valor.indexOf(',') != -1) {
                    //1.000,00
                    if (valor.indexOf('.') < valor.indexOf(',')) {
                        valor = valor.replace('.', '');
                        valor = valor.replace(',', '.');
                        //1,000.00
                    }
                    else {
                        valor = valor.replace(',', '');
                    }
                }
            }
            else {
                //1,00
                if (valor.indexOf(',') != -1) {
                    valor = valor.replace(',', '.');
                }
            }
            return (Math.round(parseFloat(valor) * 100)) / 100;
        }
    };
    BrlDirective.prototype.onInputChange = function (event) {
        //console.log("onInputChange", event);
        var _this = this;
        //event = this.replaceStrigToNumber(event);
        var start = this.el.nativeElement.selectionStart;
        var end = this.el.nativeElement.selectionEnd;
        if (!this.focus) {
            setTimeout(function () {
                console.log("onInputChange setTimeout", event);
                event = event.toString();
                event = event.toFixed(2);
                _this.el.nativeElement.value = _this.toBrasilNumber(event);
            });
        }
        else {
            if (!this.model.model) {
                return;
            }
            var value = "" + this.model.model.toString();
            var haveComa = (("" + event).indexOf(',') != -1);
            var repp = ("" + event).replace(',', '.');
            var test = (repp.indexOf('.') != -1 && repp.indexOf('.') < repp.length - 3);
            if (test) {
                // console.log('teste')
                var ret = this.toNumber(repp);
                if (haveComa) {
                    ret = ret.toFixed(2).replace('.', ',');
                }
                else {
                    ret = ret.toFixed(2);
                }
                this.el.nativeElement.value = ret;
                setTimeout(function () {
                    _this.el.nativeElement.setSelectionRange(start, end);
                });
            }
            if (value.indexOf(',') != -1) {
                var old_1 = this.el.nativeElement.value;
                value = this.toNumber(value);
                this.model.model = value;
                this.ngModelChange.emit(value);
                setTimeout(function () {
                    _this.el.nativeElement.value = old_1;
                    _this.el.nativeElement.setSelectionRange(start, end);
                });
            }
        }
    };
    BrlDirective.prototype.toBrasilNumber = function (value) {
        value = value.replace('.', ',');
        return "R$ " + value;
    };
    BrlDirective.prototype.onFocus = function ($event) {
        this.focus = true;
        var valor = $event.target.value.toString();
        valor = valor.replace('.', ',').replace('R$ ', '');
        if (valor === "0" || valor === "0,00") {
            valor = "";
        }
        this.el.nativeElement.value = valor;
    };
    BrlDirective.prototype.onBlur = function ($event) {
        var _this = this;
        var valor = $event.target.value.toString();
        if (valor.length === 0 || !valor.trim()) {
            valor = "0";
        }
        // console.log("teste ff");
        valor = this.toNumber(valor);
        this.model.model = valor;
        this.ngModelChange.emit(valor);
        setTimeout(function () {
            //   console.log("valor", valor);
            valor = valor.toFixed(2);
            _this.el.nativeElement.value = _this.toBrasilNumber(valor);
        });
        this.focus = false;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BrlDirective.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.Input('valid'),
        __metadata("design:type", Object)
    ], BrlDirective.prototype, "valid", void 0);
    __decorate([
        core_1.Input('minvalue'),
        __metadata("design:type", Number)
    ], BrlDirective.prototype, "minValue", void 0);
    __decorate([
        core_1.Input('maxvalue'),
        __metadata("design:type", Number)
    ], BrlDirective.prototype, "maxValue", void 0);
    __decorate([
        core_1.Input('mask'),
        __metadata("design:type", String)
    ], BrlDirective.prototype, "mask", void 0);
    __decorate([
        core_1.HostListener('focus', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BrlDirective.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BrlDirective.prototype, "onBlur", null);
    BrlDirective = __decorate([
        core_1.Directive({
            selector: '[brlformater]',
            providers: [forms_1.NgModel],
            host: {
                '(ngModelChange)': 'onInputChange($event)'
            }
        }),
        __metadata("design:paramtypes", [forms_1.NgModel, app_message_1.AppMessage, core_1.ElementRef])
    ], BrlDirective);
    return BrlDirective;
}());
exports.BrlDirective = BrlDirective;
//# sourceMappingURL=brlDiretive.directive.js.map