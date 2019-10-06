import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hidePass = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.invalid) {
      this.authService.login(this.form.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log('data: ', data);
              // this.router.navigate([this.returnUrl]);
          },
          error => {
            console.log('error: ', error);
              // this.error = error;
              // this.loading = false;
          });
    }
  }

}
