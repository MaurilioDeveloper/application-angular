import { GuarantorOneProfessionalService } from './service/guarantor-1-professional.service';
import { SimulationService } from './../../../simulation.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'guarantor-1-professional-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_1_professional_cc/guarantor_1_professional_cc.component.html',
	providers: [GuarantorOneProfessionalService]
})
export class Guarantor1ProfessionalCustomerCardComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	conf: boolean = false;


	constructor(private guarantorOneProfessionalService: GuarantorOneProfessionalService) {
	};

	ngOnInit() {
		this.guarantorOneProfessionalService.init();
	}

	getListProvince(): Object[] {
		return this.guarantorOneProfessionalService.listProvince;
	}

	getListSizeCompany(): Object[] {
		return this.guarantorOneProfessionalService.listSizeCompany;
	}

	getListEconomicActivityGroup(): Object[] {
		return this.guarantorOneProfessionalService.listEconomicActivityGroup;
	}

	getListEconomicActivity(): Object[] {
		return this.guarantorOneProfessionalService.listEconomicActivity;
	}

	getListOccupation(): Object[] {
		return this.guarantorOneProfessionalService.listOccupation;
	}

	getListPositionFunction(): Object[] {
		return this.guarantorOneProfessionalService.listPositionFunction;
	}

	getListTypeOfIncome(): Object[] {
		return this.guarantorOneProfessionalService.listTypeOfIncome;
	}

	getListTypeProofOfIncome(): Object[] {
		return this.guarantorOneProfessionalService.listTypeProofOfIncome;
	}

	getIsRequiredNameGuarantor(): boolean {
		return this.guarantorOneProfessionalService.isRequiredNameGuarantor;
	}

	getIsRequiredCNPJGuarantor(): boolean {
		return this.guarantorOneProfessionalService.isRequiredCNPJGuarantor
	}

	getIsRequiredPhoneGuarantor(): boolean {
		return this.guarantorOneProfessionalService.isRequiredPhoneGuarantor;
	}

	getSimulation(): Simulation {
		return this.guarantorOneProfessionalService.simulation;
	}

	validOccupation(){
		return this.guarantorOneProfessionalService.validOccupation();	
	}
	
	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 13;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}