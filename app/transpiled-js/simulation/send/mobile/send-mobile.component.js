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
var send_service_1 = require("./../service/send.service");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var SendMobileComponent = /** @class */ (function () {
    function SendMobileComponent(sendService) {
        this.sendService = sendService;
        this.changeStep = new core_1.EventEmitter();
    }
    SendMobileComponent.prototype.ngOnInit = function () {
        this.sendService.init();
    };
    SendMobileComponent.prototype.getList = function () {
        return this.sendService.list;
    };
    SendMobileComponent.prototype.getSelected = function (list) {
        if (list) {
            list.forEach(function (calculation) {
                if (calculation.selected) {
                    return [calculation];
                }
            });
        }
    };
    SendMobileComponent.prototype.backAndNext = function (toFront) {
        this.changeStep.emit(toFront);
    };
    SendMobileComponent.prototype.getSimulation = function () {
        return this.sendService.simulation;
    };
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SendMobileComponent.prototype, "changeStep", void 0);
    SendMobileComponent = __decorate([
        core_3.Component({
            selector: 'send-mobile',
            templateUrl: './app/simulation/send/mobile/send-mobile.component.html',
            providers: [send_service_1.SendService]
        }),
        __metadata("design:paramtypes", [send_service_1.SendService])
    ], SendMobileComponent);
    return SendMobileComponent;
}());
exports.SendMobileComponent = SendMobileComponent;
//# sourceMappingURL=send-mobile.component.js.map