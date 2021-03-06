import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Authentication} from '../../services/Authentication';
import {Router} from 'angular2/router';
import {IRegistration} from '../../../common/interfaces/RegistrationInterfaces';

@Component({
    selector: 'register',
    templateUrl: './register/components/Register.html',
    styleUrls: ['./register/components/Register.css'],

    providers: [Authentication],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class Register {

    registration:IRegistration = {
        username: '',
        password: '',
        emailAddress: '',
        firstName: '',
        lastName: ''
    };

    repeatedPassword:string = '';

    constructor(public router:Router, public authService:Authentication) {
    }

    onSubmit() {
        this.authService.register(this.registration)
            .subscribe(response => {
                if (response.succeeded) {
                    alert(`Wecome ${this.registration.firstName}!  You have successfully registered.
                           You will be redirected to the login site to login with your new password.`);
                    this.router.navigateByUrl('/login');
                } else {
                    alert(response.failureReason);
                }
            });
    }
}
