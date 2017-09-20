import { AppMessage } from './../../../app.message';
import { AppService } from './../../../app.service';
import { Simulation } from './../../dto/Simulation.dto';
import { DocumentService } from './../service/document.service';
import { EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'doc-simulation-mobile',
    templateUrl: './app/simulation/document/mobile/document-mobile.component.html',
    styleUrls: ['app/simulation/document/document.component.css'],
    providers: [DocumentService]
})
export class DocumentMobileComponent implements OnInit {
    @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
    simulation: Simulation;



    constructor(private documentService: DocumentService, private appService: AppService, private appMessage: AppMessage) {
    }
    
	ngOnInit() {
        this.documentService.init();
	}

    getSimulation(): Simulation {
        return this.documentService.simulation;
    }

    getListDocuments(): Object[] {
        return this.documentService.listDocuments;
    }

    downloadDoc(doc) {
        let document;
        if (doc.idDoc == 1) {
            document = this.appService.xFileDownload("documentationService", "printDocsFromSantander/" + this.simulation.id + "/" + 1 + "/", "CET", "pdf");
        } else if (doc.idDoc == 2) {
            document = this.appService.xFileDownload("documentationService", "printDocsFromSantander/" + this.simulation.id + "/" + 2 + "/", "CCB", "pdf");
        } else if (doc.idDoc == 3) {
            document = this.appService.xFileDownload("documentationService", "printDocsFromSantander/" + this.simulation.id + "/" + 5 + "/", "APROVACAO", "pdf");
        } else if (doc.idDoc == 4) {
            document = this.appService.xFileDownload("documentationService", "printFileFromS3/" + doc.link + "/", "CCB_CLAUSULAS", "pdf");
        } else if (doc.idDoc == 5) {
            document = this.appService.xFileDownload("documentationService", "printSPF/" + this.simulation.id + "/", "SPF", "pdf");
        } else if (doc.idDoc == 6) {
            document = this.appService.xFileDownload("documentationService", "printGAP/" + this.simulation.id + "/", "GAP", "pdf");
        } else if (doc.idDoc == 7) {
            document = this.appService.xFileDownload("documentationService", "printFileFromS3/" + doc.link + "/", "CTRL", "pdf");
        } else if (doc.idDoc == 8) {
            document = this.appService.xFileDownload("documentationService", "printFileFromS3/" + doc.link + "/", "CC", "pdf");
        } else if (doc.idDoc == 9) {
            document = this.appService.xFileDownload("documentationService", "printFileFromS3/" + doc.link + "/", "VISTORIA", "pdf");
        }

        document.subscribe(
            (data) => {
                this.appMessage.showSuccess("msg-doc-generated");
            },
            err => {
                console.log(err.json());
            }
        );

    }

    sendEmail(doc) {
        let email;
        if (doc.idDoc == 1) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + 1 + "/" + null + "/" + 1 + "/");
        } else if (doc.idDoc == 2) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + 2 + "/" + null + "/" + 2 + "/");
        } else if (doc.idDoc == 3) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + 5 + "/" + null + "/" + 3 + "/");
        } else if (doc.idDoc == 4) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + doc.link + "/" + 4 + "/");
        } else if (doc.idDoc == 5) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + null + "/" + 5 + "/");
        } else if (doc.idDoc == 6) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + null + "/" + 6 + "/");
        } else if (doc.idDoc == 7) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + doc.link + "/" + 7 + "/");
        } else if (doc.idDoc == 8) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + doc.link + "/" + 8 + "/");
        } else if (doc.idDoc == 9) {
            email = this.appService.xSearch("documentationService", "sendEmail/" + this.simulation.id + "/" + null + "/" + doc.link + "/" + 9 + "/");
        }

        email.subscribe(
            (data) => {
                this.appMessage.showSuccess("msg-send-mail-success");
            },
            err => {
                console.log(err.json());
            }
        );
    }

    voltar() {
        this.changeStep.emit(false);
    }
}