import { Router }               from '@angular/router';
import { Component, OnInit }    from '@angular/core';
import { TranslateService }     from './translate';
import { OverlayContainer } from '@angular/material';
import { LoaderService }        from './app.spinner';

@Component( {
    selector: 'app-root',
    templateUrl: './app/app.component.html',
})
export class AppComponent implements OnInit {

    public supportedLangs: any[];
    showLoader: boolean;
    public theme: string;
    private languageBR: string = "assets/images/flagbr.png";
    private languageFR: string = "assets/images/flagfr.png";
    private languageEN: string = "assets/images/flaguk.png";
    private languageSP: string = "assets/images/flagspain.png";
    public KEY_LOCAL_STORAGE: string = 'omega2_local_theme';
    public BRAND_NISSAN: string = 'nissan';
    public BRAND_RENAULT: string = 'renault';
    public BRAND_RCI: string = 'rci';
    public router: string;

    constructor( private _translate: TranslateService, private loaderService: LoaderService , public overlayContainer: OverlayContainer ) {
    }

    ngOnInit() {

        // set language
        this._translate.setDefaultLang( 'pt' );
        this._translate.enableFallback( true );
        this.selectLang( 'pt' );

        //set spinner loader
        this.loaderService.status.subscribe(( val: boolean ) => {
            this.showLoader = val;
        });

        this.theme = localStorage.getItem( this.KEY_LOCAL_STORAGE );
        this.overlayContainer.themeClass = this.theme;

        if(this.theme == null){
            this.theme = this.BRAND_NISSAN;
            this.overlayContainer.themeClass = this.BRAND_NISSAN;
        }
    }


    isCurrentLang( lang: string ) {
        return lang === this._translate.currentLang;
    }

    selectLang( lang: string ) {
        // set default;
        this._translate.use( lang );
    }

    changeTheme( selectedItem: any ) {
        this.theme = selectedItem.value;
        this.overlayContainer.themeClass = selectedItem.value;
    }

    isShowHeader() {
        let currenteUser = JSON.parse(sessionStorage.getItem('currentUser'));
        //let user : User = sessionStorage.getItem('currentUser')
        let isUserLogged = false;
        if(currenteUser){
          //  console.log(currenteUser.access_token);
            isUserLogged = true;
        }else{
            isUserLogged = false;
        }
        return isUserLogged;
    }
 }