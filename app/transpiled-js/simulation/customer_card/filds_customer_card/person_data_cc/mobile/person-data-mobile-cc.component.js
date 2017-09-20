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
var person_data_service_1 = require("./../service/person-data.service");
var core_1 = require("@angular/core");
var PersonDataMobileComponent = /** @class */ (function () {
    function PersonDataMobileComponent(personDataService) {
        this.personDataService = personDataService;
        this.countClient = new core_1.EventEmitter();
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    PersonDataMobileComponent.prototype.ngOnInit = function () {
        this.personDataService.init();
    };
    PersonDataMobileComponent.prototype.getSimulation = function () {
        return this.personDataService.simulation;
    };
    PersonDataMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 7;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PersonDataMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PersonDataMobileComponent.prototype, "countClient", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PersonDataMobileComponent.prototype, "controlDynamicStepsM", void 0);
    PersonDataMobileComponent = __decorate([
        core_1.Component({
            selector: 'person-data-mobile',
            templateUrl: 'app/simulation/customer_card/filds_customer_card/person_data_cc/mobile/person-data-mobile-cc.component.html',
            providers: [person_data_service_1.PersonDataService]
        }),
        __metadata("design:paramtypes", [person_data_service_1.PersonDataService])
    ], PersonDataMobileComponent);
    return PersonDataMobileComponent;
}());
exports.PersonDataMobileComponent = PersonDataMobileComponent;
//# sourceMappingURL=person-data-mobile-cc.component.js.map