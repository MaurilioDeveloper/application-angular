import { ViewChild } from '@angular/core';
// import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { TranslateService } from './../../translate/translate.service';
import { AppComponent } from './../../app.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AppService } from './../../app.service';

import { AppMessage } from './../../app.message';

import { WindowRefService } from './utils_news/util_news.service';

@Component({
    selector: 'app-news-admin',
    templateUrl: './app/admin/news/news_admin.component.html',
    // styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class NewsAdminComponent implements OnInit {

    /** Edit variable **/
    edit: boolean = false;

    /** List of financial brands **/
    listFinancialBrand: Object[] = [];

    /** List of notices **/
    listNotices: Object[] = [];

    /** List of ids financial brands **/
    listVarsFinancialBrand: String[] = [];

    /** User variable **/
    user: any;

    /** id notice variable **/
    id: String;

    /** Date variable **/
    currentDate: Date;

    /** Publish variable **/
    publish: boolean;

    /** News headline **/
    title: String;

    /** News subject **/
    notice: String;

    /** Notice JSON **/
    noticeJson = {
        "id": null,
        "user": null,
        "published": null,
        "includeDate": null,
        "notice": null,
        "title": null,
        "listFinancialBrand": []
    }

    /** List mandatory filds **/
    listMandatoryFilds: String[] = [];

    private _window: Window;

    @ViewChild('table') table: any;

    constructor(private appService: AppService,
        private appMessage: AppMessage,
        windowRef: WindowRefService) {
        this._window = windowRef.nativeWindow;
    }
    @Input() elementId: String;
    @Output() onEditorKeyup = new EventEmitter<any>();
    // @Input() new: String;

    ngOnInit() {
        this.loadFinancialBrand();
        this.loadNotices();
        this.loadUserLogged();
        this.currentDate = new Date();
        this.publish = false;
        this.title = '';
        this.notice = '';
    }

    /** Method for load user logged **/
    loadUserLogged() {
        this.user = this.appService.getSessionUser();
    }

    /** Method for consulting financial brands **/
    loadFinancialBrand() {
        let result = this.appService.xSearch('financialBrandService', 'financialBrand')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listFinancialBrand = response.financialBrands;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    /** Method for consulting notices **/
    loadNotices() {
        let notices = this.appService.xSearch("noticeService", "listAllNotice");
        notices.subscribe(
            (data) => {
                let response = data.json();
                this.listNotices = response.listNotices;
                this.cleanPageTable();
            },
            err => {
                console.log(err.json());
            }
        );
    }

    /** Method for add and remove financial brands **/
    addFinancialBrand(e, idFinancialBrand: String) {
        if (e.checked) {
            this.listVarsFinancialBrand.push(idFinancialBrand);
        } else {
            let idElement: String = idFinancialBrand;
            var index = this.listVarsFinancialBrand.indexOf(idElement);
            this.listVarsFinancialBrand.splice(index, 1);
        }
    }

    /** Method for add and remove financial brands without event **/
    addFinancialBrandNoEvent(financialBrand: any) {
        if (financialBrand.checked) {
            this.listVarsFinancialBrand.push(financialBrand.id);
        } 
    }

    /** Method for build request insert **/
    createRequestInsert() {
        this.noticeJson.user = this.user;
        this.noticeJson.title = this.title;
        this.noticeJson.notice = this.notice;
        this.noticeJson.includeDate = this.currentDate;
        this.noticeJson.published = this.publish;
        this.noticeJson.listFinancialBrand = this.listVarsFinancialBrand;
    }

    /** Method for build request update **/
    createRequestUpdate() {
        this.noticeJson.id = this.id;
        this.noticeJson.title = this.title;
        this.noticeJson.notice = this.notice;
        this.noticeJson.includeDate = this.currentDate;//updateDate
        this.noticeJson.published = this.publish;
        this.noticeJson.listFinancialBrand = this.listVarsFinancialBrand;
    }

    /** Method for save notice **/
    saveNotice() {

        if (this.validMandatoryFilds()) {
            if (this.edit) {
                this.saveNoticeEdit();
            } else {
                this.createRequestInsert();
                let observable = this.appService.xPost('noticeService/insertOrUpdateNotice', this.noticeJson);
                observable.subscribe(
                    (data) => {
                        this.appMessage.showSuccess("Notícia salva com sucesso");
                        this.cleanPage();
                    },
                    err => {
                        console.log(err.json());
                    }
                );
            }
        } else {
            this.appMessage.showError("Campo(s) obrigatório(s) não preenchido(s):" + this.listMandatoryFilds);
            this.listMandatoryFilds = [];
        }
    }

    /** Method for valid mandatory filds **/
    validMandatoryFilds() {
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
        } else {
            return true;
        }
    }

    /** Method for edit notice **/
    editNotice(notice: any) {
        this._window.scrollTo(0, 0);
        this.edit = true;
        this.id = notice.id;
        this.title = notice.title;
        this.notice = notice.notice;
        this.publish = notice.published;

        let notices = this.appService.xSearch("financialBrandService/findFinBrandNotice", this.id);
        notices.subscribe(
            (data) => {
                let response = data.json();
                this.listFinancialBrand = response.financialBrands;
                for (let x = 0; x < this.listFinancialBrand.length; x++) {
                    this.addFinancialBrandNoEvent(this.listFinancialBrand[x]);
                }
            },
            err => {
                console.log(err.json());
            }
        );

    }

    /** Method for save notice edit **/
    saveNoticeEdit() {
        this.createRequestUpdate();
        let observable = this.appService.xPost('noticeService/insertOrUpdateNotice', this.noticeJson);
        observable.subscribe(
            (data) => {
                this.appMessage.showSuccess("Notícia salva com sucesso");
                this.cleanPage();
            },
            err => {
                console.log(err.json());
            }
        );
    }

    /** Method for delete notice **/
    deleteNotice(notice: any) {
        let observable = this.appService.xPost('noticeService/deleteNotice', notice);
        observable.subscribe(
            (data) => {
                this.appMessage.showSuccess("Notícia excluída com sucesso");
                this.cleanPage();
            },
            err => {
                console.log(err.json());
            }
        );
    }

    cleanPage() {
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
        }
        this.loadFinancialBrand();
        this.loadNotices();
        this.loadUserLogged();
    }

    private cleanPageTable(){
        if(this.table){
            this.table.offset = 0;
        }
    }

}