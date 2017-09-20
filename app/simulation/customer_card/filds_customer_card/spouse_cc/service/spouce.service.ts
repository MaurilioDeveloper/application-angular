import { Profession } from './../../../../dto/client/Profession.dto';
import { Company } from './../../../../dto/client/Company.dto';
import { Occupation } from './../../../../dto/client/Occupation.dto';
import { IssuingBody } from './../../../../dto/client/IssuingBody.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Spouse } from './../../../../dto/client/Spouse.dto';
import { SimulationService } from './../../../../simulation.service';
import { AppMessage } from './../../../../../app.message';
import { AppService } from './../../../../../app.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';

@Injectable()
export class SpouseService {

    simulation: Simulation;

    listProvince: Object[] = [];

    listSex: Object[] = [];

    listOccupation: Object[] = [];

    listPositionFunction: Object[] = [];

    listIssuingBody: Object[] = [];

    isRequiredSpouse: boolean = false;

    constructor(private appService: AppService, private simulationService: SimulationService) {
    };

    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_SPOUSE)) {
                this.onload();
            }
        });
    }

    private initializeFields(){
        if(!this.simulation.client.spouse) this.simulation.client.spouse = new Spouse();
		if(!this.simulation.client.spouse.province) this.simulation.client.spouse.province = new Province();
		if(!this.simulation.client.spouse.issuingBody) 
											this.simulation.client.spouse.issuingBody =  new IssuingBody();
		if(!this.simulation.client.spouse.company.occupation) 
											this.simulation.client.spouse.company.occupation = new Occupation();
		if(!this.simulation.client.spouse.company)
											this.simulation.client.spouse.company = new Company();
		if(!this.simulation.client.spouse.company.profession) 
											this.simulation.client.spouse.company.profession = new Profession();
	}

    onload() {
        this.initializeFields();
        this.loadSex();
        this.loadProvince();
        this.loadOccupation();
        this.loadPositionFunction();
        this.validRequiredSpouse();
        this.loadIssuingbody();
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

    loadIssuingbody() {
        let result = this.appService.xSearch('customerCardService', 'findAllEmissionOrganism')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listIssuingBody = response.listEmissionOrganism;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadSex() {
        let result = this.appService.xSearch('customerCardService', 'findAllPersonType')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listSex = response.listPersonType;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadOccupation() {
        let result = this.appService.xSearch('customerCardService', 'findAllOccupation')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listOccupation = response.listOccupation;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadPositionFunction() {
        let result = this.appService.xSearch('customerCardService', 'findAllProfession')
        result.subscribe(
            (data) => {
                let response = data.json();
                this.listPositionFunction = response.listProfession;
            },
            err => {
                console.log(err.json());
            }
        );
    }

    validRequiredSpouse() {
        if (this.simulation.client.civilState.description == 'CASADO' || this.simulation.client.civilState.description == 'COMPANHEIRO') {
            this.isRequiredSpouse = true;
        } else {
            this.isRequiredSpouse = false;
        }
    }

}