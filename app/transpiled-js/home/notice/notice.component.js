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
var router_1 = require("@angular/router");
var app_service_1 = require("./../../app.service");
var notice_dto_1 = require("./dto/notice.dto");
var core_1 = require("@angular/core");
var NoticeComponent = /** @class */ (function () {
    function NoticeComponent(appService, activatedRoute) {
        var _this = this;
        this.appService = appService;
        this.activatedRoute = activatedRoute;
        this.notice = new notice_dto_1.Notice('', '', '', '');
        this.activatedRoute.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getNotice();
    }
    NoticeComponent.prototype.getNotice = function () {
        var _this = this;
        var notices = this.appService.xSearch("noticeService/notice", this.id);
        notices.subscribe(function (data) {
            var response = data.json();
            _this.notice = response.notice;
        }, function (err) {
            console.log(err.json());
        });
    };
    NoticeComponent = __decorate([
        core_1.Component({
            selector: 'app-notice',
            templateUrl: './app/home/notice/notice.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, router_1.ActivatedRoute])
    ], NoticeComponent);
    return NoticeComponent;
}());
exports.NoticeComponent = NoticeComponent;
;
//# sourceMappingURL=notice.component.js.map