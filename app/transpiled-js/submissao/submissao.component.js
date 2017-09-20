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
var app_message_1 = require("./../app.message");
var app_service_1 = require("./../app.service");
var core_1 = require("@angular/core");
var SubmissaoComponent = /** @class */ (function () {
    function SubmissaoComponent(appService, appMessage) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.resultUser = false;
        this.resultSubmitRole = false;
        this.typesUpdade = [
            { value: 1, viewValue: 'Usuário' },
            { value: 2, viewValue: 'Perfil' },
        ];
        this.listStructure = [{ structureId: null, description: 'Selecione uma Concessionária...' }];
        this.user = { userId: null, regionalView: null };
    }
    ;
    SubmissaoComponent.prototype.ngOnInit = function () {
        var userSession = this.appService.getSessionUser();
        this.user = { userId: userSession.userId, regionalView: userSession.isRegionalView };
        this.request = { userId: userSession.userId, structureId: null, listSubmitRole: null, listUser: null };
        this.loadStructure();
    };
    SubmissaoComponent.prototype.loadStructure = function () {
        var _this = this;
        var observable = this.appService.xSearch('structureService', 'questDealershipByUser');
        observable.subscribe(function (data) {
            var response = data.json();
            (_a = _this.listStructure).push.apply(_a, response.listStructure);
            var _a;
        }, function (err) {
            console.log(err.json());
        });
    };
    SubmissaoComponent.prototype.consultSubmitUser = function () {
        var _this = this;
        var observable = this.appService.xSearchWithData('submitDossierService/questSubmitUser', this.request);
        observable.subscribe(function (data) {
            var response = data.json();
            if (response.listUser != undefined) {
                _this.listUser = response.listUser;
                _this.resultUser = true;
                _this.resultSubmitRole = false;
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    SubmissaoComponent.prototype.saveSubmitUser = function () {
        var _this = this;
        this.request = { userId: this.request.userId, structureId: null, listSubmitRole: null, listUser: this.listUser };
        var observable = this.appService.xPost('submitDossierService/updateSubmitUser', this.request);
        observable.subscribe(function (data) {
            _this.appMessage.showSuccess("msg-sucesso-save");
        }, function (err) {
            console.log(err.json());
        });
    };
    SubmissaoComponent.prototype.consultSubmitRole = function () {
        var _this = this;
        var observable = this.appService.xSearchWithData('submitDossierService/questSubmitRole', this.request);
        observable.subscribe(function (data) {
            var response = data.json();
            if (response.listSubmitRole != undefined) {
                _this.listSubmitRole = response.listSubmitRole;
                _this.resultSubmitRole = true;
                _this.resultUser = false;
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    SubmissaoComponent.prototype.saveSubmitRole = function () {
        var _this = this;
        this.request = { userId: this.request.userId, structureId: this.request.structureId, listSubmitRole: this.listSubmitRole, listUser: null };
        var observable = this.appService.xPost('submitDossierService/updateSubmitRole', this.request);
        observable.subscribe(function (data) {
            _this.appMessage.showSuccess("msg-sucesso-save");
        }, function (err) {
            console.log(err.json());
        });
    };
    SubmissaoComponent = __decorate([
        core_1.Component({
            selector: 'app-submissao',
            templateUrl: './app/submissao/submissao.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage])
    ], SubmissaoComponent);
    return SubmissaoComponent;
}());
exports.SubmissaoComponent = SubmissaoComponent;
;
//# sourceMappingURL=submissao.component.js.map