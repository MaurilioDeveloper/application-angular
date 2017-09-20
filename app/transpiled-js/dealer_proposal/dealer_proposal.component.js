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
var flex_layout_1 = require("@angular/flex-layout");
var app_service_1 = require("./../app.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var DealerProposalComponent = /** @class */ (function () {
    function DealerProposalComponent(router, appService, media) {
        var _this = this;
        this.router = router;
        this.appService = appService;
        this.media = media;
        this.state = '';
        this.listDossiers = [];
        media.asObservable()
            .subscribe(function (change) {
            _this.state = change ? "'" + change.mqAlias + "' = (" + change.mediaQuery + ")" : "";
        });
    }
    ;
    DealerProposalComponent.prototype.ngOnInit = function () {
        this.loadDossiers();
    };
    ;
    DealerProposalComponent.prototype.loadDossiers = function () {
        var _this = this;
        var observable = this.appService.xSearch('dossierService', 'findDossierChanged');
        observable.subscribe(function (data) {
            var response = data.json();
            _this.listDossiers = response.listDossiers;
        }, function (err) {
            console.log(err.json());
        });
    };
    DealerProposalComponent = __decorate([
        core_1.Component({
            selector: 'dealer-proposal',
            templateUrl: './app/dealer_proposal/dealer_proposal.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, app_service_1.AppService, flex_layout_1.ObservableMedia])
    ], DealerProposalComponent);
    return DealerProposalComponent;
}());
exports.DealerProposalComponent = DealerProposalComponent;
;
//# sourceMappingURL=dealer_proposal.component.js.map