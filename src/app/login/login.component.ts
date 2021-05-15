import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  defaultPassIcon = 'visibility';
  defaultPassType = 'password';
  isLoading: Boolean;
  private subscription: Subscription;

  constructor(
    private router: Router,
    public loginService: LoginService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  login() {
    this.loginService.loginFromToken(this.loginForm.value).subscribe(
      (res) => {
        if (res.is_success == true) {
          // console.log('token', res.token);
          // console.log('token', res.data.token);

          localStorage.setItem('Token', res.data.token);
          this.router.navigate(['/movies']);

          Swal.fire({
            icon: 'success',
            title: 'Login',
            text: 'You have logged in successfully',
            confirmButtonColor: '#3f51b5',
            timer: 5000,
          });
          this.loginForm.reset();
        } else if (res.is_success == false) {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Invalid login credentials',
            confirmButtonColor: '#3f51b5',
            timer: 5000,
          });
          this.loginForm.reset();
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Invalid login credentials',
          confirmButtonColor: '#3f51b5',
          timer: 5000,
        });
        this.loginForm.reset();
      }
    );
  }
  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  changePassIcon() {
    if (this.defaultPassIcon == 'visibility') {
      this.defaultPassIcon = 'visibility_off';
      this.defaultPassType = 'text';
    } else {
      this.defaultPassIcon = 'visibility';
      this.defaultPassType = 'password';
    }
  }
}
