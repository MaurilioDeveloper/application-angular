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
var flex_layout_1 = require("@angular/flex-layout");
var Version_dto_1 = require("./../../dto/Version.dto");
var SpecialType_dto_1 = require("./../../dto/SpecialType.dto");
var app_message_1 = require("./../../../app.message");
var app_service_1 = require("./../../../app.service");
var Simulation_dto_1 = require("./../../dto/Simulation.dto");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var ListVersionMobileComponent = /** @class */ (function () {
    function ListVersionMobileComponent(appService, appMessage, media, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.media = media;
        this.simulationService = simulationService;
        this.specialTypes = new Array;
        this.versionSelected = new Version_dto_1.Version;
    }
    ListVersionMobileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.onload(simulation);
        });
    };
    ListVersionMobileComponent.prototype.onload = function (simulation) {
        var _this = this;
        this.simulation = simulation;
        var buscaver = {};
        buscaver["vehicleType"] = "NOVO";
        buscaver["modelId"] = this.simulation.car.id;
        var buscaSepcial = {};
        if (this.simulation.specialTypes) {
            buscaSepcial['selected'] = [];
            for (var i = 0; i < this.simulation.specialTypes.length; i++) {
                buscaSepcial['selected'].push(this.simulation.specialTypes[i].id);
            }
        }
        var specialget = this.appService.xSearchWithData('specialtypes', buscaSepcial);
        specialget.subscribe(function (data) {
            var listver = new Array();
            var response = data.json();
            for (var i = 0; i < response.specialTypes.length; i++) {
                var type = new SpecialType_dto_1.SpecialType();
                type.id = response.specialTypes[i].specialTypeId;
                type.description = response.specialTypes[i].description;
                _this.specialTypes.push(type);
                if (response.selected != null) {
                    for (var a = 0; a < response.selected.length; a++) {
                        if (_this.specialTypes[i].id === response.selected[a]["specialTypeId"]) {
                            _this.simulation.specialTypes.push(type);
                        }
                    }
                }
            }
        });
        var carsget = this.appService.xSearchWithData('vehicleVersion', buscaver);
        carsget.subscribe(function (data) {
            var listver = new Array();
            var response = data.json();
            for (var i = 0; i < response.vehicleVersionDtoList.length; i++) {
                var vehicleVer = response.vehicleVersionDtoList[i];
                var ver = new Version_dto_1.Version;
                ver.description = vehicleVer["description"];
                ver.fipe = vehicleVer["fipe"];
                listver.push(ver);
            }
            _this.versions = listver;
            _this.verselect = _this.versions[0];
            _this.changeVersion(_this.verselect);
        }, function (err) {
            console.log(err.json());
        });
    };
    ListVersionMobileComponent.prototype.changeVersion = function ($event) {
        //reload
        var _this = this;
        var buscaManuYear = {};
        buscaManuYear["description"] = this.verselect.description;
        buscaManuYear["fipe"] = this.verselect.fipe;
        buscaManuYear["vehicleType"] = "NOVO";
        var yearsManuget = this.appService.xSearchWithData('vehicleVersion/manufactureYears', buscaManuYear);
        yearsManuget.subscribe(function (data) {
            var listyear = new Array();
            var response = data.json();
            for (var i = 0; i < response.manufactureYears.length; i++) {
                var vehicleVer = response.manufactureYears[i];
                listyear.push(vehicleVer);
            }
            _this.yearManu = listyear;
            _this.yearSelect = _this.yearManu[_this.yearManu.length - 1];
            _this.changeManuYear(_this.yearSelect);
        }, function (err) {
            console.log(err.json());
        });
    }; // don't forget to update the model here
    // ... do other stuff here ...
    ListVersionMobileComponent.prototype.changeManuYear = function (newValue) {
        var _this = this;
        var buscaModelYear = {};
        buscaModelYear["description"] = this.verselect.description;
        buscaModelYear["fipe"] = this.verselect.fipe;
        buscaModelYear["vehicleType"] = "NOVO";
        buscaModelYear["manufactureYear"] = this.yearSelect;
        var yearsManuget = this.appService.xSearchWithData('vehicleVersion/modelYears', buscaModelYear);
        yearsManuget.subscribe(function (data) {
            var listyear = new Array();
            var response = data.json();
            console.log(response);
            for (var i = 0; i < response.modelYears.length; i++) {
                var vehicleVer = response.modelYears[i];
                var ver = new Version_dto_1.Version;
                ver.id = vehicleVer["versionId"];
                ver.description = _this.verselect.description;
                ver.fipe = _this.verselect.fipe;
                ver.yearManufacture = _this.yearSelect;
                ver.yearModel = vehicleVer["yearModel"];
                ver.url = _this.verselect.url;
                listyear.push(ver);
            }
            _this.versionsYears = listyear;
            _this.versionSelected = _this.versionsYears[_this.versionsYears.length - 1];
            _this.getValue(_this.versionSelected);
        }, function (err) {
            console.log(err.json());
        });
    };
    ListVersionMobileComponent.prototype.getValue = function (newValue) {
        var _this = this;
        var valueGet = this.appService.xSearch('vehiculePrice', this.versionSelected.id);
        valueGet.subscribe(function (data) {
            var listyear = new Array();
            var response = data.json();
            var value = response.vehiclePriceDTO;
            if (!value || value === null) {
                //Veiculo esta sem preço 
                _this.appMessage.showError("Este veiculo nas configurações selecionadas não tem preço definido");
                return;
            }
            _this.valueSelect = value["amount"];
            _this.versionSelected.price = _this.valueSelect;
            _this.simulation.car.version = _this.versionSelected;
        }, function (err) {
            console.log(err.json());
        });
        console.log(newValue);
    };
    __decorate([
        core_2.Input(),
        __metadata("design:type", Simulation_dto_1.Simulation)
    ], ListVersionMobileComponent.prototype, "simulation", void 0);
    __decorate([
        core_1.HostListener('document:onchange', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ListVersionMobileComponent.prototype, "changeVersion", null);
    ListVersionMobileComponent = __decorate([
        core_2.Component({
            selector: 'listversion-mobile',
            templateUrl: 'app/simulation/mobile/listVersionMobile/listversion-mobile.component.html',
            styleUrls: []
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, flex_layout_1.ObservableMedia, simulation_service_1.SimulationService])
    ], ListVersionMobileComponent);
    return ListVersionMobileComponent;
}());
exports.ListVersionMobileComponent = ListVersionMobileComponent;
//# sourceMappingURL=listversion-mobile.component.js.map