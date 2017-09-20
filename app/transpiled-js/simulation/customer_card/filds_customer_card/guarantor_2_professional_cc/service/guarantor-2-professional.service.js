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
var app_service_1 = require("./../../../../../app.service");
var app_message_1 = require("./../../../../../app.message");
var simulation_service_1 = require("./../../../../simulation.service");
var ProofIncomeTypeDTO_dto_1 = require("./../../../../dto/client/ProofIncomeTypeDTO.dto");
var IncomeType_dto_1 = require("./../../../../dto/client/IncomeType.dto");
var Profession_dto_1 = require("./../../../../dto/client/Profession.dto");
var Occupation_dto_1 = require("./../../../../dto/client/Occupation.dto");
var EconomicActivity_dto_1 = require("./../../../../dto/client/EconomicActivity.dto");
var EconomicActivityGroup_dto_1 = require("./../../../../dto/client/EconomicActivityGroup.dto");
var EmployerSize_dto_1 = require("./../../../../dto/client/EmployerSize.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var GuarantorTwoProfessionalService = /** @class */ (function () {
    function GuarantorTwoProfessionalService(appService, appMessage, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.simulationService = simulationService;
        this.listProvince = new Array();
        this.listSizeCompany = new Array();
        this.listEconomicActivityGroup = new Array();
        this.listEconomicActivity = new Array();
        this.listOccupation = new Array();
        this.listPositionFunction = new Array();
        this.listTypeOfIncome = new Array();
        this.listTypeProofOfIncome = new Array();
        this.isRequiredNameGuarantor = false;
        this.isRequiredCNPJGuarantor = false;
        this.isRequiredPhoneGuarantor = false;
        this.AUTONOMUS = "005";
        this.RETIRED_PENSIONER = "006";
        this.EMPLOYER_PARTNER = "007";
    }
    GuarantorTwoProfessionalService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_PROFESSIONAL)) {
                _this.onload();
            }
        });
    };
    GuarantorTwoProfessionalService.prototype.initializeFields = function () {
        if (!this.simulation.client.guarantor2)
            this.simulation.client.guarantor2 = new Guarantor_dto_1.Guarantor();
        if (!this.simulation.client.guarantor2.company)
            this.simulation.client.guarantor2.company = new Company_dto_1.Company();
        if (!this.simulation.client.guarantor2.company.comercialPhone)
            this.simulation.client.guarantor2.company.comercialPhone = new Phone_dto_1.Phone();
        if (!this.simulation.client.guarantor2.company.occupation)
            this.simulation.client.guarantor2.company.occupation = new Occupation_dto_1.Occupation();
        if (!this.simulation.client.guarantor2.company.profession)
            this.simulation.client.guarantor2.company.profession = new Profession_dto_1.Profession();
        if (!this.simulation.client.guarantor2.company.address.province)
            this.simulation.client.guarantor2.company.address.province = new province_dto_1.Province();
        if (!this.simulation.client.guarantor2.company.economicActivityGroup)
            this.simulation.client.guarantor2.company.economicActivityGroup = new EconomicActivityGroup_dto_1.EconomicActivityGroup();
        if (!this.simulation.client.guarantor2.company.economicActivity)
            this.simulation.client.guarantor2.company.economicActivity = new EconomicActivity_dto_1.EconomicActivity();
        if (!this.simulation.client.guarantor2.company.size)
            this.simulation.client.guarantor2.company.size = new EmployerSize_dto_1.CompanySize();
        if (!this.simulation.client.guarantor2.company.incomeType)
            this.simulation.client.guarantor2.company.incomeType = new IncomeType_dto_1.IncomeType();
        if (!this.simulation.client.guarantor2.company.proofIncomeType)
            this.simulation.client.guarantor2.company.proofIncomeType = new ProofIncomeTypeDTO_dto_1.ProofIncomeType();
    };
    GuarantorTwoProfessionalService.prototype.onload = function () {
        this.initializeFields();
        this.loadSizeCompany();
        this.loadEconomicActivityGroup();
        this.loadEconomicActivity();
        this.loadProvince();
        this.loadOccupation();
        this.loadPositionFunction();
        this.loadTypeOfIncome();
        this.loadTypeProofOfIncome();
    };
    GuarantorTwoProfessionalService.prototype.validOccupation = function () {
        this.validRequiredguarantor2NameCompany();
        this.validRequiredguarantor2CNPJ();
        this.validRequiredguarantor2Phone();
    };
    GuarantorTwoProfessionalService.prototype.validRequiredguarantor2NameCompany = function () {
        var importCode = this.simulation.client.guarantor2.company.occupation.importCode;
        if (this.simulation.client.guarantor2.isRequired && (importCode !== this.AUTONOMUS && importCode != this.RETIRED_PENSIONER)) {
            this.isRequiredNameGuarantor = true;
        }
        else {
            this.isRequiredNameGuarantor = false;
        }
    };
    GuarantorTwoProfessionalService.prototype.validRequiredguarantor2Phone = function () {
        var importCode = this.simulation.client.guarantor2.company.occupation.importCode;
        if (this.simulation.client.guarantor2.isRequired && importCode != this.RETIRED_PENSIONER) {
            this.isRequiredPhoneGuarantor = true;
        }
        else {
            this.isRequiredPhoneGuarantor = false;
        }
    };
    GuarantorTwoProfessionalService.prototype.validRequiredguarantor2CNPJ = function () {
        var importCode = this.simulation.client.guarantor2.company.occupation.importCode;
        if (this.simulation.client.guarantor2.isRequired && importCode == this.EMPLOYER_PARTNER) {
            this.isRequiredCNPJGuarantor = true;
        }
        else {
            this.isRequiredCNPJGuarantor = false;
        }
    };
    GuarantorTwoProfessionalService.prototype.loadOccupation = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllOccupation');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listOccupation = response.listOccupation;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoProfessionalService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoProfessionalService.prototype.loadPositionFunction = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProfession');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listPositionFunction = response.listProfession;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoProfessionalService.prototype.loadSizeCompany = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEmployerSize');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listSizeCompany = response.listEmployerSize;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoProfessionalService.prototype.loadEconomicActivityGroup = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllIndustrialSegment');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEconomicActivityGroup = response.listIndustrialSegment;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoProfessionalService.prototype.loadEconomicActivity = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEconomicActivity');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEconomicActivity = response.listEconomicActivity;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoProfessionalService.prototype.loadTypeOfIncome = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllIncomeType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypeOfIncome = response.listIncomeType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoProfessionalService.prototype.loadTypeProofOfIncome = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProofIncomeType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypeProofOfIncome = response.listProofIncomeType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoProfessionalService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, simulation_service_1.SimulationService])
    ], GuarantorTwoProfessionalService);
    return GuarantorTwoProfessionalService;
}());
exports.GuarantorTwoProfessionalService = GuarantorTwoProfessionalService;
//# sourceMappingURL=guarantor-2-professional.service.js.map