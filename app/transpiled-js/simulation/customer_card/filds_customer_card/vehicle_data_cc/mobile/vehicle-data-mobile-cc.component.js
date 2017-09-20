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
var vehicle_data_service_1 = require("./../service/vehicle-data.service");
var core_1 = require("@angular/core");
var VehicleDataCustomerMobileComponent = /** @class */ (function () {
    function VehicleDataCustomerMobileComponent(vehicleDataService) {
        this.vehicleDataService = vehicleDataService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    VehicleDataCustomerMobileComponent.prototype.ngOnInit = function () {
        this.vehicleDataService.init();
    };
    VehicleDataCustomerMobileComponent.prototype.getSimulation = function () {
        return this.vehicleDataService.simulation;
    };
    VehicleDataCustomerMobileComponent.prototype.getListRegistrationProvince = function () {
        return this.vehicleDataService.listRegistrationProvince;
    };
    VehicleDataCustomerMobileComponent.prototype.getListLicensingProvince = function () {
        return this.vehicleDataService.listLicensingProvince;
    };
    VehicleDataCustomerMobileComponent.prototype.getListVehicleColor = function () {
        return this.vehicleDataService.listVehicleColor;
    };
    VehicleDataCustomerMobileComponent.prototype.getListVehicleOrigin = function () {
        return this.vehicleDataService.listVehicleOrigin;
    };
    VehicleDataCustomerMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 9;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], VehicleDataCustomerMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VehicleDataCustomerMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VehicleDataCustomerMobileComponent.prototype, "controlDynamicStepsM", void 0);
    VehicleDataCustomerMobileComponent = __decorate([
        core_1.Component({
            selector: 'vehicle-data-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/vehicle_data_cc/mobile/vehicle-data-mobile-cc.component.html',
            providers: [vehicle_data_service_1.VehicleDataService]
        }),
        __metadata("design:paramtypes", [vehicle_data_service_1.VehicleDataService])
    ], VehicleDataCustomerMobileComponent);
    return VehicleDataCustomerMobileComponent;
}());
exports.VehicleDataCustomerMobileComponent = VehicleDataCustomerMobileComponent;
//# sourceMappingURL=vehicle-data-mobile-cc.component.js.map