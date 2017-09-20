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
var app_service_1 = require("./../../app.service");
var province_dto_1 = require("./dto/province.dto");
var core_1 = require("@angular/core");
var ProvinceComponent = /** @class */ (function () {
    function ProvinceComponent(appService) {
        this.appService = appService;
        this.changeProvince = new core_1.EventEmitter();
    }
    ProvinceComponent.prototype.ngOnInit = function () {
        this.loadProvinces();
    };
    ProvinceComponent.prototype.ngOnChanges = function () {
        if (!this.provinceSelected) {
            this.loadProvinces();
            this.changeProvince.emit(this.provinceSelected);
        }
    };
    ProvinceComponent.prototype.changes = function (province) {
        this.provinceSelected = province;
        this.changeProvince.emit(this.provinceSelected);
    };
    ProvinceComponent.prototype.loadProvinces = function () {
        var _this = this;
        var states;
        if (this.provinceSelected) {
            var data = { idProvinceSelected: this.provinceSelected.id };
            states = this.appService.xSearchWithData("provinces/provinces", data);
        }
        else {
            states = this.appService.xSearchWithData("provinces/provinces", { idProvinceSelected: null });
        }
        states.subscribe(function (data) {
            var stateSelected;
            var response = data.json();
            _this.listProvinces = new Array();
            for (var i = 0; i < response.provinceList.length; i++) {
                var provincefor = response.provinceList[i];
                var province = new province_dto_1.Province();
                province.id = provincefor['id'];
                province.description = provincefor['description'];
                if (response.provinceSelected) {
                    if (response.provinceSelected.id === provincefor['id']) {
                        _this.provinceSelected = province;
                    }
                }
                _this.listProvinces.push(province);
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", province_dto_1.Province)
    ], ProvinceComponent.prototype, "provinceSelected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProvinceComponent.prototype, "changeProvince", void 0);
    ProvinceComponent = __decorate([
        core_1.Component({
            selector: 'province',
            templateUrl: 'app/commons/province/province.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService])
    ], ProvinceComponent);
    return ProvinceComponent;
}());
exports.ProvinceComponent = ProvinceComponent;
//# sourceMappingURL=province.component.js.map