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
var customer_card_service_1 = require("./customer-card.service");
var simulation_service_1 = require("./../simulation.service");
var flex_layout_1 = require("@angular/flex-layout");
var step_enum_1 = require("./../step.enum");
var core_1 = require("@angular/core");
var CustomerCardComponent = /** @class */ (function () {
    function CustomerCardComponent(media, customerCardService, simulationService) {
        this.media = media;
        this.customerCardService = customerCardService;
        this.simulationService = simulationService;
        this.changeStep = new core_1.EventEmitter();
        this.count = 0;
        this.varBtnMarca = 'keyboard_arrow_up';
        this.varBtnDrop = 'keyboard_arrow_up';
        this.drop = false;
        this.drop2 = false;
    }
    ;
    CustomerCardComponent.prototype.ngOnInit = function () {
        this.customerCardService.init();
        this.customerCardService.simulation.step = step_enum_1.StepEnum.STEP_CUSTOMER_CARD;
    };
    CustomerCardComponent.prototype.getSimulation = function () {
        return this.customerCardService.simulation;
    };
    CustomerCardComponent.prototype.isPhysicalPerson = function () {
        return this.customerCardService.isPhysicalPerson;
    };
    CustomerCardComponent.prototype.countClient = function () {
        this.count += 1;
        if (this.count >= 15) {
            this.getSimulation().step4CanNext = true;
        }
        else {
            this.getSimulation().step4CanNext = false;
        }
        this.getSimulation().step4CanNext = true;
    };
    CustomerCardComponent.prototype.getControlDynamicSteps = function () {
        if (this.customerCardService.controlDynamicSteps === undefined) {
            this.customerCardService.controlDynamicSteps = 1;
            return this.customerCardService.controlDynamicSteps;
        }
        return this.customerCardService.controlDynamicSteps;
    };
    CustomerCardComponent.prototype.isSpouseClient = function () {
        this.customerCardService.isSpouseClient;
    };
    CustomerCardComponent.prototype.clicked = function () {
        if (this.drop) {
            this.drop = false;
            this.varBtnMarca = 'keyboard_arrow_down';
        }
        else {
            this.drop = true;
            this.varBtnMarca = 'keyboard_arrow_up';
        }
    };
    CustomerCardComponent.prototype.hide = function () {
        if (this.drop2) {
            this.drop2 = false;
            this.varBtnDrop = 'keyboard_arrow_down';
        }
        else {
            this.drop2 = true;
            this.varBtnDrop = 'keyboard_arrow_up';
        }
    };
    CustomerCardComponent.prototype.controlDynamicStepsM = function (dynamicSteps) {
        this.customerCardService.controlDynamicSteps = dynamicSteps;
    };
    CustomerCardComponent.prototype.returnToStep = function (step) {
        this.customerCardService.controlDynamicSteps = step;
    };
    CustomerCardComponent.prototype.changeSpouse = function (value) {
        this.customerCardService.showSpouse = value;
    };
    CustomerCardComponent.prototype.getShowSpouse = function () {
        return this.customerCardService.showSpouse;
    };
    CustomerCardComponent.prototype.changeSpouseGuarantor1 = function (value) {
        this.customerCardService.showSpouseGuarantor1 = value;
    };
    CustomerCardComponent.prototype.getShowSpouseGuarantor1 = function () {
        return this.customerCardService.showSpouseGuarantor1;
    };
    CustomerCardComponent.prototype.changeSpouseGuarantor2 = function (value) {
        this.customerCardService.showSpouseGuarantor2 = value;
    };
    CustomerCardComponent.prototype.getShowSpouseGuarantor2 = function () {
        return this.customerCardService.showSpouseGuarantor2;
    };
    CustomerCardComponent.prototype.changeGuarantor1 = function (value) {
        this.customerCardService.showGuarantor1 = value;
    };
    CustomerCardComponent.prototype.getShowGuarantor1 = function () {
        return this.customerCardService.showGuarantor1;
    };
    CustomerCardComponent.prototype.changeGuarantor2 = function (value) {
        this.customerCardService.showGuarantor2 = value;
    };
    CustomerCardComponent.prototype.getShowGuarantor2 = function () {
        return this.customerCardService.showGuarantor2;
    };
    CustomerCardComponent.prototype.getVerifyPhysicalSpouseGuarantor1 = function () {
        return this.customerCardService.verifyPhysicalSpouseGuarantor();
    };
    CustomerCardComponent.prototype.getVerifyPhysicalSpouseGuarantor2 = function () {
        return this.customerCardService.verifyPhysicalSpouseGuarantor2();
    };
    CustomerCardComponent.prototype.saveDossier = function () {
        this.customerCardService.saveDossier();
    };
    CustomerCardComponent.prototype.change = function (go) {
        this.changeStep.emit(go);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CustomerCardComponent.prototype, "changeStep", void 0);
    CustomerCardComponent = __decorate([
        core_1.Component({
            selector: 'customer-card',
            templateUrl: 'app/simulation/customer_card/customer_card.component.html',
            styleUrls: ['app/simulation/customer_card/customer_card.component.css'],
            providers: [customer_card_service_1.CustomerCardService]
        }),
        __metadata("design:paramtypes", [flex_layout_1.ObservableMedia, customer_card_service_1.CustomerCardService,
            simulation_service_1.SimulationService])
    ], CustomerCardComponent);
    return CustomerCardComponent;
}());
exports.CustomerCardComponent = CustomerCardComponent;
//# sourceMappingURL=customer_card.component.js.map