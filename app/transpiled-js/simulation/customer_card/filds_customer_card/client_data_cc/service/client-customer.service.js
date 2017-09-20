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
var CivilState_dto_1 = require("./../../../../dto/client/CivilState.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var app_service_1 = require("./../../../../../app.service");
var EconomicActivityGroup_dto_1 = require("./../../../../dto/client/EconomicActivityGroup.dto");
var EconomicActivity_dto_1 = require("./../../../../dto/client/EconomicActivity.dto");
var EmployerSize_dto_1 = require("./../../../../dto/client/EmployerSize.dto");
var LegaNature_dto_1 = require("./../../../../dto/client/LegaNature.dto");
var IssuingBody_dto_1 = require("./../../../../dto/client/IssuingBody.dto");
var EducationDegree_dto_1 = require("./../../../../dto/client/EducationDegree.dto");
var PoliticalExposition_dto_1 = require("./../../../../dto/client/PoliticalExposition.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var Country_dto_1 = require("./../../../../dto/client/Country.dto");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var Client_dto_1 = require("./../../../../dto/Client.dto");
var Address_dto_1 = require("./../../../../dto/client/Address.dto");
var DocumentType_dto_1 = require("./../../../../dto/client/DocumentType.dto");
var ClientCustomerService = /** @class */ (function () {
    function ClientCustomerService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
        this.listCivilState = [];
        this.listCountry = new Array();
        this.listProvince = [];
        this.listSex = [];
        this.listTypePhone = [];
        this.listPoliticalExposition = new Array();
        this.listEducationDegree = new Array();
        this.listHandicapped = [];
        this.listDocumentType = new Array();
        this.listIssuingBody = new Array();
        this.listLegalNature = new Array();
        this.listSizeCompany = new Array();
        this.listOwnSeat = [];
        this.listEconomicActivityGroup = new Array();
        this.listEconomicActivity = new Array();
    }
    ClientCustomerService.prototype.initializeFields = function () {
        //COMUM
        if (!this.simulation.client.address)
            this.simulation.client.address = new Address_dto_1.Address();
        //PF
        if (this.isPhysicalPerson) {
            if (!this.simulation.client.civilState)
                this.simulation.client.civilState = new CivilState_dto_1.CivilState();
            if (!this.simulation.client.province)
                this.simulation.client.province = new province_dto_1.Province();
            if (!this.simulation.client.country)
                this.simulation.client.country = new Country_dto_1.Country();
            if (!this.simulation.client.countryDocument)
                this.simulation.client.countryDocument = new Country_dto_1.Country();
            if (!this.simulation.client.politicalExposition)
                this.simulation.client.politicalExposition = new PoliticalExposition_dto_1.PoliticalExposition();
            if (!this.simulation.client.educationDegree)
                this.simulation.client.educationDegree = new EducationDegree_dto_1.EducationDegree();
            if (!this.simulation.client.provinceDocument)
                this.simulation.client.provinceDocument = new province_dto_1.Province();
            if (!this.simulation.client.documentType)
                this.simulation.client.documentType = new DocumentType_dto_1.DocumentType();
            if (!this.simulation.client.issuingBody)
                this.simulation.client.issuingBody = new IssuingBody_dto_1.IssuingBody();
        }
        else {
            //PJ
            if (!this.simulation.client.legalNature)
                this.simulation.client.legalNature = new LegaNature_dto_1.LegalNature();
            if (!this.simulation.client.address.province)
                this.simulation.client.address.province = new province_dto_1.Province();
            if (!this.simulation.client.companySize)
                this.simulation.client.companySize = new EmployerSize_dto_1.CompanySize();
            if (!this.simulation.client.economicActivityGroup)
                this.simulation.client.economicActivityGroup = new EconomicActivityGroup_dto_1.EconomicActivityGroup();
            if (!this.simulation.client.economicActivity)
                this.simulation.client.economicActivity = new EconomicActivity_dto_1.EconomicActivity();
        }
    };
    ClientCustomerService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_CLIENT_DATA)) {
                _this.onload();
            }
        });
    };
    ClientCustomerService.prototype.onload = function () {
        this.isPhysicalPerson = this.simulation.client.typePerson === Client_dto_1.TypePerson.PF;
        this.initializeFields();
        if (this.isPhysicalPerson) {
            this.loadCountry();
            this.loadCivilState();
            this.loadSex();
            this.loadTypePhone();
            this.loadPoliticalExposition();
            this.loadEducationDegree();
            this.loadHandicapped();
            this.loadDocumentType();
            this.loadIssuingbody();
        }
        else {
            this.loadLegalnature();
            this.loadSizeCompany();
            this.loadOwnSeat();
            this.loadEconomicActivityGroup();
            this.loadEconomicActivity();
        }
        this.loadProvince();
    };
    ClientCustomerService.prototype.loadCivilState = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllCivilState');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listCivilState = response.listCivilState;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadCountry = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllCountry');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listCountry = response.listCountry;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadSex = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPersonType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listSex = response.listPersonType;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadTypePhone = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPhoneType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypePhone = response.listPhoneType;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadPoliticalExposition = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPoliticalExposition');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listPoliticalExposition = response.listPoliticalExposition;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadEducationDegree = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEducationDegree');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEducationDegree = response.listEducationDegree;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadHandicapped = function () {
        var sim = { 'status': true, 'description': 'SIM' };
        var nao = { 'status': false, 'description': 'NAO' };
        this.listHandicapped.push(sim);
        this.listHandicapped.push(nao);
    };
    ClientCustomerService.prototype.loadDocumentType = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllDocumentType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listDocumentType = response.listDocumentType;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadIssuingbody = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEmissionOrganism');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listIssuingBody = response.listEmissionOrganism;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadLegalnature = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllLegalNature');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listLegalNature = response.listLegalNature;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadSizeCompany = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEmployerSize');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listSizeCompany = response.listEmployerSize;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadOwnSeat = function () {
        var sim = { 'status': true, 'description': 'SIM' };
        var nao = { 'status': false, 'description': 'NAO' };
        this.listOwnSeat.push(sim);
        this.listOwnSeat.push(nao);
    };
    ClientCustomerService.prototype.loadEconomicActivityGroup = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllIndustrialSegment');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEconomicActivityGroup = response.listIndustrialSegment;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.loadEconomicActivity = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEconomicActivity');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEconomicActivity = response.listEconomicActivity;
        }, function (err) {
            console.log(err.json());
        });
    };
    ClientCustomerService.prototype.hasSpouse = function (civilStateSelectedId) {
        for (var _i = 0, _a = this.listCivilState; _i < _a.length; _i++) {
            var civilState = _a[_i];
            if (civilStateSelectedId === civilState.id) {
                if (civilState.description === 'CASADO' || civilState.description === 'COMPANHEIRO') {
                    return true;
                }
                return false;
            }
        }
    };
    ClientCustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], ClientCustomerService);
    return ClientCustomerService;
}());
exports.ClientCustomerService = ClientCustomerService;
//# sourceMappingURL=client-customer.service.js.map