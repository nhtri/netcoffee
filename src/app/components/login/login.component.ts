import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkserviceService } from '../../services/networkservice.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user: any[] = [];
    errormes: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private networkserviceService: NetworkserviceService,

    ) {

    }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = '/';

    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {

        this.networkserviceService.getAllUser().subscribe(data => {
            console.log("data: ", data[0].username);
            if ((this.f.username.value === data[0].username && this.f.password.value === data[0].password)||(this.f.username.value === data[1].username && this.f.password.value === data[1].password)) {
                console.log("ok")
                this.router.navigate([this.returnUrl]);
                localStorage.setItem('auth','sucessful')
            }
            else {
                this.errormes = "Username or Password is invalid"
            }
        })

    }
}
