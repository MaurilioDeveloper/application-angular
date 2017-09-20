import { AppService } from './../../../app.service';
import { Acessorio } from './../../dto/Acessorio.dto';
import { SpecialType } from './../../dto/SpecialType.dto';
import { Brand } from './../../dto/Brand.dto';
import { Version } from './../../dto/Version.dto';
import { Car } from './../../dto/Car.dto';
import { Simulation } from './../../dto/Simulation.dto';
import { SimulationService } from './../../simulation.service';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../step.enum';


@Injectable()
export class NewOnesService {

    simulation: Simulation;

    listVehicleBrand: Array<Brand>;
    listVehicleModel: Array<Car>;
    listVehicleVersion: Array<Version>;
    versionYears: Array<number>;
    manufactreYears: Array<number>;
    specialTypes: Array<SpecialType>;
    acessorio: Acessorio;
    subtotalAccessories: number = 0;
    total: number = 0;

    constructor(private appService: AppService, private simulationService: SimulationService) {
    }

    init() {
        this.simulationService.load.subscribe((simulation: Simulation) => {
            this.simulation = simulation;
            if (this.simulation && this.simulation.step == StepEnum.STEP_VEHICLE) {
                this.onload();
            }
        });
    }

    private onload() {
        if (!this.simulation.car) {
            this.simulation.car = new Car('', '', 'USADO', '');
            this.simulation.car.version = new Version();
            this.simulation.brand = new Brand();
            this.simulation.specialTypes = new Array<SpecialType>();
            this.simulation.car.version.acessories == new Array<Acessorio>();
        } else {
            let yearmodel = this.simulation.car.version.yearModel;
            this.loadManufactureYears(yearmodel);
            let  yearManufacture = this.simulation.car.version.yearManufacture;
            this.recalAcessorios();
        }
        this.simulation.brand.showDirectSale = false;

        if (!this.simulation.id) {
            this.simulation.isShowRoomSemiNews = true;
        }
        this.acessorio = new Acessorio();
        this.loadBrands();
        this.loadSpecialTypes();
    }



    loadSpecialTypes() {
        let buscaSepcial = {};
        let specialget = this.appService.xSearchWithData('specialtypes', buscaSepcial);
        specialget.subscribe(
            (data) => {
                let response = data.json();
                this.specialTypes = new Array();
                for (var i = 0; i < response.specialTypes.length; i++) {
                    let type: SpecialType = new SpecialType();
                    type.id = response.specialTypes[i].specialTypeId;
                    type.description = response.specialTypes[i].description;
                    this.specialTypes.push(type);

                    if (this.simulation.specialTypes) {
                        for (var a = 0; a < this.simulation.specialTypes.length; a++) {
                            if (this.specialTypes[i].id === this.simulation.specialTypes[a]["id"]) {
                                this.specialTypes[i] = this.simulation.specialTypes[a];
                            }
                        }
                    }
                }
            });
    }

    loadBrands() {
        let params = {};
        params['vehicleType'] = 'USADO';
        let observable = this.appService.xSearchWithData('vehicleBrand/brandsold', params);
        observable.subscribe(
            (data) => {
                this.listVehicleBrand = new Array();
                let response = data.json();
                response.listVehicleBrand.forEach(brand => {
                    if (brand.id === this.simulation.brand.id) {
                        brand = this.simulation.brand;
                        this.loadModels(brand)
                    }
                    this.listVehicleBrand.push(brand);
                });
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadModels(newValue) {
        if (newValue.id) {
            let object = new Object;
            object["idBrand"] = newValue.id;
            object["vehicleType"] = "USADO";
            let observable = this.appService.xSearchWithData('vehiculeModel/modelsold', object);
            observable.subscribe(
                (data) => {
                    this.listVehicleModel = new Array();
                    let response = data.json();
                    response.listVehicleModel.forEach(model => {
                        if (model.id === this.simulation.car.id) {
                            model = this.simulation.car;
                            this.loadVersions(model);
                        }
                        this.listVehicleModel.push(model);
                    });
                },
                err => {
                    console.log(err.json());
                }
            );
        }
    }

    loadVersions(newValue) {
        if (!this.simulation.car.version) {
            this.simulation.car.version = new Version();
        }
        console.log(this.simulation.car);
        let object = new Object;
        object["modelId"] = newValue['id'];
        object["vehicleType"] = "USADO";
        let observable = this.appService.xSearchWithData('vehicleVersion', object);
        observable.subscribe(
            (data) => {
                this.listVehicleVersion = new Array();
                let response = data.json();
                response.vehicleVersionDtoList.forEach(version => {
                    if (this.simulation.car.version && version.id === this.simulation.car.version.id) {
                        version = this.simulation.car.version;
                        this.loadModelYears(this.simulation.car.version);
                    }
                    this.listVehicleVersion.push(version);
                });
            },
            err => {
                console.log(err.json());
            }
        );
    }

    loadModelYears(newValue) {
        this.simulation.car.version = newValue;
        this.simulation.car.gender = newValue.gender;
        this.simulation.isShowRoomSemiNews = true;
        if (newValue) {
            let object = new Object;
            object["fipe"] = newValue['fipe'];
            object["description"] = newValue['description'];
            object["vehicleType"] = "USADO";

            let observable = this.appService.xSearchWithData('vehicleVersion/years', object);
            observable.subscribe(
                (data) => {
                    this.versionYears = new Array;
                    let response = data.json();
                    response.modelYears.forEach(year => {
                        if (this.simulation.car.version.yearModel === year) {
                            year = this.simulation.car.version.yearModel;
                            this.versionYears.push(year);
                        } else {
                            this.versionYears.push(year);
                        }
                    });

                },
                err => {
                    console.log(err.json());
                }
            );
        }
    }



    loadManufactureYears(newValue) {
        this.simulation.car.version.yearModel = newValue;
        this.manufactreYears = new Array();
        if (this.simulation.car.version.yearManufacture === newValue) {
            this.manufactreYears.push(this.simulation.car.version.yearManufacture);
            this.manufactreYears.push(newValue - 1);
        } else if (this.simulation.car.version.yearManufacture === newValue - 1) {
            this.manufactreYears.push(newValue);
            this.manufactreYears.push(this.simulation.car.version.yearManufacture);
        } else {
            this.manufactreYears.push(newValue - 1);
            this.manufactreYears.push(newValue);
        }
    }

    recalAcessorios() {
        this.subtotalAccessories = 0;
        if (this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories.forEach(acess => {
                console.log(acess)
                this.subtotalAccessories = this.subtotalAccessories + acess.value;
            });
        }
        this.recalcT();

    }

    addAcessorio(acessorio: Acessorio) {
        if (!this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories = new Array<Acessorio>();
        }
        let valor = acessorio.value.toString().replace("R$ ", "");
        acessorio.value = parseFloat(valor);
        this.simulation.car.version.acessories.push(acessorio);
        this.acessorio = new Acessorio();
        this.recalAcessorios();
    }


    delAcessorio(acessorio: Acessorio) {
        let index: number = this.simulation.car.version.acessories.indexOf(acessorio);
        if (index !== -1) {
            this.simulation.car.version.acessories.splice(index, 1);
        }
        this.recalAcessorios();
    }

    recalcT() {
        this.total = parseFloat(this.subtotalAccessories.toFixed(2)) + this.simulation.car.version.price;
    }

}
