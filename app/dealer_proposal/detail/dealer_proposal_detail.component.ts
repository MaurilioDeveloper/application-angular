import { Component, OnInit } from '@angular/core';

import { AppService } from './../../app.service';

import { AppMessage } from './../../app.message';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dealer-proposal-detail',
  templateUrl: './app/dealer_proposal/detail/dealer_proposal_detail.component.html'
})
export class DealerProposalDetailComponent implements OnInit {

  /** List of new concessionaire **/
  listStructureDealership: Object[] = [];

  /** List of new concessionaire **/
  listSalesmanDealership: Object[] = [];

  /** Variable of return dossier **/
  dossier: Object;

  /** Variable structure dealership delected  **/
  structureDealershipSelected: String = null;

  /** Variable salesman dealership delected  **/
  salesmanDealershipSelected: String = null;

  /** Variable idProposal  **/
  idProposal: string;

  constructor(private appService: AppService, private appMessage: AppMessage, private route: ActivatedRoute, public router: Router) {
    this.route
      .params
      .subscribe(params => {
        this.idProposal = "" + params['id'];
      });
    this.loadFilds();
    this.loadStructureDealership();
  };

  ngOnInit() {

  }

  /** Method for load initial filds **/
  loadFilds() {
    let result = this.appService.xSearch("dossierService/findDossierChangedById", this.idProposal);
    result.subscribe(
      (data) => {
        let response = data.json();
        this.dossier = response.dossier;
        console.log(this.dossier)
      },
      err => {
        console.log(err.json());
      }
    );
  }

  /** Method for load structure dealership **/
  loadStructureDealership() {
    let result = this.appService.xSearch('structureService', 'allStructureDealership')
    result.subscribe(
      (data) => {
        let response = data.json();
        this.listStructureDealership = response.listStructure;
        console.log("eeeeeeeeee")
      },
      err => {
        console.log(err.json());
      }
    );
  }

  /** Method for load salesman dealership after choose of 'Structure Dealership' **/
  loadSalesmanDealership(structureIdParam: String) {
    if (structureIdParam != null) {

      let request = {
        "structureId": structureIdParam
      };

      let result = this.appService.xPost('personService/questSalesmanDealership', request)
      result.subscribe(
        (data) => {
          let response = data.json();
          this.listSalesmanDealership = response.listPerson;
        },
        err => {
          console.log(err.json());
        }
      );
    }

  }

  /** Method for reassign proposal **/
  reassignProposal() {
    if (this.validFilds()) {
      let request = {
        "dossierId": this.dossier["dossierId"],
        "personIdFrom": this.dossier["salesmanId"],
        "personIdTo": this.salesmanDealershipSelected,
        "structureIdFrom": this.dossier["structureId"],
        "structureIdTo": this.structureDealershipSelected
      }
      let result = this.appService.xPost('dossierService/insertDossierTransfStructure', request)
      result.subscribe(
        (data) => {
          this.appMessage.showSuccess("Proposta reatribuída com sucesso");
          this.clearFilds();
          //navigator.('dealer_proposal')
          //this.router.navigate('dealer_proposal');
          this.router.navigateByUrl('/dealer_proposal');
        });
    } else {
      this.appMessage.showInfo("Você deve selecionar Concessionária e Vendedor para reatribuir");
    }
  }

  /** Method that validates the screen fields **/
  validFilds() {
    if (this.structureDealershipSelected == null) {
      return false;
    }
    if (this.salesmanDealershipSelected == null) {
      return false;
    }
    return true;
  }

  clearFilds() {
    this.listStructureDealership = [];
    this.listSalesmanDealership = [];
    this.structureDealershipSelected = null;
    this.salesmanDealershipSelected = null;
    this.loadStructureDealership();
  }

};