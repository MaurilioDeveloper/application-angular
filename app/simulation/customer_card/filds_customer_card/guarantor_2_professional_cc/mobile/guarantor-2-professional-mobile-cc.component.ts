import { Simulation } from './../../../../dto/Simulation.dto';
import { GuarantorTwoProfessionalService } from './../service/guarantor-2-professional.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'guarantor-2-professional-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_professional_cc/mobile/guarantor-2-professional-mobile-cc.component.html',
	providers: [GuarantorTwoProfessionalService]
})
export class GuarantorTwoProfessionalCustomerMobileComponent implements OnInit {

	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	constructor(private guarantorTwoProfessionalService: GuarantorTwoProfessionalService) {
	};

	ngOnInit() {
		this.guarantorTwoProfessionalService.init();
	}

	getListProvince(): Object[] {
		return this.guarantorTwoProfessionalService.listProvince;
	}

	getListSizeCompany(): Object[] {
		return this.guarantorTwoProfessionalService.listSizeCompany;
	}

	getListEconomicActivityGroup(): Object[] {
		return this.guarantorTwoProfessionalService.listEconomicActivityGroup;
	}

	getListEconomicActivity(): Object[] {
		return this.guarantorTwoProfessionalService.listEconomicActivity;
	}

	getListOccupation(): Object[] {
		return this.guarantorTwoProfessionalService.listOccupation;
	}

	getListPositionFunction(): Object[] {
		return this.guarantorTwoProfessionalService.listPositionFunction;
	}

	getlistTypeOfIncome(): Object[] {
		return this.guarantorTwoProfessionalService.listTypeOfIncome;
	}

	getListTypeProofOfIncome(): Object[] {
		return this.guarantorTwoProfessionalService.listTypeProofOfIncome;
	}

	getIsRequiredNameGuarantor(): boolean {
		return this.guarantorTwoProfessionalService.isRequiredNameGuarantor;
	}

	getIsRequiredCNPJGuarantor(): boolean {
		return this.guarantorTwoProfessionalService.isRequiredCNPJGuarantor;
	}

	getIsRequiredPhoneGuarantor(): boolean {
		return this.guarantorTwoProfessionalService.isRequiredPhoneGuarantor;
	}

	getSimulation(): Simulation {
		return this.guarantorTwoProfessionalService.simulation;
	}
	
	validOccupation(){
		this.guarantorTwoProfessionalService.validOccupation();
	}


	nextStep() {
		this.controlDynamicStepsIn = 19;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}