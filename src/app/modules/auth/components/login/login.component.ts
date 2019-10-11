import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hidePass = true;
  loading = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/register';
  }

  login() {
    this.loading = true;
    if (!this.form.invalid) {
      this.authService.login(this.form.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log('data: ', data);
            this.router.navigateByUrl(this.returnUrl);
          },
          error => {
            console.log('error: ', error);
            // this.alertService.error(error);
            this.loading = false;
          });
    }
  }

}
