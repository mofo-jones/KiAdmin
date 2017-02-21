import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {

    private url = 'http://localhost/kodeinside.com/index/index.php/Pessoa/Pessoa/login';
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    private options: RequestOptions;

    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        this.options = new RequestOptions({ headers: this.headers, method: 'post' });
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: any, password: any) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(this.url, JSON.stringify({ username: username, password: password }), options).toPromise()
            .then(res => {
                let user = res.json().data;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return true;
                }
                return false;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
