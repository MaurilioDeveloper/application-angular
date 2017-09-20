import { Guarantor } from './../../../../dto/client/Guarantor.dto';
import { Phone } from './../../../../dto/client/Phone.dto';
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
export class GuarantorOneSpouseService {

    simulation: Simulation;
    listProvince: Object[] = [];
    listIssuingBody: Object[] = [];
	listSex: Object[] = [];
	listTypePhone: Object[] = [];
	listDocumentType: Object[] = [];
	listOccupation: Object[] = [];
	listPositionFunction: Object[] = [];

    constructor(private appService: AppService, private appMessage: AppMessage, private simulationService: SimulationService) {
	};

	init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_ONE_SPOUSE)) {
			    this.onload();
            }
        });  
	}

    private initializeFields(){
		if(!this.simulation.client.guarantor1) this.simulation.client.guarantor1 = new Guarantor();
        if(!this.simulation.client.guarantor1.spouse) this.simulation.client.guarantor1.spouse = new Spouse();
		if(!this.simulation.client.guarantor1.spouse.company.comercialPhone) 
											this.simulation.client.guarantor1.spouse.company.comercialPhone = new Phone();
		if(!this.simulation.client.guarantor1.spouse.province) this.simulation.client.guarantor1.spouse.province = new Province();
		if(!this.simulation.client.guarantor1.spouse.issuingBody) 
											this.simulation.client.guarantor1.spouse.issuingBody =  new IssuingBody();
		if(!this.simulation.client.guarantor1.spouse.company.occupation) 
											this.simulation.client.guarantor1.spouse.company.occupation = new Occupation();
		if(!this.simulation.client.guarantor1.spouse.company)
											this.simulation.client.guarantor1.spouse.company = new Company();
		if(!this.simulation.client.guarantor1.spouse.company.occupation) 
											this.simulation.client.guarantor1.spouse.company.occupation = new Occupation();
		if(!this.simulation.client.guarantor1.spouse.company.profession) 
											this.simulation.client.guarantor1.spouse.company.profession = new Profession();
	}

	onload(){
		this.initializeFields();
		this.loadSex();
		this.loadProvince();
		this.loadOccupation();
		this.loadPositionFunction();
		this.loadIssuingBody();
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

    loadIssuingBody() {
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


}