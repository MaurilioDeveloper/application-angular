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
var salesman_dto_1 = require("./../../selected_salesman_dialog/dto/salesman.dto");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var selectedSalesman_dialog_1 = require("./../../selected_salesman_dialog/selectedSalesman.dialog");
var app_component_1 = require("./../../../app.component");
var auth_service_1 = require("./../../../login/auth.service");
var SalesmanStructure_dto_1 = require("./../../dto/SalesmanStructure.dto.");
var province_dto_1 = require("./../../../commons/province/dto/province.dto");
var app_service_1 = require("./../../../app.service");
var simulation_service_1 = require("./../../simulation.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../step.enum");
var FormClientService = /** @class */ (function () {
    function FormClientService(dialog, appService, authService, appComponent, router, simulationService) {
        this.dialog = dialog;
        this.appService = appService;
        this.authService = authService;
        this.appComponent = appComponent;
        this.router = router;
        this.simulationService = simulationService;
        this.SHOW_ROOM = 6;
        this.BRAND_CODE_NISSAN = '000000000003';
        this.BRAND_CODE_RENAULT = '000000000002';
        this.BRAND_CODE_RCI = '000000000006';
        this.BRAND_NISSAN = 'nissan';
        this.BRAND_RENAULT = 'renault';
        this.BRAND_RCI = 'rci';
        this.isUserAdmin = false;
        this.forceClose = false;
        this.router = router;
    }
    FormClientService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && _this.simulation.step == step_enum_1.StepEnum.STEP_CLIENT) {
                _this.onload();
            }
        });
    };
    FormClientService.prototype.onload = function () {
        this.loadSalesType();
        this.loadProvinces();
        if (!sessionStorage.getItem('salesman') && !this.simulation.vizualization) {
            this.verifyUser();
        }
    };
    FormClientService.prototype.loadSalesType = function () {
        var _this = this;
        var observable = this.appService.xSearch('simulation/salestype', this.simulation.saleType.id);
        observable.subscribe(function (data) {
            var response = data.json();
            response.listVehicleType.forEach(function (element) {
                if (!_this.simulation.saleType.id) {
                    if (element.value == _this.SHOW_ROOM) {
                        _this.simulation.saleType = element;
                    }
                }
                else {
                    if (_this.simulation.saleType.id === element.id) {
                        _this.simulation.saleType = element;
                    }
                }
            });
            _this.listSaleType = response.listVehicleType;
        }, function (err) {
            console.log(err.json());
        });
    };
    FormClientService.prototype.loadProvinces = function () {
        var _this = this;
        var states;
        var requestProvince = new Object;
        if (this.simulation.id) {
            requestProvince['selected'] = this.simulation.client.address.province;
        }
        states = this.appService.xSearchWithData("provinces/provincesclient", requestProvince);
        states.subscribe(function (data) {
            var stateSelected;
            var response = data.json();
            _this.listProvinces = new Array();
            for (var i = 0; i < response.provinceList.length; i++) {
                var provincefor = response.provinceList[i];
                // let province = new Province(provincefor['id'], provincefor['description']);
                var province = new province_dto_1.Province();
                province.id = provincefor['id'];
                province.description = provincefor['description'];
                if (response.provinceSelected) {
                    if (response.provinceSelected.id === provincefor['id']) {
                        _this.simulation.client.address.province = province;
                    }
                }
                _this.listProvinces.push(province);
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    FormClientService.prototype.loadStructureSalesman = function () {
        var _this = this;
        var observable = this.appService.xSearchWithData('structureService/questDealershipBySallesmanUser', {});
        observable.subscribe(function (data) {
            var response = data.json();
            var structure = response.structure;
            if (!_this.simulation.salesmanStructure) {
                _this.simulation.salesmanStructure = new SalesmanStructure_dto_1.SalesmanStructure;
            }
            if (structure != null) {
                _this.authService.setStructure(response.structure.structureId);
                _this.simulation.salesmanStructure.structureId = structure.structureId != null ? structure.structureId : '';
                _this.simulation.salesmanStructure.structureDescription = structure.description;
                var item = {};
                var theme = "";
                var oldtheme = _this.appComponent.theme;
                _this.authService.setOldTheme(oldtheme);
                if (structure.financeBrandImportCode == _this.BRAND_CODE_NISSAN) {
                    theme = _this.BRAND_NISSAN;
                }
                else if (structure.financeBrandImportCode == _this.BRAND_CODE_RENAULT) {
                    theme = _this.BRAND_RENAULT;
                }
                else if (structure.financeBrandImportCode == _this.BRAND_CODE_RCI) {
                    theme = _this.BRAND_RCI;
                }
                item["value"] = theme;
                _this.appComponent.changeTheme(item);
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    FormClientService.prototype.verifyUser = function () {
        var _this = this;
        var observable = this.appService.xSearch('userProfile', 'verifyuseradmin');
        observable.subscribe(function (data) {
            var response = data.json();
            _this.isUserAdmin = response.userAdmin;
            if (_this.isUserAdmin && !_this.simulation.id) {
                if (!_this.dialogRef) {
                    _this.dialogRef = _this.dialog.open(selectedSalesman_dialog_1.SelectedSalesmanDialog);
                    _this.dialogRef.afterClosed().subscribe(function () {
                        if (!_this.forceClose) {
                            if (!sessionStorage.getItem('salesman')) {
                                _this.router.navigateByUrl('/home');
                            }
                            else {
                                var salesman = JSON.parse(sessionStorage.getItem('salesman'));
                                _this.simulation.salesmanStructure = new SalesmanStructure_dto_1.SalesmanStructure;
                                _this.simulation.salesmanStructure.salesmanId = salesman.id;
                                _this.simulation.salesmanStructure.salesmanName = salesman.name;
                                _this.loadProvinces();
                                _this.loadStructureSalesman();
                            }
                        }
                    });
                }
            }
            else {
                if (_this.isUserAdmin && _this.simulation.id) {
                    _this.loadSallamen();
                }
                _this.loadStructureSalesman();
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    FormClientService.prototype.loadSallamen = function () {
        var _this = this;
        var observable = this.appService.xSearch('simulation/salesman', this.simulation.id);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.authService.setSalesMan(new salesman_dto_1.Salesman(response.salesman.id, response.salesman.name));
            var salesman = JSON.parse(sessionStorage.getItem('salesman'));
            _this.simulation.salesmanStructure = new SalesmanStructure_dto_1.SalesmanStructure;
            _this.simulation.salesmanStructure.salesmanId = salesman.id;
            _this.simulation.salesmanStructure.salesmanName = salesman.name;
        });
    };
    FormClientService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [material_1.MdDialog, app_service_1.AppService, auth_service_1.AuthService, app_component_1.AppComponent, router_1.Router, simulation_service_1.SimulationService])
    ], FormClientService);
    return FormClientService;
}());
exports.FormClientService = FormClientService;
//# sourceMappingURL=form-client.service.js.map