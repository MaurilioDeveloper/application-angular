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
var client_customer_service_1 = require("./../service/client-customer.service");
var core_1 = require("@angular/core");
var ClientDataCustomerCardMobileComponent = /** @class */ (function () {
    function ClientDataCustomerCardMobileComponent(clientCustumerService) {
        this.clientCustumerService = clientCustumerService;
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.countClient = new core_1.EventEmitter();
        this.changeSpouse = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    ClientDataCustomerCardMobileComponent.prototype.ngOnInit = function () {
        this.clientCustumerService.init();
    };
    ClientDataCustomerCardMobileComponent.prototype.getSimulation = function () {
        return this.clientCustumerService.simulation;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListCivilState = function () {
        return this.clientCustumerService.listCivilState;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListCountry = function () {
        return this.clientCustumerService.listCountry;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListProvince = function () {
        return this.clientCustumerService.listProvince;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListSex = function () {
        return this.clientCustumerService.listSex;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListTypePhone = function () {
        return this.clientCustumerService.listTypePhone;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListPoliticalExposition = function () {
        return this.clientCustumerService.listPoliticalExposition;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListEducationDegree = function () {
        return this.clientCustumerService.listEducationDegree;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListHandicapped = function () {
        return this.clientCustumerService.listHandicapped;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListDocumentType = function () {
        return this.clientCustumerService.listDocumentType;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListIssuingBody = function () {
        return this.clientCustumerService.listIssuingBody;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListLegalNature = function () {
        return this.clientCustumerService.listLegalNature;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListOwnSeat = function () {
        return this.clientCustumerService.listOwnSeat;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListSizeCompany = function () {
        return this.clientCustumerService.listSizeCompany;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListEconomicActivityGroup = function () {
        return this.clientCustumerService.listEconomicActivityGroup;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListEconomicActivity = function () {
        return this.clientCustumerService.listEconomicActivity;
    };
    ClientDataCustomerCardMobileComponent.prototype.onChangeSpouse = function (event) {
        this.changeSpouse.emit(this.clientCustumerService.hasSpouse(event.value));
    };
    ClientDataCustomerCardMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 3;
        console.log(this.getSimulation().client.typePerson.toString());
        if (this.getSimulation().client.typePerson.toString() === "PJ") {
            this.getSimulation().step = 12;
        }
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ClientDataCustomerCardMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ClientDataCustomerCardMobileComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ClientDataCustomerCardMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ClientDataCustomerCardMobileComponent.prototype, "changeSpouse", void 0);
    ClientDataCustomerCardMobileComponent = __decorate([
        core_1.Component({
            selector: 'client-data-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/client_data_cc/mobile/client-data-mobile.component.html',
            providers: [client_customer_service_1.ClientCustomerService]
        }),
        __metadata("design:paramtypes", [client_customer_service_1.ClientCustomerService])
    ], ClientDataCustomerCardMobileComponent);
    return ClientDataCustomerCardMobileComponent;
}());
exports.ClientDataCustomerCardMobileComponent = ClientDataCustomerCardMobileComponent;
//# sourceMappingURL=client-data-mobile.component.js.map