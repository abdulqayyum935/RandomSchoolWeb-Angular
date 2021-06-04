import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ConfirmPasswordValidation {
    public static match(c: AbstractControl): ValidationErrors | null {
        if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
            c.get('confirmPassword')?.setErrors({ 'noMatch': true });
            return { invalid: false };
        }
        c.get('confirmPassword')?.setErrors(null);
        return null;
    }
}