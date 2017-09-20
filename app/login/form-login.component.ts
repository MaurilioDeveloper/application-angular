import { AppService } from './../app.service';
import { ForgotPasswordDialog } from './../forgot_password_dialog/forgot_password.dialog';
import { MdDialog } from '@angular/material';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Login } from './login.interface';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';


import { AppMessage } from './../app.message';

@Component( {
    //moduleId: module.id,
    selector: 'form-login',
    templateUrl: './app/login/form-login.html',
})
export class FormLoginComponent implements OnInit {
    login: Login;
    msg: string;
    brand: string;

    ngOnInit() {
        this.login = { user: '', password: '' };
        if ( this.authService.isLoggedIn() ) {
            this.router.navigate( ['/home'] );
        }
        this.route
            .params
            .subscribe( params => {
                this.brand = params['brand'];
            });
        
        this.changeTheme(this.brand);

    };

    constructor( private authService: AuthService, private route: ActivatedRoute,
        private app: AppComponent, private dialog: MdDialog,
        public router: Router, private appMessage: AppMessage, private appService: AppService ) {
    };

    public doLogin( login: Login ) {
        // let observable = this.appService.xPost('authentication/login',login);
        if ( login.user && login.password ) {
            this.authService.doLogin( login ).subscribe(( data ) => {
                //if ( this.authService.isLoggedIn() ) {
                this.appMessage.showSuccess( 'msg_login_success' );

                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                //Criar autenticação de administrador aqui
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
                // Set our navigation extras object
                // that passes on our global query params and fragment
                let navigationExtras: NavigationExtras = {
                    preserveQueryParams: true,
                    preserveFragment: true
                };
                // let payload = data.json();
                //JSON.stringify()
                //this.msg = data.json().access_token;
                // console.log( this.msg );
                //JSON.parse(sessionStorage.getItem('currentUser'));
                //console.log(  sessionStorage.getItem( 'currentUser' ) );

                let theme = this.appService.getSessionUser().theme;
                localStorage.setItem( this.app.KEY_LOCAL_STORAGE, theme );  
                this.changeTheme("");

                // Redirect the user
                this.router.navigate( [redirect], navigationExtras );

            });
            
        }
    }
    /**
     * 
     * Verifica o theme em :
     * - Entrar no login/<theme> - nissan / renault
     * - Pega o thema da sessão
     * - regra é invocada de varios endpoints por isso os varios IFs
     */
    private changeTheme(brandTheme: string) {
        let item = {};
        let theme = "";
       
        let var_local_theme = localStorage.getItem( this.app.KEY_LOCAL_STORAGE );
        if ( brandTheme === this.app.BRAND_NISSAN ) {
           theme = this.app.BRAND_NISSAN;
        } else if ( brandTheme === this.app.BRAND_RENAULT ) {
           theme = this.app.BRAND_RENAULT;
       /* } else if ( brandTheme === this.app.BRAND_RCI ) {
            theme = this.app.BRAND_RCI;*/
        }else if(brandTheme){
            theme = brandTheme;
        }else if(var_local_theme ){
            theme = var_local_theme;
        }else {
            theme = this.app.BRAND_NISSAN;
        }
       
        item["value"] = theme;
        this.app.changeTheme( item );
    }

    forgotPassword() {
        let dialogRef = this.dialog.open( ForgotPasswordDialog, { height: 'auto', width: '30%', });
    }

}