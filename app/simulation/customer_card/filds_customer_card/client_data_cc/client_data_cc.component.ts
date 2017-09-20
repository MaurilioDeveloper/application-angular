import { CivilState } from './../../../dto/client/CivilState.dto';
import { ClientCustomerService } from './service/client-customer.service';
import { SimulationService } from './../../../simulation.service';
import { MailingAddress } from './../../../dto/client/MailingAddress.dto';
import { ResidenceType } from './../../../dto/client/ResidenceType.dto';
import { EconomicActivityGroup } from './../../../dto/client/EconomicActivityGroup.dto';
import { EconomicActivity } from './../../../dto/client/EconomicActivity.dto';
import { CompanySize } from './../../../dto/client/EmployerSize.dto';
import { LegalNature } from './../../../dto/client/LegaNature.dto';
import { IssuingBody } from './../../../dto/client/IssuingBody.dto';
import { DocumentType } from './../../../dto/client/DocumentType.dto';
import { Phone } from './../../../dto/client/Phone.dto';
import { EducationDegree } from './../../../dto/client/EducationDegree.dto';
import { PoliticalExposition } from './../../../dto/client/PoliticalExposition.dto';
import { Province } from './../../../../commons/province/dto/province.dto';
import { Country } from './../../../dto/client/Country.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Simulation } from './../../../dto/Simulation.dto';
import { AppService } from './../../../../app.service';
import { AppMessage } from './../../../../app.message';
import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'client-data-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/client_data_cc/client_data_cc.component.html',
	providers: [ClientCustomerService]
})
export class ClientDataCustomerCardComponent implements OnInit {

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
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 3;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}