import { Component } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /* Flag indicating the visibility of the password: true for visible, false for hidden. */
  showPassword: boolean = false;

  /* FormControl managing the password input with required, minimum length and custom strength validators */
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    this.checkEasyStrength(),
    this.checkMediumStrength(),
    this.checkStrongStrength(),
  ]);

  /**
   * Validator function to check easy password strength.
   * A password is considered easy if it consists only of letters, only of numbers or only of sybmols.
   * @returns error object if the password is easy, null otherwise.
   */
  checkEasyStrength(): ValidatorFn {
    const passwordRegex = {
      letters: /^[a-zA-Zа-яА-Я]+$/,
      digits: /^\d+$/,
      symbols: /^[^a-zA-Zа-яА-Я 0-9]+$/,
    };
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      if (
        passwordRegex.letters.test(password) ||
        passwordRegex.digits.test(password) ||
        passwordRegex.symbols.test(password)
      ) {
        return { easyStrength: 'Password is easy' };
      }
      return null;
    };
  }

  /**
   * Validator function to check medium password strength.
   * A password is considered medium if it consists of combination of letters-symbols or letters-digits or digits-symbols.
   * @returns error object if the password is medium, null otherwise.
   */
  checkMediumStrength(): ValidatorFn {
    const passwordRegex = {
      lettersAndDigits: /^(?=.*\d)(?=.*[a-zA-Zа-яА-Я])[a-zA-Zа-яА-Я0-9]+$/,
      digitsAndSymbols: /^(?=\D*\d)(?=.*[\W_])[^a-zA-Zа-яА-Я]*$/,
      lettersAndSymbols: /^(?=.*[a-zA-Zа-яА-Я])(?=.*[^a-zA-Zа-яА-Я\d])[^0-9]*$/,
    };
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      if (
        passwordRegex.lettersAndDigits.test(password) ||
        passwordRegex.lettersAndSymbols.test(password) ||
        passwordRegex.digitsAndSymbols.test(password)
      ) {
        return { mediumStrength: 'Password is medium' };
      }
      return null;
    };
  }

  /**
   * Validator function to check strong password strength.
   * A password is considered strong if it consists of letters, numbers and sybmols.
   * @returns error object if the password is strong, null otherwise.
   */
  checkStrongStrength(): ValidatorFn {
    const passwordRegex =
      /^(?=.*\d)(?=.*[^a-zA-Zа-яА-Я\d])(?=.*[a-zA-ZА-Яа-я]).+$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      if (passwordRegex.test(password)) {
        return { strongStrength: 'Password is strong' };
      }
      return null;
    };
  }
}
