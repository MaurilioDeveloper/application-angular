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
var Client_dto_1 = require("./../dto/Client.dto");
var simulation_service_1 = require("./../simulation.service");
var material_1 = require("@angular/material");
var app_service_1 = require("./../../app.service");
var core_1 = require("@angular/core");
var PainelProposalComponent = /** @class */ (function () {
    function PainelProposalComponent(appService, dialog, simulationService) {
        this.appService = appService;
        this.dialog = dialog;
        this.simulationService = simulationService;
    }
    PainelProposalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation) {
                _this.onload();
            }
        });
    };
    PainelProposalComponent.prototype.onload = function () {
        if (this.simulation.client.typePerson === Client_dto_1.TypePerson.PF) {
            this.person = 'Pessoa Física';
            this.cpfCnpj = "CPF";
        }
        else {
            this.person = 'Pessoa Jurídica';
            this.cpfCnpj = "CNPJ";
        }
        if (this.simulation.tc) {
            this.exempt = 'Isento';
        }
        else {
            this.exempt = 'Não Isento';
        }
    };
    PainelProposalComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(SelectTcDialog);
        dialogRef.componentInstance.tc = this.simulation.tc;
        dialogRef.afterClosed().subscribe(function (result) {
            _this.simulation.tc = dialogRef.componentInstance.tc;
            if (_this.simulation.tc) {
                _this.exempt = 'Isento';
            }
            else {
                _this.exempt = 'Não Isento';
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PainelProposalComponent.prototype, "steep", void 0);
    PainelProposalComponent = __decorate([
        core_1.Component({
            selector: 'painel-proposal',
            templateUrl: 'app/simulation/painelProposal/painel-proposal.component.html',
            styleUrls: ['app/simulation/painelProposal/tc-select-dialog.scss']
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, material_1.MdDialog,
            simulation_service_1.SimulationService])
    ], PainelProposalComponent);
    return PainelProposalComponent;
}());
exports.PainelProposalComponent = PainelProposalComponent;
var SelectTcDialog = /** @class */ (function () {
    function SelectTcDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    SelectTcDialog.prototype.ngOnInit = function () {
        this.tc = this.dialogRef.componentInstance.tc;
    };
    SelectTcDialog.prototype.changeTc = function (tClient) {
        this.dialogRef.componentInstance.tc = tClient;
        this.tc = tClient;
    };
    SelectTcDialog = __decorate([
        core_1.Component({
            selector: 'opem-tc-dialog',
            templateUrl: 'app/simulation/painelProposal/tc-select-dialog.html'
        }),
        __metadata("design:paramtypes", [material_1.MdDialogRef])
    ], SelectTcDialog);
    return SelectTcDialog;
}());
exports.SelectTcDialog = SelectTcDialog;
var PainelProposalTwoComponent = /** @class */ (function () {
    function PainelProposalTwoComponent(simulationService) {
        this.simulationService = simulationService;
    }
    PainelProposalTwoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation) {
                _this.onload();
            }
        });
    };
    PainelProposalTwoComponent.prototype.onload = function () {
    };
    PainelProposalTwoComponent = __decorate([
        core_1.Component({
            selector: 'painel-proposal-two',
            templateUrl: 'app/simulation/painelProposal/painel-proposal-two.component.html'
        }),
        __metadata("design:paramtypes", [simulation_service_1.SimulationService])
    ], PainelProposalTwoComponent);
    return PainelProposalTwoComponent;
}());
exports.PainelProposalTwoComponent = PainelProposalTwoComponent;
//# sourceMappingURL=painel-proposal.component.js.map