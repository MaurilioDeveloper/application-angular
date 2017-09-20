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
var simulation_service_1 = require("./../../simulation.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../step.enum");
var StepperMobileComponent = /** @class */ (function () {
    function StepperMobileComponent(simulationService) {
        this.simulationService = simulationService;
        this.changeStep = new core_1.EventEmitter();
    }
    ;
    StepperMobileComponent.prototype.change = function (toFront) {
        this.changeStep.emit(toFront);
    };
    StepperMobileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            this.browser = "IE";
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            this.browser = "IE";
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            this.browser = "IE";
        }
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation) {
                _this.onload();
            }
        });
    };
    StepperMobileComponent.prototype.onload = function () {
    };
    StepperMobileComponent.prototype.ngOnChanges = function (changes) {
        switch (this.steep) {
            case step_enum_1.StepEnum.STEP_CLIENT:
                this.backStep = 'lb-client';
                break;
            case step_enum_1.StepEnum.STEP_VEHICLE:
                this.backStep = 'lb-edit-customer';
                break;
            case step_enum_1.StepEnum.STEP_SIMULATION:
                this.backStep = 'lb-edit-vehicle';
                break;
            case step_enum_1.StepEnum.STEP_CUSTOMER_CARD:
                this.backStep = 'lb-edit-simulation';
                break;
            case step_enum_1.StepEnum.STEP_SEND:
                this.backStep = 'lb-back-to-customer-card';
                break;
            case step_enum_1.StepEnum.STEP_DOCUMENT:
                this.backStep = 'lb-back-to-send';
                break;
            //Mobile
            case step_enum_1.StepEnum.STEP_MOBILE_SUBMISSION:
                this.backStep = 'lb-simulation';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_CLIENT_DATA:
                this.backStep = 'lb-submission';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_ADDRESS_DATA:
                this.backStep = 'lb-customer-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_SPOUSE:
                this.backStep = 'lb-residential-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_PROFESSIONAL_DATA:
                if (this.simulation.client.civilState.description == "CASADO" || this.simulation.client.civilState.description == "COMPANHEIRO") {
                    this.backStep = 'lb-spouse';
                }
                else {
                    this.backStep = 'lb-residential-data';
                }
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_PERSON_DATA:
                this.backStep = 'lb-professional-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_BANKING_REFENCES:
                this.backStep = 'lb-personal-references';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_VEHICLE_DATA:
                this.backStep = 'lb-banking-references';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_CLIENT:
                this.backStep = 'lb-vehicle-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_ADDRESS:
                this.backStep = 'lb-guarantor-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_SPOUSE:
                this.backStep = 'lb-residential-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_PROFESSIONAL:
                if (this.simulation.client.guarantor1.civilState.description == "CASADO" || this.simulation.client.guarantor1.civilState.description == "COMPANHEIRO") {
                    this.backStep = 'lb-spouse';
                }
                else {
                    this.backStep = 'lb-residential-data';
                }
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_PERSON:
                this.backStep = 'lb-professional-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_BANKING:
                this.backStep = 'lb-personal-references';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_CLIENT:
                // if(!this.simulation.client.guarantor2.guarantorType) {
                //     this.simulation.client.guarantor2.guarantorType = new GuarantorType();
                // }
                if (this.simulation.client.guarantor1.guarantorType.id == "0") {
                    this.backStep = 'lb-guarantor-data';
                }
                else {
                    this.backStep = 'lb-banking-references';
                }
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_ADDRESS:
                this.backStep = 'lb-guarantor-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_SPOUSE:
                this.backStep = 'lb-residential-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_PROFESSIONAL:
                if (this.simulation.client.guarantor2.civilState.description == "CASADO" || this.simulation.client.guarantor2.civilState.description == "COMPANHEIRO") {
                    this.backStep = 'lb-spouse';
                }
                else {
                    this.backStep = 'lb-residential-data';
                }
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_PERSON:
                this.backStep = 'lb-professional-data';
                break;
            case step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_TWO_BANKING:
                this.backStep = 'lb-personal-references';
                break;
            default:
                this.backStep = 'lb-client';
                break;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], StepperMobileComponent.prototype, "steep", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StepperMobileComponent.prototype, "changeStep", void 0);
    StepperMobileComponent = __decorate([
        core_1.Component({
            selector: 'stepper-mobile',
            templateUrl: './app/simulation/mobile/stepperMobile/stepper-mobile.component.html'
        }),
        __metadata("design:paramtypes", [simulation_service_1.SimulationService])
    ], StepperMobileComponent);
    return StepperMobileComponent;
}());
exports.StepperMobileComponent = StepperMobileComponent;
//# sourceMappingURL=stepper-mobile.component.js.map