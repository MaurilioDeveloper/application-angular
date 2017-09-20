import { Car } from './../../dto/Car.dto';
import { Simulation } from './../../dto/Simulation.dto';
import { SimulationService } from './../../simulation.service';
import { AppService } from './../../../app.service';
import { Injectable } from '@angular/core';
import { StepEnum } from './../../step.enum';

@Injectable()
export class CarSelectService {

    simulation: Simulation;
    showcar: Boolean;
    cars: Array<Car>;
    utilitarios: Array<Car>;

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
        this.showcar = true;
        let buscacar = {};


        buscacar["vehicleType"] = "NOVO";
        let buscautilitarios = { ...buscacar };

        buscacar["vehicleGender"] = "PARTICULAR";
        buscautilitarios["vehicleGender"] = "UTILITARIO";

        if (this.simulation.car) {
            buscautilitarios["selected"] === this.simulation.car.id;
            buscacar["selected"] === this.simulation.car.id;
            this.simulation.step2CanNext = true;
        }

        let getBrand = this.appService.xSearchWithData('structureService/questDealershipBySallesmanUser', new Object);

        getBrand.subscribe(
            (data) => {
                let repbrand = data.json();
                buscacar["idBrand"] = repbrand.structure.brandVehicle;
                buscautilitarios["idBrand"] = repbrand.structure.brandVehicle;

                let carsget = this.appService.xSearchWithData('vehiculeModel/gender', buscacar);
                carsget.subscribe(
                    (data) => {
                        let response = data.json();
                        this.cars = this.getCarsWithGender(response.listVehicleModel, buscacar["vehicleGender"]);
                    },
                    err => {
                        console.log(err.json());
                    }
                );

                let utilget = this.appService.xSearchWithData('vehiculeModel/gender', buscautilitarios);
                utilget.subscribe(
                    (data) => {
                        let response = data.json();
                        this.utilitarios = this.getCarsWithGender(response.listVehicleModel, buscautilitarios["vehicleGender"]);
                    },
                    err => {
                        console.log(err.json());
                    }
                );
            });
    }


    getCarsWithGender(listVehicleModel: Array<object>, gender) {
        let listcar: Array<Car> = new Array();
        for (var i = 0; i < listVehicleModel.length; i++) {
            let result = listVehicleModel[i];
            //TODO:FOTOS estão em mock ainda tem que ver certinho como puxar
            let img = result['url'];
            if (img) {
                img = img[0];
            }
            let car = new Car(result['id'], result['description'], result['vehicleType'], img);
            car.gender = gender;
            if (this.simulation.car) {
                if (car.id === this.simulation.car.id && car.gender === this.simulation.car.gender) {
                    car.selected = true;
                    this.simulation.step2CanNext = true;
                }
            }
            listcar.push(car);
        }
        return listcar;
    }


}