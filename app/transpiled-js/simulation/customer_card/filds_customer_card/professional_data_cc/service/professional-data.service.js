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
var Phone_dto_1 = require("./../../../../dto/client/Phone.dto");
var ProofIncomeTypeDTO_dto_1 = require("./../../../../dto/client/ProofIncomeTypeDTO.dto");
var IncomeType_dto_1 = require("./../../../../dto/client/IncomeType.dto");
var EmployerSize_dto_1 = require("./../../../../dto/client/EmployerSize.dto");
var EconomicActivity_dto_1 = require("./../../../../dto/client/EconomicActivity.dto");
var EconomicActivityGroup_dto_1 = require("./../../../../dto/client/EconomicActivityGroup.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var Profession_dto_1 = require("./../../../../dto/client/Profession.dto");
var Occupation_dto_1 = require("./../../../../dto/client/Occupation.dto");
var Company_dto_1 = require("./../../../../dto/client/Company.dto");
var Address_dto_1 = require("./../../../../dto/client/Address.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var app_message_1 = require("./../../../../../app.message");
var app_service_1 = require("./../../../../../app.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var ProfessionalDataService = /** @class */ (function () {
    function ProfessionalDataService(appService, appMessage, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.simulationService = simulationService;
        this.listProvince = [];
        this.listSizeCompany = [];
        this.listEconomicActivityGroup = [];
        this.listEconomicActivity = [];
        this.listOccupation = [];
        this.listPositionFunction = [];
        this.listTypeOfIncome = [];
        this.listTypeProofOfIncome = [];
        this.isRequiredCNPJ = false;
    }
    ;
    ProfessionalDataService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_PROFESSIONAL_DATA)) {
                _this.onload(simulation);
            }
        });
    };
    ProfessionalDataService.prototype.initializeFields = function () {
        if (!this.simulation.client.company)
            this.simulation.client.company = new Company_dto_1.Company();
        if (!this.simulation.client.company.address)
            this.simulation.client.company.address = new Address_dto_1.Address();
        if (!this.simulation.client.company.comercialPhone)
            this.simulation.client.company.comercialPhone = new Phone_dto_1.Phone();
        if (!this.simulation.client.company.occupation)
            this.simulation.client.company.occupation = new Occupation_dto_1.Occupation();
        if (!this.simulation.client.company.profession)
            this.simulation.client.company.profession = new Profession_dto_1.Profession();
        if (!this.simulation.client.company.address.province)
            this.simulation.client.company.address.province = new province_dto_1.Province();
        if (!this.simulation.client.company.economicActivityGroup)
            this.simulation.client.company.economicActivityGroup = new EconomicActivityGroup_dto_1.EconomicActivityGroup();
        if (!this.simulation.client.company.economicActivity)
            this.simulation.client.company.economicActivity = new EconomicActivity_dto_1.EconomicActivity();
        if (!this.simulation.client.company.size)
            this.simulation.client.company.size = new EmployerSize_dto_1.CompanySize();
        if (!this.simulation.client.company.incomeType)
            this.simulation.client.company.incomeType = new IncomeType_dto_1.IncomeType();
        if (!this.simulation.client.company.proofIncomeType)
            this.simulation.client.company.proofIncomeType = new ProofIncomeTypeDTO_dto_1.ProofIncomeType();
    };
    ProfessionalDataService.prototype.onload = function (simulation) {
        this.initializeFields();
        this.loadServices();
    };
    ProfessionalDataService.prototype.loadServices = function () {
        this.loadSizeCompany();
        this.loadEconomicActivityGroup();
        this.loadEconomicActivity();
        this.loadProvince();
        this.loadOccupation();
        this.loadPositionFunction();
        this.loadTypeOfIncome();
        this.loadTypeProofOfIncome();
    };
    ProfessionalDataService.prototype.loadOccupation = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllOccupation');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listOccupation = response.listOccupation;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProfessionalDataService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProfessionalDataService.prototype.loadPositionFunction = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProfession');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listPositionFunction = response.listProfession;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProfessionalDataService.prototype.loadSizeCompany = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEmployerSize');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listSizeCompany = response.listEmployerSize;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProfessionalDataService.prototype.loadEconomicActivityGroup = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllIndustrialSegment');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEconomicActivityGroup = response.listIndustrialSegment;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProfessionalDataService.prototype.loadEconomicActivity = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEconomicActivity');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEconomicActivity = response.listEconomicActivity;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProfessionalDataService.prototype.loadTypeOfIncome = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllIncomeType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypeOfIncome = response.listIncomeType;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProfessionalDataService.prototype.loadTypeProofOfIncome = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProofIncomeType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypeProofOfIncome = response.listProofIncomeType;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProfessionalDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, simulation_service_1.SimulationService])
    ], ProfessionalDataService);
    return ProfessionalDataService;
}());
exports.ProfessionalDataService = ProfessionalDataService;
//# sourceMappingURL=professional-data.service.js.map