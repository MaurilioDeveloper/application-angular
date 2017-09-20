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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var EmailRenaultComponent = /** @class */ (function () {
    function EmailRenaultComponent(route) {
        this.route = route;
    }
    ;
    EmailRenaultComponent.prototype.ngOnInit = function () {
        this.splitUrls = this.route.url.split('/');
        this.url = "localhost:8021/#/" + this.splitUrls[1] + "/" + this.splitUrls[3] + "/" + this.splitUrls[2];
    };
    EmailRenaultComponent = __decorate([
        core_1.Component({
            selector: 'email-renault',
            templateUrl: './app/forget_password/email-renault.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], EmailRenaultComponent);
    return EmailRenaultComponent;
}());
exports.EmailRenaultComponent = EmailRenaultComponent;
;
//# sourceMappingURL=email-renault.component.js.map