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
var CertifiedAgent_dto_1 = require("./../../../../dto/client/CertifiedAgent.dto");
var simulation_service_1 = require("./../../../../simulation.service");
var app_service_1 = require("../../../../../app.service");
var step_enum_1 = require("./../../../../step.enum");
var core_1 = require("@angular/core");
var SubmissionService = /** @class */ (function () {
    function SubmissionService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
    }
    SubmissionService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_SUBMISSION)) {
                _this.onload();
            }
        });
    };
    SubmissionService.prototype.onload = function () {
        this.loadNameCertifidAgent();
    };
    SubmissionService.prototype.loadNameCertifidAgent = function () {
        var _this = this;
        this.certifiedAgentSelected = new CertifiedAgent_dto_1.CertifiedAgent();
        var observable = this.appService.xSearchWithData('customerCardService/findCertifiedAgentFromSantander', new Object());
        observable.subscribe(function (data) {
            var response = data.json();
            _this.listCertifiedAgent = response.certifiedAgenteDTOList;
            var certifiedAgentId = _this.simulation.certifiedAgent;
            var resultFilter = _this.listCertifiedAgent.filter(function (certifiedAgent) { return certifiedAgent.id === certifiedAgentId; });
            //Caso a simulação já tenha um agente certificado
            if (resultFilter[0]) {
                _this.certifiedAgentSelected = resultFilter[0];
                _this.simulation.certifiedAgent = resultFilter[0].id;
            }
            else {
                //Caso possua somente um registro, será selecionado automaticamente
                if (_this.listCertifiedAgent.length == 1) {
                    _this.certifiedAgentSelected = _this.listCertifiedAgent[0];
                    _this.simulation.certifiedAgent = _this.listCertifiedAgent[0].id;
                }
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    SubmissionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], SubmissionService);
    return SubmissionService;
}());
exports.SubmissionService = SubmissionService;
//# sourceMappingURL=submission.service.js.map