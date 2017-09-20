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
var custom_date_adapter_1 = require("./commons/date_picker/custom-date.adapter");
var CustomCurrencyMaskConfig_1 = require("./diretive/CustomCurrencyMaskConfig");
var date_pipe_1 = require("./pipe/date.pipe");
var html_pipe_1 = require("./pipe/html.pipe");
var customPhone_directive_1 = require("./diretive/customPhone.directive");
var phone_pipe_1 = require("./pipe/phone.pipe");
var customCpfCnpj_diretive_1 = require("./diretive/customCpfCnpj.diretive");
var customCnpj_diretive_1 = require("./diretive/customCnpj.diretive");
var spinner_module_1 = require("./spinner/spinner.module");
var translate_module_1 = require("./translate/translate.module");
var phone_directive_1 = require("./diretive/phone.directive");
var brlpipe_1 = require("./commons/value/brlpipe");
var cnpj_pipe_1 = require("./my_agreement/cnpj.pipe");
var cpf_pipe_1 = require("./my_agreement/cpf.pipe");
var simulation_module_1 = require("./simulation/simulation.module");
var menu_module_1 = require("./menu/menu.module");
var router_1 = require("@angular/router");
var auth_guard_service_1 = require("./login/auth-guard.service");
var form_login_component_1 = require("./login/form-login.component");
var core_1 = require("@angular/core");
var stepper_component_1 = require("./stepper/stepper.component");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var flex_layout_1 = require("@angular/flex-layout");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var app_service_1 = require("./app.service");
var ngx_toastr_1 = require("ngx-toastr");
var app_spinner_1 = require("./app.spinner");
var app_message_1 = require("./app.message");
var login_module_1 = require("./login/login.module");
var omegaMask_diretive_1 = require("./diretive/omegaMask.diretive");
var ng_lightning_1 = require("ng-lightning/ng-lightning");
var util_news_service_1 = require("./admin/news/utils_news/util_news.service");
var ngx_quill_1 = require("ngx-quill");
var common_1 = require("@angular/common");
var ng2_currency_mask_1 = require("ng2-currency-mask");
var currency_mask_config_1 = require("ng2-currency-mask/src/currency-mask.config");
var AppModule = /** @class */ (function () {
    // Diagnostic only: inspect router configuration
    function AppModule(router) {
        //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                login_module_1.LoginModule,
                menu_module_1.MenuModule,
                simulation_module_1.SimulationModule,
                app_routing_1.AppRoutingModule,
                material_1.MaterialModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                material_1.MdCardModule,
                material_1.MdButtonModule,
                material_1.MdIconModule,
                material_1.MdDatepickerModule,
                material_1.MdNativeDateModule,
                ngx_quill_1.QuillModule,
                flex_layout_1.FlexLayoutModule,
                ngx_toastr_1.ToastrModule.forRoot({ timeOut: 0 }),
                animations_1.BrowserAnimationsModule,
                ng_lightning_1.NglModule,
                ngx_datatable_1.NgxDatatableModule,
                translate_module_1.TranslateModule,
                spinner_module_1.SpinnerModule,
                ng2_currency_mask_1.CurrencyMaskModule],
            declarations: [app_component_1.AppComponent,
                app_routing_1.AppRoutes.components,
                login_module_1.LoginRoutes.components,
                form_login_component_1.FormLoginComponent,
                stepper_component_1.StepperComponent,
                omegaMask_diretive_1.OmegaMaskDirective,
                customCpfCnpj_diretive_1.CustomCpfCnpjDiretive,
                customCnpj_diretive_1.CustomCnpjDiretive,
                customPhone_directive_1.CustomPhoneDiretive,
                phone_directive_1.PhoneMaskDirective,
                cpf_pipe_1.CpfPipe,
                cnpj_pipe_1.CnpjPipe,
                phone_pipe_1.PhonePipe,
                html_pipe_1.SafeHtmlPipe,
                date_pipe_1.DatexPipe,
                menu_module_1.MenuComponents.components,
                simulation_module_1.SimulationComponents.components
            ],
            providers: [app_service_1.AppService,
                auth_guard_service_1.AuthGuard,
                material_1.MdIconRegistry,
                app_message_1.AppMessage,
                ngx_toastr_1.ToastrService,
                util_news_service_1.WindowRefService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                app_spinner_1.LoaderService,
                brlpipe_1.BrlPipe,
                { provide: currency_mask_config_1.CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig_1.CustomCurrencyMaskConfig },
                { provide: core_1.LOCALE_ID, useValue: 'pt-BR' },
                { provide: material_1.DateAdapter, useClass: custom_date_adapter_1.CustomDateAdapter },
                app_component_1.AppComponent,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            bootstrap: [app_component_1.AppComponent],
            exports: [
                omegaMask_diretive_1.OmegaMaskDirective,
                customCpfCnpj_diretive_1.CustomCpfCnpjDiretive,
                customCnpj_diretive_1.CustomCnpjDiretive,
                customPhone_directive_1.CustomPhoneDiretive
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map