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
var simulation_service_1 = require("./../simulation.service");
var app_message_1 = require("./../../app.message");
var SpecialType_dto_1 = require("./../dto/SpecialType.dto");
var Version_dto_1 = require("./../dto/Version.dto");
var app_service_1 = require("./../../app.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../step.enum");
var ListVersionComponent = /** @class */ (function () {
    function ListVersionComponent(appService, appMessage, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.simulationService = simulationService;
        this.specialTypes = new Array;
        this.versionSelected = new Version_dto_1.Version;
    }
    ListVersionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && _this.simulation.step == step_enum_1.StepEnum.STEP_VEHICLE) {
                _this.onload();
            }
        });
    };
    ListVersionComponent.prototype.onload = function () {
        var _this = this;
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
            _this.loadVersion(_this.versions[0]);
        }, function (err) {
            console.log(err.json());
        });
    };
    ListVersionComponent.prototype.changeVersion = function ($event) {
        this.loadVersion($event.value);
    };
    ListVersionComponent.prototype.loadVersion = function (version) {
        var _this = this;
        this.verselect = version;
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
    };
    ListVersionComponent.prototype.changeManuYear = function (newValue) {
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
    ListVersionComponent.prototype.getValue = function (newValue) {
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
    };
    ListVersionComponent = __decorate([
        core_1.Component({
            selector: 'listversion',
            templateUrl: 'app/simulation/listversion/listversion.component.html',
            styleUrls: []
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, simulation_service_1.SimulationService])
    ], ListVersionComponent);
    return ListVersionComponent;
}());
exports.ListVersionComponent = ListVersionComponent;
//# sourceMappingURL=listversion.component.js.map