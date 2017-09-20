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
var carselect_service_1 = require("./service/carselect.service");
var simulation_service_1 = require("./../simulation.service");
var flex_layout_1 = require("@angular/flex-layout");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var material_1 = require("@angular/material");
var acessoriesOptions_dialog_1 = require("./../acessoriesOptionsDialog/acessoriesOptions.dialog");
var app_service_1 = require("./../../app.service");
var core_3 = require("@angular/core");
var CarselectComponent = /** @class */ (function () {
    function CarselectComponent(appService, dialog, media, simulationService, carSelectService) {
        this.appService = appService;
        this.dialog = dialog;
        this.media = media;
        this.simulationService = simulationService;
        this.carSelectService = carSelectService;
        this.changeStep = new core_1.EventEmitter();
    }
    CarselectComponent.prototype.ngOnInit = function () {
        this.carSelectService.init();
    };
    CarselectComponent.prototype.getUtilitarios = function () {
        return this.carSelectService.utilitarios;
    };
    CarselectComponent.prototype.getSimulation = function () {
        return this.carSelectService.simulation;
    };
    CarselectComponent.prototype.getCars = function () {
        return this.carSelectService.cars;
    };
    CarselectComponent.prototype.getShowcar = function () {
        return this.carSelectService.showcar;
    };
    CarselectComponent.prototype.carselect = function (car) {
        this.carSelectService.showcar = false;
        if (this.getSimulation().car) {
            if (car.id === this.getSimulation().car.id && car.gender === this.getSimulation().car.gender) {
                return;
            }
            else {
                this.getSimulation().step2CanNext = false;
            }
        }
        this.getSimulation().step2CanNext = true;
        this.getSimulation().car = car;
    };
    CarselectComponent.prototype.acessorios = function () {
        //aqui vai abrir a modal
        var dialogRef = this.dialog.open(acessoriesOptions_dialog_1.AcessoriesOptionsDialog, { height: '90%', width: '75%' });
        dialogRef.componentInstance.simulation = this.getSimulation();
    };
    CarselectComponent.prototype.change = function (toFront) {
        this.changeStep.emit(toFront);
    };
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CarselectComponent.prototype, "changeStep", void 0);
    CarselectComponent = __decorate([
        core_3.Component({
            selector: 'carselect',
            templateUrl: 'app/simulation/carselect/carselect.html',
            styleUrls: [],
            providers: [carselect_service_1.CarSelectService]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, material_1.MdDialog, flex_layout_1.ObservableMedia,
            simulation_service_1.SimulationService, carselect_service_1.CarSelectService])
    ], CarselectComponent);
    return CarselectComponent;
}());
exports.CarselectComponent = CarselectComponent;
//# sourceMappingURL=carselect.component.js.map