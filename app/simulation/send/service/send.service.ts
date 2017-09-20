import { Simulation } from './../../dto/Simulation.dto';
import { SimulationService } from './../../simulation.service';
import { AppService } from './../../../app.service';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../step.enum';


@Injectable()
export class SendService {

    simulation: Simulation;

    list: Array<Object> = new Array<Object>();

    private canSend: boolean;

    constructor(private appService: AppService, private simulationService: SimulationService) {
    }

    init(){
         this.simulationService.load.subscribe((simulation: Simulation) => {
             this.simulation = simulation;
            if (this.simulation && this.simulation.step == StepEnum.STEP_SEND) {
                this.onload(simulation);
            }
        });    
    }

    onload(simulation : Simulation) {
        this.getEvents();

        let canSend = true;
        if (this.simulation.id && this.simulation.statsDescription) {
            canSend = false;
        }
    }

    private getEvents() {
        if (this.simulation.id) {
            let send = new Object;
            send["dossierId"] = this.simulation.id
            let specialget = this.appService.xSearchWithData('santanderService/getStatusList', send);
            specialget.subscribe(
                (data) => {
                    let response = data.json();
                    this.list.push(...response.events)
                }
            );
        }
    }

}