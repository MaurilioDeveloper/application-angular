"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MailingAddress_dto_1 = require("./MailingAddress.dto");
var ResidenceType_dto_1 = require("./ResidenceType.dto");
var province_dto_1 = require("./../../../commons/province/dto/province.dto");
var Address = /** @class */ (function () {
    function Address() {
        this.province = new province_dto_1.Province();
        this.residenceType = new ResidenceType_dto_1.ResidenceType();
        this.mailingAddress = new MailingAddress_dto_1.MailingAddress();
    }
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=Address.dto.js.map