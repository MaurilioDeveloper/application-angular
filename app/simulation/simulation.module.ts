import { DocumentMobileComponent } from './document/mobile/document-mobile.component';
import { SendMobileComponent } from './send/mobile/send-mobile.component';
import { SendSimulationDialog } from './customer_card/send_simulation_dialog/send_simulation.dialog';
import { CustomCurrencyMaskConfig } from './../diretive/CustomCurrencyMaskConfig';
import { CustomerCardMobileComponent } from './customer_card/mobile/customer_card-mobile.component';
import { BankingReferencesDataCustomerCardMobileComponent } from './customer_card/filds_customer_card/banking_references_cc/mobile/banking-references-mobile-cc.component';
import { GuarantorOneAddressMobileComponent } from './customer_card/filds_customer_card/guarantor_1_address_cc/mobile/guarantor-1-address-mobile-cc.component';
import { GuarantorOneBankingCustomerMobileComponent } from './customer_card/filds_customer_card/guarantor_1_banking_cc/mobile/guarantor-1-banking-mobile-cc.component';
import { GuarantorOneClientMobileComponent } from './customer_card/filds_customer_card/guarantor_1_client_cc/mobile/guarantor-1-client-mobile-cc.component';
import { GuarantorOnePersonMobileComponent } from './customer_card/filds_customer_card/guarantor_1_person_cc/mobile/guarantor-1-person-mobile-cc.component';
import { GuarantorOneProfessionalCustomerMobileComponent } from './customer_card/filds_customer_card/guarantor_1_professional_cc/mobile/guarantor-1-professional-mobile-cc.component';
import { GuarantorOneSpouseMobileComponent } from './customer_card/filds_customer_card/guarantor_1_spouse_cc/mobile/guarantor-1-spouse-mobile-cc.component';
import { GuarantorTwoAddressMobileComponent } from './customer_card/filds_customer_card/guarantor_2_address_cc/mobile/guarantor-2-address-mobile-cc.component';
import { GuarantorTwoBankingMobileComponent } from './customer_card/filds_customer_card/guarantor_2_banking_cc/mobile/guarantor-2-banking-mobile-cc.component';
import { GuarantorTwoClientMobileComponent } from './customer_card/filds_customer_card/guarantor_2_client_cc/mobile/guarantor-2-client-mobile-cc.component';
import { GuarantorTwoPersonMobileComponent } from './customer_card/filds_customer_card/guarantor_2_person_cc/mobile/guarantor-2-person-mobile-cc.component';
import { GuarantorTwoProfessionalCustomerMobileComponent } from './customer_card/filds_customer_card/guarantor_2_professional_cc/mobile/guarantor-2-professional-mobile-cc.component';
import { GuarantorTwoSpouseMobileComponent } from './customer_card/filds_customer_card/guarantor_2_spouse_cc/mobile/guarantor-2-spouse-mobile-cc.component';
import { PersonDataMobileComponent } from './customer_card/filds_customer_card/person_data_cc/mobile/person-data-mobile-cc.component';
import { SpouseMobileComponent } from './customer_card/filds_customer_card/spouse_cc/mobile/spouse-mobile-cc.component';
import { VehicleDataCustomerMobileComponent } from './customer_card/filds_customer_card/vehicle_data_cc/mobile/vehicle-data-mobile-cc.component';
import { SubmissionMobileComponent } from './customer_card/filds_customer_card/submission_cc/mobile/submission-mobile.component';
import { ProfessionalDataCustomerCardMobileComponent } from './customer_card/filds_customer_card/professional_data_cc/mobile/professional-data-mobile.component';
import { ClientDataCustomerCardMobileComponent } from './customer_card/filds_customer_card/client_data_cc/mobile/client-data-mobile.component';
import { AddressDataCustomerCardMobileComponent } from './customer_card/filds_customer_card/address_data_cc/mobile/address-data-mobile.component';
import { SimulationService } from './simulation.service';
import { ResumMobileComponent } from './mobile/resum/resum.component';
import { CalculationPainelMobileComponent } from './mobile/calculationMobile/calculationPainelMobile/calculation-mobile.component';
import { CalculationMobileComponent } from './mobile/calculationMobile/calculation-painel-mobile.component';
import { ListVersionMobileComponent } from './mobile/listVersionMobile/listversion-mobile.component';
import { FooterComponent } from './../footer/footer.component';
import { PainelProposalMobileComponent } from './mobile/painelProposalMobile/painel-proposal-mobile.component';
import { StepperMobileComponent } from './mobile/stepperMobile/stepper-mobile.component';
import { PainelProposalComponent, SelectTcDialog, PainelProposalTwoComponent } from './painelProposal/painel-proposal.component';
import { DegreeKinshipDialog } from './customer_card/filds_customer_card/guarantor_1_client_cc/degreeKinshipDialog/degreeKinshipDialog.dialog';
import { InstallmentsDialog } from './calculationPainel/calculationDialog/calculation/installmentsDialog/installments.dialog';
import { SendComponent } from './send/send.component';
import { TranslateModule } from './../translate/translate.module';
import { ServicesDialog } from './calculationPainel/calculationDialog/calculation/servicesDialog/servicesDialog.dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectedSalesmanDialog } from './selected_salesman_dialog/selectedSalesman.dialog';
import { ProvinceComponent } from './../commons/province/province.component';
import { CalculationComponent } from './calculationPainel/calculationDialog/calculation/calculation.component';
import { CalculationDialog } from './calculationPainel/calculationDialog/calculationDialog.dialog';
import { CalculationPainelComponent } from './calculationPainel/calculationPainel.component';
import { DocumentComponent } from './document/document.component';
import { AcessoriesOptionsDialog } from './acessoriesOptionsDialog/acessoriesOptions.dialog';
import { ExitSalesmanDialog } from './exit_salesman_dialog/exitSalesmanDialog.dialog';


