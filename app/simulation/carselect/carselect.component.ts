import { CarSelectService } from './service/carselect.service';
import { SimulationService } from './../simulation.service';
import { ObservableMedia } from '@angular/flex-layout';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AcessoriesOptionsDialog } from './../acessoriesOptionsDialog/acessoriesOptions.dialog';
import { AppService } from './../../app.service';
import { Car } from './../dto/Car.dto';
import { SaleType } from './../dto/SaleType.dto';
import { Simulation } from './../dto/Simulation.dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'carselect',
	templateUrl: 'app/simulation/carselect/carselect.html',
	styleUrls: [],
	providers: [CarSelectService]
})
export class CarselectComponent implements OnInit {

	@Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private appService: AppService, public dialog: MdDialog, public media: ObservableMedia, 
				private simulationService: SimulationService, private carSelectService: CarSelectService) { }

	ngOnInit() {
		this.carSelectService.init();
	}

	getUtilitarios(): Object[] {
		return this.carSelectService.utilitarios;
	}

	getSimulation(): Simulation {
		return this.carSelectService.simulation;
	}


	getCars(): Object[] {
		return this.carSelectService.cars;
	}

	getShowcar(): Boolean {
		return this.carSelectService.showcar;
	}


	carselect(car: Car) {
		this.carSelectService.showcar = false;

		if (this.getSimulation().car) {
			if (car.id === this.getSimulation().car.id && car.gender === this.getSimulation().car.gender) {
				return
			}else{
					this.getSimulation().step2CanNext=false;
			}
		}
		this.getSimulation().step2CanNext=true;
		this.getSimulation().car = car;
	}

	acessorios() {
		//aqui vai abrir a modal
		let dialogRef = this.dialog.open(AcessoriesOptionsDialog, { height: '90%', width: '75%' });
		dialogRef.componentInstance.simulation = this.getSimulation()
	}

	change(toFront: boolean) {
		this.changeStep.emit(toFront);
	}


}
