import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, FormLoginValue } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { loginActions } from './Store/login.actions';
import { selectBackendErrors } from './Store/login.reducer';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  passwordVisible = false;
  // type=signal('password')

  form = new FormGroup({
    username: new FormControl<string>('MuratDzh', {
      validators: Validators.required,
      nonNullable: true,
    }),
    password: new FormControl<string>('oyg2fWZm6x', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  backendErr$ = this.store.select(selectBackendErrors);

  constructor(
    // private auth: AuthService,
    private store: Store
  ) {}

  onSubmit() {
    if (this.form.valid) {
      //@ts-ignore
      // this.auth.login(this.form.value).subscribe();
      this.store.dispatch(
        loginActions.login({ request: this.form.value as FormLoginValue })
      );
    }
  }

  // onVisible() {
  //   console.log(this.type());

  //   this.passwordVisible?this.type.set('password'):this.type.set('text')
  //   this.passwordVisible=!this.passwordVisible
  // }
}
