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
var material_1 = require("@angular/material");
var salesman_dto_1 = require("./dto/salesman.dto");
var auth_service_1 = require("./../../login/auth.service");
var structure_search_dto_1 = require("./dto/structure-search.dto");
var app_service_1 = require("./../../app.service");
var core_1 = require("@angular/core");
var SelectedSalesmanDialog = /** @class */ (function () {
    function SelectedSalesmanDialog(appService, authService, dialogRef) {
        this.appService = appService;
        this.authService = authService;
        this.dialogRef = dialogRef;
        this.showConsult = false;
        this.showContinue = false;
        this.isSalesmanSelected = false;
        this.listStructure = [];
        this.structureSearch = new structure_search_dto_1.StructureSearch('', '');
        this.dealershipSelected = [];
    }
    SelectedSalesmanDialog.prototype.ngOnInit = function () {
        console.log("Entrou");
    };
    SelectedSalesmanDialog.prototype.loadStructure = function () {
        var _this = this;
        var observable = this.appService.xSearchWithData('structureService/structurestoprofile', this.structureSearch);
        observable.subscribe(function (data) {
            var response = data.json();
            if (response.listStructure != undefined) {
                _this.listStructure = response.listStructure;
                _this.showConsult = true;
            }
            else {
                _this.showConsult = false;
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    SelectedSalesmanDialog.prototype.resetFields = function () {
        this.structureSearch = new structure_search_dto_1.StructureSearch('', '');
        this.listStructure = new Array();
        this.listSalesman = new Array();
        this.showConsult = false;
        this.isSalesmanSelected = false;
        this.showContinue = false;
        this.dealershipSelected = new Array();
    };
    SelectedSalesmanDialog.prototype.loadSalesman = function () {
        var _this = this;
        this.listSalesman = new Array();
        var observable = this.appService.xSearch('simulation/salesmanlist', this.dealershipSelected[0].structureId);
        this.showContinue = true;
        observable.subscribe(function (data) {
            var response = data.json();
            _this.listSalesman = response.listSalesman;
        }, function (err) {
            console.log(err.json());
        });
    };
    SelectedSalesmanDialog.prototype.selectSalesman = function () {
        this.isSalesmanSelected = true;
    };
    SelectedSalesmanDialog.prototype.continue = function () {
        this.authService.setSalesMan(new salesman_dto_1.Salesman(this.salesmanSelected.id, this.salesmanSelected.name));
        this.dialogRef.close();
    };
    SelectedSalesmanDialog.prototype.ngOnDestroy = function () {
        this.dialogRef.close();
    };
    SelectedSalesmanDialog = __decorate([
        core_1.Component({
            selector: 'selected-salesman-dialog',
            templateUrl: 'app/simulation/selected_salesman_dialog/selectedSalesman.dialog.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, auth_service_1.AuthService,
            material_1.MdDialogRef])
    ], SelectedSalesmanDialog);
    return SelectedSalesmanDialog;
}());
exports.SelectedSalesmanDialog = SelectedSalesmanDialog;
//# sourceMappingURL=selectedSalesman.dialog.js.map