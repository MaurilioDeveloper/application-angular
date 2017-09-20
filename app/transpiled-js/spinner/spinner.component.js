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
var spinner_service_1 = require("./spinner.service");
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var SpinnerComponent = /** @class */ (function () {
    //private subscription: Subscription;
    function SpinnerComponent(dialog, spinnerService) {
        /*
          this.subscription = this.spinnerService.notifyObservable.subscribe((value) => {
            this.display(value);
         });*/
        var _this = this;
        this.dialog = dialog;
        this.spinnerService = spinnerService;
        this.spinnerService.status.subscribe(function (val) {
            _this.display(val);
        });
    }
    SpinnerComponent.prototype.ngOnInit = function () {
        /*
                this.appService.status.subscribe((val:boolean )=> {
            this.display(val);
        });
        */
    };
    SpinnerComponent.prototype.ngAfterViewInit = function () {
    };
    SpinnerComponent.prototype.display = function (show) {
        if (show) {
            this.open();
        }
        else {
            this.close();
        }
    };
    SpinnerComponent.prototype.open = function () {
        this.spinnerRef = this.dialog.open(SpinnerComponentDialog, { disableClose: true, panelClass: 'spinner_transparent' });
    };
    SpinnerComponent.prototype.close = function () {
        if (this.spinnerRef) {
            this.spinnerRef.close();
        }
    };
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.spinnerService.status.unsubscribe();
        //this.subscription.unsubscribe();
    };
    SpinnerComponent = __decorate([
        core_1.Component({
            selector: 'spinner-component',
            template: ''
        }),
        __metadata("design:paramtypes", [material_1.MdDialog, spinner_service_1.SpinnerService])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
var SpinnerComponentDialog = /** @class */ (function () {
    function SpinnerComponentDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    SpinnerComponentDialog = __decorate([
        core_1.Component({
            selector: 'spinner-component-dialog',
            templateUrl: 'app/spinner/spinner.component.dialog.html',
        }),
        __metadata("design:paramtypes", [material_1.MdDialogRef])
    ], SpinnerComponentDialog);
    return SpinnerComponentDialog;
}());
exports.SpinnerComponentDialog = SpinnerComponentDialog;
//# sourceMappingURL=spinner.component.js.map