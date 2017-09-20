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
var guarantor_1_person_service_1 = require("./service/guarantor-1-person.service");
var core_1 = require("@angular/core");
var Guarantor1PersonCustomerCardComponent = /** @class */ (function () {
    function Guarantor1PersonCustomerCardComponent(guarantorOnePersonService) {
        this.guarantorOnePersonService = guarantorOnePersonService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    Guarantor1PersonCustomerCardComponent.prototype.ngOnInit = function () {
        this.guarantorOnePersonService.init();
    };
    Guarantor1PersonCustomerCardComponent.prototype.getSimulation = function () {
        return this.guarantorOnePersonService.simulation;
    };
    Guarantor1PersonCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 14;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1PersonCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Guarantor1PersonCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Guarantor1PersonCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    Guarantor1PersonCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-person-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_person_cc/guarantor_1_person_cc.component.html',
            providers: [guarantor_1_person_service_1.GuarantorOnePersonService]
        }),
        __metadata("design:paramtypes", [guarantor_1_person_service_1.GuarantorOnePersonService])
    ], Guarantor1PersonCustomerCardComponent);
    return Guarantor1PersonCustomerCardComponent;
}());
exports.Guarantor1PersonCustomerCardComponent = Guarantor1PersonCustomerCardComponent;
//# sourceMappingURL=guarantor_1_person_cc.component.js.map