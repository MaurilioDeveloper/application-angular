import { Reference } from './../../../../dto/client/Reference.dto';
import { SimulationService } from './../../../../simulation.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';


@Injectable()
export class PersonDataService {

    simulation: Simulation;

    constructor(private simulationService: SimulationService) {
    }

    init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
	        this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_PERSON_DATA)) {
			    this.onload();
            }
        });  
	}

	onload(){
        if(!this.simulation.client.reference1) this.simulation.client.reference1 = new Reference();
		if(!this.simulation.client.reference2) this.simulation.client.reference2 = new Reference();
	}
}