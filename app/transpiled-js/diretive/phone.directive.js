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
var PhoneMaskDirective = /** @class */ (function () {
    function PhoneMaskDirective(elementRef) {
        this.elementRef = elementRef;
        this.ngModelChange = new core_1.EventEmitter();
        this.onChange = this.elementRef.nativeElement;
    }
    PhoneMaskDirective.prototype.ngOnInit = function () {
    };
    PhoneMaskDirective.prototype.writeValue = function (value) {
        console.log(value);
    };
    PhoneMaskDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    PhoneMaskDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    PhoneMaskDirective.prototype.onKeyup = function ($event) {
        console.log($event);
    };
    PhoneMaskDirective.prototype.onBlur = function ($event) {
        console.log($event);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PhoneMaskDirective.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.HostListener('keyup', ['$event.target.value']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PhoneMaskDirective.prototype, "onKeyup", null);
    __decorate([
        core_1.HostListener("blur", ["$event.target.value"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PhoneMaskDirective.prototype, "onBlur", null);
    PhoneMaskDirective = __decorate([
        core_1.Directive({
            selector: "[phone]",
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], PhoneMaskDirective);
    return PhoneMaskDirective;
}());
exports.PhoneMaskDirective = PhoneMaskDirective;
//# sourceMappingURL=phone.directive.js.map