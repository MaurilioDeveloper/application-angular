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
var submission_service_1 = require("./../service/submission.service");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var SubmissionMobileComponent = /** @class */ (function () {
    function SubmissionMobileComponent(submissionService) {
        this.submissionService = submissionService;
        this.conf = false;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.submissionService.init();
    }
    ;
    SubmissionMobileComponent.prototype.ngOnInit = function () {
    };
    SubmissionMobileComponent.prototype.getSimulation = function () {
        return this.submissionService.simulation;
    };
    SubmissionMobileComponent.prototype.getListCertifiedAgent = function () {
        return this.submissionService.listCertifiedAgent;
    };
    SubmissionMobileComponent.prototype.getCertifiedAgentSelected = function () {
        return this.submissionService.certifiedAgentSelected;
    };
    SubmissionMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 2;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SubmissionMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_3.Input(),
        __metadata("design:type", Number)
    ], SubmissionMobileComponent.prototype, "steep", void 0);
    __decorate([
        core_3.Input(),
        __metadata("design:type", Number)
    ], SubmissionMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SubmissionMobileComponent.prototype, "controlDynamicStepsM", void 0);
    SubmissionMobileComponent = __decorate([
        core_3.Component({
            selector: 'submission-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/submission_cc/mobile/submission-mobile.component.html',
            providers: [submission_service_1.SubmissionService]
        }),
        __metadata("design:paramtypes", [submission_service_1.SubmissionService])
    ], SubmissionMobileComponent);
    return SubmissionMobileComponent;
}());
exports.SubmissionMobileComponent = SubmissionMobileComponent;
//# sourceMappingURL=submission-mobile.component.js.map