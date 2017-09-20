import { AddressDataService } from './../service/address-data.service';
import { SimulationService } from './../../../../simulation.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'address-data-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/address_data_cc/mobile/address-data-mobile.component.html',
	providers: [AddressDataService]
})
export class AddressDataCustomerCardMobileComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	@Input() showSpouse: boolean;

	conf: boolean = false;

	constructor(private addressDataService: AddressDataService, private simulationService: SimulationService) {
	};

	ngOnInit() {
		this.addressDataService.init();
	}


	getSimulation(): Simulation {
		return this.addressDataService.simulation;
	}

	getListProvince(): Object[] {
		return this.addressDataService.listProvince;
	}

	getListTypeResidence(): Object[] {
		return this.addressDataService.listTypeResidence;
	}

	getListMailingAddress(): Object[] {
		return this.addressDataService.listMailingAddress;
	}

	isPhysicalPerson(){
		return this.addressDataService.isPhysicalPerson;
	}



	nextStep() {
		if (this.isPhysicalPerson() && this.showSpouse) {
			this.controlDynamicStepsIn = 4;
		} else {
			this.controlDynamicStepsIn = 5;
			this.getSimulation().step++;
		}
		if (!this.conf) {
			this.countClient.emit();
			this.conf = true;
		}

		this.getSimulation().step++; 
		console.log(this.getSimulation().step);
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}