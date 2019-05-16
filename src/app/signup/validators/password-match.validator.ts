import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  formGroup: FormGroup
): ValidationErrors | null => {
  return formGroup.get('password1').value === formGroup.get('password2').value
    ? null
    : { passwordMismatch: true };
};
