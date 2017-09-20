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
var app_component_1 = require("./../../../app.component");
var core_1 = require("@angular/core");
var ResumMobileComponent = /** @class */ (function () {
    function ResumMobileComponent(appComponent, simulationService) {
        this.appComponent = appComponent;
        this.simulationService = simulationService;
        this.drop = false;
    }
    ResumMobileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.onload(simulation);
        });
    };
    ResumMobileComponent.prototype.onload = function (simulation) {
        this.simulation = simulation;
    };
    ResumMobileComponent.prototype.clickedResum = function () {
        if (this.drop) {
            this.drop = false;
            this.simulation.showResumMobile = false;
        }
        else {
            this.drop = true;
            this.simulation.showResumMobile = true;
        }
    };
    ResumMobileComponent = __decorate([
        core_1.Component({
            selector: 'resum-mobile',
            templateUrl: 'app/simulation/mobile/resum/resum.component.html',
        }),
        __metadata("design:paramtypes", [app_component_1.AppComponent, simulation_service_1.SimulationService])
    ], ResumMobileComponent);
    return ResumMobileComponent;
}());
exports.ResumMobileComponent = ResumMobileComponent;
//# sourceMappingURL=resum.component.js.map