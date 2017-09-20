import { Simulation } from './../../../../dto/Simulation.dto';
import { GuarantorOnePersonService } from './../service/guarantor-1-person.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'guarantor-1-person-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_person_cc/mobile/guarantor-1-person-mobile-cc.component.html',
	providers: [GuarantorOnePersonService]
})
export class GuarantorOnePersonMobileComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	conf:boolean = false;

	constructor(private guarantorOnePersonService: GuarantorOnePersonService) {
	};

	ngOnInit() {
        this.guarantorOnePersonService.init();
	}

	getSimulation(): Simulation {
		return this.guarantorOnePersonService.simulation;
	}

	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 14;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}