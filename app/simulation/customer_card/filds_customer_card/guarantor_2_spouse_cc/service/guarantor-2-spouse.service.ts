import { Guarantor } from './../../../../dto/client/Guarantor.dto';
import { Phone } from './../../../../dto/client/Phone.dto';
import { Company } from './../../../../dto/client/Company.dto';
import { Spouse } from './../../../../dto/client/Spouse.dto';
import { SimulationService } from './../../../../simulation.service';
import { AppMessage } from './../../../../../app.message';
import { AppService } from './../../../../../app.service';
import { IssuingBody } from './../../../../dto/client/IssuingBody.dto';
import { Profession } from './../../../../dto/client/Profession.dto';
import { Occupation } from './../../../../dto/client/Occupation.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';


@Injectable()
export class GuarantorTwoSpouseService {
    
    simulation: Simulation;
    listProvince: Array<Province> = new Array<Province>();
    listSex: Object[] = [];
    listTypePhone: Object[] = [];
    listDocumentType: Array<DocumentType> = new Array<DocumentType>();
    listOccupation: Array<Occupation> = new Array<Occupation>();
    listPositionFunction: Array<Profession> = new Array<Profession>();
    listIssuingBody: Array<IssuingBody> = new Array<IssuingBody>();

    constructor(private appService: AppService, private appMessage: AppMessage, private simulationService: SimulationService) {
	};

	init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_TWO_SPOUSE)) {
			    this.onload();
            }
        });  
	}

 	private initializeFields(){
		 if(!this.simulation.client.guarantor2) this.simulation.client.guarantor2 = new Guarantor();
        if(!this.simulation.client.guarantor2.spouse) this.simulation.client.guarantor2.spouse = new Spouse();
		if(!this.simulation.client.guarantor2.spouse.province) this.simulation.client.guarantor2.spouse.province = new Province();
		if(!this.simulation.client.guarantor2.spouse.company.comercialPhone) 
											this.simulation.client.guarantor2.spouse.company.comercialPhone = new Phone();
		if(!this.simulation.client.guarantor2.spouse.issuingBody) 
											this.simulation.client.guarantor2.spouse.issuingBody =  new IssuingBody();
		if(!this.simulation.client.guarantor2.spouse.company.occupation) 
											this.simulation.client.guarantor2.spouse.company.occupation = new Occupation();
		if(!this.simulation.client.guarantor2.spouse.company)
											this.simulation.client.guarantor2.spouse.company = new Company();
		if(!this.simulation.client.guarantor2.spouse.company.occupation) 
											this.simulation.client.guarantor2.spouse.company.occupation = new Occupation();
		if(!this.simulation.client.guarantor2.spouse.company.profession) 
											this.simulation.client.guarantor2.spouse.company.profession = new Profession();
	}

	onload(){
		this.initializeFields();
		this.loadSex();
		this.loadProvince();
		this.loadOccupation();
		this.loadPositionFunction();
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

}