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
var app_message_1 = require("./../app.message");
var file_dto_1 = require("./file.dto");
var core_1 = require("@angular/core");
var app_service_1 = require("./../app.service");
var PromotionalImagesComponent = /** @class */ (function () {
    function PromotionalImagesComponent(appService, appMessage) {
        this.appService = appService;
        this.appMessage = appMessage;
        /** List of financial brands **/
        this.listFinancialBrand = [];
        this.fileModified = new file_dto_1.File();
        this.showCard = false;
        this.deleteControler = false;
    }
    ;
    PromotionalImagesComponent.prototype.ngOnInit = function () {
        this.loadFinancialBrand();
    };
    /** Method for consulting financial brands **/
    PromotionalImagesComponent.prototype.loadFinancialBrand = function () {
        var _this = this;
        var result = this.appService.xSearch('financialBrandService', 'financialBrand');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listFinancialBrand = response.financialBrands;
        }, function (err) {
            console.log(err.json());
        });
    };
    PromotionalImagesComponent.prototype.searchImage = function () {
        var _this = this;
        if (this.financialBrandSelected) {
            var result = this.appService.xSearch('financialBrandService/findImageByfinancialBrand', this.financialBrandSelected);
            result.subscribe(function (data) {
                var response = data.json();
                _this.file = response.file;
                _this.filePreview = null;
                _this.showCard = true;
                if (_this.fileChange) {
                    _this.fileChange.nativeElement.value = "";
                }
            }, function (err) {
                console.log(err.json());
            });
        }
        else {
            this.appMessage.showInfo("msg-info-select-financi-brand");
        }
    };
    PromotionalImagesComponent.prototype.fileFinancialBrandChangeEvent = function (fileInput, fileId, financialBrandId) {
        this.fileModified.fileId = fileId;
        this.fileModified.financialBrandId = financialBrandId;
        if (fileInput.target.files[0] && fileInput.target.files[0].size < 8388608) {
            var ext = fileInput.target.files[0].type.substring(0, 5);
            if ("image" == ext) {
                this.fileModified.image = fileInput.target.files[0];
                var reader = new FileReader();
                reader.onload = this.handleReaderLoaded.bind(this);
                reader.readAsDataURL(fileInput.target.files[0]);
            }
            else {
                this.appMessage.showError("msg-error-extension");
            }
        }
        else {
            this.appMessage.showError("msg-error-max-size");
        }
    };
    PromotionalImagesComponent.prototype.handleReaderLoaded = function (e) {
        var reader = e.target;
        this.filePreview = reader.result;
    };
    PromotionalImagesComponent.prototype.saveFileFinancialBrand = function () {
        var _this = this;
        if (this.fileModified.image && !this.deleteControler && this.filePreview) {
            var observable = this.appService.xUpload('financialBrandService/saveFileFinancialBrand', this.fileModified, this.fileModified.image);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.file = response.file;
                _this.appMessage.showSuccess("msg-sucesso-save-image");
            }, function (err) {
                console.log(err.json());
            });
        }
        else if (this.deleteControler) {
            this.deleteFileFinancialBrand();
        }
    };
    PromotionalImagesComponent.prototype.delete = function (fileId, financialBrandId) {
        this.fileModified.fileId = fileId;
        this.fileModified.financialBrandId = financialBrandId;
        this.deleteControler = true;
        this.filePreview = null;
        this.file['fileLink'] = null;
    };
    PromotionalImagesComponent.prototype.deleteFileFinancialBrand = function () {
        var _this = this;
        var observable = this.appService.xDeleteWithData('financialBrandService/deleteFileFinancialBrand', this.fileModified);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.file = response.file;
            _this.deleteControler = false;
            _this.filePreview = null;
            _this.appMessage.showSuccess("msg-sucesso-remove-image");
        }, function (err) {
            console.log(err.json());
        });
    };
    __decorate([
        core_1.ViewChild('fileChange'),
        __metadata("design:type", Object)
    ], PromotionalImagesComponent.prototype, "fileChange", void 0);
    PromotionalImagesComponent = __decorate([
        core_1.Component({
            selector: 'promo-images',
            templateUrl: './app/promotional_images/promotional_images.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage])
    ], PromotionalImagesComponent);
    return PromotionalImagesComponent;
}());
exports.PromotionalImagesComponent = PromotionalImagesComponent;
;
//# sourceMappingURL=promotional_images.component.js.map