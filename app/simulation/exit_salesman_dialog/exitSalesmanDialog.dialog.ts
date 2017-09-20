import { AuthService } from './../../login/auth.service';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'exit-salesman-dialog',
    templateUrl: 'app/simulation/exit_salesman_dialog/exitSalesmanDialog.dialog.html'
})

export class ExitSalesmanDialog implements OnInit {

    confirm: boolean = false;

    ngOnInit(): void {
    }

    constructor(private dialogRef: MdDialogRef<ExitSalesmanDialog>, private authService: AuthService) {
    }

    clearSalesman(result: boolean) {

        if (!result) {
            this.confirm = !result;
            sessionStorage.removeItem('salesman');
            sessionStorage.removeItem('structure');
            this.dialogRef.close();
        } else {
            this.dialogRef.close();
        }

    }

}