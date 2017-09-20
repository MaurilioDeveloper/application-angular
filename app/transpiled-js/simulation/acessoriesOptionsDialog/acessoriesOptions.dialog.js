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
var app_message_1 = require("./../../app.message");
var material_1 = require("@angular/material");
var Acessorio_dto_1 = require("./../dto/Acessorio.dto");
var Option_dto_1 = require("./../dto/Option.dto");
var app_service_1 = require("./../../app.service");
var core_1 = require("@angular/core");
var AcessoriesOptionsDialog = /** @class */ (function () {
    function AcessoriesOptionsDialog(appService, appMessage, dialogRef) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.dialogRef = dialogRef;
        this.rawChange = new core_1.EventEmitter();
        this.acessorio = new Acessorio_dto_1.Acessorio;
        this.subtotalOpcionais = 0;
        this.subtotalAcessorios = 0;
        this.total = 0;
        this.oldPriceVersion = 0;
    }
    AcessoriesOptionsDialog.prototype.addAcessorio = function (acessorio) {
        var valor = acessorio.value.toString().replace("R$ ", "");
        valor = parseFloat(valor).toFixed(2);
        acessorio.value = parseFloat(valor.toString());
        this.simulation.car.version.acessories.push(acessorio);
        this.acessorio = new Acessorio_dto_1.Acessorio;
        this.recalc();
    };
    AcessoriesOptionsDialog.prototype.delAcessorio = function (acessorio) {
        var index = this.simulation.car.version.acessories.indexOf(acessorio);
        if (index !== -1) {
            this.simulation.car.version.acessories.splice(index, 1);
        }
        this.recalc();
    };
    AcessoriesOptionsDialog.prototype.recalc = function () {
        var _this = this;
        this.total = this.simulation.car.version.price;
        this.subtotalOpcionais = 0;
        if (this.simulation.car.version.options) {
            this.simulation.car.version.options.forEach(function (option) {
                _this.subtotalOpcionais = _this.subtotalOpcionais + option.amount;
            });
        }
        this.subtotalAcessorios = 0;
        if (this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories.forEach(function (acessorie) {
                _this.subtotalAcessorios = _this.subtotalAcessorios + acessorie.value;
            });
        }
        this.total = this.total + this.subtotalOpcionais + this.subtotalAcessorios;
    };
    AcessoriesOptionsDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.oldPriceVersion = this.simulation.car.version.price;
        console.log(this.oldPriceVersion);
        if (!this.simulation.car.version.acessories) {
            this.simulation.car.version.acessories = [];
        }
        var get = {};
        get['idVersion'] = this.simulation.car.version.id;
        get['listSelected'] = new Array();
        if (this.simulation.car.version.options) {
            this.simulation.car.version.options.forEach(function (opt) {
                get['listSelected'].push(opt.id);
            });
        }
        var observable = this.appService.xSearchWithData('vehicleVersionOptions', get);
        observable.subscribe(function (data) {
            var response = data.json();
            _this.simulation.car.version.options = new Array();
            _this.optionList = new Array();
            for (var index = 0; index < response.listOptions.length; index++) {
                var opt = response.listOptions[index];
                var option = new Option_dto_1.Option;
                option.id = opt["id"];
                option.description = opt["description"];
                option.amount = opt["amount"];
                _this.optionList.push(option);
            }
            if (response.selectedOptions != null) {
                response.selectedOptions.forEach(function (opt) {
                    var option = _this.optionList.filter(function (x) { return x.id === opt.id; })[0];
                    _this.simulation.car.version.options.push(option);
                    option.selected = true;
                });
            }
            _this.recalc();
        }, function (err) {
            console.log(err.json());
        });
    };
    AcessoriesOptionsDialog.prototype.checked = function (model) {
        return false;
    };
    AcessoriesOptionsDialog.prototype.updateTotal = function (value) {
        if (value.length > 0 && (value < 0 || isNaN(parseFloat(value)))) {
            value = this.oldPriceVersion;
            // this.appMessage.showWarning("Valor " +  value +this.oldPriceVersion);
        }
        if (value) {
            value = value.toString().replace('R$ ', "").replace(',', ".");
            this.simulation.car.version.price = parseFloat(value);
            this.recalc();
        }
    };
    AcessoriesOptionsDialog.prototype.updateCheckedOptions = function (model, evento) {
        if (evento.checked) {
            this.simulation.car.version.options.push(model);
        }
        else {
            var index = this.simulation.car.version.options.indexOf(model);
            if (index !== -1) {
                this.simulation.car.version.options.splice(index, 1);
            }
        }
        this.recalc();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AcessoriesOptionsDialog.prototype, "rawChange", void 0);
    AcessoriesOptionsDialog = __decorate([
        core_1.Component({
            selector: 'acessories-options-dialog',
            templateUrl: 'app/simulation/acessoriesOptionsDialog/acessoriesOptions.dialog.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage, material_1.MdDialogRef])
    ], AcessoriesOptionsDialog);
    return AcessoriesOptionsDialog;
}());
exports.AcessoriesOptionsDialog = AcessoriesOptionsDialog;
//# sourceMappingURL=acessoriesOptions.dialog.js.map