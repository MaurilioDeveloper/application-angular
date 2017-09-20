"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var Color_dto_1 = require("./../../../../dto/client/Color.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var CarDetails_dto_1 = require("./../../../../dto/client/CarDetails.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var translate_service_1 = require("./../../../../../translate/translate.service");
var app_message_1 = require("./../../../../../app.message");
var app_service_1 = require("./../../../../../app.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var VehicleDataService = /** @class */ (function () {
    function VehicleDataService(appService, appMessage, _translate, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this._translate = _translate;
        this.simulationService = simulationService;
        this.listRegistrationProvince = new Array();
        this.listLicensingProvince = new Array();
        this.listVehicleColor = [];
        this.listVehicleOrigin = [];
    }
    ;
    VehicleDataService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_VEHICLE_DATA)) {
                _this.onload();
            }
        });
    };
    VehicleDataService.prototype.initializeFields = function () {
        if (!this.simulation.client.carDetails)
            this.simulation.client.carDetails = new CarDetails_dto_1.CarDetails();
        if (!this.simulation.client.carDetails.vehicleColor)
            this.simulation.client.carDetails.vehicleColor = new Color_dto_1.Color();
        if (!this.simulation.client.carDetails.registrationProvince) {
            if (!this.simulation.client.address.province) {
                this.simulation.client.carDetails.registrationProvince = new province_dto_1.Province();
            }
            else {
                this.simulation.client.carDetails.registrationProvince = __assign({}, this.simulation.client.address.province);
            }
        }
        if (!this.simulation.client.carDetails.licensingProvince) {
            if (!this.simulation.client.address.province) {
                this.simulation.client.carDetails.licensingProvince = new province_dto_1.Province();
            }
            else {
                this.simulation.client.carDetails.licensingProvince = __assign({}, this.simulation.client.address.province);
            }
        }
    };
    VehicleDataService.prototype.onload = function () {
        this.initializeFields();
        this.loadRegistrationProvince();
        this.loadLicensingProvince();
        this.loadVehicleColor();
        this.loadVehicleOrigin();
    };
    VehicleDataService.prototype.loadRegistrationProvince = function () {
        var _this = this;
        var request = {};
        var result = this.appService.xSearchWithData('provinces/provinces', request);
        result.subscribe(function (data) {
            var response = data.json();
            _this.listRegistrationProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    VehicleDataService.prototype.loadLicensingProvince = function () {
        var _this = this;
        var request = {};
        var result = this.appService.xSearchWithData('provinces/provinces', request);
        result.subscribe(function (data) {
            var response = data.json();
            _this.listLicensingProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    VehicleDataService.prototype.loadVehicleColor = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllCollor');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listVehicleColor = response.listColor;
        }, function (err) {
            console.log(err.json());
        });
    };
    VehicleDataService.prototype.loadVehicleOrigin = function () {
        this.listVehicleOrigin.push({ value: 'N', description: this._translate.instant('lb-national') });
        this.listVehicleOrigin.push({ value: 'I', description: this._translate.instant('lb-imported') });
    };
    VehicleDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage,
            translate_service_1.TranslateService, simulation_service_1.SimulationService])
    ], VehicleDataService);
    return VehicleDataService;
}());
exports.VehicleDataService = VehicleDataService;
//# sourceMappingURL=vehicle-data.service.js.map