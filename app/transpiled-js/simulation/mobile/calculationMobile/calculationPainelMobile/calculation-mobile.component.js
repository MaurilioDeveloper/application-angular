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
var Installment_dto_1 = require("./../../../dto/Installment.dto");
var Commission_dto_1 = require("./../../../dto/Commission.dto");
var FinancialTable_dto_1 = require("./../../../dto/FinancialTable.dto");
var FinancialType_dto_1 = require("./../../../dto/FinancialType.dto");
var material_1 = require("@angular/material");
var Calculation_dto_1 = require("./../../../dto/Calculation.dto");
var app_service_1 = require("./../../../../app.service");
var Simulation_dto_1 = require("./../../../dto/Simulation.dto");
var core_1 = require("@angular/core");
var Client_dto_1 = require("../../../dto/Client.dto");
var app_message_1 = require("../../../../app.message");
var CalculationPainelMobileComponent = /** @class */ (function () {
    function CalculationPainelMobileComponent(appService, appMessage, dialog) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.dialog = dialog;
        this.dados = new core_1.EventEmitter();
        this.entranceValue = 0;
        this.entrancePerc = 0;
        this.minEntrace = 0;
        this.minPerEntrace = 0;
        this.maxEntrace = 9999999999;
        this.maxPerEntrace = 100;
        this.total_tax = 0;
        this.total_finc = 0;
        this.total_parc = 0;
        this.customer_rate = 0;
        this.commisionList = new Array();
        this.commisionSelected = new Commission_dto_1.Commission;
        this.financialTypeSelected = new FinancialType_dto_1.FinancialType;
        this.financialTypeList = new Array();
        this.financialTableSelected = new FinancialTable_dto_1.FinancialTable;
        this.financialTableList = new Array();
        this.delayList = new Array();
        this.termList = new Array();
        this.taxType = new Array();
        this.calculationSelected = false;
    }
    CalculationPainelMobileComponent.prototype.ngOnInit = function () {
        if (this.calculationID == "0") {
            this.enable = true;
        }
        if (!this.simulation.calculations[this.calculationID]) {
            this.simulation.calculations[this.calculationID] = new Calculation_dto_1.Calculation;
        }
        else {
            this.calculationSelected = this.simulation.calculations[this.calculationID].selected;
        }
        if (!this.simulation.client.typePerson) {
            if (this.simulation.client.cpfCnpj.length == 14) {
                this.simulation.client.typePerson = Client_dto_1.TypePerson.PJ;
            }
            else {
                this.simulation.client.typePerson = Client_dto_1.TypePerson.PF;
            }
        }
    };
    CalculationPainelMobileComponent.prototype.showDetailSimulation = function () {
        this.enable = true;
        this.simulation.detailSimulation = true;
    };
    CalculationPainelMobileComponent.prototype.compare = function () {
        this.enable = false;
        this.simulation.detailSimulation = false;
    };
    CalculationPainelMobileComponent.prototype.contract = function () {
        this.simulation.calculations[this.calculationID].selected = true;
        this.simulation.calculationSelected = this.simulation.calculations[this.calculationID];
        this.simulation.reviewContractSimulation = true;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Simulation_dto_1.Simulation)
    ], CalculationPainelMobileComponent.prototype, "simulation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalculationPainelMobileComponent.prototype, "calculationID", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CalculationPainelMobileComponent.prototype, "enable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Installment_dto_1.Installment)
    ], CalculationPainelMobileComponent.prototype, "installments", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalculationPainelMobileComponent.prototype, "dados", void 0);
    CalculationPainelMobileComponent = __decorate([
        core_1.Component({
            selector: 'calculation-mobile',
            templateUrl: 'app/simulation/mobile/calculationMobile/calculationPainelMobile/calculation-mobile.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, material_1.MdDialog])
    ], CalculationPainelMobileComponent);
    return CalculationPainelMobileComponent;
}());
exports.CalculationPainelMobileComponent = CalculationPainelMobileComponent;
//# sourceMappingURL=calculation-mobile.component.js.map