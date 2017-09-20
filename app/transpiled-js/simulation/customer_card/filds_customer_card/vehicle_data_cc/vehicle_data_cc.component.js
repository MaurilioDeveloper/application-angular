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
var vehicle_data_service_1 = require("./service/vehicle-data.service");
var core_1 = require("@angular/core");
var VehicleDataCustomerCardComponent = /** @class */ (function () {
    function VehicleDataCustomerCardComponent(vehicleDataService) {
        this.vehicleDataService = vehicleDataService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    VehicleDataCustomerCardComponent.prototype.ngOnInit = function () {
        this.vehicleDataService.init();
    };
    VehicleDataCustomerCardComponent.prototype.getSimulation = function () {
        return this.vehicleDataService.simulation;
    };
    VehicleDataCustomerCardComponent.prototype.getListRegistrationProvince = function () {
        return this.vehicleDataService.listRegistrationProvince;
    };
    VehicleDataCustomerCardComponent.prototype.getListLicensingProvince = function () {
        return this.vehicleDataService.listLicensingProvince;
    };
    VehicleDataCustomerCardComponent.prototype.getListVehicleColor = function () {
        return this.vehicleDataService.listVehicleColor;
    };
    VehicleDataCustomerCardComponent.prototype.getListVehicleOrigin = function () {
        return this.vehicleDataService.listVehicleOrigin;
    };
    VehicleDataCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 9;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], VehicleDataCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VehicleDataCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VehicleDataCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    VehicleDataCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'vehicle-data-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/vehicle_data_cc/vehicle_data_cc.component.html',
            providers: [vehicle_data_service_1.VehicleDataService]
        }),
        __metadata("design:paramtypes", [vehicle_data_service_1.VehicleDataService])
    ], VehicleDataCustomerCardComponent);
    return VehicleDataCustomerCardComponent;
}());
exports.VehicleDataCustomerCardComponent = VehicleDataCustomerCardComponent;
//# sourceMappingURL=vehicle_data_cc.component.js.map