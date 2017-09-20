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
var guarantor_2_client_service_1 = require("./../service/guarantor-2-client.service");
var core_1 = require("@angular/core");
var GuarantorTwoClientMobileComponent = /** @class */ (function () {
    function GuarantorTwoClientMobileComponent(guarantorTwoClientService) {
        this.guarantorTwoClientService = guarantorTwoClientService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.changeSpouseGuarantor2 = new core_1.EventEmitter();
        this.changeGuarantor2 = new core_1.EventEmitter();
        this.conf = false;
        this.guarantorTwoClientService.init();
    }
    ;
    GuarantorTwoClientMobileComponent.prototype.ngOnInit = function () {
        if (!this.getSimulation().client.guarantor2.guarantorType.id) {
            this.getSimulation().client.guarantor2.guarantorType.id = "0";
        }
    };
    GuarantorTwoClientMobileComponent.prototype.getListCivilState = function () {
        return this.guarantorTwoClientService.listCivilState;
    };
    GuarantorTwoClientMobileComponent.prototype.getListCountry = function () {
        return this.guarantorTwoClientService.listCountry;
    };
    GuarantorTwoClientMobileComponent.prototype.getListProvince = function () {
        return this.guarantorTwoClientService.listProvince;
    };
    GuarantorTwoClientMobileComponent.prototype.getListSex = function () {
        return this.guarantorTwoClientService.listSex;
    };
    GuarantorTwoClientMobileComponent.prototype.getListTypePhone = function () {
        return this.guarantorTwoClientService.listTypePhone;
    };
    GuarantorTwoClientMobileComponent.prototype.getListPoliticalExposition = function () {
        return this.guarantorTwoClientService.listPoliticalExposition;
    };
    GuarantorTwoClientMobileComponent.prototype.getListEducationDegree = function () {
        return this.guarantorTwoClientService.listEducationDegree;
    };
    GuarantorTwoClientMobileComponent.prototype.getListHandicapped = function () {
        return this.guarantorTwoClientService.listHandicapped;
    };
    GuarantorTwoClientMobileComponent.prototype.getListDocumentType = function () {
        return this.guarantorTwoClientService.listDocumentType;
    };
    GuarantorTwoClientMobileComponent.prototype.getListIssuingBody = function () {
        return this.guarantorTwoClientService.listIssuingBody;
    };
    GuarantorTwoClientMobileComponent.prototype.getListTypeGuarantor = function () {
        return this.guarantorTwoClientService.listTypeGuarantor;
    };
    GuarantorTwoClientMobileComponent.prototype.getListDegreeOfKinship = function () {
        return this.guarantorTwoClientService.listDegreeOfKinship;
    };
    GuarantorTwoClientMobileComponent.prototype.getListCompanyRelationshipType = function () {
        return this.guarantorTwoClientService.listCompanyRelationshipType;
    };
    GuarantorTwoClientMobileComponent.prototype.getIsPhysicalPerson = function () {
        return this.guarantorTwoClientService.isPhysicalPerson;
    };
    GuarantorTwoClientMobileComponent.prototype.getSimulation = function () {
        return this.guarantorTwoClientService.simulation;
    };
    GuarantorTwoClientMobileComponent.prototype.onChangeSpouse = function (event) {
        this.changeSpouseGuarantor2.emit(this.guarantorTwoClientService.hasSpouse(event.value));
    };
    GuarantorTwoClientMobileComponent.prototype.selectGuarantorType = function (event) {
        this.changeGuarantor2.emit(this.guarantorTwoClientService.hasGuarantor(event.value));
        return this.guarantorTwoClientService.validRequiredGuarantor();
    };
    GuarantorTwoClientMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 16;
        if (this.getSimulation().client.guarantor2.guarantorType.id == "0") {
            this.getSimulation().step = 4;
        }
        else {
            this.getSimulation().step++;
        }
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoClientMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GuarantorTwoClientMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoClientMobileComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoClientMobileComponent.prototype, "changeSpouseGuarantor2", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorTwoClientMobileComponent.prototype, "changeGuarantor2", void 0);
    GuarantorTwoClientMobileComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-2-client-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_client_cc/mobile/guarantor-2-client-mobile-cc.component.html',
            providers: [guarantor_2_client_service_1.GuarantorTwoClientService]
        }),
        __metadata("design:paramtypes", [guarantor_2_client_service_1.GuarantorTwoClientService])
    ], GuarantorTwoClientMobileComponent);
    return GuarantorTwoClientMobileComponent;
}());
exports.GuarantorTwoClientMobileComponent = GuarantorTwoClientMobileComponent;
//# sourceMappingURL=guarantor-2-client-mobile-cc.component.js.map