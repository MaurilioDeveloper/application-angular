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
var client_customer_service_1 = require("./service/client-customer.service");
var core_1 = require("@angular/core");
var ClientDataCustomerCardComponent = /** @class */ (function () {
    function ClientDataCustomerCardComponent(clientCustumerService) {
        this.clientCustumerService = clientCustumerService;
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.countClient = new core_1.EventEmitter();
        this.changeSpouse = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    ClientDataCustomerCardComponent.prototype.ngOnInit = function () {
        this.clientCustumerService.init();
    };
    ClientDataCustomerCardComponent.prototype.getSimulation = function () {
        return this.clientCustumerService.simulation;
    };
    ClientDataCustomerCardComponent.prototype.getListCivilState = function () {
        return this.clientCustumerService.listCivilState;
    };
    ClientDataCustomerCardComponent.prototype.getListCountry = function () {
        return this.clientCustumerService.listCountry;
    };
    ClientDataCustomerCardComponent.prototype.getListProvince = function () {
        return this.clientCustumerService.listProvince;
    };
    ClientDataCustomerCardComponent.prototype.getListSex = function () {
        return this.clientCustumerService.listSex;
    };
    ClientDataCustomerCardComponent.prototype.getListTypePhone = function () {
        return this.clientCustumerService.listTypePhone;
    };
    ClientDataCustomerCardComponent.prototype.getListPoliticalExposition = function () {
        return this.clientCustumerService.listPoliticalExposition;
    };
    ClientDataCustomerCardComponent.prototype.getListEducationDegree = function () {
        return this.clientCustumerService.listEducationDegree;
    };
    ClientDataCustomerCardComponent.prototype.getListHandicapped = function () {
        return this.clientCustumerService.listHandicapped;
    };
    ClientDataCustomerCardComponent.prototype.getListDocumentType = function () {
        return this.clientCustumerService.listDocumentType;
    };
    ClientDataCustomerCardComponent.prototype.getListIssuingBody = function () {
        return this.clientCustumerService.listIssuingBody;
    };
    ClientDataCustomerCardComponent.prototype.getListLegalNature = function () {
        return this.clientCustumerService.listLegalNature;
    };
    ClientDataCustomerCardComponent.prototype.getListOwnSeat = function () {
        return this.clientCustumerService.listOwnSeat;
    };
    ClientDataCustomerCardComponent.prototype.getListSizeCompany = function () {
        return this.clientCustumerService.listSizeCompany;
    };
    ClientDataCustomerCardComponent.prototype.getListEconomicActivityGroup = function () {
        return this.clientCustumerService.listEconomicActivityGroup;
    };
    ClientDataCustomerCardComponent.prototype.getListEconomicActivity = function () {
        return this.clientCustumerService.listEconomicActivity;
    };
    ClientDataCustomerCardComponent.prototype.onChangeSpouse = function (event) {
        this.changeSpouse.emit(this.clientCustumerService.hasSpouse(event.value));
    };
    ClientDataCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 3;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ClientDataCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ClientDataCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ClientDataCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ClientDataCustomerCardComponent.prototype, "changeSpouse", void 0);
    ClientDataCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'client-data-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/client_data_cc/client_data_cc.component.html',
            providers: [client_customer_service_1.ClientCustomerService]
        }),
        __metadata("design:paramtypes", [client_customer_service_1.ClientCustomerService])
    ], ClientDataCustomerCardComponent);
    return ClientDataCustomerCardComponent;
}());
exports.ClientDataCustomerCardComponent = ClientDataCustomerCardComponent;
//# sourceMappingURL=client_data_cc.component.js.map