import { MailingAddress } from './../../../../dto/client/MailingAddress.dto';
import { Address } from './../../../../dto/client/Address.dto';
import { SimulationService } from './../../../../simulation.service';
import { AppService } from './../../../../../app.service';
import { ResidenceType } from './../../../../dto/client/ResidenceType.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';
import { TypePerson } from './../../../../dto/Client.dto';

@Injectable()
export class AddressDataService {

    simulation: Simulation;
    listProvince: Array<Province> = new Array<Province>();
    listTypeResidence: Array<ResidenceType> = new Array<ResidenceType>();
    listMailingAddress: Object[] = [];
    isPhysicalPerson: boolean;


    constructor(private appService: AppService, private simulationService: SimulationService) {
    }

    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_ADDRESS_DATA)) {
                this.onload();
            }
        });
    }

    private initializeFields(){
        this.isPhysicalPerson = this.simulation.client.typePerson === TypePerson.PF;

        if(!this.simulation.client.address) this.simulation.client.address = new Address();
   		if(!this.simulation.client.address.province) 
							this.simulation.client.address.province = new Province();
        if(!this.simulation.client.address.residenceType) 
                            this.simulation.client.address.residenceType = new ResidenceType();
		if(!this.simulation.client.address.mailingAddress) 
                            this.simulation.client.address.mailingAddress = new MailingAddress();

	}

    onload() {
        this.initializeFields();
        this.loadProvince();
        this.loadTypeResidence();
        this.loadMailingAddress();
    }


    loadProvince() {
        let result = this.appService.xSearch('customerCardService', 'findAllProvince')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listProvince = response.provinceList;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadTypeResidence() {
        let result = this.appService.xSearch('customerCardService', 'findAllTypeResidence')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listTypeResidence = response.listTypeResidence;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadMailingAddress() {
        let result = this.appService.xSearch('customerCardService', 'findAllMailingAddress')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listMailingAddress = response.listMailingAddress;
            },
            err => {
                console.log(err.json());
            }
        );
    }

}