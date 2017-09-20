import { Guarantor } from './../../../../dto/client/Guarantor.dto';
import { Phone } from './../../../../dto/client/Phone.dto';
import { Company } from './../../../../dto/client/Company.dto';
import { AppService } from './../../../../../app.service';
import { AppMessage } from './../../../../../app.message';
import { SimulationService } from './../../../../simulation.service';
import { ProofIncomeType } from './../../../../dto/client/ProofIncomeTypeDTO.dto';
import { IncomeType } from './../../../../dto/client/IncomeType.dto';
import { Profession } from './../../../../dto/client/Profession.dto';
import { Occupation } from './../../../../dto/client/Occupation.dto';
import { EconomicActivity } from './../../../../dto/client/EconomicActivity.dto';
import { EconomicActivityGroup } from './../../../../dto/client/EconomicActivityGroup.dto';
import { CompanySize } from './../../../../dto/client/EmployerSize.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';


@Injectable()
export class GuarantorTwoProfessionalService {

    simulation: Simulation;
    listProvince: Array<Province> = new Array<Province>();
	listSizeCompany: Array<CompanySize> = new Array<CompanySize>();
	listEconomicActivityGroup: Array<EconomicActivityGroup> = new Array<EconomicActivityGroup>();
	listEconomicActivity: Array<EconomicActivity> = new Array<EconomicActivity>();
	listOccupation: Array<Occupation> = new Array<Occupation>();
	listPositionFunction: Array<Profession> = new Array<Profession>();
	listTypeOfIncome: Array<IncomeType> = new Array<IncomeType>();
	listTypeProofOfIncome: Array<ProofIncomeType> = new Array<ProofIncomeType>();
	isRequiredNameGuarantor: boolean = false;
	isRequiredCNPJGuarantor: boolean = false;
	isRequiredPhoneGuarantor: boolean = false;
    AUTONOMUS: String = "005";
	RETIRED_PENSIONER: String = "006";
	EMPLOYER_PARTNER: String = "007";

    constructor(private appService: AppService, private appMessage: AppMessage, private simulationService: SimulationService) {
    }

	init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_TWO_PROFESSIONAL)) {
			    this.onload();
            }
        });  
	}

 private initializeFields(){
		if(!this.simulation.client.guarantor2) this.simulation.client.guarantor2 = new Guarantor();
		if(!this.simulation.client.guarantor2.company) this.simulation.client.guarantor2.company = new Company();
		if(!this.simulation.client.guarantor2.company.comercialPhone)
								this.simulation.client.guarantor2.company.comercialPhone = new Phone();
        if(!this.simulation.client.guarantor2.company.occupation) 
								this.simulation.client.guarantor2.company.occupation = new Occupation();
		if(!this.simulation.client.guarantor2.company.profession)
								this.simulation.client.guarantor2.company.profession = new Profession();
		if(!this.simulation.client.guarantor2.company.address.province) 
								this.simulation.client.guarantor2.company.address.province = new Province();
		if(!this.simulation.client.guarantor2.company.economicActivityGroup)
								this.simulation.client.guarantor2.company.economicActivityGroup = new EconomicActivityGroup();
		if(!this.simulation.client.guarantor2.company.economicActivity)
								this.simulation.client.guarantor2.company.economicActivity = new EconomicActivity();
		if(!this.simulation.client.guarantor2.company.size)
								this.simulation.client.guarantor2.company.size = new CompanySize();
		if(!this.simulation.client.guarantor2.company.incomeType)
								this.simulation.client.guarantor2.company.incomeType = new IncomeType();
		if(!this.simulation.client.guarantor2.company.proofIncomeType)
								this.simulation.client.guarantor2.company.proofIncomeType = new ProofIncomeType();
		
	}

	private onload(){
		this.initializeFields();
		this.loadSizeCompany();
		this.loadEconomicActivityGroup();
		this.loadEconomicActivity();
		this.loadProvince();
		this.loadOccupation();
		this.loadPositionFunction();
		this.loadTypeOfIncome();
		this.loadTypeProofOfIncome();
	}

	validOccupation() {
		this.validRequiredguarantor2NameCompany();
		this.validRequiredguarantor2CNPJ();
		this.validRequiredguarantor2Phone();
	}

	validRequiredguarantor2NameCompany() {
		let importCode: String = this.simulation.client.guarantor2.company.occupation.importCode;
		if (this.simulation.client.guarantor2.isRequired && (importCode !== this.AUTONOMUS  && importCode != this.RETIRED_PENSIONER)) {
			this.isRequiredNameGuarantor = true;
		} else {
			this.isRequiredNameGuarantor = false;
		}
	}

	validRequiredguarantor2Phone() {
		let importCode = this.simulation.client.guarantor2.company.occupation.importCode;

		if (this.simulation.client.guarantor2.isRequired && importCode != this.RETIRED_PENSIONER) {
			this.isRequiredPhoneGuarantor = true;
		} else {
			this.isRequiredPhoneGuarantor = false;
		}
	}

	validRequiredguarantor2CNPJ() {
		let importCode = this.simulation.client.guarantor2.company.occupation.importCode;

		if (this.simulation.client.guarantor2.isRequired && importCode == this.EMPLOYER_PARTNER) {
			this.isRequiredCNPJGuarantor = true;
		} else {
			this.isRequiredCNPJGuarantor = false;
		}
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

	loadSizeCompany() {
		let result = this.appService.xSearch('customerCardService', 'findAllEmployerSize')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listSizeCompany = response.listEmployerSize;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadEconomicActivityGroup() {
		let result = this.appService.xSearch('customerCardService', 'findAllIndustrialSegment')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listEconomicActivityGroup = response.listIndustrialSegment;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadEconomicActivity() {
		let result = this.appService.xSearch('customerCardService', 'findAllEconomicActivity')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listEconomicActivity = response.listEconomicActivity;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadTypeOfIncome() {
		let result = this.appService.xSearch('customerCardService', 'findAllIncomeType')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listTypeOfIncome = response.listIncomeType;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadTypeProofOfIncome() {
		let result = this.appService.xSearch('customerCardService', 'findAllProofIncomeType')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listTypeProofOfIncome = response.listProofIncomeType;
			},
			err => {
				console.log(err.json());
			}
		);
	}

}