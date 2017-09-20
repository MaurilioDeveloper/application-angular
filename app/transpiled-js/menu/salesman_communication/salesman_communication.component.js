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
var app_service_1 = require("./../../app.service");
var app_message_1 = require("./../../app.message");
var core_1 = require("@angular/core");
var SalesmanCommunicationComponent = /** @class */ (function () {
    function SalesmanCommunicationComponent(appMessage, appService) {
        this.appMessage = appMessage;
        this.appService = appService;
        this.notificationList = [];
        this.notificationListTemp = [];
        this.notConnected = true;
    }
    SalesmanCommunicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socket = new WebSocket(this.appService.getURLWebsocket() + "/omega2-async-communication/salesman_communication/"
            + this.appService.getSessionUser().access_token
            + "/" + this.appService.getSessionUser().username);
        this.socket.onopen = function (event) {
            _this.notConnected = false;
        };
        this.socket.onclose = function (event) {
            _this.notConnected = true;
        };
        this.socket.onmessage = function (event) {
            _this.notificationList = [];
            _this.notificationListTemp.push(event.data);
            var listSize = _this.notificationListTemp.length;
            //inverte a ordem para o topo ser o 1º da lista
            for (var i = 0; i < listSize && i < 10; i++) {
                _this.notificationList.push(_this.notificationListTemp[listSize - 1 - i]);
            }
            //metodo para noficar o usuario que ocorreu uma alteracao
            setTimeout(function () {
                _this.rowNotify();
            }, 0);
        };
        this.socket.onerror = function (event) {
            console.log('WebSocket Connection Error');
            _this.notConnected = true;
        };
    };
    SalesmanCommunicationComponent.prototype.rowNotify = function () {
        if (this.notification_rows.toArray()[0]) {
            var row_1 = this.notification_rows.toArray()[0].nativeElement;
            row_1.style.backgroundColor = '#BDBDBD';
            setTimeout(function () {
                row_1.style.backgroundColor = '';
            }, 2000);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SalesmanCommunicationComponent.prototype, "notificationHide", void 0);
    __decorate([
        core_1.ViewChildren('notification_row'),
        __metadata("design:type", core_1.QueryList)
    ], SalesmanCommunicationComponent.prototype, "notification_rows", void 0);
    SalesmanCommunicationComponent = __decorate([
        core_1.Component({
            selector: 'salesman_communication',
            templateUrl: './app/menu/salesman_communication/salesman_communication.component.html',
            styleUrls: ['./app/menu/salesman_communication/salesman_communication.component.css']
        }),
        __metadata("design:paramtypes", [app_message_1.AppMessage, app_service_1.AppService])
    ], SalesmanCommunicationComponent);
    return SalesmanCommunicationComponent;
}());
exports.SalesmanCommunicationComponent = SalesmanCommunicationComponent;
//# sourceMappingURL=salesman_communication.component.js.map