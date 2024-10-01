import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerProvider } from '../../services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerError: string | null = null;

  constructor(private fb: FormBuilder, 
    private server: ServerProvider, 
    private router: Router) {
      this.registerForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required]]
      }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, password_confirmation } = this.registerForm.value;
      this.server.register({ name, email, password, password_confirmation })
        .then(response => {
          this.server.updateHeaders(response.access_token);
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          this.registerError = error.message;
        });
    }
  }
}
