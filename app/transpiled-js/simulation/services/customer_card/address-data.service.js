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
var AddressDataService = (function () {
    function AddressDataService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
        this.listProvince = new Array();
        this.listTypeResidence = new Array();
        this.listMailingAddress = [];
    }
    AddressDataService.prototype.ngOnInit = function () {
        this.loadServices();
    };
    AddressDataService.prototype.loadServices = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation) {
                _this.onload(_this.simulation);
            }
        });
        this.loadProvince();
        this.loadTypeResidence();
        this.loadMailingAddress();
    };
    AddressDataService.prototype.onload = function (simulation) {
        this.simulation = simulation;
        this.loadServices();
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