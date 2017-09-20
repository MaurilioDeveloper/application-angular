import { SimulationService } from './../../simulation.service';
import { AppComponent } from './../../../app.component';
import { Simulation } from './../../dto/Simulation.dto';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'resum-mobile',
	templateUrl: 'app/simulation/mobile/resum/resum.component.html',
})
export class ResumMobileComponent implements OnInit {
	simulation: Simulation;
	private drop: boolean = false;

	constructor(public appComponent: AppComponent, private simulationService: SimulationService) { }


	ngOnInit() {
		 this.simulationService.load.subscribe(( simulation: Simulation ) => {
			this.onload(simulation);
        }); 
		
	}
	private onload(simulation: Simulation){
        this.simulation = simulation;
	}
	
	clickedResum () {
		if (this.drop) {
			this.drop = false;
			this.simulation.showResumMobile = false;
		}else{
			this.drop = true;
			this.simulation.showResumMobile = true;
		}
	}

}

