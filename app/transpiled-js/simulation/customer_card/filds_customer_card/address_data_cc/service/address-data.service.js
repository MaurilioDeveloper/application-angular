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
var MailingAddress_dto_1 = require("./../../../../dto/client/MailingAddress.dto");
var Address_dto_1 = require("./../../../../dto/client/Address.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var app_service_1 = require("./../../../../../app.service");
var ResidenceType_dto_1 = require("./../../../../dto/client/ResidenceType.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var Client_dto_1 = require("./../../../../dto/Client.dto");
var AddressDataService = /** @class */ (function () {
    function AddressDataService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
        this.listProvince = new Array();
        this.listTypeResidence = new Array();
        this.listMailingAddress = [];
    }
    AddressDataService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_ADDRESS_DATA)) {
                _this.onload();
            }
        });
    };
    AddressDataService.prototype.initializeFields = function () {
        this.isPhysicalPerson = this.simulation.client.typePerson === Client_dto_1.TypePerson.PF;
        if (!this.simulation.client.address)
            this.simulation.client.address = new Address_dto_1.Address();
        if (!this.simulation.client.address.province)
            this.simulation.client.address.province = new province_dto_1.Province();
        if (!this.simulation.client.address.residenceType)
            this.simulation.client.address.residenceType = new ResidenceType_dto_1.ResidenceType();
        if (!this.simulation.client.address.mailingAddress)
            this.simulation.client.address.mailingAddress = new MailingAddress_dto_1.MailingAddress();
    };
    AddressDataService.prototype.onload = function () {
        this.initializeFields();
        this.loadProvince();
        this.loadTypeResidence();
        this.loadMailingAddress();
    };
    AddressDataService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    AddressDataService.prototype.loadTypeResidence = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllTypeResidence');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypeResidence = response.listTypeResidence;
        }, function (err) {
            console.log(err.json());
        });
    };
    AddressDataService.prototype.loadMailingAddress = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllMailingAddress');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listMailingAddress = response.listMailingAddress;
        }, function (err) {
            console.log(err.json());
        });
    };
    AddressDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], AddressDataService);
    return AddressDataService;
}());
exports.AddressDataService = AddressDataService;
//# sourceMappingURL=address-data.service.js.map