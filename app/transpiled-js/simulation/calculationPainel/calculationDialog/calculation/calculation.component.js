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
var simulation_service_1 = require("./../../../simulation.service");
var flex_layout_1 = require("@angular/flex-layout");
var Coefficient_dto_1 = require("./../../../dto/Coefficient.dto");
var Installment_dto_1 = require("./../../../dto/Installment.dto");
var installments_dialog_1 = require("./installmentsDialog/installments.dialog");
var Commission_dto_1 = require("./../../../dto/Commission.dto");
var FinancialTable_dto_1 = require("./../../../dto/FinancialTable.dto");
var FinancialType_dto_1 = require("./../../../dto/FinancialType.dto");
var servicesDialog_dialog_1 = require("./servicesDialog/servicesDialog.dialog");
var material_1 = require("@angular/material");
var Calculation_dto_1 = require("./../../../dto/Calculation.dto");
var app_service_1 = require("./../../../../app.service");
var core_1 = require("@angular/core");
var Client_dto_1 = require("../../../dto/Client.dto");
var app_message_1 = require("../../../../app.message");
var step_enum_1 = require("./../../../step.enum");
var CalculationComponent = /** @class */ (function () {
    function CalculationComponent(appService, appMessage, dialog, media, simulationService) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.dialog = dialog;
        this.media = media;
        this.simulationService = simulationService;
        this.contratado = new core_1.EventEmitter();
        this.compare = new core_1.EventEmitter();
        this.showDetailSimulation = new core_1.EventEmitter();
        this.entranceValue = 0;
        this.entrancePerc = 0;
        this.minEntrace = 0;
        this.minPerEntrace = 0;
        this.maxEntrace = 9999999999;
        this.maxPerEntrace = 100;
        this.total_tax = 0;
        this.total_finc = 0;
        this.total_parc = 0;
        this.customer_rate = 0;
        this.commisionList = new Array();
        this.commisionSelected = new Commission_dto_1.Commission;
        this.financialTypeSelected = new FinancialType_dto_1.FinancialType;
        this.financialTypeList = new Array();
        this.financialTableSelected = new FinancialTable_dto_1.FinancialTable;
        this.financialTableList = new Array();
        this.delayList = new Array();
        this.repackageList = new Array();
        this.termList = new Array();
        this.taxType = new Array();
        this.calculationSelected = false;
        this.showRepackage = false;
        this.coeficient = new Coefficient_dto_1.Coefficient;
    }
    CalculationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && _this.simulation.step == step_enum_1.StepEnum.STEP_SIMULATION) {
                _this.onload();
            }
        });
    };
    CalculationComponent.prototype.onload = function () {
        if (this.enable) {
            this.initCalc();
        }
        if (this.simulation.client.cpfCnpj.length == 14) {
            this.simulation.client.typePerson = Client_dto_1.TypePerson.PJ;
        }
        else {
            this.simulation.client.typePerson = Client_dto_1.TypePerson.PF;
        }
    };
    CalculationComponent.prototype.comparation = function () {
        this.compare.emit(false);
        this.simulation.detailSimulation = false;
    };
    CalculationComponent.prototype.detailSimulation = function () {
        this.showDetailSimulation.emit(true);
    };
    CalculationComponent.prototype.initCalc = function () {
        if (!this.simulation.calculations[this.calculationID]) {
            this.simulation.calculations[this.calculationID] = new Calculation_dto_1.Calculation;
        }
        else {
            this.calculationSelected = this.simulation.calculations[this.calculationID].selected;
        }
        this.totalValue = this.simulation.car.version.price;
        this.simulation.calculations[this.calculationID].totalValue = this.totalValue;
        if (!this.simulation.calculations[this.calculationID]) {
            this.calculation = new Calculation_dto_1.Calculation;
        }
        if (this.enable) {
            this.getTaxes();
        }
    };
    CalculationComponent.prototype.getTaxes = function () {
        var _this = this;
        var busca = new Object;
        busca["taxas"] = this.taxType;
        busca["personType"] = this.simulation.client.typePerson;
        busca["vehicleType"] = this.simulation.car.vehicleType;
        busca["vehicleGender"] = this.simulation.car.gender;
        busca["province"] = this.simulation.client.address.province.id;
        busca["vehiclesSpecial"] = this.simulation.specialTypes;
        var getTaxes = this.appService.xSearchWithData('taxService', busca);
        getTaxes.subscribe(function (data) {
            var taxeResponse = data.json();
            taxeResponse.listTax.forEach(function (tax) {
                _this.total_tax = _this.total_tax + tax.value;
            });
            _this.simulationFinancialType();
        });
    };
    CalculationComponent.prototype.calcValue = function () {
        var _this = this;
        //valor do carro
        this.totalValue = this.simulation.car.version.price;
        if (this.total_tax) {
            this.totalValue = this.totalValue + this.total_tax;
        }
        //valor dos acessorios
        if (this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories.forEach(function (acessory) {
                _this.totalValue = acessory.value + _this.totalValue;
            });
        }
        //valor dos opcionais 
        if (this.simulation.car.version.options) {
            this.simulation.car.version.options.forEach(function (option) {
                _this.totalValue = option.amount + _this.totalValue;
            });
        }
        //valor dos servicos
        if (this.simulation.calculations[this.calculationID].services) {
            this.simulation.calculations[this.calculationID].services.forEach(function (service) {
                if (service.amount && service.amount > 0) {
                    _this.totalValue = service.amount + _this.totalValue;
                }
            });
        }
        this.simulation.calculations[this.calculationID].totalValue = this.totalValue;
    };
    /**
     * seleciona o tipo de produto default
     */
    CalculationComponent.prototype.selectFinanceTypeDefault = function () {
        var resultList = this.financialTypeList.filter(function (financialType) { return financialType.description === 'CDC'; });
        if (resultList[0]) {
            this.financialTypeSelected = resultList[0];
        }
    };
    /**
     * Financial Type
     * */
    CalculationComponent.prototype.simulationFinancialType = function () {
        var _this = this;
        var requestFinancialType = new Object;
        if (this.simulation.id) {
            requestFinancialType["financeTypeSelected"] = this.simulation.calculations[this.calculationID].financialType.financeTypeId;
        }
        else {
            this.simulation.calculations[this.calculationID].selected = false;
        }
        var getFinancialType = this.appService.xSearchWithData('financeTypeService/getFinancialType', requestFinancialType);
        getFinancialType.subscribe(function (data) {
            var financeTypeResponse = data.json();
            for (var i = 0; i < financeTypeResponse.listFinanceType.length; i++) {
                var financeType = financeTypeResponse.listFinanceType[i];
                _this.financialTypeList.push(financeType);
                if (!financeTypeResponse.financeTypeSelected) {
                    _this.selectFinanceTypeDefault();
                }
                else {
                    if (financeType.financeTypeId === financeTypeResponse.financeTypeSelected.financeTypeId) {
                        _this.financialTypeSelected = financeType;
                    }
                }
            }
            _this.changeFinancialType(_this.financialTypeSelected);
        }, function (err) {
            console.log(err.json());
        });
    };
    CalculationComponent.prototype.changeFinancialType = function (financialType) {
        this.simulation.calculations[this.calculationID].financialType = financialType;
        if (!this.simulation.calculations[this.calculationID].services) {
            this.initServices();
        }
        else {
            this.calcValue();
            this.simulationFinancialTable();
        }
        this.showRepackage = this.isCDCFlexSelected();
    };
    CalculationComponent.prototype.loadRepackage = function () {
        var _this = this;
        var observable = this.appService.xSearch('repackageService', this.financialTableSelected.productId
            + '/' + this.termSelected);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.repackageList = response.listRepackage;
        }, function (err) {
            console.log(err.json());
        });
    };
    CalculationComponent.prototype.initServices = function () {
        var _this = this;
        if (!this.simulation.calculations[this.calculationID].services) {
            this.simulation.calculations[this.calculationID].services = [];
        }
        //tratamento se o objeto de simulação ja vier preenchido
        if (this.simulation.calculations[this.calculationID].services.length != 0) {
            this.calcValue();
            this.simulationFinancialTable();
            return;
        }
        var itsSaleMan;
        var observable = this.appService.xSearch('userProfile', 'verifyuseradmin');
        observable.subscribe(function (data) {
            var response = data.json();
            if (response.userAdmin) {
                itsSaleMan = false;
            }
            else {
                itsSaleMan = true;
            }
        });
        var query = {};
        query["structureId"] = this.simulation.salesmanStructure.structureId;
        query["productId"] = this.simulation.calculations[this.calculationID].financialType.financeTypeId;
        query["vehicleType"] = this.simulation.car.vehicleType;
        var services = this.appService.xSearchWithData("serviceService/questService", query);
        services.subscribe(function (data) {
            var serviceResponse = data.json();
            var serviceList = serviceResponse.listService;
            serviceList.forEach(function (response) {
                if (response.required || response.selecetedDefault) {
                    _this.simulation.calculations[_this.calculationID].services.push(response);
                }
            });
            _this.calcValue();
            _this.simulationFinancialTable();
        });
    };
    CalculationComponent.prototype.simulationFinancialTable = function () {
        var _this = this;
        var requestFinancialTable = new Object;
        if (this.simulation.id) {
            requestFinancialTable["selected"] = this.simulation.calculations[this.calculationID].financialtable;
        }
        requestFinancialTable["idCalculation"] = this.calculationID;
        requestFinancialTable["vehicleVersion"] = this.simulation.car.version.id;
        if (this.simulation.client.typePerson) {
            requestFinancialTable["personType"] = this.simulation.client.typePerson;
        }
        var specialVehicleTypes = new Array();
        if (this.simulation.specialTypes) {
            for (var i = 0; i < this.simulation.specialTypes.length; i++) {
                specialVehicleTypes.push(this.simulation.specialTypes[i].id);
            }
        }
        requestFinancialTable["saleType"] = this.simulation.saleType.id;
        requestFinancialTable["specialVehicleTypes"] = specialVehicleTypes;
        requestFinancialTable["modelYear"] = this.simulation.car.version.yearModel;
        requestFinancialTable["manufactureYear"] = this.simulation.car.version.yearManufacture;
        requestFinancialTable["financeTypeId"] = this.simulation.calculations[this.calculationID].financialType.financeTypeId;
        requestFinancialTable["vehicleType"] = this.simulation.car.gender;
        this.cleanAll();
        var getFinancialTable = this.appService.xSearchWithData('productService/questProduct', requestFinancialTable);
        getFinancialTable.subscribe(function (data) {
            var financeTableResponse = data.json();
            for (var i = 0; i < financeTableResponse.listProduct.length; i++) {
                var financeTable = financeTableResponse.listProduct[i];
                _this.financialTableList.push(financeTable);
                if (financeTableResponse.product && financeTable.productId === financeTableResponse.product.productId) {
                    _this.financialTableSelected = financeTable;
                }
            }
            if (_this.financialTableList && _this.financialTableList.length > 0) {
                if (!_this.financialTableSelected || !_this.financialTableSelected.productId) {
                    for (var i = 0; i < _this.financialTableList.length; i++) {
                        var table = _this.financialTableList[i];
                        if (table.promotional) {
                            _this.financialTableSelected = table;
                        }
                    }
                    if (!_this.financialTableSelected || !_this.financialTableSelected.productId) {
                        _this.financialTableSelected = _this.financialTableList[0];
                    }
                }
                _this.changeFinancialTable(_this.financialTableSelected);
            }
            else {
                _this.appMessage.showError("Não existem tabelas de financiamento elegíveis para os dados informados");
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    CalculationComponent.prototype.cleanAll = function () {
        this.financialTableList = new Array();
        this.financialTableSelected = new FinancialTable_dto_1.FinancialTable;
        this.firstInstallments = undefined;
        this.firstInstallmentValue = undefined;
        this.secondInstallments = undefined;
        this.secondInstallmentValue = undefined;
        this.enableSecondInstallment = false;
        this.entranceValue = 0;
        this.entrancePerc = 0;
        this.minEntrace = 0;
        this.minPerEntrace = 0;
        this.maxEntrace = 9999999999;
        this.maxPerEntrace = 100;
        this.total_finc = 0;
        this.total_parc = 0;
        this.customer_rate = 0;
        this.listInstallments = [];
        this.commisionList = new Array();
        this.commisionSelected = undefined;
        this.financialTableSelected = undefined;
        this.financialTableList = new Array();
        this.delayList = new Array();
        this.repackageList = new Array();
        this.repackageSelected = '';
        this.delaySelected = undefined;
        this.termList = new Array();
        this.termSelected = undefined;
    };
    CalculationComponent.prototype.changeFinancialTable = function (financialTable) {
        this.simulation.calculations[this.calculationID].financialTable = financialTable;
        this.financialTableSelected = financialTable;
        if (this.financialTableSelected.productId) {
            this.simulationComission();
        }
    };
    CalculationComponent.prototype.changerepackage = function () {
        this.simulationdelay();
    };
    CalculationComponent.prototype.installmentsDialog = function () {
        var dialogRef = this.dialog.open(installments_dialog_1.InstallmentsDialog, { height: '85%', width: '50%' });
        dialogRef.componentInstance.simulation = this.simulation;
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    // recupera a comisão
    CalculationComponent.prototype.simulationComission = function () {
        var _this = this;
        var requestCommission = new Object;
        this.commisionSelected = new Commission_dto_1.Commission;
        if (this.simulation.id) {
            requestCommission["commissionId"] = this.simulation.calculations[this.calculationID].commission.id;
        }
        requestCommission["financeTypeId"] = this.financialTypeSelected.financeTypeId;
        requestCommission["saleTypeId"] = this.simulation.saleType.id;
        requestCommission["financeTableId"] = this.financialTableSelected.productId;
        requestCommission["promotionTable"] = this.financialTableSelected.promotional;
        var getCommisionTable = this.appService.xSearchWithData('commissionLevelService/questCommissionAndTempCommission', requestCommission);
        getCommisionTable.subscribe(function (data) {
            var commisionTableResponse = data.json();
            _this.commisionList = new Array();
            for (var i = 0; i < commisionTableResponse.listUserCommission.length; i++) {
                var financeCommision = commisionTableResponse.listUserCommission[i];
                _this.commisionList.push(financeCommision);
                if (commisionTableResponse.selected && financeCommision.id === commisionTableResponse.selected.id) {
                    _this.commisionSelected = financeCommision;
                }
            }
            _this.commisionList.sort(function (a, b) { return Number(a.description.trim()) - Number(b.description.trim()); });
            if (!_this.commisionSelected || !_this.commisionSelected.description) {
                _this.commisionSelected = _this.commisionList[_this.commisionList.length - 1];
            }
            _this.changeCommision(_this.commisionSelected);
        }, function (err) {
            console.log(err.json());
        });
    };
    CalculationComponent.prototype.changeCommision = function (comission) {
        this.commisionSelected = comission;
        if (this.commisionSelected) {
            this.simulationTerm();
        }
    };
    CalculationComponent.prototype.simulationTerm = function () {
        var _this = this;
        var requestdelay = new Object;
        requestdelay["productId"] = this.financialTableSelected.productId;
        requestdelay["commissionId"] = this.commisionSelected.id;
        requestdelay["personType"] = this.simulation.client.typePerson;
        var getTerm = this.appService.xSearchWithData('poductCoefficient/term', requestdelay);
        getTerm.subscribe(function (data) {
            var financilaTermResponse = data.json();
            _this.termList = new Array();
            _this.termSelected = undefined;
            for (var i = 0; i < financilaTermResponse.listTerm.length; i++) {
                var element = financilaTermResponse.listTerm[i];
                _this.termList.push(element);
                if (_this.simulation.id && _this.simulation.calculations[_this.calculationID].term === element) {
                    _this.termSelected = element;
                }
            }
            if (!_this.termSelected && _this.termList.length > 0) {
                _this.termSelected = _this.termList[0];
            }
            _this.changeterm(_this.termSelected);
        });
    };
    CalculationComponent.prototype.changeterm = function (term) {
        this.termSelected = term;
        if (this.termSelected) {
            this.simulationdelay();
            if (this.showRepackage) {
                this.loadRepackage();
            }
        }
    };
    CalculationComponent.prototype.simulationdelay = function () {
        var _this = this;
        var requestdelay = new Object;
        requestdelay["productId"] = this.financialTableSelected.productId;
        requestdelay["commissionId"] = this.commisionSelected.id;
        requestdelay["personType"] = this.simulation.client.typePerson;
        requestdelay["term"] = this.termSelected;
        var getdelay = this.appService.xSearchWithData('delayValue', requestdelay);
        getdelay.subscribe(function (data) {
            var delayResponse = data.json();
            _this.delayList = new Array();
            _this.delaySelected = undefined;
            for (var i = 0; i < delayResponse.listDelayValue.length; i++) {
                var element = delayResponse.listDelayValue[i];
                _this.delayList.push(element);
                if (_this.simulation.id && _this.simulation.calculations[_this.calculationID].delay === element) {
                    _this.delaySelected = element;
                }
            }
            if (!_this.delaySelected && _this.delayList.length > 0) {
                _this.delaySelected = _this.delayList[0];
            }
            _this.changedelay(_this.delaySelected);
        });
    };
    CalculationComponent.prototype.changedelay = function (delay) {
        this.delaySelected = delay;
        this.getMinMaxEntrace();
    };
    CalculationComponent.prototype.isCDCFlexSelected = function () {
        var financialTypeId = this.financialTypeSelected.financeTypeId;
        var resultList = this.financialTypeList.filter(function (financialType) { return financialType.financeTypeId === financialTypeId; });
        if (resultList[0]) {
            return resultList[0].description === 'CDC Flex';
        }
        return false;
    };
    // Recalcular quando buscar o total
    CalculationComponent.prototype.getMinMaxEntrace = function () {
        var _this = this;
        var requestMinMAx = new Object;
        if (this.simulation.calculations[this.calculationID].entranceValue) {
            this.entranceValue = this.simulation.calculations[this.calculationID].entranceValue;
        }
        requestMinMAx["productId"] = this.financialTableSelected.productId;
        requestMinMAx["commissionId"] = this.commisionSelected.id;
        requestMinMAx["personType"] = this.simulation.client.typePerson;
        requestMinMAx["term"] = this.termSelected;
        requestMinMAx["delay"] = this.delaySelected;
        requestMinMAx["value"] = this.totalValue;
        var getMinMax = this.appService.xSearchWithData('entraceValue', requestMinMAx);
        getMinMax.subscribe(function (data) {
            var minMaxResponse = data.json();
            _this.minEntrace = minMaxResponse["minValue"];
            _this.minPerEntrace = minMaxResponse["minPercent"];
            _this.maxEntrace = minMaxResponse["maxValue"];
            _this.maxPerEntrace = minMaxResponse["maxPercent"];
            if (_this.simulation.vizualization) {
                _this.validadePer((_this.entranceValue / _this.totalValue) * 100, false, undefined);
            }
            else {
                _this.validadeValue(_this.entranceValue, true);
            }
        });
    };
    CalculationComponent.prototype.previuscondition = function () {
        var pos = this.commisionList.indexOf(this.commisionSelected);
        pos--;
        if (pos >= 0) {
            this.commisionSelected = this.commisionList[pos];
            this.changeCommision(this.commisionSelected);
        }
    };
    CalculationComponent.prototype.nextcondition = function () {
        var pos = this.commisionList.indexOf(this.commisionSelected);
        pos++;
        if (pos <= (this.commisionList.length - 1)) {
            this.commisionSelected = this.commisionList[pos];
            this.changeCommision(this.commisionSelected);
        }
    };
    /**
     * Financial Table
     */
    CalculationComponent.prototype.servicesAndInsurance = function () {
        var _this = this;
        var dialogRef = this.dialog.open(servicesDialog_dialog_1.ServicesDialog, { height: '85%', width: '50%' });
        dialogRef.componentInstance.simulation = this.simulation;
        dialogRef.componentInstance.calculationID = this.calculationID;
        dialogRef.afterClosed().subscribe(function (result) {
            _this.simulation.calculations[_this.calculationID].services.length = 0;
            dialogRef.componentInstance.serviceList.forEach(function (exist) {
                if (exist.checked) {
                    _this.simulation.calculations[_this.calculationID].services.push(exist);
                }
            });
            _this.calcValue();
            _this.getMinMaxEntrace();
        });
        // this.dialog.close(CalculationDialog);
    };
    CalculationComponent.prototype.addSimulation = function () {
        this.enable = true;
        this.simulation.calculations[this.calculationID] = new Calculation_dto_1.Calculation;
        this.simulationFinancialType();
        this.initCalc();
    };
    CalculationComponent.prototype.removeSimulation = function () {
        this.simulation.calculations[this.calculationID] = undefined;
        this.enable = false;
    };
    CalculationComponent.prototype.contratarSimulacao = function () {
        /*  this.simulation.calculation = */
    };
    CalculationComponent.prototype.hire = function () {
        this.contratado.emit(false);
    };
    CalculationComponent.prototype.validadeEntryValue = function (value) {
        this.validadeValue(value, true);
    };
    CalculationComponent.prototype.validadeEntryPerc = function (perc) {
        this.validadePer(perc, true, undefined);
    };
    CalculationComponent.prototype.validadeValue = function (value, tela) {
        var start = document.getElementById("entranceValue").selectionStart;
        var end = document.getElementById("entranceValue").selectionEnd;
        //correção bug - nº 125998
        if (parseFloat(value.toString().replace(',', '.')) < 0) {
            value = parseFloat(value.toString().replace(',', '.')) * -1;
            document.getElementById("entranceValue").value = value;
        }
        //
        var change = false;
        if (parseFloat(value.toString().replace(',', '.')) < this.minEntrace) {
            value = this.minEntrace;
            change = true;
        }
        if (parseFloat(value.toString().replace(',', '.')) > this.maxEntrace) {
            value = this.maxEntrace;
            change = true;
        }
        if (typeof value === "string") {
            this.validadePer((parseFloat(parseFloat(value.replace(',', '.')).toFixed(2)) / this.totalValue) * 100, false, parseFloat(value.replace(',', '.')).toFixed(2));
        }
        else {
            this.validadePer((value / this.totalValue) * 100, false, value);
        }
        if (tela) {
            if (change) {
                this.entranceValue = parseFloat(value.toString().replace(',', '.'));
            }
            var haveComa = (("" + value).indexOf(',') != -1);
            var repp = ("" + value).replace(',', '.');
            var test = (repp.indexOf('.') != -1 && repp.indexOf('.') < repp.length - 3);
            if (test) {
                var ret_1 = parseFloat(value.toString().replace(',', '.'));
                if (haveComa) {
                    ret_1 = ret_1.toFixed(2).replace('.', ',');
                }
                else {
                    ret_1 = ret_1.toFixed(2);
                }
                setTimeout(function () {
                    document.getElementById("entranceValue").value = ret_1;
                    document.getElementById("entranceValue").setSelectionRange(start, end);
                });
            }
        }
        else {
            if (document.activeElement != document.getElementById("entranceValue")) {
                setTimeout(function () {
                    document.getElementById("entranceValue").value = "R$ " + (parseFloat(value.toString().replace(',', '.')).toFixed(2)).replace('.', ',');
                });
            }
        }
        if (!this.entranceValue) {
            this.entranceValue = 0;
        }
    };
    CalculationComponent.prototype.validadePer = function (value, tela, val) {
        if (value < this.minPerEntrace) {
            value = this.minPerEntrace;
            document.getElementById("entrancePerc").value = value;
            this.entrancePerc = value;
        }
        if (value > this.maxPerEntrace) {
            value = this.maxPerEntrace;
            document.getElementById("entrancePerc").value = value;
            this.entrancePerc = value;
        }
        if (!value) {
            value = 0;
        }
        if (tela) {
            var start = document.getElementById("entrancePerc").selectionStart;
            var end = document.getElementById("entrancePerc").selectionEnd;
            var haveComa = (("" + value).indexOf(',') != -1);
            var repp = ("" + value).replace(',', '.');
            var test = (repp.indexOf('.') != -1 && repp.indexOf('.') < repp.length - 3);
            if (test) {
                var ret = parseFloat(value.toString().replace(',', '.'));
                if (haveComa) {
                    ret = ret.toFixed(2).replace('.', ',');
                }
                else {
                    ret = ret.toFixed(2);
                }
                document.getElementById("entrancePerc").value = ret;
                value = (parseFloat(parseFloat(value.toString().replace(',', '.')).toFixed(2)));
                this.entrancePerc = value;
            }
            if (typeof value === "string") {
                this.validadeValue(this.totalValue * (parseFloat(parseFloat(value.replace(',', '.')).toFixed(2)) / 100), false);
            }
            else {
                this.validadeValue(this.totalValue * (value / 100), false);
            }
        }
        else {
            if (document.activeElement != document.getElementById("entrancePerc")) {
                this.entrancePerc = parseFloat(parseFloat(value.toString().replace(',', '.')).toFixed(2));
                document.getElementById("entrancePerc").value = parseFloat(value.toString().replace(',', '.')).toFixed(2);
            }
            if (val) {
                if (val === NaN || val === "NaN") {
                    val = 0;
                }
                this.buscaCoeficents(val);
            }
            else {
                if (this.entranceValue < 0) {
                    this.entranceValue = this.entranceValue * -1;
                }
                this.buscaCoeficents(this.entranceValue);
            }
        }
    };
    CalculationComponent.prototype.buscaCoeficents = function (entry) {
        var _this = this;
        var requestCoef = new Object;
        requestCoef["productId"] = this.financialTableSelected.productId;
        requestCoef["commissionId"] = this.commisionSelected.id;
        requestCoef["personType"] = this.simulation.client.typePerson;
        requestCoef["term"] = this.termSelected;
        requestCoef["delayValue"] = this.delaySelected;
        requestCoef["value"] = this.totalValue;
        if (this.entrancePerc) {
            requestCoef["entryPercent"] = this.entrancePerc;
        }
        else {
            requestCoef["entryPercent"] = 0.0;
        }
        var getCoef = this.appService.xSearchWithData('poductCoefficient', requestCoef);
        getCoef.subscribe(function (data) {
            var coefResponse = data.json();
            _this.coeficient = coefResponse.coefficient;
            _this.recalcParcels(entry);
        });
    };
    CalculationComponent.prototype.recalcParcels = function (entry) {
        var _this = this;
        if (this.simulation.vizualization) {
            this.parcelCount();
            this.updateSimulationObject();
            return;
        }
        this.simulation.showBtnSave = false;
        var requestParcels = new Object;
        requestParcels["productId"] = this.financialTableSelected.productId;
        requestParcels["coefficientId"] = this.coeficient.coeffcientId;
        requestParcels["commissionId"] = this.commisionSelected.id;
        requestParcels["personType"] = this.simulation.client.typePerson;
        requestParcels["term"] = this.termSelected;
        requestParcels["delay"] = this.delaySelected;
        requestParcels["priceVehicle"] = this.simulation.car.version.price;
        requestParcels["gender"] = this.simulation.car.gender;
        requestParcels["provinceId"] = this.simulation.client.address.province.id;
        if (entry) {
            requestParcels["valueEntry"] = entry;
        }
        else {
            requestParcels["valueEntry"] = 0.0;
        }
        var listoptions = new Array();
        if (this.simulation.car.version.options) {
            this.simulation.car.version.options.forEach(function (option) {
                listoptions.push(option.id);
            });
        }
        requestParcels["listOptions"] = listoptions;
        var totalAccessories = 0;
        if (this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories.forEach(function (acessory) {
                totalAccessories += acessory.value;
            });
        }
        requestParcels["totalAccessories"] = totalAccessories;
        var listServices = new Array();
        if (this.simulation.calculations[this.calculationID].services) {
            this.simulation.calculations[this.calculationID].services.forEach(function (service) {
                listServices.push(service);
            });
        }
        requestParcels["listServices"] = listServices;
        var listSpecialTypeId = new Array();
        if (this.simulation.specialTypes) {
            this.simulation.specialTypes.forEach(function (specialType) {
                listSpecialTypeId.push(specialType.id);
            });
        }
        requestParcels["specialTypeIdList"] = listSpecialTypeId;
        requestParcels["listTaxes"] = this.taxType;
        //valor dos servicos
        requestParcels["financeTypeId"] = this.financialTypeSelected.financeTypeId;
        //sera enviado caso o for CDC Flex
        if (this.showRepackage && this.repackageSelected) {
            requestParcels["repackageId"] = this.repackageSelected;
        }
        var getParcels = this.appService.xSearchWithData('simulationCalc', requestParcels);
        getParcels.subscribe(function (data) {
            var parcelsResponse = data.json();
            _this.simulation.calculations[_this.calculationID].installments = parcelsResponse.calculate.listParcel;
            _this.parcelCount();
            _this.updateSimulationObject();
            _this.simulation.showBtnSave = true;
        });
    };
    CalculationComponent.prototype.parcelCount = function () {
        var _this = this;
        var retorno = {};
        for (var i = 0; i < this.simulation.calculations[this.calculationID].installments.length; i++) {
            var amount = this.simulation.calculations[this.calculationID].installments[i].amount;
            if (!retorno[amount]) {
                retorno[amount] = 1;
            }
            else {
                retorno[amount] = retorno[amount] + 1;
            }
        }
        var keys = Object.keys(retorno);
        var ik = 0;
        keys.forEach(function (key) {
            if (ik == 0) {
                _this.firstInstallments = retorno[key] + "x";
                _this.firstInstallmentValue = key;
            }
            else if (ik == 1) {
                _this.secondInstallments = retorno[key] + "x";
                _this.secondInstallmentValue = key;
                _this.enableSecondInstallment = true;
            }
            else {
                return;
            }
            ik++;
        });
    };
    CalculationComponent.prototype.updateSimulationObject = function () {
        this.simulation.calculations[this.calculationID].financialTable = this.financialTableSelected;
        this.simulation.calculations[this.calculationID].coeficiente = this.coeficient;
        this.simulation.calculations[this.calculationID].commission = this.commisionSelected;
        this.simulation.calculations[this.calculationID].delay = this.delaySelected;
        this.simulation.calculations[this.calculationID].entraceValue = this.entranceValue;
        this.simulation.calculations[this.calculationID].financialType = this.financialTypeSelected;
        this.simulation.calculations[this.calculationID].term = this.termSelected;
    };
    CalculationComponent.prototype.contract = function () {
        //remove o selecionado das simulações
        for (var _i = 0, _a = this.simulation.calculations; _i < _a.length; _i++) {
            var calculation = _a[_i];
            calculation.selected = false;
        }
        this.simulation.calculations[this.calculationID].selected = true;
        this.simulation.calculationSelected = this.simulation.calculations[this.calculationID];
        this.contratado.emit(true);
    };
    CalculationComponent.prototype.listTaxes = function () {
        if (!this.simulation.tc) {
            this.taxType.push("TC");
        }
        if (this.simulation.car.vehicleType != "NOVO") {
            this.taxType.push("TAB");
        }
        this.taxType.push("TR");
    };
    CalculationComponent.prototype.newCalculate = function () {
        var listServices = new Array();
        if (this.simulation.calculations[this.calculationID].services) {
            this.simulation.calculations[this.calculationID].services.forEach(function (service) {
                listServices.push(service);
            });
        }
        var listSpecialTypeId = new Array();
        if (this.simulation.specialTypes) {
            this.simulation.specialTypes.forEach(function (specialType) {
                listSpecialTypeId.push(specialType.id);
            });
        }
        var requestCalculate = {
            deposit: this.entranceValue,
            vehiclePrice: this.simulation.car.version.price,
            repackageId: this.repackageSelected,
            commissionId: this.commisionSelected.id,
            productId: this.financialTableSelected.productId,
            saleTypeId: this.simulation.saleType.id,
            financeTypeId: this.financialTypeSelected.financeTypeId,
            vehicleVersionId: this.simulation.car.version.id,
            personType: this.simulation.client.typePerson,
            term: this.termSelected,
            delayValue: this.delaySelected,
            province: this.simulation.client.address.province.id,
            tcExempt: this.simulation.tc,
            vehiclesSpecial: listSpecialTypeId,
            services: listServices
        };
        var newCalculate = this.appService.xSearchWithData('simulationCalc/calculate', requestCalculate);
        newCalculate.subscribe(function (data) {
            var response = data.json();
        }, function (err) {
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CalculationComponent.prototype, "calculationID", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CalculationComponent.prototype, "enable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Installment_dto_1.Installment)
    ], CalculationComponent.prototype, "installments", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalculationComponent.prototype, "contratado", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalculationComponent.prototype, "compare", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CalculationComponent.prototype, "showDetailSimulation", void 0);
    CalculationComponent = __decorate([
        core_1.Component({
            selector: 'calculation',
            templateUrl: 'app/simulation/calculationPainel/calculationDialog/calculation/calculation.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, material_1.MdDialog,
            flex_layout_1.ObservableMedia, simulation_service_1.SimulationService])
    ], CalculationComponent);
    return CalculationComponent;
}());
exports.CalculationComponent = CalculationComponent;
//# sourceMappingURL=calculation.component.js.map