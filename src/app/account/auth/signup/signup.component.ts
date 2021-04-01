import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '../../../core/services/auth.service';
import {delay} from 'rxjs/operators';
import {UserProfileService} from '../../../core/services/user.service';
import {UserService} from '../../../pages/base/user/user.service';
import {RouterService} from '../../../shared/service/router.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userSV: UserProfileService,
              private userService: UserService,
              private routerSV: RouterService) {
  }

  ngOnInit() {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      this.userService.register(this.signupForm.value).pipe(delay(1000)).subscribe(
        r => {
          if (r.success) {
            this.successmsg = true;
            this.routerSV.to('/account/login');
          } else {
            alert('注册失败:' + r.msg);
          }
        },
        error => {
          this.error = error ? error : '';
        });
    }
  }
}
