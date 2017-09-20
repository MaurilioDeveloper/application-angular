"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var province_dto_1 = require("./../../../commons/province/dto/province.dto");
var Company_dto_1 = require("./Company.dto");
var IssuingBody_dto_1 = require("./IssuingBody.dto");
var Spouse = /** @class */ (function () {
    function Spouse() {
        this.province = new province_dto_1.Province();
        this.issuingBody = new IssuingBody_dto_1.IssuingBody();
        this.company = new Company_dto_1.Company();
    }
    return Spouse;
}());
exports.Spouse = Spouse;
//# sourceMappingURL=Spouse.dto.js.map