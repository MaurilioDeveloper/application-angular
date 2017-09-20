import { AppService } from './../app.service';
import { SpinnerService } from './spinner.service';
import { TranslateModule } from './../translate/translate.module';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({

    selector: 'spinner-component',
    template:''
})
export class SpinnerComponent implements OnInit{

   private spinnerRef : MdDialogRef<SpinnerComponentDialog>;
  
   //private subscription: Subscription;

   public constructor(private dialog : MdDialog, private spinnerService : SpinnerService){
       

        /*
          this.subscription = this.spinnerService.notifyObservable.subscribe((value) => {
            this.display(value);
         });*/

        this.spinnerService.status.subscribe(( val: boolean ) => {
            this.display(val);
        });  

    }



    public ngOnInit(){
            /*
                    this.appService.status.subscribe((val:boolean )=> {
                this.display(val);
            });
            */
    }
    
    ngAfterViewInit() {   

   
    }


    public display(show : boolean){
       if(show){
           this.open();
       }else{
           this.close();
       }
    }

    open(){
        this.spinnerRef = this.dialog.open(SpinnerComponentDialog, {disableClose: true, panelClass: 'spinner_transparent'});
    }

    close(){

        if(this.spinnerRef){
            this.spinnerRef.close();
        }
    }

    ngOnDestroy() {
        this.spinnerService.status.unsubscribe();
        //this.subscription.unsubscribe();
    }
}


@Component({
    selector: 'spinner-component-dialog',
    templateUrl: 'app/spinner/spinner.component.dialog.html',

 
})
export class SpinnerComponentDialog {
    public constructor(public dialogRef: MdDialogRef<SpinnerComponentDialog>){}

}