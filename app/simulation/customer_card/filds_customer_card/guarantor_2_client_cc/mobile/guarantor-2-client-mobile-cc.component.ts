import { Simulation } from './../../../../dto/Simulation.dto';
import { GuarantorTwoClientService } from './../service/guarantor-2-client.service';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { StepEnum } from './../../../../step.enum';

@Component({
	selector: 'guarantor-2-client-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/guarantor_2_client_cc/mobile/guarantor-2-client-mobile-cc.component.html',
	providers: [GuarantorTwoClientService]
})
export class GuarantorTwoClientMobileComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	@Output() changeSpouseGuarantor2: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() changeGuarantor2: EventEmitter<boolean> = new EventEmitter<boolean>();

	conf: boolean = false;

	constructor(private guarantorTwoClientService: GuarantorTwoClientService) {
		this.guarantorTwoClientService.init();
	};

	ngOnInit() {
		if(!this.getSimulation().client.guarantor2.guarantorType.id){
			this.getSimulation().client.guarantor2.guarantorType.id = "0";
        } 
	}

	getListCivilState(): Object[] {
		return this.guarantorTwoClientService.listCivilState;
	}

	getListCountry(): Object[] {
		return this.guarantorTwoClientService.listCountry;
	}

	getListProvince(): Object[] {
		return this.guarantorTwoClientService.listProvince;
	}

	getListSex(): Object[] {
		return this.guarantorTwoClientService.listSex;
	}

	getListTypePhone(): Object[] {
		return this.guarantorTwoClientService.listTypePhone;
	}

	getListPoliticalExposition(): Object[] {
		return this.guarantorTwoClientService.listPoliticalExposition;
	}

	getListEducationDegree(): Object[] {
		return this.guarantorTwoClientService.listEducationDegree;
	}

	getListHandicapped(): Object[] {
		return this.guarantorTwoClientService.listHandicapped;
	}

	getListDocumentType(): Object[] {
		return this.guarantorTwoClientService.listDocumentType;
	}

	getListIssuingBody(): Object[] {
		return this.guarantorTwoClientService.listIssuingBody;
	}

	getListTypeGuarantor(): Object[] {
		return this.guarantorTwoClientService.listTypeGuarantor;
	}

	getListDegreeOfKinship(): Object[] {
		return this.guarantorTwoClientService.listDegreeOfKinship;
	}

	getListCompanyRelationshipType(): Object[] {
		return this.guarantorTwoClientService.listCompanyRelationshipType;
	}

	getIsPhysicalPerson(): boolean {
		return this.guarantorTwoClientService.isPhysicalPerson;
	}

	getSimulation(): Simulation {
		return this.guarantorTwoClientService.simulation;
	}
	
	onChangeSpouse(event) {
        this.changeSpouseGuarantor2.emit(
				this.guarantorTwoClientService.hasSpouse(event.value));
	}

	selectGuarantorType(event) {
		this.changeGuarantor2.emit(
			this.guarantorTwoClientService.hasGuarantor(event.value));
		return this.guarantorTwoClientService.validRequiredGuarantor();
	}


	nextStep() {
		if (!this.conf) {
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 16;
		if(this.getSimulation().client.guarantor2.guarantorType.id == "0") {
			this.getSimulation().step = 4;	
		} else {
        	this.getSimulation().step++;
		}
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}