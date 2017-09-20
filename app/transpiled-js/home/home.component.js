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
var app_service_1 = require("./../app.service");
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(appService) {
        this.appService = appService;
    }
    ;
    HomeComponent.prototype.ngOnInit = function () {
        this.loadImageFinancialBrand();
    };
    HomeComponent.prototype.loadImageFinancialBrand = function () {
        var _this = this;
        var observable = this.appService.xSearch('financialBrandService', 'findImageFinancialBrandByUser');
        observable.subscribe(function (data) {
            var response = data.json();
            _this.file = response.file;
        }, function (err) {
            console.log(err.json());
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './app/home/home.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
;
//# sourceMappingURL=home.component.js.map