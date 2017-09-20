import { Simulation } from './../../../../dto/Simulation.dto';
import { GuarantorTwoPersonService } from './../service/guarantor-2-person.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'guarantor-2-person-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_person_cc/mobile/guarantor-2-person-mobile-cc.component.html',
	providers: [GuarantorTwoPersonService]
})
export class GuarantorTwoPersonMobileComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	conf:boolean = false;

	constructor(private guarantorTwoPersonService: GuarantorTwoPersonService) {
	};

	ngOnInit() {
		this.guarantorTwoPersonService.init();
	}

	
    getSimulation(): Simulation {
        return this.guarantorTwoPersonService.simulation;
    }

	validBankSelected(){
		this.guarantorTwoPersonService.validBankSelected();
	}

	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 20;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}