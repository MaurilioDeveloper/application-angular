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
var customer_card_service_1 = require("./../customer-card.service");
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var SendSimulationDialog = /** @class */ (function () {
    function SendSimulationDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    SendSimulationDialog.prototype.ngOnInit = function () {
    };
    SendSimulationDialog = __decorate([
        core_1.Component({
            selector: 'send_simulation_component',
            templateUrl: './app/simulation/customer_card/send_simulation_dialog/send_simulation.dialog.html',
            providers: [customer_card_service_1.CustomerCardService]
        }),
        __metadata("design:paramtypes", [material_1.MdDialogRef])
    ], SendSimulationDialog);
    return SendSimulationDialog;
}());
exports.SendSimulationDialog = SendSimulationDialog;
;
//# sourceMappingURL=send_simulation.dialog.js.map