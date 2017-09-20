import { SimulationService } from './../simulation.service';
import { Calculation } from './../dto/Calculation.dto';
import { CalculationDialog } from './calculationDialog/calculationDialog.dialog';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AppService } from './../../app.service';
import { Simulation } from './../dto/Simulation.dto';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StepEnum } from './../step.enum';

@Component({
	selector: 'calculationpainel',
	templateUrl: 'app/simulation/calculationPainel/calculationPainel.component.html',
	styleUrls: []
})
export class CalculationPainelComponent implements OnInit {

	private varBtnMarca: string = 'keyboard_arrow_up';
	private varBtnDrop: string = 'keyboard_arrow_down';
	private drop: boolean = false;
	private drop2: boolean = false;
	public dialogRef: MdDialogRef<CalculationDialog>;

	private browser;
	private forceClose = false;


	simulation: Simulation;
	@Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private appService: AppService, public dialog: MdDialog, private simulationService: SimulationService) { }

	ngOnInit() {
		this.simulationService.load.subscribe((simulation: Simulation) => {

			this.simulation = simulation;
			if (this.simulation && this.simulation.step == StepEnum.STEP_SIMULATION) {
				this.onload();
				console.log(this.simulation);
			}
		});
	}

	private onload() {
		var ua = window.navigator.userAgent;
		var firefox = ua.indexOf('Firefox');

		if (firefox > 0) {
			// IE 10 or older => return version number
			this.browser = "firefox";
		}

		if (!this.simulation.calculations || this.simulation.calculations.length === 0) {
			this.simulation.calculations = [new Calculation];
			this.getProposalQuantity();
		} else {
			// libera botao
			this.simulation.step3CanNext = true;
			this.openCalculationDialog(this.simulation.calculations.length);
		}

	}


	getProposalQuantity() {
		let observable = this.appService.xSearch('userProfile', 'proposalquantity');
		observable.subscribe(
			(data) => {
				let response = data.json();
				let qtaCalc = response.proposalQuantity;
				if (this.simulation.calculations && this.simulation.calculations.length > 1) {
					qtaCalc = this.simulation.calculations.length;
				}
				this.openCalculationDialog(qtaCalc);
			},
			err => {
				console.log(err.json());
			}
		);
	}

	openCalculationDialog(qta) {
		let dialogRef = this.dialog.open(CalculationDialog, { panelClass: 'calculation', width: '100%', height: '88%' });
		dialogRef.componentInstance.simulation = this.simulation;
		dialogRef.componentInstance.calculationqta = qta;
		dialogRef.afterClosed().subscribe(result => {
			if (!this.forceClose) {
				// fazer um for para verificar se foi contrata alguma simulacao
				let haveSelected = false;
				if (this.simulation.calculationSelected) {
					this.simulation.step3CanNext = true;
				} else {
					this.changeStep.emit(false);
				}
			}
		});
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

	hide() {
		if (this.drop2) {
			this.drop2 = false;
			this.varBtnDrop = 'keyboard_arrow_down';
		} else {
			this.drop2 = true;
			this.varBtnDrop = 'keyboard_arrow_up';

		}
	}

	change(go: boolean) {
		this.changeStep.emit(go);
	}


	ngOnDestroy() {
		if (this.dialogRef) {
			this.forceClose = true;
			this.dialogRef.close();
		}
	}





}