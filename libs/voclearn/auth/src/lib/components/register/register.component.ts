import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Email } from '../../dtos/email';
import { Password } from '../../dtos/password';
import { FullName } from '../../dtos/full-name';
import { Router } from '@angular/router';

@Component({
  selector: 'voclearn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.register(
        new Email(this.form.value.email),
        new Password(this.form.value.password),
        new FullName(this.form.value.firstName, this.form.value.lastName)
      );
    }
  }

  onLoginButtonClicked(): void {
    this.router.navigate(['/auth/login']);
  }
}