import { BrlPipe } from './../commons/value/brlpipe';
import { NewOnesComponent } from './new_ones/new_ones.component';
import { FormClientComponent } from './card_client/form_client.component';
import { ListVersionComponent } from './listversion/listversion.component';
import { FormsModule } from '@angular/forms';
import { SimulationInfoComponent } from './simulationInfo/simulationInfo.component';
import { SimulationComponent } from './simulation.component';
import { NgModule, Pipe } from '@angular/core';
import { ListCars } from './cardCar/listCars.component';
import { CarselectComponent } from './carselect/carselect.component';
import { MdRadioModule, MdDialogModule, MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';

/** CUSTOMER CARD **/
import { CustomerCardComponent } from './customer_card/customer_card.component';

import { ClientDataCustomerCardComponent } from './customer_card/filds_customer_card/client_data_cc/client_data_cc.component';
import { AddressDataCustomerCardComponent } from './customer_card/filds_customer_card/address_data_cc/address_data_cc.component';
import { SpouseCustomerCardComponent } from './customer_card/filds_customer_card/spouse_cc/spouse_cc.component';
import { ProfessionalDataCustomerCardComponent } from './customer_card/filds_customer_card/professional_data_cc/professional_data_cc.component';
import { PersonDataCustomerCardComponent } from './customer_card/filds_customer_card/person_data_cc/person_data_cc.component';
import { BankingReferencesDataCustomerCardComponent } from './customer_card/filds_customer_card/banking_references_cc/banking_references_cc.component';

import { VehicleDataCustomerCardComponent } from './customer_card/filds_customer_card/vehicle_data_cc/vehicle_data_cc.component';

import { Guarantor1ClientCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_1_client_cc/guarantor_1_client_cc.component';
import { Guarantor1AddressCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_1_address_cc/guarantor_1_address_cc.component';
import { Guarantor1SpouseCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_1_spouse_cc/guarantor_1_spouse_cc.component';
import { Guarantor1ProfessionalCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_1_professional_cc/guarantor_1_professional_cc.component';
import { Guarantor1PersonCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_1_person_cc/guarantor_1_person_cc.component';
import { Guarantor1BankingCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_1_banking_cc/guarantor_1_banking_cc.component';

import { Guarantor2ClientCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_2_client_cc/guarantor_2_client_cc.component';
import { Guarantor2AddressCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_2_address_cc/guarantor_2_address_cc.component';
import { Guarantor2SpouseCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_2_spouse_cc/guarantor_2_spouse_cc.component';
import { Guarantor2ProfessionalCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_2_professional_cc/guarantor_2_professional_cc.component';
import { Guarantor2PersonCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_2_person_cc/guarantor_2_person_cc.component';
import { Guarantor2BankingCustomerCardComponent } from './customer_card/filds_customer_card/guarantor_2_banking_cc/guarantor_2_banking_cc.component';

import { SubmissionCustomerCardComponent } from './customer_card/filds_customer_card/submission_cc/submission_cc.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";

export const SimulationComponents = {
  components: [SimulationComponent, ProvinceComponent,
    ListCars, CarselectComponent, SimulationInfoComponent, FormClientComponent,
    SendComponent,
    ListVersionComponent,
    NewOnesComponent, CalculationPainelComponent, DocumentComponent,
    CustomerCardComponent,
    ClientDataCustomerCardComponent,
    AddressDataCustomerCardComponent,
    SpouseCustomerCardComponent,
    ProfessionalDataCustomerCardComponent,
    PersonDataCustomerCardComponent,
    BankingReferencesDataCustomerCardComponent,
    VehicleDataCustomerCardComponent,
    Guarantor1ClientCustomerCardComponent,
    Guarantor1AddressCustomerCardComponent,
    Guarantor1SpouseCustomerCardComponent,
    Guarantor1ProfessionalCustomerCardComponent,
    Guarantor1PersonCustomerCardComponent,
    Guarantor1BankingCustomerCardComponent,
    Guarantor2ClientCustomerCardComponent,
    Guarantor2AddressCustomerCardComponent,
    Guarantor2SpouseCustomerCardComponent,
    Guarantor2ProfessionalCustomerCardComponent,
    Guarantor2PersonCustomerCardComponent,
    Guarantor2BankingCustomerCardComponent,
    SubmissionCustomerCardComponent,
    PainelProposalComponent,
    StepperMobileComponent,
    PainelProposalMobileComponent,
    FooterComponent,
    ListVersionMobileComponent,
    CalculationMobileComponent,
    CalculationPainelMobileComponent,
    SubmissionMobileComponent,
    VehicleDataCustomerMobileComponent,
    SpouseMobileComponent,
    PersonDataMobileComponent,
    GuarantorTwoSpouseMobileComponent,
    GuarantorTwoProfessionalCustomerMobileComponent,
    GuarantorTwoPersonMobileComponent,
    GuarantorTwoClientMobileComponent,
    GuarantorTwoBankingMobileComponent,
    GuarantorTwoAddressMobileComponent,
    GuarantorOneSpouseMobileComponent,
    GuarantorOneProfessionalCustomerMobileComponent,
    GuarantorOnePersonMobileComponent,
    GuarantorOneClientMobileComponent,
    GuarantorOneBankingCustomerMobileComponent,
    GuarantorOneAddressMobileComponent,
    BankingReferencesDataCustomerCardMobileComponent,
    ClientDataCustomerCardMobileComponent,
    AddressDataCustomerCardMobileComponent,
    CustomerCardMobileComponent,
    ProfessionalDataCustomerCardMobileComponent,
    ResumMobileComponent,
    SendMobileComponent,
    PainelProposalTwoComponent,
    DocumentMobileComponent,
  ],
};

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, MdRadioModule, MdDialogModule, FlexLayoutModule,
    NgxDatatableModule, TranslateModule, CurrencyMaskModule],
  declarations: [SelectTcDialog, DegreeKinshipDialog, AcessoriesOptionsDialog, CalculationDialog, BrlPipe, CalculationComponent, 
    SelectedSalesmanDialog, ServicesDialog, InstallmentsDialog, ExitSalesmanDialog, SendSimulationDialog],
  bootstrap: [SelectTcDialog, DegreeKinshipDialog, AcessoriesOptionsDialog, CalculationDialog, SelectedSalesmanDialog, ServicesDialog, InstallmentsDialog, ExitSalesmanDialog],
  providers: [SimulationService, { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig}],
  entryComponents: [CalculationDialog, ServicesDialog, InstallmentsDialog, SelectTcDialog, SendSimulationDialog],
  exports: [BrlPipe, MaterialModule, FlexLayoutModule, NgxDatatableModule,CalculationComponent, ServicesDialog]
})
export class SimulationModule { }