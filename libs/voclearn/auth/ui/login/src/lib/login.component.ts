import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Email, Password } from '@voclearn/voclearn/auth/api';

@Component({
  selector: 'voclearn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService
        .authenticate(
          new Email(this.form.value.email),
          new Password(this.form.value.password)
        )
        .subscribe({
          complete: () => this.router.navigate(['/']),
        });
    }
  }

  onRegisterButtonClicked(): void {
    this.router.navigate(['/auth/register']);
  }
}
