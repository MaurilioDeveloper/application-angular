import { Guarantor } from './../../../../dto/client/Guarantor.dto';
import { Phone } from './../../../../dto/client/Phone.dto';
import { ProofIncomeType } from './../../../../dto/client/ProofIncomeTypeDTO.dto';
import { IncomeType } from './../../../../dto/client/IncomeType.dto';
import { CompanySize } from './../../../../dto/client/EmployerSize.dto';
import { EconomicActivity } from './../../../../dto/client/EconomicActivity.dto';
import { EconomicActivityGroup } from './../../../../dto/client/EconomicActivityGroup.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Company } from './../../../../dto/client/Company.dto';
import { Profession } from './../../../../dto/client/Profession.dto';
import { Occupation } from './../../../../dto/client/Occupation.dto';
import { SimulationService } from './../../../../simulation.service';
import { AppMessage } from './../../../../../app.message';
import { AppService } from './../../../../../app.service';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';



@Injectable()
export class GuarantorOneProfessionalService {

    simulation: Simulation;
    listProvince: Object[] = [];
	listSizeCompany: Object[] = [];
	listEconomicActivityGroup: Object[] = [];
	listEconomicActivity: Object[] = [];
	listOccupation: { 'id': null, 'description': null, 'importCode': null }[] = [];
	listPositionFunction: Object[] = [];
	listTypeOfIncome: Object[] = [];
	listTypeProofOfIncome: Object[] = [];
	isRequiredNameGuarantor: boolean = false;
	isRequiredCNPJGuarantor: boolean = false;
	isRequiredPhoneGuarantor: boolean = false;

    constructor(private appService: AppService, private appMessage: AppMessage, private simulationService: SimulationService) {
	};

    init() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
            this.simulation = simulation;
            if(this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_GUARANTOR_ONE_PROFESSIONAL)) {
			    this.onload();
            }
        });  
	}

    private initializeFields(){
		if(!this.simulation.client.guarantor1) this.simulation.client.guarantor1 = new Guarantor();
		if(!this.simulation.client.guarantor1.company) this.simulation.client.guarantor1.company = new Company();
		if(!this.simulation.client.guarantor1.company.comercialPhone)
								this.simulation.client.guarantor1.company.comercialPhone = new Phone();
        if(!this.simulation.client.guarantor1.company.occupation) 
								this.simulation.client.guarantor1.company.occupation = new Occupation();
		if(!this.simulation.client.guarantor1.company.profession)
								this.simulation.client.guarantor1.company.profession = new Profession();
		if(!this.simulation.client.guarantor1.company.address.province) 
								this.simulation.client.guarantor1.company.address.province = new Province();
		if(!this.simulation.client.guarantor1.company.economicActivityGroup)
								this.simulation.client.guarantor1.company.economicActivityGroup = new EconomicActivityGroup();
		if(!this.simulation.client.guarantor1.company.economicActivity)
								this.simulation.client.guarantor1.company.economicActivity = new EconomicActivity();
		if(!this.simulation.client.guarantor1.company.size)
								this.simulation.client.guarantor1.company.size = new CompanySize();
		if(!this.simulation.client.guarantor1.company.incomeType)
								this.simulation.client.guarantor1.company.incomeType = new IncomeType();
		if(!this.simulation.client.guarantor1.company.proofIncomeType)
								this.simulation.client.guarantor1.company.proofIncomeType = new ProofIncomeType();
		
	}

	onload(){
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
		this.validRequiredGuarantor1NameCompany();
		this.validRequiredGuarantor1CNPJ();
		this.validRequiredGuarantor1Phone();
	}

	validRequiredGuarantor1NameCompany() {
		let id = this.simulation.client.guarantor1.company.occupation.importCode;
		if (this.simulation.client.guarantor1.isRequired && (id === '006' && id === '005')) {
			this.isRequiredNameGuarantor = false;
		} else {
			this.isRequiredNameGuarantor = true;
		}
	}

	validRequiredGuarantor1Phone() {
		let id = this.simulation.client.guarantor1.company.occupation.importCode;
		if (this.simulation.client.guarantor1.isRequired && (id === '006' || id === '005')) {
			this.isRequiredPhoneGuarantor = false;
		} else {
			this.isRequiredPhoneGuarantor = true;
		}
	}

	validRequiredGuarantor1CNPJ() {

		let id = this.simulation.client.guarantor1.company.occupation.importCode;
		if (this.simulation.client.guarantor1.isRequired &&  id === '007') {
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