import { SimulationService } from './../simulation.service';
import { AppComponent } from './../../app.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Simulation } from './../dto/Simulation.dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'simulationInfo',
	templateUrl: 'app/simulation/simulationinfo/simulationInfo.component.html',
})
export class SimulationInfoComponent implements OnInit {
	simulation: Simulation;
	private varBtnMarca: string = 'keyboard_arrow_up';
	private varBtnDrop: string = 'keyboard_arrow_up';
	private drop: boolean = false;

	constructor(public dialog: MdDialog, public appComponent: AppComponent, private simulationService: SimulationService) { }


	ngOnInit() {
		this.simulationService.load.subscribe(( simulation: Simulation ) => {
			this.simulation = simulation;
            if(this.simulation){
			    this.onload();
            }
        });  
	}

	private onload(){

	}

	clicked() {
		if (this.drop) {
			this.drop = false;
			this.varBtnMarca = 'keyboard_arrow_down';
		} else {
			this.drop = true;
			this.varBtnMarca = 'keyboard_arrow_up';
		}
	}
	
}

