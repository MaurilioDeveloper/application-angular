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
var notifications_dto_1 = require("./notifications.dto");
var app_message_1 = require("./../app.message");
var app_service_1 = require("./../app.service");
var core_1 = require("@angular/core");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(appService, appMessage) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.rowClass = function (row) {
            if (row.read == 1) {
                return {
                    'paintLine': row.read == 1
                };
            }
        };
    }
    ;
    NotificationComponent.prototype.ngOnInit = function () {
        this.notification = new notifications_dto_1.Notification();
        this.listNotification();
    };
    NotificationComponent.prototype.changeRead = function (event, index) {
        var _this = this;
        this.read === true ? false : true;
        this.notification.read = event.checked;
        this.notification.id = index.id;
        this.notification.idUser = index.userId;
        var requestNotification = this.notification;
        var observable = this.appService.xUpdate('notificationService/updateNotification', requestNotification);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.updateNotifications(response.listNotifications);
        }, function (err) {
            console.log(err.json());
            _this.notification.read = !event.checked;
        });
    };
    NotificationComponent.prototype.changeReadClick = function (event, obj) {
        var _this = this;
        this.notification.read = true;
        this.notification.id = obj.id;
        this.notification.idUser = obj.userId;
        var requestNotification = this.notification;
        var observable = this.appService.xUpdate('notificationService/updateNotification', requestNotification);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.updateNotifications(response.listNotifications);
        }, function (err) {
            console.log(err.json());
            _this.notification.read = false;
        });
    };
    NotificationComponent.prototype.getCellClass = function (_a) {
        var row = _a.row, column = _a.column, value = _a.value;
        if (row.read == 1) {
            return {
                'paintLine': row.read == 1
            };
        }
    };
    NotificationComponent.prototype.listNotification = function () {
        var _this = this;
        var observable = this.appService.xSearch('notificationService', 'notificationlist');
        observable.subscribe(function (data) {
            var response = data.json();
            _this.updateNotifications(response.listNotifications);
        }, function (err) {
            console.log(err.json());
        });
    };
    NotificationComponent.prototype.updateNotifications = function (list) {
        if (list != undefined) {
            this.listNotifications = list;
        }
    };
    __decorate([
        core_1.ViewChildren('datatableTeaching'),
        __metadata("design:type", core_1.QueryList)
    ], NotificationComponent.prototype, "notification_rows", void 0);
    __decorate([
        core_1.ViewChild('datatableTeaching'),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "table", void 0);
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'notifications',
            templateUrl: './app/notifications/notifications.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
;
//# sourceMappingURL=notifications.component.js.map