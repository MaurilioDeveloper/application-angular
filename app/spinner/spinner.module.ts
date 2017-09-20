import { SpinnerService } from './spinner.service';
import { NgModule } from '@angular/core';
import { MaterialModule, MdDialogModule} from '@angular/material';
import { SpinnerComponent, SpinnerComponentDialog } from './spinner.component';


@NgModule({
    imports:[
        MaterialModule,
        MdDialogModule
    ],
    declarations:[
        SpinnerComponentDialog, 
        SpinnerComponent,
    ],
    providers:[
      SpinnerService
    ],
    entryComponents:[
        SpinnerComponentDialog,
        SpinnerComponent
        
    ],
    exports:[
         SpinnerComponentDialog,
        SpinnerComponent
    ],
    bootstrap:[
        SpinnerComponentDialog, SpinnerComponent
    ]
 
})
export class SpinnerModule{}