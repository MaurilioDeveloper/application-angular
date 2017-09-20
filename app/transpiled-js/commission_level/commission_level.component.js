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
var flex_layout_1 = require("@angular/flex-layout");
var app_service_1 = require("./../app.service");
var core_1 = require("@angular/core");
var CommissionLevelComponent = /** @class */ (function () {
    function CommissionLevelComponent(appService, media, appMessage) {
        var _this = this;
        this.appService = appService;
        this.media = media;
        this.appMessage = appMessage;
        this.request = { financeTypeId: null, saleTypeId: null, salesmanId: null, commissionId: null };
        this.listPerson = [];
        this.listSaletype = [];
        this.listFinanceType = [];
        this.listUserCommission = [];
        this.listUserCommissionTemp = [];
        this.state = '';
        media.asObservable()
            .subscribe(function (change) {
            _this.state = change ? "'" + change.mqAlias + "' = (" + change.mediaQuery + ")" : "";
        });
    }
    CommissionLevelComponent.prototype.ngOnInit = function () {
        this.showDataTable = false;
        this.loadSelect();
    };
    CommissionLevelComponent.prototype.loadSelect = function () {
        var _this = this;
        var observable = this.appService.xSearch('commissionLevelService', 'questCommissionLevelLoad');
        observable.subscribe(function (data) {
            var response = data.json();
            (_a = _this.listFinanceType).push.apply(_a, response.listFinanceType);
            (_b = _this.listPerson).push.apply(_b, response.listPerson);
            var _a, _b;
        }, function (err) {
            console.log(err.json());
        });
    };
    CommissionLevelComponent.prototype.loadSaleType = function () {
        var _this = this;
        if ((this.request.financeTypeId != null && this.request.financeTypeId != undefined)) {
            var observable = this.appService.xSearch('commissionLevelService/questUserSaleTypeByfinanceType', this.request.financeTypeId);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.listSaletype = response.listSaletype;
                var exist = false;
                _this.listSaletype.forEach(function (saletype) {
                    if (saletype.id === _this.request.saleTypeId) {
                        exist = true;
                    }
                });
                if (!exist) {
                    _this.request.saleTypeId = undefined;
                }
            }, function (err) {
                console.log(err.json());
            });
        }
    };
    CommissionLevelComponent.prototype.loadUserCommission = function () {
        var _this = this;
        this.loadSaleType();
        if ((this.request.financeTypeId != null && this.request.financeTypeId != undefined)
            && (this.request.saleTypeId != null && this.request.saleTypeId != undefined)) {
            var observable = this.appService.xSearchWithData('commissionLevelService/questCommissionLevelUser', this.request);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.listUserCommission = response.listUserCommission;
                var exist = false;
                _this.listUserCommission.forEach(function (userCommission) {
                    if (userCommission.commisonId === _this.request.commissionId) {
                        exist = true;
                    }
                });
                if (!exist) {
                    _this.request.commissionId = undefined;
                }
            }, function (err) {
                console.log(err.json());
            });
        }
        else {
            this.listUserCommission = [];
        }
    };
    CommissionLevelComponent.prototype.loadCommissionTemp = function () {
        var _this = this;
        if (this.request.salesmanId != null && this.request.salesmanId != undefined) {
            var observable = this.appService.xSearchWithData('commissionLevelService/questCommissionTempBySalesman', this.request);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.listUserCommissionTemp = response.listUserCommissionTemp;
                _this.showDataTable = true;
            }, function (err) {
                console.log(err.json());
            });
        }
        else {
            this.listUserCommissionTemp = [];
            this.showDataTable = false;
        }
    };
    CommissionLevelComponent.prototype.saveCommissionTemp = function () {
        var _this = this;
        if ((this.request.salesmanId != null && this.request.salesmanId != undefined)
            && (this.request.financeTypeId != null && this.request.financeTypeId != undefined)
            && (this.request.saleTypeId != null && this.request.saleTypeId != undefined)
            && (this.request.commissionId != null && this.request.commissionId != undefined)) {
            var observable = this.appService.xSearchWithData('commissionLevelService/saveCommissionTemp', this.request);
            observable.subscribe(function (data) {
                _this.appMessage.showSuccess("Liberação realizada com sucesso.");
                _this.loadCommissionTemp();
            }, function (err) {
                console.log(err.json());
            });
        }
        else {
            this.listUserCommissionTemp = [];
            this.showDataTable = false;
        }
    };
    CommissionLevelComponent.prototype.cleanPage = function () {
        if (this.table) {
            this.table.offset = 0;
        }
    };
    __decorate([
        core_1.ViewChild('table'),
        __metadata("design:type", Object)
    ], CommissionLevelComponent.prototype, "table", void 0);
    CommissionLevelComponent = __decorate([
        core_1.Component({
            selector: 'app-commission',
            templateUrl: './app/commission_level/commission_level.component.html',
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, flex_layout_1.ObservableMedia, app_message_1.AppMessage])
    ], CommissionLevelComponent);
    return CommissionLevelComponent;
}());
exports.CommissionLevelComponent = CommissionLevelComponent;
;
//# sourceMappingURL=commission_level.component.js.map