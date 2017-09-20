import { SimulationService } from './../simulation.service';
import { HostListener } from '@angular/core';
import { AppMessage } from './../../app.message';
import { SpecialType } from './../dto/SpecialType.dto';
import { Version } from './../dto/Version.dto';
import { AppService } from './../../app.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Simulation } from './../dto/Simulation.dto';
import { Component, Input, OnInit } from '@angular/core';
import { StepEnum } from './../step.enum';

@Component({
	selector: 'listversion',
	templateUrl: 'app/simulation/listversion/listversion.component.html',
	styleUrls: []
})
export class ListVersionComponent implements OnInit  {
	
	simulation: Simulation;
	constructor(private appService: AppService,private appMessage :AppMessage, private simulationService: SimulationService) { }

	specialTypes:  Array<SpecialType> = new Array;
	versions: Array<Version>;
	verselect: Version;

	yearManu: Array<number>;
	yearSelect: number;

	versionsYears: Array<Version>;
	versionSelected: Version = new Version;
	valueSelect: number;


	ngOnInit() {
        this.simulationService.load.subscribe(( simulation: Simulation ) => {
			this.simulation = simulation;
            if(this.simulation && this.simulation.step == StepEnum.STEP_VEHICLE){
			    this.onload();
            }
        });  
	}

	private onload(){
		let buscaver = {};
		buscaver["vehicleType"] = "NOVO";
		buscaver["modelId"] = this.simulation.car.id;

		let buscaSepcial = {};
		if (this.simulation.specialTypes) {
			buscaSepcial['selected'] = [];
			for (var i = 0; i < this.simulation.specialTypes.length; i++) {
				buscaSepcial['selected'].push(this.simulation.specialTypes[i].id);
			}
		}

		let specialget = this.appService.xSearchWithData('specialtypes', buscaSepcial);
		specialget.subscribe(
			(data) => {
				let listver: Array<Version> = new Array();
				let response = data.json();
				for (var i = 0; i < response.specialTypes.length; i++) {
					let type: SpecialType = new SpecialType();
					type.id = response.specialTypes[i].specialTypeId;
					type.description = response.specialTypes[i].description;
					this.specialTypes.push(type);
					if(response.selected != null){
						for (var a = 0; a < response.selected.length; a++) {
							if (this.specialTypes[i].id === response.selected[a]["specialTypeId"]) {
								this.simulation.specialTypes.push(type);
							}
						}
					}
				}
			});

		let carsget = this.appService.xSearchWithData('vehicleVersion', buscaver);
		carsget.subscribe(
			(data) => {
				let listver: Array<Version> = new Array();
				let response = data.json();

				for (var i = 0; i < response.vehicleVersionDtoList.length; i++) {
					let vehicleVer = response.vehicleVersionDtoList[i];
					let ver: Version = new Version;
					ver.description = vehicleVer["description"];
					ver.fipe = vehicleVer["fipe"];
					listver.push(ver);
				}
				this.versions = listver;
				this.loadVersion(this.versions[0])
			},
			err => {
				console.log(err.json());
			}
		);

	}


	changeVersion($event) {
		this.loadVersion($event.value);
	} 


	loadVersion(version : Version){
		this.verselect = version;
		let buscaManuYear = {};
		buscaManuYear["description"] = this.verselect.description;
		buscaManuYear["fipe"] = this.verselect.fipe;
		buscaManuYear["vehicleType"] = "NOVO";
		let yearsManuget = this.appService.xSearchWithData('vehicleVersion/manufactureYears', buscaManuYear);

		yearsManuget.subscribe(
			(data) => {
				let listyear: Array<number> = new Array();
				let response = data.json();

				for (var i = 0; i < response.manufactureYears.length; i++) {
					let vehicleVer = response.manufactureYears[i];
					listyear.push(vehicleVer);
				}
				this.yearManu = listyear;
				this.yearSelect = this.yearManu[this.yearManu.length - 1];
				this.changeManuYear(this.yearSelect);
			},
			err => {
				console.log(err.json());
			}
		);
	}

	changeManuYear(newValue) {
		let buscaModelYear = {};
		buscaModelYear["description"] = this.verselect.description;
		buscaModelYear["fipe"] = this.verselect.fipe;
		buscaModelYear["vehicleType"] = "NOVO";
		buscaModelYear["manufactureYear"] = this.yearSelect;
		let yearsManuget = this.appService.xSearchWithData('vehicleVersion/modelYears', buscaModelYear);

		yearsManuget.subscribe(
			(data) => {
				let listyear: Array<Version> = new Array();
				let response = data.json();
				
				for (var i = 0; i < response.modelYears.length; i++) {
					let vehicleVer = response.modelYears[i];
					let ver: Version = new Version;
					ver.id = vehicleVer["versionId"];
					ver.description = this.verselect.description;
					ver.fipe = this.verselect.fipe;
					ver.yearManufacture = this.yearSelect;
					ver.yearModel = vehicleVer["yearModel"];
					ver.url = this.verselect.url;
					listyear.push(ver);
				}
				this.versionsYears = listyear;
				this.versionSelected = this.versionsYears[this.versionsYears.length - 1];
				this.getValue(this.versionSelected);
			},
			err => {
				console.log(err.json());
			}
		);

	}



	getValue(newValue) {

		let valueGet = this.appService.xSearch('vehiculePrice', this.versionSelected.id);

		valueGet.subscribe(
			(data) => {
				let listyear: Array<Version> = new Array();
				let response = data.json();
				let value = response.vehiclePriceDTO;
				if(!value || value === null){
					//Veiculo esta sem preço 
 					this.appMessage.showError("Este veiculo nas configurações selecionadas não tem preço definido");
					return;

				}
				this.valueSelect = value["amount"];
				this.versionSelected.price = this.valueSelect;
				this.simulation.car.version = this.versionSelected;
			},
			err => {
				console.log(err.json());
			}
		);
		
	}

}
