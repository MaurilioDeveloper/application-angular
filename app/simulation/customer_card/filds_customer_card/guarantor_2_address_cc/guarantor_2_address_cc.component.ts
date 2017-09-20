import { GuarantorTwoAddressService } from './service/guarantor-2-address.service';
import { SimulationService } from './../../../simulation.service';
import { MailingAddress } from './../../../dto/client/MailingAddress.dto';
import { ResidenceType } from './../../../dto/client/ResidenceType.dto';
import { Province } from './../../../../commons/province/dto/province.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

import { SpouseType } from './../../../dto/client/SpouseType.enum';

@Component({
	selector: 'guarantor-2-address-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_address_cc/guarantor_2_address_cc.component.html',
	providers: [GuarantorTwoAddressService]
})
export class Guarantor2AddressCustomerCardComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	@Input() showSpouseGuarantor2:boolean;
	conf:boolean = false;

	constructor(private guarantorTwoAddressService: GuarantorTwoAddressService) {
	}

	ngOnInit() {
		this.guarantorTwoAddressService.init();
	}

	getListProvince(): Object[] {
		return this.guarantorTwoAddressService.listProvince;
	}
	getListTypeResidence() {
		return this.guarantorTwoAddressService.listTypeResidence;
	}

	getListMailingAddress() {
		return this.guarantorTwoAddressService.listMailingAddress;
	}

	getSimulation(): Simulation {
		return this.guarantorTwoAddressService.simulation;
	}
	
	isSpouse():boolean{
		return (this.getSimulation().client.civilState.value == SpouseType.MARRIED ||
			this.getSimulation().client.civilState.value == SpouseType.LIFE_PARTNER)
	}

	isPhysicalPerson(){
		return this.guarantorTwoAddressService.isPhysicalPerson;
	}

	nextStep() {
		if (this.isPhysicalPerson() && this.showSpouseGuarantor2) {
			this.controlDynamicStepsIn = 17;
		} else {
			this.controlDynamicStepsIn = 18;
		}
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		// this.controlDynamicStepsIn
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}