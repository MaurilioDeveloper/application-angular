import { Simulation } from './dto/Simulation.dto';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';


@Injectable()
export class SimulationService{


    public load: BehaviorSubject<Simulation> = new BehaviorSubject<Simulation>(new Simulation());
    
    public setSimulation(simulation : Simulation){
       this.load.next(simulation);
    }


}

