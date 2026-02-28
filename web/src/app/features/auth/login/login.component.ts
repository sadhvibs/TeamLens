import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SHARED_IMPORTS } from '../../../shared/material';

@Component({
  selector: 'app-login',
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.buildform();
  }

  buildform() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.userLogin(this.loginForm.value).subscribe((res: any)=> {
      console.log(res);
      localStorage.setItem("token", res.token);
      this.loginForm.reset()
      this.router.navigate(['/dashboard']);
    })
  }

}
