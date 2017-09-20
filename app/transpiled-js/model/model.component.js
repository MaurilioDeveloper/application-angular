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
var FileBMV_dto_1 = require("./FileBMV.dto");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var app_service_1 = require("./../app.service");
var core_3 = require("@angular/core");
var ModelComponent = /** @class */ (function () {
    function ModelComponent(appService, appMessage) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.btnHideBrand = false;
        this.btnHideModel = false;
        this.btnHideVersion = false;
        this.varBtnBrand = 'keyboard_arrow_down';
        this.varBtnModel = 'keyboard_arrow_down';
        this.varBtnVersion = 'keyboard_arrow_down';
        this.listVehicleBrand = [];
        this.listVehicleModel = [];
        this.listVehicleVersion = [];
        this.fileVehicleBrand = new FileBMV_dto_1.FileBMV();
        this.fileVehicleModel = new FileBMV_dto_1.FileBMV();
        this.fileVehicleVersion = new FileBMV_dto_1.FileBMV();
        this.brandFilesModified = new FileBMV_dto_1.FileBMV();
        this.modelFilesModified = new FileBMV_dto_1.FileBMV();
        this.versionFilesModified = new FileBMV_dto_1.FileBMV();
    }
    ;
    ModelComponent.prototype.ngOnInit = function () {
        this.loadVehicleBrand();
        this.clicked('1');
    };
    ModelComponent.prototype.loadVehicleBrand = function () {
        var _this = this;
        var observable = this.appService.xSearch('vehiculeFile', 'questVehicleBrand');
        observable.subscribe(function (data) {
            var response = data.json();
            _this.listVehicleBrand = response.listVehicleBrand;
        }, function (err) {
            console.log(err.json());
        });
    };
    ModelComponent.prototype.loadFileVehicleBrand = function () {
        var _this = this;
        var observable = this.appService.xSearch('vehiculeFile/questFileVehicleByBrand', this.vehicleBrandId.id);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.fileVehicleBrand = response.fileDto;
            _this.filePreviewBrand = null;
            if (_this.fileBrandChange) {
                _this.fileBrandChange.nativeElement.value = "";
            }
            if (!_this.fileVehicleBrand.fileLink) {
                _this.appMessage.showWarning(_this.appMessage.returnMsg("msg-images-registered-model") + _this.vehicleBrandId.description);
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    ModelComponent.prototype.fileBrandChangeEvent = function (fileInput, fileId, objectoId) {
        var fileModified = new FileBMV_dto_1.FileBMV();
        fileModified.fileId = fileId;
        fileModified.fileObjectId = objectoId;
        if (fileInput.target.files[0] && fileInput.target.files[0].size < 2097152) {
            var ext = fileInput.target.files[0].type.substring(0, 5);
            if ("image" == ext) {
                fileModified.image = fileInput.target.files[0];
                var reader = new FileReader();
                reader.onload = this.handleReaderLoadedBrand.bind(this);
                reader.readAsDataURL(fileInput.target.files[0]);
            }
            else {
                this.appMessage.showError("msg-error-extension");
            }
        }
        else {
            this.appMessage.showWarning("msg-image-size-modelo");
        }
        this.brandFilesModified = fileModified;
    };
    ModelComponent.prototype.handleReaderLoadedBrand = function (e) {
        var reader = e.target;
        this.filePreviewBrand = reader.result;
    };
    ModelComponent.prototype.saveFileBrand = function () {
        var _this = this;
        if (this.brandFilesModified.image && this.filePreviewBrand) {
            var observable = this.appService.xUpload('vehiculeFile/saveFileVehicleBrand', this.brandFilesModified, this.brandFilesModified.image);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.fileVehicleBrand = response.fileDto;
                _this.appMessage.showSuccess("msg-sucesso-save-image");
            }, function (err) {
                console.log(err.json());
            });
        }
    };
    ModelComponent.prototype.deleteFileBrand = function (fileId, objectoId) {
        var _this = this;
        this.brandFilesModified.fileId = fileId;
        this.brandFilesModified.fileObjectId = objectoId;
        var observable = this.appService.xDeleteWithData('vehiculeFile/deleteFileVehicleBrand', this.brandFilesModified);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.fileVehicleBrand = response.fileDto;
            _this.filePreviewBrand = null;
            _this.appMessage.showSuccess("msg-sucesso-remove-image");
        }, function (err) {
            console.log(err.json());
        });
    };
    ModelComponent.prototype.loadVehicleModel = function () {
        var _this = this;
        if (this.vehicleBrandId != null && this.vehicleBrandId != undefined) {
            var observable = this.appService.xSearch('vehiculeFile/questVehicleModelByBrand', this.vehicleBrandId.id);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.listVehicleModel = response.listVehicleModel;
                _this.cleanVersionModel();
            }, function (err) {
                console.log(err.json());
            });
        }
        else {
            this.listVehicleModel = [];
        }
    };
    ModelComponent.prototype.loadFileVehicleModel = function () {
        var _this = this;
        var observable = this.appService.xSearch('vehiculeFile/questFileVehicleByModel', this.vehicleModelId.id);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.fileVehicleModel = response.fileDto;
            _this.filePreviewModel = null;
            if (_this.fileModelChange) {
                _this.fileModelChange.nativeElement.value = "";
            }
            if (!_this.fileVehicleModel.fileLink) {
                _this.appMessage.showWarning(_this.appMessage.returnMsg("msg-images-registered-model") + _this.vehicleModelId.description);
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    ModelComponent.prototype.fileModelChangeEvent = function (fileInput, fileId, objectoId) {
        var fileModified = new FileBMV_dto_1.FileBMV();
        fileModified.fileId = fileId;
        fileModified.fileObjectId = objectoId;
        if (fileInput.target.files[0] && fileInput.target.files[0].size < 2097152) {
            var ext = fileInput.target.files[0].type.substring(0, 5);
            if ("image" == ext) {
                fileModified.image = fileInput.target.files[0];
                var reader = new FileReader();
                reader.onload = this.handleReaderLoadedModel.bind(this);
                reader.readAsDataURL(fileInput.target.files[0]);
            }
            else {
                this.appMessage.showError("msg-error-extension");
            }
        }
        else {
            this.appMessage.showWarning("msg-image-size-modelo");
        }
        this.modelFilesModified = fileModified;
    };
    ModelComponent.prototype.handleReaderLoadedModel = function (e) {
        var reader = e.target;
        this.filePreviewModel = reader.result;
    };
    ModelComponent.prototype.saveFileModel = function () {
        var _this = this;
        if (this.modelFilesModified.image && this.filePreviewModel) {
            var observable = this.appService.xUpload('vehiculeFile/saveFileVehicleModel', this.modelFilesModified, this.modelFilesModified.image);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.fileVehicleModel = response.fileDto;
                _this.appMessage.showSuccess("msg-sucesso-save-image");
            }, function (err) {
                console.log(err.json());
            });
        }
    };
    ModelComponent.prototype.deleteFileModel = function (fileId, objectoId) {
        var _this = this;
        this.modelFilesModified.fileId = fileId;
        this.modelFilesModified.fileObjectId = objectoId;
        var observable = this.appService.xDeleteWithData('vehiculeFile/deleteFileVehicleModel', this.modelFilesModified);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.fileVehicleModel = response.fileDto;
            _this.filePreviewModel = null;
            _this.appMessage.showSuccess("msg-sucesso-remove-image");
        }, function (err) {
            console.log(err.json());
        });
    };
    ModelComponent.prototype.loadVehicleVersion = function () {
        var _this = this;
        if (this.vehicleModelId != null && this.vehicleModelId != undefined) {
            var observable = this.appService.xSearch('vehiculeFile/questVehicleVersionByModel', this.vehicleModelId.id);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.listVehicleVersion = response.listVehicleVersion;
                _this.cleanVersion();
            }, function (err) {
                console.log(err.json());
            });
        }
        else {
            this.listVehicleVersion = [];
        }
    };
    ModelComponent.prototype.loadFileVehicleVersion = function () {
        var _this = this;
        var observable = this.appService.xSearch('vehiculeFile/questFileVehicleByVersion', this.vehicleVersionId.versionId);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.fileVehicleVersion = response.fileDto;
            _this.filePreviewVersion = null;
            if (_this.fileVersionChange) {
                _this.fileVersionChange.nativeElement.value = "";
            }
            if (!_this.fileVehicleVersion.fileLink) {
                _this.appMessage.showWarning(_this.appMessage.returnMsg("msg-images-registered-version") + _this.vehicleVersionId.description);
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    ModelComponent.prototype.fileVersionChangeEvent = function (fileInput, fileId, objectoId) {
        var fileModified = new FileBMV_dto_1.FileBMV();
        fileModified.fileId = fileId;
        fileModified.fileObjectId = objectoId;
        if (fileInput.target.files[0] && fileInput.target.files[0].size < 2097152) {
            var ext = fileInput.target.files[0].type.substring(0, 5);
            if ("image" == ext) {
                fileModified.image = fileInput.target.files[0];
                var reader = new FileReader();
                reader.onload = this.handleReaderLoadedVersion.bind(this);
                reader.readAsDataURL(fileInput.target.files[0]);
            }
            else {
                this.appMessage.showError("msg-error-extension");
            }
        }
        else {
            this.appMessage.showWarning("msg-image-size-modelo");
        }
        this.versionFilesModified = fileModified;
    };
    ModelComponent.prototype.handleReaderLoadedVersion = function (e) {
        var reader = e.target;
        this.filePreviewVersion = reader.result;
    };
    ModelComponent.prototype.saveFileVersion = function () {
        var _this = this;
        if (this.versionFilesModified.image && this.filePreviewVersion) {
            var observable = this.appService.xUpload('vehiculeFile/saveFileVehicleVersion', this.versionFilesModified, this.versionFilesModified.image);
            observable.subscribe(function (data) {
                var response = data.json();
                _this.fileVehicleVersion = response.fileDto;
                _this.appMessage.showSuccess("msg-sucesso-save-image");
            }, function (err) {
                console.log(err.json());
            });
        }
    };
    ModelComponent.prototype.deleteFileVersion = function (fileId, objectoId) {
        var _this = this;
        this.versionFilesModified.fileId = fileId;
        this.versionFilesModified.fileObjectId = objectoId;
        var observable = this.appService.xDeleteWithData('vehiculeFile/deleteFileVehicleVersion', this.versionFilesModified);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.fileVehicleVersion = response.fileDto;
            _this.filePreviewVersion = null;
            _this.appMessage.showSuccess("msg-sucesso-remove-image");
        }, function (err) {
            console.log(err.json());
        });
    };
    ModelComponent.prototype.cleanVersionModel = function () {
        this.listVehicleVersion = [];
        this.fileVehicleModel = new FileBMV_dto_1.FileBMV();
        this.fileVehicleVersion = new FileBMV_dto_1.FileBMV();
        this.vehicleModelId = null;
        this.vehicleVersionId = null;
    };
    ModelComponent.prototype.cleanVersion = function () {
        this.fileVehicleVersion = new FileBMV_dto_1.FileBMV();
        this.vehicleVersionId = null;
    };
    ModelComponent.prototype.clicked = function (event) {
        switch (event) {
            case '1':
                if (this.btnHideBrand == true) {
                    this.btnHideBrand = false;
                    this.varBtnBrand = 'keyboard_arrow_down';
                }
                else {
                    this.btnHideBrand = true;
                    this.varBtnBrand = 'keyboard_arrow_up';
                    this.varBtnModel = 'keyboard_arrow_down';
                    this.varBtnVersion = 'keyboard_arrow_down';
                }
                this.btnHideModel = false;
                this.btnHideVersion = false;
                break;
            case '2':
                if (this.btnHideModel == true) {
                    this.btnHideModel = false;
                    this.varBtnModel = 'keyboard_arrow_down';
                }
                else {
                    this.btnHideModel = true;
                    this.varBtnModel = 'keyboard_arrow_up';
                    this.varBtnBrand = 'keyboard_arrow_down';
                    this.varBtnVersion = 'keyboard_arrow_down';
                }
                this.btnHideBrand = false;
                this.btnHideVersion = false;
                break;
            case '3':
                if (this.btnHideVersion == true) {
                    this.btnHideVersion = false;
                    this.varBtnVersion = 'keyboard_arrow_down';
                }
                else {
                    this.btnHideVersion = true;
                    this.varBtnVersion = 'keyboard_arrow_up';
                    this.varBtnBrand = 'keyboard_arrow_down';
                    this.varBtnModel = 'keyboard_arrow_down';
                }
                this.btnHideBrand = false;
                this.btnHideModel = false;
                break;
            default:
                break;
        }
    };
    __decorate([
        core_2.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], ModelComponent.prototype, "inputEl", void 0);
    __decorate([
        core_2.ViewChild('fileBrandChange'),
        __metadata("design:type", Object)
    ], ModelComponent.prototype, "fileBrandChange", void 0);
    __decorate([
        core_2.ViewChild('fileModelChange'),
        __metadata("design:type", Object)
    ], ModelComponent.prototype, "fileModelChange", void 0);
    __decorate([
        core_2.ViewChild('fileVersionChange'),
        __metadata("design:type", Object)
    ], ModelComponent.prototype, "fileVersionChange", void 0);
    ModelComponent = __decorate([
        core_3.Component({
            selector: 'model',
            templateUrl: './app/model/model.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage])
    ], ModelComponent);
    return ModelComponent;
}());
exports.ModelComponent = ModelComponent;
;
//# sourceMappingURL=model.component.js.map