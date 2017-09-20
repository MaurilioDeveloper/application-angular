import { AppMessage } from './../app.message';
import { FileBMV } from './FileBMV.dto';
import { ElementRef } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { AppService } from './../app.service';
import {Component} from '@angular/core';


@Component({
    selector: 'model',
    templateUrl: './app/model/model.component.html'

})
export class ModelComponent implements OnInit {

    private btnHideBrand: boolean = false;
    private btnHideModel: boolean = false;
    private btnHideVersion: boolean = false;
    private varBtnBrand: string = 'keyboard_arrow_down';
    private varBtnModel: string = 'keyboard_arrow_down';
    private varBtnVersion: string = 'keyboard_arrow_down';

     @ViewChild('fileInput') inputEl: ElementRef;

    listVehicleBrand = [];
    listVehicleModel = [];
    listVehicleVersion = [];

    fileVehicleBrand:FileBMV = new FileBMV();
    fileVehicleModel:FileBMV = new FileBMV();
    fileVehicleVersion:FileBMV = new FileBMV();

    brandFilesModified = new FileBMV();
    modelFilesModified = new FileBMV();
    versionFilesModified = new FileBMV();

    filePreviewBrand;
    filePreviewModel;
    filePreviewVersion;

    @ViewChild('fileBrandChange')
    fileBrandChange: any;
    @ViewChild('fileModelChange')
    fileModelChange: any;
    @ViewChild('fileVersionChange')
    fileVersionChange: any;

    vehicleBrandId : any;
    vehicleModelId : any;
    vehicleVersionId : any;

    constructor(private appService: AppService,private appMessage: AppMessage){
    };


    ngOnInit() {
        this.loadVehicleBrand();
        this.clicked('1');
    }

    loadVehicleBrand(){
        let observable = this.appService.xSearch('vehiculeFile','questVehicleBrand' );
        observable.subscribe(
            (data) => {
               let response = data.json();
               this.listVehicleBrand = response.listVehicleBrand;
            },
            err => {
               console.log(err.json());
            }
       );
    }

    loadFileVehicleBrand(){
        let observable = this.appService.xSearch('vehiculeFile/questFileVehicleByBrand',this.vehicleBrandId.id );
        observable.subscribe(
            (data) => {
               let response = data.json();
               this.fileVehicleBrand = response.fileDto;
               this.filePreviewBrand = null;
               if(this.fileBrandChange){
                    this.fileBrandChange.nativeElement.value = "";
               }
               if(!this.fileVehicleBrand.fileLink){
                   this.appMessage.showWarning(this.appMessage.returnMsg("msg-images-registered-model")+ this.vehicleBrandId.description); 
               }
            },
            err => {
               console.log(err.json());
            }
       );
    }

    fileBrandChangeEvent(fileInput: any, fileId, objectoId){
        let fileModified : FileBMV = new FileBMV();
        fileModified.fileId = fileId;
        fileModified.fileObjectId = objectoId;
        if(fileInput.target.files[0] && fileInput.target.files[0].size < 2097152){
            let ext = fileInput.target.files[0].type.substring(0, 5);
            if("image" == ext){
                fileModified.image =  fileInput.target.files[0];
                var reader = new FileReader();
                reader.onload = this.handleReaderLoadedBrand.bind(this);
                reader.readAsDataURL(fileInput.target.files[0]);
            }else{
                this.appMessage.showError("msg-error-extension");
            }
        }else{
            this.appMessage.showWarning("msg-image-size-modelo");
        }

        this.brandFilesModified = fileModified;
    }

    handleReaderLoadedBrand(e) {
        var reader = e.target;
        this.filePreviewBrand = reader.result;
    }

    saveFileBrand(){
        if(this.brandFilesModified.image && this.filePreviewBrand){
            let observable = this.appService.xUpload('vehiculeFile/saveFileVehicleBrand', this.brandFilesModified ,this.brandFilesModified.image);
            observable.subscribe(
                (data) => {
                    let response = data.json();
                    this.fileVehicleBrand = response.fileDto;
                    this.appMessage.showSuccess("msg-sucesso-save-image");
                }, 
                err => {
                    console.log(err.json());
                }
            );
        }
        
    }

