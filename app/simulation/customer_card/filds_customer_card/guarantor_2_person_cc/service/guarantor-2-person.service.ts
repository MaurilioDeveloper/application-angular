import { GuarantorType } from './../../../../dto/client/GuarantorType.dto';
import { Guarantor } from './../../../../dto/client/Guarantor.dto';
import { SimulationService } from './../../../../simulation.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';

@Injectable()
export class GuarantorTwoPersonService {

    simulation: Simulation

    constructor(private simulationService: SimulationService) {
    }

    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_TWO_PERSON)) {
                this.onload();
            }
        });
    }

	private initializeFields(){
		if(!this.simulation.client.guarantor2) this.simulation.client.guarantor2 = new Guarantor();
		if(!this.simulation.client.guarantor2.guarantorType) this.simulation.client.guarantor2.guarantorType = new GuarantorType();
	}

    onload() {
        	this.initializeFields();
        this.validBankSelected();
    }

	validBankSelected(){
		if(this.simulation.client.guarantor2.guarantorType.description != ''){
			return this.simulation.client.guarantor2.isRequired = true;
		}else{
			return this.simulation.client.guarantor2.isRequired = false;
		}
	}

}