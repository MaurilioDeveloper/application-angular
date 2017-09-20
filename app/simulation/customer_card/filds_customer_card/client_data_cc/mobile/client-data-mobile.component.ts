import { ClientCustomerService } from './../service/client-customer.service';
import { SimulationService } from './../../../../simulation.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'client-data-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/client_data_cc/mobile/client-data-mobile.component.html',
	providers: [ClientCustomerService]
})
export class ClientDataCustomerCardMobileComponent implements OnInit {

	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Output() changeSpouse: EventEmitter<boolean> = new EventEmitter<boolean>();
	conf:boolean = false;

	constructor(private clientCustumerService: ClientCustomerService) {
	};

	ngOnInit() {
        this.clientCustumerService.init();
	}

	getSimulation(): Simulation {
		return this.clientCustumerService.simulation;
	}

	getListCivilState(): Object[] {
		return this.clientCustumerService.listCivilState;
	}

	getListCountry(): Object[] {
		return this.clientCustumerService.listCountry;
	}

	getListProvince(): Object[] {
		return this.clientCustumerService.listProvince;
	}

	getListSex(): Object[] {
		return this.clientCustumerService.listSex;
	}

	getListTypePhone(): Object[] {
		return this.clientCustumerService.listTypePhone;
	}

	getListPoliticalExposition(): Object[] {
		return this.clientCustumerService.listPoliticalExposition;
	}

	getListEducationDegree(): Object[] {
		return this.clientCustumerService.listEducationDegree;
	}

	getListHandicapped(): Object[] {
		return this.clientCustumerService.listHandicapped;
	}

	getListDocumentType(): Object[] {
		return this.clientCustumerService.listDocumentType;
	}

	getListIssuingBody(): Object[] {
		return this.clientCustumerService.listIssuingBody;
	}

	getListLegalNature(): Object[] {
		return this.clientCustumerService.listLegalNature;
	}

	getListOwnSeat(): Object[] {
		return this.clientCustumerService.listOwnSeat;
	}

	
	getListSizeCompany(): Object[] {
		return this.clientCustumerService.listSizeCompany;
	}

	getListEconomicActivityGroup(): Object[] {
		return this.clientCustumerService.listEconomicActivityGroup;
	}

	getListEconomicActivity(): Object[] {
		return this.clientCustumerService.listEconomicActivity;
	}

	onChangeSpouse(event) {
        this.changeSpouse.emit(
				this.clientCustumerService.hasSpouse(event.value));
	}


	nextStep() {
		if (!this.conf) {
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 3;
		console.log(this.getSimulation().client.typePerson.toString());
		if(this.getSimulation().client.typePerson.toString() === "PJ") {
			this.getSimulation().step = 12;
		}
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}