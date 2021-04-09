import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {UserService} from '../../../pages/base/user/user.service';
import {USER} from '../../../global.const';
import {RouterService} from '../../../shared/service/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  inLogging: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private routerSV: RouterService) {
  }

  ngOnInit() {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.loginForm = this.formBuilder.group({
      username: ['guest', [Validators.required]],
      password: ['123456', [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  /**
   * 提交表单
   */
  onSubmit() {
    this.submitted = true;
    // 表单校验
    if (this.loginForm.invalid) {
      return;
    } else {
      this.userService.doLogin(this.loginForm.getRawValue()).pipe(delay(1000)).subscribe(r => {
        // 保存token
        if (r.success) {
          USER.token = r.data;
          // 请求用户信息
          this.routerSV.to('/');
        } else {
          alert('登录出错:' + r.msg);
        }
      }, null, () => this.inLogging = false);
    }
  }

}
