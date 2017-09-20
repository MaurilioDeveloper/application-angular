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
var guarantor_2_client_service_1 = require("./service/guarantor-2-client.service");
var core_1 = require("@angular/core");
var Guarantor2ClientCustomerCardComponent = /** @class */ (function () {
    function Guarantor2ClientCustomerCardComponent(guarantorTwoClientService) {
        this.guarantorTwoClientService = guarantorTwoClientService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.changeSpouseGuarantor2 = new core_1.EventEmitter();
        this.changeGuarantor2 = new core_1.EventEmitter();
        this.conf = false;
        this.guarantorTwoClientService.init();
    }
    ;
    Guarantor2ClientCustomerCardComponent.prototype.ngOnInit = function () {
        if (!this.getSimulation().client.guarantor2.guarantorType.id) {
            this.getSimulation().client.guarantor2.guarantorType.id = "0";
        }
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListCivilState = function () {
        return this.guarantorTwoClientService.listCivilState;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListCountry = function () {
        return this.guarantorTwoClientService.listCountry;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListProvince = function () {
        return this.guarantorTwoClientService.listProvince;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListSex = function () {
        return this.guarantorTwoClientService.listSex;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListTypePhone = function () {
        return this.guarantorTwoClientService.listTypePhone;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListPoliticalExposition = function () {
        return this.guarantorTwoClientService.listPoliticalExposition;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListEducationDegree = function () {
        return this.guarantorTwoClientService.listEducationDegree;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListHandicapped = function () {
        return this.guarantorTwoClientService.listHandicapped;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListDocumentType = function () {
        return this.guarantorTwoClientService.listDocumentType;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListIssuingBody = function () {
        return this.guarantorTwoClientService.listIssuingBody;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListTypeGuarantor = function () {
        return this.guarantorTwoClientService.listTypeGuarantor;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListDegreeOfKinship = function () {
        return this.guarantorTwoClientService.listDegreeOfKinship;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getListCompanyRelationshipType = function () {
        return this.guarantorTwoClientService.listCompanyRelationshipType;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getIsPhysicalPerson = function () {
        return this.guarantorTwoClientService.isPhysicalPerson;
    };
    Guarantor2ClientCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorTwoClientService.simulation;
    };
    Guarantor2ClientCustomerCardComponent.prototype.onChangeSpouse = function (event) {
        this.changeSpouseGuarantor2.emit(this.guarantorTwoClientService.hasSpouse(event.value));
    };
    Guarantor2ClientCustomerCardComponent.prototype.selectGuarantorType = function (event) {
        this.changeGuarantor2.emit(this.guarantorTwoClientService.hasGuarantor(event.value));
        return this.guarantorTwoClientService.validRequiredGuarantor();
    };
    Guarantor2ClientCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 16;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2ClientCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor2ClientCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2ClientCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2ClientCustomerCardComponent.prototype, "changeSpouseGuarantor2", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor2ClientCustomerCardComponent.prototype, "changeGuarantor2", void 0);
    Guarantor2ClientCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-client-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_client_cc/guarantor_2_client_cc.component.html',
            providers: [guarantor_2_client_service_1.GuarantorTwoClientService]
        }),
        __metadata("design:paramtypes", [guarantor_2_client_service_1.GuarantorTwoClientService])
    ], Guarantor2ClientCustomerCardComponent);
    return Guarantor2ClientCustomerCardComponent;
}());
exports.Guarantor2ClientCustomerCardComponent = Guarantor2ClientCustomerCardComponent;
//# sourceMappingURL=guarantor_2_client_cc.component.js.map