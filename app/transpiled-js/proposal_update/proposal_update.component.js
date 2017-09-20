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
var app_service_1 = require("./../app.service");
var core_1 = require("@angular/core");
var ProposalUpdateComponent = /** @class */ (function () {
    function ProposalUpdateComponent(appService) {
        this.appService = appService;
        this.paramDto = { paramBoolean: true };
        this.paramList = [{ value: true, valueView: "Sempre apresentar o botão ATUALIZAR (para propostas enviadas para análise de crédito)" },
            { value: false, valueView: "Apresentar o botão ATUALIZAR somente quando o webservice retornar erro na chamada ao método de atualização" }];
    }
    ;
    ProposalUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        var observable = this.appService.xSearch('paramProposalUpdateService', 'findParamProposalUpdate');
        observable.subscribe(function (data) {
            var response = data.json();
            _this.paramDto = response.paramDto;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProposalUpdateComponent.prototype.save = function () {
        var _this = this;
        var observable = this.appService.xPost('paramProposalUpdateService/saveParamProposalUpdate', this.paramDto);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.paramDto = response.paramDto;
        }, function (err) {
            console.log(err.json());
        });
    };
    ProposalUpdateComponent = __decorate([
        core_1.Component({
            selector: 'proposal-update',
            templateUrl: './app/proposal_update/proposal_update.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService])
    ], ProposalUpdateComponent);
    return ProposalUpdateComponent;
}());
exports.ProposalUpdateComponent = ProposalUpdateComponent;
;
//# sourceMappingURL=proposal_update.component.js.map