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
var app_message_1 = require("./../../../app.message");
var app_service_1 = require("./../../../app.service");
var document_service_1 = require("./../service/document.service");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var DocumentMobileComponent = /** @class */ (function () {
    function DocumentMobileComponent(documentService, appService, appMessage) {
        this.documentService = documentService;
        this.appService = appService;
        this.appMessage = appMessage;
        this.changeStep = new core_1.EventEmitter();
    }
    DocumentMobileComponent.prototype.ngOnInit = function () {
        this.documentService.init();
    };
    DocumentMobileComponent.prototype.getSimulation = function () {
        return this.documentService.simulation;
    };
    DocumentMobileComponent.prototype.getListDocuments = function () {
        return this.documentService.listDocuments;
    };
    DocumentMobileComponent.prototype.downloadDoc = function (doc) {
        var _this = this;
        var document;
        if (doc.idDoc == 1) {
            document = this.appService.xFileDownload("documentationService", "printDocsFromSantander/" + this.simulation.id + "/" + 1 + "/", "CET", "pdf");
        }
        else if (doc.idDoc == 2) {
            document = this.appService.xFileDownload("documentationService", "printDocsFromSantander/" + this.simulation.id + "/" + 2 + "/", "CCB", "pdf");
        }
        else if (doc.idDoc == 3) {
            document = this.appService.xFileDownload("documentationService", "printDocsFromSantander/" + this.simulation.id + "/" + 5 + "/", "APROVACAO", "pdf");
        }
        else if (doc.idDoc == 4) {
            document = this.appService.xFileDownload("documentationService", "printFileFromS3/" + doc.link + "/", "CCB_CLAUSULAS", "pdf");
        }
        else if (doc.idDoc == 5) {
            document = this.appService.xFileDownload("documentationService", "printSPF/" + this.simulation.id + "/", "SPF", "pdf");
        }
        else if (doc.idDoc == 6) {
            document = this.appService.xFileDownload("documentationService", "printGAP/" + this.simulation.id + "/", "GAP", "pdf");
        }
        else if (doc.idDoc == 7) {
            document = this.appService.xFileDownload("documentationService", "printFileFromS3/" + doc.link + "/", "CTRL", "pdf");
        }
        else if (doc.idDoc == 8) {
            document = this.appService.xFileDownload("documentationService", "printFileFromS3/" + doc.link + "/", "CC", "pdf");
        }
        else if (doc.idDoc == 9) {
            document = this.appService.xFileDownload("documentationService", "printFileFromS3/" + doc.link + "/", "VISTORIA", "pdf");
        }
        document.subscribe(function (data) {
            _this.appMessage.showSuccess("msg-doc-generated");
        }, function (err) {
            console.log(err.json());
        });
    };
    DocumentMobileComponent.prototype.sendEmail = function (doc) {
        var _this = this;
        var email;
        if (doc.idDoc == 1) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + 1 + "/" + null + "/" + 1 + "/");
        }
        else if (doc.idDoc == 2) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + 2 + "/" + null + "/" + 2 + "/");
        }
        else if (doc.idDoc == 3) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + 5 + "/" + null + "/" + 3 + "/");
        }
        else if (doc.idDoc == 4) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + doc.link + "/" + 4 + "/");
        }
        else if (doc.idDoc == 5) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + null + "/" + 5 + "/");
        }
        else if (doc.idDoc == 6) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + null + "/" + 6 + "/");
        }
        else if (doc.idDoc == 7) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + doc.link + "/" + 7 + "/");
        }
        else if (doc.idDoc == 8) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + doc.link + "/" + 8 + "/");
        }
        else if (doc.idDoc == 9) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + doc.link + "/" + 9 + "/");
        }
        email.subscribe(function (data) {
            _this.appMessage.showSuccess("msg-send-mail-success");
        }, function (err) {
            console.log(err.json());
        });
    };
    DocumentMobileComponent.prototype.voltar = function () {
        this.changeStep.emit(false);
    };
    __decorate([
        core_2.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DocumentMobileComponent.prototype, "changeStep", void 0);
    DocumentMobileComponent = __decorate([
        core_3.Component({
            selector: 'doc-simulation-mobile',
            templateUrl: './app/simulation/document/mobile/document-mobile.component.html',
            styleUrls: ['app/simulation/document/document.component.css'],
            providers: [document_service_1.DocumentService]
        }),
        __metadata("design:paramtypes", [document_service_1.DocumentService, app_service_1.AppService, app_message_1.AppMessage])
    ], DocumentMobileComponent);
    return DocumentMobileComponent;
}());
exports.DocumentMobileComponent = DocumentMobileComponent;
//# sourceMappingURL=document-mobile.component.js.map