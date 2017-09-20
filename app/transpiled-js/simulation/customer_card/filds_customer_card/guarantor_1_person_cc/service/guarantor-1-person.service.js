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
var Reference_dto_1 = require("./../../../../dto/client/Reference.dto");
var Guarantor_dto_1 = require("./../../../../dto/client/Guarantor.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var GuarantorOnePersonService = /** @class */ (function () {
    function GuarantorOnePersonService(simulationService) {
        this.simulationService = simulationService;
    }
    ;
    GuarantorOnePersonService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_PERSON)) {
                _this.onload();
            }
        });
    };
    GuarantorOnePersonService.prototype.initializeFields = function () {
        if (!this.simulation.client.guarantor1)
            this.simulation.client.guarantor1 = new Guarantor_dto_1.Guarantor();
        if (!this.simulation.client.guarantor1.reference1)
            this.simulation.client.guarantor1.reference1 = new Reference_dto_1.Reference();
        if (!this.simulation.client.guarantor1.reference2)
            this.simulation.client.guarantor1.reference2 = new Reference_dto_1.Reference();
    };
    GuarantorOnePersonService.prototype.onload = function () {
        this.initializeFields();
        this.validBankSelected();
    };
    GuarantorOnePersonService.prototype.validBankSelected = function () {
        if (this.simulation.client.guarantor1.guarantorType.description != '') {
            return this.simulation.client.guarantor1.isRequired = true;
        }
        else {
            return this.simulation.client.guarantor1.isRequired = false;
        }
    };
    GuarantorOnePersonService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [simulation_service_1.SimulationService])
    ], GuarantorOnePersonService);
    return GuarantorOnePersonService;
}());
exports.GuarantorOnePersonService = GuarantorOnePersonService;
//# sourceMappingURL=guarantor-1-person.service.js.map