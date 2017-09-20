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
var app_service_1 = require("./../../../../../app.service");
var core_1 = require("@angular/core");
var app_message_1 = require("../../../../../app.message");
var ServicesDialog = /** @class */ (function () {
    function ServicesDialog(appService, appMessage, dialogRef) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.dialogRef = dialogRef;
        this.serviceList = new Array();
    }
    ServicesDialog.prototype.ngOnInit = function () {
        var _this = this;
        var observable = this.appService.xSearch('userProfile', 'verifyuseradmin');
        var dialogRef;
        observable.subscribe(function (data) {
            var response = data.json();
            if (response.userAdmin) {
                _this.itsSaleMan = false;
            }
            else {
                _this.itsSaleMan = true;
            }
        });
        var query = {};
        query["structureId"] = this.simulation.salesmanStructure.structureId;
        query["productId"] = this.simulation.calculations[this.calculationID].financialType.financeTypeId;
        query["vehicleType"] = this.simulation.car.vehicleType;
        var services = this.appService.xSearchWithData("serviceService/questService", query);
        services.subscribe(function (data) {
            var serviceResponse = data.json();
            //console.log(serviceResponse);
            _this.serviceList.length = 0;
            serviceResponse.listService.forEach(function (response) {
                response.checked = false;
                _this.serviceList.push(response);
            });
            _this.serviceList = serviceResponse.listService;
            if (_this.simulation.calculations[_this.calculationID].services) {
                _this.simulation.calculations[_this.calculationID].services.forEach(function (exist) {
                    _this.serviceList.forEach(function (response) {
                        if (response.id === exist.id) {
                            response.checked = true;
                        }
                    });
                });
            }
            else {
                _this.serviceList.forEach(function (response) {
                    if (response.required) {
                        response.checked = true;
                    }
                    if (response.selecetedDefault) {
                        response.checked = true;
                    }
                });
            }
        });
    };
    ServicesDialog.prototype.onfocus = function (service) {
        service.checked = true;
    };
    ServicesDialog.prototype.validate = function (event, service) {
        // this.appMessage.showWarning("event " + event);
        // console.log("event ", event, event.target.value);
        if (service.maxAmount) {
            if (event.target.value > service.maxAmount) {
                event.target.value = service.maxAmount;
                service.amount = service.maxAmount;
                // this.appMessage.showWarning("Max " + service.maxAmount);
            }
        }
        if (service.minAmount) {
            if (event.target.value < service.minAmount) {
                event.target.value = service.minAmount;
                service.amount = service.minAmount;
                // this.appMessage.showWarning("Min " + service.minAmount);
            }
        }
        if (!event || event === undefined) {
            service.amount = 0;
        }
    };
    ServicesDialog = __decorate([
        core_1.Component({
            selector: 'services-dialog',
            templateUrl: 'app/simulation/calculationPainel/calculationDialog/calculation/servicesDialog/servicesDialog.dialog.html',
            styleUrls: ['app/simulation/calculationPainel/calculationDialog/calculation/servicesDialog/servicesDialog.dialog.scss'],
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, material_1.MdDialogRef])
    ], ServicesDialog);
    return ServicesDialog;
}());
exports.ServicesDialog = ServicesDialog;
//# sourceMappingURL=servicesDialog.dialog.js.map