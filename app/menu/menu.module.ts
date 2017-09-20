import { SalesmanCommunicationComponent } from './../menu/salesman_communication/salesman_communication.component';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';



export const MenuComponents = {

  components: [
    MenuComponent,
    SalesmanCommunicationComponent
  ]
};

@NgModule({
  imports: [
      
  ],
  declarations:[
    
  ],
  exports: [

  ],
  providers: [
  ],
  entryComponents:[
  ]
})
export class MenuModule { }