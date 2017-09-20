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
var simulation_service_1 = require("./../../simulation.service");
var app_service_1 = require("./../../../app.service");
var core_1 = require("@angular/core");
var ClientCustomerService = (function () {
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
        this.CASADO = 2;
        this.COMPANHEIRO = 6;
    }
    ClientCustomerService.prototype.ngOnInit = function () {
        this.loadServices();
    };
    ClientCustomerService.prototype.onload = function (simulation) {
        this.simulation = simulation;
    };
    ClientCustomerService.prototype.loadServices = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation) {
                _this.onload(_this.simulation);
            }
        });
        this.countDigitsCpfCnpj = this.simulation.client.cpfCnpj.replace(/[^\w\s]/gi, '');
        if (this.countDigitsCpfCnpj.length < 12) {
            this.isPhysicalPerson = true;
        }
        else {
            this.isPhysicalPerson = false;
        }
        if (this.isPhysicalPerson) {
            this.loadCivilState();
            this.loadCountry();
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
    ClientCustomerService.prototype.validStateCivil = function (simulation) {
        if (simulation.client.civilState.value === this.CASADO
            || simulation.client.civilState.value === this.COMPANHEIRO) {
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