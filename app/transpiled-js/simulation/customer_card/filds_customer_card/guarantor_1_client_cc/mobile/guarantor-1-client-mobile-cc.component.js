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
var degreeKinshipDialog_dialog_1 = require("./../degreeKinshipDialog/degreeKinshipDialog.dialog");
var material_1 = require("@angular/material");
var guarantor_1_client_service_1 = require("./../service/guarantor-1-client.service");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var SpouseType_enum_1 = require("./../../../../dto/client/SpouseType.enum");
var step_enum_1 = require("./../../../../step.enum");
var GuarantorOneClientMobileComponent = /** @class */ (function () {
    function GuarantorOneClientMobileComponent(guarantorOneClientService, dialog) {
        this.guarantorOneClientService = guarantorOneClientService;
        this.dialog = dialog;
        this.countClient = new core_2.EventEmitter();
        this.controlDynamicStepsM = new core_2.EventEmitter();
        this.changeSpouseGuarantor1 = new core_2.EventEmitter();
        this.changeGuarantor1 = new core_2.EventEmitter();
        this.isRequiredGuarantor = false;
        this.SPOUSE_KINSHIP = '02';
        this.conf = false;
        this.guarantorOneClientService.init();
    }
    ;
    GuarantorOneClientMobileComponent.prototype.ngOnInit = function () {
        if (!this.getSimulation().client.guarantor1.guarantorType.id) {
            this.getSimulation().client.guarantor1.guarantorType.id = "0";
        }
    };
    GuarantorOneClientMobileComponent.prototype.getListCivilState = function () {
        return this.guarantorOneClientService.listCivilState;
    };
    GuarantorOneClientMobileComponent.prototype.getListCountry = function () {
        return this.guarantorOneClientService.listCountry;
    };
    GuarantorOneClientMobileComponent.prototype.getListProvince = function () {
        return this.guarantorOneClientService.listProvince;
    };
    GuarantorOneClientMobileComponent.prototype.getListSex = function () {
        return this.guarantorOneClientService.listSex;
    };
    GuarantorOneClientMobileComponent.prototype.getListTypePhone = function () {
        return this.guarantorOneClientService.listTypePhone;
    };
    GuarantorOneClientMobileComponent.prototype.getListPoliticalExposition = function () {
        return this.guarantorOneClientService.listPoliticalExposition;
    };
    GuarantorOneClientMobileComponent.prototype.getListEducationDegree = function () {
        return this.guarantorOneClientService.listEducationDegree;
    };
    GuarantorOneClientMobileComponent.prototype.getListHandicapped = function () {
        return this.guarantorOneClientService.listHandicapped;
    };
    GuarantorOneClientMobileComponent.prototype.getListDocumentType = function () {
        return this.guarantorOneClientService.listDocumentType;
    };
    GuarantorOneClientMobileComponent.prototype.getListIssuingBody = function () {
        return this.guarantorOneClientService.listIssuingBody;
    };
    GuarantorOneClientMobileComponent.prototype.getListTypeGuarantor = function () {
        return this.guarantorOneClientService.listTypeGuarantor;
    };
    GuarantorOneClientMobileComponent.prototype.getListDegreeOfKinship = function () {
        return this.guarantorOneClientService.listDegreeOfKinship;
    };
    GuarantorOneClientMobileComponent.prototype.getListCompanyRelationshipType = function () {
        return this.guarantorOneClientService.listCompanyRelationshipType;
    };
    GuarantorOneClientMobileComponent.prototype.getIsPhysicalPerson = function () {
        return this.guarantorOneClientService.isPhysicalPerson;
    };
    GuarantorOneClientMobileComponent.prototype.getSimulation = function () {
        return this.guarantorOneClientService.simulation;
    };
    GuarantorOneClientMobileComponent.prototype.validRequiredGuarantor = function () {
        this.guarantorOneClientService.validRequiredGuarantor();
    };
    GuarantorOneClientMobileComponent.prototype.validDegreeKinship = function (item) {
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
    GuarantorOneClientMobileComponent.prototype.changeSpouseData = function () {
        this.guarantorOneClientService.changeSpouseData();
    };
    GuarantorOneClientMobileComponent.prototype.onChangeSpouse = function (event) {
        this.changeSpouseGuarantor1.emit(this.guarantorOneClientService.hasSpouse(event.value));
    };
    GuarantorOneClientMobileComponent.prototype.selectGuarantorType = function (event) {
        this.changeGuarantor1.emit(this.guarantorOneClientService.hasGuarantor(event.value));
    };
    GuarantorOneClientMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 10;
        if (this.getSimulation().client.guarantor1.guarantorType.id == "0") {
            this.getSimulation().step = step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_CLIENT;
        }
        else {
            this.getSimulation().step++;
        }
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_3.Input(),
        __metadata("design:type", Number)
    ], GuarantorOneClientMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], GuarantorOneClientMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], GuarantorOneClientMobileComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], GuarantorOneClientMobileComponent.prototype, "changeSpouseGuarantor1", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], GuarantorOneClientMobileComponent.prototype, "changeGuarantor1", void 0);
    GuarantorOneClientMobileComponent = __decorate([
        core_3.Component({
            selector: 'guarantor-1-client-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_client_cc/mobile/guarantor-1-client-mobile-cc.component.html',
            providers: [guarantor_1_client_service_1.GuarantorOneClientService]
        }),
        __metadata("design:paramtypes", [guarantor_1_client_service_1.GuarantorOneClientService, material_1.MdDialog])
    ], GuarantorOneClientMobileComponent);
    return GuarantorOneClientMobileComponent;
}());
exports.GuarantorOneClientMobileComponent = GuarantorOneClientMobileComponent;
//# sourceMappingURL=guarantor-1-client-mobile-cc.component.js.map