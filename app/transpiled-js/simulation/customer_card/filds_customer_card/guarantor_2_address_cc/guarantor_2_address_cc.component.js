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
var guarantor_2_address_service_1 = require("./service/guarantor-2-address.service");
var core_1 = require("@angular/core");
var SpouseType_enum_1 = require("./../../../dto/client/SpouseType.enum");
var Guarantor2AddressCustomerCardComponent = /** @class */ (function () {
    function Guarantor2AddressCustomerCardComponent(guarantorTwoAddressService) {
        this.guarantorTwoAddressService = guarantorTwoAddressService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    Guarantor2AddressCustomerCardComponent.prototype.ngOnInit = function () {
        this.guarantorTwoAddressService.init();
    };
    Guarantor2AddressCustomerCardComponent.prototype.getListProvince = function () {
        return this.guarantorTwoAddressService.listProvince;
    };
    Guarantor2AddressCustomerCardComponent.prototype.getListTypeResidence = function () {
        return this.guarantorTwoAddressService.listTypeResidence;
    };
    Guarantor2AddressCustomerCardComponent.prototype.getListMailingAddress = function () {
        return this.guarantorTwoAddressService.listMailingAddress;
    };
    Guarantor2AddressCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorTwoAddressService.simulation;
    };
    Guarantor2AddressCustomerCardComponent.prototype.isSpouse = function () {
        return (this.getSimulation().client.civilState.value == SpouseType_enum_1.SpouseType.MARRIED ||
            this.getSimulation().client.civilState.value == SpouseType_enum_1.SpouseType.LIFE_PARTNER);
    };
    Guarantor2AddressCustomerCardComponent.prototype.isPhysicalPerson = function () {
        return this.guarantorTwoAddressService.isPhysicalPerson;
    };
    Guarantor2AddressCustomerCardComponent.prototype.nextStep = function () {
        if (this.isPhysicalPerson() && this.showSpouseGuarantor2) {
            this.controlDynamicStepsIn = 17;
        }
        else {
            this.controlDynamicStepsIn = 18;
        }
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        // this.controlDynamicStepsIn
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2AddressCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor2AddressCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2AddressCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Guarantor2AddressCustomerCardComponent.prototype, "showSpouseGuarantor2", void 0);
    Guarantor2AddressCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-address-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_address_cc/guarantor_2_address_cc.component.html',
            providers: [guarantor_2_address_service_1.GuarantorTwoAddressService]
        }),
        __metadata("design:paramtypes", [guarantor_2_address_service_1.GuarantorTwoAddressService])
    ], Guarantor2AddressCustomerCardComponent);
    return Guarantor2AddressCustomerCardComponent;
}());
exports.Guarantor2AddressCustomerCardComponent = Guarantor2AddressCustomerCardComponent;
//# sourceMappingURL=guarantor_2_address_cc.component.js.map