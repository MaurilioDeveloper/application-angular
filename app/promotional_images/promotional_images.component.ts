import { AppMessage } from './../app.message';
import { File } from './file.dto';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { AppService } from './../app.service';

@Component({
    selector: 'promo-images',
    templateUrl: './app/promotional_images/promotional_images.component.html'
})
export class PromotionalImagesComponent implements OnInit {

    /** List of financial brands **/
    listFinancialBrand: Object[] = [];
    file:Object;
    filePreview;

    /** variable financial brand selected **/
    financialBrandSelected;
    fileModified:File = new File();

    private showCard: boolean = false;
    deleteControler: boolean = false;

    @ViewChild('fileChange')
    fileChange: any;


    constructor(private appService: AppService,private appMessage: AppMessage) {
    };

    ngOnInit() {
        this.loadFinancialBrand();
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

    searchImage() {
        if(this.financialBrandSelected){
            let result = this.appService.xSearch('financialBrandService/findImageByfinancialBrand', this.financialBrandSelected)
            result.subscribe(
                (data) => {
                    let response = data.json();
                    this.file = response.file;
                    this.filePreview = null;
                    this.showCard = true;
                    if(this.fileChange){
                        this.fileChange.nativeElement.value = "";
                    }
                },
                err => {
                    console.log(err.json());
                }
            );
        }else{
            this.appMessage.showInfo("msg-info-select-financi-brand");
        }
    }

    fileFinancialBrandChangeEvent(fileInput: any, fileId, financialBrandId){
        this.fileModified.fileId = fileId;
        this.fileModified.financialBrandId = financialBrandId;
        if(fileInput.target.files[0] && fileInput.target.files[0].size < 8388608){ 
            let ext = fileInput.target.files[0].type.substring(0, 5);
            if("image" == ext){
                this.fileModified.image =  fileInput.target.files[0];
                var reader = new FileReader();
                reader.onload = this.handleReaderLoaded.bind(this);
                reader.readAsDataURL(fileInput.target.files[0]);
            }else{
                this.appMessage.showError("msg-error-extension");
            }
        }else{
            this.appMessage.showError("msg-error-max-size");
        }
    }

    handleReaderLoaded(e) {
        var reader = e.target;
        this.filePreview = reader.result;
    }

    saveFileFinancialBrand(){
        if(this.fileModified.image && !this.deleteControler && this.filePreview){
            let observable = this.appService.xUpload('financialBrandService/saveFileFinancialBrand', this.fileModified ,this.fileModified.image);
            observable.subscribe(
                (data) => {
                    let response = data.json();
                    this.file = response.file;
                    this.appMessage.showSuccess("msg-sucesso-save-image");
                }, 
                err => {
                    console.log(err.json());
                }
            );
        }else if(this.deleteControler){
            this.deleteFileFinancialBrand();
        }
    }

    delete(fileId , financialBrandId){
        this.fileModified.fileId = fileId;
        this.fileModified.financialBrandId = financialBrandId;
        this.deleteControler = true;
        this.filePreview = null;
        this.file['fileLink'] = null;
    }

    deleteFileFinancialBrand(){
        let observable = this.appService.xDeleteWithData('financialBrandService/deleteFileFinancialBrand', this.fileModified);
        observable.subscribe(
            (data) => {
                let response = data.json();
                this.file = response.file;
                this.deleteControler = false;
                this.filePreview = null;
                this.appMessage.showSuccess("msg-sucesso-remove-image");
            }, 
            err => {
                console.log(err.json());
            }
        );
    }
};