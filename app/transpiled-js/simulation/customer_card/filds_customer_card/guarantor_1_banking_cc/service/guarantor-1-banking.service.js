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
var Guarantor_dto_1 = require("./../../../../dto/client/Guarantor.dto");
var BankDetails_dto_1 = require("./../../../../dto/client/BankDetails.dto");
var Bank_dto_1 = require("./../../../../dto/client/Bank.dto");
var app_service_1 = require("./../../../../../app.service");
var simulation_service_1 = require("./../../../../simulation.service");
var core_1 = require("@angular/core");
var step_enum_1 = require("./../../../../step.enum");
var GuarantorOneBankingService = /** @class */ (function () {
    function GuarantorOneBankingService(appService, simulationService) {
        this.appService = appService;
        this.simulationService = simulationService;
        this.listBank = new Array();
        this.listAccountType = [];
        this.isRequiredBanking = false;
    }
    ;
    GuarantorOneBankingService.prototype.init = function () {
        var _this = this;
        this.simulationService.load.subscribe(function (simulation) {
            _this.simulation = simulation;
            if (_this.simulation && (_this.simulation.step == step_enum_1.StepEnum.STEP_CUSTOMER_CARD || _this.simulation.step == step_enum_1.StepEnum.STEP_MOBILE_GUARANTOR_ONE_BANKING)) {
                _this.onload();
            }
        });
    };
    GuarantorOneBankingService.prototype.initializeFields = function () {
        if (!this.simulation.client.guarantor1)
            this.simulation.client.guarantor1 = new Guarantor_dto_1.Guarantor();
        if (!this.simulation.client.guarantor1.bankDetails)
            this.simulation.client.guarantor1.bankDetails = new BankDetails_dto_1.BankDetails();
        if (!this.simulation.client.guarantor1.bankDetails.bank)
            this.simulation.client.guarantor1.bankDetails.bank = new Bank_dto_1.Bank();
    };
    GuarantorOneBankingService.prototype.onload = function () {
        this.initializeFields();
        this.loadBank();
        this.loadAccountType();
        this.simulation.client.guarantor1.bankDetails.accountType = 'CORRENTE';
    };
    GuarantorOneBankingService.prototype.loadBank = function () {
        var _this = this;
        var result = this.appService.xSearch('customerCardService', 'findAllBank');
        result.subscribe(function (data) {
            var response = data.json();
            _this.listBank = response.listBank;
        }, function (err) {
            console.log(err.json());
        });
    };
    GuarantorOneBankingService.prototype.loadAccountType = function () {
        var accountType = {
            'id': 'C',
            'description': 'CORRENTE'
        };
        this.listAccountType.push(accountType);
    };
    GuarantorOneBankingService.prototype.validBankSelected = function () {
        var idBank = this.simulation.client.guarantor1.bankDetails.bank.id;
        var banks = this.listBank.filter(function (bank) { return bank.id === idBank; });
        if (banks[0]) {
            this.simulation.client.guarantor1.bankDetails.bank.importCode = banks[0].importCode;
            this.selectBank();
        }
    };
    GuarantorOneBankingService.prototype.selectBank = function () {
        this.isRequiredBanking = true;
        if (this.simulation.client.guarantor1.bankDetails.bank.id) {
            this.isRequiredBanking = true;
        }
        else {
            this.isRequiredBanking = false;
        }
    };
    GuarantorOneBankingService.prototype.validCodeBankSelected = function () {
        var idimportCodeBank = this.simulation.client.guarantor1.bankDetails.bank.importCode;
        var banks;
        banks = this.listBank.filter(function (bank) { return bank.importCode === idimportCodeBank; });
        if (banks[0]) {
            this.simulation.client.guarantor1.bankDetails.bank.id = banks[0].id;
        }
        else {
            this.simulation.client.guarantor1.bankDetails.bank.id = null;
        }
    };
    GuarantorOneBankingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_service_1.AppService, simulation_service_1.SimulationService])
    ], GuarantorOneBankingService);
    return GuarantorOneBankingService;
}());
exports.GuarantorOneBankingService = GuarantorOneBankingService;
//# sourceMappingURL=guarantor-1-banking.service.js.map