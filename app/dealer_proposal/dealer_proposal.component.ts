import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { AppService } from './../app.service';
import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'dealer-proposal',
    templateUrl: './app/dealer_proposal/dealer_proposal.component.html'
})
export class DealerProposalComponent implements OnInit{
    public state = '';

    listDossiers = [];

    constructor(private router: Router, private appService: AppService, public media:ObservableMedia ){

        media.asObservable()
        .subscribe((change:MediaChange) => {
          this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : ""
        });
    
    };

  ngOnInit() {
        this.loadDossiers();
    };
  loadDossiers(){
    let observable = this.appService.xSearch('dossierService', 'findDossierChanged' );

       observable.subscribe(
            (data) => {
               let response = data.json();
               this.listDossiers = response.listDossiers;
            },
            err => {
               console.log(err.json());
            }
       );
  }
};