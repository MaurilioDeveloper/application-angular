import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        let isCheck = false;
        if (this.checkLogin(url)) {
            isCheck = this.isPermission(url);
        }
        return isCheck;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        console.log("canLoad", url);
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {

        if (this.authService.isLoggedIn()) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }

    isPermission(url: string) {
        let user = this.authService.appService.getSessionUser();
        if (user) {
            let role = user.authorities.find( auth => auth.url.trim() === "/" + url.split('/')[1].trim() );
            if(role != null && role != undefined){
                return true;
            }else{
                this.router.navigate(['/denied']);
                return false;
            }
        }
        return false;
    }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/