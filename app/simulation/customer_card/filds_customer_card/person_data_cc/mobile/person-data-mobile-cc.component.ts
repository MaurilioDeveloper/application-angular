import { Simulation } from './../../../../dto/Simulation.dto';
import { PersonDataService } from './../service/person-data.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'person-data-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/person_data_cc/mobile/person-data-mobile-cc.component.html',
	providers: [PersonDataService]
})
export class PersonDataMobileComponent implements OnInit {

	@Input() controlDynamicStepsIn: number;
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	conf:boolean = false;

	constructor(private personDataService: PersonDataService) {
	};

	ngOnInit(){
		this.personDataService.init();
	}

	getSimulation(): Simulation {
		return this.personDataService.simulation;
	}

	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}

		this.controlDynamicStepsIn = 7;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}