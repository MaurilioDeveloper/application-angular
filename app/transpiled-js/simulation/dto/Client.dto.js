"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guarantor_dto_1 = require("./client/Guarantor.dto");
var Address_dto_1 = require("./client/Address.dto");
var Phone_dto_1 = require("./client/Phone.dto");
var BankDetails_dto_1 = require("./client/BankDetails.dto");
var Client = /** @class */ (function () {
    function Client() {
        this.phone = new Phone_dto_1.Phone();
        this.address = new Address_dto_1.Address();
        this.guarantor1 = new Guarantor_dto_1.Guarantor();
        this.guarantor2 = new Guarantor_dto_1.Guarantor();
        this.bankDetails = new BankDetails_dto_1.BankDetails();
        this.cpfCnpj = '';
    }
    return Client;
}());
exports.Client = Client;
var TypePerson;
(function (TypePerson) {
    TypePerson["PF"] = "PF";
    TypePerson["PJ"] = "PJ";
})(TypePerson = exports.TypePerson || (exports.TypePerson = {}));
//# sourceMappingURL=Client.dto.js.map