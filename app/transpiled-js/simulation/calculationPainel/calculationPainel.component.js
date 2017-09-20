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
var Calculation_dto_1 = require("./../dto/Calculation.dto");
var calculationDialog_dialog_1 = require("./calculationDialog/calculationDialog.dialog");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var material_1 = require("@angular/material");
var app_service_1 = require("./../../app.service");
var core_3 = require("@angular/core");
var step_enum_1 = require("./../step.enum");
var CalculationPainelComponent = /** @class */ (function () {
    function CalculationPainelComponent(appService, dialog, simulationService) {
        this.appService = appService;
        this.dialog = dialog;
        this.simulationService = simulationService;
        this.varBtnMarca = 'keyboard_arrow_up';
        this.varBtnDrop = 'keyboard_arrow_down';
        this.drop = false;
        this.drop2 = false;
        this.forceClose = false;
        this.changeStep = new core_1.EventEmitter();
    }
    CalculationPainelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && _this.simulation.step == step_enum_1.StepEnum.STEP_SIMULATION) {
                _this.onload();
                console.log(_this.simulation);
            }
        });
    };
    CalculationPainelComponent.prototype.onload = function () {
        var ua = window.navigator.userAgent;
        var firefox = ua.indexOf('Firefox');
        if (firefox > 0) {
            // IE 10 or older => return version number
            this.browser = "firefox";
        }
        if (!this.simulation.calculations || this.simulation.calculations.length === 0) {
            this.simulation.calculations = [new Calculation_dto_1.Calculation];
            this.getProposalQuantity();
        }
        else {
            // libera botao
            this.simulation.step3CanNext = true;
            this.openCalculationDialog(this.simulation.calculations.length);
        }
    };
    CalculationPainelComponent.prototype.getProposalQuantity = function () {
        var _this = this;
        var observable = this.appService.xSearch('userProfile', 'proposalquantity');
        observable.subscribe(function (data) {
            var response = data.json();
            var qtaCalc = response.proposalQuantity;
            if (_this.simulation.calculations && _this.simulation.calculations.length > 1) {
                qtaCalc = _this.simulation.calculations.length;
            }
            _this.openCalculationDialog(qtaCalc);
        }, function (err) {
            console.log(err.json());
        });
    };
    CalculationPainelComponent.prototype.openCalculationDialog = function (qta) {
        var _this = this;
        var dialogRef = this.dialog.open(calculationDialog_dialog_1.CalculationDialog, { panelClass: 'calculation', width: '100%', height: '88%' });
        dialogRef.componentInstance.simulation = this.simulation;
        dialogRef.componentInstance.calculationqta = qta;
        dialogRef.afterClosed().subscribe(function (result) {
            if (!_this.forceClose) {
                // fazer um for para verificar se foi contrata alguma simulacao
                var haveSelected = false;
                if (_this.simulation.calculationSelected) {
                    _this.simulation.step3CanNext = true;
                }
                else {
                    _this.changeStep.emit(false);
                }
            }
        });
    };
    CalculationPainelComponent.prototype.clicked = function () {
        if (this.drop) {
            this.drop = false;
            this.varBtnMarca = 'keyboard_arrow_down';
        }
        else {
            this.drop = true;
            this.varBtnMarca = 'keyboard_arrow_up';
        }
    };
    CalculationPainelComponent.prototype.hide = function () {
        if (this.drop2) {
            this.drop2 = false;
            this.varBtnDrop = 'keyboard_arrow_down';
        }
        else {
            this.drop2 = true;
            this.varBtnDrop = 'keyboard_arrow_up';
        }
    };
    CalculationPainelComponent.prototype.change = function (go) {
        this.changeStep.emit(go);
    };
    CalculationPainelComponent.prototype.ngOnDestroy = function () {
        if (this.dialogRef) {
            this.forceClose = true;
            this.dialogRef.close();
        }
    };
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalculationPainelComponent.prototype, "changeStep", void 0);
    CalculationPainelComponent = __decorate([
        core_3.Component({
            selector: 'calculationpainel',
            templateUrl: 'app/simulation/calculationPainel/calculationPainel.component.html',
            styleUrls: []
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, material_1.MdDialog, simulation_service_1.SimulationService])
    ], CalculationPainelComponent);
    return CalculationPainelComponent;
}());
exports.CalculationPainelComponent = CalculationPainelComponent;
//# sourceMappingURL=calculationPainel.component.js.map