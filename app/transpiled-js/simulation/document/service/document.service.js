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
var app_message_1 = require("./../../../app.message");
var simulation_service_1 = require("./../../simulation.service");
var app_service_1 = require("./../../../app.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../step.enum");
var DocumentService = /** @class */ (function () {
    function DocumentService(appService, appMessage, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.simulationService = simulationService;
        this.listDocuments = [];
    }
    DocumentService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && _this.simulation.step == step_enum_1.StepEnum.STEP_DOCUMENT) {
                _this.onload();
            }
        });
    };
    DocumentService.prototype.onload = function () {
        this.number_proposal = this.simulation.id;
        this.loadDocuments();
    };
    DocumentService.prototype.loadDocuments = function () {
        var _this = this;
        var notices = this.appService.xSearch("documentationService/showListDocumentsToDownload", this.simulation.id);
        notices.subscribe(function (data) {
            var response = data.json();
            _this.listDocuments = response.listDocumentation;
        }, function (err) {
            console.log(err.json());
        });
    };
    DocumentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, simulation_service_1.SimulationService])
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map