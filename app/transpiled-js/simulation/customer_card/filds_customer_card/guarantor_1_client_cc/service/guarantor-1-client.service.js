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
var Spouse_dto_1 = require("./../../../../dto/client/Spouse.dto");
var Guarantor_dto_1 = require("./../../../../dto/client/Guarantor.dto");
var DocumentType_dto_1 = require("./../../../../dto/client/DocumentType.dto");
var CivilState_dto_1 = require("./../../../../dto/client/CivilState.dto");
var app_service_1 = require("./../../../../../app.service");
var simulation_service_1 = require("./../../../../simulation.service");
var BusinessRelashionshipType_dto_1 = require("./../../../../dto/client/BusinessRelashionshipType.dto");
var KinshipType_dto_1 = require("./../../../../dto/client/KinshipType.dto");
var GuarantorType_dto_1 = require("./../../../../dto/client/GuarantorType.dto");
var IssuingBody_dto_1 = require("./../../../../dto/client/IssuingBody.dto");
var EducationDegree_dto_1 = require("./../../../../dto/client/EducationDegree.dto");
var PoliticalExposition_dto_1 = require("./../../../../dto/client/PoliticalExposition.dto");
var province_dto_1 = require("./../../../../../commons/province/dto/province.dto");
var Country_dto_1 = require("./../../../../dto/client/Country.dto");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var Client_dto_1 = require("./../../../../dto/Client.dto");
var GuarantorOneClientService = /** @class */ (function () {
    function GuarantorOneClientService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
        this.listCivilState = [];
        this.listCountry = new Array();
        this.listProvince = new Array();
        this.listSex = [];
        this.listTypePhone = [];
        this.listPoliticalExposition = new Array();
        this.listEducationDegree = new Array();
        this.listHandicapped = [];
        this.listDocumentType = new Array();
        this.listIssuingBody = new Array();
        this.listTypeGuarantor = new Array();
        this.listDegreeOfKinship = new Array();
        this.listCompanyRelationshipType = new Array();
    }
    ;
    GuarantorOneClientService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_CLIENT)) {
                _this.onload();
            }
        });
    };
    GuarantorOneClientService.prototype.initializeFields = function () {
        if (!this.simulation.client.civilState)
            this.simulation.client.civilState = new CivilState_dto_1.CivilState();
        if (!this.simulation.client.spouse)
            this.simulation.client.spouse = new Spouse_dto_1.Spouse();
        if (!this.simulation.client.guarantor1)
            this.simulation.client.guarantor1 = new Guarantor_dto_1.Guarantor();
        if (!this.simulation.client.guarantor1.fixPhone)
            this.simulation.client.guarantor1.fixPhone = new Phone_dto_1.Phone();
        if (!this.simulation.client.guarantor1.cellphone)
            this.simulation.client.guarantor1.cellphone = new Phone_dto_1.Phone();
        if (!this.simulation.client.guarantor1.guarantorType)
            this.simulation.client.guarantor1.guarantorType = new GuarantorType_dto_1.GuarantorType();
        if (!this.simulation.client.guarantor1.kinshipType)
            this.simulation.client.guarantor1.kinshipType = new KinshipType_dto_1.KinshipType();
        if (!this.simulation.client.guarantor1.businessRelashionshipType)
            this.simulation.client.guarantor1.businessRelashionshipType = new BusinessRelashionshipType_dto_1.BusinessRelashionshipType();
        if (!this.simulation.client.guarantor1.civilState)
            this.simulation.client.guarantor1.civilState = new CivilState_dto_1.CivilState();
        if (!this.simulation.client.guarantor1.country)
            this.simulation.client.guarantor1.country = new Country_dto_1.Country();
        if (!this.simulation.client.guarantor1.province)
            this.simulation.client.guarantor1.province = new province_dto_1.Province();
        if (!this.simulation.client.guarantor1.politicalExposition)
            this.simulation.client.guarantor1.politicalExposition = new PoliticalExposition_dto_1.PoliticalExposition();
        if (!this.simulation.client.guarantor1.province)
            this.simulation.client.guarantor1.province = new province_dto_1.Province();
        if (!this.simulation.client.guarantor1.educationDegree)
            this.simulation.client.guarantor1.educationDegree = new EducationDegree_dto_1.EducationDegree();
        if (!this.simulation.client.guarantor1.documentType)
            this.simulation.client.guarantor1.documentType = new DocumentType_dto_1.DocumentType();
        if (!this.simulation.client.guarantor1.countryDocument)
            this.simulation.client.guarantor1.countryDocument = new Country_dto_1.Country();
        if (!this.simulation.client.guarantor1.provinceDocument)
            this.simulation.client.guarantor1.provinceDocument = new province_dto_1.Province();
        if (!this.simulation.client.guarantor1.issuingBodyDocument)
            this.simulation.client.guarantor1.issuingBodyDocument = new IssuingBody_dto_1.IssuingBody();
    };
    GuarantorOneClientService.prototype.onload = function () {
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
    GuarantorOneClientService.prototype.loadTypeGuarantor = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllGuarantorType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypeGuarantor = response.listGuarantorType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadDegreeOfKinship = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllKinshipType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listDegreeOfKinship = response.listKinshipType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadCompanyRelationshipType = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllBusinessRelationshipType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listCompanyRelationshipType = response.listBusinessRelationshipType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadCivilState = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllCivilState');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listCivilState = response.listCivilState;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadCountry = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllCountry');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listCountry = response.listCountry;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadProvince = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllProvince');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listProvince = response.provinceList;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadSex = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPersonType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listSex = response.listPersonType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadTypePhone = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPhoneType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listTypePhone = response.listPhoneType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadPoliticalExposition = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllPoliticalExposition');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listPoliticalExposition = response.listPoliticalExposition;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadEducationDegree = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEducationDegree');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listEducationDegree = response.listEducationDegree;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadHandicapped = function () {
        var sim = { 'status': true, 'description': 'SIM' };
        var nao = { 'status': false, 'description': 'NAO' };
        this.listHandicapped.push(sim);
        this.listHandicapped.push(nao);
    };
    GuarantorOneClientService.prototype.loadDocumentType = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllDocumentType');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listDocumentType = response.listDocumentType;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.loadIssuingbody = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllEmissionOrganism');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listIssuingBody = response.listEmissionOrganism;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneClientService.prototype.validRequiredGuarantor = function () {
        if (this.simulation.client.guarantor1.guarantorType.description != '') {
            this.simulation.client.guarantor1.isRequired = true;
        }
        else {
            this.simulation.client.guarantor1.isRequired = false;
        }
    };
    GuarantorOneClientService.prototype.changeSpouseData = function () {
        if (this.simulation.client.guarantor1.copySpouseEnabled) {
            this.copyGuarantorSpouseToClientSpouse();
        }
    };
    GuarantorOneClientService.prototype.copyGuarantorSpouseToClientSpouse = function () {
        this.simulation.client.spouse.name = this.simulation.client.guarantor1.name; // NOME
        this.simulation.client.spouse.cpf = this.simulation.client.guarantor1.cpf; // CPF
        this.simulation.client.spouse.sex = this.simulation.client.guarantor1.sex; // SEX
        this.simulation.client.spouse.birthDate = this.simulation.client.guarantor1.birthDate; // ANIVERSARIO
        this.simulation.client.spouse.numberDocument = this.simulation.client.guarantor1.numberDocument; // NÚMERO DO DOCUMENTO
        // this.simulation.client.spouse.issuingBody = this.simulation.client.guarantor1.issuingBodyDocument;// ORGÃO EMISSOR
        // this.simulation.client.spouse.company = this.simulation.client.guarantor1.company; //DADOS DA EMPRESA  
    };
    /**TODO Fazer a troca de dados com DTO, ainda não está funcionando */
    GuarantorOneClientService.prototype.copySpouseToGuarantorClient = function () {
        this.simulation.client.guarantor1.name = this.simulation.client.spouse.name; // NOME
        this.simulation.client.guarantor1.cpf = this.simulation.client.spouse.cpf; // CPF
        this.simulation.client.guarantor1.sex = this.simulation.client.spouse.sex; // SEX
        this.simulation.client.guarantor1.birthDate = this.simulation.client.spouse.birthDate; // ANIVERSARIO
        this.simulation.client.guarantor1.numberDocument = this.simulation.client.spouse.numberDocument; // NÚMERO DO DOCUMENTO
        // this.simulation.client.guarantor1.issuingBodyDocument = this.simulation.client.spouse.issuingBody;// ORGÃO EMISSOR
        // this.simulation.client.guarantor1.company = this.simulation.client.spouse.company; //DADOS DA EMPRESA 
    };
    GuarantorOneClientService.prototype.hasSpouse = function (civilStateSelectedId) {
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
    GuarantorOneClientService.prototype.hasGuarantor = function (guarantor) {
        if (guarantor != "0") {
            return true;
        }
        return false;
    };
    GuarantorOneClientService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], GuarantorOneClientService);
    return GuarantorOneClientService;
}());
exports.GuarantorOneClientService = GuarantorOneClientService;
//# sourceMappingURL=guarantor-1-client.service.js.map