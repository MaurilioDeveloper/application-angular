import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SpinnerComponent } from './spinner.component';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class SpinnerService{
/*
    private notify = new Subject<any>();
    notifyObservable = this.notify.asObservable();
*/
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    public display(show : boolean){
       //this.notify.next(show);
       this.status.next(show);
    }


}