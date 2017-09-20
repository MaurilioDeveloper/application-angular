"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Car_dto_1 = require("./../../dto/Car.dto");
var simulation_service_1 = require("./../../simulation.service");
var app_service_1 = require("./../../../app.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../step.enum");
var CarSelectService = /** @class */ (function () {
    function CarSelectService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
    }
    CarSelectService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && _this.simulation.step == step_enum_1.StepEnum.STEP_VEHICLE) {
                _this.onload();
            }
        });
    };
    CarSelectService.prototype.onload = function () {
        var _this = this;
        this.showcar = true;
        var buscacar = {};
        buscacar["vehicleType"] = "NOVO";
        var buscautilitarios = __assign({}, buscacar);
        buscacar["vehicleGender"] = "PARTICULAR";
        buscautilitarios["vehicleGender"] = "UTILITARIO";
        if (this.simulation.car) {
            buscautilitarios["selected"] === this.simulation.car.id;
            buscacar["selected"] === this.simulation.car.id;
            this.simulation.step2CanNext = true;
        }
        var getBrand = this.appService.xSearchWithData('structureService/questDealershipBySallesmanUser', new Object);
        getBrand.subscribe(function (data) {
            var repbrand = data.json();
            buscacar["idBrand"] = repbrand.structure.brandVehicle;
            buscautilitarios["idBrand"] = repbrand.structure.brandVehicle;
            var carsget = _this.appService.xSearchWithData('vehiculeModel/gender', buscacar);
            carsget.subscribe(function (data) {
                var response = data.json();
                _this.cars = _this.getCarsWithGender(response.listVehicleModel, buscacar["vehicleGender"]);
            }, function (err) {
                console.log(err.json());
            });
            var utilget = _this.appService.xSearchWithData('vehiculeModel/gender', buscautilitarios);
            utilget.subscribe(function (data) {
                var response = data.json();
                _this.utilitarios = _this.getCarsWithGender(response.listVehicleModel, buscautilitarios["vehicleGender"]);
            }, function (err) {
                console.log(err.json());
            });
        });
    };
    CarSelectService.prototype.getCarsWithGender = function (listVehicleModel, gender) {
        var listcar = new Array();
        for (var i = 0; i < listVehicleModel.length; i++) {
            var result = listVehicleModel[i];
            //TODO:FOTOS estão em mock ainda tem que ver certinho como puxar
            var img = result['url'];
            if (img) {
                img = img[0];
            }
            var car = new Car_dto_1.Car(result['id'], result['description'], result['vehicleType'], img);
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
    };
    CarSelectService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], CarSelectService);
    return CarSelectService;
}());
exports.CarSelectService = CarSelectService;
//# sourceMappingURL=carselect.service.js.map