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
var guarantor_1_person_service_1 = require("./../service/guarantor-1-person.service");
var core_1 = require("@angular/core");
var GuarantorOnePersonMobileComponent = /** @class */ (function () {
    function GuarantorOnePersonMobileComponent(guarantorOnePersonService) {
        this.guarantorOnePersonService = guarantorOnePersonService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    GuarantorOnePersonMobileComponent.prototype.ngOnInit = function () {
        this.guarantorOnePersonService.init();
    };
    GuarantorOnePersonMobileComponent.prototype.getSimulation = function () {
        return this.guarantorOnePersonService.simulation;
    };
    GuarantorOnePersonMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 14;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorOnePersonMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], GuarantorOnePersonMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GuarantorOnePersonMobileComponent.prototype, "controlDynamicStepsM", void 0);
    GuarantorOnePersonMobileComponent = __decorate([
        core_1.Component({
            selector: 'guarantor-1-person-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_person_cc/mobile/guarantor-1-person-mobile-cc.component.html',
            providers: [guarantor_1_person_service_1.GuarantorOnePersonService]
        }),
        __metadata("design:paramtypes", [guarantor_1_person_service_1.GuarantorOnePersonService])
    ], GuarantorOnePersonMobileComponent);
    return GuarantorOnePersonMobileComponent;
}());
exports.GuarantorOnePersonMobileComponent = GuarantorOnePersonMobileComponent;
//# sourceMappingURL=guarantor-1-person-mobile-cc.component.js.map