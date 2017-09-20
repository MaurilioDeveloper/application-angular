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
var app_service_1 = require("./../../app.service");
var app_message_1 = require("./../../app.message");
var router_1 = require("@angular/router");
var DealerProposalDetailComponent = /** @class */ (function () {
    function DealerProposalDetailComponent(appService, appMessage, route, router) {
        var _this = this;
        this.appService = appService;
        this.appMessage = appMessage;
        this.route = route;
        this.router = router;
        /** List of new concessionaire **/
        this.listStructureDealership = [];
        /** List of new concessionaire **/
        this.listSalesmanDealership = [];
        /** Variable structure dealership delected  **/
        this.structureDealershipSelected = null;
        /** Variable salesman dealership delected  **/
        this.salesmanDealershipSelected = null;
        this.route
            .params
            .subscribe(function (params) {
            _this.idProposal = "" + params['id'];
        });
        this.loadFilds();
        this.loadStructureDealership();
    }
    ;
    DealerProposalDetailComponent.prototype.ngOnInit = function () {
    };
    /** Method for load initial filds **/
    DealerProposalDetailComponent.prototype.loadFilds = function () {
        var _this = this;
        var result = this.appService.xSearch("dossierService/findDossierChangedById", this.idProposal);
        result.subscribe(function (data) {
            var response = data.json();
            _this.dossier = response.dossier;
            console.log(_this.dossier);
        }, function (err) {
            console.log(err.json());
        });
    };
    /** Method for load structure dealership **/
    DealerProposalDetailComponent.prototype.loadStructureDealership = function () {
        var _this = this;
        var result = this.appService.xSearch('structureService', 'allStructureDealership');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listStructureDealership = response.listStructure;
            console.log("eeeeeeeeee");
        }, function (err) {
            console.log(err.json());
        });
    };
    /** Method for load salesman dealership after choose of 'Structure Dealership' **/
    DealerProposalDetailComponent.prototype.loadSalesmanDealership = function (structureIdParam) {
        var _this = this;
        if (structureIdParam != null) {
            var request = {
                "structureId": structureIdParam
            };
            var result = this.appService.xPost('personService/questSalesmanDealership', request);
            result.subscribe(function (data) {
                var response = data.json();
                _this.listSalesmanDealership = response.listPerson;
            }, function (err) {
                console.log(err.json());
            });
        }
    };
    /** Method for reassign proposal **/
    DealerProposalDetailComponent.prototype.reassignProposal = function () {
        var _this = this;
        if (this.validFilds()) {
            var request = {
                "dossierId": this.dossier["dossierId"],
                "personIdFrom": this.dossier["salesmanId"],
                "personIdTo": this.salesmanDealershipSelected,
                "structureIdFrom": this.dossier["structureId"],
                "structureIdTo": this.structureDealershipSelected
            };
            var result = this.appService.xPost('dossierService/insertDossierTransfStructure', request);
            result.subscribe(function (data) {
                _this.appMessage.showSuccess("Proposta reatribuída com sucesso");
                _this.clearFilds();
                //navigator.('dealer_proposal')
                //this.router.navigate('dealer_proposal');
                _this.router.navigateByUrl('/dealer_proposal');
            });
        }
        else {
            this.appMessage.showInfo("Você deve selecionar Concessionária e Vendedor para reatribuir");
        }
    };
    /** Method that validates the screen fields **/
    DealerProposalDetailComponent.prototype.validFilds = function () {
        if (this.structureDealershipSelected == null) {
            return false;
        }
        if (this.salesmanDealershipSelected == null) {
            return false;
        }
        return true;
    };
    DealerProposalDetailComponent.prototype.clearFilds = function () {
        this.listStructureDealership = [];
        this.listSalesmanDealership = [];
        this.structureDealershipSelected = null;
        this.salesmanDealershipSelected = null;
        this.loadStructureDealership();
    };
    DealerProposalDetailComponent = __decorate([
        core_1.Component({
            selector: 'dealer-proposal-detail',
            templateUrl: './app/dealer_proposal/detail/dealer_proposal_detail.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, router_1.ActivatedRoute, router_1.Router])
    ], DealerProposalDetailComponent);
    return DealerProposalDetailComponent;
}());
exports.DealerProposalDetailComponent = DealerProposalDetailComponent;
;
//# sourceMappingURL=dealer_proposal_detail.component.js.map