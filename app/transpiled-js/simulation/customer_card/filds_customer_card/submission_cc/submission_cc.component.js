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
var submission_service_1 = require("./service/submission.service");
var core_1 = require("@angular/core");
var SubmissionCustomerCardComponent = /** @class */ (function () {
    function SubmissionCustomerCardComponent(submissionService) {
        this.submissionService = submissionService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
        this.submissionService.init();
    }
    ;
    SubmissionCustomerCardComponent.prototype.ngOnInit = function () {
    };
    SubmissionCustomerCardComponent.prototype.getSimulation = function () {
        return this.submissionService.simulation;
    };
    SubmissionCustomerCardComponent.prototype.getListCertifiedAgent = function () {
        return this.submissionService.listCertifiedAgent;
    };
    SubmissionCustomerCardComponent.prototype.getCertifiedAgentSelected = function () {
        return this.submissionService.certifiedAgentSelected;
    };
    SubmissionCustomerCardComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 2;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SubmissionCustomerCardComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SubmissionCustomerCardComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SubmissionCustomerCardComponent.prototype, "controlDynamicStepsM", void 0);
    SubmissionCustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'submission-cc',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/submission_cc/submission_cc.component.html',
            providers: [submission_service_1.SubmissionService]
        }),
        __metadata("design:paramtypes", [submission_service_1.SubmissionService])
    ], SubmissionCustomerCardComponent);
    return SubmissionCustomerCardComponent;
}());
exports.SubmissionCustomerCardComponent = SubmissionCustomerCardComponent;
//# sourceMappingURL=submission_cc.component.js.map