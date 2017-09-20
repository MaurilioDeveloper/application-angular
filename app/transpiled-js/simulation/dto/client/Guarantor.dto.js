"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BusinessRelashionshipType_dto_1 = require("./BusinessRelashionshipType.dto");
var Reference_dto_1 = require("./Reference.dto");
var Company_dto_1 = require("./Company.dto");
var Spouse_dto_1 = require("./Spouse.dto");
var IssuingBody_dto_1 = require("./IssuingBody.dto");
var DocumentType_dto_1 = require("./DocumentType.dto");
var EducationDegree_dto_1 = require("./EducationDegree.dto");
var PoliticalExposition_dto_1 = require("./PoliticalExposition.dto");
var province_dto_1 = require("./../../../commons/province/dto/province.dto");
var Country_dto_1 = require("./Country.dto");
var Phone_dto_1 = require("./Phone.dto");
var CivilState_dto_1 = require("./CivilState.dto");
var KinshipType_dto_1 = require("./KinshipType.dto");
var Address_dto_1 = require("./Address.dto");
var Guarantor = /** @class */ (function () {
    function Guarantor() {
        this.kinshipType = new KinshipType_dto_1.KinshipType();
        this.businessRelashionshipType = new BusinessRelashionshipType_dto_1.BusinessRelashionshipType();
        this.civilState = new CivilState_dto_1.CivilState();
        this.fixPhone = new Phone_dto_1.Phone();
        this.cellphone = new Phone_dto_1.Phone();
        this.country = new Country_dto_1.Country();
        this.province = new province_dto_1.Province();
        this.politicalExposition = new PoliticalExposition_dto_1.PoliticalExposition();
        this.educationDegree = new EducationDegree_dto_1.EducationDegree();
        this.documentType = new DocumentType_dto_1.DocumentType();
        this.countryDocument = new Country_dto_1.Country();
        this.provinceDocument = new province_dto_1.Province();
        this.issuingBodyDocument = new IssuingBody_dto_1.IssuingBody();
        this.address = new Address_dto_1.Address();
        this.company = new Company_dto_1.Company();
        this.reference1 = new Reference_dto_1.Reference();
        this.reference2 = new Reference_dto_1.Reference();
        this.spouse = new Spouse_dto_1.Spouse();
    }
    return Guarantor;
}());
exports.Guarantor = Guarantor;
//# sourceMappingURL=Guarantor.dto.js.map