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
var installments_dialog_1 = require("./../../calculationPainel/calculationDialog/calculation/installmentsDialog/installments.dialog");
var app_service_1 = require("./../../../app.service");
var Calculation_dto_1 = require("./../../dto/Calculation.dto");
var Simulation_dto_1 = require("./../../dto/Simulation.dto");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var material_1 = require("@angular/material");
var core_3 = require("@angular/core");
var CalculationMobileComponent = /** @class */ (function () {
    function CalculationMobileComponent(appService, dialog) {
        this.appService = appService;
        this.dialog = dialog;
        this.varBtnMarca = 'keyboard_arrow_up';
        this.varBtnDrop = 'keyboard_arrow_down';
        this.drop = false;
        this.drop2 = false;
        this.changeStep = new core_1.EventEmitter();
    }
    CalculationMobileComponent.prototype.getProposalQuantity = function () {
        var _this = this;
        var observable = this.appService.xSearch('userProfile', 'proposalquantity');
        observable.subscribe(function (data) {
            var response = data.json();
            var qtaCalc = response.proposalQuantity;
            console.log(_this.simulation.calculations);
            if (_this.simulation.calculations && _this.simulation.calculations.length > 1) {
                qtaCalc = _this.simulation.calculations.length;
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    CalculationMobileComponent.prototype.installmentsDialog = function () {
        var dialogRef = this.dialog.open(installments_dialog_1.InstallmentsDialog, { height: '85%', width: '50%' });
        dialogRef.componentInstance.simulation = this.simulation;
        console.log(this.listInstallments);
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    CalculationMobileComponent.prototype.change = function (go) {
        this.changeStep.emit(go);
    };
    CalculationMobileComponent.prototype.ngOnInit = function () {
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
        }
    };
    CalculationMobileComponent.prototype.close = function () {
    };
    CalculationMobileComponent.prototype.dados = function (listInstallments) {
        console.log(listInstallments);
    };
    __decorate([
        core_3.Input(),
        __metadata("design:type", Simulation_dto_1.Simulation)
    ], CalculationMobileComponent.prototype, "simulation", void 0);
    __decorate([
        core_3.Input(),
        __metadata("design:type", Calculation_dto_1.Calculation)
    ], CalculationMobileComponent.prototype, "calculation", void 0);
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalculationMobileComponent.prototype, "changeStep", void 0);
    CalculationMobileComponent = __decorate([
        core_3.Component({
            selector: 'calculationpainel-mobile',
            templateUrl: 'app/simulation/mobile/calculationMobile/calculation-painel-mobile.component.html',
            styleUrls: []
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, material_1.MdDialog])
    ], CalculationMobileComponent);
    return CalculationMobileComponent;
}());
exports.CalculationMobileComponent = CalculationMobileComponent;
//# sourceMappingURL=calculation-painel-mobile.component.js.map