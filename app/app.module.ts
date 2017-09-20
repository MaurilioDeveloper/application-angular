import { CustomDateAdapter } from './commons/date_picker/custom-date.adapter';
import { CustomCurrencyMaskConfig } from './diretive/CustomCurrencyMaskConfig';
import { DatexPipe } from './pipe/date.pipe';
import { SafeHtmlPipe } from './pipe/html.pipe';
import { CustomPhoneDiretive } from './diretive/customPhone.directive';
import { PhonePipe } from './pipe/phone.pipe';
import { CustomCpfCnpjDiretive } from './diretive/customCpfCnpj.diretive';
import { CustomCnpjDiretive } from './diretive/customCnpj.diretive';
import { SpinnerService } from './spinner/spinner.service';
import { SpinnerModule } from './spinner/spinner.module';
import { TranslateModule } from './translate/translate.module';
import { PhoneMaskDirective } from './diretive/phone.directive';
import { BrlPipe } from './commons/value/brlpipe';
import { CnpjPipe } from './my_agreement/cnpj.pipe';
import { CpfPipe } from './my_agreement/cpf.pipe';
import { SimulationComponents, SimulationModule } from './simulation/simulation.module';
import { MenuModule, MenuComponents } from './menu/menu.module';
import { Router } from '@angular/router';
import { AuthGuard } from './login/auth-guard.service';
import { FormLoginComponent } from "./login/form-login.component";
import { NgModule , CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID }      from '@angular/core';
import { StepperComponent } from './stepper/stepper.component';
import { BrowserModule }                from '@angular/platform-browser';
import { HttpModule, JsonpModule }      from '@angular/http';
import { FormsModule, ReactiveFormsModule }          from "@angular/forms";
import { FlexLayoutModule }             from '@angular/flex-layout';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MaterialModule, MdCardModule, MdButtonModule, MdIconModule, 
         MdIconRegistry, MdDatepickerModule, MdNativeDateModule,OverlayContainer, DateAdapter, MD_DATE_FORMATS }  from '@angular/material';
import {BrowserAnimationsModule}        from '@angular/platform-browser/animations';
import { AppComponent }                 from './app.component';
import { AppRoutingModule, AppRoutes }  from './app.routing';
import { AppService }                   from './app.service';
import { ToastrModule, ToastrService }  from 'ngx-toastr';
import { LoaderService }                from './app.spinner';
import { AppMessage }                   from './app.message';
import { LoginModule, LoginRoutes }               from './login/login.module';
import { PageNotFoundComponent }        from './not-found.component';
import { OmegaMaskDirective } from './diretive/omegaMask.diretive'
import { NglModule }                    from 'ng-lightning/ng-lightning';
import { WindowRefService }             from './admin/news/utils_news/util_news.service';
import { ForgotPasswordDialog } from './forgot_password_dialog/forgot_password.dialog';
import { QuillModule } from 'ngx-quill';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";


@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule, 
                  ReactiveFormsModule, 
                  LoginModule,
                  MenuModule, 
                  SimulationModule,
                  AppRoutingModule, 
                  MaterialModule, 
                  HttpModule, 
                  JsonpModule, 
                  MdCardModule, 
                  MdButtonModule, 
                  MdIconModule, 
                  MdDatepickerModule, 
                  MdNativeDateModule, 
                  QuillModule,
                  FlexLayoutModule,
                  ToastrModule.forRoot({timeOut:0}),
                  BrowserAnimationsModule, 
                  NglModule, 
                  NgxDatatableModule, 
                  TranslateModule,
                  SpinnerModule,
                  CurrencyMaskModule], //other modules the app depends on
  declarations: [ AppComponent, 
                  AppRoutes.components, 
                  LoginRoutes.components,
                  FormLoginComponent,  
                  StepperComponent,
                  OmegaMaskDirective,
                  CustomCpfCnpjDiretive,
                  CustomCnpjDiretive,
                  CustomPhoneDiretive,
                  PhoneMaskDirective,
                  CpfPipe,
                  CnpjPipe,
                  PhonePipe,
                  SafeHtmlPipe,
                  DatexPipe,
                  MenuComponents.components,
                  SimulationComponents.components
                ], // declare all directives and components
  providers:    [ AppService,
                  AuthGuard,
                  MdIconRegistry, 
                  AppMessage, 
                  ToastrService,
                  WindowRefService,
                  {provide: LocationStrategy, useClass: HashLocationStrategy},
                  LoaderService, 
                  BrlPipe,
                  { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig},
                  { provide: LOCALE_ID, useValue: 'pt-BR' },
                  { provide: DateAdapter, useClass: CustomDateAdapter },
                  AppComponent,
                ],
  schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap :   [ AppComponent ], // root component to bootstarp
  exports:      [
                  OmegaMaskDirective,
                  CustomCpfCnpjDiretive,
                  CustomCnpjDiretive,
                  CustomPhoneDiretive
                ]
})


export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}