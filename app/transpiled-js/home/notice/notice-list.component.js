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
var app_component_1 = require("./../../app.component");
var notice_dto_1 = require("./dto/notice.dto");
var router_1 = require("@angular/router");
var app_service_1 = require("./../../app.service");
var core_1 = require("@angular/core");
var NoticeListComponent = /** @class */ (function () {
    function NoticeListComponent(appService, router, app) {
        this.appService = appService;
        this.router = router;
        this.app = app;
    }
    ;
    NoticeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        switch (this.app.theme) {
            case 'nissan':
                this.idFinancialBrand = 2;
                break;
            case 'renault':
                this.idFinancialBrand = 1;
                break;
            case 'rci':
                this.idFinancialBrand = 5;
            default:
                break;
        }
        var notices = this.appService.xSearch("noticeService/noticelist", this.idFinancialBrand);
        notices.subscribe(function (data) {
            var response = data.json();
            _this.notices = _this.getNotices(response.listNotices);
        }, function (err) {
            console.log(err.json());
        });
    };
    NoticeListComponent.prototype.getNotices = function (listNotices) {
        var listnotice = new Array();
        for (var i = 0; i < listNotices.length; i++) {
            var result = listNotices[i];
            var notice = new notice_dto_1.Notice(result['id'], result['title'], result['date'], '');
            listnotice.push(notice);
        }
        return listnotice;
    };
    NoticeListComponent.prototype.onSelect = function () {
        this.router.navigateByUrl('/notice');
    };
    NoticeListComponent = __decorate([
        core_1.Component({
            selector: 'app-notice-list',
            template: "\n        <ul *ngIf='notices'>\n          <li *ngFor=\"let nots of notices\" class=\"newsli\" [routerLink]=\"['/notice', nots.id]\"> \n          <div class=\"news\"> <div class=\"newscircle\">&nbsp;</div> <span class=\"spannews\">{{nots.dtInsert | datex }} - {{nots.title}}</span></div>\n          </li>      \n        </ul>\n    "
        }),
        __metadata("design:paramtypes", [app_service_1.AppService,
            router_1.Router,
            app_component_1.AppComponent])
    ], NoticeListComponent);
    return NoticeListComponent;
}());
exports.NoticeListComponent = NoticeListComponent;
;
//# sourceMappingURL=notice-list.component.js.map