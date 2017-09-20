import { NgModule } from '@angular/core';
import { DatepickerOverviewExample } from '../commons/date_picker/date_picker.component';
import { CpfPipe } from './cpf.pipe'
//import { MinhasPropostasComponent } from '../minhas_propostas/minhas_propostas.component';

//import { MaterialModule, MdCardModule, MdButtonModule, MdIconModule, MdIconRegistry } from '@angular/material';


@NgModule({
  //imports:      [ MdCardModule, MdButtonModule, MdIconModule ], //other modules the app depends on
  declarations: [ DatepickerOverviewExample ], // declare all directives and components
  exports:[
    DatepickerOverviewExample
  ]
  
})
export class MyAgreementModule { }