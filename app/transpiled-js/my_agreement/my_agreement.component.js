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
var core_1 = require("@angular/core");
var app_service_1 = require("./../app.service");
var flex_layout_1 = require("@angular/flex-layout");
var MyAgreementComponent = /** @class */ (function () {
    function MyAgreementComponent(appService, media) {
        var _this = this;
        this.appService = appService;
        this.media = media;
        this.showConsult = false;
        this.listPersonType = [];
        this.listDossierStatus = [{ dossierStatusId: null, description: 'Selecionar um status...' }];
        this.listStructure = [{ structureId: null, description: 'Selecionar uma concessionária...' }];
        this.listSalesman = [{ dossierStatusId: null, name: 'Selecionar um vendedor...' }];
        this.listSaleType = [{ saleTypeId: null, description: 'Selecionar um tipo de venda...' }];
        this.listDossiers = [];
        this.state = '';
        media.asObservable()
            .subscribe(function (change) {
            _this.state = change ? "'" + change.mqAlias + "' = (" + change.mediaQuery + ")" : "";
        });
    }
    MyAgreementComponent.prototype.ngOnInit = function () {
        var userSession = this.appService.getSessionUser();
        this.loadSelect();
        this.loadForm();
    };
    ;
    MyAgreementComponent.prototype.loadForm = function () {
        this.filter = { idDossier: null,
            adp: null,
            typePerson: null,
            cpfCnpj: null,
            nameClient: null,
            proposedStatus: null,
            dateCreationInit: null,
            dateCreationEnd: null,
            dateExpirationInit: null,
            dateExpirationEnd: null,
            salesman: null,
            dealership: null,
            saleTypeId: null,
            taxTc: false };
    };
    MyAgreementComponent.prototype.loadSelect = function () {
        var _this = this;
        var observable = this.appService.xSearch('myAgreementService', 'myAgreementSelect');
        observable.subscribe(function (data) {
            var response = data.json();
            (_a = _this.listDossierStatus).push.apply(_a, response.listDossierStatus);
            (_b = _this.listStructure).push.apply(_b, response.listStructure);
            (_c = _this.listSaleType).push.apply(_c, response.listSaleType);
            _this.listPersonType = (response.listPersonType);
            var _a, _b, _c;
        }, function (err) {
            console.log(err.json());
        });
    };
    MyAgreementComponent.prototype.loadSalesman = function (structureSelected) {
        var _this = this;
        this.structure = { structureId: structureSelected };
        var observable = this.appService.xSearchWithData('personService/questSalesmanDealership', this.structure);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.listSalesman = [{ dossierStatusId: null, name: 'Selecionar um vendedor...' }];
            (_a = _this.listSalesman).push.apply(_a, response.listPerson);
            var _a;
        }, function (err) {
            console.log(err.json());
        });
    };
    MyAgreementComponent.prototype.clearMyAgreement = function () {
        this.loadForm();
    };
    MyAgreementComponent.prototype.consult = function (filter) {
        var _this = this;
        var observable = this.appService.xSearchWithData('dossierService/myDossier', filter);
        observable.subscribe(function (data) {
            var response = data.json();
            if (response.listDossiers != undefined) {
                _this.listDossiers = response.listDossiers;
                _this.showConsult = true;
                _this.cleanPage();
            }
            else {
                _this.showConsult = false;
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    MyAgreementComponent.prototype.cleanPage = function () {
        if (this.table) {
            this.table.offset = 0;
        }
    };
    __decorate([
        core_1.ViewChild('table'),
        __metadata("design:type", Object)
    ], MyAgreementComponent.prototype, "table", void 0);
    MyAgreementComponent = __decorate([
        core_1.Component({
            selector: 'my-agreement',
            templateUrl: './app/my_agreement/my_agreement.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, flex_layout_1.ObservableMedia])
    ], MyAgreementComponent);
    return MyAgreementComponent;
}());
exports.MyAgreementComponent = MyAgreementComponent;
//# sourceMappingURL=my_agreement.component.js.map