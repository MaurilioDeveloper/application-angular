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
var Phone_dto_1 = require("./../../../../dto/client/Phone.dto");
var Company_dto_1 = require("./../../../../dto/client/Company.dto");
var Spouse_dto_1 = require("./../../../../dto/client/Spouse.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var app_message_1 = require("./../../../../../app.message");
var app_service_1 = require("./../../../../../app.service");
var IssuingBody_dto_1 = require("./../../../../dto/client/IssuingBody.dto");
var Profession_dto_1 = require("./../../../../dto/client/Profession.dto");
var Occupation_dto_1 = require("./../../../../dto/client/Occupation.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var GuarantorTwoSpouseService = /** @class */ (function () {
    function GuarantorTwoSpouseService(appService, appMessage, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.simulationService = simulationService;
        this.listProvince = new Array();
        this.listSex = [];
        this.listTypePhone = [];
        this.listDocumentType = new Array();
        this.listOccupation = new Array();
        this.listPositionFunction = new Array();
        this.listIssuingBody = new Array();
    }
    ;
    GuarantorTwoSpouseService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_SPOUSE)) {
                _this.onload();
            }
        });
    };
    GuarantorTwoSpouseService.prototype.initializeFields = function () {
        if (!this.simulation.client.guarantor2)
            this.simulation.client.guarantor2 = new Guarantor_dto_1.Guarantor();
        if (!this.simulation.client.guarantor2.spouse)
            this.simulation.client.guarantor2.spouse = new Spouse_dto_1.Spouse();
        if (!this.simulation.client.guarantor2.spouse.province)
            this.simulation.client.guarantor2.spouse.province = new province_dto_1.Province();
        if (!this.simulation.client.guarantor2.spouse.company.comercialPhone)
            this.simulation.client.guarantor2.spouse.company.comercialPhone = new Phone_dto_1.Phone();
        if (!this.simulation.client.guarantor2.spouse.issuingBody)
            this.simulation.client.guarantor2.spouse.issuingBody = new IssuingBody_dto_1.IssuingBody();
        if (!this.simulation.client.guarantor2.spouse.company.occupation)
            this.simulation.client.guarantor2.spouse.company.occupation = new Occupation_dto_1.Occupation();
        if (!this.simulation.client.guarantor2.spouse.company)
            this.simulation.client.guarantor2.spouse.company = new Company_dto_1.Company();
        if (!this.simulation.client.guarantor2.spouse.company.occupation)
            this.simulation.client.guarantor2.spouse.company.occupation = new Occupation_dto_1.Occupation();
        if (!this.simulation.client.guarantor2.spouse.company.profession)
            this.simulation.client.guarantor2.spouse.company.profession = new Profession_dto_1.Profession();
    };
    GuarantorTwoSpouseService.prototype.onload = function () {
        this.initializeFields();
        this.loadSex();
        this.loadProvince();
        this.loadOccupation();
        this.loadPositionFunction();
        this.loadIssuingbody();
    };
    GuarantorTwoSpouseService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoSpouseService.prototype.loadIssuingbody = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEmissionOrganism');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listIssuingBody = response.listEmissionOrganism;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoSpouseService.prototype.loadSex = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPersonType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listSex = response.listPersonType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoSpouseService.prototype.loadOccupation = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllOccupation');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listOccupation = response.listOccupation;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoSpouseService.prototype.loadPositionFunction = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProfession');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listPositionFunction = response.listProfession;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoSpouseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, simulation_service_1.SimulationService])
    ], GuarantorTwoSpouseService);
    return GuarantorTwoSpouseService;
}());
exports.GuarantorTwoSpouseService = GuarantorTwoSpouseService;
//# sourceMappingURL=guarantor-2-spouse.service.js.map