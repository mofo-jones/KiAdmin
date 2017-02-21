import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class PageGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        localStorage.removeItem('currentUser');
        return true;
    }

}