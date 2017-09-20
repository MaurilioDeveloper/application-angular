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
var simulation_service_1 = require("./../../../simulation.service");
var client_customer_service_1 = require("./../../../services/customer_card/client-customer.service");
var core_1 = require("@angular/core");
var ClientDataCustomerCardMobileComponent = (function () {
    function ClientDataCustomerCardMobileComponent(clientCustumerService, simulationService) {
        this.clientCustumerService = clientCustumerService;
        this.simulationService = simulationService;
        this.controlDynamicStepsM = new core_1.EventEmitter();
        this.countClient = new core_1.EventEmitter();
        this.conf = false;
    }
    ;
    ClientDataCustomerCardMobileComponent.prototype.ngOnInit = function () {
        this.clientCustumerService.loadServices();
    };
    ClientDataCustomerCardMobileComponent.prototype.getSimulation = function () {
        return this.clientCustumerService.simulation;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListCivilState = function () {
        return this.clientCustumerService.listCivilState;
    };
    ClientDataCustomerCardMobileComponent.prototype.getListCountry = function () {
        return;
    };
    ClientDataCustomerCardMobileComponent.prototype.nextStep = function () {
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 3;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ClientDataCustomerCardMobileComponent.prototype, "controlDynamicStepsIn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ClientDataCustomerCardMobileComponent.prototype, "controlDynamicStepsM", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ClientDataCustomerCardMobileComponent.prototype, "countClient", void 0);
    ClientDataCustomerCardMobileComponent = __decorate([
        core_1.Component({
            selector: 'client-data-mobile',
            templateUrl: 'app/simulation/mobile/customer_card/client_data_mobile/client-data-mobile.component.html',
            providers: [client_customer_service_1.ClientCustomerService]
        }),
        __metadata("design:paramtypes", [client_customer_service_1.ClientCustomerService, simulation_service_1.SimulationService])
    ], ClientDataCustomerCardMobileComponent);
    return ClientDataCustomerCardMobileComponent;
}());
exports.ClientDataCustomerCardMobileComponent = ClientDataCustomerCardMobileComponent;
//# sourceMappingURL=client-data-mobile.component.js.map