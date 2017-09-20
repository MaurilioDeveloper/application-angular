import { Color } from './../../../../dto/client/Color.dto';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { CarDetails } from './../../../../dto/client/CarDetails.dto';
import { Simulation } from './../../../../dto/Simulation.dto';
import { SimulationService } from './../../../../simulation.service';
import { TranslateService } from './../../../../../translate/translate.service';
import { AppMessage } from './../../../../../app.message';
import { AppService } from './../../../../../app.service';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../../../step.enum';

@Injectable()
export class VehicleDataService {

    simulation: Simulation;
    listRegistrationProvince: Array<Province> = new Array<Province>();
	listLicensingProvince: Array<Province> = new Array<Province>();
	listVehicleColor: Color[] = [];
	listVehicleOrigin: { 'value':String, 'description': String }[] = []

    constructor(private appService: AppService, private appMessage: AppMessage,
        private _translate: TranslateService, private simulationService: SimulationService) {
    };

    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && (this.simulation.step == StepEnum.STEP_CUSTOMER_CARD || this.simulation.step == StepEnum.STEP_MOBILE_VEHICLE_DATA)) {
                this.onload();
            }
        });
    }

    
    private initializeFields(){
		if (!this.simulation.client.carDetails) this.simulation.client.carDetails = new CarDetails();
		if (!this.simulation.client.carDetails.vehicleColor) this.simulation.client.carDetails.vehicleColor = new Color();
		if (!this.simulation.client.carDetails.registrationProvince){ 
			if(!this.simulation.client.address.province){
				this.simulation.client.carDetails.registrationProvince = new Province();
			}else{
				this.simulation.client.carDetails.registrationProvince = {... this.simulation.client.address.province};
			}
		}

		if (!this.simulation.client.carDetails.licensingProvince){ 
			if(!this.simulation.client.address.province){
				this.simulation.client.carDetails.licensingProvince = new Province();
			}else{
				this.simulation.client.carDetails.licensingProvince = {... this.simulation.client.address.province};
			}
		}
			
    }

    onload() {
		this.initializeFields();
        this.loadRegistrationProvince();
        this.loadLicensingProvince();
        this.loadVehicleColor();
        this.loadVehicleOrigin();
    }

    
	loadRegistrationProvince() {
		let request: object = {};

		let result = this.appService.xSearchWithData('provinces/provinces', request)
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listRegistrationProvince = response.provinceList;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadLicensingProvince() {
		let request: object = {};
		let result = this.appService.xSearchWithData('provinces/provinces', request)
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listLicensingProvince = response.provinceList;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadVehicleColor() {
		let result = this.appService.xSearch('customerCardService', 'findAllCollor')
		result.subscribe(
			(data) => {
				let response = data.json();
				this.listVehicleColor = response.listColor;
			},
			err => {
				console.log(err.json());
			}
		);
	}

	loadVehicleOrigin() {
		this.listVehicleOrigin.push({value:'N',description:this._translate.instant('lb-national')});
		this.listVehicleOrigin.push({value:'I',description:this._translate.instant('lb-imported')});
	}


}