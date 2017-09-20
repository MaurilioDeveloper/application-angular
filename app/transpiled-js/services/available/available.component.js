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
var app_service_1 = require("./../../app.service");
var core_1 = require("@angular/core");
var AvailableComponent = /** @class */ (function () {
    function AvailableComponent(appService, appMessage) {
        this.appService = appService;
        this.appMessage = appMessage;
        this.listStructure = [{ structureId: null, description: 'Selecione uma Concessionária...' }];
    }
    AvailableComponent.prototype.ngOnInit = function () {
        this.loadStructure();
    };
    AvailableComponent.prototype.loadStructure = function () {
        var _this = this;
        var observable = this.appService.xSearch('structureService', 'questDealershipByUser');
        observable.subscribe(function (data) {
            var response = data.json();
            (_a = _this.listStructure).push.apply(_a, response.listStructure);
            var _a;
        }, function (err) {
            console.log(err.json());
        });
    };
    AvailableComponent.prototype.consult = function () {
        var _this = this;
        var observable = this.appService.xSearch('serviceService/questServiceStructure', this.structureSelect);
        observable.subscribe(function (data) {
            var response = data.json();
            if (response.listService != undefined) {
                _this.listService = response.listService;
                _this.result = true;
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    AvailableComponent.prototype.save = function () {
        var _this = this;
        var requestService = { listServiceStructure: this.listService };
        var observable = this.appService.xPost('serviceStructureService/updateServiceStructureActive', requestService);
        observable.subscribe(function (data) {
            _this.appMessage.showSuccess("Configuração salva com sucesso.");
        }, function (err) {
            console.log(err.json());
        });
    };
    AvailableComponent.prototype.cleanPage = function () {
        if (this.table) {
            this.table.offset = 0;
        }
    };
    __decorate([
        core_1.ViewChild('table'),
        __metadata("design:type", Object)
    ], AvailableComponent.prototype, "table", void 0);
    AvailableComponent = __decorate([
        core_1.Component({
            selector: 'services-available',
            templateUrl: './app/services/available/available.component.html'
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, app_message_1.AppMessage])
    ], AvailableComponent);
    return AvailableComponent;
}());
exports.AvailableComponent = AvailableComponent;
;
//# sourceMappingURL=available.component.js.map