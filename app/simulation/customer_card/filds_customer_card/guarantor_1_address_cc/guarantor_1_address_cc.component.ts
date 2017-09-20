import { GuarantoroOneAddressService } from './service/guarantor-1-address.service';
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
	selector: 'guarantor-1-address-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_address_cc/guarantor_1_address_cc.component.html',
	providers: [GuarantoroOneAddressService]
})
export class Guarantor1AddressCustomerCardComponent implements OnInit {

	@Input() controlDynamicStepsIn: number;
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	@Input() showSpouseGuarantor1:boolean;

	conf:boolean = false;

	listTypeResidence: Array<ResidenceType>= new Array<ResidenceType>();
	listMailingAddress: Array<MailingAddress> = new Array<MailingAddress>();

	constructor(private guarantorAddressService: GuarantoroOneAddressService) {
		this.guarantorAddressService.init();
	};

	ngOnInit() {
	}

	getListProvince(): Object[] {
		return this.guarantorAddressService.listProvince;
	}

	getListTypeResidence(): Object[] {
		return this.guarantorAddressService.listTypeResidence;
	}

	getListMailingAddress(): Object[] {
		return this.guarantorAddressService.listMailingAddress;
	}

	getSimulation(): Simulation {
		return this.guarantorAddressService.simulation;
	}

	
	isSpouse():boolean{
		return (this.getSimulation().client.civilState.value == SpouseType.MARRIED ||
			this.getSimulation().client.civilState.value == SpouseType.LIFE_PARTNER)
	}

	isPhysicalPerson(){
		return this.guarantorAddressService.isPhysicalPerson;
	}

	nextStep() {
		if (this.isPhysicalPerson() && this.showSpouseGuarantor1) {
			this.controlDynamicStepsIn = 11;
		} else {
			this.controlDynamicStepsIn = 12;
		}
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}

		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}