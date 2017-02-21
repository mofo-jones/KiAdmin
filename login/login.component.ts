import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { AlertService, AuthenticationService } from '../login/services/index';

@Component({
    styleUrls: ['./login.scss'],
    templateUrl: './login.html'

})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private fb: FormBuilder
    ) {

        this.form = this.fb.group({
            'email': ['kodeinside@kodeinside.com', Validators.compose([Validators.required, Validators.minLength(6)])],
            'password': ['123321', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        console.log('>>>>>>>>', this.form);

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];

    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password).then(
            res => {
                console.log(res);
                this.router.navigate(['my']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            }
        );
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        if (this.form.valid) {
            this.login();
        }
    }
}


