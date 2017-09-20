import { VehicleDataService } from './service/vehicle-data.service';
import { SimulationService } from './../../../simulation.service';
import { CarDetails } from './../../../dto/client/CarDetails.dto';
import { TranslateService } from './../../../../translate/translate.service';
import { Province } from './../../../../commons/province/dto/province.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Simulation } from './../../../dto/Simulation.dto';

import { AppService } from './../../../../app.service';

import { AppMessage } from './../../../../app.message';

import { Client } from './../../../dto/Client.dto';

@Component({
	selector: 'vehicle-data-cc',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/vehicle_data_cc/vehicle_data_cc.component.html',
	providers: [VehicleDataService]
})
export class VehicleDataCustomerCardComponent implements OnInit {

	@Input() controlDynamicStepsIn: number;
	@Output() countClient: EventEmitter<number> = new EventEmitter<number>();
	@Output() controlDynamicStepsM: EventEmitter<number> = new EventEmitter<number>();
	

	province: Province;

	conf: boolean = false;

	constructor(private vehicleDataService: VehicleDataService) {
	}

	ngOnInit() {
		this.vehicleDataService.init();
	}

	getSimulation(): Simulation {
		return this.vehicleDataService.simulation;
	}

	getListRegistrationProvince(): Object[] {
		return this.vehicleDataService.listRegistrationProvince;
	}

	getListLicensingProvince(): Object[] {
		return this.vehicleDataService.listLicensingProvince;
	}

	getListVehicleColor(): Object[] {
		return this.vehicleDataService.listVehicleColor;
	}

	getListVehicleOrigin(): Object[] {
		return this.vehicleDataService.listVehicleOrigin;
	}

	nextStep() {
		if(!this.conf){
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 9;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}