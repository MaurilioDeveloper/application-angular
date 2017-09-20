import { Simulation } from './../../dto/Simulation.dto';
import { AppMessage } from './../../../app.message';
import { SimulationService } from './../../simulation.service';
import { AppService } from './../../../app.service';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../step.enum';


@Injectable()
export class DocumentService {

    simulation: Simulation;

    private number_proposal;

    listDocuments: Object[] = [];

    constructor(private appService: AppService, private appMessage: AppMessage, private simulationService: SimulationService) {
    }

    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && this.simulation.step == StepEnum.STEP_DOCUMENT) {
                this.onload();
            }
        });
    }

    onload() {
        this.number_proposal = this.simulation.id;
        this.loadDocuments();
    }

    loadDocuments() {
        let notices = this.appService.xSearch("documentationService/showListDocumentsToDownload", this.simulation.id);
        notices.subscribe(
            (data) => {
                let response = data.json();
                this.listDocuments = response.listDocumentation;
            },
            err => {
                console.log(err.json());
            }
        );
    }

}