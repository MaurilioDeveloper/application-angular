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
var new_ones_service_1 = require("./service/new-ones.service");
var simulation_service_1 = require("./../simulation.service");
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var flex_layout_1 = require("@angular/flex-layout");
var NewOnesComponent = /** @class */ (function () {
    function NewOnesComponent(newOnesService, dialog, media, simulationService) {
        this.newOnesService = newOnesService;
        this.dialog = dialog;
        this.media = media;
        this.simulationService = simulationService;
        this.changeStep = new core_1.EventEmitter();
        this.rawChange = new core_1.EventEmitter();
        this.varBtnMarca = 'keyboard_arrow_up';
        this.varBtnDrop = 'keyboard_arrow_up';
        this.drop = false;
        this.newOnesService.init();
    }
    ;
    NewOnesComponent.prototype.ngOnInit = function () {
    };
    NewOnesComponent.prototype.getSimulation = function () {
        return this.newOnesService.simulation;
    };
    NewOnesComponent.prototype.getAcessorio = function () {
        return this.newOnesService.acessorio;
    };
    NewOnesComponent.prototype.addAcessorio = function (acessorio) {
        this.newOnesService.addAcessorio(acessorio);
    };
    NewOnesComponent.prototype.delAcessorio = function (acessorio) {
        this.newOnesService.delAcessorio(acessorio);
    };
    NewOnesComponent.prototype.getTotal = function () {
        return this.newOnesService.total;
    };
    NewOnesComponent.prototype.getSubtotalAccessories = function () {
        return this.newOnesService.subtotalAccessories;
    };
    NewOnesComponent.prototype.getListVehicleBrand = function () {
        return this.newOnesService.listVehicleBrand;
    };
    NewOnesComponent.prototype.getListVehicleModel = function () {
        return this.newOnesService.listVehicleModel;
    };
    NewOnesComponent.prototype.getListVehicleVersion = function () {
        return this.newOnesService.listVehicleVersion;
    };
    NewOnesComponent.prototype.getVersionYears = function () {
        return this.newOnesService.listVehicleBrand;
    };
    NewOnesComponent.prototype.getManufactreYears = function () {
        return this.newOnesService.manufactreYears;
    };
    NewOnesComponent.prototype.getSpecialTypes = function () {
        return this.newOnesService.specialTypes;
    };
    NewOnesComponent.prototype.loadModels = function (event) {
        this.newOnesService.loadModels(event);
    };
    NewOnesComponent.prototype.loadVersions = function (event) {
        this.newOnesService.loadVersions(event);
    };
    NewOnesComponent.prototype.loadModelYears = function (event) {
        this.newOnesService.loadModelYears(event);
    };
    NewOnesComponent.prototype.clicked = function () {
        if (this.drop) {
            this.drop = false;
            this.varBtnMarca = 'keyboard_arrow_down';
        }
        else {
            this.drop = true;
            this.varBtnMarca = 'keyboard_arrow_up';
        }
    };
    NewOnesComponent.prototype.recalcTotal = function (event, campo, fff) {
        this.getSimulation().car.version.price = parseFloat(event.replace("R$ ", ""));
        if (fff.form.valid) {
            this.getSimulation().step2CanNext = true;
        }
        else {
            this.getSimulation().step2CanNext = false;
        }
        this.newOnesService.recalcT();
    };
    NewOnesComponent.prototype.saveManufactureYears = function (newValue) {
        this.getSimulation().car.version.yearManufacture = newValue;
    };
    NewOnesComponent.prototype.addSpecialType = function (e, specialType, idSpecialType) {
        console.log(e);
        if (e.checked) {
            this.getSimulation().specialTypes.push(specialType[0]);
        }
        else {
            var index = this.getSimulation().specialTypes.indexOf(idSpecialType);
            this.getSimulation().specialTypes.splice(index, 1);
        }
    };
    NewOnesComponent.prototype.change = function (toFront) {
        console.log(this.getSimulation());
        this.changeStep.emit(toFront);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NewOnesComponent.prototype, "changeStep", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NewOnesComponent.prototype, "rawChange", void 0);
    NewOnesComponent = __decorate([
        core_1.Component({
            selector: 'new-ones',
            templateUrl: 'app/simulation/new_ones/new_ones.component.html',
            providers: [new_ones_service_1.NewOnesService]
        }),
        __metadata("design:paramtypes", [new_ones_service_1.NewOnesService, material_1.MdDialog, flex_layout_1.ObservableMedia, simulation_service_1.SimulationService])
    ], NewOnesComponent);
    return NewOnesComponent;
}());
exports.NewOnesComponent = NewOnesComponent;
//# sourceMappingURL=new_ones.component.js.map