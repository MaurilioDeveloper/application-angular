import { Reference } from './../../../../dto/client/Reference.dto';
import { GuarantorType } from './../../../../dto/client/GuarantorType.dto';
import { Guarantor } from './../../../../dto/client/Guarantor.dto';
import { SimulationService } from './../../../../simulation.service';
import { AppMessage } from './../../../../../app.message';
import { AppService } from './../../../../../app.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';


@Injectable()
export class GuarantorOnePersonService {

    simulation: Simulation;

    constructor(private simulationService: SimulationService) {
	};


	init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_ONE_PERSON)) {
			    this.onload();
            }
        });  
	}

	private initializeFields(){
		if(!this.simulation.client.guarantor1) this.simulation.client.guarantor1 = new Guarantor();
		if(!this.simulation.client.guarantor1.reference1) this.simulation.client.guarantor1.reference1 = new Reference();
		if(!this.simulation.client.guarantor1.reference2) this.simulation.client.guarantor1.reference2 = new Reference();
	}

    private onload() {
		this.initializeFields();
        this.validBankSelected();
    }
    
	validBankSelected(){
		if(this.simulation.client.guarantor1.guarantorType.description != ''){
			return this.simulation.client.guarantor1.isRequired = true;
		}else{
			return this.simulation.client.guarantor1.isRequired = false;
		}
	}

}