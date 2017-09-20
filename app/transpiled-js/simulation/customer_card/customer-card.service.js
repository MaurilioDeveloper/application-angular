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
var send_simulation_dialog_1 = require("./send_simulation_dialog/send_simulation.dialog");
var app_message_1 = require("./../../app.message");
var app_service_1 = require("./../../app.service");
var simulation_service_1 = require("./../simulation.service");
var core_1 = require("@angular/core");
var SpouseType_enum_1 = require("./../dto/client/SpouseType.enum");
var step_enum_1 = require("./../step.enum");
var Client_dto_1 = require("./../dto/Client.dto");
var material_1 = require("@angular/material");
var CustomerCardService = /** @class */ (function () {
    function CustomerCardService(simulationService, appService, appMessage, dialog) {
        this.simulationService = simulationService;
        this.appService = appService;
        this.appMessage = appMessage;
        this.dialog = dialog;
    }
    CustomerCardService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_SUBMISSION)) {
                _this.onload();
            }
        });
    };
    CustomerCardService.prototype.onload = function () {
        if (this.simulation.client.civilState) {
            this.showSpouse = this.hasSpouse(this.simulation.client.civilState.description);
        }
        if (this.simulation.client.guarantor1 && this.simulation.client.guarantor1.civilState) {
            this.showSpouseGuarantor1 = this.hasSpouse(this.simulation.client.guarantor1.civilState.description);
        }
        if (this.simulation.client.guarantor2 && this.simulation.client.guarantor2.civilState) {
            this.showSpouseGuarantor2 = this.hasSpouse(this.simulation.client.guarantor2.civilState.description);
        }
        if (this.simulation.client.guarantor1 && this.simulation.client.guarantor1.guarantorType) {
            this.showGuarantor1 = this.hasGuarantor(this.simulation.client.guarantor1.guarantorType.id);
        }
        if (this.simulation.client.guarantor2 && this.simulation.client.guarantor2.guarantorType) {
            this.showGuarantor2 = this.hasGuarantor(this.simulation.client.guarantor2.guarantorType.id);
        }
        this.isPhysicalPerson = this.simulation.client.typePerson === Client_dto_1.TypePerson.PF;
        this.controlDynamicSteps = 1;
    };
    CustomerCardService.prototype.hasSpouse = function (civilState) {
        return civilState == 'CASADO' || civilState == 'COMPANHEIRO';
    };
    CustomerCardService.prototype.hasGuarantor = function (guarantor) {
        return guarantor != "0";
    };
    CustomerCardService.prototype.isSpouseClient = function () {
        if (this.simulation.client.civilState != null) {
            return (this.simulation.client.civilState.value == SpouseType_enum_1.SpouseType.MARRIED ||
                this.simulation.client.civilState.value == SpouseType_enum_1.SpouseType.LIFE_PARTNER);
        }
        else {
            return true;
            //return false;
        }
    };
    CustomerCardService.prototype.isSpouseGuarantor1 = function () {
        if (this.simulation.client.guarantor1.civilState != null) {
            return (this.simulation.client.guarantor1.civilState.value == SpouseType_enum_1.SpouseType.MARRIED ||
                this.simulation.client.guarantor1.civilState.value == SpouseType_enum_1.SpouseType.LIFE_PARTNER);
        }
        else {
            return false;
        }
    };
    CustomerCardService.prototype.isSpouseGuarantor2 = function () {
        if (this.simulation.client.guarantor2.civilState != null) {
            return (this.simulation.client.guarantor2.civilState.value == SpouseType_enum_1.SpouseType.MARRIED ||
                this.simulation.client.guarantor2.civilState.value == SpouseType_enum_1.SpouseType.LIFE_PARTNER);
        }
        else {
            return false;
        }
    };
    CustomerCardService.prototype.verifyPhysicalSpouseGuarantor = function () {
        if (this.isPhysicalPerson && this.showSpouseGuarantor1 && this.showGuarantor1) {
            return true;
        }
        return false;
    };
    CustomerCardService.prototype.verifyPhysicalSpouseGuarantor2 = function () {
        if (this.isPhysicalPerson && this.showSpouseGuarantor2 && this.showGuarantor2) {
            return true;
        }
        return false;
    };
    CustomerCardService.prototype.saveDossier = function () {
        var _this = this;
        var dossier = { simulation: this.simulation };
        var saveDossierService = this.appService.xSearchWithData('savesimulation/savesimulation', dossier);
        saveDossierService.subscribe(function (data) {
            var response = data.json();
            _this.appMessage.showDefaultSuccess();
            var dialogRef = _this.dialog.open(send_simulation_dialog_1.SendSimulationDialog, { width: '40%' });
            //caso o usuario confirme a envio para o Santander
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    _this.sendSantander();
                }
            });
        }, function (err) {
            console.log(err.json());
        });
    };
    CustomerCardService.prototype.sendSantander = function () {
        var _this = this;
        if (this.simulation.id) {
            var send = new Object;
            send["dossierId"] = this.simulation.id;
            var specialget = this.appService.xPost('santanderService/sendDossierSantander', send);
            specialget.subscribe(function (data) {
                _this.appMessage.showDefaultSuccess();
            }, function (err) {
            });
        }
    };
    CustomerCardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [simulation_service_1.SimulationService, app_service_1.AppService,
            app_message_1.AppMessage, material_1.MdDialog])
    ], CustomerCardService);
    return CustomerCardService;
}());
exports.CustomerCardService = CustomerCardService;
//# sourceMappingURL=customer-card.service.js.map