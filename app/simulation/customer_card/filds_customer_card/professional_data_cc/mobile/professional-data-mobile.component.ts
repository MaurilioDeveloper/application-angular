import { ProfessionalDataService } from './../service/professional-data.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'professional-data-mobile',
    templateUrl: 'app/simulation/customer_card/filds_customer_card/professional_data_cc/mobile/professional-data-mobile.component.html',
    providers: [ProfessionalDataService]
})
export class ProfessionalDataCustomerCardMobileComponent implements OnInit {

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
        if (!this.conf) {
            this.countClient.emit();
            this.conf = true;
        }
        this.controlDynamicStepsIn = 6;
        this.getSimulation().step++;
        this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
    }

}