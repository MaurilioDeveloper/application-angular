"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var spinner_service_1 = require("./spinner.service");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var spinner_component_1 = require("./spinner.component");
var SpinnerModule = /** @class */ (function () {
    function SpinnerModule() {
    }
    SpinnerModule = __decorate([
        core_1.NgModule({
            imports: [
                material_1.MaterialModule,
                material_1.MdDialogModule
            ],
            declarations: [
                spinner_component_1.SpinnerComponentDialog,
                spinner_component_1.SpinnerComponent,
            ],
            providers: [
                spinner_service_1.SpinnerService
            ],
            entryComponents: [
                spinner_component_1.SpinnerComponentDialog,
                spinner_component_1.SpinnerComponent
            ],
            exports: [
                spinner_component_1.SpinnerComponentDialog,
                spinner_component_1.SpinnerComponent
            ],
            bootstrap: [
                spinner_component_1.SpinnerComponentDialog, spinner_component_1.SpinnerComponent
            ]
        })
    ], SpinnerModule);
    return SpinnerModule;
}());
exports.SpinnerModule = SpinnerModule;
//# sourceMappingURL=spinner.module.js.map