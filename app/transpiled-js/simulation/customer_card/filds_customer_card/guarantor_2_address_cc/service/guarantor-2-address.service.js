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
var Guarantor_dto_1 = require("./../../../../dto/client/Guarantor.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var app_message_1 = require("./../../../../../app.message");
var app_service_1 = require("./../../../../../app.service");
var MailingAddress_dto_1 = require("./../../../../dto/client/MailingAddress.dto");
var ResidenceType_dto_1 = require("./../../../../dto/client/ResidenceType.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var address_dto_1 = require("./../../../../dto/client/address.dto");
var Client_dto_1 = require("./../../../../dto/Client.dto");
var GuarantorTwoAddressService = /** @class */ (function () {
    function GuarantorTwoAddressService(appService, appMessage, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.simulationService = simulationService;
        this.listProvince = new Array();
        this.listTypeResidence = new Array();
        this.listMailingAddress = new Array();
    }
    ;
    GuarantorTwoAddressService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_ADDRESS)) {
                _this.onload();
            }
        });
    };
    GuarantorTwoAddressService.prototype.initializeFields = function () {
        this.isPhysicalPerson = this.simulation.client.typePerson === Client_dto_1.TypePerson.PF;
        if (!this.simulation.client.guarantor2)
            this.simulation.client.guarantor2 = new Guarantor_dto_1.Guarantor();
        if (!this.simulation.client.guarantor2.address)
            this.simulation.client.guarantor2.address = new address_dto_1.Address();
        if (!this.simulation.client.guarantor2.address.province)
            this.simulation.client.guarantor2.address.province = new province_dto_1.Province();
        if (!this.simulation.client.guarantor2.address.mailingAddress)
            this.simulation.client.guarantor2.address.mailingAddress = new MailingAddress_dto_1.MailingAddress();
        if (!this.simulation.client.guarantor2.address.residenceType)
            this.simulation.client.guarantor2.address.residenceType = new ResidenceType_dto_1.ResidenceType();
    };
    GuarantorTwoAddressService.prototype.onload = function () {
        this.initializeFields();
        this.loadProvince();
        this.loadTypeResidence();
        this.loadMailingAddress();
    };
    GuarantorTwoAddressService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoAddressService.prototype.loadTypeResidence = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllTypeResidence');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypeResidence = response.listTypeResidence;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoAddressService.prototype.loadMailingAddress = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllMailingAddress');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listMailingAddress = response.listMailingAddress;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoAddressService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, simulation_service_1.SimulationService])
    ], GuarantorTwoAddressService);
    return GuarantorTwoAddressService;
}());
exports.GuarantorTwoAddressService = GuarantorTwoAddressService;
//# sourceMappingURL=guarantor-2-address.service.js.map