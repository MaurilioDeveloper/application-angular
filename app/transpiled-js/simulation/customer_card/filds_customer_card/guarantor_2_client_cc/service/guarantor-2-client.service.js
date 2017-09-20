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
var PoliticalExposition_dto_1 = require("./../../../../dto/client/PoliticalExposition.dto");
var BusinessRelashionshipType_dto_1 = require("./../../../../dto/client/BusinessRelashionshipType.dto");
var Guarantor_dto_1 = require("./../../../../dto/client/Guarantor.dto");
var Spouse_dto_1 = require("./../../../../dto/client/Spouse.dto");
var CivilState_dto_1 = require("./../../../../dto/client/CivilState.dto");
var app_service_1 = require("./../../../../../app.service");
var KinshipType_dto_1 = require("./../../../../dto/client/KinshipType.dto");
var GuarantorType_dto_1 = require("./../../../../dto/client/GuarantorType.dto");
var IssuingBody_dto_1 = require("./../../../../dto/client/IssuingBody.dto");
var EducationDegree_dto_1 = require("./../../../../dto/client/EducationDegree.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var Country_dto_1 = require("./../../../../dto/client/Country.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var Client_dto_1 = require("./../../../../dto/Client.dto");
var DocumentType_dto_1 = require("./../../../../dto/client/DocumentType.dto");
var GuarantorTwoClientService = /** @class */ (function () {
    function GuarantorTwoClientService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
        this.listCivilState = [];
        this.listCountry = new Array();
        this.listProvince = new Array();
        this.listSex = [];
        this.listTypePhone = [];
        this.listPoliticalExposition = [];
        this.listEducationDegree = new Array();
        this.listHandicapped = [];
        this.listDocumentType = new Array();
        this.listIssuingBody = new Array();
        this.listTypeGuarantor = new Array();
        this.listDegreeOfKinship = new Array();
        this.listCompanyRelationshipType = [];
        this.isRequiredGuarantor = false;
    }
    GuarantorTwoClientService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_CLIENT)) {
                _this.onload();
            }
        });
    };
    GuarantorTwoClientService.prototype.initializeFields = function () {
        if (!this.simulation.client.civilState)
            this.simulation.client.civilState = new CivilState_dto_1.CivilState();
        if (!this.simulation.client.spouse)
            this.simulation.client.spouse = new Spouse_dto_1.Spouse();
        if (!this.simulation.client.guarantor2)
            this.simulation.client.guarantor2 = new Guarantor_dto_1.Guarantor();
        if (!this.simulation.client.guarantor2.fixPhone)
            this.simulation.client.guarantor2.fixPhone = new Phone_dto_1.Phone();
        if (!this.simulation.client.guarantor2.cellphone)
            this.simulation.client.guarantor2.cellphone = new Phone_dto_1.Phone();
        if (!this.simulation.client.guarantor2.guarantorType)
            this.simulation.client.guarantor2.guarantorType = new GuarantorType_dto_1.GuarantorType();
        if (!this.simulation.client.guarantor2.kinshipType)
            this.simulation.client.guarantor2.kinshipType = new KinshipType_dto_1.KinshipType();
        if (!this.simulation.client.guarantor2.businessRelashionshipType)
            this.simulation.client.guarantor2.businessRelashionshipType = new BusinessRelashionshipType_dto_1.BusinessRelashionshipType();
        if (!this.simulation.client.guarantor2.civilState)
            this.simulation.client.guarantor2.civilState = new CivilState_dto_1.CivilState();
        if (!this.simulation.client.guarantor2.country)
            this.simulation.client.guarantor2.country = new Country_dto_1.Country();
        if (!this.simulation.client.guarantor2.province)
            this.simulation.client.guarantor2.province = new province_dto_1.Province();
        if (!this.simulation.client.guarantor2.politicalExposition)
            this.simulation.client.guarantor2.politicalExposition = new PoliticalExposition_dto_1.PoliticalExposition();
        if (!this.simulation.client.guarantor2.province)
            this.simulation.client.guarantor2.province = new province_dto_1.Province();
        if (!this.simulation.client.guarantor2.educationDegree)
            this.simulation.client.guarantor2.educationDegree = new EducationDegree_dto_1.EducationDegree();
        if (!this.simulation.client.guarantor2.documentType)
            this.simulation.client.guarantor2.documentType = new DocumentType_dto_1.DocumentType();
        if (!this.simulation.client.guarantor2.countryDocument)
            this.simulation.client.guarantor2.countryDocument = new Country_dto_1.Country();
        if (!this.simulation.client.guarantor2.provinceDocument)
            this.simulation.client.guarantor2.provinceDocument = new province_dto_1.Province();
        if (!this.simulation.client.guarantor2.issuingBodyDocument)
            this.simulation.client.guarantor2.issuingBodyDocument = new IssuingBody_dto_1.IssuingBody();
    };
    GuarantorTwoClientService.prototype.onload = function () {
        this.isPhysicalPerson = this.simulation.client.typePerson === Client_dto_1.TypePerson.PF;
        this.initializeFields();
        this.loadTypeGuarantor();
        this.loadDegreeOfKinship();
        this.loadCompanyRelationshipType();
        this.loadCivilState();
        this.loadCountry();
        this.loadSex();
        this.loadTypePhone();
        this.loadPoliticalExposition();
        this.loadEducationDegree();
        this.loadHandicapped();
        this.loadDocumentType();
        this.loadIssuingbody();
        this.loadProvince();
        this.validRequiredGuarantor();
    };
    GuarantorTwoClientService.prototype.loadTypeGuarantor = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllGuarantorType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypeGuarantor = response.listGuarantorType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadDegreeOfKinship = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllKinshipType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listDegreeOfKinship = response.listKinshipType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadCompanyRelationshipType = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllBusinessRelationshipType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listCompanyRelationshipType = response.listBusinessRelationshipType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadCivilState = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllCivilState');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listCivilState = response.listCivilState;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadCountry = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllCountry');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listCountry = response.listCountry;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadSex = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPersonType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listSex = response.listPersonType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadTypePhone = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPhoneType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypePhone = response.listPhoneType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadPoliticalExposition = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPoliticalExposition');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listPoliticalExposition = response.listPoliticalExposition;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadEducationDegree = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEducationDegree');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEducationDegree = response.listEducationDegree;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadHandicapped = function () {
        var sim = { 'status': true, 'description': 'SIM' };
        var nao = { 'status': false, 'description': 'NAO' };
        this.listHandicapped.push(sim);
        this.listHandicapped.push(nao);
    };
    GuarantorTwoClientService.prototype.loadDocumentType = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllDocumentType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listDocumentType = response.listDocumentType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.loadIssuingbody = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEmissionOrganism');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listIssuingBody = response.listEmissionOrganism;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorTwoClientService.prototype.validRequiredGuarantor = function () {
        if (this.simulation.client.guarantor2.guarantorType.description != '') {
            this.simulation.client.guarantor2.isRequired = true;
        }
        else {
            this.simulation.client.guarantor2.isRequired = false;
        }
    };
    GuarantorTwoClientService.prototype.hasSpouse = function (civilStateSelectedId) {
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
    GuarantorTwoClientService.prototype.hasGuarantor = function (guarantor) {
        if (guarantor != "0") {
            return true;
        }
        return false;
    };
    GuarantorTwoClientService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], GuarantorTwoClientService);
    return GuarantorTwoClientService;
}());
exports.GuarantorTwoClientService = GuarantorTwoClientService;
//# sourceMappingURL=guarantor-2-client.service.js.map