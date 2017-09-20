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
var auth_service_1 = require("./../../login/auth.service");
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var ExitSalesmanDialog = /** @class */ (function () {
    function ExitSalesmanDialog(dialogRef, authService) {
        this.dialogRef = dialogRef;
        this.authService = authService;
        this.confirm = false;
    }
    ExitSalesmanDialog.prototype.ngOnInit = function () {
    };
    ExitSalesmanDialog.prototype.clearSalesman = function (result) {
        if (!result) {
            this.confirm = !result;
            sessionStorage.removeItem('salesman');
            sessionStorage.removeItem('structure');
            this.dialogRef.close();
        }
        else {
            this.dialogRef.close();
        }
    };
    ExitSalesmanDialog = __decorate([
        core_1.Component({
            selector: 'exit-salesman-dialog',
            templateUrl: 'app/simulation/exit_salesman_dialog/exitSalesmanDialog.dialog.html'
        }),
        __metadata("design:paramtypes", [material_1.MdDialogRef, auth_service_1.AuthService])
    ], ExitSalesmanDialog);
    return ExitSalesmanDialog;
}());
exports.ExitSalesmanDialog = ExitSalesmanDialog;
//# sourceMappingURL=exitSalesmanDialog.dialog.js.map