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
var app_component_1 = require("./../../app.component");
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var SimulationInfoComponent = /** @class */ (function () {
    function SimulationInfoComponent(dialog, appComponent, simulationService) {
        this.dialog = dialog;
        this.appComponent = appComponent;
        this.simulationService = simulationService;
        this.varBtnMarca = 'keyboard_arrow_up';
        this.varBtnDrop = 'keyboard_arrow_up';
        this.drop = false;
    }
    SimulationInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation) {
                _this.onload();
            }
        });
    };
    SimulationInfoComponent.prototype.onload = function () {
    };
    SimulationInfoComponent.prototype.clicked = function () {
        if (this.drop) {
            this.drop = false;
            this.varBtnMarca = 'keyboard_arrow_down';
        }
        else {
            this.drop = true;
            this.varBtnMarca = 'keyboard_arrow_up';
        }
    };
    SimulationInfoComponent = __decorate([
        core_1.Component({
            selector: 'simulationInfo',
            templateUrl: 'app/simulation/simulationinfo/simulationInfo.component.html',
        }),
        __metadata("design:paramtypes", [material_1.MdDialog, app_component_1.AppComponent, simulation_service_1.SimulationService])
    ], SimulationInfoComponent);
    return SimulationInfoComponent;
}());
exports.SimulationInfoComponent = SimulationInfoComponent;
//# sourceMappingURL=simulationInfo.component.js.map