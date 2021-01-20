import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        displayName: [null, Validators.compose([Validators.required])],
        email: [
          null,
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          null,
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        passwordConfirm: ['', Validators.required],
      },
      { validator: this.passwordMatcher }
    );
  }

  // TODO: Move to external
  passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = c.get('password');
    const confirmControl = c.get('passwordConfirm');

    if (passwordControl.pristine || confirmControl.pristine) {
      return null;
    }

    if (passwordControl.value === confirmControl.value) {
      return null;
    }
    confirmControl.setErrors({ match: true });
    return { match: true };
  }

  registerUser(): void {
    this.auth.createUserWithEmailAndPassword(
      this.form.value.email,
      this.form.value.password,
      this.form.value.displayName
    );
  }

  ngOnInit(): void {}
}
