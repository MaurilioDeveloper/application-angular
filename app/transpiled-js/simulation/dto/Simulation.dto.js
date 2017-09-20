"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Calculation_dto_1 = require("./Calculation.dto");
var SaleType_dto_1 = require("./SaleType.dto");
var Client_dto_1 = require("./Client.dto");
var Car_dto_1 = require("./Car.dto");
var Simulation = /** @class */ (function () {
    function Simulation() {
        this.step1CanNext = false;
        this.step2CanNext = false;
        this.step3CanNext = false;
        this.step4CanNext = true;
        this.step5CanNext = false;
        this.step6CanNext = false;
        this.step7CanNext = false;
        this.showResumMobile = false;
        this.reviewContractSimulation = false;
        this.detailSimulation = false;
        this.showBtnSave = false;
        this.client = new Client_dto_1.Client;
        this.calculationSelected = new Calculation_dto_1.Calculation();
        this.saleType = new SaleType_dto_1.SaleType();
        this.car = new Car_dto_1.Car('', '', '', '');
        this.tc = false;
        this.vizualization = false;
        this.step = 0;
    }
    return Simulation;
}());
exports.Simulation = Simulation;
//# sourceMappingURL=Simulation.dto.js.map