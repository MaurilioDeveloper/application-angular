"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var document_mobile_component_1 = require("./document/mobile/document-mobile.component");
var send_mobile_component_1 = require("./send/mobile/send-mobile.component");
var send_simulation_dialog_1 = require("./customer_card/send_simulation_dialog/send_simulation.dialog");
var CustomCurrencyMaskConfig_1 = require("./../diretive/CustomCurrencyMaskConfig");
var customer_card_mobile_component_1 = require("./customer_card/mobile/customer_card-mobile.component");
var banking_references_mobile_cc_component_1 = require("./customer_card/filds_customer_card/banking_references_cc/mobile/banking-references-mobile-cc.component");
var guarantor_1_address_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_address_cc/mobile/guarantor-1-address-mobile-cc.component");
var guarantor_1_banking_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_banking_cc/mobile/guarantor-1-banking-mobile-cc.component");
var guarantor_1_client_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_client_cc/mobile/guarantor-1-client-mobile-cc.component");
var guarantor_1_person_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_person_cc/mobile/guarantor-1-person-mobile-cc.component");
var guarantor_1_professional_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_professional_cc/mobile/guarantor-1-professional-mobile-cc.component");
var guarantor_1_spouse_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_spouse_cc/mobile/guarantor-1-spouse-mobile-cc.component");
var guarantor_2_address_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_address_cc/mobile/guarantor-2-address-mobile-cc.component");
var guarantor_2_banking_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_banking_cc/mobile/guarantor-2-banking-mobile-cc.component");
var guarantor_2_client_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_client_cc/mobile/guarantor-2-client-mobile-cc.component");
var guarantor_2_person_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_person_cc/mobile/guarantor-2-person-mobile-cc.component");
var guarantor_2_professional_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_professional_cc/mobile/guarantor-2-professional-mobile-cc.component");
var guarantor_2_spouse_mobile_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_spouse_cc/mobile/guarantor-2-spouse-mobile-cc.component");
var person_data_mobile_cc_component_1 = require("./customer_card/filds_customer_card/person_data_cc/mobile/person-data-mobile-cc.component");
var spouse_mobile_cc_component_1 = require("./customer_card/filds_customer_card/spouse_cc/mobile/spouse-mobile-cc.component");
var vehicle_data_mobile_cc_component_1 = require("./customer_card/filds_customer_card/vehicle_data_cc/mobile/vehicle-data-mobile-cc.component");
var submission_mobile_component_1 = require("./customer_card/filds_customer_card/submission_cc/mobile/submission-mobile.component");
var professional_data_mobile_component_1 = require("./customer_card/filds_customer_card/professional_data_cc/mobile/professional-data-mobile.component");
var client_data_mobile_component_1 = require("./customer_card/filds_customer_card/client_data_cc/mobile/client-data-mobile.component");
var address_data_mobile_component_1 = require("./customer_card/filds_customer_card/address_data_cc/mobile/address-data-mobile.component");
var simulation_service_1 = require("./simulation.service");
var resum_component_1 = require("./mobile/resum/resum.component");
var calculation_mobile_component_1 = require("./mobile/calculationMobile/calculationPainelMobile/calculation-mobile.component");
var calculation_painel_mobile_component_1 = require("./mobile/calculationMobile/calculation-painel-mobile.component");
var listversion_mobile_component_1 = require("./mobile/listVersionMobile/listversion-mobile.component");
var footer_component_1 = require("./../footer/footer.component");
var painel_proposal_mobile_component_1 = require("./mobile/painelProposalMobile/painel-proposal-mobile.component");
var stepper_mobile_component_1 = require("./mobile/stepperMobile/stepper-mobile.component");
var painel_proposal_component_1 = require("./painelProposal/painel-proposal.component");
var degreeKinshipDialog_dialog_1 = require("./customer_card/filds_customer_card/guarantor_1_client_cc/degreeKinshipDialog/degreeKinshipDialog.dialog");
var installments_dialog_1 = require("./calculationPainel/calculationDialog/calculation/installmentsDialog/installments.dialog");
var send_component_1 = require("./send/send.component");
var translate_module_1 = require("./../translate/translate.module");
var servicesDialog_dialog_1 = require("./calculationPainel/calculationDialog/calculation/servicesDialog/servicesDialog.dialog");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var selectedSalesman_dialog_1 = require("./selected_salesman_dialog/selectedSalesman.dialog");
var province_component_1 = require("./../commons/province/province.component");
var calculation_component_1 = require("./calculationPainel/calculationDialog/calculation/calculation.component");
var calculationDialog_dialog_1 = require("./calculationPainel/calculationDialog/calculationDialog.dialog");
var calculationPainel_component_1 = require("./calculationPainel/calculationPainel.component");
var document_component_1 = require("./document/document.component");
var acessoriesOptions_dialog_1 = require("./acessoriesOptionsDialog/acessoriesOptions.dialog");
var exitSalesmanDialog_dialog_1 = require("./exit_salesman_dialog/exitSalesmanDialog.dialog");
var brlpipe_1 = require("./../commons/value/brlpipe");
var new_ones_component_1 = require("./new_ones/new_ones.component");
var form_client_component_1 = require("./card_client/form_client.component");
var listversion_component_1 = require("./listversion/listversion.component");
var forms_1 = require("@angular/forms");
var simulationInfo_component_1 = require("./simulationInfo/simulationInfo.component");
var simulation_component_1 = require("./simulation.component");
var core_1 = require("@angular/core");
var listCars_component_1 = require("./cardCar/listCars.component");
var carselect_component_1 = require("./carselect/carselect.component");
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var platform_browser_1 = require("@angular/platform-browser");
/** CUSTOMER CARD **/
var customer_card_component_1 = require("./customer_card/customer_card.component");
var client_data_cc_component_1 = require("./customer_card/filds_customer_card/client_data_cc/client_data_cc.component");
var address_data_cc_component_1 = require("./customer_card/filds_customer_card/address_data_cc/address_data_cc.component");
var spouse_cc_component_1 = require("./customer_card/filds_customer_card/spouse_cc/spouse_cc.component");
var professional_data_cc_component_1 = require("./customer_card/filds_customer_card/professional_data_cc/professional_data_cc.component");
var person_data_cc_component_1 = require("./customer_card/filds_customer_card/person_data_cc/person_data_cc.component");
var banking_references_cc_component_1 = require("./customer_card/filds_customer_card/banking_references_cc/banking_references_cc.component");
var vehicle_data_cc_component_1 = require("./customer_card/filds_customer_card/vehicle_data_cc/vehicle_data_cc.component");
var guarantor_1_client_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_client_cc/guarantor_1_client_cc.component");
var guarantor_1_address_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_address_cc/guarantor_1_address_cc.component");
var guarantor_1_spouse_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_spouse_cc/guarantor_1_spouse_cc.component");
var guarantor_1_professional_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_professional_cc/guarantor_1_professional_cc.component");
var guarantor_1_person_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_person_cc/guarantor_1_person_cc.component");
var guarantor_1_banking_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_1_banking_cc/guarantor_1_banking_cc.component");
var guarantor_2_client_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_client_cc/guarantor_2_client_cc.component");
var guarantor_2_address_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_address_cc/guarantor_2_address_cc.component");
var guarantor_2_spouse_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_spouse_cc/guarantor_2_spouse_cc.component");
var guarantor_2_professional_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_professional_cc/guarantor_2_professional_cc.component");
var guarantor_2_person_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_person_cc/guarantor_2_person_cc.component");
var guarantor_2_banking_cc_component_1 = require("./customer_card/filds_customer_card/guarantor_2_banking_cc/guarantor_2_banking_cc.component");
var submission_cc_component_1 = require("./customer_card/filds_customer_card/submission_cc/submission_cc.component");
var ng2_currency_mask_1 = require("ng2-currency-mask");
var currency_mask_config_1 = require("ng2-currency-mask/src/currency-mask.config");
exports.SimulationComponents = {
    components: [simulation_component_1.SimulationComponent, province_component_1.ProvinceComponent,
        listCars_component_1.ListCars, carselect_component_1.CarselectComponent, simulationInfo_component_1.SimulationInfoComponent, form_client_component_1.FormClientComponent,
        send_component_1.SendComponent,
        listversion_component_1.ListVersionComponent,
        new_ones_component_1.NewOnesComponent, calculationPainel_component_1.CalculationPainelComponent, document_component_1.DocumentComponent,
        customer_card_component_1.CustomerCardComponent,
        client_data_cc_component_1.ClientDataCustomerCardComponent,
        address_data_cc_component_1.AddressDataCustomerCardComponent,
        spouse_cc_component_1.SpouseCustomerCardComponent,
        professional_data_cc_component_1.ProfessionalDataCustomerCardComponent,
        person_data_cc_component_1.PersonDataCustomerCardComponent,
        banking_references_cc_component_1.BankingReferencesDataCustomerCardComponent,
        vehicle_data_cc_component_1.VehicleDataCustomerCardComponent,
        guarantor_1_client_cc_component_1.Guarantor1ClientCustomerCardComponent,
        guarantor_1_address_cc_component_1.Guarantor1AddressCustomerCardComponent,
        guarantor_1_spouse_cc_component_1.Guarantor1SpouseCustomerCardComponent,
        guarantor_1_professional_cc_component_1.Guarantor1ProfessionalCustomerCardComponent,
        guarantor_1_person_cc_component_1.Guarantor1PersonCustomerCardComponent,
        guarantor_1_banking_cc_component_1.Guarantor1BankingCustomerCardComponent,
        guarantor_2_client_cc_component_1.Guarantor2ClientCustomerCardComponent,
        guarantor_2_address_cc_component_1.Guarantor2AddressCustomerCardComponent,
        guarantor_2_spouse_cc_component_1.Guarantor2SpouseCustomerCardComponent,
        guarantor_2_professional_cc_component_1.Guarantor2ProfessionalCustomerCardComponent,
        guarantor_2_person_cc_component_1.Guarantor2PersonCustomerCardComponent,
        guarantor_2_banking_cc_component_1.Guarantor2BankingCustomerCardComponent,
        submission_cc_component_1.SubmissionCustomerCardComponent,
        painel_proposal_component_1.PainelProposalComponent,
        stepper_mobile_component_1.StepperMobileComponent,
        painel_proposal_mobile_component_1.PainelProposalMobileComponent,
        footer_component_1.FooterComponent,
        listversion_mobile_component_1.ListVersionMobileComponent,
        calculation_painel_mobile_component_1.CalculationMobileComponent,
        calculation_mobile_component_1.CalculationPainelMobileComponent,
        submission_mobile_component_1.SubmissionMobileComponent,
        vehicle_data_mobile_cc_component_1.VehicleDataCustomerMobileComponent,
        spouse_mobile_cc_component_1.SpouseMobileComponent,
        person_data_mobile_cc_component_1.PersonDataMobileComponent,
        guarantor_2_spouse_mobile_cc_component_1.GuarantorTwoSpouseMobileComponent,
        guarantor_2_professional_mobile_cc_component_1.GuarantorTwoProfessionalCustomerMobileComponent,
        guarantor_2_person_mobile_cc_component_1.GuarantorTwoPersonMobileComponent,
        guarantor_2_client_mobile_cc_component_1.GuarantorTwoClientMobileComponent,
        guarantor_2_banking_mobile_cc_component_1.GuarantorTwoBankingMobileComponent,
        guarantor_2_address_mobile_cc_component_1.GuarantorTwoAddressMobileComponent,
        guarantor_1_spouse_mobile_cc_component_1.GuarantorOneSpouseMobileComponent,
        guarantor_1_professional_mobile_cc_component_1.GuarantorOneProfessionalCustomerMobileComponent,
        guarantor_1_person_mobile_cc_component_1.GuarantorOnePersonMobileComponent,
        guarantor_1_client_mobile_cc_component_1.GuarantorOneClientMobileComponent,
        guarantor_1_banking_mobile_cc_component_1.GuarantorOneBankingCustomerMobileComponent,
        guarantor_1_address_mobile_cc_component_1.GuarantorOneAddressMobileComponent,
        banking_references_mobile_cc_component_1.BankingReferencesDataCustomerCardMobileComponent,
        client_data_mobile_component_1.ClientDataCustomerCardMobileComponent,
        address_data_mobile_component_1.AddressDataCustomerCardMobileComponent,
        customer_card_mobile_component_1.CustomerCardMobileComponent,
        professional_data_mobile_component_1.ProfessionalDataCustomerCardMobileComponent,
        resum_component_1.ResumMobileComponent,
        send_mobile_component_1.SendMobileComponent,
        painel_proposal_component_1.PainelProposalTwoComponent,
        document_mobile_component_1.DocumentMobileComponent,
    ],
};
var SimulationModule = /** @class */ (function () {
    function SimulationModule() {
    }
    SimulationModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, material_1.MaterialModule, material_1.MdRadioModule, material_1.MdDialogModule, flex_layout_1.FlexLayoutModule,
                ngx_datatable_1.NgxDatatableModule, translate_module_1.TranslateModule, ng2_currency_mask_1.CurrencyMaskModule],
            declarations: [painel_proposal_component_1.SelectTcDialog, degreeKinshipDialog_dialog_1.DegreeKinshipDialog, acessoriesOptions_dialog_1.AcessoriesOptionsDialog, calculationDialog_dialog_1.CalculationDialog, brlpipe_1.BrlPipe, calculation_component_1.CalculationComponent,
                selectedSalesman_dialog_1.SelectedSalesmanDialog, servicesDialog_dialog_1.ServicesDialog, installments_dialog_1.InstallmentsDialog, exitSalesmanDialog_dialog_1.ExitSalesmanDialog, send_simulation_dialog_1.SendSimulationDialog],
            bootstrap: [painel_proposal_component_1.SelectTcDialog, degreeKinshipDialog_dialog_1.DegreeKinshipDialog, acessoriesOptions_dialog_1.AcessoriesOptionsDialog, calculationDialog_dialog_1.CalculationDialog, selectedSalesman_dialog_1.SelectedSalesmanDialog, servicesDialog_dialog_1.ServicesDialog, installments_dialog_1.InstallmentsDialog, exitSalesmanDialog_dialog_1.ExitSalesmanDialog],
            providers: [simulation_service_1.SimulationService, { provide: currency_mask_config_1.CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig_1.CustomCurrencyMaskConfig }],
            entryComponents: [calculationDialog_dialog_1.CalculationDialog, servicesDialog_dialog_1.ServicesDialog, installments_dialog_1.InstallmentsDialog, painel_proposal_component_1.SelectTcDialog, send_simulation_dialog_1.SendSimulationDialog],
            exports: [brlpipe_1.BrlPipe, material_1.MaterialModule, flex_layout_1.FlexLayoutModule, ngx_datatable_1.NgxDatatableModule, calculation_component_1.CalculationComponent, servicesDialog_dialog_1.ServicesDialog]
        })
    ], SimulationModule);
    return SimulationModule;
}());
exports.SimulationModule = SimulationModule;
//# sourceMappingURL=simulation.module.js.map