"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Address_dto_1 = require("./Address.dto");
var Phone_dto_1 = require("./Phone.dto");
var Company = /** @class */ (function () {
    function Company() {
        this.address = new Address_dto_1.Address();
        this.comercialPhone = new Phone_dto_1.Phone();
    }
    return Company;
}());
exports.Company = Company;
//# sourceMappingURL=Company.dto.js.map