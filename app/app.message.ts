import { Injectable, Inject } from '@angular/core';
import { ToastrConfig, ToastrService } from 'ngx-toastr';
import { TranslateService } from './translate';



@Injectable()
export class AppMessage {

    constructor( private toastrService: ToastrService,
        toastrConfig: ToastrConfig,
        private _translate: TranslateService ) {

        toastrConfig.timeOut = 3000;
    }

    public showDefaultSuccess() {
        this.showSuccess('common-msg-success');
    }

    public showSuccess( msg: string ) {
        this.toastrService.success( this._translate.instant( msg ), this._translate.instant( 'common-msg-success-header' ) + ':' );
    }

    public showError( msg: string ) {
        this.toastrService.error( this._translate.instant( msg ), this._translate.instant( 'common-msg-error-header' ) + ':' );
    }

    public showInfo( msg: string ) {
        this.toastrService.info( this._translate.instant( msg ), this._translate.instant( 'common-msg-info-header' ) + ':' );
    }

    public showWarning( msg: string ) {
        this.toastrService.warning( this._translate.instant( msg ), this._translate.instant( 'common-msg-warn-header' ) + ':' );
    }

    public returnMsg(msg: string) : string{
        return this._translate.instant( msg );
    }

}