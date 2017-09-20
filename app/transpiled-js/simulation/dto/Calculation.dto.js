"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FinancialTable_dto_1 = require("./FinancialTable.dto");
var FinancialType_dto_1 = require("./FinancialType.dto");
var Calculation = /** @class */ (function () {
    function Calculation() {
        this.financialType = new FinancialType_dto_1.FinancialType();
        this.financialTable = new FinancialTable_dto_1.FinancialTable();
        this.totalValue = 0;
    }
    return Calculation;
}());
exports.Calculation = Calculation;
//# sourceMappingURL=Calculation.dto.js.map