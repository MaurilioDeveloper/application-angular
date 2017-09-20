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
var guarantor_1_client_service_1 = require("./service/guarantor-1-client.service");
var SpouseType_enum_1 = require("./../../../dto/client/SpouseType.enum");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var degreeKinshipDialog_dialog_1 = require("./degreeKinshipDialog/degreeKinshipDialog.dialog");
var Guarantor1ClientCustomerCardComponent = /** @class */ (function () {
    function Guarantor1ClientCustomerCardComponent(guarantorOneClientService, dialog) {
        this.guarantorOneClientService = guarantorOneClientService;
        this.dialog = dialog;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.changeSpouseGuarantor1 = new core_1.EventEmitter();
        this.changeGuarantor1 = new core_1.EventEmitter();
        this.isRequiredGuarantor = false;
        this.SPOUSE_KINSHIP = '02';
        this.conf = false;
        this.guarantorOneClientService.init();
    }
    ;
    Guarantor1ClientCustomerCardComponent.prototype.ngOnInit = function () {
        if (!this.getSimulation().client.guarantor1.guarantorType.id) {
            this.getSimulation().client.guarantor1.guarantorType.id = "0";
        }
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListCivilState = function () {
        return this.guarantorOneClientService.listCivilState;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListCountry = function () {
        return this.guarantorOneClientService.listCountry;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListProvince = function () {
        return this.guarantorOneClientService.listProvince;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListSex = function () {
        return this.guarantorOneClientService.listSex;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListTypePhone = function () {
        return this.guarantorOneClientService.listTypePhone;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListPoliticalExposition = function () {
        return this.guarantorOneClientService.listPoliticalExposition;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListEducationDegree = function () {
        return this.guarantorOneClientService.listEducationDegree;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListHandicapped = function () {
        return this.guarantorOneClientService.listHandicapped;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListDocumentType = function () {
        return this.guarantorOneClientService.listDocumentType;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListIssuingBody = function () {
        return this.guarantorOneClientService.listIssuingBody;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListTypeGuarantor = function () {
        return this.guarantorOneClientService.listTypeGuarantor;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListDegreeOfKinship = function () {
        return this.guarantorOneClientService.listDegreeOfKinship;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getListCompanyRelationshipType = function () {
        return this.guarantorOneClientService.listCompanyRelationshipType;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getIsPhysicalPerson = function () {
        return this.guarantorOneClientService.isPhysicalPerson;
    };
    Guarantor1ClientCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorOneClientService.simulation;
    };
    Guarantor1ClientCustomerCardComponent.prototype.validRequiredGuarantor = function () {
        this.guarantorOneClientService.validRequiredGuarantor();
    };
    Guarantor1ClientCustomerCardComponent.prototype.validDegreeKinship = function (item) {
        var _this = this;
        if (this.getSimulation().client.civilState.value === SpouseType_enum_1.SpouseType.MARRIED ||
            this.getSimulation().client.civilState.value === SpouseType_enum_1.SpouseType.LIFE_PARTNER) {
            if (this.getSimulation().client.guarantor1.kinshipType.importCode === this.SPOUSE_KINSHIP) {
                var dialogRef_1 = this.dialog.open(degreeKinshipDialog_dialog_1.DegreeKinshipDialog, { width: '70%' });
                dialogRef_1.afterClosed().subscribe(function (result) {
                    if (dialogRef_1.componentInstance.confirm) {
                        _this.guarantorOneClientService.copySpouseToGuarantorClient();
                        _this.getSimulation().client.guarantor1.copySpouseEnabled = true;
                    }
                    else {
                        _this.getSimulation().client.guarantor1.copySpouseEnabled = false;
                    }
                });
            }
            else {
                this.getSimulation().client.guarantor1.copySpouseEnabled = false;
            }
        }
    };
    Guarantor1ClientCustomerCardComponent.prototype.changeSpouseData = function () {
        this.guarantorOneClientService.changeSpouseData();
    };
    Guarantor1ClientCustomerCardComponent.prototype.onChangeSpouse = function (event) {
        this.changeSpouseGuarantor1.emit(this.guarantorOneClientService.hasSpouse(event.value));
    };
    Guarantor1ClientCustomerCardComponent.prototype.selectGuarantorType = function (event) {
        this.changeGuarantor1.emit(this.guarantorOneClientService.hasGuarantor(event.value));
    };
    Guarantor1ClientCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 10;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor1ClientCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1ClientCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1ClientCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1ClientCustomerCardComponent.prototype, "changeSpouseGuarantor1", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1ClientCustomerCardComponent.prototype, "changeGuarantor1", void 0);
    Guarantor1ClientCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-client-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_client_cc/guarantor_1_client_cc.component.html',
            providers: [guarantor_1_client_service_1.GuarantorOneClientService]
        }),
        __metadata("design:paramtypes", [guarantor_1_client_service_1.GuarantorOneClientService, material_1.MdDialog])
    ], Guarantor1ClientCustomerCardComponent);
    return Guarantor1ClientCustomerCardComponent;
}());
exports.Guarantor1ClientCustomerCardComponent = Guarantor1ClientCustomerCardComponent;
//# sourceMappingURL=guarantor_1_client_cc.component.js.map