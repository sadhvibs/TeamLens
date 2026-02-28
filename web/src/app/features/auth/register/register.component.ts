import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [SHARED_IMPORTS],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.buildform();
  }

  buildform() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['MEMBER']
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.authService.userRegister(this.registerForm.value).subscribe(()=> {
      this.registerForm.reset()
      this.router.navigate(['/login']);
    })
  }

}
