import { ProfessionalDataService } from './service/professional-data.service';
import { Address } from './../../../dto/client/Address.dto';
import { Company } from './../../../dto/client/Company.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'professional-data-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/professional_data_cc/professional_data_cc.component.html',
	providers: [ProfessionalDataService]
})
export class ProfessionalDataCustomerCardComponent implements OnInit {

	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Input() controlDynamicStepsIn: number;
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();

	conf: boolean = false;

	constructor(private professionalDataService: ProfessionalDataService) {
	};

	ngOnInit() {		
		this.professionalDataService.init();
	}

    getListProvince(): Object[] {
        return this.professionalDataService.listProvince;
    }

    getListSizeCompany(): Object[] {
        return this.professionalDataService.listSizeCompany;
    }

    getListEconomicActivityGroup(): Object[] {
        return this.professionalDataService.listEconomicActivityGroup;
    }

    getListEconomicActivity(): Object[] {
        return this.professionalDataService.listEconomicActivity;
    }

    getListOccupation(): Object[] {
        return this.professionalDataService.listOccupation;
    }

    getListPositionFunction(): Object[] {
        return this.professionalDataService.listPositionFunction;
    }

    getListTypeOfIncome(): Object[] {
        return this.professionalDataService.listTypeOfIncome;
    }

    getListTypeProofOfIncome(): Object[] {
        return this.professionalDataService.listTypeProofOfIncome;
    }

    getIsRequiredCNPJ(){
        return this.professionalDataService.isRequiredCNPJ;
    }

    getSimulation(): Simulation {
        return this.professionalDataService.simulation;
    }

	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 6;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}