"use strict";
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
var app_service_1 = require("./../../../app.service");
var Acessorio_dto_1 = require("./../../dto/Acessorio.dto");
var SpecialType_dto_1 = require("./../../dto/SpecialType.dto");
var Brand_dto_1 = require("./../../dto/Brand.dto");
var Version_dto_1 = require("./../../dto/Version.dto");
var Car_dto_1 = require("./../../dto/Car.dto");
var simulation_service_1 = require("./../../simulation.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../step.enum");
var NewOnesService = /** @class */ (function () {
    function NewOnesService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
        this.subtotalAccessories = 0;
        this.total = 0;
    }
    NewOnesService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && _this.simulation.step == step_enum_1.StepEnum.STEP_VEHICLE) {
                _this.onload();
            }
        });
    };
    NewOnesService.prototype.onload = function () {
        if (!this.simulation.car) {
            this.simulation.car = new Car_dto_1.Car('', '', 'USADO', '');
            this.simulation.car.version = new Version_dto_1.Version();
            this.simulation.brand = new Brand_dto_1.Brand();
            this.simulation.specialTypes = new Array();
            this.simulation.car.version.acessories == new Array();
        }
        else {
            var yearmodel = this.simulation.car.version.yearModel;
            this.loadManufactureYears(yearmodel);
            var yearManufacture = this.simulation.car.version.yearManufacture;
            this.recalAcessorios();
        }
        this.simulation.brand.showDirectSale = false;
        if (!this.simulation.id) {
            this.simulation.isShowRoomSemiNews = true;
        }
        this.acessorio = new Acessorio_dto_1.Acessorio();
        this.loadBrands();
        this.loadSpecialTypes();
    };
    NewOnesService.prototype.loadSpecialTypes = function () {
        var _this = this;
        var buscaSepcial = {};
        var specialget = this.appService.xSearchWithData('specialtypes', buscaSepcial);
        specialget.subscribe(function (data) {
            var response = data.json();
            _this.specialTypes = new Array();
            for (var i = 0; i < response.specialTypes.length; i++) {
                var type = new SpecialType_dto_1.SpecialType();
                type.id = response.specialTypes[i].specialTypeId;
                type.description = response.specialTypes[i].description;
                _this.specialTypes.push(type);
                if (_this.simulation.specialTypes) {
                    for (var a = 0; a < _this.simulation.specialTypes.length; a++) {
                        if (_this.specialTypes[i].id === _this.simulation.specialTypes[a]["id"]) {
                            _this.specialTypes[i] = _this.simulation.specialTypes[a];
                        }
                    }
                }
            }
        });
    };
    NewOnesService.prototype.loadBrands = function () {
        var _this = this;
        var params = {};
        params['vehicleType'] = 'USADO';
        var observable = this.appService.xSearchWithData('vehicleBrand/brandsold', params);
        observable.subscribe(function (data) {
            _this.listVehicleBrand = new Array();
            var response = data.json();
            response.listVehicleBrand.forEach(function (brand) {
                if (brand.id === _this.simulation.brand.id) {
                    brand = _this.simulation.brand;
                    _this.loadModels(brand);
                }
                _this.listVehicleBrand.push(brand);
            });
        }, function (err) {
            console.log(err.json());
        });
    };
    NewOnesService.prototype.loadModels = function (newValue) {
        var _this = this;
        if (newValue.id) {
            var object = new Object;
            object["idBrand"] = newValue.id;
            object["vehicleType"] = "USADO";
            var observable = this.appService.xSearchWithData('vehiculeModel/modelsold', object);
            observable.subscribe(function (data) {
                _this.listVehicleModel = new Array();
                var response = data.json();
                response.listVehicleModel.forEach(function (model) {
                    if (model.id === _this.simulation.car.id) {
                        model = _this.simulation.car;
                        _this.loadVersions(model);
                    }
                    _this.listVehicleModel.push(model);
                });
            }, function (err) {
                console.log(err.json());
            });
        }
    };
    NewOnesService.prototype.loadVersions = function (newValue) {
        var _this = this;
        if (!this.simulation.car.version) {
            this.simulation.car.version = new Version_dto_1.Version();
        }
        console.log(this.simulation.car);
        var object = new Object;
        object["modelId"] = newValue['id'];
        object["vehicleType"] = "USADO";
        var observable = this.appService.xSearchWithData('vehicleVersion', object);
        observable.subscribe(function (data) {
            _this.listVehicleVersion = new Array();
            var response = data.json();
            response.vehicleVersionDtoList.forEach(function (version) {
                if (_this.simulation.car.version && version.id === _this.simulation.car.version.id) {
                    version = _this.simulation.car.version;
                    _this.loadModelYears(_this.simulation.car.version);
                }
                _this.listVehicleVersion.push(version);
            });
        }, function (err) {
            console.log(err.json());
        });
    };
    NewOnesService.prototype.loadModelYears = function (newValue) {
        var _this = this;
        this.simulation.car.version = newValue;
        this.simulation.car.gender = newValue.gender;
        this.simulation.isShowRoomSemiNews = true;
        if (newValue) {
            var object = new Object;
            object["fipe"] = newValue['fipe'];
            object["description"] = newValue['description'];
            object["vehicleType"] = "USADO";
            var observable = this.appService.xSearchWithData('vehicleVersion/years', object);
            observable.subscribe(function (data) {
                _this.versionYears = new Array;
                var response = data.json();
                response.modelYears.forEach(function (year) {
                    if (_this.simulation.car.version.yearModel === year) {
                        year = _this.simulation.car.version.yearModel;
                        _this.versionYears.push(year);
                    }
                    else {
                        _this.versionYears.push(year);
                    }
                });
            }, function (err) {
                console.log(err.json());
            });
        }
    };
    NewOnesService.prototype.loadManufactureYears = function (newValue) {
        this.simulation.car.version.yearModel = newValue;
        this.manufactreYears = new Array();
        if (this.simulation.car.version.yearManufacture === newValue) {
            this.manufactreYears.push(this.simulation.car.version.yearManufacture);
            this.manufactreYears.push(newValue - 1);
        }
        else if (this.simulation.car.version.yearManufacture === newValue - 1) {
            this.manufactreYears.push(newValue);
            this.manufactreYears.push(this.simulation.car.version.yearManufacture);
        }
        else {
            this.manufactreYears.push(newValue - 1);
            this.manufactreYears.push(newValue);
        }
    };
    NewOnesService.prototype.recalAcessorios = function () {
        var _this = this;
        this.subtotalAccessories = 0;
        if (this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories.forEach(function (acess) {
                console.log(acess);
                _this.subtotalAccessories = _this.subtotalAccessories + acess.value;
            });
        }
        this.recalcT();
    };
    NewOnesService.prototype.addAcessorio = function (acessorio) {
        if (!this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories = new Array();
        }
        var valor = acessorio.value.toString().replace("R$ ", "");
        acessorio.value = parseFloat(valor);
        this.simulation.car.version.acessories.push(acessorio);
        this.acessorio = new Acessorio_dto_1.Acessorio();
        this.recalAcessorios();
    };
    NewOnesService.prototype.delAcessorio = function (acessorio) {
        var index = this.simulation.car.version.acessories.indexOf(acessorio);
        if (index !== -1) {
            this.simulation.car.version.acessories.splice(index, 1);
        }
        this.recalAcessorios();
    };
    NewOnesService.prototype.recalcT = function () {
        this.total = parseFloat(this.subtotalAccessories.toFixed(2)) + this.simulation.car.version.price;
    };
    NewOnesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], NewOnesService);
    return NewOnesService;
}());
exports.NewOnesService = NewOnesService;
//# sourceMappingURL=new-ones.service.js.map