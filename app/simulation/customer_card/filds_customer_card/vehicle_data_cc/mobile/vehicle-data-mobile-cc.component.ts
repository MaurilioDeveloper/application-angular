import { VehicleDataService } from './../service/vehicle-data.service';
import { Province } from './../../../../../commons/province/dto/province.dto';
import { Simulation } from './../../../../dto/Simulation.dto';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
	selector: 'vehicle-data-mobile',
	templateUrl: 'app/simulation/customer_card/filds_customer_card/vehicle_data_cc/mobile/vehicle-data-mobile-cc.component.html',
	providers: [VehicleDataService]
})
export class VehicleDataCustomerMobileComponent implements OnInit {

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
		if (!this.conf) {
			this.countClient.emit();
			this.conf = true;
		}
		this.controlDynamicStepsIn = 9;
		this.getSimulation().step++;
		this.controlDynamicStepsM.emit(this.controlDynamicStepsIn);
	}

}