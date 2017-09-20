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
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var app_service_1 = require("./../../app.service");
var app_message_1 = require("./../../app.message");
var util_news_service_1 = require("./utils_news/util_news.service");
var NewsAdminComponent = /** @class */ (function () {
    function NewsAdminComponent(appService, appMessage, windowRef) {
        this.appService = appService;
        this.appMessage = appMessage;
        /** Edit variable **/
        this.edit = false;
        /** List of financial brands **/
        this.listFinancialBrand = [];
        /** List of notices **/
        this.listNotices = [];
        /** List of ids financial brands **/
        this.listVarsFinancialBrand = [];
        /** Notice JSON **/
        this.noticeJson = {
            "id": null,
            "user": null,
            "published": null,
            "includeDate": null,
            "notice": null,
            "title": null,
            "listFinancialBrand": []
        };
        /** List mandatory filds **/
        this.listMandatoryFilds = [];
        this.onEditorKeyup = new core_2.EventEmitter();
        this._window = windowRef.nativeWindow;
    }
    // @Input() new: String;
    NewsAdminComponent.prototype.ngOnInit = function () {
        this.loadFinancialBrand();
        this.loadNotices();
        this.loadUserLogged();
        this.currentDate = new Date();
        this.publish = false;
        this.title = '';
        this.notice = '';
    };
    /** Method for load user logged **/
    NewsAdminComponent.prototype.loadUserLogged = function () {
        this.user = this.appService.getSessionUser();
    };
    /** Method for consulting financial brands **/
    NewsAdminComponent.prototype.loadFinancialBrand = function () {
        var _this = this;
        var result = this.appService.xSearch('financialBrandService', 'financialBrand');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listFinancialBrand = response.financialBrands;
        }, function (err) {
            console.log(err.json());
        });
    };
    /** Method for consulting notices **/
    NewsAdminComponent.prototype.loadNotices = function () {
        var _this = this;
        var notices = this.appService.xSearch("noticeService", "listAllNotice");
        notices.subscribe(function (data) {
            var response = data.json();
            _this.listNotices = response.listNotices;
            _this.cleanPageTable();
        }, function (err) {
            console.log(err.json());
        });
    };
    /** Method for add and remove financial brands **/
    NewsAdminComponent.prototype.addFinancialBrand = function (e, idFinancialBrand) {
        if (e.checked) {
            this.listVarsFinancialBrand.push(idFinancialBrand);
        }
        else {
            var idElement = idFinancialBrand;
            var index = this.listVarsFinancialBrand.indexOf(idElement);
            this.listVarsFinancialBrand.splice(index, 1);
        }
    };
    /** Method for add and remove financial brands without event **/
    NewsAdminComponent.prototype.addFinancialBrandNoEvent = function (financialBrand) {
        if (financialBrand.checked) {
            this.listVarsFinancialBrand.push(financialBrand.id);
        }
    };
    /** Method for build request insert **/
    NewsAdminComponent.prototype.createRequestInsert = function () {
        this.noticeJson.user = this.user;
        this.noticeJson.title = this.title;
        this.noticeJson.notice = this.notice;
        this.noticeJson.includeDate = this.currentDate;
        this.noticeJson.published = this.publish;
        this.noticeJson.listFinancialBrand = this.listVarsFinancialBrand;
    };
    /** Method for build request update **/
    NewsAdminComponent.prototype.createRequestUpdate = function () {
        this.noticeJson.id = this.id;
        this.noticeJson.title = this.title;
        this.noticeJson.notice = this.notice;
        this.noticeJson.includeDate = this.currentDate; //updateDate
        this.noticeJson.published = this.publish;
        this.noticeJson.listFinancialBrand = this.listVarsFinancialBrand;
    };
    /** Method for save notice **/
    NewsAdminComponent.prototype.saveNotice = function () {
        var _this = this;
        if (this.validMandatoryFilds()) {
            if (this.edit) {
                this.saveNoticeEdit();
            }
            else {
                this.createRequestInsert();
                var observable = this.appService.xPost('noticeService/insertOrUpdateNotice', this.noticeJson);
                observable.subscribe(function (data) {
                    _this.appMessage.showSuccess("Notícia salva com sucesso");
                    _this.cleanPage();
                }, function (err) {
                    console.log(err.json());
                });
            }
        }
        else {
            this.appMessage.showError("Campo(s) obrigatório(s) não preenchido(s):" + this.listMandatoryFilds);
            this.listMandatoryFilds = [];
        }
    };
    /** Method for valid mandatory filds **/
    NewsAdminComponent.prototype.validMandatoryFilds = function () {
        if (this.listVarsFinancialBrand.length == 0) {
            this.listMandatoryFilds.push(' Marcas financeiras ');
        }
        if (this.title == "") {
            this.listMandatoryFilds.push(' Título ');
        }
        if (this.notice == "") {
            this.listMandatoryFilds.push(' Notícia ');
        }
        if (this.listMandatoryFilds.length > 0) {
            return false;
        }
        else {
            return true;
        }
    };
    /** Method for edit notice **/
    NewsAdminComponent.prototype.editNotice = function (notice) {
        var _this = this;
        this._window.scrollTo(0, 0);
        this.edit = true;
        this.id = notice.id;
        this.title = notice.title;
        this.notice = notice.notice;
        this.publish = notice.published;
        var notices = this.appService.xSearch("financialBrandService/findFinBrandNotice", this.id);
        notices.subscribe(function (data) {
            var response = data.json();
            _this.listFinancialBrand = response.financialBrands;
            for (var x = 0; x < _this.listFinancialBrand.length; x++) {
                _this.addFinancialBrandNoEvent(_this.listFinancialBrand[x]);
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    /** Method for save notice edit **/
    NewsAdminComponent.prototype.saveNoticeEdit = function () {
        var _this = this;
        this.createRequestUpdate();
        var observable = this.appService.xPost('noticeService/insertOrUpdateNotice', this.noticeJson);
        observable.subscribe(function (data) {
            _this.appMessage.showSuccess("Notícia salva com sucesso");
            _this.cleanPage();
        }, function (err) {
            console.log(err.json());
        });
    };
    /** Method for delete notice **/
    NewsAdminComponent.prototype.deleteNotice = function (notice) {
        var _this = this;
        var observable = this.appService.xPost('noticeService/deleteNotice', notice);
        observable.subscribe(function (data) {
            _this.appMessage.showSuccess("Notícia excluída com sucesso");
            _this.cleanPage();
        }, function (err) {
            console.log(err.json());
        });
    };
    NewsAdminComponent.prototype.cleanPage = function () {
        this._window.scrollTo(0, 0);
        this.edit = false;
        this.listFinancialBrand = [];
        this.listNotices = [];
        this.listVarsFinancialBrand = [];
        this.id = null;
        this.user = null;
        this.currentDate = new Date();
        this.publish = false;
        this.title = "";
        this.notice = "";
        this.noticeJson = {
            "id": null,
            "user": null,
            "published": null,
            "includeDate": null,
            "notice": null,
            "title": null,
            "listFinancialBrand": []
        };
        this.loadFinancialBrand();
        this.loadNotices();
        this.loadUserLogged();
    };
    NewsAdminComponent.prototype.cleanPageTable = function () {
        if (this.table) {
            this.table.offset = 0;
        }
    };
    __decorate([
        core_1.ViewChild('table'),
        __metadata("design:type", Object)
    ], NewsAdminComponent.prototype, "table", void 0);
    __decorate([
        core_2.Input(),
        __metadata("design:type", String)
    ], NewsAdminComponent.prototype, "elementId", void 0);
    __decorate([
        core_2.Output(),
        __metadata("design:type", Object)
    ], NewsAdminComponent.prototype, "onEditorKeyup", void 0);
    NewsAdminComponent = __decorate([
        core_2.Component({
            selector: 'app-news-admin',
            templateUrl: './app/admin/news/news_admin.component.html',
        }),
        __metadata("design:paramtypes", [app_service_1.AppService,
            app_message_1.AppMessage,
            util_news_service_1.WindowRefService])
    ], NewsAdminComponent);
    return NewsAdminComponent;
}());
exports.NewsAdminComponent = NewsAdminComponent;
//# sourceMappingURL=news_admin.component.js.map