    deleteFileBrand(fileId, objectoId){
        this.brandFilesModified.fileId = fileId;
        this.brandFilesModified.fileObjectId = objectoId;
        let observable = this.appService.xDeleteWithData('vehiculeFile/deleteFileVehicleBrand', this.brandFilesModified);
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.fileVehicleBrand = response.fileDto;
                this.filePreviewBrand = null;
                this.appMessage.showSuccess("msg-sucesso-remove-image");
            }, 
            err => {
                console.log(err.json());
            }
        );
    }

    loadVehicleModel(){
        if(this.vehicleBrandId != null && this.vehicleBrandId != undefined){
            let observable = this.appService.xSearch('vehiculeFile/questVehicleModelByBrand', this.vehicleBrandId.id );
            observable.subscribe(
                (data) => {
                let response = data.json();
                this.listVehicleModel = response.listVehicleModel;
                this.cleanVersionModel();
                },
                err => {
                console.log(err.json());
                }
            );
        }else{
            this.listVehicleModel = [];
        }
    }

    loadFileVehicleModel(){
        let observable = this.appService.xSearch('vehiculeFile/questFileVehicleByModel',this.vehicleModelId.id );
        observable.subscribe(
            (data) => {
               let response = data.json();
               this.fileVehicleModel = response.fileDto;
               this.filePreviewModel = null;
               if(this.fileModelChange){
                    this.fileModelChange.nativeElement.value = "";
               }
               if(!this.fileVehicleModel.fileLink){
                   this.appMessage.showWarning(this.appMessage.returnMsg("msg-images-registered-model")+ this.vehicleModelId.description); 
               }
            },
            err => {
               console.log(err.json());
            }
       );
    }

    fileModelChangeEvent(fileInput: any, fileId, objectoId){
        let fileModified : FileBMV = new FileBMV();
        fileModified.fileId = fileId;
        fileModified.fileObjectId = objectoId;
        if(fileInput.target.files[0] && fileInput.target.files[0].size < 2097152){
            let ext = fileInput.target.files[0].type.substring(0, 5);
            if("image" == ext){
                fileModified.image =  fileInput.target.files[0];
                var reader = new FileReader();
                reader.onload = this.handleReaderLoadedModel.bind(this);
                reader.readAsDataURL(fileInput.target.files[0]);
            }else{
                this.appMessage.showError("msg-error-extension");
            }
        }else{
            this.appMessage.showWarning("msg-image-size-modelo");
        }
        this.modelFilesModified = fileModified;
    }

    handleReaderLoadedModel(e) {
        var reader = e.target;
        this.filePreviewModel = reader.result;
    }

    saveFileModel(){
        if(this.modelFilesModified.image && this.filePreviewModel){
            let observable = this.appService.xUpload('vehiculeFile/saveFileVehicleModel', this.modelFilesModified ,this.modelFilesModified.image);
            observable.subscribe(
                (data) => {
                    let response = data.json();
                    this.fileVehicleModel = response.fileDto;
                    this.appMessage.showSuccess("msg-sucesso-save-image");
                }, 
                err => {
                    console.log(err.json());
                }
            );
        }
    }

    deleteFileModel(fileId, objectoId){
        this.modelFilesModified.fileId = fileId;
        this.modelFilesModified.fileObjectId = objectoId;
        let observable = this.appService.xDeleteWithData('vehiculeFile/deleteFileVehicleModel', this.modelFilesModified);
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.fileVehicleModel = response.fileDto;
                this.filePreviewModel = null;
                this.appMessage.showSuccess("msg-sucesso-remove-image");
            }, 
            err => {
                console.log(err.json());
            }
        );
    }

    loadVehicleVersion(){
        if(this.vehicleModelId != null && this.vehicleModelId != undefined){
            let observable = this.appService.xSearch('vehiculeFile/questVehicleVersionByModel', this.vehicleModelId.id );
            observable.subscribe(
                (data) => {
                let response = data.json();
                this.listVehicleVersion = response.listVehicleVersion;
                this.cleanVersion();
                },
                err => {
                console.log(err.json());
                }
            );
        }else{
             this.listVehicleVersion = [];
        }
    }
    

    loadFileVehicleVersion(){
        let observable = this.appService.xSearch('vehiculeFile/questFileVehicleByVersion',this.vehicleVersionId.versionId );
        observable.subscribe(
            (data) => {
               let response = data.json();
               this.fileVehicleVersion = response.fileDto;
               this.filePreviewVersion = null;
               if(this.fileVersionChange){
                    this.fileVersionChange.nativeElement.value = "";
               }
               if(!this.fileVehicleVersion.fileLink){
                   this.appMessage.showWarning(this.appMessage.returnMsg("msg-images-registered-version")+ this.vehicleVersionId.description); 
               }
            },
            err => {
               console.log(err.json());
            }
       );
    }

    fileVersionChangeEvent(fileInput: any, fileId, objectoId){
        let fileModified : FileBMV = new FileBMV();
        fileModified.fileId = fileId;
        fileModified.fileObjectId = objectoId;
        if(fileInput.target.files[0] && fileInput.target.files[0].size < 2097152){
            let ext = fileInput.target.files[0].type.substring(0, 5);
            if("image" == ext){
                fileModified.image =  fileInput.target.files[0];
                var reader = new FileReader();
                reader.onload = this.handleReaderLoadedVersion.bind(this);
                reader.readAsDataURL(fileInput.target.files[0]);
            }else{
                this.appMessage.showError("msg-error-extension");
            }
        }else{
            this.appMessage.showWarning("msg-image-size-modelo");
        }
        this.versionFilesModified = fileModified;
    }

    handleReaderLoadedVersion(e) {
        var reader = e.target;
        this.filePreviewVersion = reader.result;
    }

    saveFileVersion(){
        if(this.versionFilesModified.image && this.filePreviewVersion){
            let observable = this.appService.xUpload('vehiculeFile/saveFileVehicleVersion', this.versionFilesModified ,this.versionFilesModified.image);
            observable.subscribe(
                (data) => {
                    let response = data.json();
                    this.fileVehicleVersion = response.fileDto;
                    this.appMessage.showSuccess("msg-sucesso-save-image");
                }, 
                err => {
                    console.log(err.json());
                }
            );
        }
    }

    deleteFileVersion(fileId, objectoId){
        this.versionFilesModified.fileId = fileId;
        this.versionFilesModified.fileObjectId = objectoId;
        let observable = this.appService.xDeleteWithData('vehiculeFile/deleteFileVehicleVersion', this.versionFilesModified);
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.fileVehicleVersion = response.fileDto;
                this.filePreviewVersion = null;
                this.appMessage.showSuccess("msg-sucesso-remove-image");
            }, 
            err => {
                console.log(err.json());
            }
        );
    }

    private cleanVersionModel(){
        this.listVehicleVersion = [];
        this.fileVehicleModel = new FileBMV();
        this.fileVehicleVersion = new FileBMV();
        this.vehicleModelId = null;
        this.vehicleVersionId = null;
    }

    private cleanVersion(){
        this.fileVehicleVersion = new FileBMV();
        this.vehicleVersionId = null;
    }


    clicked(event){
       switch (event) {
           case '1':
                if(this.btnHideBrand == true){
                    this.btnHideBrand = false;
                    this.varBtnBrand = 'keyboard_arrow_down';
                }else{
                    this.btnHideBrand = true;
                    this.varBtnBrand = 'keyboard_arrow_up';
                    this.varBtnModel = 'keyboard_arrow_down';
                    this.varBtnVersion = 'keyboard_arrow_down';
                }
                this.btnHideModel = false;
                this.btnHideVersion = false; 
            break;
            case '2':
                if(this.btnHideModel == true){
                    this.btnHideModel = false;
                    this.varBtnModel = 'keyboard_arrow_down';
                }else{
                    this.btnHideModel = true;
                    this.varBtnModel = 'keyboard_arrow_up';
                    this.varBtnBrand = 'keyboard_arrow_down';
                    this.varBtnVersion = 'keyboard_arrow_down';
                }
                this.btnHideBrand = false;
                this.btnHideVersion = false; 
            break;
            case '3':
                if(this.btnHideVersion == true){
                    this.btnHideVersion = false;
                    this.varBtnVersion = 'keyboard_arrow_down';
                }else{
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
    }
};