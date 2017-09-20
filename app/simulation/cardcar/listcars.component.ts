import { AppService } from './../../app.service';
import { Car } from './../dto/Car.dto';
import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'listcars',
    templateUrl:  'app/simulation/cardCar/listcars.component.html',
    styleUrls: ['app/simulation/cardCar/listcars.component.scss']
})

export class ListCars {
   @Input() cars:[Car];
   @Input() utilitarios:[Car];
 
   @Output() carselect: EventEmitter<Car> = new EventEmitter();
  constructor(private appService: AppService) {}

public select(event, car) {
    this.carselect.emit(car);

    this.cars.forEach(element => {
        element.selected =false;
    });
       this.utilitarios.forEach(element => {
        element.selected =false;
    });

    car.selected = true;

  }

}


