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
var Profession_dto_1 = require("./../../../../dto/client/Profession.dto");
var Company_dto_1 = require("./../../../../dto/client/Company.dto");
var Occupation_dto_1 = require("./../../../../dto/client/Occupation.dto");
var IssuingBody_dto_1 = require("./../../../../dto/client/IssuingBody.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var Spouse_dto_1 = require("./../../../../dto/client/Spouse.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var app_service_1 = require("./../../../../../app.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var SpouseService = /** @class */ (function () {
    function SpouseService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
        this.listProvince = [];
        this.listSex = [];
        this.listOccupation = [];
        this.listPositionFunction = [];
        this.listIssuingBody = [];
        this.isRequiredSpouse = false;
    }
    ;
    SpouseService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_SPOUSE)) {
                _this.onload();
            }
        });
    };
    SpouseService.prototype.initializeFields = function () {
        if (!this.simulation.client.spouse)
            this.simulation.client.spouse = new Spouse_dto_1.Spouse();
        if (!this.simulation.client.spouse.province)
            this.simulation.client.spouse.province = new province_dto_1.Province();
        if (!this.simulation.client.spouse.issuingBody)
            this.simulation.client.spouse.issuingBody = new IssuingBody_dto_1.IssuingBody();
        if (!this.simulation.client.spouse.company.occupation)
            this.simulation.client.spouse.company.occupation = new Occupation_dto_1.Occupation();
        if (!this.simulation.client.spouse.company)
            this.simulation.client.spouse.company = new Company_dto_1.Company();
        if (!this.simulation.client.spouse.company.profession)
            this.simulation.client.spouse.company.profession = new Profession_dto_1.Profession();
    };
    SpouseService.prototype.onload = function () {
        this.initializeFields();
        this.loadSex();
        this.loadProvince();
        this.loadOccupation();
        this.loadPositionFunction();
        this.validRequiredSpouse();
        this.loadIssuingbody();
    };
    SpouseService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    SpouseService.prototype.loadIssuingbody = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEmissionOrganism');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listIssuingBody = response.listEmissionOrganism;
        }, function (err) {
            console.log(err.json());
        });
    };
    SpouseService.prototype.loadSex = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPersonType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listSex = response.listPersonType;
        }, function (err) {
            console.log(err.json());
        });
    };
    SpouseService.prototype.loadOccupation = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllOccupation');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listOccupation = response.listOccupation;
        }, function (err) {
            console.log(err.json());
        });
    };
    SpouseService.prototype.loadPositionFunction = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProfession');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listPositionFunction = response.listProfession;
        }, function (err) {
            console.log(err.json());
        });
    };
    SpouseService.prototype.validRequiredSpouse = function () {
        if (this.simulation.client.civilState.description == 'CASADO' || this.simulation.client.civilState.description == 'COMPANHEIRO') {
            this.isRequiredSpouse = true;
        }
        else {
            this.isRequiredSpouse = false;
        }
    };
    SpouseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], SpouseService);
    return SpouseService;
}());
exports.SpouseService = SpouseService;
//# sourceMappingURL=spouce.service.js.map