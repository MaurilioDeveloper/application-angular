"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
//import { DatepickerOverviewExample } from '../commons/date_picker/date_picker.component';
//import { MinhasPropostasComponent } from '../minhas_propostas/minhas_propostas.component';
//import { MaterialModule, MdCardModule, MdButtonModule, MdIconModule, MdIconRegistry } from '@angular/material';
var StepperModule = /** @class */ (function () {
    function StepperModule() {
    }
    StepperModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            //imports:      [ MdCardModule, MdButtonModule, MdIconModule ], //other modules the app depends on
            declarations: [],
            exports: []
        })
    ], StepperModule);
    return StepperModule;
}());
exports.StepperModule = StepperModule;
//# sourceMappingURL=stepper.module.js.map